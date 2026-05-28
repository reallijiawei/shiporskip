import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import VerdictCard from '@/components/VerdictCard';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import FounderLensCard from '@/components/FounderLensCard';
import FailurePatterns from '@/components/FailurePatterns';
import ValidationSprint from '@/components/ValidationSprint';
import MarketEvidence from '@/components/MarketEvidence';
import DeepValidationCTA from './DeepValidationCTA';
import LaunchAngles from './LaunchAngles';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: report } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .single();

  if (!report) {
    notFound();
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
