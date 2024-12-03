import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, checkRateLimit } from '../api/API';
import type { GitHubUser, FilterOptions } from '../interfaces/github.types';
import { useCandidateContext } from '../context/CandidateContext';
import { useSearchHistory } from '../context/SearchHistoryContext';
import CandidateCard from '../components/Candidate/CandidateCard';
import CandidateDetails from '../components/Candidate/CandidateDetails';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchFilters from '../components/Search/SearchFilters';
import SearchHistory from '../components/Search/SearchHistory';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const CandidateSearch = () => {
  // State for managing the current candidate and UI state
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentSearchId, setCurrentSearchId] = useState<string>('');
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  // Get context functions
  const { saveCandidate } = useCandidateContext();
  const { addToHistory, updateSavedCandidate } = useSearchHistory();

  // Load initial candidate when component mounts
  useEffect(() => {
    fetchNextCandidate();
  }, []);

  // Fetch the next candidate from GitHub
  const fetchNextCandidate = async () => {
    setIsLoading(true);
    setError(null);
    setNoMoreCandidates(false);
    
    try {
      // Check GitHub API rate limit
      const rateLimit = await checkRateLimit();
      if (rateLimit.resources.core.remaining < 1) {
        const resetTime = new Date(rateLimit.resources.core.reset * 1000).toLocaleTimeString();
        throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
      }

      // Search for users with current filters
      const users = await searchGithub(currentFilters);
      if (users.length === 0) {
        setNoMoreCandidates(true);
        setCurrentCandidate(null);
        return;
      }

      // Get detailed info for the first valid user
      let userDetails = null;
      for (const user of users) {
        try {
          userDetails = await searchGithubUser(user.login);
          break;
        } catch (err) {
          continue;
        }
      }

      if (!userDetails) {
        setNoMoreCandidates(true);
        setCurrentCandidate(null);
        return;
      }

      // Update state and search history
      setCurrentCandidate(userDetails);
      const searchId = Date.now().toString();
      setCurrentSearchId(searchId);
      addToHistory(currentFilters, users.length);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch candidate');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes from SearchFilters component
  const handleFilterChange = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    fetchNextCandidate();
  };

  // Handle saving the current candidate
  const handleSaveCandidate = () => {
    if (!currentCandidate) return;
    
    try {
      saveCandidate(currentCandidate);
      updateSavedCandidate(currentSearchId, currentCandidate.login);
      fetchNextCandidate();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save candidate');
    }
  };

  // Skip current candidate and fetch next
  const handleSkipCandidate = () => {
    fetchNextCandidate();
  };

  // Show loading spinner while fetching
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Candidates</h1>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Candidates</h1>
        <ErrorMessage message={error} onRetry={fetchNextCandidate} />
      </div>
    );
  }

  // Main component render
  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Find Candidates</h1>
          <SearchHistory />
        </div>

        {/* Search filters section */}
        <SearchFilters onFilterChange={handleFilterChange} />

        {/* Candidate display section */}
        <div className="mt-8">
          {noMoreCandidates ? (
            // Show message when no candidates found
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search filters to find more candidates.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setCurrentFilters({});
                    fetchNextCandidate();
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : currentCandidate ? (
            // Show candidate card if we have a candidate
            <div className="space-y-4">
              <CandidateCard 
                candidate={currentCandidate}
                onAction={handleSaveCandidate}
                actionLabel="Save Candidate"
                actionStyle="bg-green-500 hover:bg-green-600"
                onViewDetails={() => setShowDetails(true)}
              />
              <button
                onClick={handleSkipCandidate}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors duration-200"
              >
                Skip Candidate
              </button>
            </div>
          ) : (
            // Show initial state when no search has been performed
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Start your candidate search</p>
              <button
                onClick={fetchNextCandidate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Find Candidates
              </button>
            </div>
          )}
        </div>

        {/* Candidate details modal */}
        {showDetails && currentCandidate && (
          <CandidateDetails
            candidate={currentCandidate}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default CandidateSearch;