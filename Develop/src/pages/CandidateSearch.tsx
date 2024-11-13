import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { useCandidateContext } from '../context/CandidateContext';
import CandidateCard from '../components/Candidate/CandidateCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { saveCandidate } = useCandidateContext();

  const fetchNextCandidate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const users = await searchGithub();
      if (users.length > 0) {
        const details = await searchGithubUser(users[0].login);
        setCurrentCandidate(details);
      } else {
        setError('No more candidates available');
      }
    } catch (err) {
      setError('Failed to fetch candidate');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const handleSaveCandidate = (candidate: any) => {
    saveCandidate(candidate);
    fetchNextCandidate();
  };

  const handleSkipCandidate = () => {
    fetchNextCandidate();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchNextCandidate} />;
  if (!currentCandidate) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Find Candidates</h1>
      <div className="max-w-2xl mx-auto">
        <CandidateCard 
          candidate={currentCandidate}
          onAction={handleSaveCandidate}
          actionLabel="Save Candidate"
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