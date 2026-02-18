import { createBrowserClient } from '@supabase/ssr'


export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    const errorMsg = 'Supabase credentials missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment variables.';
    console.error(errorMsg);
    
    // In production, we must throw to stop execution before a null client causes a harder-to-debug crash
    throw new Error(errorMsg);
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
