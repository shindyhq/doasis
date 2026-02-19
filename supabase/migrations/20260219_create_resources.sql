-- Create resources table
create table if not exists public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  type text check (type in ('video', 'audio', 'pdf', 'link')) not null,
  url text not null,
  thumbnail_url text,
  category text not null,
  is_published boolean default false,
  duration text, -- e.g., "10 min" or "5 pages"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create client tracking for resources
create table if not exists public.client_resources (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  resource_id uuid references public.resources(id) on delete cascade not null,
  status text check (status in ('in_progress', 'completed')) default 'in_progress',
  last_accessed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, resource_id)
);

-- Enable RLS
alter table public.resources enable row level security;
alter table public.client_resources enable row level security;

-- Resource Policies (Publicly viewable if published)
create policy "Resources are viewable by everyone if published"
  on public.resources for select
  using (is_published = true);

-- Admins can do everything with resources
create policy "Admins can manage resources"
  on public.resources for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Client Resource Policies
create policy "Users can view track their own resources"
  on public.client_resources for select
  using (auth.uid() = user_id);

create policy "Users can insert their own resource tracking"
  on public.client_resources for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own resource tracking"
  on public.client_resources for update
  using (auth.uid() = user_id);


-- Seed Data
insert into public.resources (title, description, type, url, category, is_published, duration)
values 
('Morning Stillness Meditation', 'A 10-minute guided session to center your heart before the day begins.', 'video', 'https://www.youtube.com/embed/inpok4MKVLM', 'Meditation', true, '10 min'),
('The Theology of Rest', 'Understanding the biblical mandate for sabbath and soul-care.', 'pdf', 'https://example.com/theology-of-rest.pdf', 'Theology', true, '5 pages'),
('Anxiety & Prayer', 'How to bring your heavy burdens to the altar without shame.', 'audio', 'https://example.com/anxiety-prayer.mp3', 'Wellness', true, '15 min'),
('Breath Prayer Guide', 'Simple breath prayers to anchor yourself in stressful moments.', 'link', 'https://example.com/breath-prayers', 'Practice', true, 'Read'),
('Dealing with Burnout', 'Recognizing the signs of spiritual and emotional exhaustion.', 'video', 'https://www.youtube.com/embed/inpok4MKVLM', 'Wellness', true, '12 min'),
('Scriptures for Sleep', 'Peaceful readings to help you drift into rest.', 'audio', 'https://example.com/sleep-scriptures.mp3', 'Meditation', true, '20 min');
