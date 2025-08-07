import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
  const { priceId } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: process.env.NEXT_PUBLIC_SITE_URL + '/?success=1',
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL + '/pricing?cancel=1',
  });
  return NextResponse.json({ id: session.id });
}
