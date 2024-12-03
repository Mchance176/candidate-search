import { createContext, useContext, useState, useEffect } from 'react';
import type { FilterOptions } from '../interfaces/github.types';

// Define what a search record looks like
interface SearchRecord {
  id: string;
  timestamp: number;
  filters: FilterOptions;
  results: number;
  savedCandidates: string[]; // Usernames of saved candidates
}

// Define the context shape
interface SearchHistoryContextType {
  searchHistory: SearchRecord[];
  addToHistory: (filters: FilterOptions, results: number) => void;
  clearHistory: () => void;
  updateSavedCandidate: (searchId: string, username: string) => void;
}

// Create the context
const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

// Provider component
export const SearchHistoryProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage or empty array
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>(() => {
    const saved = localStorage.getItem('search-history');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Add new search to history
  const addToHistory = (filters: FilterOptions, results: number) => {
    const newRecord: SearchRecord = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      filters,
      results,
      savedCandidates: [],
    };

    // Add to start of array, limit to 50 entries
    setSearchHistory(prev => [newRecord, ...prev].slice(0, 50));
  };

  // Clear all history
  const clearHistory = () => {
    setSearchHistory([]);
  };

  // Add a saved candidate to a specific search record
  const updateSavedCandidate = (searchId: string, username: string) => {
    setSearchHistory(prev => prev.map(record => {
      if (record.id === searchId) {
        return {
          ...record,
          savedCandidates: [...record.savedCandidates, username]
        };
      }
      return record;
    }));
  };

  // Provide context values to children
  return (
    <SearchHistoryContext.Provider value={{
      searchHistory,
      addToHistory,
      clearHistory,
      updateSavedCandidate
    }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

// Custom hook for using the search history
export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};