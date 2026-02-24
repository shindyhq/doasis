'use client';

import { User, Mail, Phone, MapPin, Loader2, Camera } from 'lucide-react';
import Image from 'next/image';
import { updateProfile, uploadAvatarAction } from '@/actions/settings';
import { useFormStatus } from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import { createClient } from '@/lib/supabase/client';
import { UserProfile } from '@/types/custom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
    </button>
  );
}

export function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error && error.code !== 'PGRST116') throw error;
          
          if (data) {
            setProfile(data);
            setPreviewUrl(data.avatar_url);
          } else {
            // No profile found, initialize with auth user data
            setProfile({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              avatar_url: null,
              phone: null,
              bio: null,
              location: null,
              role: 'admin',
              updated_at: new Date().toISOString()
            } as UserProfile);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        showToast("Error loading profile", "info");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [showToast]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (800KB limit per UI note)
    if (file.size > 800 * 1024) {
      showToast("File size too large. Max 800KB", "info");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadAvatarAction(formData);
      if (result.success) {
        setPreviewUrl(result.url || null);
        showToast("Profile picture updated", "success");
      } else {
        showToast(result.error || "Failed to upload image", "info");
      }
    } catch (error) {
      showToast("An unexpected error occurred", "info");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAction = async (formData: FormData) => {
    const result = await updateProfile(formData);
    if (result.success) {
      showToast("Profile updated successfully", "success");
    } else {
      showToast(result.error || "Failed to update profile", "info");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
       <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-secondary" />
          Profile Information
       </h2>

       <div className="space-y-6">
          <div className="flex items-center gap-6">
             <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm group">
                {previewUrl ? (
                   <Image 
                      src={previewUrl} 
                      alt="Profile" 
                      fill 
                      className="object-cover" 
                   />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <User className="w-8 h-8" />
                   </div>
                )}
                {isUploading && (
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                   </div>
                )}
             </div>
             <div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload profile picture"
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="text-sm font-medium text-secondary hover:text-secondary/80 bg-secondary/10 hover:bg-secondary/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  title="Change profile photo"
                >
                   <Camera className="w-4 h-4" />
                   {isUploading ? 'Uploading...' : 'Change Photo'}
                </button>
                <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
             </div>
          </div>

          <form action={handleAction} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label htmlFor="fullName" className="text-sm font-medium text-slate-700">Full Name</label>
                   <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                         type="text" 
                         id="fullName"
                         name="fullName"
                         defaultValue={profile?.full_name || ''} 
                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                   <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                         type="email" 
                         id="email"
                         name="email"
                         readOnly
                         defaultValue={profile?.email || ''} 
                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm opacity-60 cursor-not-allowed"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                   <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                         type="tel" 
                         id="phone"
                         name="phone"
                         defaultValue={profile?.phone || ''} 
                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label htmlFor="location" className="text-sm font-medium text-slate-700">Location</label>
                   <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                         type="text" 
                         id="location"
                         name="location"
                         defaultValue={profile?.location || ''}
                         placeholder="City, Country"
                         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm"
                      />
                   </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                   <label htmlFor="bio" className="text-sm font-medium text-slate-700">Bio</label>
                   <textarea 
                      id="bio"
                      name="bio"
                      rows={4}
                      defaultValue={profile?.bio || ''}
                      placeholder="Tell us a bit about yourself..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm resize-none"
                   />
                </div>
             </div>
             
             <div className="flex justify-end pt-4">
                <SubmitButton />
             </div>
          </form>
       </div>
    </div>
  );
}
