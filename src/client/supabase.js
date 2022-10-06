import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ghvlxaylfzdzbpvkyfsc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdodmx4YXlsZnpkemJwdmt5ZnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI4NjQ3MTMsImV4cCI6MTk3ODQ0MDcxM30.eGWc_RtgtaEZchM8ff-5Epuwyi_f4k9yv3SiQ4htZRU"
);
