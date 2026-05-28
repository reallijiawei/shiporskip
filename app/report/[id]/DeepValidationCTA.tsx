'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface DeepValidationCTAProps {
  reportId: string;
  ideaId: string;
}

export default function DeepValidationCTA({ reportId, ideaId }: DeepValidationCTAProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpgrade = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
        <Sparkles className="h-6 w-6 text-purple-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">Unlock Deep Validation</h3>
      <p className="mt-2 text-gray-600">
        Get founder-inspired lenses, failure pattern analysis, a 7-day validation sprint,
        and launch angles — powered by Claude Sonnet.
      </p>
      <p className="mt-1 text-2xl font-bold text-purple-600">$9</p>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating checkout...
          </>
        ) : (
          'Get Deep Validation — $9'
        )}
      </button>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
