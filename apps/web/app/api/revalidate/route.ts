import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('x-sanity-signature') || '';
  const expected = crypto.createHmac('sha256', process.env.SANITY_WEBHOOK_SECRET!).update(body).digest('hex');
  const valid = sig && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!valid) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ revalidated: true });
}
