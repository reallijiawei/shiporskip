import { FailurePattern } from '@/types/report';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FailurePatternsProps {
  patterns: FailurePattern[];
}

function getSeverityBorder(severity: string) {
  switch (severity) {
    case 'high':
      return 'border-l-red-500';
    case 'medium':
      return 'border-l-yellow-500';
    default:
      return 'border-l-blue-400';
  }
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'high':
      return 'bg-red-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-foreground';
    default:
      return 'bg-blue-400 text-white';
  }
}

export default function FailurePatterns({ patterns }: FailurePatternsProps) {
  if (!patterns || patterns.length === 0) {
    return (
      <div className="shell-panel p-6">
        <h3 className="font-display text-xl font-bold text-foreground">Failure Patterns</h3>
        <p className="mt-2 text-muted">No major failure patterns detected.</p>
      </div>
    );
  }

  return (
    <div className="shell-panel p-6">
      <h3 className="font-display text-xl font-bold text-foreground">Failure Patterns Detected</h3>
      <div className="mt-6 space-y-4">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className={cn(
              'rounded-[8px] border border-l-4 border-foreground/10 bg-card p-5',
              getSeverityBorder(pattern.severity)
            )}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-muted" />
              <h4 className="font-display text-base font-bold text-foreground">{pattern.pattern}</h4>
              <span className={cn('ml-auto pill-accent', getSeverityBadge(pattern.severity))}>
                {pattern.severity}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{pattern.why_it_matters}</p>
            <p className="mt-2 text-sm font-medium text-foreground">
              How to reduce risk: <span className="font-normal text-muted">{pattern.how_to_reduce_risk}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
