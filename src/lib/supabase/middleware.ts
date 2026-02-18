import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isMockUrl = supabaseUrl?.includes('mock-project');
  const hasMockCookie = request.cookies.get('sb-mock-auth')?.value === 'true';

  // If in mock environment, bypass real Supabase calls entirely
  if (!supabaseUrl || !supabaseAnonKey || isMockUrl) {
    // If it's a protected route and we don't have the mock cookie, redirect to login
    if (isMockUrl && !hasMockCookie && request.nextUrl.pathname.startsWith('/dashboard')) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // getUser(). A simple mistake can make it very hard to debug
  // issues with users being logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // --- SECURITY HEADERS ---
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ntlotxxozwdrphhpfidp.supabase.co;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://ntlotxxozwdrphhpfidp.supabase.co https://images.unsplash.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  supabaseResponse.headers.set('Content-Security-Policy', cspHeader);
  supabaseResponse.headers.set('X-Frame-Options', 'DENY');
  supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff');
  supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  supabaseResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  supabaseResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // --- ABSOLUTE SESSION TIMEOUT (24 Hours) ---
  const MAX_SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms
  const sessionStartTime = request.cookies.get('sb-session-start')?.value;

  if (user && !sessionStartTime) {
    // Session just started, set the start time cookie
    supabaseResponse.cookies.set('sb-session-start', Date.now().toString(), {
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  } else if (user && sessionStartTime) {
    const elapsed = Date.now() - parseInt(sessionStartTime);
    if (elapsed > MAX_SESSION_DURATION) {
      // Force logout by clearing the session start time and redirecting to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      const response = NextResponse.redirect(url);
      response.cookies.delete('sb-session-start');
      // Note: Supabase cookies will be naturally invalidated if we don't refresh them,
      // but a explicit redirect is safer for absolute timeouts.
      return response;
    }
  } else if (!user) {
    supabaseResponse.cookies.delete('sb-session-start');
  }

  return supabaseResponse
}
