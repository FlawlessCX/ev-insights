insert into public.releases(version,status,notes) values ('2025-08-07','published','Initial demo');
insert into public.market_stats(metric,value,unit,geography,period,is_public,source,retrieved_at,version)
values ('bev_share',24,'percent','UK','2025-07',true,'SMMT','2025-08-01','2025-08-07');
insert into public.ev_models(brand,model,body,rrp,typical_price,wltp_range_mi,battery_kwh,ac_kw,dc_kw,features,segment,is_public,source,retrieved_at,version)
values ('MG','MG4','hatchback',25995,23995,281,64,11,150,'["V2L","ADAS"]','budget',true,'OEM','2025-08-01','2025-08-07');
