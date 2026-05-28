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
      '7-day validation sprint',
      'Launch angles (Reddit, X, PH, SEO)',
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
      '10 Launch Kits per month',
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
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Start free. Upgrade when you need deeper validation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'rounded-2xl border p-6',
              plan.highlighted
                ? 'border-gray-900 bg-gray-900 text-white shadow-xl'
                : 'border-gray-200 bg-white'
            )}
          >
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-2 text-3xl font-bold">{plan.price}</p>
            <p className={cn('mt-1 text-sm', plan.highlighted ? 'text-gray-300' : 'text-gray-500')}>
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className={cn('mt-0.5 h-4 w-4', plan.highlighted ? 'text-white' : 'text-gray-900')} />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={cn(
                'mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-semibold',
                plan.highlighted
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
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
