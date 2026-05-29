'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import VerdictCard from '@/components/VerdictCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import FounderLensCard from '@/components/FounderLensCard';
import FailurePatterns from '@/components/FailurePatterns';
import ValidationSprint from '@/components/ValidationSprint';
import MarketEvidence from '@/components/MarketEvidence';
import DeepValidationCTA from './DeepValidationCTA';
import LaunchAngles from './LaunchAngles';
import { Report } from '@/types/report';
import { Loader2 } from 'lucide-react';

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const [report, setReport] = useState<Report | null>(null);
  const [ideaId, setIdeaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const loadReport = useCallback(async (id: string) => {
    const supabase = createClient();

    // Try as report ID first
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

    // Try as idea ID — find the basic roast report
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

  // Initial load
  useEffect(() => {
    params.then(({ id }) => {
      loadReport(id).then((found) => {
        if (!found) setError('Report not found');
        setLoading(false);
      });
    });
  }, [params, loadReport]);

  // After report loads, check if we should auto-generate deep validation
  useEffect(() => {
    if (!report || !ideaId || report.report_type !== 'basic_roast') return;

    const checkAndGenerate = async () => {
      // Check if deep validation report already exists
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

      // Call API directly — it handles auth, quota check, and generation
      setGenerating(true);
      try {
        const res = await fetch('/api/deep-validation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ideaId }),
        });

        const data = await res.json();
        console.log('[DeepValidation] response:', res.status, data);

        if (res.status === 402) {
          // User hasn't paid — show the CTA
          return;
        }

        if (res.ok && data.report?.id) {
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
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        {generating && (
          <p className="text-sm text-gray-500">Generating your Deep Validation report...</p>
        )}
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
          <p className="mt-2 text-gray-600">{error || 'This report does not exist.'}</p>
        </div>
      </div>
    );
  }

  const content = report.content_json;
  const isBasic = report.report_type === 'basic_roast';

  return (
    <div className="py-12">
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
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <h3 className="text-lg font-semibold text-red-900">Brutal Objections</h3>
            <ul className="mt-4 space-y-3">
              {content.brutal_objections.map((objection: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-red-800">
                  <span className="font-bold">{i + 1}.</span>
                  {objection}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isBasic && content.improvement_suggestions && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
            <h3 className="text-lg font-semibold text-green-900">Improvement Suggestions</h3>
            <ul className="mt-4 space-y-3">
              {content.improvement_suggestions.map((suggestion: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-green-800">
                  <span className="font-bold">{i + 1}.</span>
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

        {!isBasic && content.founder_lenses && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Founder-Inspired Lenses</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.founder_lenses.map((lens: any, i: number) => (
                <FounderLensCard key={i} lens={lens} />
              ))}
            </div>
          </div>
        )}

        {!isBasic && content.failure_patterns && (
          <div className="mt-8">
            <FailurePatterns patterns={content.failure_patterns} />
          </div>
        )}

        {!isBasic && content.mvp_scope && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">MVP Scope</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-green-700">Must Have</h4>
                <ul className="mt-2 space-y-1">
                  {content.mvp_scope.must_have.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-yellow-700">Nice to Have</h4>
                <ul className="mt-2 space-y-1">
                  {content.mvp_scope.nice_to_have.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-700">Cut for V1</h4>
                <ul className="mt-2 space-y-1">
                  {content.mvp_scope.cut_for_v1.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {!isBasic && content.best_version_of_idea && (
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="text-lg font-semibold text-blue-900">Best Version of This Idea</h3>
            <p className="mt-2 text-blue-800">{content.best_version_of_idea}</p>
          </div>
        )}

        {!isBasic && content.validation_sprint && (
          <div className="mt-8">
            <ValidationSprint sprint={content.validation_sprint} />
          </div>
        )}

        {!isBasic && content.launch_angles && (
          <div className="mt-8">
            <LaunchAngles angles={content.launch_angles} />
          </div>
        )}
      </div>
    </div>
  );
}
