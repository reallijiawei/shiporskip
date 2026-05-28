import { cn, getVerdictColor, getVerdictLabel, getScoreColor } from '@/lib/utils';
import { Verdict } from '@/types/report';
import { ThumbsUp, ThumbsDown, AlertTriangle, Zap } from 'lucide-react';

interface VerdictCardProps {
  verdict: Verdict;
  overallScore: number;
  oneSentenceSummary: string;
}

function getVerdictIcon(verdict: Verdict) {
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
  return (
    <div className={cn('rounded-2xl border-2 p-8', getVerdictColor(verdict))}>
      <div className="flex items-center gap-4">
        {getVerdictIcon(verdict)}
        <div>
          <h2 className="text-3xl font-bold">{getVerdictLabel(verdict)}</h2>
          <p className="mt-1 text-lg opacity-90">{oneSentenceSummary}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="text-center">
          <p className="text-sm font-medium opacity-75">Overall Score</p>
          <p className={cn('text-5xl font-bold', getScoreColor(overallScore))}>
            {overallScore}
          </p>
          <p className="text-sm opacity-75">/ 100</p>
        </div>
      </div>
    </div>
  );
}
