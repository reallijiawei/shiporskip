'use client';

import Hero from '@/components/Hero';
import PricingTable from '@/components/PricingTable';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  BookOpenCheck,
  BrainCircuit,
  Eye,
  Radar,
  Skull,
  Sparkles,
  XCircle,
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Describe the product idea',
    description: 'Give the raw idea, audience, use case, monetization angle, and any distribution assumptions you already have.',
  },
  {
    step: '02',
    title: 'Run it through expert mindsets',
    description: 'The report applies multiple founder and investor thinking frameworks, then shows where they agree, disagree, and what each one misses.',
  },
  {
    step: '03',
    title: 'Apply winner patterns',
    description: 'ShipOrSkip compares your idea against patterns from products that grew, then turns those patterns into concrete improvements for your case.',
  },
];

const INCLUDED = [
  'Build / Skip / Validate First verdict',
  'Overall score and 7-part score breakdown',
  'Brutal objections and blind spots',
  'What Winners Did Right pattern matching',
  'Expert Panel with named thinking frameworks',
  'Failure patterns and how to reduce them',
  'Best Version of This Idea with concrete positioning advice',
];

const EXCLUDED = [
  'Motivational founder therapy',
  'VC pitch deck advice',
  'A 40-page business plan nobody reads',
];

const PAINS = [
  {
    icon: BrainCircuit,
    title: 'One opinion is too fragile.',
    copy: 'A single AI answer can sound confident and still miss the obvious. ShipOrSkip forces the idea through multiple expert frames.',
  },
  {
    icon: BookOpenCheck,
    title: 'Patterns beat vibes.',
    copy: 'The report does not stop at critique. It maps your idea to tactics seen in products that actually grew.',
  },
  {
    icon: Radar,
    title: 'Improvement should be specific.',
    copy: 'You get concrete suggestions like embeddable assets, paid PDF upgrades, SEO loops, or community submissions, depending on the idea.',
  },
];

const REPORT_SECTIONS = [
  { icon: Eye, title: 'Score breakdown', copy: 'Demand, buildability, distribution, monetization, SEO potential, moat, and solo-founder fit.' },
  { icon: Skull, title: 'Brutal objections', copy: 'The hard objections that would kill trust, traffic, revenue, or execution.' },
  { icon: BrainCircuit, title: 'Expert panel', copy: 'Multiple named thinking frameworks, each with verdict, argument, and blind spot.' },
  { icon: Sparkles, title: 'Best version', copy: 'A more focused version of the idea with sharper positioning and execution advice.' },
];

const MAKER_RULES = [
  'Do not trust one lens. Compare how different operators would judge the same idea.',
  'Look for repeatable growth patterns from products that already worked.',
  'Treat brutal objections as product requirements, not insults.',
  'The best output is not encouragement. It is a better version of the idea.',
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
    <div className="border-b border-foreground/10">
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

      {/* Pain */}
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="pill-accent">The real problem</span>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                Bad ideas do not feel bad at the start.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-muted">
                Most idea validators stop at a generic verdict. Your actual report needs
                to explain why experts disagree, what winners did right, and how to improve
                the idea before you spend time building.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {PAINS.map((pain) => (
                <div key={pain.title} className="shell-panel p-5">
                  <pain.icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-5 font-display text-xl font-black leading-tight text-foreground">
                    {pain.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{pain.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-y border-foreground/10 bg-card/45 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="pill-accent">How it works</span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              From raw idea to expert-backed improvement plan.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="animate-fade-up shell-panel p-6"
              >
                <span className="rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background">
                  {item.step}
                </span>
                <h3 className="mt-5 font-display text-xl font-black text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="pill-accent">What you get</span>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                The report mirrors how serious operators think.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
                It does not just say yes or no. It scores the idea, pressure-tests it
                through expert frameworks, applies winner patterns, and produces a stronger
                version of the concept.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {REPORT_SECTIONS.map((section) => (
                  <div key={section.title} className="rounded-[8px] border border-foreground/10 bg-card/80 p-4">
                    <section.icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-3 font-display text-lg font-black text-foreground">{section.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{section.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="shell-panel overflow-hidden">
              <div className="border-b border-foreground/10 bg-foreground p-6 text-background">
                <p className="text-xs font-black uppercase text-background/50">Report excerpt</p>
                <p className="mt-3 font-display text-3xl font-black">Consensus: Build Now</p>
                <p className="mt-3 text-sm leading-6 text-background/62">
                  Clear user pain and outdated competition make the idea worth building,
                  while niche size, SEO dependency, and monetization uncertainty keep the
                  score grounded.
                </p>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-foreground/10 p-5 sm:border-r sm:border-b-0">
                  <p className="text-xs font-black uppercase text-red-600">Expert blind spot</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    A strong UI can still be copied. The report flags where the moat is
                    thin and how the business could break.
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-xs font-black uppercase text-green-700">Winner pattern</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Turn users into distribution by offering embeddable assets, shareable
                    outputs, or community-curated submissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-y border-foreground/10 bg-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="pill-accent">Why it is useful</span>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-background sm:text-5xl">
                It gives you a better idea, not just a prettier score.
              </h2>
              <div className="mt-6 space-y-3">
                {MAKER_RULES.map((rule) => (
                  <div key={rule} className="flex gap-3 text-background/78">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--lime)]" />
                    <p className="text-sm font-semibold leading-6">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[8px] border border-background/10 bg-background/5 p-6">
              <h3 className="font-display text-lg font-black text-accent">Included</h3>
              <ul className="mt-5 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-background/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[8px] border border-background/10 bg-background/5 p-6">
              <h3 className="font-display text-lg font-black text-background/40">Not included</h3>
              <ul className="mt-5 space-y-3">
                {EXCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-background/25" />
                    <span className="text-sm text-background/30 line-through">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <PricingTable />
      </section>

      {/* FAQ */}
      <section className="border-y border-foreground/10 py-16">
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
      <section className="bg-foreground py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-background sm:text-4xl">
            Stop guessing. Start validating.
          </h2>
          <p className="mt-3 text-base text-background/60">
            Get a brutal, honest assessment of your indie product idea in under 2 minutes.
          </p>
          <Link
            href="/idea/new"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-10 py-3.5 text-base font-bold tracking-tight text-white transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            Validate Your Idea Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
