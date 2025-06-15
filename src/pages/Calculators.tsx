
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calculator, Star, FileText, TrendingUp } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";

const Calculators = () => {
  const { globalSearchTerm } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["ira-calculator", "social-security"]));

  const toggleFavorite = (calculatorId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(calculatorId)) {
      newFavorites.delete(calculatorId);
    } else {
      newFavorites.add(calculatorId);
    }
    setFavorites(newFavorites);
  };

  const calculatorCategories = [
    {
      id: "retirement",
      title: "Retirement Planning",
      count: 8,
      calculators: [
        {
          id: "ira-calculator",
          title: "IRA Calculator",
          description: "Traditional vs Roth IRA comparison",
          category: "Accumulation",
          icon: TrendingUp
        },
        {
          id: "social-security",
          title: "Social Security Optimizer",
          description: "Optimize claiming strategies",
          category: "Income",
          icon: Calculator
        },
        {
          id: "401k-calculator",
          title: "401(k) Calculator",
          description: "Calculate retirement savings growth",
          category: "Accumulation",
          icon: TrendingUp
        },
        {
          id: "retirement-timeline",
          title: "Retirement Timeline",
          description: "Plan your retirement journey",
          category: "Planning",
          icon: FileText
        },
        {
          id: "withdrawal-strategy",
          title: "Withdrawal Strategy",
          description: "Sustainable withdrawal rates",
          category: "Distribution",
          icon: Calculator
        },
        {
          id: "pension-calculator",
          title: "Pension Calculator",
          description: "Analyze pension benefits",
          category: "Income",
          icon: TrendingUp
        },
        {
          id: "early-retirement",
          title: "Early Retirement",
          description: "FIRE movement calculator",
          category: "Planning",
          icon: FileText
        },
        {
          id: "rmd-calculator",
          title: "Required Minimum Distribution",
          description: "Calculate RMDs",
          category: "Distribution",
          icon: Calculator
        }
      ]
    },
    {
      id: "investment",
      title: "Investment Analysis",
      count: 8,
      calculators: [
        {
          id: "portfolio-analyzer",
          title: "Portfolio Analyzer",
          description: "Analyze portfolio performance",
          category: "Analysis",
          icon: TrendingUp
        }
      ]
    },
    {
      id: "tax",
      title: "Tax Planning",
      count: 8,
      calculators: [
        {
          id: "tax-estimator",
          title: "Tax Estimator",
          description: "Estimate tax liability",
          category: "Planning",
          icon: Calculator
        }
      ]
    },
    {
      id: "insurance",
      title: "Insurance Planning",
      count: 8,
      calculators: [
        {
          id: "life-insurance",
          title: "Life Insurance Calculator",
          description: "Determine coverage needs",
          category: "Protection",
          icon: FileText
        }
      ]
    },
    {
      id: "mortgage",
      title: "Mortgage & Real Estate",
      count: 8,
      calculators: [
        {
          id: "mortgage-calculator",
          title: "Mortgage Calculator",
          description: "Calculate mortgage payments",
          category: "Real Estate",
          icon: Calculator
        }
      ]
    },
    {
      id: "education",
      title: "Education Planning",
      count: 8,
      calculators: [
        {
          id: "college-savings",
          title: "College Savings Calculator",
          description: "Plan for education costs",
          category: "Education",
          icon: TrendingUp
        }
      ]
    },
    {
      id: "debt",
      title: "Debt Management",
      count: 8,
      calculators: [
        {
          id: "debt-payoff",
          title: "Debt Payoff Calculator",
          description: "Optimize debt repayment",
          category: "Debt",
          icon: Calculator
        }
      ]
    },
    {
      id: "budgeting",
      title: "Budgeting & Cash Flow",
      count: 8,
      calculators: [
        {
          id: "budget-planner",
          title: "Budget Planner",
          description: "Create and track budgets",
          category: "Budgeting",
          icon: FileText
        }
      ]
    }
  ];

  const searchTerm = globalSearchTerm || localSearchTerm;

  const filteredCategories = calculatorCategories.map(category => ({
    ...category,
    calculators: category.calculators.filter(calc => 
      calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.calculators.length > 0 || 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    searchTerm === ""
  );

  const getCategoryBadgeColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      "Accumulation": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      "Income": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
      "Planning": "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
      "Distribution": "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
      "Analysis": "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200",
      "Protection": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
      "Real Estate": "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200",
      "Education": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
      "Debt": "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200",
      "Budgeting": "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200"
    };
    return colors[categoryName] || "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Financial Calculators</h1>
            <p className="text-gray-600 dark:text-gray-400">Powerful tools for financial analysis and planning</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search calculators..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Sidebar */}
          <div className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Calculator Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {calculatorCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">{category.title}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {category.count} calculators
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Calculator Grid */}
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{category.title}</h2>
                  <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                    {category.calculators.length} calculators
                  </Badge>
                </div>
                <div className="grid gap-4">
                  {category.calculators.map((calculator) => {
                    const IconComponent = calculator.icon;
                    return (
                      <Card 
                        key={calculator.id} 
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-700/20 transition-all cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{calculator.title}</h3>
                                  {favorites.has(calculator.id) && (
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{calculator.description}</p>
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${getCategoryBadgeColor(calculator.category)}`}
                                >
                                  {calculator.category}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(calculator.id)}
                                className="text-gray-400 dark:text-gray-500 hover:text-yellow-500"
                              >
                                <Star className={`h-4 w-4 ${favorites.has(calculator.id) ? 'text-yellow-500 fill-current' : ''}`} />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
