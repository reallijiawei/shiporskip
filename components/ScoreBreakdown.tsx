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
    <div className="border-2 border-foreground/10 bg-card p-6">
      <h3 className="font-display text-xl font-bold text-foreground">Score Breakdown</h3>
      <div className="mt-6 space-y-5">
        {(Object.entries(scores) as [keyof ScoreBreakdownType, number][]).map(([key, value], i) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground/70">
                {SCORE_LABELS[key]}
              </span>
              <span className={`font-display text-lg font-bold ${getScoreColor(value)}`}>
                {value}
              </span>
            </div>
            <div className="score-bar-track">
              <div
                className="score-bar-fill bg-foreground"
                style={{ width: `${value * 10}%` }}
              />
            </div>
            {i < Object.entries(scores).length - 1 && (
              <div className="mt-5 border-t border-foreground/5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
