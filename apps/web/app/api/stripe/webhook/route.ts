import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  const buf = await req.arrayBuffer();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
    const session: any = event.data.object;
    const email = session.customer_details?.email;
    if (email) await supabase.from('profiles').update({ role: 'member' }).eq('email', email);
  }
  return NextResponse.json({ received: true });
}
