'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import VerdictCard from '@/components/VerdictCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import FailurePatterns from '@/components/FailurePatterns';
import MarketEvidence from '@/components/MarketEvidence';
import DeepValidationCTA from './DeepValidationCTA';
import ExpertPanel from '@/components/ExpertPanel';
import { Report } from '@/types/report';
import { getVerdictColor, getVerdictLabel } from '@/lib/utils';
import { downloadReportHTML } from '@/lib/download-report';
import { Loader2, Download } from 'lucide-react';

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const [report, setReport] = useState<Report | null>(null);
  const [ideaId, setIdeaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
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
          verdict={isBasic ? undefined : report.verdict}
          overallScore={isBasic ? null : report.overall_score}
          oneSentenceSummary={content.one_sentence_summary}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => downloadReportHTML(report)}
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download report
          </button>
        </div>

        {!isBasic && report.scores && (
          <div className="mt-8">
            <ScoreBreakdown scores={report.scores} />
          </div>
        )}

        {!isBasic && content.score_explanation && (
          <div className="mt-3 rounded-[8px] border border-foreground/10 bg-card/90 px-5 py-3 shadow-sm">
            <p className="text-xs text-muted leading-relaxed">
              <span className="font-semibold text-foreground/60">Scoring methodology:</span>{' '}
              {content.score_explanation}
            </p>
          </div>
        )}

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

        {isBasic && content.improvement_suggestions && content.improvement_suggestions.length > 0 && (
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

        {isBasic && content.teaser_experts && content.teaser_experts.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Expert Perspectives</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {content.teaser_experts.map((opinion: any) => (
                <div key={opinion.expert_id} className="rounded-[8px] border border-foreground/10 bg-card/90 shadow-sm overflow-hidden">
                  <div className="h-1 bg-foreground/10" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display text-sm font-bold text-foreground truncate">
                        {opinion.expert_name}'s thinking framework
                      </h4>
                      <span className={`shrink-0 ml-2 pill-accent text-[10px] ${getVerdictColor(opinion.verdict)}`}>
                        {getVerdictLabel(opinion.verdict)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground leading-snug">
                      &ldquo;{opinion.one_line_take}&rdquo;
                    </p>
                    <ul className="mt-2 space-y-1">
                      {opinion.key_arguments.map((arg: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted">
                          <span className="mt-1 h-1 w-1 shrink-0 bg-foreground/20" />
                          <span>{arg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-sm text-muted">
              3 of 10 expert perspectives shown.{' '}
              <span className="font-semibold text-foreground/70">Unlock Deep Validation to see all 10.</span>
            </p>
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

        {!isBasic && content.mvp_scope && (report.verdict === 'build_now' || report.verdict === 'validate_first') && (
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

        {!isBasic && content.best_version_of_idea && (report.verdict === 'build_now' || report.verdict === 'validate_first') && (
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
