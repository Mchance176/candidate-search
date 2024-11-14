import React, { createContext, useState, useContext } from 'react';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  location?: string;
}

interface CandidateContextType {
  savedCandidates: Candidate[];
  saveCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: number) => void;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const saveCandidate = (candidate: Candidate) => {
    setSavedCandidates(prev => {
      if (!prev.some(c => c.id === candidate.id)) {
        return [...prev, candidate];
      }
      return prev;
    });
  };

  const removeCandidate = (id: number) => {
    setSavedCandidates(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CandidateContext.Provider value={{ savedCandidates, saveCandidate, removeCandidate }}>
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

export default CandidateContext;