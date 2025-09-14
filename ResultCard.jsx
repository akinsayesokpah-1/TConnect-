export default function ResultCard({ r }) {
  return (
    <div className="py-4">
      <a href={r.link} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 text-sm">
        {r.displayLink || (new URL(r.link)).hostname}
      </a>
      <a href={r.link} target="_blank" rel="noreferrer" className="block text-lg font-medium hover:underline">
        {r.title}
      </a>
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{r.snippet}</p>
    </div>
  );
}
