
import React, { createContext, useContext, useState } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: 'calculator' | 'analysis' | 'education';
  route: string;
  state?: any;
  icon?: string;
}

interface SearchContextType {
  globalSearchTerm: string;
  setGlobalSearchTerm: (term: string) => void;
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  lastSearchResults: SearchResult[];
  setLastSearchResults: (results: SearchResult[]) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  lastSearchTerm: string;
  setLastSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [lastSearchResults, setLastSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ 
      globalSearchTerm, 
      setGlobalSearchTerm,
      searchResults,
      setSearchResults,
      lastSearchResults,
      setLastSearchResults,
      isSearching,
      setIsSearching,
      showResults,
      setShowResults,
      lastSearchTerm,
      setLastSearchTerm
    }}>
      {children}
    </SearchContext.Provider>
  );
};
