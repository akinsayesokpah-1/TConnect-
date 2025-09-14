// lib/localIndex.js
// Tiny in-memory dataset & simple search (substring + score by hits)
// Good enough for demo & offline usage.

const DATA = [
  { title: 'Next.js — The React Framework', link: 'https://nextjs.org', snippet: 'Hybrid static & server rendering, TypeScript support...' },
  { title: 'React – A JavaScript library for building user interfaces', link: 'https://react.dev', snippet: 'A JavaScript library for building user interfaces' },
  { title: 'Tailwind CSS — Utility-first CSS', link: 'https://tailwindcss.com', snippet: 'Rapidly build modern websites without ever leaving your HTML' },
  { title: 'SerpApi — Google Search Results API', link: 'https://serpapi.com', snippet: 'Real-time search results from Google, Bing, and more' },
  { title: 'Brave Search', link: 'https://search.brave.com', snippet: 'Private search engine from Brave' },
  { title: 'MDN Web Docs', link: 'https://developer.mozilla.org', snippet: 'Resources for developers, by developers' },
  { title: 'Wikipedia', link: 'https://wikipedia.org', snippet: 'Free encyclopedia' }
];

function scoreItem(item, q) {
  const s = q.toLowerCase();
  let score = 0;
  if (item.title.toLowerCase().includes(s)) score += 10;
  if (item.snippet.toLowerCase().includes(s)) score += 4;
  if (item.link.toLowerCase().includes(s)) score += 2;
  // add count of occurrences
  const cnt = (item.title + ' ' + item.snippet).toLowerCase().split(s).length - 1;
  score += Math.min(5, cnt);
  return score;
}

export default {
  search(q, opts = { page: 1, tab: 'all' }) {
    if (!q) return [];
    const scored = DATA.map(d => ({ ...d, score: scoreItem(d,q) }))
                     .filter(x => x.score > 0)
                     .sort((a,b)=>b.score - a.score);
    // transform shape
    return scored.map(s=>({ title: s.title, snippet: s.snippet, link: s.link }));
  },
  suggest(prefix) {
    if (!prefix) return [];
    const s = prefix.toLowerCase();
    const hits = DATA.map(d => d.title).filter(t => t.toLowerCase().includes(s));
    return Array.from(new Set(hits)).slice(0,10);
  }
};
