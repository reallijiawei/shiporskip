import Link from 'next/link';
import { ArrowRight, Gauge, AlertTriangle, Lightbulb } from 'lucide-react';

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
            worth building. Get a brutal quick assessment with expert thinking frameworks
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
            <div className="border-b border-foreground/10 pb-4">
              <p className="text-xs font-bold uppercase text-muted">Quick Assessment</p>
              <p className="mt-2 font-display text-lg font-bold leading-snug">
                AI habit tracker for smokers — decent idea, but the market is saturated with free alternatives.
              </p>
            </div>

            <div className="mt-4 rounded-[8px] border-l-4 border-red-500 bg-foreground/5 p-4">
              <p className="text-xs font-bold uppercase text-red-500">Brutal Objections</p>
              <ul className="mt-2.5 space-y-2">
                {[
                  'Why would someone pay for this when iOS Health exists?',
                  'Smoking cessation apps have <2% paid conversion rates.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Lightbulb, name: 'First-Principles', take: 'Core need is real, but delivery must differ.' },
                { icon: AlertTriangle, name: 'Contrarian', take: 'Go niche — ex-smokers helping smokers.' },
                { icon: Gauge, name: 'Growth Hacker', take: 'TikTok virality is the only viable channel.' },
              ].map((item) => (
                <div key={item.name} className="rounded-[8px] border border-foreground/10 bg-card p-3">
                  <item.icon className="h-4 w-4 text-accent" />
                  <p className="mt-2 text-xs font-bold text-foreground">{item.name}</p>
                  <p className="mt-1 text-[11px] leading-snug text-muted">&ldquo;{item.take}&rdquo;</p>
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
