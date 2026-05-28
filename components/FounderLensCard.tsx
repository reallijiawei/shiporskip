import { FounderLens } from '@/types/report';
import { getScoreColor } from '@/lib/utils';
import { Lightbulb, Scissors, Target } from 'lucide-react';

interface FounderLensCardProps {
  lens: FounderLens;
}

export default function FounderLensCard({ lens }: FounderLensCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{lens.name}</h4>
        <span className={`text-2xl font-bold ${getScoreColor(lens.score)}`}>
          {lens.score}/10
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-600">{lens.main_critique}</p>

      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-2">
          <Scissors className="mt-0.5 h-4 w-4 text-red-500" />
          <div>
            <p className="text-xs font-medium text-gray-500">What to Cut</p>
            <p className="text-sm text-gray-700">{lens.what_to_cut}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Target className="mt-0.5 h-4 w-4 text-green-500" />
          <div>
            <p className="text-xs font-medium text-gray-500">Better Positioning</p>
            <p className="text-sm text-gray-700">{lens.better_positioning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
