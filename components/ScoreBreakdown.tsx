import { ScoreBreakdown as ScoreBreakdownType } from '@/types/report';
import { getScoreColor } from '@/lib/utils';

interface ScoreBreakdownProps {
  scores: ScoreBreakdownType;
}

const SCORE_LABELS: Record<keyof ScoreBreakdownType, string> = {
  demand: 'Demand',
  buildability: 'Buildability',
  distribution: 'Distribution',
  monetization: 'Monetization',
  seo_potential: 'SEO Potential',
  moat: 'Moat',
  solo_founder_fit: 'Solo Founder Fit',
};

export default function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Score Breakdown</h3>
      <div className="mt-4 space-y-4">
        {(Object.entries(scores) as [keyof ScoreBreakdownType, number][]).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="w-36 text-sm font-medium text-gray-600">
              {SCORE_LABELS[key]}
            </span>
            <div className="flex-1">
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gray-900 transition-all"
                  style={{ width: `${value * 10}%` }}
                />
              </div>
            </div>
            <span className={`w-8 text-right font-semibold ${getScoreColor(value)}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
