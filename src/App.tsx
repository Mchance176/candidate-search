import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CandidateProvider } from './context/CandidateContext';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TokenVerification from './components/TokenVerification/TokenVerification';
import { router } from './router';

// Add fallback UI for router errors
const routerFallback = (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold mb-2">Loading...</h2>
      <p className="text-gray-600">Please wait while we set up the application.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <SearchHistoryProvider>
        <CandidateProvider>
          {/* Show token verification only in development */}
          {import.meta.env.DEV && <TokenVerification />}
          
          {/* Router with fallback UI */}
          <RouterProvider 
            router={router} 
            fallbackElement={routerFallback}
          />
        </CandidateProvider>
      </SearchHistoryProvider>
    </ErrorBoundary>
  );
};

export default App;