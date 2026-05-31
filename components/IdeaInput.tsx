'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRODUCT_TYPES = [
  { value: 'website', label: 'Website' },
  { value: 'saas', label: 'SaaS' },
  { value: 'ai_tool', label: 'AI Tool' },
  { value: 'directory', label: 'Directory' },
  { value: 'content_site', label: 'Content Site' },
  { value: 'chrome_extension', label: 'Chrome Extension' },
  { value: 'mobile_app', label: 'Mobile App' },
  { value: 'other', label: 'Other' },
];

const MONETIZATION_PLANS = [
  { value: 'ads', label: 'Ads' },
  { value: 'affiliate', label: 'Affiliate' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'one_time', label: 'One-time payment' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'not_sure', label: 'Not sure' },
];

const DISTRIBUTION_PLANS = [
  { value: 'seo', label: 'SEO' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'product_hunt', label: 'Product Hunt' },
  { value: 'paid_ads', label: 'Paid ads' },
  { value: 'not_sure', label: 'Not sure' },
];

const MVP_TIMELINES = [
  { value: '1_day', label: '1 day' },
  { value: '3_days', label: '3 days' },
  { value: '7_days', label: '7 days' },
  { value: '14_days', label: '14 days' },
  { value: '30_days', label: '30 days' },
];

interface IdeaInputProps {
  initialExample?: string;
  isLoggedIn?: boolean;
}

export default function IdeaInput({ initialExample, isLoggedIn }: IdeaInputProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    description: initialExample || '',
    targetUser: '',
    productType: '',
    monetizationPlan: '',
    distributionPlan: '',
    mvpTimeline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.description.trim()) {
      setError('Please describe your idea');
      return;
    }

    if (form.description.length > 2000) {
      setError('Description must be 2000 characters or less');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: form.description,
          targetUser: form.targetUser || undefined,
          productType: form.productType || undefined,
          monetizationPlan: form.monetizationPlan || undefined,
          distributionPlan: form.distributionPlan || undefined,
          mvpTimeline: form.mvpTimeline || undefined,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push('/login?redirectTo=/idea/new');
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to validate idea');
      }

      router.push(`/report/${data.report.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      <div className="shell-panel p-5 sm:p-7">
        {!isLoggedIn && (
          <div className="mb-6 rounded-[8px] border border-accent/25 bg-accent/10 p-4 text-sm text-foreground">
            You need to <a href="/login?redirectTo=/idea/new" className="font-bold underline">log in</a> to validate your idea. It&apos;s free!
          </div>
        )}

        <div>
          <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-muted">
            Describe your idea
          </label>
          <textarea
            id="description"
            rows={5}
            maxLength={2000}
            className="field-surface mt-2 block w-full resize-none px-4 py-3 text-foreground"
            placeholder="I want to build a..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <p className="mt-1 text-right text-xs text-muted">
            {form.description.length}/2000
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="targetUser" className="block text-xs font-bold uppercase tracking-wider text-muted">
              Target user (optional)
            </label>
            <input
              type="text"
              id="targetUser"
              className="field-surface mt-2 block w-full px-4 py-3 text-foreground"
              placeholder="Indie hackers, developers..."
              value={form.targetUser}
              onChange={(e) => setForm({ ...form, targetUser: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="productType" className="block text-xs font-bold uppercase tracking-wider text-muted">
              Product type (optional)
            </label>
            <select
              id="productType"
              className="field-surface mt-2 block w-full px-4 py-3 text-foreground"
              value={form.productType}
              onChange={(e) => setForm({ ...form, productType: e.target.value })}
            >
              <option value="">Select type...</option>
              {PRODUCT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 flex items-center gap-1.5 rounded-full px-1 text-sm font-bold text-muted hover:text-foreground"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <ChevronDown className={cn('h-4 w-4 transition-transform', showAdvanced && 'rotate-180')} />
          Advanced options
        </button>

        {showAdvanced && (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { id: 'monetizationPlan', label: 'Monetization', options: MONETIZATION_PLANS },
              { id: 'distributionPlan', label: 'Distribution', options: DISTRIBUTION_PLANS },
              { id: 'mvpTimeline', label: 'MVP Timeline', options: MVP_TIMELINES },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-xs font-bold uppercase tracking-wider text-muted">
                  {field.label}
                </label>
                <select
                  id={field.id}
                  className="field-surface mt-2 block w-full px-3 py-3 text-foreground"
                  value={form[field.id as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                >
                  <option value="">Select...</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-8 w-full py-4 text-base font-bold tracking-tight disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing your idea... <span className="text-xs opacity-70">(~15s)</span>
            </span>
          ) : (
            'Get Brutal Roast (Free)'
          )}
        </button>
      </div>
    </form>
  );
}
