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
  // State management
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentSearchId, setCurrentSearchId] = useState<string>('');
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);
  // Context hooks
  const { saveCandidate } = useCandidateContext();
  const { addToHistory, updateSavedCandidate } = useSearchHistory();

  // Load initial candidate on mount
  useEffect(() => {
    fetchNextCandidate();
  }, []);

  // Fetch next candidate with rate limit check
  const fetchNextCandidate = async () => {
    setIsLoading(true);
    setError(null);
    setNoMoreCandidates(false);
    
    try {
      // Check GitHub API rate limit
      const rateLimit = await checkRateLimit();
      if (rateLimit.resources.core.remaining < 1) {
        const resetTime = new Date(rateLimit.resources.core.reset * 1000).toLocaleTimeString();
        throw new Error(`Rate limit exceeded. Resets at ${resetTime}`);
      }

      // Search for users with current filters
      const users = await searchGithub(currentFilters);
      if (users.length === 0) {
        setNoMoreCandidates(true);
        setCurrentCandidate(null);
        return;
      
      }

      // Get detailed user info for first valid candidate
      let userDetails = null;
      let validUserFound = false;
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

  // Handle filter changes
  const handleFilterChange = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    fetchNextCandidate();
  };

  // Handle saving a candidate
  const handleSaveCandidate = (candidate: GitHubUser) => {
    saveCandidate(candidate);
    updateSavedCandidate(currentSearchId, candidate.login);
    fetchNextCandidate();
  };

  // Handle skipping a candidate
  const handleSkipCandidate = () => {
    fetchNextCandidate();
  };

  // Render loading state
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

  // Render error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Candidates</h1>
        <ErrorMessage message={error} onRetry={fetchNextCandidate} />
      </div>
    );
  }

  // Main render
  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Header with Search History */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Find Candidates</h1>
          <SearchHistory />
        </div>

        {/* Search Filters */}
        <SearchFilters onFilterChange={handleFilterChange} />

        {/* Candidate Display */}
        <div className="mt-8">
          {noMoreCandidates ? (
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

        {/* Candidate Details Modal */}
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