import { FounderLens } from '@/types/report';
import { getScoreColor } from '@/lib/utils';
import { Scissors, Target } from 'lucide-react';

interface FounderLensCardProps {
  lens: FounderLens;
}

export default function FounderLensCard({ lens }: FounderLensCardProps) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-foreground/10 bg-card shadow-sm">
      {/* Accent bar top */}
      <div className="h-1 bg-accent" />

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-lg font-bold text-foreground">{lens.name}</h4>
          <span className={`font-display text-3xl font-extrabold ${getScoreColor(lens.score)}`}>
            {lens.score}<span className="text-base font-bold opacity-40">/10</span>
          </span>
        </div>

        <p className="mt-3 text-sm text-muted">{lens.main_critique}</p>

        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3">
            <Scissors className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-500">What to Cut</p>
              <p className="mt-1 text-sm text-foreground/80">{lens.what_to_cut}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-600">Better Positioning</p>
              <p className="mt-1 text-sm text-foreground/80">{lens.better_positioning}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
