import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Optimized getUser helper for Next.js 15 Server Components.
 * Supports development bypass for mock Supabase environments.
 */
export async function getUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  // 1. Check Development Bypass First
  if (supabaseUrl?.includes('mock-project')) {
    const cookieStore = await cookies();
    const hasMockCookie = cookieStore.get('sb-mock-auth')?.value === 'true';
    if (hasMockCookie) {
      return {
        data: {
          user: {
            email: 'admin@doasis.com',
            user_metadata: { full_name: 'Sanctuary Guide', phone: '' }
          }
        },
        error: null
      };
    }
  }

  // 2. Fallback to Real Supabase Auth
  try {
    const supabase = await createClient();
    const result = await supabase.auth.getUser();
    return result;
  } catch (e) {
    console.error('Unified Auth Error:', e);
    return { data: { user: null }, error: e };
  }
}
