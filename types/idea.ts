export type ProductType = 'website' | 'saas' | 'ai_tool' | 'directory' | 'content_site' | 'chrome_extension' | 'mobile_app' | 'other';

export type MonetizationPlan = 'ads' | 'affiliate' | 'subscription' | 'one_time' | 'sponsorship' | 'not_sure';

export type DistributionPlan = 'seo' | 'reddit' | 'x' | 'product_hunt' | 'paid_ads' | 'not_sure';

export type MVPTimeline = '1_day' | '3_days' | '7_days' | '14_days' | '30_days';

export type IdeaStatus = 'draft' | 'validating' | 'building' | 'launched' | 'killed';

export interface Idea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  target_user?: string;
  product_type?: ProductType;
  monetization_plan?: MonetizationPlan;
  distribution_plan?: DistributionPlan;
  mvp_timeline?: MVPTimeline;
  status: IdeaStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateIdeaInput {
  title: string;
  description: string;
  target_user?: string;
  product_type?: ProductType;
  monetization_plan?: MonetizationPlan;
  distribution_plan?: DistributionPlan;
  mvp_timeline?: MVPTimeline;
}
