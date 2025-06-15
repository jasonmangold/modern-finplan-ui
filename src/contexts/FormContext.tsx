
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface FormSection {
  id: string;
  label: string;
  completed: boolean;
}

interface ClientData {
  name: string;
  data: Record<string, any>;
}

interface SharedInputs {
  // Personal data shared across goals
  client1Name: string;
  client1DateOfBirth: string;
  client1RetirementAge: string;
  client2Name: string;
  client2DateOfBirth: string;
  client2RetirementAge: string;
  isMarried: boolean;
  hasClient2: boolean;
  
  // Children data from Education Funding
  children: Array<{
    name: string;
    dateOfBirth: string;
  }>;
  
  // Education data
  schoolName: string;
  annualTuitionCost: string;
  ageWhenSchoolBegins: string;
  numberOfYearsInSchool: string;
  percentageToFund: string;
  amountCurrentlySaved: string;
  plannedMonthlySavings: string;
  
  // Income Sources shared data
  client1EmploymentIncome: string;
  client2EmploymentIncome: string;
  client1SocialSecurity: string;
  client2SocialSecurity: string;
  client1SSStartAge: string;
  client2SSStartAge: string;
  otherIncomeSources: Array<{
    name: string;
    type: string;
    owner: string;
    startAge: string;
    amount: string;
    frequency: string;
    valueType: string;
    payableFor: string;
    endAge: string;
    inflationRate: string;
    percentAvailableToSurvivors: string;
  }>;
  
  // Capital shared data
  client1RetirementBalance: string;
  client2RetirementBalance: string;
  client1MonthlyContributions: string;
  client2MonthlyContributions: string;
  client1CompanyMatch: string;
  client2CompanyMatch: string;
  client1AnnualIncrease: string;
  client2AnnualIncrease: string;
  client1ROR: string;
  client2ROR: string;
  
  // Assumptions shared data
  analysisDate: string;
  client1MortalityAge: string;
  client2MortalityAge: string;
  inflationRate: string;
  client1EmploymentInflationRate: string;
  client2EmploymentInflationRate: string;
  educationInflationRate: string;
  educationROR: string;
  ssBenefitInflationRate: string;
}

interface FormContextType {
  sections: FormSection[];
  formData: Record<string, any>;
  sharedInputs: SharedInputs;
  activeTab: string;
  updateSectionCompletion: (sectionId: string, completed: boolean) => void;
  getCompletionPercentage: () => number;
  updateFormData: (field: string, value: any) => void;
  updateSharedInput: (field: keyof SharedInputs, value: any) => void;
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

const initialSharedInputs: SharedInputs = {
  client1Name: '',
  client1DateOfBirth: '',
  client1RetirementAge: '67',
  client2Name: '',
  client2DateOfBirth: '',
  client2RetirementAge: '67',
  isMarried: false,
  hasClient2: false,
  children: [],
  schoolName: '',
  annualTuitionCost: '',
  ageWhenSchoolBegins: '18',
  numberOfYearsInSchool: '4',
  percentageToFund: '100',
  amountCurrentlySaved: '',
  plannedMonthlySavings: '',
  client1EmploymentIncome: '',
  client2EmploymentIncome: '',
  client1SocialSecurity: '',
  client2SocialSecurity: '',
  client1SSStartAge: '67',
  client2SSStartAge: '67',
  otherIncomeSources: [],
  client1RetirementBalance: '',
  client2RetirementBalance: '',
  client1MonthlyContributions: '',
  client2MonthlyContributions: '',
  client1CompanyMatch: '',
  client2CompanyMatch: '',
  client1AnnualIncrease: '',
  client2AnnualIncrease: '',
  client1ROR: '',
  client2ROR: '',
  analysisDate: new Date().toISOString().split('T')[0],
  client1MortalityAge: '90',
  client2MortalityAge: '90',
  inflationRate: '3.0%',
  client1EmploymentInflationRate: '3.0%',
  client2EmploymentInflationRate: '3.0%',
  educationInflationRate: '5.0%',
  educationROR: '7.0%',
  ssBenefitInflationRate: '2.5%'
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<FormSection[]>(initialSections);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [sharedInputs, setSharedInputs] = useState<SharedInputs>(initialSharedInputs);
  const [activeTab, setActiveTab] = useState<string>("personal");

  // Listen for clear form data event
  useEffect(() => {
    const handleClearFormData = () => {
      console.log('FormProvider: Clearing all form data');
      setFormData({});
      setSharedInputs(initialSharedInputs);
      setSections(initialSections.map(section => ({ ...section, completed: false })));
      setActiveTab("personal");
    };

    window.addEventListener('clearAllFormData', handleClearFormData);
    return () => {
      window.removeEventListener('clearAllFormData', handleClearFormData);
    };
  }, []);

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

  const updateSharedInput = (field: keyof SharedInputs, value: any) => {
    setSharedInputs(prev => ({ ...prev, [field]: value }));
  };

  const clearAllData = () => {
    setFormData({});
    setSharedInputs(initialSharedInputs);
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
      sharedInputs,
      activeTab,
      updateSectionCompletion, 
      getCompletionPercentage,
      updateFormData,
      updateSharedInput,
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

export default FormProvider;
