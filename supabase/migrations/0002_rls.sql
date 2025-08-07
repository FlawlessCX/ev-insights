alter table public.ev_models enable row level security;
alter table public.incentives enable row level security;
alter table public.finance_terms enable row level security;
alter table public.dealer_offers enable row level security;
alter table public.market_stats enable row level security;
alter table public.charging_points enable row level security;
alter table public.releases enable row level security;
alter table public.profiles enable row level security;

create or replace function public.current_role()
returns text language sql stable as $$ select coalesce((select role from public.profiles where id = auth.uid()), 'public'); $$;

create policy "self read profile" on public.profiles for select using (id = auth.uid());
create policy "admin manage profiles" on public.profiles for all using (public.current_role() = 'admin');

create policy "public can read published models" on public.ev_models
  for select using ((is_public = true and version in (select version from public.releases where status='published')) or public.current_role() in ('member','admin'));
create policy "admin write models" on public.ev_models for all using (public.current_role() = 'admin');

create policy "public can read published incentives" on public.incentives
  for select using ((is_public = true and version in (select version from public.releases where status='published')) or public.current_role() in ('member','admin'));
create policy "admin write incentives" on public.incentives for all using (public.current_role() = 'admin');

create policy "public can read published finance" on public.finance_terms
  for select using ((is_public = true and version in (select version from public.releases where status='published')) or public.current_role() in ('member','admin'));
create policy "admin write finance" on public.finance_terms for all using (public.current_role() = 'admin');

create policy "public can read published stats" on public.market_stats
  for select using ((is_public = true and version in (select version from public.releases where status='published')) or public.current_role() in ('member','admin'));
create policy "admin write stats" on public.market_stats for all using (public.current_role() = 'admin');

create policy "public can read published charging" on public.charging_points
  for select using ((is_public = true and version in (select version from public.releases where status='published')) or public.current_role() in ('member','admin'));
create policy "admin write charging" on public.charging_points for all using (public.current_role() = 'admin');

create policy "read releases" on public.releases for select using (true);
create policy "admin manage releases" on public.releases for all using (public.current_role() = 'admin');
