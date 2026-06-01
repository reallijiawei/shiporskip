import { Report, ReportContent, ExpertOpinion, ViralInsights as ViralInsightsType } from '@/types/report';
import { getVerdictLabel } from '@/lib/utils';

function expertCard(op: ExpertOpinion): string {
  return `
    <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;background:#fafafa;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <strong style="font-size:14px;">${op.expert_name}'s thinking framework</strong>
        <span style="font-size:12px;padding:2px 8px;border-radius:9999px;background:#eee;">${getVerdictLabel(op.verdict)}</span>
      </div>
      <p style="font-size:13px;font-style:italic;margin:8px 0;">"${op.one_line_take}"</p>
      <ul style="font-size:12px;color:#666;padding-left:16px;margin:4px 0;">
        ${op.key_arguments.map((a) => `<li>${a}</li>`).join('')}
      </ul>
      ${op.blind_spot ? `<p style="font-size:11px;color:#c2410c;margin-top:8px;"><strong>Blind spot:</strong> ${op.blind_spot}</p>` : ''}
    </div>`;
}

function scoreRow(label: string, value: number): string {
  const pct = (value / 10) * 100;
  return `
    <div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
      <span style="width:120px;font-size:13px;color:#555;">${label}</span>
      <div style="flex:1;height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
        <div style="width:${pct}%;height:100%;background:#2563eb;border-radius:4px;"></div>
      </div>
      <span style="font-size:13px;font-weight:bold;width:24px;text-align:right;">${value}</span>
    </div>`;
}

