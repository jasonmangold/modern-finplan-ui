
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Star, 
  Download, 
  Plus,
  ArrowLeft,
  Calculator as CalculatorIcon,
  Folder
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LengthOfTimeCalculator } from "@/components/calculators/LengthOfTimeCalculator";

const Calculators = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCalculator, setSelectedCalculator] = useState<any>(null);
  const [activeFolder, setActiveFolder] = useState("borrowing");
  const { toast } = useToast();

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('calculator-favorites') || '[]');
  });

  // Mock calculator data organized by folders
  const calculatorFolders = {
    borrowing: {
      name: "Borrowing",
      calculators: [
        { id: "bor-1", name: "Bi-Weekly Mortgage", description: "Calculate bi-weekly mortgage payments", category: "Mortgage" },
        { id: "bor-2", name: "Impact of Making Additional Principal Payments", description: "Analyze extra payment benefits", category: "Mortgage" },
        { id: "bor-3", name: "Loan Amortization Schedule", description: "Generate loan payment schedule", category: "Loan" },
        { id: "bor-4", name: "Mortgage Refinance Comparisons", description: "Compare refinancing options", category: "Mortgage" },
        { id: "bor-5", name: "Payments To Pay Off A Loan", description: "Calculate payment amounts needed", category: "Loan" },
        { id: "bor-6", name: "Rate of Interest for a Loan", description: "Calculate loan interest rates", category: "Loan" },
        { id: "bor-7", name: "Weighted Average Interest Rate", description: "Calculate weighted average rates", category: "Rate" }
      ]
    },
    discussion: {
      name: "Discussion Organization",
      calculators: [
        { id: "disc-1", name: "Action Items", description: "Organize and track action items", category: "Organization" },
        { id: "disc-2", name: "Agenda", description: "Create meeting agendas", category: "Planning" },
        { id: "disc-3", name: "Goals", description: "Set and track goals", category: "Planning" },
        { id: "disc-4", name: "Recommendations", description: "Document recommendations", category: "Planning" }
      ]
    },
    educationFunding: {
      name: "Education Funding",
      calculators: [
        { id: "edu-1", name: "529 Plan Rollover to Roth IRA", description: "Analyze 529 to Roth IRA rollover", category: "Savings" },
        { id: "edu-2", name: "529 Plan Savings Calculator", description: "Education savings calculator", category: "Savings" },
        { id: "edu-3", name: "Projected Costs of Education", description: "Future education cost projections", category: "Planning" }
      ]
    },
    estatePlanning: {
      name: "Estate Planning",
      calculators: [
        { id: "est-1", name: "Effect of Life Insurance Transfers on Federal Estate Tax", description: "Life insurance estate tax impact", category: "Tax" },
        { id: "est-2", name: "Family Limited Partnership - Grantor Trust", description: "FLP grantor trust analysis", category: "Trust" },
        { id: "est-3", name: "Federal Estate Tax Approximator", description: "Estimate federal estate tax", category: "Tax" },
        { id: "est-4", name: "Federal Taxes on Income in Respect of a Decedent", description: "Decedent income tax calculator", category: "Tax" },
        { id: "est-5", name: "Grantor-Retained Annuity Trust (GRAT)", description: "GRAT analysis calculator", category: "Trust" },
        { id: "est-6", name: "Grantor-Retained Income Trust - Graph", description: "GRIT with graphical analysis", category: "Trust" },
        { id: "est-7", name: "Grantor-Retained Interest Trust (GRIT)", description: "GRIT analysis calculator", category: "Trust" },
        { id: "est-8", name: "Grantor-Retained Interest Trust - Graph", description: "GRIT with graph visualization", category: "Trust" },
        { id: "est-9", name: "Grantor-Retained Unitrust (GRUT)", description: "GRUT analysis calculator", category: "Trust" },
        { id: "est-10", name: "Grantor-Retained Unitrust - Graph", description: "GRUT with graphical analysis", category: "Trust" },
        { id: "est-11", name: "Qualified Personal Residence Trust", description: "QPRT analysis calculator", category: "Trust" },
        { id: "est-12", name: "Qualified Personal Residence Trust - Graph", description: "QPRT with graph visualization", category: "Trust" },
        { id: "est-13", name: "The Federal Gift Tax", description: "Federal gift tax calculator", category: "Tax" }
      ]
    },
    healthMedical: {
      name: "Health and Medical",
      calculators: [
        { id: "health-1", name: "Disability Break-Even", description: "Disability insurance break-even analysis", category: "Insurance" },
        { id: "health-2", name: "Long-Term Care Break-Even", description: "Long-term care insurance analysis", category: "Insurance" }
      ]
    },
    incomeTaxes: {
      name: "Income Taxes",
      calculators: [
        { id: "tax-1", name: "Federal Income Tax Approximator", description: "Estimate federal income tax", category: "Tax" },
        { id: "tax-2", name: "Tax Exempt vs. Taxable Income", description: "Compare tax-exempt vs taxable income", category: "Tax" },
        { id: "tax-3", name: "Traditional Portion of Social Security Benefits", description: "Social Security taxation calculator", category: "Tax" }
      ]
    },
    investments: {
      name: "Investments",
      calculators: [
        { id: "inv-1", name: "Portfolio Analyzer", description: "Analyze investment portfolio", category: "Analysis" },
        { id: "inv-2", name: "Asset Allocation", description: "Optimize asset allocation", category: "Planning" },
        { id: "inv-3", name: "Dollar Cost Averaging", description: "DCA vs lump sum", category: "Strategy" },
        { id: "inv-4", name: "Compound Interest", description: "Power of compounding", category: "Growth" },
        { id: "inv-5", name: "Risk Calculator", description: "Investment risk assessment", category: "Analysis" },
        { id: "inv-6", name: "Rebalancing Tool", description: "Portfolio rebalancing", category: "Management" },
        { id: "inv-7", name: "Tax-Loss Harvesting", description: "Optimize tax efficiency", category: "Tax" },
        { id: "inv-8", name: "Bond Calculator", description: "Bond yield and duration", category: "Fixed Income" }
      ]
    },
    lifeInsurance: {
      name: "Life Insurance",
      calculators: [
        { id: "life-1", name: "Life Insurance Needs", description: "Calculate coverage needed", category: "Needs" },
        { id: "life-2", name: "Term vs Whole Life", description: "Life insurance comparison", category: "Comparison" },
        { id: "life-3", name: "Life Insurance Calculator", description: "General life insurance calculator", category: "General" }
      ]
    },
    personalFinance: {
      name: "Personal Finance",
      calculators: [
        { id: "pf-1", name: "Budget Calculator", description: "Monthly budget planner", category: "Planning" },
        { id: "pf-2", name: "Emergency Fund", description: "Emergency savings calculator", category: "Savings" },
        { id: "pf-3", name: "Cash Flow Analysis", description: "Income vs expenses", category: "Analysis" },
        { id: "pf-4", name: "Savings Goal", description: "Savings target calculator", category: "Goals" },
        { id: "pf-5", name: "Net Worth Calculator", description: "Assets minus liabilities", category: "Net Worth" },
        { id: "pf-6", name: "Debt-to-Income", description: "DTI ratio calculator", category: "Analysis" },
        { id: "pf-7", name: "Inflation Calculator", description: "Purchasing power over time", category: "Inflation" },
        { id: "pf-8", name: "Financial Ratios", description: "Personal finance ratios", category: "Analysis" }
      ]
    },
    retirementPlanning: {
      name: "Retirement Planning",
      calculators: [
        { id: "ret-0", name: "Length of Time a Sum Will Last", description: "Calculate how long your savings will last with withdrawals", category: "Distribution" },
        { id: "ret-1", name: "401(k) Calculator", description: "Calculate retirement savings growth", category: "Accumulation" },
        { id: "ret-2", name: "IRA Calculator", description: "Traditional vs Roth IRA comparison", category: "Accumulation" },
        { id: "ret-3", name: "Social Security Optimizer", description: "Optimize claiming strategies", category: "Income" },
        { id: "ret-4", name: "Retirement Timeline", description: "Plan your retirement journey", category: "Planning" },
        { id: "ret-5", name: "Withdrawal Strategy", description: "Sustainable withdrawal rates", category: "Distribution" },
        { id: "ret-6", name: "Pension Calculator", description: "Analyze pension benefits", category: "Income" },
        { id: "ret-7", name: "Early Retirement", description: "FIRE movement calculator", category: "Planning" },
        { id: "ret-8", name: "Required Minimum Distribution", description: "Calculate RMDs", category: "Distribution" }
      ]
    }
  };

  // Get sorted calculators for current folder (favorites first)
  const getSortedCalculators = (calculators: any[]) => {
    return [...calculators].sort((a, b) => {
      const aIsFavorite = favorites.includes(a.id);
      const bIsFavorite = favorites.includes(b.id);
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return 0;
    });
  };

  // Filter calculators based on search
  const getFilteredCalculators = (calculators: any[]) => {
    const sorted = getSortedCalculators(calculators);
    if (!searchTerm) return sorted;
    
    return sorted.filter(calc =>
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleFavorite = (calculatorId: string) => {
    const newFavorites = favorites.includes(calculatorId)
      ? favorites.filter(id => id !== calculatorId)
      : [...favorites, calculatorId];
    
    setFavorites(newFavorites);
    localStorage.setItem('calculator-favorites', JSON.stringify(newFavorites));
    
    // Update home page favorites
    const homePageFavorites = JSON.parse(localStorage.getItem('home-favorite-reports') || '[]');
    const calculator = Object.values(calculatorFolders)
      .flatMap(folder => folder.calculators)
      .find(calc => calc.id === calculatorId);
    
    if (calculator) {
      if (newFavorites.includes(calculatorId)) {
        const newReport = { name: calculator.name, type: "Calculator" };
        if (!homePageFavorites.some((report: any) => report.name === calculator.name)) {
          homePageFavorites.push(newReport);
          localStorage.setItem('home-favorite-reports', JSON.stringify(homePageFavorites));
        }
        toast({
          title: "Added to Favorites",
          description: `${calculator.name} has been added to your favorites.`,
        });
      } else {
        const filteredFavorites = homePageFavorites.filter((report: any) => report.name !== calculator.name);
        localStorage.setItem('home-favorite-reports', JSON.stringify(filteredFavorites));
        toast({
          title: "Removed from Favorites",
          description: `${calculator.name} has been removed from your favorites.`,
        });
      }
    }
  };

  const handleCalculatorClick = (calculator: any) => {
    setSelectedCalculator(calculator);
  };

  const handleBackToList = () => {
    setSelectedCalculator(null);
  };

  const handleSavePDF = () => {
    toast({
      title: "PDF Saved",
      description: "Calculator results have been saved as PDF.",
    });
  };

  const handleAddToPresentation = () => {
    toast({
      title: "Added to Presentation",
      description: "Calculator results have been added to your presentation.",
    });
  };

  // Full-screen calculator view
  if (selectedCalculator) {
    return (
      <div className="h-full flex flex-col">
        {/* Header with back button */}
        <div className="flex items-center gap-4 p-6 border-b bg-background">
          <Button
            variant="ghost"
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Calculators
          </Button>
          <div className="flex items-center gap-3">
            <CalculatorIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold">{selectedCalculator.name}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(selectedCalculator.id)}
              className={favorites.includes(selectedCalculator.id) ? "text-yellow-500" : "text-gray-400"}
            >
              <Star className={`h-4 w-4 ${favorites.includes(selectedCalculator.id) ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Full-screen calculator content */}
        <div className="flex-1 p-6">
          {selectedCalculator.id === "ret-0" ? (
            <LengthOfTimeCalculator />
          ) : (
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Input Panel */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Calculator Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-8 bg-gray-50 rounded-lg text-center">
                    <CalculatorIcon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold mb-2">{selectedCalculator.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedCalculator.description}</p>
                    <p className="text-sm text-gray-500">Calculator inputs would appear here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Output Panel */}
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Results & Analysis</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleSavePDF}>
                      <Download className="h-4 w-4 mr-2" />
                      Save PDF
                    </Button>
                    <Button size="sm" onClick={handleAddToPresentation}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Presentation
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-8 bg-blue-50 rounded-lg text-center">
                    <div className="h-32 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-blue-600 text-sm">Chart/Graph Area</span>
                    </div>
                    <p className="text-sm text-gray-600">Calculator results and visualizations would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main calculator list view with sidebar layout
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-background">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Financial Calculators</h1>
          <div className="relative w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search calculators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Main content with sidebar layout */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Folder Navigation */}
        <div className="w-72 border-r bg-gray-50/50 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 px-3">Calculator Categories</h3>
          <div className="space-y-1">
            {Object.entries(calculatorFolders).map(([key, folder]) => {
              const calculatorCount = folder.calculators.length;
              const isActive = activeFolder === key;
              
              return (
                <button
                  key={key}
                  onClick={() => setActiveFolder(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-100 text-blue-900 border border-blue-200" 
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Folder className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{folder.name}</div>
                    <div className="text-xs text-gray-500">{calculatorCount} calculators</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content - Calculator Grid */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{calculatorFolders[activeFolder as keyof typeof calculatorFolders].name}</h2>
            <p className="text-sm text-gray-600">
              {getFilteredCalculators(calculatorFolders[activeFolder as keyof typeof calculatorFolders].calculators).length} calculators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredCalculators(calculatorFolders[activeFolder as keyof typeof calculatorFolders].calculators).map((calculator) => (
              <Card 
                key={calculator.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                onClick={() => handleCalculatorClick(calculator)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold mb-1 flex items-center gap-2">
                        {favorites.includes(calculator.id) && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        {calculator.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{calculator.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(calculator.id);
                      }}
                      className={favorites.includes(calculator.id) ? "text-yellow-500" : "text-gray-400"}
                    >
                      <Star className={`h-4 w-4 ${favorites.includes(calculator.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {calculator.category}
                    </span>
                    <CalculatorIcon className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
