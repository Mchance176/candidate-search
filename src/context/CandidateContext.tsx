import React, { createContext, useContext, useState, useCallback } from 'react';
import type { GitHubUser } from '../interfaces/github.types';

interface CandidateContextType {
  savedCandidates: GitHubUser[];
  saveCandidate: (candidate: GitHubUser) => void;
  removeCandidate: (candidateId: number) => void;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCandidate = useCallback((candidate: GitHubUser) => {
    setSavedCandidates(prev => {
      const updated = [...prev, candidate];
      localStorage.setItem('savedCandidates', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeCandidate = useCallback((candidateId: number) => {
    setSavedCandidates(prev => {
      const updated = prev.filter(c => c.id !== candidateId);
      localStorage.setItem('savedCandidates', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = {
    savedCandidates,
    saveCandidate,
    removeCandidate
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidateContext must be used within a CandidateProvider');
  }
  return context;
};