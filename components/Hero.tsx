import Link from 'next/link';
import { ArrowRight, CheckCircle2, Gauge, Search, TriangleAlert } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-8 sm:pt-16 sm:pb-12">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,253,247,0.92),rgba(255,253,247,0))]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8">
        <div className="relative min-w-0">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/80 px-3 py-1.5 shadow-sm">
            <Gauge className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase text-foreground/70">
              Founder-grade idea triage
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 max-w-4xl break-words font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-7xl">
            Validate your indie product idea
          </h1>
          <p className="animate-fade-up delay-200 mt-4 max-w-2xl font-display text-xl font-semibold text-muted sm:text-3xl">
            before you waste weeks building it.
          </p>

          <p className="animate-fade-up delay-300 mt-6 max-w-2xl text-lg leading-8 text-muted">
            Most people will tell you your idea sounds interesting. We tell you whether it&apos;s
            worth building. Get a Build / Skip / Validate First verdict with market signals
            and failure pattern detection.
          </p>

          <div className="animate-fade-up delay-400 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/idea/new"
              className="btn-primary inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 text-base font-bold tracking-tight sm:w-auto"
            >
              Validate Your Idea
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="btn-secondary inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-base font-semibold sm:w-auto"
            >
              How it works
            </Link>
          </div>

          <div className="animate-fade-up delay-500 mt-10 flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-foreground/60">Try an example</span>
            {[
              'AI habit tracker for smokers',
              'Directory of one-time purchase software',
              'Chrome extension for saving Reddit posts',
            ].map((example) => (
              <Link
                key={example}
                href={`/idea/new?example=${encodeURIComponent(example)}`}
                className="rounded-full border border-foreground/10 bg-card/75 px-3 py-1.5 text-sm text-muted transition-all hover:border-accent/50 hover:bg-card hover:text-foreground"
              >
                {example}
              </Link>
            ))}
          </div>
        </div>

        <div className="animate-fade-up delay-200 relative min-w-0">
          <div className="shell-panel overflow-hidden p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted">Live verdict</p>
                <p className="mt-1 font-display text-2xl font-bold">Validate First</p>
              </div>
              <div className="rounded-full bg-[var(--lime)] px-3 py-1 text-sm font-bold text-foreground">
                72/100
              </div>
            </div>

            <div className="mt-5 rounded-[8px] bg-foreground p-5 text-background">
              <p className="text-xs font-bold uppercase text-background/50">Risk memo</p>
              <p className="mt-3 text-lg font-semibold leading-7">
                Demand is plausible, but distribution is still an assumption. Test search intent
                and one acquisition channel before writing production code.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Search, label: 'Demand', value: 'Strong' },
                { icon: TriangleAlert, label: 'Risk', value: 'Channel' },
                { icon: CheckCircle2, label: 'MVP', value: '7 days' },
              ].map((item) => (
                <div key={item.label} className="rounded-[8px] border border-foreground/10 bg-card p-4">
                  <item.icon className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-xs font-bold uppercase text-muted">{item.label}</p>
                  <p className="mt-1 font-display text-xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-full bg-[var(--sky)]/45 blur-2xl" />
          <div className="absolute -bottom-5 left-8 -z-10 h-24 w-40 rounded-full bg-accent/20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
