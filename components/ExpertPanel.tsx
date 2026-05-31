import { ExpertOpinion, Verdict } from '@/types/report';
import { getVerdictColor, getVerdictLabel } from '@/lib/utils';
import { Users } from 'lucide-react';

interface ExpertPanelProps {
  opinions: ExpertOpinion[];
}

function getConfidenceWidth(confidence: string) {
  switch (confidence) {
    case 'high': return 'w-full';
    case 'medium': return 'w-2/3';
    default: return 'w-1/3';
  }
}

function getConfidenceLabel(confidence: string) {
  switch (confidence) {
    case 'high': return 'High confidence';
    case 'medium': return 'Medium confidence';
    default: return 'Low confidence';
  }
}

function getConsensus(verdicts: Verdict[]): { label: string; color: string } {
  const counts: Record<string, number> = {};
  verdicts.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  if (!top) return { label: 'No consensus', color: 'text-muted' };
  if (top[1] === verdicts.length) return { label: 'Unanimous', color: 'text-green-600' };
  if (top[1] >= verdicts.length * 0.6) return { label: 'Majority agreement', color: 'text-blue-600' };
  return { label: 'Split opinions', color: 'text-orange-500' };
}

export default function ExpertPanel({ opinions }: ExpertPanelProps) {
  if (!opinions || opinions.length === 0) return null;

  const verdicts = opinions.map((o) => o.verdict);
  const consensus = getConsensus(verdicts);

  // Count by verdict
  const verdictCounts: Record<string, number> = {};
  verdicts.forEach((v) => { verdictCounts[v] = (verdictCounts[v] || 0) + 1; });
  const sortedVerdicts = Object.entries(verdictCounts)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div>
      {/* Header + Consensus */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-muted" />
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">Expert Panel</h3>
            <p className="text-xs text-muted">AI analysis through 10 founder thinking frameworks</p>
          </div>
        </div>
        <span className={`text-sm font-semibold ${consensus.color}`}>
          {consensus.label}
        </span>
      </div>

      {/* Verdict distribution bar */}
      <div className="rounded-[8px] border border-foreground/10 bg-card/90 p-4 mb-5 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {sortedVerdicts.map(([verdict, count]) => (
            <div key={verdict} className="flex items-center gap-2">
              <span className={`pill-accent ${getVerdictColor(verdict)}`}>
                {getVerdictLabel(verdict)}
              </span>
              <span className="font-display text-lg font-bold text-foreground">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expert cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {opinions.map((opinion) => (
          <div
            key={opinion.expert_id}
            className="rounded-[8px] border border-foreground/10 bg-card/90 shadow-sm overflow-hidden"
          >
            {/* Verdict color bar top */}
            <div className={`h-1 ${getVerdictColor(opinion.verdict).split(' ')[0] === 'text-green-700' ? 'bg-green-500' : getVerdictColor(opinion.verdict).split(' ')[0] === 'text-red-700' ? 'bg-red-500' : getVerdictColor(opinion.verdict).split(' ')[0] === 'text-yellow-700' ? 'bg-yellow-500' : getVerdictColor(opinion.verdict).split(' ')[0] === 'text-orange-700' ? 'bg-orange-500' : 'bg-blue-500'}`} />

            <div className="p-5">
              {/* Expert identity + verdict */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-display text-base font-bold text-foreground truncate">
                    {opinion.archetype}
                  </h4>
                  <p className="text-xs text-muted truncate">
                    {opinion.expert_name}'s thinking framework
                  </p>
                </div>
                <span className={`shrink-0 pill-accent ${getVerdictColor(opinion.verdict)}`}>
                  {getVerdictLabel(opinion.verdict)}
                </span>
              </div>

              {/* One-line take */}
              <p className="mt-3 text-sm font-medium text-foreground leading-snug">
                &ldquo;{opinion.one_line_take}&rdquo;
              </p>

              {/* Key arguments */}
              <ul className="mt-3 space-y-1.5">
                {opinion.key_arguments.map((arg, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted">
                    <span className="mt-1 h-1 w-1 shrink-0 bg-foreground/20" />
                    <span>{arg}</span>
                  </li>
                ))}
              </ul>

              {/* Blind spot */}
              {opinion.blind_spot && (
                <p className="mt-3 text-xs text-orange-600/80 border-t border-foreground/5 pt-2.5">
                  <span className="font-semibold">Blind spot:</span> {opinion.blind_spot}
                </p>
              )}

              {/* Confidence indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1 bg-foreground/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-foreground/20 rounded-full ${getConfidenceWidth(opinion.confidence)}`} />
                </div>
                <span className="text-[10px] text-muted shrink-0">
                  {getConfidenceLabel(opinion.confidence)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
