
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PresentationItem {
  id: string;
  name: string;
  source: "Analysis" | "Education" | "Calculators";
}

interface PresentationContextType {
  presentationItems: PresentationItem[];
  addPresentationItem: (item: PresentationItem) => void;
  removePresentationItem: (itemId: string) => void;
  setPresentationItems: (items: PresentationItem[]) => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const usePresentationContext = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentationContext must be used within a PresentationProvider');
  }
  return context;
};

export const PresentationProvider = ({ children }: { children: ReactNode }) => {
  const [presentationItems, setPresentationItemsState] = useState<PresentationItem[]>([
    { id: "1", name: "Capital Available", source: "Analysis" },
    { id: "2", name: "Social Security Optimizer", source: "Calculators" }, 
    { id: "3", name: "Alternatives Retirement", source: "Analysis" },
    { id: "4", name: "Retirement Timeline", source: "Calculators" },
    { id: "5", name: "Retirement Fact Finder", source: "Education" },
    { id: "6", name: "Graph", source: "Analysis" }
  ]);

  const addPresentationItem = (item: PresentationItem) => {
    setPresentationItemsState(prev => {
      // Check if item already exists
      if (prev.some(existingItem => existingItem.name === item.name)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removePresentationItem = (itemId: string) => {
    setPresentationItemsState(prev => prev.filter(item => item.id !== itemId));
  };

  const setPresentationItems = (items: PresentationItem[]) => {
    setPresentationItemsState(items);
  };

  return (
    <PresentationContext.Provider value={{
      presentationItems,
      addPresentationItem,
      removePresentationItem,
      setPresentationItems
    }}>
      {children}
    </PresentationContext.Provider>
  );
};
