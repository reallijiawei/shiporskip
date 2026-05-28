export type UserPlan = 'free' | 'deep' | 'pro' | 'power';

export interface User {
  id: string;
  email: string;
  plan: UserPlan;
  created_at: string;
  updated_at: string;
}

export interface UsageQuota {
  id: string;
  user_id: string;
  month: string;
  basic_roast_limit: number;
  basic_roast_used: number;
  deep_validation_limit: number;
  deep_validation_used: number;
  launch_kit_limit: number;
  launch_kit_used: number;
}
