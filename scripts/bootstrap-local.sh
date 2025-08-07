#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "▶ Bootstrapping local dev (apps/web + apps/studio)"
cd "$ROOT_DIR/apps/web" && npm install
cd "$ROOT_DIR/apps/studio" && npm install || true
echo "Run Supabase migrations from supabase/migrations/, then:"
echo "cd apps/studio && npx sanity dataset import sanity-seed.json production"
echo "cd apps/web && npm run dev"
