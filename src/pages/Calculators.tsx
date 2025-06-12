
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  FileText, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  Heart, 
  PiggyBank, 
  Building, 
  Users,
  Save,
  Presentation,
  Download,
  Clock,
  Search
} from "lucide-react";

const calculatorFolders = [
  {
    id: "borrowing",
    name: "Borrowing",
    icon: DollarSign,
    color: "bg-red-100 text-red-600",
    calculators: [
      { id: "loan-payment", name: "Loan Payment Calculator", description: "Calculate monthly loan payments" },
      { id: "mortgage", name: "Mortgage Calculator", description: "Home loan calculations" },
      { id: "refinance", name: "Refinance Calculator", description: "Compare refinancing options" },
      { id: "auto-loan", name: "Auto Loan Calculator", description: "Vehicle financing calculations" },
      { id: "debt-consolidation", name: "Debt Consolidation", description: "Combine multiple debts" },
      { id: "home-equity", name: "Home Equity Calculator", description: "Calculate available equity" },
      { id: "apr", name: "APR Calculator", description: "Compare loan costs" },
      { id: "interest-only", name: "Interest-Only Loan", description: "Interest-only payment calculations" }
    ]
  },
  {
    id: "discussion",
    name: "Discussion Organization",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    calculators: [
      { id: "goal-priority", name: "Goal Priority Matrix", description: "Prioritize financial goals" },
      { id: "budget-planner", name: "Budget Planner", description: "Organize monthly budget" },
      { id: "cash-flow", name: "Cash Flow Analysis", description: "Track income and expenses" },
      { id: "financial-fitness", name: "Financial Fitness Score", description: "Assess financial health" },
      { id: "debt-snowball", name: "Debt Snowball", description: "Debt payoff strategy" },
      { id: "emergency-fund", name: "Emergency Fund Calculator", description: "Determine fund size needed" },
      { id: "expense-tracker", name: "Expense Tracker", description: "Monitor spending patterns" },
      { id: "savings-rate", name: "Savings Rate Calculator", description: "Calculate optimal savings" }
    ]
  },
  {
    id: "education",
    name: "Education Funding",
    icon: GraduationCap,
    color: "bg-green-100 text-green-600",
    calculators: [
      { id: "529-plan", name: "529 Plan Calculator", description: "Education savings projections" },
      { id: "college-cost", name: "College Cost Projector", description: "Future education costs" },
      { id: "student-loan", name: "Student Loan Calculator", description: "Education loan payments" },
      { id: "coverdell", name: "Coverdell ESA", description: "Education savings account" },
      { id: "ugma-utma", name: "UGMA/UTMA Calculator", description: "Custodial account planning" },
      { id: "education-ira", name: "Education IRA", description: "Educational IRA benefits" },
      { id: "scholarship", name: "Scholarship Calculator", description: "Financial aid planning" },
      { id: "work-study", name: "Work-Study Calculator", description: "Student employment benefits" }
    ]
  },
  {
    id: "estate",
    name: "Estate Planning",
    icon: Building,
    color: "bg-purple-100 text-purple-600",
    calculators: [
      { id: "estate-tax", name: "Estate Tax Calculator", description: "Tax liability estimation" },
      { id: "trust-calculator", name: "Trust Calculator", description: "Trust fund projections" },
      { id: "generation-skip", name: "Generation-Skipping Tax", description: "GST tax calculations" },
      { id: "gift-tax", name: "Gift Tax Calculator", description: "Annual gift tax limits" },
      { id: "charitable-giving", name: "Charitable Giving", description: "Tax benefits of donations" },
      { id: "life-insurance-need", name: "Life Insurance Need", description: "Coverage requirements" },
      { id: "probate-cost", name: "Probate Cost Estimator", description: "Estate settlement costs" },
      { id: "inheritance-tax", name: "Inheritance Tax", description: "State inheritance taxes" }
    ]
  },
  {
    id: "health",
    name: "Health & Medical",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
    calculators: [
      { id: "hsa", name: "HSA Calculator", description: "Health savings account benefits" },
      { id: "healthcare-cost", name: "Healthcare Cost Projector", description: "Medical expense planning" },
      { id: "ltc-insurance", name: "Long-Term Care Insurance", description: "LTC coverage needs" },
      { id: "medicare-cost", name: "Medicare Cost Calculator", description: "Medicare expense planning" },
      { id: "cobra", name: "COBRA Calculator", description: "Continuation coverage costs" },
      { id: "fsa", name: "FSA Calculator", description: "Flexible spending account" },
      { id: "medical-deduction", name: "Medical Deduction", description: "Tax deductible expenses" },
      { id: "disability-insurance", name: "Disability Insurance", description: "Income protection needs" }
    ]
  },
  {
    id: "taxes",
    name: "Income Taxes",
    icon: FileText,
    color: "bg-yellow-100 text-yellow-600",
    calculators: [
      { id: "tax-bracket", name: "Tax Bracket Calculator", description: "Federal and state tax rates" },
      { id: "itemized-deduction", name: "Itemized Deductions", description: "Compare deduction options" },
      { id: "capital-gains", name: "Capital Gains Tax", description: "Investment tax calculations" },
      { id: "estimated-tax", name: "Estimated Tax Calculator", description: "Quarterly tax payments" },
      { id: "tax-withholding", name: "Tax Withholding", description: "Payroll tax calculations" },
      { id: "retirement-tax", name: "Retirement Tax Planning", description: "Tax-efficient withdrawals" },
      { id: "roth-conversion", name: "Roth Conversion", description: "IRA conversion analysis" },
      { id: "tax-loss-harvest", name: "Tax Loss Harvesting", description: "Offset capital gains" }
    ]
  },
  {
    id: "investments",
    name: "Investments",
    icon: TrendingUp,
    color: "bg-indigo-100 text-indigo-600",
    calculators: [
      { id: "future-value", name: "Future Value Calculator", description: "Investment growth projections" },
      { id: "compound-interest", name: "Compound Interest", description: "Power of compounding" },
      { id: "portfolio-allocation", name: "Portfolio Allocation", description: "Asset allocation strategy" },
      { id: "risk-tolerance", name: "Risk Tolerance Assessment", description: "Investment risk profile" },
      { id: "dollar-cost-avg", name: "Dollar Cost Averaging", description: "Systematic investing benefits" },
      { id: "investment-return", name: "Investment Return", description: "Performance calculations" },
      { id: "annuity", name: "Annuity Calculator", description: "Annuity payment projections" },
      { id: "bond-yield", name: "Bond Yield Calculator", description: "Fixed income returns" }
    ]
  },
  {
    id: "insurance",
    name: "Life Insurance & Analysis",
    icon: Heart,
    color: "bg-orange-100 text-orange-600",
    calculators: [
      { id: "life-insurance", name: "Life Insurance Calculator", description: "Coverage needs analysis" },
      { id: "term-vs-whole", name: "Term vs Whole Life", description: "Insurance type comparison" },
      { id: "insurance-need", name: "Insurance Need Analysis", description: "Total coverage requirements" },
      { id: "premium-comparison", name: "Premium Comparison", description: "Compare insurance costs" },
      { id: "cash-value", name: "Cash Value Growth", description: "Whole life projections" },
      { id: "beneficiary", name: "Beneficiary Calculator", description: "Payout distributions" },
      { id: "mortgage-protection", name: "Mortgage Protection", description: "Mortgage life insurance" },
      { id: "business-insurance", name: "Business Insurance", description: "Key person coverage" }
    ]
  },
  {
    id: "personal",
    name: "Personal Finance",
    icon: PiggyBank,
    color: "bg-teal-100 text-teal-600",
    calculators: [
      { id: "net-worth", name: "Net Worth Calculator", description: "Assets minus liabilities" },
      { id: "budget-calculator", name: "Budget Calculator", description: "Monthly budget planning" },
      { id: "savings-goal", name: "Savings Goal Calculator", description: "Reach financial targets" },
      { id: "debt-payoff", name: "Debt Payoff Calculator", description: "Eliminate debt faster" },
      { id: "credit-card", name: "Credit Card Payoff", description: "Minimum payment analysis" },
      { id: "rent-vs-buy", name: "Rent vs Buy", description: "Housing decision analysis" },
      { id: "car-affordability", name: "Car Affordability", description: "Vehicle purchase planning" },
      { id: "financial-goals", name: "Financial Goals Tracker", description: "Track progress to goals" }
    ]
  },
  {
    id: "retirement",
    name: "Retirement Planning",
    icon: Calculator,
    color: "bg-gray-100 text-gray-600",
    calculators: [
      { id: "retirement-savings", name: "Retirement Savings", description: "401k and IRA projections" },
      { id: "withdrawal-rate", name: "Safe Withdrawal Rate", description: "Sustainable retirement income" },
      { id: "social-security", name: "Social Security Calculator", description: "Benefit estimations" },
      { id: "pension", name: "Pension Calculator", description: "Defined benefit projections" },
      { id: "401k-match", name: "401k Match Calculator", description: "Employer contribution benefits" },
      { id: "catch-up", name: "Catch-up Contributions", description: "Age 50+ contribution limits" },
      { id: "retirement-income", name: "Retirement Income", description: "Multiple income sources" },
      { id: "early-retirement", name: "Early Retirement", description: "FIRE movement calculations" }
    ]
  }
];

