'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import VerdictCard from '@/components/VerdictCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import FailurePatterns from '@/components/FailurePatterns';
import MarketEvidence from '@/components/MarketEvidence';
import DeepValidationCTA from './DeepValidationCTA';
import ExpertPanel from '@/components/ExpertPanel';
import { Report } from '@/types/report';
import { Loader2 } from 'lucide-react';

const GENERATION_STEPS = [
  { time: 0, text: 'Generating your Deep Validation report...' },
  { time: 10, text: 'Running expert panel analysis...' },
  { time: 25, text: 'Compiling verdicts from 10 perspectives...' },
  { time: 45, text: 'Almost there — finalizing report...' },
];

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const [report, setReport] = useState<Report | null>(null);
  const [ideaId, setIdeaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (generating) {
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [generating]);

  const loadReport = useCallback(async (id: string) => {
    const supabase = createClient();

    const { data: reportData } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (reportData) {
      setReport(reportData);
      setIdeaId(reportData.idea_id);
      return true;
    }

    const { data: idea } = await supabase
      .from('ideas')
      .select('id')
      .eq('id', id)
      .single();

    if (idea) {
      setIdeaId(idea.id);
      const { data: basicReport } = await supabase
        .from('reports')
        .select('*')
        .eq('idea_id', idea.id)
        .eq('report_type', 'basic_roast')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (basicReport) {
        setReport(basicReport);
        return true;
      }
    }

    return false;
  }, []);

  useEffect(() => {
    params.then(({ id }) => {
      loadReport(id).then((found) => {
        if (!found) setError('Report not found');
        setLoading(false);
      });
    });
  }, [params, loadReport]);

  useEffect(() => {
    if (!report || !ideaId || report.report_type !== 'basic_roast') return;

    const checkAndGenerate = async () => {
      const supabase = createClient();
      const { data: existingDeep } = await supabase
        .from('reports')
        .select('*')
        .eq('idea_id', ideaId)
        .eq('report_type', 'deep_validation')
        .single();

      if (existingDeep) {
        setReport(existingDeep);
        return;
      }

      setGenerating(true);
      try {
        const res = await fetch('/api/deep-validation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ideaId }),
        });

        const data = await res.json();

        if (res.status === 402) return;

        if (!res.ok) {
          console.error('[DeepValidation] API error:', data);
          return;
        }

        if (data.report?.id) {
          const { data: deepReport } = await supabase
            .from('reports')
            .select('*')
            .eq('id', data.report.id)
            .single();

          if (deepReport) setReport(deepReport);
        }
      } catch (err) {
        console.error('[DeepValidation] failed:', err);
      } finally {
        setGenerating(false);
      }
    };

    checkAndGenerate();
  }, [report, ideaId]);

  if (loading || generating) {
    const currentStep = GENERATION_STEPS.filter((s) => s.time <= elapsed).pop()!;
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{currentStep.text}</p>
          <p className="mt-1 text-xs text-muted">{elapsed}s elapsed</p>
        </div>
        {/* Progress bar */}
        <div className="w-64">
          <div className="h-1.5 bg-foreground/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((elapsed / 60) * 100, 95)}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-foreground">Report Not Found</h2>
          <p className="mt-2 text-muted">{error || 'This report does not exist.'}</p>
        </div>
      </div>
    );
  }

  const content = report.content_json;
  const isBasic = report.report_type === 'basic_roast';

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <VerdictCard
          verdict={report.verdict}
          overallScore={report.overall_score}
          oneSentenceSummary={content.one_sentence_summary}
        />

        <div className="mt-8">
          <ScoreBreakdown scores={report.scores} />
        </div>

        {content.brutal_objections && content.brutal_objections.length > 0 && (
          <div className="mt-8 rounded-[8px] border border-l-4 border-red-500 border-foreground/10 bg-card/90 p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold text-red-600">Brutal Objections</h3>
            <ul className="mt-4 space-y-3">
              {content.brutal_objections.map((objection: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="font-display font-bold text-red-400">{i + 1}.</span>
                  {objection}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isBasic && content.improvement_suggestions && (
          <div className="mt-8 rounded-[8px] border border-l-4 border-green-500 border-foreground/10 bg-card/90 p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold text-green-600">Improvement Suggestions</h3>
            <ul className="mt-4 space-y-3">
              {content.improvement_suggestions.map((suggestion: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="font-display font-bold text-green-400">{i + 1}.</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isBasic && ideaId && (
          <div className="mt-8">
            <DeepValidationCTA reportId={report.id} ideaId={ideaId} />
          </div>
        )}

        {!isBasic && content.market_evidence && (
          <div className="mt-8">
            <MarketEvidence evidence={content.market_evidence} />
          </div>
        )}

        {!isBasic && content.failure_patterns && (
          <div className="mt-8">
            <FailurePatterns patterns={content.failure_patterns} />
          </div>
        )}

        {!isBasic && content.mvp_scope && (
          <div className="shell-panel mt-8 p-6">
            <h3 className="font-display text-xl font-bold text-foreground">MVP Scope</h3>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { label: 'Must Have', color: 'text-green-600', items: content.mvp_scope.must_have },
                { label: 'Nice to Have', color: 'text-yellow-600', items: content.mvp_scope.nice_to_have },
                { label: 'Cut for V1', color: 'text-red-500', items: content.mvp_scope.cut_for_v1 },
              ].map((col) => (
                <div key={col.label}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>
                    {col.label}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {col.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-foreground/15" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isBasic && content.best_version_of_idea && (
          <div className="mt-8 rounded-[8px] border border-l-4 border-accent border-foreground/10 bg-card/90 p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold text-foreground">Best Version of This Idea</h3>
            <p className="mt-3 text-foreground/80">{content.best_version_of_idea}</p>
          </div>
        )}

        {!isBasic && content.expert_panel && content.expert_panel.length > 0 && (
          <div className="mt-8">
            <ExpertPanel opinions={content.expert_panel} />
          </div>
        )}
      </div>
    </div>
  );
}
