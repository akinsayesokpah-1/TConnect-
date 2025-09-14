import Link from 'next/link';

export default function Layout({ children, toggleTheme, theme }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link href="/"><a className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-8" />
        </a></Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="px-3 py-1 rounded border">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
        Built for demo — SearchX • Privacy-minded demo
      </footer>
    </div>
  );
}
