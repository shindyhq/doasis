'use server';

import { createClient } from './server';

export type SecurityEventType = 
  | 'login_success' 
  | 'login_failure' 
  | 'signup_success'
  | 'signup_failure'
  | 'mfa_enrollment' 
  | 'mfa_verification' 
  | 'password_change_request' 
  | 'profile_update_attempt'
  | 'unauthorized_access_attempt';

export async function logSecurityEvent(
  type: SecurityEventType, 
  details: Record<string, any> = {}
) {
  const supabase = await createClient();
  if (!supabase) return;

  const { data: { user } } = await supabase.auth.getUser();

  try {
    const { error } = await supabase
      .from('security_logs')
      .insert({
        event_type: type,
        user_id: user?.id || null,
        metadata: {
          ...details,
          timestamp: new Date().toISOString(),
          ip_hint: 'Logged from server component'
        }
      });

    if (error) {
       // Falls back to console in case table doesn't exist yet
       console.warn('Security logging failed:', error);
    }
  } catch (err) {
    console.error('Critical security logging error:', err);
  }
}
