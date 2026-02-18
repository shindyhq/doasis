-- 1. Insert missing profiles for existing users
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id, 
  email,
  COALESCE(raw_user_meta_data->>'full_name', email),
  'client'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- 2. Update specific user to admin (Replace with your email)
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'fourteemedia@gmail.com'; -- CHANGE THIS TO YOUR ADMIN EMAIL

-- 3. Verify
SELECT * FROM public.profiles;
