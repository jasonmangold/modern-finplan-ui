
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Search, FileText, Star, Download, Eye } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";

const Education = () => {
  const { globalSearchTerm } = useSearch();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Mock data for reports
  const reportCategories = [
    {
      id: "investments",
      title: "Investments",
      count: 45,
      reports: [
        { id: "1", title: "Market Analysis Q4 2023", type: "Analysis", favorite: true },
        { id: "2", title: "Portfolio Optimization Guide", type: "Guide", favorite: false },
        { id: "3", title: "ESG Investment Trends", type: "Research", favorite: true },
      ]
    },
    {
      id: "real-estate",
      title: "Real Estate",
      count: 7,
      reports: [
        { id: "4", title: "Housing Market Forecast", type: "Analysis", favorite: false },
        { id: "5", title: "REIT Investment Strategy", type: "Strategy", favorite: true },
      ]
    },
    {
      id: "retirement",
      title: "Retirement Planning",
      count: 79,
      reports: [
        { id: "6", title: "Highlights of the Pension Protection Act of 2006", type: "Legislation", favorite: false },
        { id: "7", title: "401(k) Optimization Strategies", type: "Guide", favorite: true },
        { id: "8", title: "Social Security Planning", type: "Analysis", favorite: false },
      ]
    },
    {
      id: "social-security",
      title: "Social Security",
      count: 10,
      reports: [
        { id: "9", title: "Social Security Benefits Calculator", type: "Tool", favorite: false },
        { id: "10", title: "Claiming Strategy Analysis", type: "Analysis", favorite: true },
      ]
    }
  ];

  const filteredCategories = reportCategories.map(category => ({
    ...category,
    reports: category.reports.filter(report => 
      report.title.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(globalSearchTerm.toLowerCase())
    )
  })).filter(category => 
    category.reports.length > 0 || 
    category.title.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
    globalSearchTerm === ""
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Education Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Access comprehensive financial reports and research</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {filteredCategories.length === 0 ? (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No reports found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms</p>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map((category) => (
              <Card key={category.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <CardTitle className="text-xl text-gray-900 dark:text-gray-100">{category.title}</CardTitle>
                          <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {category.count} reports
                          </Badge>
                        </div>
                        {expandedCategories.has(category.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {category.reports.map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                {report.favorite && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">{report.title}</h4>
                                <Badge variant="outline" className="mt-1 text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                                  {report.type}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
