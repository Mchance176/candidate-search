import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback';

// Define routes with error handling
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
  future: {
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    // Wrap entire app in error boundary
    <ErrorBoundary
      fallback={
        <ErrorFallback 
          error={new Error("An unexpected error occurred")} 
          resetErrorBoundary={() => window.location.reload()} 
        />
      }
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;