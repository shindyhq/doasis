-- 1. Check for users without profiles
SELECT id, email, raw_user_meta_data 
FROM auth.users 
WHERE id NOT IN (SELECT id FROM public.profiles);

-- 2. Insert missing profiles for existing users
INSERT INTO public.profiles (id, full_name, email, role, avatar_url)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'full_name', email), -- Fallback to email if no name
  email,
  'client', -- Default role
  raw_user_meta_data->>'avatar_url'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- 3. Verify Admin Profile (Ensure you are an admin)
-- Replace 'YOUR_EMAIL@example.com' with your actual email
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'YOUR_EMAIL@example.com'; 
