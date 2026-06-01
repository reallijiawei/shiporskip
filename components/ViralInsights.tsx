import { ViralInsights as ViralInsightsType } from '@/types/report';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface ViralInsightsProps {
  insights: ViralInsightsType;
}

export default function ViralInsights({ insights }: ViralInsightsProps) {
  if (!insights || !insights.lessons || insights.lessons.length === 0) return null;

  const isPivot = insights.section_type === 'pivot_suggestions';

  return (
    <div className="rounded-[8px] border border-l-4 border-foreground/10 bg-card/90 p-6 shadow-sm" style={{ borderLeftColor: isPivot ? '#f97316' : '#22c55e' }}>
      <div className="flex items-center gap-3">
        {isPivot ? (
          <RefreshCw className="h-5 w-5 text-orange-500" />
        ) : (
          <TrendingUp className="h-5 w-5 text-green-600" />
        )}
        <h3 className={`font-display text-xl font-bold ${isPivot ? 'text-orange-600' : 'text-green-600'}`}>
          {isPivot ? 'If You Insist...' : 'What Winners Did Right'}
        </h3>
      </div>

      <p className="mt-2 text-sm text-muted">{insights.intro}</p>

      <div className="mt-4 space-y-3">
        {insights.lessons.map((lesson, i) => (
          <div key={i} className="rounded-[8px] border border-foreground/10 bg-card p-4">
            <p className="text-sm text-foreground/80">{lesson.lesson}</p>
            <p className="mt-1 text-xs text-muted">{lesson.relevance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
