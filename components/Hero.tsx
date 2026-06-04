import Link from 'next/link';
import {
  ArrowRight,
  BadgeDollarSign,
  Flame,
  Gauge,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

const SAMPLE_OBJECTIONS = [
  'Who is desperate enough to pay for this this week?',
  'What distribution channel works before the product is polished?',
  'What would make this 10x sharper than another AI wrapper?',
];

const SIGNALS = [
  { label: 'Speed', value: '< 2 min', icon: Gauge },
  { label: 'Score', value: '7 lenses', icon: Search },
  { label: 'Verdict', value: 'Build / Skip', icon: ShieldAlert },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-18 sm:pt-16">
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,253,247,0.96),rgba(255,253,247,0))]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/12 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="min-w-0">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/85 px-3 py-1.5 shadow-sm">
            <Flame className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase text-foreground/70">
              For solo founders who ship, not fantasize
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 max-w-5xl break-words font-display text-4xl font-black leading-[0.98] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            Kill bad startup ideas before they kill your weekends.
          </h1>

          <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-lg font-semibold leading-8 text-muted sm:text-2xl">
            Your friends say &ldquo;sounds cool.&rdquo; ShipOrSkip tells you if strangers would pay,
            where the idea breaks, and what to test before you build.
          </p>

          <div className="animate-fade-up delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/idea/new"
              className="btn-primary inline-flex w-[calc(100vw-2rem)] max-w-full items-center justify-center gap-2 px-8 py-4 text-base font-black tracking-tight sm:w-auto"
            >
              Roast my idea
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#sample-report"
              className="btn-secondary inline-flex w-[calc(100vw-2rem)] max-w-full items-center justify-center gap-2 px-7 py-4 text-base font-bold sm:w-auto"
            >
              See the teardown
            </Link>
          </div>

          <div className="animate-fade-up delay-400 mt-9 grid w-[calc(100vw-2rem)] max-w-2xl grid-cols-3 gap-2">
            {SIGNALS.map((signal) => (
              <div key={signal.label} className="rounded-[8px] border border-foreground/10 bg-card/75 p-3">
                <signal.icon className="h-4 w-4 text-accent" />
                <p className="mt-3 text-[11px] font-bold uppercase text-muted">{signal.label}</p>
                <p className="mt-1 font-display text-lg font-black text-foreground">{signal.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="sample-report" className="animate-fade-up delay-200 relative min-w-0">
          <div className="shell-panel w-[calc(100vw-2rem)] max-w-full overflow-hidden p-4 sm:w-auto sm:p-5">
            <div className="flex flex-col gap-4 border-b border-foreground/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase text-muted">Sample verdict</p>
                <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-foreground">
                  Validate First
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                  The pain is real. The first version is too broad. Win a tiny niche before
                  writing the full app.
                </p>
              </div>
              <div className="w-fit rounded-full bg-[var(--lime)] px-4 py-2 font-display text-xl font-black text-foreground">
                71/100
              </div>
            </div>

            <div className="mt-4 rounded-[8px] bg-foreground p-5 text-background">
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="h-5 w-5 text-[var(--lime)]" />
                <p className="text-xs font-black uppercase text-background/55">Will people pay?</p>
              </div>
              <p className="mt-3 text-lg font-bold leading-7">
                Maybe, but only if the product saves a founder money or removes a painful
                recurring task. &ldquo;Nice dashboard&rdquo; is not enough.
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              {SAMPLE_OBJECTIONS.map((objection, index) => (
                <div key={objection} className="flex gap-3 rounded-[8px] border border-foreground/10 bg-card p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-6 text-foreground/78">{objection}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[8px] border border-foreground/10 bg-[var(--sky)]/16 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <p className="text-xs font-black uppercase text-muted">Best next test</p>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                Launch a one-page SEO test with a payment intent CTA. If nobody clicks,
                do not build the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
