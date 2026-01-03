import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishable_Default_Key =
  process.env.NEXT_PUBLIC_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabasePublishable_Default_Key) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_PUBLISHABLE_DEFAULT_KEY"
  );
}

export const supabasePublic = createClient(
  supabaseUrl,
  supabasePublishable_Default_Key,
  {
    auth: {
      persistSession: false,
    },
  }
);
