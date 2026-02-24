-- DANGER: This script will delete all data in your application tables.
-- Run this only if you want to start with a completely fresh database.

-- 1. Drop Tables (Order matters due to foreign keys)
DROP TABLE IF EXISTS public.client_resources;
DROP TABLE IF EXISTS public.resources;
DROP TABLE IF EXISTS public.goal_milestones;
DROP TABLE IF EXISTS public.goals;
DROP TABLE IF EXISTS public.check_ins;
DROP TABLE IF EXISTS public.journal_entries;
DROP TABLE IF EXISTS public.appointments;
DROP TABLE IF EXISTS public.messages;
DROP TABLE IF EXISTS public.notifications;
DROP TABLE IF EXISTS public.user_badges;
DROP TABLE IF EXISTS public.badges;
DROP TABLE IF EXISTS public.community_posts;
DROP TABLE IF EXISTS public.payments;
DROP TABLE IF EXISTS public.form_responses;
DROP TABLE IF EXISTS public.forms;
DROP TABLE IF EXISTS public.profiles;

-- 2. Drop Custom Types (if they exist)
DROP TYPE IF EXISTS public.user_role;
DROP TYPE IF EXISTS public.appointment_status;
DROP TYPE IF EXISTS public.resource_type;
DROP TYPE IF EXISTS public.goal_status;
DROP TYPE IF EXISTS public.notification_type;

-- 3. Drop Buckets (Optional - uncomment if you want to clear storage buckets too)
-- delete from storage.objects where bucket_id = 'resources';
-- delete from storage.buckets where id = 'resources';
-- delete from storage.objects where bucket_id = 'avatars';
-- delete from storage.buckets where id = 'avatars';
