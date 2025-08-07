create or replace procedure public.promote_release(p_version text)
language plpgsql as $$
begin
  update public.releases set status='published', published_at=now() where version=p_version;
end;$$;

create or replace function public.exec_sql(sql text)
returns void language plpgsql security definer as $$
begin
  execute sql;
end $$;
