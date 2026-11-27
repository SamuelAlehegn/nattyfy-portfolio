import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

function AppWithInitialLoader() {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');

    if (!loader) return;

    loader.classList.add('is-hidden');

    const timeout = window.setTimeout(() => {
      loader.remove();
    }, 300);

    return () => window.clearTimeout(timeout);
  }, []);

  return <App />;
}

createRoot(rootElement).render(
  <StrictMode>
    <AppWithInitialLoader />
  </StrictMode>,
);
