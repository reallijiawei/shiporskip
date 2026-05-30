'use client';

import Hero from '@/components/Hero';
import PricingTable from '@/components/PricingTable';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Describe your idea',
    description: 'Tell us what you want to build. The more detail, the better the roast.',
  },
  {
    step: '02',
    title: 'Get a brutal verdict',
    description: 'Our AI evaluates your idea with founder-inspired critique lenses and market signals.',
  },
  {
    step: '03',
    title: 'Validate or kill it',
    description: 'Build it if it passes. Kill it if it doesn\'t. No vague startup theory.',
  },
];

const INCLUDED = [
  'A clear Build / Skip / Validate First verdict',
  'Founder-inspired critique lenses',
  'Market signal checks',
  'Failure pattern detection',
  'Score breakdown across 7 dimensions',
  'MVP scope recommendations',
];

const EXCLUDED = [
  'Vague startup theory',
  'VC pitch deck advice',
];

const FAQ = [
  {
    question: 'Who is this for?',
    answer: 'Solo founders, indie hackers, and makers building micro-SaaS, AI tools, directories, content sites, Chrome extensions, and small online products.',
  },
  {
    question: 'Who is this NOT for?',
    answer: 'VC-backed startups, offline businesses, hardware, biotech, or anyone looking for a business plan generator.',
  },
  {
    question: 'Is the AI actually accurate?',
    answer: 'It gives you a structured framework to evaluate your idea. It\'s not perfect, but it\'s better than asking your friends who will just say "sounds cool!"',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, if you\'re not satisfied with your Deep Report, contact us within 7 days for a full refund.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 border-foreground/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-display text-lg font-semibold text-foreground">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="pb-4 text-muted">{answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* How It Works */}
      <section id="how-it-works" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="animate-fade-up font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="animate-fade-up delay-100 mt-3 text-base text-muted">
              Stop asking friends if your idea is good. They will be polite. We won&apos;t.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {STEPS.map((item, i) => (
              <div
                key={item.step}
                className="animate-fade-up accent-bar bg-card p-5 pl-7"
              >
                <span className="font-display text-5xl font-bold text-foreground/5">
                  {item.step}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="noise border-y-2 border-foreground/10 bg-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-background sm:text-4xl">
              What you get
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 max-w-4xl mx-auto">
            <div>
              <h3 className="font-display text-lg font-bold text-accent">Included</h3>
              <ul className="mt-5 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-accent" />
                    <span className="text-sm text-background/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-background/40">Not included</h3>
              <ul className="mt-5 space-y-3">
                {EXCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-background/20" />
                    <span className="text-sm text-background/30 line-through">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <PricingTable />
      </section>

      {/* FAQ */}
      <section className="border-y-2 border-foreground/10 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Questions
          </h2>

          <div className="mt-8">
            {FAQ.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="noise bg-foreground py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-background sm:text-4xl">
            Stop guessing. Start validating.
          </h2>
          <p className="mt-3 text-base text-background/60">
            Get a brutal, honest verdict on your indie product idea in under 2 minutes.
          </p>
          <Link
            href="/idea/new"
            className="mt-8 inline-flex items-center gap-2 bg-accent px-10 py-3.5 text-base font-bold tracking-tight text-foreground transition-transform hover:scale-105 hover:bg-accent-hover"
          >
            Validate Your Idea Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
