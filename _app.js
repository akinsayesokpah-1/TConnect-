import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const t = localStorage.getItem('theme') || 'light';
    setTheme(t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, []);
  const toggle = () => {
    const t = theme === 'light' ? 'dark' : 'light';
    setTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  };
  return <Component {...pageProps} toggleTheme={toggle} theme={theme} />;
}
export default MyApp;
