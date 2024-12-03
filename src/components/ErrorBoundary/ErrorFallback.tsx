interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
  }
  
  const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </h2>
            
            <div className="mt-2 text-gray-600">
              <p className="text-sm">{error.message}</p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={resetErrorBoundary}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ErrorFallback;