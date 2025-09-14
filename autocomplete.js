// pages/api/autocomplete.js
import localIndex from '../../lib/localIndex';
import axios from 'axios';
const PROVIDER = process.env.SEARCH_PROVIDER || 'local';
const SERPAPI_KEY = process.env.SERPAPI_KEY || '';

export default async function handler(req,res){
  const q = (req.query.q||'').trim();
  if (!q) return res.json({ suggestions: [] });

  try {
    if (PROVIDER === 'serpapi' && SERPAPI_KEY) {
      // SerpApi supports autocomplete endpoint (or use Google Suggest via serpapi)
      const r = await axios.get('https://serpapi.com/search_suggestions.json', { params: { api_key: SERPAPI_KEY, q }});
      const suggestions = (r.data.suggestions || []).map(s=>s.text).slice(0,6);
      return res.json({ suggestions });
    }
    // Local suggestions
    const suggestions = localIndex.suggest(q).slice(0,6);
    return res.json({ suggestions });
  } catch(err){
    return res.json({ suggestions: localIndex.suggest(q).slice(0,6) });
  }
}
