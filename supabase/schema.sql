-- CLEANUP (For ground-up build)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists update_updated_at_column();

drop table if exists intake_forms cascade;
drop table if exists admin_notes cascade;
drop table if exists client_resource_access cascade;
drop table if exists resources cascade;
drop table if exists appointments cascade;
drop table if exists journal_entries cascade;
drop table if exists profiles cascade;

drop type if exists intake_status cascade;
drop type if exists resource_type cascade;
drop type if exists appointment_status cascade;
drop type if exists user_role cascade;

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth)
create type user_role as enum ('admin', 'client');

create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role user_role default 'client',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone" 
  on profiles for select 
  using ( true );

create policy "Users can update own profile" 
  on profiles for update 
  using ( auth.uid() = id );

-- 2. JOURNAL ENTRIES (Private Client Data)
create table journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  content text,
  mood text,
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table journal_entries enable row level security;

-- Policies
create policy "Users can view own entries" 
  on journal_entries for select 
  using ( auth.uid() = user_id );

create policy "Users can insert own entries" 
  on journal_entries for insert 
  with check ( auth.uid() = user_id );

create policy "Users can update own entries" 
  on journal_entries for update 
  using ( auth.uid() = user_id );

create policy "Users can delete own entries" 
  on journal_entries for delete 
  using ( auth.uid() = user_id );

-- 3. APPOINTMENTS (Booking & Sessions)
create type appointment_status as enum ('scheduled', 'completed', 'cancelled', 'noshow');

create table appointments (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references profiles(id) on delete cascade not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status appointment_status default 'scheduled',
  type text not null, -- 'clarity', 'coaching', etc.
  notes text, -- Private admin notes
  meeting_link text,
  created_at timestamptz default now()
);

alter table appointments enable row level security;

-- Policies
create policy "Users can view own appointments" 
  on appointments for select 
  using ( auth.uid() = client_id );

create policy "Admins can view all appointments" 
  on appointments for select 
  using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

create policy "Admins can manage appointments" 
  on appointments for all 
  using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 4. RESOURCES (Content Library)
create type resource_type as enum ('video', 'audio', 'pdf', 'link');

create table resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type resource_type not null,
  url text not null,
  thumbnail_url text,
  is_public boolean default false,
  created_at timestamptz default now()
);

alter table resources enable row level security;

-- Policies
create policy "Everyone can view public resources" 
  on resources for select 
  using ( is_public = true );

create policy "Admins can manage resources" 
  on resources for all 
  using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 5. CLIENT RESOURCE ACCESS (Private/Assigned Content)
create table client_resource_access (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references profiles(id) on delete cascade not null,
  resource_id uuid references resources(id) on delete cascade not null,
  assigned_at timestamptz default now(),
  unique(client_id, resource_id)
);

alter table client_resource_access enable row level security;

-- Policies
create policy "Users can view assigned resources" 
  on resources for select 
  using ( 
    exists (
      select 1 from client_resource_access 
      where resource_id = resources.id and client_id = auth.uid()
    )
  );

create policy "Admins can manage access" 
  on client_resource_access for all 
  using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 6. ADMIN NOTES (CRM)
create table admin_notes (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references profiles(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete set null,
  content text not null,
  created_at timestamptz default now()
);

alter table admin_notes enable row level security;

-- Policies
create policy "Admins can manage notes" 
  on admin_notes for all 
  using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 7. INTAKE FORMS (New Submissions)
create type intake_status as enum ('pending', 'reviewed', 'archived');

create table intake_forms (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references profiles(id) on delete set null, -- Nullable if pre-auth submission
  email text, -- Capture email if not authenticated
  form_type text not null, -- 'general', 'clarity_session', etc.
  form_data jsonb not null default '{}'::jsonb,
  status intake_status default 'pending',
  created_at timestamptz default now()
);

alter table intake_forms enable row level security;

-- Policies
create policy "Admins can manage intake forms" 
  on intake_forms for all 
  using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

create policy "Users can created intake forms" 
  on intake_forms for insert 
  with check ( true ); -- Allow public/anonymous submission (restricted ideally by captcha or auth if possible)

create policy "Users can view own intake forms"
  on intake_forms for select
  using ( auth.uid() = client_id );


-- TRIGGERS & FUNCTIONS

-- Handle User Creation
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_profiles_updated_at
    before update on profiles
    for each row
    execute procedure update_updated_at_column();

create trigger update_journal_updated_at
    before update on journal_entries
    for each row
    execute procedure update_updated_at_column();
