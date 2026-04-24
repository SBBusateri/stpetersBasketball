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
