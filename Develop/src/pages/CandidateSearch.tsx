import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { useCandidateContext } from '../context/CandidateContext';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { saveCandidate } = useCandidateContext();

  const fetchCandidates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      const detailedCandidates = await Promise.all(
        data.map(async (user: Candidate) => {
          const details = await searchGithubUser(user.login);
          return { ...user, ...details };
        })
      );
      setCandidates(detailedCandidates);
    } catch (err) {
      setError('Failed to fetch candidates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSave = (candidate: Candidate) => {
    saveCandidate(candidate);
    fetchCandidates(); // Fetch new candidates after saving
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find Candidates</h1>
      
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="border p-4 rounded-lg shadow">
            <img 
              src={candidate.avatar_url} 
              alt={candidate.login}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h2 className="text-xl text-center mt-2">{candidate.name || candidate.login}</h2>
            {candidate.bio && <p className="text-center mt-2">{candidate.bio}</p>}
            <p className="text-center mt-2">
              Repos: {candidate.public_repos} | Followers: {candidate.followers}
            </p>
            <div className="flex justify-center mt-4 gap-2">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleSave(candidate)}
              >
                Save
              </button>
              <button 
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={fetchCandidates}
              >
                Skip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateSearch;