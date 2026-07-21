export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef7f2_100%)] text-foreground">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div>
            <div className="h-4 w-12 rounded-full bg-slate-200" />
            <div className="mt-2 h-3 w-28 rounded-full bg-slate-100" />
          </div>
          <div className="h-9 w-20 rounded-lg bg-slate-200" />
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="h-80 animate-pulse rounded-[2rem] bg-slate-900/90" />
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <SkeletonGrid count={5} />
            <div className="h-80 animate-pulse rounded-[1.75rem] bg-white/70 ring-1 ring-slate-900/5" />
          </div>
          <SkeletonGrid count={4} />
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-96 animate-pulse rounded-[1.75rem] bg-white/70 ring-1 ring-slate-900/5" />
          <div className="h-96 animate-pulse rounded-[1.75rem] bg-white/70 ring-1 ring-slate-900/5" />
        </div>
      </section>
    </main>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="h-24 animate-pulse rounded-3xl bg-white/70 ring-1 ring-slate-900/5"
        />
      ))}
    </div>
  );
}
