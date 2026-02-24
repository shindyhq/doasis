-- Migration: Create Marketing Campaigns table
-- Date: 2026-02-21

create table if not exists public.marketing_campaigns (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text check (type in ('Email', 'Automated', 'SMS', 'Newsletter')) not null,
  status text check (status in ('active', 'draft', 'archived', 'scheduled')) default 'draft',
  sent_count integer default 0,
  opened_count integer default 0,
  clicked_count integer default 0,
  scheduled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.profiles(id) on delete set null
);

alter table public.marketing_campaigns enable row level security;

-- Policies
create policy "Admins can manage marketing campaigns" on public.marketing_campaigns
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Trigger for updated_at
create trigger update_marketing_campaigns_updated_at
    before update on marketing_campaigns
    for each row
    execute procedure update_updated_at_column();
