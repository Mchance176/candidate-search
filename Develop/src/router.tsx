import { createBrowserRouter } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout/Layout';

// Define routes with error handling
export const router = createBrowserRouter([
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