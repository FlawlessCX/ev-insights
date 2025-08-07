'use client';
import { loadStripe } from '@stripe/stripe-js';

export default function Pricing() {
  const subscribe = async (priceId: string) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ priceId }) });
    const { id } = await res.json();
    stripe?.redirectToCheckout({ sessionId: id });
  };
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-semibold">Go deeper with EV Insights</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <button className="border p-6 rounded-xl" onClick={() => subscribe(process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY!)}>Monthly</button>
        <button className="border p-6 rounded-xl" onClick={() => subscribe(process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL!)}>Annual</button>
      </div>
    </div>
  );
}
