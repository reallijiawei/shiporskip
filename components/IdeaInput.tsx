'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronDown } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {!isLoggedIn && (
          <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
            You need to <a href="/login?redirectTo=/idea/new" className="font-semibold underline">log in</a> to validate your idea. It&apos;s free!
          </div>
        )}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Describe your idea
          </label>
          <textarea
            id="description"
            rows={4}
            maxLength={2000}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            placeholder="I want to build a..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {form.description.length}/2000
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="targetUser" className="block text-sm font-medium text-gray-700">
              Target user (optional)
            </label>
            <input
              type="text"
              id="targetUser"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              placeholder="Indie hackers, developers..."
              value={form.targetUser}
              onChange={(e) => setForm({ ...form, targetUser: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
              Product type (optional)
            </label>
            <select
              id="productType"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900"
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
          className="mt-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          Advanced options
        </button>

        {showAdvanced && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="monetizationPlan" className="block text-sm font-medium text-gray-700">
                Monetization
              </label>
              <select
                id="monetizationPlan"
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                value={form.monetizationPlan}
                onChange={(e) => setForm({ ...form, monetizationPlan: e.target.value })}
              >
                <option value="">Select...</option>
                {MONETIZATION_PLANS.map((plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="distributionPlan" className="block text-sm font-medium text-gray-700">
                Distribution
              </label>
              <select
                id="distributionPlan"
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                value={form.distributionPlan}
                onChange={(e) => setForm({ ...form, distributionPlan: e.target.value })}
              >
                <option value="">Select...</option>
                {DISTRIBUTION_PLANS.map((plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="mvpTimeline" className="block text-sm font-medium text-gray-700">
                MVP Timeline
              </label>
              <select
                id="mvpTimeline"
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                value={form.mvpTimeline}
                onChange={(e) => setForm({ ...form, mvpTimeline: e.target.value })}
              >
                <option value="">Select...</option>
                {MVP_TIMELINES.map((timeline) => (
                  <option key={timeline.value} value={timeline.value}>
                    {timeline.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing your idea...
            </span>
          ) : (
            'Get Brutal Roast (Free)'
          )}
        </button>
      </div>
    </form>
  );
}
