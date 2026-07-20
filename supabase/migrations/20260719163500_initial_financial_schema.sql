create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  icon varchar(50),
  color varchar(20),
  type text not null check (type in ('income', 'expense')),
  created_at timestamptz not null default now(),
  unique (id, user_id),
  unique (user_id, type, name)
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid not null,
  amount numeric(14, 2) not null check (amount > 0),
  currency text not null default 'IDR',
  description text,
  transaction_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (category_id, user_id)
    references public.categories(id, user_id)
    on update cascade
    on delete restrict
);

create index categories_user_id_idx on public.categories(user_id);
create index categories_user_type_idx on public.categories(user_id, type);

create index transactions_user_id_idx on public.transactions(user_id);
create index transactions_user_date_idx on public.transactions(user_id, transaction_date desc);
create index transactions_category_id_idx on public.transactions(category_id);

alter table public.categories enable row level security;
alter table public.transactions enable row level security;

create policy "Users can view their own categories"
  on public.categories
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own categories"
  on public.categories
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own categories"
  on public.categories
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own categories"
  on public.categories
  for delete
  using (auth.uid() = user_id);

create policy "Users can view their own transactions"
  on public.transactions
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.transactions
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on public.transactions
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on public.transactions
  for delete
  using (auth.uid() = user_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_transactions_updated_at
  before update on public.transactions
  for each row
  execute function public.set_updated_at();

grant usage on schema public to authenticated;
grant usage on schema public to anon;

grant select, insert, update, delete
on public.categories
to authenticated;

grant select, insert, update, delete
on public.transactions
to authenticated;