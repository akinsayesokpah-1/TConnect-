// pages/api/lucky.js
// Returns a redirect URL for "I'm Feeling Lucky"
import localIndex from '../../lib/localIndex';
import axios from 'axios';
const PROVIDER = process.env.SEARCH_PROVIDER || 'local';
const SERPAPI_KEY = process.env.SERPAPI_KEY || '';

export default async function handler(req, res) {
  const q = (req.query.q || '').trim();
  if (!q) return res.redirect('/');
  try {
    if (PROVIDER === 'serpapi' && SERPAPI_KEY) {
      const r = await axios.get('https://serpapi.com/search.json', { params: { q, api_key: SERPAPI_KEY, start: 0 }});
      const top = (r.data.organic_results || [])[0];
      if (top && top.link) return res.redirect(top.link);
    }
  } catch (e) {
    // ignore and fallback
  }
  const results = localIndex.search(q);
  if (results.length > 0) return res.redirect(results[0].link);
  return res.redirect('/');
}
