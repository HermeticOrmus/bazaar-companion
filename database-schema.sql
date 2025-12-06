-- Bazaar Companion Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (handled by Supabase Auth automatically)
-- auth.users is managed by Supabase

-- Runs table
create table if not exists public.runs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  hero text not null,
  wins integer not null check (wins >= 0 and wins <= 10),
  build text,
  notes text,
  timestamp bigint not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Builds table
create table if not exists public.builds (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  hero text not null,
  tier text not null,
  items jsonb default '[]'::jsonb,
  strategy text,
  early_game text,
  mid_game text,
  late_game text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Notes table
create table if not exists public.notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  tags jsonb default '[]'::jsonb,
  timestamp bigint not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Learning Progress table
create table if not exists public.learning_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  hero text not null,
  progress jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, hero)
);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
alter table public.runs enable row level security;
alter table public.builds enable row level security;
alter table public.notes enable row level security;
alter table public.learning_progress enable row level security;

-- Runs policies
create policy "Users can view their own runs"
  on public.runs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own runs"
  on public.runs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own runs"
  on public.runs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own runs"
  on public.runs for delete
  using (auth.uid() = user_id);

-- Builds policies
create policy "Users can view their own builds"
  on public.builds for select
  using (auth.uid() = user_id);

create policy "Users can insert their own builds"
  on public.builds for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own builds"
  on public.builds for update
  using (auth.uid() = user_id);

create policy "Users can delete their own builds"
  on public.builds for delete
  using (auth.uid() = user_id);

-- Notes policies
create policy "Users can view their own notes"
  on public.notes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own notes"
  on public.notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own notes"
  on public.notes for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notes"
  on public.notes for delete
  using (auth.uid() = user_id);

-- Learning Progress policies
create policy "Users can view their own learning progress"
  on public.learning_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own learning progress"
  on public.learning_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own learning progress"
  on public.learning_progress for update
  using (auth.uid() = user_id);

create policy "Users can delete their own learning progress"
  on public.learning_progress for delete
  using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists runs_user_id_idx on public.runs(user_id);
create index if not exists runs_timestamp_idx on public.runs(timestamp desc);
create index if not exists builds_user_id_idx on public.builds(user_id);
create index if not exists notes_user_id_idx on public.notes(user_id);
create index if not exists learning_progress_user_id_idx on public.learning_progress(user_id);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_runs_updated_at before update on public.runs
  for each row execute function update_updated_at_column();

create trigger update_builds_updated_at before update on public.builds
  for each row execute function update_updated_at_column();

create trigger update_notes_updated_at before update on public.notes
  for each row execute function update_updated_at_column();

create trigger update_learning_progress_updated_at before update on public.learning_progress
  for each row execute function update_updated_at_column();
