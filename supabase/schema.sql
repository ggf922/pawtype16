-- ============================================================================
-- PawType-16 — Supabase schema (v2 with auth)
-- Run this entire file in Supabase SQL Editor → "+ New Query" → paste → Run.
-- Safe to re-run (uses IF NOT EXISTS / DROP POLICY IF EXISTS guards).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. RESULTS TABLE — every quiz submission (anonymous or logged-in)
-- ----------------------------------------------------------------------------
create table if not exists public.results (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  user_id     uuid references auth.users(id) on delete set null,   -- nullable for anon
  pet_kind    text not null check (pet_kind in ('dog','cat')),
  pet_name    text not null,
  owner_code  text not null,
  pet_code    text not null,
  match_score int  not null,
  match_title text not null,
  owner_e     int not null,
  owner_s     int not null,
  owner_a     int not null,
  owner_c     int not null,
  pet_e       int not null,
  pet_s       int not null,
  pet_a       int not null,
  pet_c       int not null,
  nickname    text,
  region      text
);

-- Add user_id column if migrating from v1 (idempotent)
alter table public.results
  add column if not exists user_id uuid references auth.users(id) on delete set null;

-- ----------------------------------------------------------------------------
-- 2. PROFILES TABLE — extra info per logged-in user (nickname, avatar, etc.)
--    Auto-created by trigger when a new auth.users row appears.
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  email       text,
  nickname    text,
  avatar_url  text,
  provider    text  -- 'google' | 'kakao' | 'email'
);

-- Auto-create profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, nickname, avatar_url, provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name',
             new.raw_user_meta_data->>'full_name',
             split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_app_meta_data->>'provider', 'email')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------
alter table public.results  enable row level security;
alter table public.profiles enable row level security;

-- ---- results policies ----

-- Anyone (even logged-out) can submit a quiz result.
drop policy if exists "results_insert_any" on public.results;
create policy "results_insert_any"
  on public.results for insert
  to anon, authenticated
  with check (true);

-- Public read of anonymous aggregates (no PII).
-- We allow read of ALL rows for now (admin dashboard, "find similar").
-- Tighten later if you want to hide nickname/region.
drop policy if exists "results_select_any" on public.results;
create policy "results_select_any"
  on public.results for select
  to anon, authenticated
  using (true);

-- Logged-in users can only delete their OWN rows.
drop policy if exists "results_delete_own" on public.results;
create policy "results_delete_own"
  on public.results for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---- profiles policies ----

-- Each user can read/update only their own profile.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- 4. INDEXES
-- ----------------------------------------------------------------------------
create index if not exists idx_results_owner_code on public.results(owner_code);
create index if not exists idx_results_pet_code   on public.results(pet_code);
create index if not exists idx_results_kind       on public.results(pet_kind);
create index if not exists idx_results_created    on public.results(created_at desc);
create index if not exists idx_results_user       on public.results(user_id);

-- ----------------------------------------------------------------------------
-- 5. (OPTIONAL) Seed a few demo rows so /admin shows something on day one.
--    Comment out if you want a clean start.
-- ----------------------------------------------------------------------------
-- insert into public.results (pet_kind, pet_name, owner_code, pet_code,
--   match_score, match_title, owner_e, owner_s, owner_a, owner_c,
--   pet_e, pet_s, pet_a, pet_c)
-- values
--   ('dog', '또또',  'ESAC', 'ESAN', 92, '활기찬 탐험 콤비', 60, 40, 30, 50, 70, 50, 40, 30),
--   ('cat', '나비',  'LIAC', 'LSAC', 84, '포근한 사교 콤비', -30, 20, 40, 60, -10, 50, 50, 70),
--   ('dog', '콩이',  'ESAN', 'ESAC', 78, '활기찬 탐험 콤비', 55, 45, 25, -10, 70, 30, 35, 40);

-- Done! Now set NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
