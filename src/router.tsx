import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout/Layout';

// Lazy load components for better performance
const CandidateSearch = lazy(() => import('./pages/CandidateSearch'));
const SavedCandidates = lazy(() => import('./pages/SavedCandidates'));

// Wrap components with Suspense for loading state
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner />
    </div>
  }>
    <Component />
  </Suspense>
);

// Define routes with error handling
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withSuspense(CandidateSearch),
      },
      {
        path: "saved",
        element: withSuspense(SavedCandidates),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

// Router component for easy usage
export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};