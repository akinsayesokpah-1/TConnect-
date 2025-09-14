# SearchX - Demo Google-style search UI (Next.js + Tailwind)

## Quick start

1. Copy `.env.local.example` to `.env.local` and set `SEARCH_PROVIDER` to `local` or `serpapi` (if you add a key).
2. Install:
   ```
   npm install
   ```
3. Run dev server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Notes
- To enable real results using SerpApi, set `SEARCH_PROVIDER=serpapi` and add `SERPAPI_KEY` in `.env.local`.
- Local mode uses a tiny in-memory dataset and works offline.

