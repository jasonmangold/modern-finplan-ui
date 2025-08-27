
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { usePresentationContext } from "@/contexts/PresentationContext";
import { Checkbox } from "@/components/ui/checkbox";

// Mock calculator data organized by folders - moved outside component to prevent recreation
const calculatorFolders = {
    borrowing: {
      name: "Borrowing",
      calculators: [
        { id: "bor-1", name: "Bi-Weekly Mortgage", description: "Calculate bi-weekly mortgage payments" },
        { id: "bor-2", name: "Impact of Making Additional Principal Payments", description: "Analyze extra payment benefits" },
        { id: "bor-3", name: "Loan Amortization Schedule", description: "Generate loan payment schedule" },
        { id: "bor-4", name: "Mortgage Refinance Comparisons", description: "Compare refinancing options" },
        { id: "bor-5", name: "Payments To Pay Off A Loan", description: "Calculate payment amounts needed" },
        { id: "bor-6", name: "Rate of Interest for a Loan", description: "Calculate loan interest rates" },
        { id: "bor-7", name: "Weighted Average Interest Rate", description: "Calculate weighted average rates" }
      ]
    },
    discussion: {
      name: "Discussion Organization",
      calculators: [
        { id: "disc-1", name: "Action Items", description: "Organize and track action items" },
        { id: "disc-2", name: "Agenda", description: "Create meeting agendas" },
        { id: "disc-3", name: "Goals", description: "Set and track goals" },
        { id: "disc-4", name: "Recommendations", description: "Document recommendations" }
      ]
    },
    educationFunding: {
      name: "Education Funding",
      calculators: [
        { id: "edu-1", name: "529 Plan Rollover to Roth IRA", description: "Analyze 529 to Roth IRA rollover" },
        { id: "edu-2", name: "529 Plan Savings Calculator", description: "Education savings calculator" },
        { id: "edu-3", name: "Projected Costs of Education", description: "Future education cost projections" }
      ]
    },
    estatePlanning: {
      name: "Estate Planning",
      calculators: [
        { id: "est-1", name: "Effect of Life Insurance Transfers on Federal Estate Tax", description: "Life insurance estate tax impact" },
        { id: "est-2", name: "Family Limited Partnership - Grantor Trust", description: "FLP grantor trust analysis" },
        { id: "est-3", name: "Federal Estate Tax Approximator", description: "Estimate federal estate tax" },
        { id: "est-4", name: "Federal Taxes on Income in Respect of a Decedent", description: "Decedent income tax calculator" },
        { id: "est-5", name: "Grantor-Retained Annuity Trust (GRAT)", description: "GRAT analysis calculator" },
        { id: "est-6", name: "Grantor-Retained Income Trust - Graph", description: "GRIT with graphical analysis" },
        { id: "est-7", name: "Grantor-Retained Interest Trust (GRIT)", description: "GRIT analysis calculator" },
        { id: "est-8", name: "Grantor-Retained Interest Trust - Graph", description: "GRIT with graph visualization" },
        { id: "est-9", name: "Grantor-Retained Unitrust (GRUT)", description: "GRUT analysis calculator" },
        { id: "est-10", name: "Grantor-Retained Unitrust - Graph", description: "GRUT with graphical analysis" },
        { id: "est-11", name: "Qualified Personal Residence Trust", description: "QPRT analysis calculator" },
        { id: "est-12", name: "Qualified Personal Residence Trust - Graph", description: "QPRT with graph visualization" },
        { id: "est-13", name: "The Federal Gift Tax", description: "Federal gift tax calculator" }
      ]
    },
    healthMedical: {
      name: "Health and Medical",
      calculators: [
        { id: "health-1", name: "Disability Break-Even", description: "Disability insurance break-even analysis" },
        { id: "health-2", name: "Long-Term Care Break-Even", description: "Long-term care insurance analysis" }
      ]
    },
    incomeTaxes: {
      name: "Income Taxes",
      calculators: [
        { id: "tax-1", name: "Federal Income Tax Approximator", description: "Estimate federal income tax" },
        { id: "tax-2", name: "Tax Exempt vs. Taxable Income", description: "Compare tax-exempt vs taxable income" },
        { id: "tax-3", name: "Traditional Portion of Social Security Benefits", description: "Social Security taxation calculator" }
      ]
    },
    investments: {
      name: "Investments",
      calculators: [
        { id: "inv-1", name: "Dollar Cost Averaging Calculator", description: "DCA investment strategy analysis" },
        { id: "inv-2", name: "Effect of Not Rebalancing Assets", description: "Portfolio rebalancing impact" },
        { id: "inv-3", name: "Internal Rate of Return", description: "Calculate IRR for investments" },
        { id: "inv-4", name: "Impact of Fees", description: "Fee impact on investment returns" },
        { id: "inv-5", name: "Impact of Fees Timeline", description: "Fee impact over time visualization" },
        { id: "inv-6", name: "Impact of Inflation on Savings Growth", description: "Inflation effect on savings" },
        { id: "inv-7", name: "Impact of the Rate of Return", description: "Return rate impact analysis" },
        { id: "inv-8", name: "Market Timing", description: "Market timing strategy analysis" },
        { id: "inv-9", name: "Monte Carlo Simulator", description: "Monte Carlo investment simulation" },
        { id: "inv-10", name: "Present Value of a Future Sum", description: "Present value calculator" },
        { id: "inv-11", name: "Rate of Return on a Single Amount", description: "Single investment return rate" },
        { id: "inv-12", name: "The Real Rate of Return", description: "Inflation-adjusted returns" },
        { id: "inv-13", name: "Value over Time", description: "Investment value progression" },
        { id: "inv-14", name: "Weighted Average Rate of Return", description: "Portfolio weighted return" }
      ]
    },
    lifeInsurance: {
      name: "Life Insurance",
      calculators: [
        { id: "life-1", name: "Debt, Income, Mortgage and Education Analysis (DIME)", description: "DIME method life insurance calculation" },
        { id: "life-2", name: "How Much Life Insurance?", description: "Life insurance needs calculator" },
        { id: "life-3", name: "How Much Life Insurance? - Graph", description: "Life insurance needs with graph" },
        { id: "life-4", name: "Human Life Value", description: "Calculate human life value" },
        { id: "life-5", name: "Length of Time a Sum Will Last", description: "Insurance payout duration" },
        { id: "life-6", name: "Lifetime Earnings", description: "Calculate lifetime earning potential" }
      ]
    },
    personalFinance: {
      name: "Personal Finance",
      calculators: [
        { id: "pf-1", name: "Accumulating One Million Dollars", description: "Path to millionaire status" },
        { id: "pf-2", name: "Amounts Needed to Accumulate a Future Sum", description: "Required savings for future goals" },
        { id: "pf-3", name: "Cost of Procrastination", description: "Delayed savings impact" },
        { id: "pf-4", name: "Effect of Inflation", description: "Inflation impact calculator" },
        { id: "pf-5", name: "Future Value of a Single Sum", description: "Single investment future value" },
        { id: "pf-6", name: "Future Value of a Single Sum and Periodic Additions", description: "Combined investment growth" },
        { id: "pf-7", name: "Future Value of Periodic Additions", description: "Regular savings growth" },
        { id: "pf-8", name: "Inflation and Purchasing Power", description: "Purchasing power over time" },
        { id: "pf-9", name: "Lifetime Earnings", description: "Calculate lifetime earning potential" },
        { id: "pf-10", name: "Pay Debt or Invest?", description: "Debt vs investment decision" },
        { id: "pf-11", name: "Pay Yourself First", description: "Automatic savings strategy" },
        { id: "pf-12", name: "Personal Cash Flow Statement", description: "Cash flow analysis" },
        { id: "pf-13", name: "Personal Net Worth Statement", description: "Net worth calculator" },
        { id: "pf-14", name: "Present Value of Future Annuity Payments", description: "Annuity present value" },
        { id: "pf-15", name: "Rate of Inflation", description: "Inflation rate calculator" },
        { id: "pf-16", name: "Rule of 72", description: "Doubling time calculator" },
        { id: "pf-17", name: "Weighted Average Interest Rate", description: "Portfolio interest rates" },
        { id: "pf-18", name: "Weighted Average Rate of Return", description: "Portfolio return rates" }
      ]
    },
    retirementPlanning: {
      name: "Retirement Planning",
      calculators: [
        { id: "ret-1", name: "Annuity Maximization - Graph", description: "Annuity optimization with graph" },
        { id: "ret-2", name: "Annuity Maximization - Timeline", description: "Annuity optimization timeline" },
        { id: "ret-3", name: "Begin Now Or Wait?", description: "Retirement savings timing" },
        { id: "ret-4", name: "Comparing IRAs", description: "IRA comparison analysis" },
        { id: "ret-5", name: "Does It Matter When You Contribute to an IRA?", description: "IRA contribution timing" },
        { id: "ret-6", name: "Employer Sponsored Plans", description: "Employer retirement plan analysis" },
        { id: "ret-7", name: "Employer Sponsored Safe Harbor Plans", description: "Safe harbor plan analysis" },
        { id: "ret-8", name: "Impact of Qualified Plan Contributions on a Paycheck", description: "Paycheck impact analysis" },
        { id: "ret-9", name: "Impact of Tax Deferred Growth in an IRA", description: "Tax-deferred growth benefits" },
        { id: "ret-10", name: "IRA Eligibility", description: "IRA eligibility calculator" },
        { id: "ret-0", name: "Length of Time a Sum Will Last", description: "Calculate how long your savings will last with withdrawals" },
        { id: "ret-11", name: "Market Timing", description: "Retirement market timing analysis" },
        { id: "ret-12", name: "Monte Carlo Simulator", description: "Retirement Monte Carlo simulation" },
        { id: "ret-13", name: "Qualified Plan Distribution Planner", description: "Distribution planning tool" },
        { id: "ret-14", name: "Rate of Withdrawal in Retirement", description: "Sustainable withdrawal rates" },
        { id: "ret-15", name: "Required Minimum Distributions During Life", description: "RMD calculation during life" },
        { id: "ret-16", name: "Qualified Plan Distribution Maximization", description: "Optimize distribution strategy" },
        { id: "ret-17", name: "Qualified Plan Distribution Maximization Timeline", description: "Distribution timeline optimization" },
        { id: "ret-18", name: "Roth IRA Conversion", description: "Roth conversion analysis" },
        { id: "ret-19", name: "Substantially Equal Periodic Payments - 72(t)", description: "72(t) payment calculator" },
        { id: "ret-20", name: "Tax-deductible Portion of Your Traditional IRA Contribution", description: "IRA deduction calculator" },
        { id: "ret-21", name: "Tax-Deferred Growth in an IRA - Traditional IRA", description: "Traditional IRA growth analysis" },
        { id: "ret-22", name: "When Will Your Nest Egg Run Out?", description: "Retirement fund depletion calculator" },
        { id: "ret-23", name: "Social Security Break-Even", description: "Social Security claiming break-even" },
        { id: "ret-24", name: "Social Security Optimizer", description: "Optimize Social Security strategy" },
        { id: "ret-25", name: "Taxable Portion of Social Security Benefits", description: "Social Security tax calculator" }
      ]
    }
  };

