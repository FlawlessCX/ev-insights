import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function POST(req: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { table, rows, version } = await req.json();
  if (!['ev_models','incentives','finance_terms','dealer_offers','market_stats','charging_points'].includes(table)) {
    return NextResponse.json({ error: 'invalid table' }, { status: 400 });
  }
  const staging = `${table}_staging`;
  if (!Array.isArray(rows) || !version) return NextResponse.json({ error: 'bad payload' }, { status: 400 });
  const withVersion = rows.map((r: any) => ({ ...r, version }));
  const { error } = await supabase.from(staging).insert(withVersion);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
