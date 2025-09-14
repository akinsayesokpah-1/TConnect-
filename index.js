import Layout from '../components/Layout';
import SearchBox from '../components/SearchBox';

export default function Home({ toggleTheme, theme }) {
  return (
    <Layout toggleTheme={toggleTheme} theme={theme}>
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <img src="/logo.svg" alt="logo" className="h-28 mb-6" />
        <SearchBox autofocus />
        <p className="mt-6 text-gray-600 dark:text-gray-400">A lightweight demo search engine UI — plug in an API key for live results.</p>
      </div>
    </Layout>
  );
}
