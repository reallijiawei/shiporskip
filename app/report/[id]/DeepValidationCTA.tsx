'use client';

import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';

interface DeepValidationCTAProps {
  reportId: string;
}

export default function DeepValidationCTA({ reportId }: DeepValidationCTAProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/deep-validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId: reportId }),
      });

      const data = await response.json();

      if (data.requiresPayment && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.report) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to start deep validation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <Lock className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-xl font-semibold text-gray-900">
        Unlock Deep Validation
      </h3>
      <p className="mt-2 text-gray-600">
        Get founder-inspired critique lenses, failure pattern detection, a 7-day validation sprint,
        and launch angles for Reddit, X, Product Hunt, and SEO.
      </p>
      <button
        onClick={handleUpgrade}
        disabled={isLoading}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Unlock for $9'
        )}
      </button>
    </div>
  );
}
