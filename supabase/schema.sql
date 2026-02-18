-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES: Extended user data
create type user_role as enum ('admin', 'client');

create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  role user_role default 'client',
  updated_at timestamptz default now(),
  
  constraint username_length check (char_length(full_name) >= 3)
);

alter table profiles enable row level security;

create policy "Users can view own profile" 
  on profiles for select 
  using ( auth.uid() = id );

create policy "Admins can view all profiles"
  on profiles for select
  using ( 
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

create policy "Users can update own profile" 
  on profiles for update 
  using ( auth.uid() = id );

create policy "Admins can update all profiles"
  on profiles for update
  using ( 
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- JOURNAL ENTRIES: Private user reflections
create table journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text,
  category text, 
  mood text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table journal_entries enable row level security;

create policy "Users can view own journal entries" 
  on journal_entries for select 
  using ( auth.uid() = user_id );

create policy "Admins can view client journal entries (if allowed)"
  on journal_entries for select
  using (
      exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

create policy "Users can insert own journal entries" 
  on journal_entries for insert 
  with check ( auth.uid() = user_id );

create policy "Users can update own journal entries" 
  on journal_entries for update 
  using ( auth.uid() = user_id );

create policy "Users can delete own journal entries" 
  on journal_entries for delete 
  using ( auth.uid() = user_id );

-- APPOINTMENTS: Session management
create table appointments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null, -- The client
  scheduled_at timestamptz not null,
  status text check (status in ('scheduled', 'completed', 'cancelled', 'noshow')) default 'scheduled',
  type text not null, 
  notes text, -- Private admin notes or session notes
  meeting_link text,
  created_at timestamptz default now()
);

alter table appointments enable row level security;

create policy "Users can view own appointments" 
  on appointments for select 
  using ( auth.uid() = user_id );

create policy "Admins can view all appointments" 
  on appointments for select 
  using ( 
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can insert/update appointments" 
  on appointments for all 
  using ( 
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- ADMIN TODOS: Task tracking for admins
create table admin_todos (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  completed boolean default false,
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  created_by uuid references auth.users on delete cascade,
  created_at timestamptz default now()
);

alter table admin_todos enable row level security;

create policy "Admins can all todos" 
  on admin_todos for all 
  using ( 
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- SECURITY LOGS: Audit trail
create table security_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  event_type text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table security_logs enable row level security;

create policy "Users can view own security logs" 
  on security_logs for select 
  using ( auth.uid() = user_id );

create policy "Admins can view all security logs" 
  on security_logs for select 
  using ( 
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- RESOURCES / RECORDINGS: Library content
create table resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type text check (type in ('video', 'article', 'audio', 'document', 'recording')),
  url text not null,
  thumbnail_url text,
  duration text, -- e.g. "58m"
  category text, 
  is_premium boolean default false,
  
  -- If it's a specific client recording, link it. Null means public/shared.
  client_id uuid references auth.users on delete cascade, 
  
  created_at timestamptz default now()
);

alter table resources enable row level security;

create policy "view_resources" 
  on resources for select 
  using ( 
    auth.role() = 'authenticated' AND (
      client_id IS NULL OR client_id = auth.uid() OR exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    )
  );

create policy "Admins can manage resources" 
  on resources for all 
  using ( 
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- Triggers for updated_at
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

-- AUTOMATIC PROFILE CREATION
-- This function and trigger automatically creates a profile entry when a new user signs up via Supabase Auth
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    'client' -- Default role
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
