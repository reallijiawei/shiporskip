import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="noise relative overflow-hidden bg-background pt-16 pb-10 sm:pt-24 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mx-auto mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-foreground/20" />
            <span className="pill-accent">AI-POWERED VERDICT</span>
            <span className="h-px w-12 bg-foreground/20" />
          </div>

          <h1 className="animate-fade-up delay-100 font-display text-4xl font-bold tracking-tight text-foreground leading-[1.1] sm:text-6xl">
            Validate your indie product idea
          </h1>
          <p className="animate-fade-up delay-200 mt-3 font-display text-xl font-semibold text-muted sm:text-2xl">
            before you waste weeks building it.
          </p>

          <p className="animate-fade-up delay-300 mt-5 text-base leading-7 text-muted max-w-xl mx-auto">
            Most people will tell you your idea sounds interesting. We tell you whether it&apos;s
            worth building. Get a Build / Skip / Validate First verdict with market signals
            and failure pattern detection.
          </p>

          <div className="animate-fade-up delay-400 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/idea/new"
              className="inline-flex items-center gap-2 bg-accent px-8 py-3.5 text-base font-bold tracking-tight text-white transition-transform hover:scale-105 hover:bg-accent-hover"
            >
              Validate Your Idea
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 border-2 border-foreground/20 px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-foreground/40"
            >
              How it works
            </Link>
          </div>

          <div className="animate-fade-up delay-500 mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-medium text-muted">Try an example:</span>
            {[
              'AI habit tracker for smokers',
              'Directory of one-time purchase software',
              'Chrome extension for saving Reddit posts',
            ].map((example) => (
              <Link
                key={example}
                href={`/idea/new?example=${encodeURIComponent(example)}`}
                className="border-b-2 border-dashed border-foreground/20 px-3 py-1 text-sm text-muted transition-all hover:border-accent hover:text-foreground hover:line-through"
              >
                {example}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rotate-12 border-2 border-foreground/5" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 -rotate-6 border-2 border-foreground/5" />
    </section>
  );
}
