import { useState, useEffect, useMemo } from 'react';
import { useEducationData } from './useEducationData';
import { SearchResult } from '@/contexts/SearchContext';

// Calculator folders data structure (extracted from Calculators.tsx)
const calculatorFolders = {
  borrowing: {
    name: "Borrowing",
    calculators: [
      { id: "bor-1", name: "Bi-Weekly Mortgage", description: "Calculate bi-weekly mortgage payments" },
      { id: "bor-2", name: "Impact of Making Additional Principal Payments", description: "Analyze extra payment benefits" },
      { id: "bor-3", name: "Loan Comparison", description: "Compare different loan options" },
      { id: "bor-4", name: "Payments To Pay Off A Loan", description: "Calculate required payments" },
      { id: "bor-5", name: "Years To Pay Off Debt", description: "Time to pay off debt" },
      { id: "bor-6", name: "Weighted Average Interest Rate", description: "Calculate weighted average rates" },
      { id: "bor-7", name: "Consolidating Loans", description: "Loan consolidation analysis" },
      { id: "bor-8", name: "Interest Only Loan", description: "Interest-only payment calculator" }
    ]
  },
  discussion: {
    name: "Discussion Tools",
    calculators: [
      { id: "dis-1", name: "Risk Tolerance Quiz", description: "Assess investment risk tolerance" },
      { id: "dis-2", name: "Investment Style Questionnaire", description: "Determine investment approach" },
      { id: "dis-3", name: "Financial Goals Worksheet", description: "Plan financial objectives" },
      { id: "dis-4", name: "Budget Analyzer", description: "Analyze spending patterns" },
      { id: "dis-5", name: "Debt Management Tool", description: "Manage debt obligations" }
    ]
  },
  educationFunding: {
    name: "Education Funding",
    calculators: [
      { id: "edu-1", name: "College Funding Calculator", description: "Plan for college expenses" },
      { id: "edu-2", name: "Education Loan Calculator", description: "Calculate education loans" },
      { id: "edu-3", name: "529 Plan Calculator", description: "529 savings plan analysis" },
      { id: "edu-4", name: "Prepaid Tuition Plan", description: "Prepaid tuition analysis" },
      { id: "edu-5", name: "Education Tax Credits", description: "Tax credit calculations" }
    ]
  },
  estatePlanning: {
    name: "Estate Planning",
    calculators: [
      { id: "est-1", name: "Estate Tax Calculator", description: "Calculate estate taxes" },
      { id: "est-2", name: "Trust Fund Calculator", description: "Trust fund analysis" },
      { id: "est-3", name: "Life Insurance Needs", description: "Determine insurance needs" },
      { id: "est-4", name: "Charitable Giving Calculator", description: "Charitable giving analysis" },
      { id: "est-5", name: "Generation Skipping Tax", description: "GST tax calculations" }
    ]
  },
  investments: {
    name: "Investments",
    calculators: [
      { id: "inv-1", name: "Asset Allocation Calculator", description: "Optimize asset allocation" },
      { id: "inv-2", name: "Investment Return Calculator", description: "Calculate investment returns" },
      { id: "inv-3", name: "Dollar Cost Averaging", description: "DCA strategy analysis" },
      { id: "inv-4", name: "Bond Yield Calculator", description: "Bond yield calculations" },
      { id: "inv-5", name: "Stock Valuation Model", description: "Stock valuation analysis" },
      { id: "inv-6", name: "Portfolio Rebalancing", description: "Portfolio rebalancing tool" }
    ]
  },
  personalFinance: {
    name: "Personal Finance",
    calculators: [
      { id: "pf-1", name: "Net Worth Calculator", description: "Calculate net worth" },
      { id: "pf-2", name: "Emergency Fund Calculator", description: "Plan emergency savings" },
      { id: "pf-3", name: "Savings Goal Calculator", description: "Plan savings goals" },
      { id: "pf-4", name: "Cash Flow Analyzer", description: "Analyze cash flow" },
      { id: "pf-5", name: "Debt-to-Income Ratio", description: "Calculate DTI ratio" }
    ]
  },
  retirementPlanning: {
    name: "Retirement Planning",
    calculators: [
      { id: "ret-1", name: "Retirement Planning Calculator", description: "Comprehensive retirement planning" },
      { id: "ret-2", name: "401(k) Calculator", description: "401(k) contribution analysis" },
      { id: "ret-3", name: "IRA Calculator", description: "IRA contribution planning" },
      { id: "ret-4", name: "Social Security Optimizer", description: "Optimize Social Security benefits" },
      { id: "ret-5", name: "Pension Calculator", description: "Pension benefit analysis" },
      { id: "ret-6", name: "Length of Time a Sum Will Last", description: "Retirement fund longevity" },
      { id: "ret-7", name: "Required Minimum Distribution", description: "RMD calculations" }
    ]
  },
  insurance: {
    name: "Insurance",
    calculators: [
      { id: "ins-1", name: "Life Insurance Calculator", description: "Life insurance needs analysis" },
      { id: "ins-2", name: "Disability Insurance Calculator", description: "Disability coverage needs" },
      { id: "ins-3", name: "Long-Term Care Calculator", description: "LTC insurance planning" },
      { id: "ins-4", name: "Health Insurance Cost Calculator", description: "Health insurance costs" },
      { id: "ins-5", name: "Umbrella Insurance Calculator", description: "Umbrella coverage needs" }
    ]
  },
  taxes: {
    name: "Tax Planning",
    calculators: [
      { id: "tax-1", name: "Tax Bracket Calculator", description: "Calculate tax brackets" },
      { id: "tax-2", name: "Tax-Deferred vs Taxable", description: "Compare investment accounts" },
      { id: "tax-3", name: "Roth IRA Conversion", description: "Roth conversion analysis" },
      { id: "tax-4", name: "Capital Gains Calculator", description: "Capital gains tax calculations" },
      { id: "tax-5", name: "AMT Calculator", description: "Alternative minimum tax" }
    ]
  },
  business: {
    name: "Business Planning",
    calculators: [
      { id: "bus-1", name: "Business Loan Calculator", description: "Business loan analysis" },
      { id: "bus-2", name: "Business Valuation Calculator", description: "Business valuation model" },
      { id: "bus-3", name: "Cash Flow Projection", description: "Business cash flow planning" },
      { id: "bus-4", name: "Break-Even Analysis", description: "Break-even calculations" },
      { id: "bus-5", name: "Equipment Financing", description: "Equipment loan analysis" }
    ]
  }
};

