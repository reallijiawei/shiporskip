import { MarketEvidence as MarketEvidenceType } from '@/types/report';
import { cn } from '@/lib/utils';

interface MarketEvidenceProps {
  evidence: MarketEvidenceType;
}

function SignalBadge({ label, value }: { label: string; value: string }) {
  const colorMap: Record<string, string> = {
    weak: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-foreground',
    strong: 'bg-green-600 text-white',
    low: 'bg-green-600 text-white',
    high: 'bg-red-500 text-white',
  };

  return (
    <div className="flex items-center justify-between border-b border-foreground/10 py-3">
      <span className="text-sm text-muted">{label}</span>
      <span className={cn('pill-accent', colorMap[value] || 'bg-foreground/10 text-foreground')}>
        {value}
      </span>
    </div>
  );
}

export default function MarketEvidence({ evidence }: MarketEvidenceProps) {
  return (
    <div className="shell-panel p-6">
      <h3 className="font-display text-xl font-bold text-foreground">Market Evidence</h3>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm font-medium text-muted">Evidence Strength:</span>
        <div className="flex-1">
          <div className="score-bar-track">
            <div
              className="score-bar-fill"
              style={{
                width: `${evidence.evidence_strength * 10}%`,
                background: `linear-gradient(90deg, #ef4444 0%, #eab308 50%, #22c55e 100%)`,
              }}
            />
          </div>
        </div>
        <span className="font-display text-lg font-bold">{evidence.evidence_strength}/10</span>
      </div>

      <div className="mt-4">
        <SignalBadge label="Search Demand" value={evidence.search_demand_signal} />
        <SignalBadge label="Community Discussion" value={evidence.community_discussion_signal} />
        <SignalBadge label="Competition" value={evidence.competition_signal} />
        <SignalBadge label="Monetization" value={evidence.monetization_signal} />
      </div>

      {evidence.notable_competitors && evidence.notable_competitors.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Notable Competitors</h4>
          <ul className="mt-3 space-y-2">
            {evidence.notable_competitors.map((competitor, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="h-1.5 w-1.5 bg-foreground/20" />
                {competitor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
