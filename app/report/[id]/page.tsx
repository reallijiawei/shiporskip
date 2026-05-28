'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VerdictCard from '@/components/VerdictCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import FounderLensCard from '@/components/FounderLensCard';
import FailurePatterns from '@/components/FailurePatterns';
import ValidationSprint from '@/components/ValidationSprint';
import DeepValidationCTA from './DeepValidationCTA';
import LaunchAngles from './LaunchAngles';
import { Report } from '@/types/report';
import { Loader2 } from 'lucide-react';

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/report?id=${id}`);
        if (!response.ok) {
          throw new Error('Report not found');
        }
        const data = await response.json();
        setReport(data.report);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load report');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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

        {isBasic && (
          <div className="mt-8">
            <DeepValidationCTA reportId={report.id} />
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
