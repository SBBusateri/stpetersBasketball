/**
 * Shared Supabase row types for the frontend.
 */
export type AcademyHighlight = {
  id: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};

export type AcademySession = {
  id: string;
  title: string;
  description: string;
  level: string;
  session_date: string;
  start_time: string;
  end_time: string;
  location: string;
  display_order: number;
  is_active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};

export type SiteSectionSetting = {
  id: string;
  section_key: string;
  label: string | null;
  is_active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};

export type HomepageHeroSettings = {
  id: string;
  badge_text: string | null;
  headline: string | null;
  description: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  image_url: string | null;
  updated_at?: string | null;
  created_at?: string | null;
};

export type AcademyCoach = {
  id: string;
  name: string;
  title: string;
  years: string;
  bio: string;
  display_order: number;
  is_active: boolean;
  headshot_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type AcademyRegistration = {
  id: string;
  session_id: string | null;
  session_title: string | null;
  player_name: string;
  guardian_name: string;
  phone_number: string;
  grade_level: string;
  is_paid: boolean;
  waiver_submitted: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};
