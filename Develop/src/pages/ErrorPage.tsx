import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Get appropriate error message
  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      return error.status === 404 
        ? "Sorry, the page you're looking for doesn't exist."
        : "Sorry, something went wrong.";
    }
    return "An unexpected error occurred.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-800 mb-2">
            {isRouteErrorResponse(error) ? error.status : '404'}
          </h1>
          <div className="text-4xl text-gray-600 mb-4">¯\_(ツ)_/¯</div>
          <p className="text-gray-600 mb-8">
            {getErrorMessage()}
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;