const Calculators = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCalculator, setSelectedCalculator] = useState<any>(null);
  const [activeFolder, setActiveFolder] = useState("borrowing");
  const { toast } = useToast();
  
  // Presentation context
  const {
    addPresentationItem,
    removePresentationItem,
    presentationItems
  } = usePresentationContext();

  // Calculate which calculators are currently selected for presentation
  const selectedForPresentation = presentationItems.filter(item => item.source === "Calculators").map(item => item.name);

  // Handle navigation from presentation page
  useEffect(() => {
    if (location.state) {
      const { goalId, reportView, reportName, fromPresentation } = location.state as any;
      
      if (fromPresentation && reportName) {
        // Map specific reports to calculators
        const calculatorMappings: Record<string, any> = {
          "Social Security Optimizer": { 
            folder: "retirementPlanning", 
            calculator: calculatorFolders.retirementPlanning.calculators.find(calc => calc.name === "Social Security Optimizer")
          },
          "Retirement Timeline": { 
            folder: "retirementPlanning", 
            calculator: calculatorFolders.retirementPlanning.calculators.find(calc => calc.name === "Length of Time a Sum Will Last")
          }
        };
        
        const mapping = calculatorMappings[reportName];
        if (mapping && mapping.calculator) {
          setActiveFolder(mapping.folder);
          setSelectedCalculator(mapping.calculator);
        }
      }
    }
  }, [location.state]);

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('calculator-favorites') || '[]');
  });

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
      calc.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (selectedCalculator) {
      const isCurrentlySelected = selectedForPresentation.includes(selectedCalculator.name);
      if (isCurrentlySelected) {
        // Remove from presentation
        const existingItem = presentationItems.find(item => item.name === selectedCalculator.name);
        if (existingItem) {
          removePresentationItem(existingItem.id);
          toast({
            title: "Removed from Presentation",
            description: `${selectedCalculator.name} has been removed from your presentation.`,
          });
        }
      } else {
        // Add to presentation
        const newItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: selectedCalculator.name,
          source: "Calculators" as const
        };
        addPresentationItem(newItem);
        toast({
          title: "Added to Presentation",
          description: `${selectedCalculator.name} has been added to your presentation.`,
        });
      }
    }
  };

  const handlePresentationToggle = (calculator: any) => {
    const isCurrentlySelected = selectedForPresentation.includes(calculator.name);
    if (isCurrentlySelected) {
      // Remove from presentation
      const existingItem = presentationItems.find(item => item.name === calculator.name);
      if (existingItem) {
        removePresentationItem(existingItem.id);
        toast({
          title: "Removed from Presentation",
          description: `${calculator.name} has been removed from your presentation.`,
        });
      }
    } else {
      // Add to presentation
      const newItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: calculator.name,
        source: "Calculators" as const
      };
      addPresentationItem(newItem);
      toast({
        title: "Added to Presentation",
        description: `${calculator.name} has been added to your presentation.`,
      });
    }
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
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(selectedCalculator.id)}
                className={favorites.includes(selectedCalculator.id) ? "text-yellow-500" : "text-gray-400"}
              >
                <Star className={`h-4 w-4 ${favorites.includes(selectedCalculator.id) ? "fill-current" : ""}`} />
              </Button>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedForPresentation.includes(selectedCalculator.name)}
                  onCheckedChange={() => handlePresentationToggle(selectedCalculator)}
                />
                <span className="text-sm text-gray-600">Add to presentation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-screen calculator content */}
        <div className="flex-1 p-6">
          {selectedCalculator.id === "ret-0" ? (
            <LengthOfTimeCalculator />
          ) : (
            <div className="grid gap-6 h-full" style={{ gridTemplateColumns: "40% 60%" }}>
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
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="outline" onClick={handleSavePDF}>
                      <Download className="h-4 w-4 mr-2" />
                      Save PDF
                    </Button>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedForPresentation.includes(selectedCalculator.name)}
                        onCheckedChange={() => handlePresentationToggle(selectedCalculator)}
                      />
                      <span className="text-sm text-gray-600">Add to presentation</span>
                    </div>
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
    <div className="h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b bg-background">
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
        <div className="flex-1 flex flex-col">
          {/* Fixed section header */}
          <div className="flex-shrink-0 px-6 pt-6 pb-4">
            <h2 className="text-lg font-semibold">{calculatorFolders[activeFolder as keyof typeof calculatorFolders].name}</h2>
            <p className="text-sm text-gray-600">
              {getFilteredCalculators(calculatorFolders[activeFolder as keyof typeof calculatorFolders].calculators).length} calculators
            </p>
          </div>
          
          {/* Scrollable calculator grid */}
          <div className="flex-1 overflow-auto px-6 pb-6">
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
                       <div className="flex items-center gap-2">
                         <Checkbox
                           checked={selectedForPresentation.includes(calculator.name)}
                           onCheckedChange={() => handlePresentationToggle(calculator)}
                           onClick={(e) => e.stopPropagation()}
                         />
                         <span className="text-xs text-gray-600">Add to presentation</span>
                       </div>
                       <CalculatorIcon className="h-4 w-4 text-gray-400" />
                     </div>
                   </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
