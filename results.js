import Layout from '../components/Layout';
import SearchBox from '../components/SearchBox';
import ResultCard from '../components/ResultCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Results({ toggleTheme, theme }) {
  const router = useRouter();
  const { q = '', page = 1, tab = 'all' } = router.query;
  const [results, setResults] = useState([]);
  const [meta, setMeta] = useState({ total: 0 });
  useEffect(() => {
    if (!q) return;
    axios.get(`/api/search?q=${encodeURIComponent(q)}&page=${page}&tab=${tab}`)
      .then(r => {
        setResults(r.data.results || []);
        setMeta(r.data.meta || {});
      })
      .catch(()=>setResults([]));
  }, [q, page, tab]);

  return (
    <Layout toggleTheme={toggleTheme} theme={theme}>
      <div className="px-4">
        <div className="mt-6">
          <SearchBox initial={q} />
        </div>

        <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-300">
          <a onClick={()=>router.push(`/results?q=${q}&page=1&tab=all`)} className="cursor-pointer">All</a>
          <a onClick={()=>router.push(`/results?q=${q}&page=1&tab=images`)} className="cursor-pointer">Images</a>
          <a onClick={()=>router.push(`/results?q=${q}&page=1&tab=news`)} className="cursor-pointer">News</a>
          <a onClick={()=>router.push(`/results?q=${q}&page=1&tab=videos`)} className="cursor-pointer">Videos</a>
        </div>

        <div className="mt-6 max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400">{meta.total ?? 0} results</p>

          <div className="mt-4">
            {results.map((r, i) => <ResultCard key={i} r={r} />)}
          </div>

          {/* Simple pagination */}
          <div className="flex justify-between mt-6">
            <button disabled={page <= 1} onClick={()=>router.push(`/results?q=${q}&page=${Number(page)-1}&tab=${tab}`)} className="px-3 py-1 border rounded">Prev</button>
            <button onClick={()=>router.push(`/results?q=${q}&page=${Number(page)+1}&tab=${tab}`)} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
