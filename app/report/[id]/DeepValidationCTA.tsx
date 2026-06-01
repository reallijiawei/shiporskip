'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const GENERATION_STAGES = [
  { label: 'Preparing', estimate: '~3s' },
  { label: 'Running 10 expert analyses in parallel', estimate: '~80s' },
  { label: 'Synthesizing verdict from expert conclusions', estimate: '~50s' },
  { label: 'Finalizing report', estimate: '~3s' },
];

interface DeepValidationCTAProps {
  reportId: string;
  ideaId: string;
  hasCredits?: boolean;
}

export default function DeepValidationCTA({ reportId, ideaId, hasCredits }: DeepValidationCTAProps) {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showPrice, setShowPrice] = useState(hasCredits === false);
  const [isFreePlan, setIsFreePlan] = useState(false);

  useEffect(() => {
    if (hasCredits !== undefined) return;
    fetch('/api/quota')
      .then((res) => res.json())
      .then((data) => {
        if (data.deep_validation_remaining > 0) setShowPrice(false);
        else setShowPrice(true);
        if (data.plan === 'free') setIsFreePlan(true);
      })
      .catch(() => {});
  }, [hasCredits]);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      // Try to start expert evaluations
      const expertsRes = await fetch('/api/deep-validation/experts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId }),
      });

      if (expertsRes.status === 402) {
        // No credits — show price and redirect to payment
        setShowPrice(true);
        setLoading(false);
        const checkoutRes = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'single', ideaId }),
        });

        const checkoutData = await checkoutRes.json();

        if (checkoutRes.status === 401) {
          window.location.href = '/login?redirectTo=/report/' + reportId;
          return;
        }

        if (!checkoutRes.ok) {
          throw new Error(checkoutData.error || 'Failed to create checkout');
        }

        if (checkoutData.url) {
          window.location.href = checkoutData.url;
        }
        return;
      }

      const expertsData = await expertsRes.json();
      if (!expertsRes.ok) {
        throw new Error(expertsData.error || 'Failed to run expert analysis');
      }

      // Has credits — generate deep validation
      setGenerating(true);
      setLoading(false);
      setStage(2);

      const validateRes = await fetch('/api/deep-validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId, expertPanel: expertsData.expertPanel }),
      });

      const validateData = await validateRes.json();
      if (!validateRes.ok) {
        throw new Error(validateData.error || 'Failed to generate report');
      }

      setStage(3);
      // Reload the page to show the deep validation report
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
      setGenerating(false);
    }
  };

  if (generating) {
    return (
      <div className="rounded-[8px] border border-accent/30 bg-accent/5 px-6 py-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Loader2 className="h-4 w-4 animate-spin text-accent" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {GENERATION_STAGES[stage]?.label || 'Preparing'}...
            </p>
            <p className="mt-0.5 text-xs text-muted">Takes about 2 minutes total</p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {GENERATION_STAGES.map((s, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${
                i < stage ? 'bg-accent' : i === stage ? 'bg-accent/40 animate-pulse' : 'bg-foreground/5'
              }`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="noise bg-foreground p-8 text-center">
      <h3 className="font-display text-2xl font-extrabold tracking-tight text-background">
        Unlock Deep Validation
      </h3>
      <p className="mt-3 text-background/50 max-w-md mx-auto">
        Get 10-expert panel analysis, failure patterns,
        and MVP scope — powered by DeepSeek.
      </p>
      {showPrice && (
        <>
          <p className="mt-4 font-display text-4xl font-extrabold text-accent">$3</p>
          <p className="mt-1 text-sm text-background/40">one-time per report</p>
        </>
      )}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 bg-accent px-8 py-4 text-base font-bold tracking-tight text-white transition-transform hover:scale-105 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating checkout...
          </>
        ) : (
          showPrice ? 'Get Deep Validation — $3' : 'Get Deep Validation'
        )}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {isFreePlan && (
        <p className="mt-4 text-xs text-background/40">
          Need more?{' '}
          <a href="/pricing" className="underline hover:text-background/60">
            Upgrade to Starter or Pro
          </a>{' '}
          for monthly deep validations.
        </p>
      )}
    </div>
  );
}