export function downloadReportHTML(report: Report) {
  const c = report.content_json as ReportContent;
  const isBasic = report.report_type === 'basic_roast';
  const showMVP = !isBasic && c.mvp_scope && (report.verdict === 'build_now' || report.verdict === 'validate_first');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>ShipOrSkip Report — ${report.verdict ? getVerdictLabel(report.verdict) : 'Quick Assessment'}</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:720px;margin:0 auto;padding:24px;color:#111;background:#fff;}
  h1{font-size:28px;margin-bottom 4px;}
  h2{font-size:20px;margin-top:32px;margin-bottom:12px;border-bottom:1px solid #e5e7eb;padding-bottom:8px;}
  .verdict{display:inline-block;padding:6px 16px;border-radius:6px;font-weight:bold;font-size:14px;}
  .score-big{font-size:56px;font-weight:800;line-height:1;}
  .objection{background:#fef2f2;border-left:3px solid #ef4444;padding:8px 12px;margin:6px 0;font-size:14px;}
  .suggestion{background:#f0fdf4;border-left:3px solid #22c55e;padding:8px 12px;margin:6px 0;font-size:14px;}
  .section{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:12px 0;}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;}
  .col h4{font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;}
  .col ul{font-size:13px;padding-left:16px;margin:0;}
  .col li{margin:4px 0;}
  a{color:#2563eb;}
</style>
</head>
<body>
  <h1>ShipOrSkip Report</h1>
  <p style="color:#888;font-size:13px;">Generated ${new Date(report.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

  <div style="margin-top:16px;">
    <span class="verdict" style="background:#e0e7ff;color:#3730a3;">${report.verdict ? getVerdictLabel(report.verdict) : 'Quick Assessment'}</span>
    ${!isBasic && report.overall_score ? `<span class="score-big" style="margin-left:16px;">${report.overall_score}<span style="font-size:20px;color:#aaa;">/100</span></span>` : ''}
  </div>

  <p style="font-size:16px;margin-top:12px;">${c.one_sentence_summary}</p>

  ${!isBasic && c.score_explanation ? `<p style="font-size:12px;color:#888;margin-top:4px;"><strong>Scoring methodology:</strong> ${c.score_explanation}</p>` : ''}

  ${!isBasic && report.scores ? `
  <h2>Score Breakdown</h2>
  ${scoreRow('Demand', report.scores.demand)}
  ${scoreRow('Buildability', report.scores.buildability)}
  ${scoreRow('Distribution', report.scores.distribution)}
  ${scoreRow('Monetization', report.scores.monetization)}
  ${scoreRow('SEO Potential', report.scores.seo_potential)}
  ${scoreRow('Moat', report.scores.moat)}
  ${scoreRow('Solo Founder Fit', report.scores.solo_founder_fit)}
  ` : ''}

  ${c.brutal_objections?.length ? `
  <h2>Brutal Objections</h2>
  ${c.brutal_objections.map((o, i) => `<div class="objection"><strong>${i + 1}.</strong> ${o}</div>`).join('')}
  ` : ''}

  ${isBasic && c.improvement_suggestions?.length ? `
  <h2>Improvement Suggestions</h2>
  ${c.improvement_suggestions.map((s, i) => `<div class="suggestion"><strong>${i + 1}.</strong> ${s}</div>`).join('')}
  ` : ''}

  ${c.viral_insights?.lessons?.length ? `
  <h2>${c.viral_insights.section_type === 'pivot_suggestions' ? 'If You Insist...' : 'What Winners Did Right'}</h2>
  <p style="font-size:14px;color:#666;margin-bottom:12px;">${c.viral_insights.intro}</p>
  ${c.viral_insights.lessons.map((l) => `
    <div class="section">
      <p style="font-size:13px;margin:0;">${l.lesson}</p>
      <p style="font-size:12px;color:#888;margin:4px 0 0;">${l.relevance}</p>
    </div>`).join('')}
  ` : ''}

  ${c.teaser_experts?.length ? `
  <h2>Expert Perspectives (3 of 10)</h2>
  <div class="grid">${c.teaser_experts.map(expertCard).join('')}</div>
  ` : ''}

  ${c.expert_panel?.length ? `
  <h2>Expert Panel</h2>
  <div class="grid">${c.expert_panel.map(expertCard).join('')}</div>
  ` : ''}

  ${!isBasic && c.failure_patterns?.length ? `
  <h2>Failure Patterns</h2>
  ${c.failure_patterns.map((fp) => `
    <div class="section">
      <strong>${fp.pattern}</strong> <span style="font-size:12px;color:${fp.severity === 'high' ? '#dc2626' : fp.severity === 'medium' ? '#d97706' : '#65a30d'};">[${fp.severity}]</span>
      <p style="font-size:13px;margin:4px 0 0;">${fp.why_it_matters}</p>
      <p style="font-size:12px;color:#666;margin:4px 0 0;"><strong>How to reduce:</strong> ${fp.how_to_reduce_risk}</p>
    </div>`).join('')}
  ` : ''}

  ${showMVP && c.mvp_scope ? `
  <h2>MVP Scope</h2>
  <div class="grid">
    <div class="col"><h4 style="color:#16a34a;">Must Have</h4><ul>${c.mvp_scope.must_have.map((i) => `<li>${i}</li>`).join('')}</ul></div>
    <div class="col"><h4 style="color:#ca8a04;">Nice to Have</h4><ul>${c.mvp_scope.nice_to_have.map((i) => `<li>${i}</li>`).join('')}</ul></div>
    <div class="col"><h4 style="color:#dc2626;">Cut for V1</h4><ul>${c.mvp_scope.cut_for_v1.map((i) => `<li>${i}</li>`).join('')}</ul></div>
  </div>
  ` : ''}

  ${!isBasic && c.best_version_of_idea && (report.verdict === 'build_now' || report.verdict === 'validate_first') ? `
  <h2>Best Version of This Idea</h2>
  <div class="section"><p>${c.best_version_of_idea}</p></div>
  ` : ''}

  <hr style="margin-top:40px;border:none;border-top:1px solid #e5e7eb;">
  <p style="font-size:11px;color:#aaa;">Generated by ShipOrSkip — shiporskip.org</p>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shiporskip-report-${report.verdict || 'quick-assessment'}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