const Calculators = () => {
  const [activeFolder, setActiveFolder] = useState("borrowing");
  const [selectedCalculator, setSelectedCalculator] = useState("future-value");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentCalculators, setRecentCalculators] = useState<string[]>([]);
  
  // Calculator inputs
  const [initialInvestment, setInitialInvestment] = useState("");
  const [periodicContribution, setPeriodicContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [futureValue, setFutureValue] = useState(0);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('calculator-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedRecent = localStorage.getItem('recent-calculators');
    if (savedRecent) {
      setRecentCalculators(JSON.parse(savedRecent));
    }
  }, []);

  const toggleFavorite = (calculatorId: string) => {
    const newFavorites = favorites.includes(calculatorId)
      ? favorites.filter(id => id !== calculatorId)
      : [...favorites, calculatorId];
    
    setFavorites(newFavorites);
    localStorage.setItem('calculator-favorites', JSON.stringify(newFavorites));
    
    // Also save to home page favorites
    const homePageFavorites = JSON.parse(localStorage.getItem('home-favorite-reports') || '[]');
    if (!favorites.includes(calculatorId)) {
      const calculator = calculatorFolders
        .flatMap(folder => folder.calculators)
        .find(calc => calc.id === calculatorId);
      if (calculator) {
        homePageFavorites.push({
          name: calculator.name,
          type: "Calculator"
        });
        localStorage.setItem('home-favorite-reports', JSON.stringify(homePageFavorites));
      }
    } else {
      const filteredFavorites = homePageFavorites.filter((fav: any) => {
        const calculator = calculatorFolders
          .flatMap(folder => folder.calculators)
          .find(calc => calc.id === calculatorId);
        return fav.name !== calculator?.name;
      });
      localStorage.setItem('home-favorite-reports', JSON.stringify(filteredFavorites));
    }
  };

  const selectCalculator = (calculatorId: string) => {
    setSelectedCalculator(calculatorId);
    
    // Add to recent calculators
    const newRecent = [calculatorId, ...recentCalculators.filter(id => id !== calculatorId)].slice(0, 5);
    setRecentCalculators(newRecent);
    localStorage.setItem('recent-calculators', JSON.stringify(newRecent));
  };

  const calculateFutureValue = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const periodic = parseFloat(periodicContribution) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const years = parseFloat(timePeriod) || 0;

    const compoundedInitial = initial * Math.pow(1 + rate, years);
    const compoundedAnnuity = periodic * (Math.pow(1 + rate, years) - 1) / rate;
    const total = compoundedInitial + compoundedAnnuity;
    
    setFutureValue(total);
  };

  const saveToPDF = () => {
    // Placeholder for PDF functionality
    console.log("Saving to PDF...");
  };

  const addToPresentation = () => {
    // Placeholder for presentation functionality
    console.log("Adding to presentation...");
  };

  const filteredFolders = calculatorFolders.map(folder => ({
    ...folder,
    calculators: folder.calculators.filter(calc =>
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(folder => folder.calculators.length > 0);

  const currentCalculator = calculatorFolders
    .flatMap(folder => folder.calculators)
    .find(calc => calc.id === selectedCalculator);

  return (
    <div className="p-6 space-y-6">
      {/* Header with Search */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Calculators</h1>
          <p className="text-gray-600">Choose from 80+ calculators across 10 categories</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search calculators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Access */}
      {(favorites.length > 0 || recentCalculators.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Favorite Calculators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {favorites.slice(0, 3).map(favId => {
                    const calc = calculatorFolders
                      .flatMap(folder => folder.calculators)
                      .find(c => c.id === favId);
                    return calc ? (
                      <Button
                        key={favId}
                        variant="outline"
                        size="sm"
                        onClick={() => selectCalculator(favId)}
                        className="text-xs"
                      >
                        {calc.name}
                      </Button>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {recentCalculators.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Recently Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recentCalculators.slice(0, 3).map(recentId => {
                    const calc = calculatorFolders
                      .flatMap(folder => folder.calculators)
                      .find(c => c.id === recentId);
                    return calc ? (
                      <Button
                        key={recentId}
                        variant="outline"
                        size="sm"
                        onClick={() => selectCalculator(recentId)}
                        className="text-xs"
                      >
                        {calc.name}
                      </Button>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Calculator Folders */}
      <Tabs value={activeFolder} onValueChange={setActiveFolder}>
        <TabsList className="w-full">
          {filteredFolders.map(folder => {
            const IconComponent = folder.icon;
            return (
              <TabsTrigger key={folder.id} value={folder.id} className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" />
                {folder.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {folder.calculators.length}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {filteredFolders.map(folder => (
          <TabsContent key={folder.id} value={folder.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {folder.calculators.map(calculator => (
                <Card
                  key={calculator.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCalculator === calculator.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => selectCalculator(calculator.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-2 rounded-lg ${folder.color} mb-2`}>
                        <Calculator className="h-4 w-4" />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(calculator.id);
                        }}
                        className="p-1 h-auto"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            favorites.includes(calculator.id)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-400'
                          }`}
                        />
                      </Button>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{calculator.name}</h3>
                    <p className="text-xs text-gray-600">{calculator.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Calculator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {currentCalculator?.name || "Future Value Calculator"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="initial">Initial Investment ($)</Label>
              <Input
                id="initial"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="periodic">Periodic Contribution ($)</Label>
              <Input
                id="periodic"
                type="number"
                value={periodicContribution}
                onChange={(e) => setPeriodicContribution(e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="frequency">Contribution Frequency</Label>
              <Select defaultValue="annually">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="time">Time Period (Years)</Label>
              <Input
                id="time"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="compounding">Compounding Frequency</Label>
              <Select defaultValue="annually">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Outputs */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Outputs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">Future Value</h3>
              
              {futureValue > 0 ? (
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    ${futureValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Please enter valid inputs to calculate the future value.</p>
                </div>
              )}

              <div className="space-y-2">
                <Button 
                  onClick={calculateFutureValue}
                  className="w-full bg-blue-600 text-white"
                >
                  Calculate
                </Button>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={saveToPDF}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-3 w-3" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addToPresentation}
                    className="flex items-center gap-1"
                  >
                    <Presentation className="h-3 w-3" />
                    Present
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculators;