// Goal configs data (extracted from GoalDetailView.tsx) 
const goalConfigs = {
  college: {
    title: "College Planning",
    icon: "GraduationCap",
    color: "text-blue-600",
    description: "Plan for higher education expenses",
    reports: ["Funding Strategy", "529 Plan Analysis", "Tax Benefits", "Timeline Projections"]
  },
  retirement: {
    title: "Retirement Planning", 
    icon: "PiggyBank",
    color: "text-green-600",
    description: "Project retirement for clients who aren't at or near retirement age yet",
    reports: ["Accumulation Analysis", "Withdrawal Strategy", "Social Security Optimization", "Tax Planning"]
  },
  "retirement-accumulation": {
    title: "Retirement Accumulation",
    icon: "PiggyBank", 
    color: "text-green-600",
    description: "Project retirement for clients who aren't at or near retirement age yet",
    reports: ["Retirement Analysis", "Retirement Social Security Optimizer", "Capital Available for Retirement", "Achieving Your Retirement Goals", "Alternatives to Achieving Retirement Goals", "Retirement Timeline", "Retirement Analysis Detail", "Progress Toward Retirement Goals", "Retirement Needs Analysis Data- Fact Finder"]
  },
  home: {
    title: "Home Purchase",
    icon: "Home",
    color: "text-orange-600", 
    description: "Plan for home purchase and financing",
    reports: ["Affordability Analysis", "Down Payment Strategy", "Mortgage Comparison", "Timeline Planning"]
  },
  "debt-payoff": {
    title: "Debt Payoff",
    icon: "Car",
    color: "text-red-600",
    description: "Create debt elimination strategies", 
    reports: ["Payoff Strategy", "Consolidation Options", "Interest Savings", "Cash Flow Impact"]
  },
  "education-funding": {
    title: "Education Funding",
    icon: "GraduationCap",
    color: "text-purple-600",
    description: "Plan for education expenses and funding strategies",
    reports: ["Education Funding Summary", "Education Funding Analysis - Child 1", "Education Funding Timeline - Child 1", "Education Funding Analysis - Child 2", "Education Funding Timeline - Child 2", "Education Funding Analysis - Child 3", "Education Funding Timeline - Child 3", "Education Funding Analysis - Child 4", "Education Funding Timeline - Child 4", "Education Funding Analysis - Child 5", "Education Funding Timeline - Child 5", "Progress Toward Education Goals", "Education Funding Analysis Data - Fact Finder"]
  },
  "survivor-needs": {
    title: "Survivor Needs Analysis", 
    icon: "Shield",
    color: "text-red-600",
    description: "Analyze insurance needs for survivors",
    reports: ["Survivor Needs - Client 1 dies", "Survivor's Immediate Needs - Client 1 dies", "Survivor Needs Timeline - Client 1 dies", "Survivor Analysis Detail - Client 1 dies", "Survivor Needs - Client 2 dies", "Survivor's Immediate Needs - Client 2 dies", "Survivor Needs Timeline - Client 2 dies", "Survivor Analysis Detail - Client 2 dies", "Survivor Needs Analysis Data - Fact Finder"]
  },
  "retirement-distribution": {
    title: "Retirement Distribution",
    icon: "PiggyBank",
    color: "text-green-600", 
    description: "Plan withdrawal strategies and income replacement during retirement years",
    reports: ["You and Your Retirement", "Essential Needs and Secure Income", "Essential Needs and Secure Income Timeline", "Essential Needs (Capital use)", "Essential Needs Timeline (Capital Use)", "Essential Needs and Secure Income With a new annuity", "Essential Needs and Secure Income Timeline (With annuity)", "Essential Needs (Capital Use with new annuity)", "Essential Needs Timeline (Capital Use with new annuity)", "Essential Needs and Secure Income Needs", "Essential Needs Timeline (Capital LTC)", "Total Needs Spending", "Retirement Timeline", "Retirement Distribution Analysis Data - Fact Finder"]
  },
  "asset-allocation": {
    title: "Asset Allocation",
    icon: "PieChart", 
    color: "text-indigo-600",
    description: "Analyze and optimize portfolio asset allocation",
    reports: ["Current Allocation for Assets", "Recommended Allocation for Assets", "Asset Allocation Comparison", "Risk Tolerance Analysis", "Risk Tolerance Questionnaire", "Asset Allocation Data - Fact Finder"]
  }
};

