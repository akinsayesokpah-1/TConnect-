import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function SearchBox({ initial = '', autofocus = false }) {
  const [q, setQ] = useState(initial);
  const [suggests, setSuggests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!q) { setSuggests([]); return; }
    const t = setTimeout(() => {
      axios.get(`/api/autocomplete?q=${encodeURIComponent(q)}`)
        .then(r => setSuggests(r.data.suggestions || []))
        .catch(()=>setSuggests([]));
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  function submit(searchLucky=false) {
    if (searchLucky) {
      router.push(`/api/lucky?q=${encodeURIComponent(q)}`);
      return;
    }
    router.push(`/results?q=${encodeURIComponent(q)}&page=1`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 border rounded-full px-4 py-3 shadow-sm flex items-center gap-3">
        <input
          autoFocus={autofocus}
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          onKeyDown={(e)=>{ if (e.key==='Enter') submit(false); }}
          placeholder="Search the web..."
          className="flex-1 outline-none bg-transparent"
        />
        <button onClick={()=>submit(false)} className="px-4 py-1 rounded-md border">Search</button>
        <button onClick={()=>submit(true)} className="px-4 py-1 rounded-md border">I'm Feeling Lucky</button>
      </div>

      {suggests.length>0 && (
        <ul className="mt-2 bg-white dark:bg-slate-800 border rounded-md max-w-2xl mx-auto">
          {suggests.map((s,i)=>(
            <li key={i} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                onClick={()=>{ setQ(s); setSuggests([]); }}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
