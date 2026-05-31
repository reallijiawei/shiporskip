import { cn, getVerdictColor, getVerdictLabel, getScoreColor } from '@/lib/utils';
import { Verdict } from '@/types/report';
import { ThumbsUp, ThumbsDown, AlertTriangle, Zap, Search } from 'lucide-react';

interface VerdictCardProps {
  verdict?: Verdict;
  overallScore?: number | null;
  oneSentenceSummary: string;
}

function getVerdictIcon(verdict?: Verdict) {
  if (!verdict) return <Search className="h-8 w-8" />;
  switch (verdict) {
    case 'build_now':
      return <ThumbsUp className="h-8 w-8" />;
    case 'skip':
    case 'too_crowded':
      return <ThumbsDown className="h-8 w-8" />;
    case 'validate_first':
    case 'pivot':
      return <AlertTriangle className="h-8 w-8" />;
    default:
      return <Zap className="h-8 w-8" />;
  }
}

export default function VerdictCard({ verdict, overallScore, oneSentenceSummary }: VerdictCardProps) {
  if (!verdict) {
    return (
      <div className="overflow-hidden rounded-[8px] border border-foreground/10 bg-card/90 shadow-xl">
        <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
          <Search className="h-8 w-8 text-accent" />
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Quick Assessment
            </h2>
            <p className="mt-1 text-lg text-muted">{oneSentenceSummary}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-[8px] border shadow-xl', getVerdictColor(verdict))}>
      {/* Verdict banner */}
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
        {getVerdictIcon(verdict)}
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight">
            {getVerdictLabel(verdict)}
          </h2>
          <p className="mt-1 text-lg opacity-80">{oneSentenceSummary}</p>
        </div>
      </div>

      {/* Score strip */}
      {overallScore != null && (
        <div className="flex items-end gap-3 border-t border-current/10 bg-card/45 px-6 py-6 sm:px-8">
          <span className={cn('font-display text-8xl font-extrabold leading-none', getScoreColor(overallScore))}>
            {overallScore}
          </span>
          <span className="pb-2 text-2xl font-bold opacity-40">/100</span>
        </div>
      )}
    </div>
  );
}
