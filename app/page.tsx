'use client';

import Hero from '@/components/Hero';
import PricingTable from '@/components/PricingTable';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Eye,
  Hammer,
  Radar,
  Skull,
  Sparkles,
  XCircle,
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Paste the messy version',
    description: 'No polished pitch needed. Describe the idea, target user, monetization, and how you think you will get traffic.',
  },
  {
    step: '02',
    title: 'Get the objections first',
    description: 'ShipOrSkip looks for weak demand, crowded positioning, bad distribution, unclear payment intent, and fragile MVP scope.',
  },
  {
    step: '03',
    title: 'Leave with a next test',
    description: 'You get a verdict and a practical validation move: build now, narrow the niche, test demand, or skip cleanly.',
  },
];

const INCLUDED = [
  'Build / Skip / Validate First verdict',
  'The objections a smart customer would raise',
  'Market, SEO, distribution, and monetization scoring',
  'Failure pattern detection before you write code',
  '10-expert panel analysis in the Deep Report',
  'MVP scope: must-have, nice-to-have, cut for V1',
];

const EXCLUDED = [
  'Motivational founder therapy',
  'VC pitch deck advice',
  'A 40-page business plan nobody reads',
];

const PAINS = [
  {
    icon: Clock3,
    title: 'You can lose a month to a polite lie.',
    copy: 'The expensive part is not code. It is building for a fake buyer because everyone around you was too nice.',
  },
  {
    icon: CircleDollarSign,
    title: 'Most ideas fail at payment intent.',
    copy: 'ShipOrSkip forces the uncomfortable question: who pays, why now, and what cheaper substitute already exists?',
  },
  {
    icon: Radar,
    title: 'Distribution is part of the product.',
    copy: 'A good idea with no first channel is just a private hobby. The report grades how the idea reaches strangers.',
  },
];

const REPORT_SECTIONS = [
  { icon: Eye, title: 'Demand signal', copy: 'Is there visible pain, search intent, or community discussion?' },
  { icon: Skull, title: 'Failure patterns', copy: 'Common traps like "too crowded", "free tool, bad business", or weak urgency.' },
  { icon: Hammer, title: 'MVP scope', copy: 'What to build first, what to postpone, and what to cut entirely.' },
  { icon: Sparkles, title: 'Better version', copy: 'A sharper positioning angle if the raw idea is too generic.' },
];

const MAKER_RULES = [
  'Charge the idea rent before it gets your time.',
  'Prefer a painful niche over a huge vague market.',
  'If distribution is hand-wavy, the idea is not ready.',
  'A skip verdict is a win if it saves three weekends.',
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
                They feel exciting, obvious, and &ldquo;only a weekend away.&rdquo; Then the weekend
                becomes a month and the market stays silent.
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
              Three steps from fuzzy idea to honest decision.
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
                A teardown, not a horoscope.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
                The report is built for the moment before you open Cursor and start
                coding. It turns a vague product idea into a decision you can act on.
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
                <p className="text-xs font-black uppercase text-background/50">Deep report excerpt</p>
                <p className="mt-3 font-display text-3xl font-black">Consensus: Validate First</p>
                <p className="mt-3 text-sm leading-6 text-background/62">
                  Strong pain, weak wedge. Do not build the broad version. Test the
                  narrower buyer with a paid waitlist or concierge MVP.
                </p>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-foreground/10 p-5 sm:border-r sm:border-b-0">
                  <p className="text-xs font-black uppercase text-red-600">Cut</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Generic dashboard, broad AI positioning, and any feature that does
                    not prove payment intent.
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-xs font-black uppercase text-green-700">Test</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    One buyer segment, one landing page, one hard CTA, one acquisition
                    channel for seven days.
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
              <span className="pill-accent">Founder rules</span>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-background sm:text-5xl">
                The page is opinionated because the product is opinionated.
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
