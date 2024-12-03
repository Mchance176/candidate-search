import { useState } from 'react';
import { useSearchHistory } from '../../context/SearchHistoryContext';

const SearchHistory = () => {
  // Local state for dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // Get history functions from context
  const { searchHistory, clearHistory } = useSearchHistory();

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  // Convert filter object to readable string
  const formatFilters = (filters: Record<string, any>) => {
    return Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  };

  return (
    <div className="relative">
      {/* History Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Search History</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            {/* Header with Clear Button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Searches</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear History
              </button>
            </div>

            {/* History List */}
            {searchHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No search history</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchHistory.map((record) => (
                  <div
                    key={record.id}
                    className="border rounded-lg p-3 hover:bg-gray-50"
                  >
                    {/* Search Timestamp and Results */}
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{formatDate(record.timestamp)}</span>
                      <span>{record.results} results</span>
                    </div>
                    
                    {/* Search Filters */}
                    <div className="mt-1 text-sm">
                      <strong>Filters:</strong> {formatFilters(record.filters) || 'None'}
                    </div>
                    
                    {/* Saved Candidates Count */}
                    {record.savedCandidates.length > 0 && (
                      <div className="mt-1 text-sm text-green-600">
                        {record.savedCandidates.length} candidates saved
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;