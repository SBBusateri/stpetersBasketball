import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "https://okhpldlzgsutuqzfeqby.supabase.co";
const supabaseAnonKey = "sb_publishable_V3Yklo1BghRF1bLJCTxOKA_fPnu5B8o";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  }
);
export {
  supabase as s
};
