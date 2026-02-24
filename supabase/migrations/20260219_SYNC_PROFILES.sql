-- DATA RECOVERY: SYNC PROFILES
-- Run this script if your "Auth Users" exist but "Public Profiles" are missing 
-- (e.g. after a DROP ALL or database reset).

-- 1. Insert missing profiles for existing auth users
insert into public.profiles (id, email, full_name, avatar_url, role)
select 
  id, 
  email, 
  raw_user_meta_data->>'full_name', 
  raw_user_meta_data->>'avatar_url',
  coalesce(raw_user_meta_data->>'role', 'client') -- Default to client if role is missing
from auth.users
on conflict (id) do nothing;

-- 2. Verify admin access for specific email (Optional - Replace with your email)
-- update public.profiles set role = 'admin' where email = 'your-email@example.com';
