import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, checkRateLimit } from '../api/API';
import type { GitHubUser } from '../api/API';
import { useCandidateContext } from '../context/CandidateContext';
import CandidateCard from '../components/Candidate/CandidateCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchFilters from '../components/Search/SearchFilters';

interface FilterOptions {
  minRepos?: number;
  minFollowers?: number;
  location?: string;
}

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { saveCandidate } = useCandidateContext();

  const fetchNextCandidate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check rate limit first
      const rateLimit = await checkRateLimit();
      console.log('Rate limit status:', rateLimit.resources.core);
      
      if (rateLimit.resources.core.remaining < 1) {
        const resetTime = new Date(rateLimit.resources.core.reset * 1000).toLocaleTimeString();
        throw new Error(`Rate limit exceeded. Resets at ${resetTime}`);
      }

      // Fetch users
      console.log('Fetching users...');
      const users = await searchGithub();
      console.log('Users found:', users.length);

      if (users.length > 0) {
        console.log('Fetching details for user:', users[0].login);
        const userDetails = await searchGithubUser(users[0].login);
        console.log('User details:', userDetails);
        setCurrentCandidate(userDetails);
      } else {
        setError('No more candidates available');
      }
    } catch (err) {
      console.error('Error in fetchNextCandidate:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch candidate');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Initial fetch starting...');
    fetchNextCandidate();
  }, []);

  const handleSaveCandidate = (candidate: GitHubUser) => {
    console.log('Saving candidate:', candidate.login);
    saveCandidate(candidate);
    fetchNextCandidate();
  };

  const handleSkipCandidate = () => {
    console.log('Skipping candidate:', currentCandidate?.login);
    fetchNextCandidate();
  };

  const handleFilterChange = (filters: FilterOptions) => {
    console.log('Filters changed:', filters);
    if (!currentCandidate) return;
    
    let shouldFetch = false;
    
    if (filters.minRepos && currentCandidate.public_repos < filters.minRepos) {
      console.log('Candidate does not meet repo requirement');
      shouldFetch = true;
    }
    if (filters.minFollowers && currentCandidate.followers < filters.minFollowers) {
      console.log('Candidate does not meet follower requirement');
      shouldFetch = true;
    }
    if (filters.location && !currentCandidate.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      console.log('Candidate does not meet location requirement');
      shouldFetch = true;
    }

    if (shouldFetch) {
      fetchNextCandidate();
    }
  };

  if (isLoading) {
    console.log('Rendering loading state');
    return <LoadingSpinner />;
  }
  
  if (error) {
    console.log('Rendering error state:', error);
    return <ErrorMessage message={error} onRetry={fetchNextCandidate} />;
  }
  
  if (!currentCandidate) {
    console.log('No candidate available');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Find Candidates</h1>
      <SearchFilters onFilterChange={handleFilterChange} />
      <div className="max-w-2xl mx-auto">
        <CandidateCard 
          candidate={currentCandidate}
          onAction={handleSaveCandidate}
          actionLabel="Save Candidate"
          actionStyle="bg-green-500 hover:bg-green-600"
        />
        <button
          onClick={handleSkipCandidate}
          className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-full transition-colors duration-200"
        >
          Skip Candidate
        </button>
      </div>
    </div>
  );
};

export default CandidateSearch;