import React, { useState } from 'react';
import { searchGithub } from '../api/API';
import type { GitHubUser } from '../interfaces/github.types';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const users = await searchGithub({ location: query });
      setResults(users);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Error searching users. Please check your GitHub token.'
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GitHub users by location..."
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((user) => (
            <div key={user.id} className="border p-4 rounded shadow hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <img 
                  src={user.avatar_url} 
                  alt={user.login} 
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold">{user.login}</h3>
                  {user.name && <p className="text-gray-600">{user.name}</p>}
                  {user.location && <p className="text-gray-500">{user.location}</p>}
                  <a 
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 

export default Search;