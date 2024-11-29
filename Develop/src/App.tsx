import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CandidateProvider } from './context/CandidateContext';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback';
import PersistenceCheck from './components/PersistenceCheck';

// Define routes with basename for Render deployment
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CandidateSearch />,
      },
      {
        path: 'saved',
        element: <SavedCandidates />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL, // Add basename for production
  future: {
    v7_skipActionErrorRevalidation: true,
  },
});

// Add error logging
const logError = (error: Error) => {
  console.error('Application Error:', error);
  // You could add more sophisticated error logging here
};

function App() {
  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback 
          error={new Error("An unexpected error occurred")} 
          resetErrorBoundary={() => window.location.reload()} 
        />
      }
      onError={logError}
    >
      <CandidateProvider>
        <RouterProvider router={router} />
        <PersistenceCheck />
      </CandidateProvider>
    </ErrorBoundary>
  );
}

export default App;