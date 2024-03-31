import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './shared/i18n/index.ts';
import './shared/hooks/useTheme.tsx';

createRoot(document.getElementById('root')!).render(<App />);
