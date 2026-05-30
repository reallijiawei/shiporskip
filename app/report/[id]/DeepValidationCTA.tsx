'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

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
    <div className="noise bg-foreground p-8 text-center">
      <h3 className="font-display text-2xl font-extrabold tracking-tight text-background">
        Unlock Deep Validation
      </h3>
      <p className="mt-3 text-background/50 max-w-md mx-auto">
        Get founder-inspired lenses, failure pattern analysis,
        and MVP scope — powered by Claude Sonnet.
      </p>
      <p className="mt-4 font-display text-4xl font-extrabold text-accent">$9</p>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 bg-accent px-8 py-4 text-base font-bold tracking-tight text-foreground transition-transform hover:scale-105 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
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
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
