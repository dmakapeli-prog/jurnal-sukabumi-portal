import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://cbtkitzzimtcgmznogfd.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_MyLkl9mtM1vWnyCC63Cw6Q_eHGCERgo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

