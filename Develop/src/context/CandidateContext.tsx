import { createContext, useContext, useState, useEffect } from 'react';
import type { GitHubUser } from '../interfaces/github.types';

interface CandidateContextType {
  savedCandidates: GitHubUser[];
  addCandidate: (candidate: GitHubUser) => void;
  removeCandidate: (candidate: GitHubUser) => void;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const CandidateProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('Loaded saved candidates:', parsed.length);
        return parsed;
      } catch (e) {
        console.error('Error loading saved candidates:', e);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      console.log('Saved candidates to localStorage:', savedCandidates.length);
    } catch (e) {
      console.error('Error saving candidates:', e);
    }
  }, [savedCandidates]);

  // Add candidate
  const addCandidate = (candidate: GitHubUser) => {
    setSavedCandidates(prev => {
      if (prev.some(c => c.id === candidate.id)) return prev;
      return [...prev, candidate];
    });
  };

  // Remove candidate
  const removeCandidate = (candidate: GitHubUser) => {
    setSavedCandidates(prev => prev.filter(c => c.id !== candidate.id));
  };

  return (
    <CandidateContext.Provider value={{ savedCandidates, addCandidate, removeCandidate }}>
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