import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="noise relative overflow-hidden bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Decorative accent */}
          <div className="animate-fade-up mx-auto mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-foreground/20" />
            <span className="pill-accent">BRUTAL HONESTY</span>
            <span className="h-px w-12 bg-foreground/20" />
          </div>

          <h1 className="animate-fade-up delay-100 font-display text-5xl font-extrabold tracking-tight text-foreground leading-[0.95] sm:text-7xl">
            Validate your indie product idea
          </h1>
          <p className="animate-fade-up delay-200 mt-4 font-display text-2xl font-bold text-muted sm:text-3xl">
            before you waste weeks building it.
          </p>

          <p className="animate-fade-up delay-300 mt-6 text-lg leading-8 text-muted max-w-xl mx-auto">
            Most people will tell you your idea sounds interesting. We tell you whether it&apos;s
            worth building. Get a Build / Skip / Validate First verdict with market signals
            and failure pattern detection.
          </p>

          <div className="animate-fade-up delay-400 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/idea/new"
              className="inline-flex items-center gap-2 bg-accent px-8 py-4 text-base font-bold tracking-tight text-foreground transition-transform hover:scale-105 hover:bg-accent-hover"
            >
              Validate Your Idea
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 border-2 border-foreground/20 px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-foreground/40"
            >
              How it works
            </Link>
          </div>

          <div className="animate-fade-up delay-500 mt-14 flex flex-wrap items-center justify-center gap-3">
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
      <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rotate-12 border-2 border-foreground/5" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-64 w-64 -rotate-6 border-2 border-foreground/5" />
    </section>
  );
}
