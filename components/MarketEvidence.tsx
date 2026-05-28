import { MarketEvidence as MarketEvidenceType } from '@/types/report';
import { Search, MessageCircle, TrendingUp, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketEvidenceProps {
  evidence: MarketEvidenceType;
}

function SignalBadge({ label, value }: { label: string; value: string }) {
  const colorMap: Record<string, string> = {
    weak: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    strong: 'bg-green-100 text-green-800',
    low: 'bg-green-100 text-green-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', colorMap[value] || 'bg-gray-100 text-gray-800')}>
        {value}
      </span>
    </div>
  );
}

export default function MarketEvidence({ evidence }: MarketEvidenceProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Market Evidence</h3>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm text-gray-500">Evidence Strength:</span>
        <div className="flex-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gray-900"
              style={{ width: `${evidence.evidence_strength * 10}%` }}
            />
          </div>
        </div>
        <span className="font-semibold">{evidence.evidence_strength}/10</span>
      </div>

      <div className="mt-4 space-y-2">
        <SignalBadge label="Search Demand" value={evidence.search_demand_signal} />
        <SignalBadge label="Community Discussion" value={evidence.community_discussion_signal} />
        <SignalBadge label="Competition" value={evidence.competition_signal} />
        <SignalBadge label="Monetization" value={evidence.monetization_signal} />
      </div>

      {evidence.notable_competitors && evidence.notable_competitors.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Notable Competitors</h4>
          <ul className="mt-2 space-y-1">
            {evidence.notable_competitors.map((competitor, i) => (
              <li key={i} className="text-sm text-gray-600">• {competitor}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
