import Link from "next/link";
import type { ComponentType } from "react";
import { BarChart3, ClipboardList, Sprout } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Record Transactions",
    description:
      "Capture income and spending clearly so your financial activity stays easy to review.",
    icon: ClipboardList,
  },
  {
    title: "Meaningful Insights",
    description:
      "Turn everyday records into a clearer picture of where your money goes.",
    icon: BarChart3,
  },
  {
    title: "Build Better Habits",
    description:
      "Notice patterns, stay aware, and make more intentional financial choices.",
    icon: Sprout,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Financial Journey
          </Link>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
            <Link href="#features" className="transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#about" className="transition-colors hover:text-foreground">
              About
            </Link>
          </div>

          <Button variant="outline" size="sm">
            Login
          </Button>
        </nav>
      </header>

      <section
        id="about"
        className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24"
      >
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-medium text-emerald-700">
            Financial awareness, made simple.
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Understand your financial condition.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Build financial awareness through simple recording and meaningful
            insights.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5"
              )}
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 shadow-sm shadow-emerald-950/5">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly view</p>
              <p className="mt-1 text-2xl font-semibold">$3,240</p>
            </div>
            <div className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Balanced
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <InsightRow label="Income recorded" value="$4,800" width="86%" />
            <InsightRow label="Essential spending" value="$1,920" width="58%" />
            <InsightRow label="Flexible spending" value="$760" width="34%" />
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-border/70 bg-muted/35">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Simple tools for everyday clarity.
            </h2>
            <p className="mt-3 text-muted-foreground">
              FiJo keeps the essentials focused so users can record, understand,
              and improve without extra complexity.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Financial Journey</p>
        <p>Simple records. Clearer decisions.</p>
      </footer>
    </main>
  );
}

function InsightRow({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-secondary">
        <div className="h-full rounded-full bg-emerald-600" style={{ width }} />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-sm shadow-emerald-950/5">
      <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
        <Icon className="size-5" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