export const useGlobalSearch = () => {
  const { data: educationData } = useEducationData();

  // Aggregate all searchable content
  const allSearchableContent = useMemo(() => {
    const results: SearchResult[] = [];

    // Add calculators
    Object.entries(calculatorFolders).forEach(([folderKey, folder]) => {
      folder.calculators.forEach(calculator => {
        results.push({
          id: `calc-${calculator.id}`,
          title: calculator.name,
          description: calculator.description,
          category: 'calculator',
          route: '/calculators',
          state: { 
            calculatorName: calculator.name,
            fromSearch: true,
            openCalculator: true 
          },
          icon: 'Calculator'
        });
      });
    });

    // Add analysis reports
    Object.entries(goalConfigs).forEach(([goalKey, goal]) => {
      goal.reports.forEach(report => {
        results.push({
          id: `analysis-${goalKey}-${report.toLowerCase().replace(/\s+/g, '-')}`,
          title: report,
          description: `${goal.title} - ${goal.description}`,
          category: 'analysis',
          route: '/analysis',
          state: {
            goalId: goalKey,
            reportName: report,
            fromSearch: true
          },
          icon: goal.icon
        });
      });
    });

    // Add education materials
    if (educationData) {
      educationData.forEach(item => {
        results.push({
          id: `edu-${item.id}`,
          title: item.DocumentTitle,
          description: `${item.Folder}${item.Subfolder ? ` / ${item.Subfolder}` : ''}${item.FormNumber ? ` (${item.FormNumber})` : ''}`,
          category: 'education',
          route: '/education',
          state: {
            documentId: item.id,
            fromSearch: true
          },
          icon: 'BookOpen'
        });
      });
    }

    return results;
  }, [educationData]);

  // Search function with fuzzy matching
  const performSearch = (searchTerm: string): SearchResult[] => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase().trim();
    
    return allSearchableContent
      .map(item => {
        const titleScore = calculateMatchScore(item.title.toLowerCase(), term);
        const descriptionScore = item.description 
          ? calculateMatchScore(item.description.toLowerCase(), term) * 0.7
          : 0;
        
        const totalScore = Math.max(titleScore, descriptionScore);
        
        return { ...item, score: totalScore };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20); // Limit results
  };

  // Simple fuzzy matching score calculation
  const calculateMatchScore = (text: string, searchTerm: string): number => {
    // Exact match gets highest score
    if (text === searchTerm) return 100;
    
    // Check if text starts with search term
    if (text.startsWith(searchTerm)) return 90;
    
    // Check if text contains search term
    if (text.includes(searchTerm)) return 80;
    
    // Check individual words
    const searchWords = searchTerm.split(' ');
    const textWords = text.split(' ');
    
    let wordMatches = 0;
    let partialMatches = 0;
    
    searchWords.forEach(searchWord => {
      if (searchWord.length < 2) return;
      
      textWords.forEach(textWord => {
        if (textWord === searchWord) {
          wordMatches++;
        } else if (textWord.includes(searchWord) || searchWord.includes(textWord)) {
          partialMatches++;
        }
      });
    });
    
    if (wordMatches > 0) return 60 + (wordMatches * 10);
    if (partialMatches > 0) return 30 + (partialMatches * 5);
    
    return 0;
  };

  return {
    performSearch,
    allSearchableContent
  };
};