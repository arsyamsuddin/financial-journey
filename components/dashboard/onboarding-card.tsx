import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OnboardingCardProps = {
  ctaHref: string;
  ctaLabel: string;
  description: string;
  eyebrow: string;
  title: string;
};

export function OnboardingCard({
  ctaHref,
  ctaLabel,
  description,
  eyebrow,
  title,
}: OnboardingCardProps) {
  return (
    <article className="min-w-0 rounded-2xl bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 sm:p-6">
      <p className="text-sm font-medium text-emerald-700">{eyebrow}</p>
      <h2 className="mt-3 text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <a
        href={ctaHref}
        className={cn(buttonVariants(), "mt-5 h-10 w-full sm:w-auto")}
      >
        {ctaLabel}
      </a>
    </article>
  );
}
