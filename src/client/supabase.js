import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.API_PROJECT_KEY_URL, process.env.API_PROJECT_KEY_ANON)