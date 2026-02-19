-- Create a specific table for daily mood check-ins
create table if not exists public.check_ins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mood_score integer not null check (mood_score >= 1 and mood_score <= 5),
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.check_ins enable row level security;

-- Policies
create policy "Users can view their own check-ins"
  on public.check_ins for select
  using (auth.uid() = user_id);

create policy "Users can insert their own check-ins"
  on public.check_ins for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own check-ins"
  on public.check_ins for update
  using (auth.uid() = user_id);
