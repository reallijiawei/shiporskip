'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: null as string | null,
    description: 'Try it out',
    type: 'free' as const,
    features: [
      '5 Basic Roasts per month',
      '3 expert thinking frameworks',
      'Brutal objections & suggestions',
      '1 product insight per report',
    ],
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$9',
    period: '/mo',
    description: 'For serious builders',
    type: 'starter' as const,
    features: [
      '10 Basic Roasts per month',
      '4 Deep Validations per month',
      'Full 10-expert panel analysis',
      'Score breakdown & failure patterns',
      'MVP scope recommendations',
      'Up to 3 product insights per report',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$21',
    period: '/mo',
    description: 'For serial builders',
    type: 'pro' as const,
    features: [
      '30 Basic Roasts per month',
      '10 Deep Validations per month',
      'Everything in Starter',
      'Best for high-volume validation',
    ],
    highlighted: true,
  },
];

export default function PricingTable() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubscribe = async (plan: 'starter' | 'pro') => {
    setLoading(plan);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: plan }),
      });

      const data = await res.json();

      if (res.status === 401) {
        router.push('/login?redirectTo=/pricing');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(null);
    }
  };

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

      <div className="mt-12 grid grid-cols-1 items-start gap-5 sm:grid-cols-3">
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
                <span className="pill-accent">BEST VALUE</span>
              </div>
            )}

            <h3 className={cn('font-display text-lg font-bold', plan.highlighted ? 'text-background' : 'text-foreground')}>
              {plan.name}
            </h3>
            <p className={cn('mt-2 font-display text-5xl font-extrabold', plan.highlighted ? 'text-accent' : 'text-foreground')}>
              {plan.price}
              {plan.period && <span className="text-xl font-bold opacity-50">{plan.period}</span>}
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

            {plan.type === 'free' ? (
              <Link
                href="/idea/new"
                className="mt-6 block w-full py-2.5 text-center text-sm font-bold rounded-full border border-foreground/20 text-foreground transition-all hover:border-foreground/40 hover:bg-foreground/5"
              >
                Start Free
              </Link>
            ) : (
              <button
                onClick={() => handleSubscribe(plan.type)}
                disabled={loading !== null}
                className={cn(
                  'mt-6 block w-full py-2.5 text-center text-sm font-bold transition-all disabled:opacity-50',
                  plan.highlighted
                    ? 'rounded-full bg-accent text-white hover:bg-accent-hover'
                    : 'rounded-full border border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/5'
                )}
              >
                {loading === plan.type ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating checkout...
                  </span>
                ) : (
                  `Go ${plan.name}`
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        Or pay <span className="font-semibold text-foreground">$3 per Deep Validation</span> - no subscription needed.
      </p>
      <p className="mt-3 text-center text-xs leading-6 text-muted">
        Paid reports and plan credits are delivered inside your ShipOrSkip dashboard after checkout.
        Subscriptions renew monthly until cancelled through the Creem customer portal from your receipt
        or by contacting support.
      </p>
    </div>
  );
}
