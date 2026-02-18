'use client';

import { useState } from 'react';
import { Shield, Smartphone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { enrollMFA, verifyMFA } from '@/app/dashboard/profile/mfa/actions';

export const MFASection = () => {
  const [step, setStep] = useState<'initial' | 'challenging' | 'verified'>('initial');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mfaData, setMfaData] = useState<any>(null);
  const [code, setCode] = useState('');

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);
    const result = await enrollMFA();
    
    if (result.error) {
      setError(result.error);
    } else {
      setMfaData(result.data);
      setStep('challenging');
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    const result = await verifyMFA(mfaData.id, code);
    
    if (result.error) {
      setError(result.error);
    } else {
      setStep('verified');
    }
    setLoading(false);
  };

  return (
    <div className="glass p-8 rounded-[32px] border border-primary/5 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Smartphone className="text-accent" />
        </div>
        <div>
          <h3 className="font-display font-bold text-primary">Multi-Factor Authentication</h3>
          <p className="text-sm font-serif italic text-primary/50">Add an extra layer of protection to your sanctuary access.</p>
        </div>
      </div>

      {step === 'initial' && (
        <div className="space-y-6">
          <p className="text-sm font-serif italic text-primary/70 leading-relaxed">
            Protect your personal data by requiring a unique code from an authenticator app (like Google Authenticator or Authy) whenever you log in.
          </p>
          <Button 
            onClick={handleEnroll} 
            disabled={loading}
            className="w-full h-14 rounded-2xl group relative overflow-hidden"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Enroll Authenticator App'}
          </Button>
        </div>
      )}

      {step === 'challenging' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="p-6 bg-white rounded-2xl border border-primary/5 text-center space-y-4">
            <p className="text-xs uppercase tracking-widest font-bold text-primary/40">Scan this QR Code</p>
            {/* Supabase usually returns a SVG or data string for the QR, we display the info */}
            <div className="w-40 h-40 bg-primary/5 mx-auto rounded-xl flex items-center justify-center border-2 border-dashed border-primary/10">
               <Smartphone className="text-primary/20 scale-150" />
            </div>
            <p className="text-[10px] font-mono text-primary/40 break-all">{mfaData?.totp?.secret}</p>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-primary/60 pl-2 font-display font-bold">Verification Code</label>
            <input 
              type="text" 
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-white/60 border border-black/[0.08] rounded-2xl h-14 px-6 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-center text-2xl tracking-[0.5em] font-mono"
            />
            {error && <p className="text-xs text-red-500 font-serif italic flex items-center gap-2 px-2"><AlertCircle size={14}/> {error}</p>}
            <Button 
              onClick={handleVerify} 
              disabled={loading || code.length !== 6}
              className="w-full h-14 rounded-2xl"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Verify & Enable'}
            </Button>
          </div>
        </div>
      )}

      {step === 'verified' && (
        <div className="p-8 bg-accent/5 rounded-[40px] border border-accent/20 text-center space-y-4 animate-in zoom-in-95 duration-700">
          <div className="w-16 h-16 bg-accent rounded-full mx-auto flex items-center justify-center text-white">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-2">
            <h4 className="font-display font-bold text-primary">Sanctuary Shielded</h4>
            <p className="text-sm font-serif italic text-primary/60">Multi-factor authentication is now active on your account.</p>
          </div>
        </div>
      )}
    </div>
  );
};
