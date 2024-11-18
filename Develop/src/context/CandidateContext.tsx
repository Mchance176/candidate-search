import { createContext, useContext, useState, useEffect } from 'react';
import type { GitHubUser } from '../api/API';

// Define context interface
interface CandidateContextType {
  savedCandidates: GitHubUser[];
  saveCandidate: (candidate: GitHubUser) => void;
  removeSavedCandidate: (id: number) => void;
}

// Create context
const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

// Storage key constant
const STORAGE_KEY = 'savedCandidates';

// Provider component
export const CandidateProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state with data from localStorage
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>(() => {
    try {
      // Try to get saved candidates from localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved candidates:', error);
      return [];
    }
  });

  // Update localStorage whenever savedCandidates changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCandidates));
    } catch (error) {
      console.error('Error saving candidates:', error);
    }
  }, [savedCandidates]);

  // Save a new candidate
  const saveCandidate = (candidate: GitHubUser) => {
    setSavedCandidates(prev => {
      // Check if candidate is already saved
      if (prev.some(saved => saved.id === candidate.id)) {
        console.log('Candidate already saved:', candidate.login);
        return prev;
      }
      // Add new candidate to the list
      console.log('Saving candidate:', candidate.login);
      return [...prev, candidate];
    });
  };

  // Remove a candidate
  const removeSavedCandidate = (id: number) => {
    setSavedCandidates(prev => {
      console.log('Removing candidate with ID:', id);
      return prev.filter(candidate => candidate.id !== id);
    });
  };

  // Context value
  const value = {
    savedCandidates,
    saveCandidate,
    removeSavedCandidate,
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

// Custom hook for using the context
export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidateContext must be used within a CandidateProvider');
  }
  return context;
};