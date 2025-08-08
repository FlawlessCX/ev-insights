# EV Insights Starter (Next.js 14 + Supabase + Stripe + Sanity)

This is a deploy-ready starter for a UK EV insights site with:
- Supabase (auth, RLS, datasets, versioned releases)
- Stripe (subscriptions → member role)
- Sanity (editorial content, page builder, tooltips, release notes)
- Next.js (App Router) + ISR + serverless APIs
- ETL stubs for Manus → Supabase (staging → publish)

## Quickstart
1) Create Supabase project and note URL, anon key, service key.
2) Create a Sanity project/dataset; deploy the Studio in `apps/studio`.
3) Create two Stripe prices (monthly, annual).
4) Fill env at `apps/web/.env.local` (pre-filled in this zip for Supabase + Sanity).
5) Run DB migrations in `supabase/migrations` (via Supabase SQL editor or CLI).
6) `cd apps/web && npm i && npm run dev` (Node 18+).
7) Make your user an admin by updating `profiles.role = 'admin'`.

## Deploy
- Vercel for `apps/web` and `apps/studio`
- Set env vars on Vercel
- Add Stripe webhook: `/api/stripe/webhook`
- Add Sanity webhook: `/api/revalidate`

Hello
