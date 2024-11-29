import { RouterProvider } from 'react-router-dom';
import { CandidateProvider } from './context/CandidateContext';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TokenVerification from './components/TokenVerification/TokenVerification'; // Updated path
import { router } from './router';

function App() {
  return (
    <ErrorBoundary>
      <SearchHistoryProvider>
        <CandidateProvider>
          {import.meta.env.DEV && <TokenVerification />}
          <RouterProvider router={router} />
        </CandidateProvider>
      </SearchHistoryProvider>
    </ErrorBoundary>
  );
}

export default App;