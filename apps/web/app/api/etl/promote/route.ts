import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function POST(req: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { version } = await req.json();
  const { data: rel } = await supabase.from('releases').select('*').eq('version', version).maybeSingle();
  if (!rel) await supabase.from('releases').insert({ version, status: 'draft' });
  const tables = ['ev_models','incentives','finance_terms','dealer_offers','market_stats','charging_points'];
  for (const t of tables) {
    await supabase.rpc('exec_sql', { sql: `delete from ${t} where version = '${version}'` });
    await supabase.rpc('exec_sql', { sql: `insert into ${t} select * from ${t}_staging where version = '${version}'` });
  }
  await supabase.rpc('exec_sql', { sql: `update releases set status='published', published_at=now() where version='${version}'` });
  return NextResponse.json({ ok: true });
}
