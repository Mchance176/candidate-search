import ReactDOM from 'react-dom/client';
import { CandidateProvider } from './context/CandidateContext';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SearchHistoryProvider>
    <CandidateProvider>
      <App />
    </CandidateProvider>
  </SearchHistoryProvider>
);