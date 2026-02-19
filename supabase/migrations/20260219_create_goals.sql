-- Create goals table
create table if not exists public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  status text check (status in ('active', 'completed', 'paused')) default 'active',
  progress integer default 0 check (progress >= 0 and progress <= 100),
  target_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create specific milestones for goals
create table if not exists public.goal_milestones (
  id uuid default gen_random_uuid() primary key,
  goal_id uuid references public.goals(id) on delete cascade not null,
  title text not null,
  is_completed boolean default false,
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.goals enable row level security;
alter table public.goal_milestones enable row level security;

-- Goal Policies
create policy "Users can view their own goals"
  on public.goals for select
  using (auth.uid() = user_id);

create policy "Users can insert their own goals"
  on public.goals for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own goals"
  on public.goals for update
  using (auth.uid() = user_id);

create policy "Users can delete their own goals"
  on public.goals for delete
  using (auth.uid() = user_id);

-- Milestone Policies
create policy "Users can view their own milestones"
  on public.goal_milestones for select
  using (
    exists (
      select 1 from public.goals
      where goals.id = goal_milestones.goal_id
      and goals.user_id = auth.uid()
    )
  );

create policy "Users can insert their own milestones"
  on public.goal_milestones for insert
  with check (
    exists (
      select 1 from public.goals
      where goals.id = goal_milestones.goal_id
      and goals.user_id = auth.uid()
    )
  );

create policy "Users can update their own milestones"
  on public.goal_milestones for update
  using (
    exists (
      select 1 from public.goals
      where goals.id = goal_milestones.goal_id
      and goals.user_id = auth.uid()
    )
  );

create policy "Users can delete their own milestones"
  on public.goal_milestones for delete
  using (
    exists (
      select 1 from public.goals
      where goals.id = goal_milestones.goal_id
      and goals.user_id = auth.uid()
    )
  );
