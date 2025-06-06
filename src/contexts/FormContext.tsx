
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormSection {
  id: string;
  label: string;
  completed: boolean;
}

interface FormContextType {
  sections: FormSection[];
  updateSectionCompletion: (sectionId: string, completed: boolean) => void;
  getCompletionPercentage: () => number;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialSections: FormSection[] = [
  { id: "personal", label: "Personal & Demographics", completed: false },
  { id: "income", label: "Income & Employment", completed: false },
  { id: "savings", label: "Savings & Investments", completed: false },
  { id: "expenses", label: "Expenses & Cash Flow", completed: false },
  { id: "assets", label: "Assets & Liabilities", completed: false },
  { id: "insurance", label: "Insurance & Protection", completed: false },
];

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<FormSection[]>(initialSections);

  const updateSectionCompletion = (sectionId: string, completed: boolean) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, completed } : section
      )
    );
  };

  const getCompletionPercentage = () => {
    const completedSections = sections.filter(section => section.completed).length;
    return (completedSections / sections.length) * 100;
  };

  return (
    <FormContext.Provider value={{ sections, updateSectionCompletion, getCompletionPercentage }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
