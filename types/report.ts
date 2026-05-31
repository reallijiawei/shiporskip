export type ReportType = 'basic_roast' | 'deep_validation' | 'launch_kit' | 'post_launch_review';

export type Verdict = 'build_now' | 'validate_first' | 'pivot' | 'skip' | 'too_crowded' | 'good_seo_play' | 'good_free_tool_bad_business' | 'interesting_but_not_urgent';

export interface ScoreBreakdown {
  demand: number;
  buildability: number;
  distribution: number;
  monetization: number;
  seo_potential: number;
  moat: number;
  solo_founder_fit: number;
}

export interface FounderLens {
  name: string;
  score: number;
  main_critique: string;
  what_to_cut: string;
  better_positioning: string;
}

export interface MarketEvidence {
  evidence_strength: number;
  search_demand_signal: 'weak' | 'medium' | 'strong';
  community_discussion_signal: 'weak' | 'medium' | 'strong';
  competition_signal: 'low' | 'medium' | 'high';
  monetization_signal: 'weak' | 'medium' | 'strong';
  notable_competitors: string[];
  user_pain_quotes_summary: string[];
  recommended_search_queries: string[];
}

export interface FailurePattern {
  pattern: string;
  severity: 'low' | 'medium' | 'high';
  why_it_matters: string;
  how_to_reduce_risk: string;
}

export interface MVPScope {
  must_have: string[];
  nice_to_have: string[];
  cut_for_v1: string[];
}

export interface ExpertOpinion {
  expert_id: string;
  expert_name: string;
  expert_title: string;
  archetype: string;
  archetype_description: string;
  verdict: Verdict;
  confidence: 'high' | 'medium' | 'low';
  one_line_take: string;
  key_arguments: string[];
  blind_spot: string;
}

export interface ReportContent {
  verdict: Verdict;
  overall_score: number;
  one_sentence_summary: string;
  score_explanation?: string;
  score_breakdown: ScoreBreakdown;
  brutal_objections: string[];
  improvement_suggestions?: string[];
  founder_lenses: FounderLens[];
  market_evidence: MarketEvidence;
  failure_patterns: FailurePattern[];
  best_version_of_idea: string;
  mvp_scope: MVPScope;
  expert_panel?: ExpertOpinion[];
  teaser_expert?: ExpertOpinion;
}

export interface Report {
  id: string;
  idea_id: string;
  report_type: ReportType;
  verdict: Verdict;
  overall_score: number;
  scores: ScoreBreakdown;
  content_json: ReportContent;
  created_at: string;
}
