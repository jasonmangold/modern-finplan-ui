
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
  // Personal data shared across goals - using new naming convention
  Client1_FirstName: string;
  Client1_MiddleName: string;
  Client1_LastName: string;
  Client1_BirthDate: string;
  Client1_RetirementAge: string;
  Client1_SocialSecurityPaymentsStartAge: string;
  Client2_FirstName: string;
  Client2_MiddleName: string;
  Client2_LastName: string;
  Client2_BirthDate: string;
  Client2_RetirementAge: string;
  Client2_SocialSecurityPaymentsStartAge: string;
  ClientsAreMarried: boolean;
  hasClient2: boolean;
  
  // Additional personal info fields
  client1Age: number;
  client2Age: number;
  client1Gender: string;
  client2Gender: string;
  client1LifeExpectancy: number;
  client2LifeExpectancy: number;
  
  // Income fields
  paulEmploymentIncome: number;
  sallyEmploymentIncome: number;
  interestDividends: number;
  otherIncome: number;
  
  // Savings and Expenses
  educationSavings: number;
  retirementSavings: number;
  otherSavings: number;
  householdExpenses: number;
  taxes: number;
  
  // Retirement Assets
  paulRetirementAssets: number;
  sallyRetirementAssets: number;
  
  // Other Assets and Liabilities
  residenceValue: number;
  mortgage: number;
  assetDebt: number;
  
  // Children data from Education Funding
  children: Array<{
    name: string;
    dateOfBirth: string;
    schools: Array<{
      schoolName: string;
      annualTuitionCost: string;
      ageWhenSchoolBegins: string;
      numberOfYearsInSchool: string;
    }>;
    percentageToFund: string;
    amountCurrentlySaved: string;
    plannedMonthlySavings: string;
  }>;
  
  // Legacy education data (kept for compatibility)
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
  
  // Other Assets
  otherAssetsBalance: string;
  otherAssetsMonthlyContributions: string;
  otherAssetsROR: string;
  
  // Survivor needs specific fields
  delayRetirementFunds: boolean;
  cashAndOtherAssets: string;
  cash: string;
  otherAssets: string;
  client1LifeInsurance: string;
  client2LifeInsurance: string;
  mortgageBalance: string;
  otherDebt: string;
  
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
  incomeTaxRate: string;
  
  // Business Continuation fields
  businessOwnerName: string;
  yearsUntilRetirement: number;
  percentageCompanyOwned: number;
  currentLifeInsuranceBenefits: number;
  deathBenefitAnnualIncreaseRate: number;
  businessName: string;
  businessCurrentValue: number;
  businessGrowthRate: number;
  yearsToIllustrate: number;
  loanInterestRate: number;
  loanTermYears: number;
  loanPaymentFrequency: string;
  sinkingFundRateOfReturn: number;
  sinkingFundPaymentFrequency: string;
  lifeInsurancePremiumPer1000: number;
  yearsToPayPremiums: number;
  premiumAnnualIncreaseRate: number;
  lifeInsuranceDeathBenefitIncreaseRate: number;
  
  // Alternate Social Security ages
  client1AlternateAge1: string;
  client1AlternateAge2: string;
  client2AlternateAge1: string;
  client2AlternateAge2: string;
  
  // Critical Illness fields - Client 1
  client1CriticalIllnessNameAmount: string;
  client1CriticalIllnessIncomeReplacementAmount: string;
  client1CriticalIllnessIncomeReplacementMonths: string;
  client1CriticalIllnessClientsAmount: string;
  client1CriticalIllnessClientsMonths: string;
  client1CriticalIllnessDomesticHelpAmount: string;
  client1CriticalIllnessDomesticHelpMonths: string;
  client1CriticalIllnessChildcareAmount: string;
  client1CriticalIllnessChildcareMonths: string;
  client1CriticalIllnessHomeModificationsAmount: string;
  client1CriticalIllnessMedicalEquipmentAmount: string;
  client1CriticalIllnessOutOfPocketMedicalAmount: string;
  client1CriticalIllnessContinueRetirementSavingsClientAmount: string;
  client1CriticalIllnessContinueRetirementSavingsClientMonths: string;
  client1CriticalIllnessContinueRetirementSavingsOtherClientAmount: string;
  client1CriticalIllnessContinueRetirementSavingsOtherClientMonths: string;
  client1CriticalIllnessOtherAmount: string;
  client1CriticalIllnessOtherMonths: string;
  client1CriticalIllnessCurrentCriticalIllnessAmountAmount: string;
  
  // Critical Illness fields - Client 2
  client2CriticalIllnessNameAmount: string;
  client2CriticalIllnessIncomeReplacementAmount: string;
  client2CriticalIllnessIncomeReplacementMonths: string;
  client2CriticalIllnessClientsAmount: string;
  client2CriticalIllnessClientsMonths: string;
  client2CriticalIllnessDomesticHelpAmount: string;
  client2CriticalIllnessDomesticHelpMonths: string;
  client2CriticalIllnessChildcareAmount: string;
  client2CriticalIllnessChildcareMonths: string;
  client2CriticalIllnessHomeModificationsAmount: string;
  client2CriticalIllnessMedicalEquipmentAmount: string;
  client2CriticalIllnessOutOfPocketMedicalAmount: string;
  client2CriticalIllnessContinueRetirementSavingsClientAmount: string;
  client2CriticalIllnessContinueRetirementSavingsClientMonths: string;
  client2CriticalIllnessContinueRetirementSavingsOtherClientAmount: string;
  client2CriticalIllnessContinueRetirementSavingsOtherClientMonths: string;
  client2CriticalIllnessOtherAmount: string;
  client2CriticalIllnessOtherMonths: string;
  client2CriticalIllnessCurrentCriticalIllnessAmountAmount: string;
  
  // Long-Term Care fields
  ltcClient1MonthlyBenefit: string;
  ltcClient2MonthlyBenefit: string;
  ltcClient1BenefitCOLA: string;
  ltcClient2BenefitCOLA: string;
  ltcEstimatedMonthlyCost: string;
  ltcMarketValueAssets: string;
  ltcRateOfReturn: string;
  ltcAgeCareBeginsAge: string;
  ltcCareDurationYears: string;
  ltcInflationRate: string;
  
  // Estate Analysis fields
  estateClient1YearsUntilDeath: string;
  estateClient2YearsUntilDeath: string;
  estateClient1RetirementBalance: string;
  estateClient1RetirementRate: string;
  estateClient2RetirementBalance: string;
  estateClient2RetirementRate: string;
  estateOtherAssetsBalance: string;
  estateOtherAssetsJoint: string;
  estateOtherAssetsNonJoint: string;
  estateOtherAssetsOwnershipClient1: string;
  estateOtherAssetsOwnershipClient2: string;
  estateOtherAssetsRate: string;
  estateCashBalance: string;
  estateCashJoint: string;
  estateCashNonJoint: string;
  estateCashOwnershipClient1: string;
  estateCashOwnershipClient2: string;
  estateCashRate: string;
  estateResidenceBalance: string;
  estateResidenceJoint: string;
  estateResidenceNonJoint: string;
  estateResidenceOwnershipClient1: string;
  estateResidenceOwnershipClient2: string;
  estateResidenceRate: string;
  estateMortgageBalance: string;
  estateMortgageOwnershipClient1: string;
  estateMortgageOwnershipClient2: string;
  estateOtherDebtBalance: string;
  estateOtherDebtOwnershipClient1: string;
  estateOtherDebtOwnershipClient2: string;
  estateBequestsClient1Death: string;
  estateBequestsClient2Death: string;
  estateExclusionAmount: string;
  estateLifeInsClient1BenefitSurviving: string;
  estateLifeInsClient1BenefitOther: string;
  estateLifeInsClient2BenefitSurviving: string;
  estateLifeInsClient2BenefitOther: string;
  estateLifeInsNotOwnedClient1: string;
  estateLifeInsNotOwnedClient2: string;
  estateNewInsurancePremium: string;
  estateYearsToPayPremium: string;
  estateFinalExpenses: string;
  estateAssetGrowthRate: string;
  estateExclusionInflationRate: string;
  estateProbateFeeDollar: string;
  estateProbateFeePercent: string;
  estateAdminFeeDollar: string;
  estateAdminFeePercent: string;
  estateStateDeathTaxFirstDollar: string;
  estateStateDeathTaxFirstPercent: string;
  estateStateDeathTaxSecondDollar: string;
  estateStateDeathTaxSecondPercent: string;
  
  // Accumulation Funding fields
  accumulationGoals: Array<{
    name: string;
    yearsUntilStart: string;
    goalDurationYears: string;
    goalAmountTodaysDollars: string;
    inflateGoalAmount: string;
    amountCurrentlySaved: string;
    plannedMonthlySavings: string;
    rateOfReturn: string;
  }>;
  
  // Asset Allocation fields
  // Balance fields
  assetAllocRetirementPlansClient1Balance: string;
  assetAllocRetirementPlansClient2Balance: string;
  assetAllocCashBalance: string;
  assetAllocOtherAssetsBalance: string;
  
  // Large/Mid Cap allocations
  assetAllocLargeMidCapRetirementPlansClient1: string;
  assetAllocLargeMidCapRetirementPlansClient2: string;
  assetAllocLargeMidCapCash: string;
  assetAllocLargeMidCapOtherAssets: string;
  
  // Small Cap allocations
  assetAllocSmallCapRetirementPlansClient1: string;
  assetAllocSmallCapRetirementPlansClient2: string;
  assetAllocSmallCapCash: string;
  assetAllocSmallCapOtherAssets: string;
  
  // US Bonds allocations
  assetAllocUsBondsRetirementPlansClient1: string;
  assetAllocUsBondsRetirementPlansClient2: string;
  assetAllocUsBondsCash: string;
  assetAllocUsBondsOtherAssets: string;
  
  // Cash allocations
  assetAllocCashRetirementPlansClient1: string;
  assetAllocCashRetirementPlansClient2: string;
  assetAllocCashCash: string;
  assetAllocCashOtherAssets: string;
  
  // International Equity allocations
  assetAllocIntlEquityRetirementPlansClient1: string;
  assetAllocIntlEquityRetirementPlansClient2: string;
  assetAllocIntlEquityCash: string;
  assetAllocIntlEquityOtherAssets: string;
  
  // Risk Profile fields
  useRiskProfileByScore: boolean;
  alternateRiskProfile: string;
  
  // Risk Questionnaire fields
  riskQuestion1Answer: string;
  riskQuestion2Answer: string;
  riskQuestion3Answer: string;
  riskQuestion4Answer: string;
  riskQuestion5Answer: string;
  riskQuestion6Answer: string;
  riskQuestion7Answer: string;
  riskQuestion8Answer: string;
  riskQuestionnaireScore: string;
  
  // Charitable Remainder Trust fields
  crtDonorName: string;
  crtFirstIncomeBeneficiary: string;
  crtFirstBeneficiaryDOB: string;
  crtSecondIncomeBeneficiary: string;
  crtSecondBeneficiaryDOB: string;
  crtTransferDate: string;
  crtCharitableBeneficiary: string;
  crtAssetsTransferred: string;
  crtRateOfReturn: string;
  crtDurationOfPayments: string;
  crtTrustTerm: string;
  crtAnnualIncomeCRAT: string;
  crtAnnualIncomeCRUT: string;
  crtIRCSection7520Rate: string;
  crtLifeInsuranceAmount: string;
  crtFirstYearPremium: string;
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
  // Personal data using new naming convention
  Client1_FirstName: '',
  Client1_MiddleName: '',
  Client1_LastName: '',
  Client1_BirthDate: '',
  Client1_RetirementAge: '67',
  Client1_SocialSecurityPaymentsStartAge: '67',
  Client2_FirstName: '',
  Client2_MiddleName: '',
  Client2_LastName: '',
  Client2_BirthDate: '',
  Client2_RetirementAge: '67',
  Client2_SocialSecurityPaymentsStartAge: '67',
  ClientsAreMarried: false,
  hasClient2: false,
  
  // Additional personal info fields
  client1Age: 0,
  client2Age: 0,
  client1Gender: '',
  client2Gender: '',
  client1LifeExpectancy: 90,
  client2LifeExpectancy: 90,
  
  // Income fields
  paulEmploymentIncome: 0,
  sallyEmploymentIncome: 0,
  interestDividends: 0,
  otherIncome: 0,
  
  // Savings and Expenses
  educationSavings: 0,
  retirementSavings: 0,
  otherSavings: 0,
  householdExpenses: 0,
  taxes: 0,
  
  // Retirement Assets
  paulRetirementAssets: 0,
  sallyRetirementAssets: 0,
  
  // Other Assets and Liabilities
  residenceValue: 0,
  mortgage: 0,
  assetDebt: 0,
  
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
  otherAssetsBalance: '',
  otherAssetsMonthlyContributions: '',
  otherAssetsROR: '',
  delayRetirementFunds: false,
  cashAndOtherAssets: '',
  cash: '',
  otherAssets: '',
  client1LifeInsurance: '',
  client2LifeInsurance: '',
  mortgageBalance: '',
  otherDebt: '',
  analysisDate: new Date().toISOString().split('T')[0],
  
  // Business Continuation fields
  businessOwnerName: '',
  yearsUntilRetirement: 3,
  percentageCompanyOwned: 1,
  currentLifeInsuranceBenefits: 0,
  deathBenefitAnnualIncreaseRate: 0,
  businessName: '',
  businessCurrentValue: 0,
  businessGrowthRate: 0,
  yearsToIllustrate: 1,
  loanInterestRate: 0,
  loanTermYears: 5,
  loanPaymentFrequency: 'monthly',
  sinkingFundRateOfReturn: 0,
  sinkingFundPaymentFrequency: 'monthly',
  lifeInsurancePremiumPer1000: 0,
  yearsToPayPremiums: 0,
  premiumAnnualIncreaseRate: 0,
  lifeInsuranceDeathBenefitIncreaseRate: 0,
  
  client1MortalityAge: '90',
  client2MortalityAge: '90',
  inflationRate: '3.0%',
  client1EmploymentInflationRate: '3.0%',
  client2EmploymentInflationRate: '3.0%',
  educationInflationRate: '5.0%',
  educationROR: '7.0%',
  ssBenefitInflationRate: '2.5%',
  incomeTaxRate: '0',
  client1AlternateAge1: '',
  client1AlternateAge2: '',
  client2AlternateAge1: '',
  client2AlternateAge2: '',
  
  // Critical Illness fields - Client 1
  client1CriticalIllnessNameAmount: '',
  client1CriticalIllnessIncomeReplacementAmount: '',
  client1CriticalIllnessIncomeReplacementMonths: '',
  client1CriticalIllnessClientsAmount: '',
  client1CriticalIllnessClientsMonths: '',
  client1CriticalIllnessDomesticHelpAmount: '',
  client1CriticalIllnessDomesticHelpMonths: '',
  client1CriticalIllnessChildcareAmount: '',
  client1CriticalIllnessChildcareMonths: '',
  client1CriticalIllnessHomeModificationsAmount: '',
  client1CriticalIllnessMedicalEquipmentAmount: '',
  client1CriticalIllnessOutOfPocketMedicalAmount: '',
  client1CriticalIllnessContinueRetirementSavingsClientAmount: '',
  client1CriticalIllnessContinueRetirementSavingsClientMonths: '',
  client1CriticalIllnessContinueRetirementSavingsOtherClientAmount: '',
  client1CriticalIllnessContinueRetirementSavingsOtherClientMonths: '',
  client1CriticalIllnessOtherAmount: '',
  client1CriticalIllnessOtherMonths: '',
  client1CriticalIllnessCurrentCriticalIllnessAmountAmount: '',
  
  // Critical Illness fields - Client 2
  client2CriticalIllnessNameAmount: '',
  client2CriticalIllnessIncomeReplacementAmount: '',
  client2CriticalIllnessIncomeReplacementMonths: '',
  client2CriticalIllnessClientsAmount: '',
  client2CriticalIllnessClientsMonths: '',
  client2CriticalIllnessDomesticHelpAmount: '',
  client2CriticalIllnessDomesticHelpMonths: '',
  client2CriticalIllnessChildcareAmount: '',
  client2CriticalIllnessChildcareMonths: '',
  client2CriticalIllnessHomeModificationsAmount: '',
  client2CriticalIllnessMedicalEquipmentAmount: '',
  client2CriticalIllnessOutOfPocketMedicalAmount: '',
  client2CriticalIllnessContinueRetirementSavingsClientAmount: '',
  client2CriticalIllnessContinueRetirementSavingsClientMonths: '',
  client2CriticalIllnessContinueRetirementSavingsOtherClientAmount: '',
  client2CriticalIllnessContinueRetirementSavingsOtherClientMonths: '',
  client2CriticalIllnessOtherAmount: '',
  client2CriticalIllnessOtherMonths: '',
  client2CriticalIllnessCurrentCriticalIllnessAmountAmount: '',
  
  // Long-Term Care fields
  ltcClient1MonthlyBenefit: '',
  ltcClient2MonthlyBenefit: '',
  ltcClient1BenefitCOLA: '',
  ltcClient2BenefitCOLA: '',
  ltcEstimatedMonthlyCost: '',
  ltcMarketValueAssets: '',
  ltcRateOfReturn: '',
  ltcAgeCareBeginsAge: '',
  ltcCareDurationYears: '',
  ltcInflationRate: '',
  
  // Estate Analysis fields
  estateClient1YearsUntilDeath: '',
  estateClient2YearsUntilDeath: '',
  estateClient1RetirementBalance: '',
  estateClient1RetirementRate: '',
  estateClient2RetirementBalance: '',
  estateClient2RetirementRate: '',
  estateOtherAssetsBalance: '',
  estateOtherAssetsJoint: '',
  estateOtherAssetsNonJoint: '',
  estateOtherAssetsOwnershipClient1: '',
  estateOtherAssetsOwnershipClient2: '',
  estateOtherAssetsRate: '',
  estateCashBalance: '',
  estateCashJoint: '',
  estateCashNonJoint: '',
  estateCashOwnershipClient1: '',
  estateCashOwnershipClient2: '',
  estateCashRate: '',
  estateResidenceBalance: '',
  estateResidenceJoint: '',
  estateResidenceNonJoint: '',
  estateResidenceOwnershipClient1: '',
  estateResidenceOwnershipClient2: '',
  estateResidenceRate: '',
  estateMortgageBalance: '',
  estateMortgageOwnershipClient1: '',
  estateMortgageOwnershipClient2: '',
  estateOtherDebtBalance: '',
  estateOtherDebtOwnershipClient1: '',
  estateOtherDebtOwnershipClient2: '',
  estateBequestsClient1Death: '',
  estateBequestsClient2Death: '',
  estateExclusionAmount: '',
  estateLifeInsClient1BenefitSurviving: '',
  estateLifeInsClient1BenefitOther: '',
  estateLifeInsClient2BenefitSurviving: '',
  estateLifeInsClient2BenefitOther: '',
  estateLifeInsNotOwnedClient1: '',
  estateLifeInsNotOwnedClient2: '',
  estateNewInsurancePremium: '',
  estateYearsToPayPremium: '',
  estateFinalExpenses: '',
  estateAssetGrowthRate: '',
  estateExclusionInflationRate: '',
  estateProbateFeeDollar: '',
  estateProbateFeePercent: '',
  estateAdminFeeDollar: '',
  estateAdminFeePercent: '',
  estateStateDeathTaxFirstDollar: '',
  estateStateDeathTaxFirstPercent: '',
  estateStateDeathTaxSecondDollar: '',
  estateStateDeathTaxSecondPercent: '',
  
  // Accumulation Funding fields
  accumulationGoals: [{
    name: '',
    yearsUntilStart: '',
    goalDurationYears: '',
    goalAmountTodaysDollars: '',
    inflateGoalAmount: 'No',
    amountCurrentlySaved: '',
    plannedMonthlySavings: '',
    rateOfReturn: ''
  }],
  
  // Asset Allocation fields
  // Balance fields
  assetAllocRetirementPlansClient1Balance: '',
  assetAllocRetirementPlansClient2Balance: '',
  assetAllocCashBalance: '',
  assetAllocOtherAssetsBalance: '',
  
  // Large/Mid Cap allocations
  assetAllocLargeMidCapRetirementPlansClient1: '',
  assetAllocLargeMidCapRetirementPlansClient2: '',
  assetAllocLargeMidCapCash: '',
  assetAllocLargeMidCapOtherAssets: '',
  
  // Small Cap allocations
  assetAllocSmallCapRetirementPlansClient1: '',
  assetAllocSmallCapRetirementPlansClient2: '',
  assetAllocSmallCapCash: '',
  assetAllocSmallCapOtherAssets: '',
  
  // US Bonds allocations
  assetAllocUsBondsRetirementPlansClient1: '',
  assetAllocUsBondsRetirementPlansClient2: '',
  assetAllocUsBondsCash: '',
  assetAllocUsBondsOtherAssets: '',
  
  // Cash allocations
  assetAllocCashRetirementPlansClient1: '',
  assetAllocCashRetirementPlansClient2: '',
  assetAllocCashCash: '',
  assetAllocCashOtherAssets: '',
  
  // International Equity allocations
  assetAllocIntlEquityRetirementPlansClient1: '',
  assetAllocIntlEquityRetirementPlansClient2: '',
  assetAllocIntlEquityCash: '',
  assetAllocIntlEquityOtherAssets: '',
  
  // Risk Profile fields
  useRiskProfileByScore: false,
  alternateRiskProfile: '',
  
  // Risk Questionnaire fields
  riskQuestion1Answer: '',
  riskQuestion2Answer: '',
  riskQuestion3Answer: '',
  riskQuestion4Answer: '',
  riskQuestion5Answer: '',
  riskQuestion6Answer: '',
  riskQuestion7Answer: '',
  riskQuestion8Answer: '',
  riskQuestionnaireScore: '',
  
  // Charitable Remainder Trust fields
  crtDonorName: '',
  crtFirstIncomeBeneficiary: '',
  crtFirstBeneficiaryDOB: '',
  crtSecondIncomeBeneficiary: '',
  crtSecondBeneficiaryDOB: '',
  crtTransferDate: '',
  crtCharitableBeneficiary: '',
  crtAssetsTransferred: '',
  crtRateOfReturn: '',
  crtDurationOfPayments: '',
  crtTrustTerm: '',
  crtAnnualIncomeCRAT: '',
  crtAnnualIncomeCRUT: '',
  crtIRCSection7520Rate: '',
  crtLifeInsuranceAmount: '',
  crtFirstYearPremium: ''
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
