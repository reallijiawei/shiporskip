import { FailurePattern } from '@/types/report';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FailurePatternsProps {
  patterns: FailurePattern[];
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'high':
      return 'bg-red-50 border-red-200 text-red-800';
    case 'medium':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    default:
      return 'bg-blue-50 border-blue-200 text-blue-800';
  }
}

export default function FailurePatterns({ patterns }: FailurePatternsProps) {
  if (!patterns || patterns.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Failure Patterns</h3>
        <p className="mt-2 text-gray-500">No major failure patterns detected.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Failure Patterns Detected</h3>
      <div className="mt-4 space-y-4">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className={cn('rounded-lg border p-4', getSeverityColor(pattern.severity))}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <h4 className="font-semibold">{pattern.pattern}</h4>
              <span className="ml-auto rounded-full px-2 py-0.5 text-xs font-medium">
                {pattern.severity}
              </span>
            </div>
            <p className="mt-2 text-sm">{pattern.why_it_matters}</p>
            <p className="mt-2 text-sm font-medium">
              How to reduce risk: {pattern.how_to_reduce_risk}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
