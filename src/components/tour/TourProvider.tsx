
import { createContext, useContext, useState, ReactNode } from 'react';

interface TourContextValue {
  isTourOpen: boolean;
  startTour: () => void;
  closeTour: () => void;
  hasCompletedTour: boolean;
}

const TourContext = createContext<TourContextValue | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider = ({ children }: TourProviderProps) => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const hasCompletedTour = localStorage.getItem('tour-completed') === 'true';

  const startTour = () => {
    setIsTourOpen(true);
  };

  const closeTour = () => {
    setIsTourOpen(false);
  };

  return (
    <TourContext.Provider value={{
      isTourOpen,
      startTour,
      closeTour,
      hasCompletedTour,
    }}>
      {children}
    </TourContext.Provider>
  );
};
