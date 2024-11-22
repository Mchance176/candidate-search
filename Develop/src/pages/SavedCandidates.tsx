import { useState } from 'react';
import { useCandidateContext } from '../context/CandidateContext';
import CandidateCard from '../components/Candidate/CandidateCard';
import CandidateDetails from '../components/Candidate/CandidateDetails';
import type { GitHubUser } from '../interfaces/github.types';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const SavedCandidates = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'followers' | 'repos'>('name');
  const [selectedCandidate, setSelectedCandidate] = useState<GitHubUser | null>(null);
  
  // Get saved candidates from context
  const { savedCandidates, removeCandidate } = useCandidateContext();

  // Filter and sort candidates
  const filteredCandidates = savedCandidates
    .filter(candidate => 
      candidate.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.company?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'followers':
          return b.followers - a.followers;
        case 'repos':
          return b.public_repos - a.public_repos;
        default:
          return (a.name || a.login).localeCompare(b.name || b.login);
      }
    });

  // Handle removing a candidate
  const handleRemoveCandidate = (candidate: GitHubUser) => {
    removeCandidate(candidate);
  };

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Saved Candidates</h1>
        
        {/* Show controls only if there are saved candidates */}
        {savedCandidates.length > 0 && (
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search input */}
              <input
                type="text"
                placeholder="Search saved candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              
              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'followers' | 'repos')}
                className="p-2 border rounded-lg bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="followers">Sort by Followers</option>
                <option value="repos">Sort by Repositories</option>
              </select>
            </div>
          </div>
        )}

        {/* Candidates list or empty state */}
        <div className="space-y-4">
          {savedCandidates.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No saved candidates</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by saving candidates from the search page.
              </p>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No candidates match your search criteria.</p>
            </div>
          ) : (
            filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onAction={() => handleRemoveCandidate(candidate)}
                actionLabel="Remove"
                actionStyle="bg-red-500 hover:bg-red-600"
                onViewDetails={() => setSelectedCandidate(candidate)}
              />
            ))
          )}
        </div>

        {/* Candidate details modal */}
        {selectedCandidate && (
          <CandidateDetails
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SavedCandidates;