
import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  globalSearchTerm: string;
  setGlobalSearchTerm: (term: string) => void;
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

  return (
    <SearchContext.Provider value={{ globalSearchTerm, setGlobalSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
