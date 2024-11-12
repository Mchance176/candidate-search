import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<GithubUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      setCandidates(data);
    } catch (err) {
      setError('Failed to fetch candidates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

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
            <h2 className="text-xl text-center mt-2">{candidate.login}</h2>
            <div className="flex justify-center mt-4 gap-2">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {/* TODO: Save candidate */}}
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