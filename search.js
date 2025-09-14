// pages/api/search.js
import axios from 'axios';
import localIndex from '../../lib/localIndex';

const PROVIDER = process.env.SEARCH_PROVIDER || 'local';
const SERPAPI_KEY = process.env.SERPAPI_KEY || '';
const BRAVE_API_KEY = process.env.BRAVE_API_KEY || '';

export default async function handler(req, res) {
  const q = (req.query.q || '').trim();
  const page = Number(req.query.page || 1);
  const tab = req.query.tab || 'all';
  if (!q) return res.status(400).json({ error: 'q is required' });

  try {
    if (PROVIDER === 'serpapi' && SERPAPI_KEY) {
      // SerpApi (Google) example: https://serpapi.com/search.json?q=...
      const params = {
        q, api_key: SERPAPI_KEY, start: (page - 1) * 10
      };
      if (tab === 'images') params.tbm = 'isch';
      if (tab === 'news') params.tbm = 'nws';
      const r = await axios.get('https://serpapi.com/search.json', { params });
      // transform to common shape
      const results = (r.data.organic_results || []).map(it => ({
        title: it.title,
        snippet: it.snippet || it.description || '',
        link: it.link || it.source,
        displayLink: it.displayed_link || undefined
      }));
      return res.json({ results, meta: { total: r.data.search_information?.total_results || results.length }});
    }

    if (PROVIDER === 'brave' && BRAVE_API_KEY) {
      // Brave Search API
      const r = await axios.get('https://api.search.brave.com/res/v1/web/search', {
        params: { query: q, offset: (page-1)*10, limit: 10 },
        headers: { 'x-api-key': BRAVE_API_KEY }
      });
      const results = (r.data.data || []).map(it => ({
        title: it.title,
        snippet: it.snippet || '',
        link: it.url
      }));
      return res.json({ results, meta: { total: r.data.meta?.total || results.length }});
    }

    // Local fallback: simple TF-like ranking on small dataset
    const results = localIndex.search(q, { page, tab });
    return res.json({ results, meta: { total: results.length }});
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    // fallback to local index if external API fails
    const results = localIndex.search(q, { page, tab });
    return res.json({ results, meta: { total: results.length, fallback: true }});
  }
}
