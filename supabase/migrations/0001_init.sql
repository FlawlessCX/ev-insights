create extension if not exists pgcrypto;
create extension if not exists postgis;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text not null default 'public' check (role in ('public','member','admin')),
  created_at timestamptz default now()
);
create table if not exists public.releases (
  id bigint generated always as identity primary key,
  version text not null unique,
  status text not null default 'draft' check (status in ('draft','published')),
  notes text,
  started_at timestamptz default now(),
  published_at timestamptz
);
do $$ begin
  create type body_type as enum ('hatchback','suv','saloon','estate','mpv','coupe','pickup','van','other');
exception when duplicate_object then null; end $$;
create table if not exists public.ev_models (
  id bigint generated always as identity primary key,
  brand text not null,
  model text not null,
  body body_type,
  rrp numeric,
  typical_price numeric,
  wltp_range_mi numeric,
  battery_kwh numeric,
  ac_kw numeric,
  dc_kw numeric,
  features jsonb default '[]'::jsonb,
  segment text,
  is_public boolean default true,
  source text,
  retrieved_at date,
  version text references public.releases(version)
);
create table if not exists public.ev_models_staging (like public.ev_models including all);
create table if not exists public.incentives (
  id bigint generated always as identity primary key,
  name text not null,
  applies_to jsonb not null,
  value_type text not null check (value_type in ('gbp','percent')),
  value_amount numeric,
  eligibility text,
  expiry date,
  stackable_with text[] default '{}',
  exclusive_with text[] default '{}',
  is_public boolean default true,
  source text,
  retrieved_at date,
  version text references public.releases(version)
);
create table if not exists public.incentives_staging (like public.incentives including all);
create table if not exists public.finance_terms (
  id bigint generated always as identity primary key,
  type text not null check (type in ('PCP','HP','Lease','Loan')),
  apr numeric,
  deposit_pct numeric,
  term_months int,
  example_price_band text,
  monthly_estimate numeric,
  is_public boolean default true,
  source text,
  retrieved_at date,
  version text references public.releases(version)
);
create table if not exists public.finance_terms_staging (like public.finance_terms including all);
create table if not exists public.dealer_offers (
  id bigint generated always as identity primary key,
  oem text,
  model text,
  offer_type text,
  details text,
  valid_from date,
  valid_to date,
  is_public boolean default false,
  source text,
  retrieved_at date,
  version text references public.releases(version)
);
create table if not exists public.dealer_offers_staging (like public.dealer_offers including all);
create table if not exists public.market_stats (
  id bigint generated always as identity primary key,
  metric text not null,
  value numeric not null,
  unit text,
  geography text default 'UK',
  period text,
  is_public boolean default true,
  source text,
  retrieved_at date,
  version text references public.releases(version)
);
create table if not exists public.market_stats_staging (like public.market_stats including all);
create table if not exists public.charging_points (
  id bigint generated always as identity primary key,
  operator text,
  kind text check (kind in ('standard','fast','rapid','ultra-rapid')),
  power_kw numeric,
  lat numeric,
  lng numeric,
  geom geometry(Point,4326),
  opened_at date,
  is_public boolean default true,
  source text,
  retrieved_at date,
  version text references public.releases(version)
);
create table if not exists public.charging_points_staging (like public.charging_points including all);
