
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormSection {
  id: string;
  label: string;
  completed: boolean;
}

interface ClientData {
  name: string;
  data: Record<string, any>;
}

interface FormContextType {
  sections: FormSection[];
  formData: Record<string, any>;
  activeTab: string;
  updateSectionCompletion: (sectionId: string, completed: boolean) => void;
  getCompletionPercentage: () => number;
  updateFormData: (field: string, value: any) => void;
  clearAllData: () => void;
  loadClientData: (clientName: string) => void;
  setActiveTab: (tabId: string) => void;
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

const predefinedClients: Record<string, ClientData> = {
  "Paul and Sally Johnson": {
    name: "Paul and Sally Johnson",
    data: {
      primaryClient: "Paul Johnson",
      spouse: "Sally Johnson",
      age: "40",
      spouseAge: "38",
      retirementAge: "67",
      lifeExpectancy: "90",
      grossIncome: "$150,000",
      spouseIncome: "$80,000",
      otherIncome: "$15,000",
      annualExpenses: "$120,000",
      "401kBalance": "$350,000",
      iraBalance: "$150,000",
      taxableInvestments: "$75,000",
      cashSavings: "$50,000",
      housing: "$2,200",
      utilities: "$300",
      food: "$800",
      monthlyExpenses: "$1,500",
      homeValue: "$450,000",
      mortgageBalance: "$320,000",
      otherAssets: "$25,000",
      totalAssets: "$23,500",
      lifeInsurance: "$500,000",
      spouseLifeInsurance: "$300,000"
    }
  }
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<FormSection[]>(initialSections);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<string>("personal");

  const updateSectionCompletion = (sectionId: string, completed: boolean) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, completed } : section
      )
    );
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearAllData = () => {
    setFormData({});
    setSections(initialSections.map(section => ({ ...section, completed: false })));
  };

  const loadClientData = (clientName: string) => {
    const clientData = predefinedClients[clientName];
    if (clientData) {
      setFormData(clientData.data);
      // Auto-complete sections based on loaded data
      const requiredFields: Record<string, string[]> = {
        personal: ['primaryClient', 'age'],
        income: ['grossIncome', 'annualExpenses'],
        savings: ['401kBalance', 'cashSavings'],
        expenses: ['monthlyExpenses'],
        assets: ['homeValue', 'totalAssets'],
        insurance: ['lifeInsurance']
      };

      setSections(prev => 
        prev.map(section => {
          const required = requiredFields[section.id] || [];
          const completed = required.every(field => clientData.data[field] && clientData.data[field].toString().trim() !== '');
          return { ...section, completed };
        })
      );
    }
  };

  const getCompletionPercentage = () => {
    const completedSections = sections.filter(section => section.completed).length;
    return (completedSections / sections.length) * 100;
  };

  return (
    <FormContext.Provider value={{ 
      sections, 
      formData,
      activeTab,
      updateSectionCompletion, 
      getCompletionPercentage,
      updateFormData,
      clearAllData,
      loadClientData,
      setActiveTab
    }}>
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
