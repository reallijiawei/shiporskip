import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Try it out with a basic roast',
    features: [
      '3 Basic Roasts per month',
      'Build / Skip / Validate First verdict',
      '3 biggest risks',
      '3 improvement suggestions',
      'Basic score breakdown',
    ],
    cta: 'Start Free',
    href: '/idea/new',
    highlighted: false,
  },
  {
    name: 'Deep Report',
    price: '$9',
    description: 'One-time deep validation',
    features: [
      'Everything in Free',
      'Founder-inspired critique lenses',
      'Market signal analysis',
      'Failure pattern detection',
      'MVP scope recommendations',
    ],
    cta: 'Get Deep Report',
    href: '/idea/new',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$19/mo',
    description: 'For active indie hackers',
    features: [
      '20 Basic Roasts per month',
      '5 Deep Validations per month',
      'Save & access history',
      'Priority support',
    ],
    cta: 'Go Pro',
    href: '/idea/new',
    highlighted: false,
  },
  {
    name: 'Power',
    price: '$49/mo',
    description: 'For serial builders',
    features: [
      '100 Basic Roasts per month',
      '20 Deep Validations per month',
      'Deep competitor tracking',
      'Keyword history tracking',
      'API access',
    ],
    cta: 'Go Power',
    href: '/idea/new',
    highlighted: false,
  },
];

export default function PricingTable() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-3 text-base text-muted">
          Start free. Upgrade when you need deeper validation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'relative rounded-[8px] border p-6 transition-all',
              plan.highlighted
                ? 'z-10 border-foreground bg-foreground text-background shadow-2xl lg:-translate-y-3'
                : 'border-foreground/10 bg-card/85 shadow-sm hover:-translate-y-1 hover:border-foreground/25 hover:shadow-xl'
            )}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-6">
                <span className="pill-accent">BEST DEFAULT</span>
              </div>
            )}

            <h3 className={cn('font-display text-lg font-bold', plan.highlighted ? 'text-background' : 'text-foreground')}>
              {plan.name}
            </h3>
            <p className={cn('mt-2 font-display text-5xl font-extrabold', plan.highlighted ? 'text-accent' : 'text-foreground')}>
              {plan.price}
            </p>
            <p className={cn('mt-1 text-sm', plan.highlighted ? 'text-background/50' : 'text-muted')}>
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.highlighted ? 'text-accent' : 'text-foreground')} />
                  <span className={cn('text-sm', plan.highlighted ? 'text-background/80' : 'text-foreground/80')}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={cn(
                'mt-6 block w-full py-2.5 text-center text-sm font-bold transition-all',
                plan.highlighted
                  ? 'rounded-full bg-accent text-white hover:bg-accent-hover'
                  : 'rounded-full border border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/5'
              )}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
