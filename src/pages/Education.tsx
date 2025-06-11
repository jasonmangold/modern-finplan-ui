import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download, Search, Filter, X, ArrowLeft, Eye, FileText, FolderOpen } from "lucide-react";
import { ReportViewer } from "@/components/ReportViewer";

const educationCategories = [
  { name: "Retirement", count: 15, reports: ["401(k) vs IRA: Understanding Your Options", "Required Minimum Distributions (RMDs)", "Tax-Deferred vs Tax-Free Retirement Accounts", "Social Security Benefits Explained", "Retirement Income Strategies"] },
  { name: "Life Insurance", count: 10, reports: ["Life Insurance Basics", "Term vs Whole Life", "Life Insurance Needs Analysis"] },
  { name: "College", count: 10, reports: ["529 College Savings Plans", "Education Tax Credits", "Student Loan Strategies"] },
  { name: "Disability", count: 5, reports: ["Disability Insurance Basics", "Social Security Disability", "Short vs Long Term Disability"] },
  { name: "Long-Term Care", count: 5, reports: ["Long-Term Care Planning", "LTC Insurance Options", "Medicaid Planning"] }
];

const formatOptions = ["One-Pagers", "Detailed Reports"];
const topicTags = ["Retirement", "Life Insurance", "College", "Disability", "Long-Term Care", "Debt", "Estate Planning", "Tax Strategy"];

const Education = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubfolders, setExpandedSubfolders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("report-library");

  const allReports = educationCategories.flatMap(cat => cat.reports);
  const filteredReports = selectedCategory === "all" 
    ? allReports.filter(report => report.toLowerCase().includes(searchTerm.toLowerCase()))
    : educationCategories.find(cat => cat.name === selectedCategory)?.reports.filter(report => report.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  const handleItemSelection = (item: string) => {
    setSelectedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
  };

  const handleDownload = (reportTitle: string) => {
    console.log(`Downloading: ${reportTitle}`);
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const clearAllFilters = () => {
    setSelectedTopics([]);
    setSelectedFormats([]);
  };

  const handleReportClick = (reportTitle: string) => {
    if (reportTitle === "The Need for Financial Planning") {
      setSelectedReport("retirement-planning");
    } else if (reportTitle === "The Need for Retirement Planning (2)") {
      setSelectedReport("retirement-planning-2");
    } else if (reportTitle === "The Need for Retirement Planning (3)") {
      setSelectedReport("retirement-planning-3");
    } else if (reportTitle === "Up to Your Neck in Debt?") {
      setSelectedReport("debt-management");
    }
  };

  const handleBackToReports = () => {
    setSelectedReport(null);
  };

  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleSubfolderExpansion = (subfolderName: string) => {
    setExpandedSubfolders(prev =>
      prev.includes(subfolderName)
        ? prev.filter(sub => sub !== subfolderName)
        : [...prev, subfolderName]
    );
  };

  if (selectedReport) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToReports}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Button>
        </div>
        <ReportViewer reportId={selectedReport} />
      </div>
    );
  }

  const tabs = [
    { label: "Report Library", value: "report-library" },
    { label: "Client Interaction Forms", value: "client-forms" },
    { label: "Worksheets", value: "worksheets" },
    { label: "Advisor Support", value: "advisor-support" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "report-library":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Report Library (600+ Reports)
                </h1>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setFiltersVisible(!filtersVisible)}
                >
                  <Filter className="h-4 w-4" />
                  {filtersVisible ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>

              {/* Search */}
              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search reports..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              {filtersVisible && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium text-sm mb-3">Format</h3>
                      <div className="flex gap-4">
                        {formatOptions.map(format => (
                          <div key={format} className="flex items-center space-x-2">
                            <Checkbox 
                              id={format} 
                              checked={selectedFormats.includes(format)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFormats(prev => [...prev, format]);
                                } else {
                                  setSelectedFormats(prev => prev.filter(f => f !== format));
                                }
                              }}
                            />
                            <label htmlFor={format} className="text-sm">{format}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm mb-3">Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {topicTags.map(topic => (
                          <button
                            key={topic}
                            onClick={() => handleTopicToggle(topic)}
                            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                              selectedTopics.includes(topic)
                                ? 'bg-blue-100 text-blue-700 border-blue-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                            }`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              {educationCategories.map(category => (
                <div key={category.name} className="border rounded-lg">
                  <button
                    onClick={() => toggleCategoryExpansion(category.name)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count} reports</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      expandedCategories.includes(category.name) ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {expandedCategories.includes(category.name) && (
                    <div className="border-t">
                      {/* Subcategory headers based on the category */}
                      {category.name === "Retirement" && (
                        <>
                          <Collapsible>
                            <CollapsibleTrigger className="w-full px-4 py-3 bg-gray-50 border-b flex items-center justify-between hover:bg-gray-100 transition-colors">
                              <span className="text-sm font-medium">Retirement Planning Basics</span>
                              <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="px-8 py-4 grid grid-cols-2 gap-4">
                                {["401(k) vs IRA: Understanding Your Options", "Required Minimum Distributions (RMDs)", "Tax-Deferred vs Tax-Free Retirement Accounts"].map(report => (
                                  <div key={report} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                      <Checkbox 
                                        checked={selectedItems.includes(report)} 
                                        onCheckedChange={() => handleItemSelection(report)} 
                                      />
                                      <FileText className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm">{report}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm" onClick={() => handleDownload(report)}>
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                          
                          <Collapsible>
                            <CollapsibleTrigger className="w-full px-4 py-3 bg-gray-50 border-b flex items-center justify-between hover:bg-gray-100 transition-colors">
                              <span className="text-sm font-medium">Advanced Retirement Strategies</span>
                              <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="px-8 py-4 grid grid-cols-2 gap-4">
                                {["Social Security Benefits Explained", "Retirement Income Strategies"].map(report => (
                                  <div key={report} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                      <Checkbox 
                                        checked={selectedItems.includes(report)} 
                                        onCheckedChange={() => handleItemSelection(report)} 
                                      />
                                      <FileText className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm">{report}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm" onClick={() => handleDownload(report)}>
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </>
                      )}
                      
                      {/* For other categories, show simple report list in 2-column grid */}
                      {category.name !== "Retirement" && (
                        <div className="p-4 grid grid-cols-2 gap-4">
                          {category.reports.map(report => (
                            <div key={report} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <Checkbox 
                                  checked={selectedItems.includes(report)} 
                                  onCheckedChange={() => handleItemSelection(report)} 
                                />
                                <FileText className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{report}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDownload(report)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "client-forms":
        return (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Client Interaction Forms</h3>
            <p className="text-gray-500">Coming soon - interactive forms for client meetings</p>
          </div>
        );

      case "worksheets":
        return (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Worksheets</h3>
            <p className="text-gray-500">Coming soon - calculation worksheets and planning tools</p>
          </div>
        );

      case "advisor-support":
        return (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Advisor Support</h3>
            <p className="text-gray-500">Coming soon - training materials and support resources</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Animated Tabs */}
      <div className="mb-6 flex justify-center">
        <AnimatedTabs
          tabs={tabs}
          defaultValue="report-library"
          onValueChange={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Education;
