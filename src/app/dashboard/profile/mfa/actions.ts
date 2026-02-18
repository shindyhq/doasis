'use server';

import { createClient } from '@/lib/supabase/server';
import { logSecurityEvent } from '@/lib/supabase/security-logger';

export async function enrollMFA() {
  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase client failed' };

  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
  });

  if (error) {
    console.error('MFA Enrollment failed:', error);
    return { error: error.message };
  }

  await logSecurityEvent('mfa_enrollment', { type: 'totp' });
  return { data };
}

export async function verifyMFA(factorId: string, code: string) {
  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase client failed' };

  const { data, error } = await supabase.auth.mfa.challengeAndVerify({
    factorId,
    code,
  });

  if (error) {
    console.error('MFA Verification failed:', error);
    return { error: error.message };
  }

  await logSecurityEvent('mfa_verification', { status: 'success' });
  return { data };
}
