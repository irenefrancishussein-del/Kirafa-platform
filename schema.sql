-- KIRAFA initial Supabase schema. Run in Supabase SQL Editor.
-- Important: configure Auth email verification, backup, and policies before public launch.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  preferred_language text not null default 'sw' check (preferred_language in ('sw','en')),
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  category integer not null check (category between 0 and 9),
  price numeric(14,2) check (price is null or price >= 0),
  quantity text,
  region text not null,
  district text,
  image_url text,
  status text not null default 'pending' check (status in ('pending','active','rejected','expired')),
  promoted_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plans (
  id text primary key check (id in ('wiki','mwezi')),
  name_sw text not null,
  name_en text not null,
  price_tsh integer not null check (price_tsh > 0),
  duration_days integer not null,
  max_active_listings integer,
  includes_promotion boolean not null default false
);
insert into public.plans(id,name_sw,name_en,price_tsh,duration_days,max_active_listings,includes_promotion)
values ('wiki','KIRAFA WIKI','KIRAFA WEEK',7000,7,10,false),
       ('mwezi','KIRAFA MWEZI','KIRAFA MONTH',24000,30,null,true)
on conflict (id) do update set price_tsh=excluded.price_tsh,duration_days=excluded.duration_days,max_active_listings=excluded.max_active_listings,includes_promotion=excluded.includes_promotion;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  plan_id text not null references public.plans(id),
  status text not null default 'pending_payment' check (status in ('pending_payment','pending_review','active','expired','cancelled')),
  started_at timestamptz,
  ends_at timestamptz,
  payment_method text,
  payment_reference text,
  launch_trial boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.launch_settings (
  id integer primary key default 1 check (id=1),
  launch_started_at timestamptz,
  launch_trial_days integer not null default 5,
  payments_enabled boolean not null default false
);
insert into public.launch_settings(id,launch_started_at,launch_trial_days,payments_enabled)
values(1,null,5,false) on conflict(id) do nothing;

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete set null,
  reporter_id uuid references public.profiles(id) on delete set null,
  reason text not null,
  details text,
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.launch_settings enable row level security;
alter table public.reports enable row level security;

drop policy if exists "Public can view profiles contact fields" on public.profiles;
create policy "Authenticated users can view seller profiles" on public.profiles for select to authenticated using (true);
drop policy if exists "Users can create own profile" on public.profiles;
create policy "Users can create own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Anyone can view active listings" on public.listings;
create policy "Anyone can view active listings" on public.listings for select using (status = 'active' or auth.uid() = seller_id);
drop policy if exists "Authenticated sellers can submit listings" on public.listings;
create policy "Authenticated sellers can submit listings" on public.listings for insert to authenticated with check (auth.uid() = seller_id and status = 'pending');
drop policy if exists "Sellers can update own pending listings" on public.listings;
create policy "Sellers can update own pending listings" on public.listings for update to authenticated using (auth.uid() = seller_id and status in ('pending','rejected')) with check (auth.uid() = seller_id and status in ('pending','rejected'));
drop policy if exists "Plans are public" on public.plans;
create policy "Plans are public" on public.plans for select using (true);
drop policy if exists "Users can view own subscriptions" on public.subscriptions;
create policy "Users can view own subscriptions" on public.subscriptions for select to authenticated using (auth.uid() = seller_id);
drop policy if exists "Users can request subscriptions" on public.subscriptions;
create policy "Users can request subscriptions" on public.subscriptions for insert to authenticated with check (auth.uid() = seller_id and status = 'pending_payment');
drop policy if exists "Launch settings are readable" on public.launch_settings;
create policy "Launch settings are readable" on public.launch_settings for select using (true);
drop policy if exists "Users can submit reports" on public.reports;
create policy "Users can submit reports" on public.reports for insert to authenticated with check (reporter_id is null or auth.uid() = reporter_id);

-- Create profile automatically when a new Auth user registers.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, full_name, phone)
  values(new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Admin moderation is deliberately not exposed to public clients.
-- Add a private admin role / server-side review workflow before launch.
