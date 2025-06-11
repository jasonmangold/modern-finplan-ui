import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download, Search, Filter, X, ArrowLeft, Eye, FileText, FolderOpen } from "lucide-react";
import { ReportViewer } from "@/components/ReportViewer";
const educationCategories = [{
  name: "Personal Finance",
  count: 25,
  reports: ["Personal Budgeting Basics", "Emergency Fund Planning", "Debt Management Strategies", "Credit Score Improvement", "Financial Goal Setting"],
  subfolders: ["Budgeting", "Emergency Planning", "Debt Management", "Credit Basics", "Goal Setting"]
}, {
  name: "Health and Medical",
  count: 18,
  reports: ["Health Savings Accounts (HSAs)", "Medical Insurance Planning", "Healthcare Cost Management", "Medicare Basics", "Health-Related Tax Deductions"],
  subfolders: ["HSA Planning", "Medical Insurance", "Healthcare Costs", "Medicare", "Medical Tax Benefits"]
}, {
  name: "Income Taxes",
  count: 22,
  reports: ["Tax Planning Strategies", "Deduction Maximization", "Tax-Advantaged Accounts", "Year-End Tax Planning", "Tax Loss Harvesting"],
  subfolders: ["Tax Planning", "Deductions", "Tax-Advantaged Savings", "Year-End Strategies", "Investment Taxes"]
}, {
  name: "Home Ownership",
  count: 15,
  reports: ["First-Time Home Buying", "Mortgage Planning", "Home Refinancing", "Property Tax Planning", "Home Equity Strategies"],
  subfolders: ["Home Buying", "Mortgages", "Refinancing", "Property Taxes", "Home Equity"]
}, {
  name: "Investments",
  count: 30,
  reports: ["Investment Basics", "Portfolio Diversification", "Risk Management", "Investment Account Types", "Asset Allocation Strategies"],
  subfolders: ["Investment Basics", "Portfolio Management", "Risk Assessment", "Account Types", "Asset Allocation"]
}, {
  name: "Retirement Planning",
  count: 35,
  reports: ["401(k) vs IRA: Understanding Your Options", "Required Minimum Distributions (RMDs)", "Tax-Deferred vs Tax-Free Retirement Accounts", "Social Security Benefits Explained", "Retirement Income Strategies"],
  subfolders: ["Retirement Basics", "Account Types", "Distribution Planning", "Income Strategies", "Social Security"]
}, {
  name: "Education Funding",
  count: 12,
  reports: ["529 College Savings Plans", "Education Tax Credits", "Student Loan Strategies", "Educational Savings Options", "Financial Aid Planning"],
  subfolders: ["529 Plans", "Tax Credits", "Student Loans", "Savings Options", "Financial Aid"]
}, {
  name: "Life Insurance",
  count: 20,
  reports: ["Life Insurance Basics", "Term vs Whole Life", "Life Insurance Needs Analysis", "Policy Comparison", "Beneficiary Planning"],
  subfolders: ["Insurance Basics", "Policy Types", "Needs Analysis", "Policy Comparison", "Beneficiary Planning"]
}, {
  name: "Property and Casualty",
  count: 14,
  reports: ["Home Insurance Planning", "Auto Insurance Optimization", "Umbrella Insurance", "Property Protection", "Liability Coverage"],
  subfolders: ["Home Insurance", "Auto Insurance", "Umbrella Coverage", "Property Protection", "Liability Planning"]
}, {
  name: "Social Security",
  count: 16,
  reports: ["Social Security Claiming Strategies", "Spousal Benefits", "Survivor Benefits", "Social Security and Taxes", "Maximizing Benefits"],
  subfolders: ["Claiming Strategies", "Spousal Benefits", "Survivor Benefits", "Tax Planning", "Benefit Maximization"]
}, {
  name: "Estate Planning",
  count: 24,
  reports: ["Will and Trust Basics", "Estate Tax Planning", "Beneficiary Designations", "Power of Attorney", "Estate Planning for Families"],
  subfolders: ["Wills and Trusts", "Estate Taxes", "Beneficiary Planning", "Legal Documents", "Family Planning"]
}, {
  name: "Business Planning",
  count: 19,
  reports: ["Business Entity Selection", "Business Insurance", "Succession Planning", "Key Person Insurance", "Business Valuation"],
  subfolders: ["Entity Selection", "Business Insurance", "Succession Planning", "Key Person Coverage", "Business Valuation"]
}, {
  name: "Charitable Planning",
  count: 11,
  reports: ["Charitable Giving Strategies", "Donor-Advised Funds", "Charitable Remainder Trusts", "Tax Benefits of Giving", "Planned Giving"],
  subfolders: ["Giving Strategies", "Donor-Advised Funds", "Charitable Trusts", "Tax Benefits", "Planned Giving"]
}];
const clientInteractionForms = ["Agenda for Discussion", "Beneficiary Audit Checklist", "Business Events Checklist", "Business Owner Planning Needs", "Client Referral", "Divorce Checklist", "Financial Review Checklist", "Life Events Checklist", "Planning Task List", "Receipt for Documents"];
const worksheetReports = ["Business Valuation", "Capital Needs Analysis Worksheet", "Federal Estate Tax Worksheet", "Odds of Disability", "Personal Alternative Minimum Tax", "The Personal Budget Worksheet", "Personal Net Worth", "Taxation of Social Security Benefits", "The Real Rate of Return Worksheet", "When to Refinance Your Home"];
const advisorSupportFolders = [{
  name: "Planning Tools Reference",
  count: 8,
  reports: ["Planning Software Guide", "Calculation Tools", "Reference Materials", "Best Practices", "Compliance Guidelines"]
}];
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
  const filteredReports = selectedCategory === "all" ? allReports.filter(report => report.toLowerCase().includes(searchTerm.toLowerCase())) : educationCategories.find(cat => cat.name === selectedCategory)?.reports.filter(report => report.toLowerCase().includes(searchTerm.toLowerCase())) || [];
  const handleItemSelection = (item: string) => {
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };
  const handleDownload = (reportTitle: string) => {
    console.log(`Downloading: ${reportTitle}`);
  };
  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
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
    setExpandedCategories(prev => prev.includes(categoryName) ? prev.filter(cat => cat !== categoryName) : [...prev, categoryName]);
  };
  const toggleSubfolderExpansion = (subfolderName: string) => {
    setExpandedSubfolders(prev => prev.includes(subfolderName) ? prev.filter(sub => sub !== subfolderName) : [...prev, subfolderName]);
  };
  if (selectedReport) {
    return <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBackToReports} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Button>
        </div>
        <ReportViewer reportId={selectedReport} />
      </div>;
  }
  const tabs = [{
    label: "Report Library",
    value: "report-library"
  }, {
    label: "Client Interaction Forms",
    value: "client-forms"
  }, {
    label: "Worksheets",
    value: "worksheets"
  }, {
    label: "Advisor Support",
    value: "advisor-support"
  }];
  const renderTabContent = () => {
    switch (activeTab) {
      case "report-library":
        return <div className="space-y-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Report Library
                </h1>
              </div>

              {/* Search */}
              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search reports..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>

              {/* Enhanced Filters Card */}
              <Card className="border shadow-sm">
                <CardHeader className="pb-3 py-[7px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm">Filters</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-sm" onClick={() => setFiltersVisible(!filtersVisible)}>
                      {filtersVisible ? 'Hide' : 'Show'}
                      <ChevronDown className={`h-4 w-4 transition-transform ${filtersVisible ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                
                {filtersVisible && <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium text-sm mb-3">Format</h3>
                        <div className="flex gap-4">
                          {formatOptions.map(format => <div key={format} className="flex items-center space-x-2">
                              <Checkbox id={format} checked={selectedFormats.includes(format)} onCheckedChange={checked => {
                          if (checked) {
                            setSelectedFormats(prev => [...prev, format]);
                          } else {
                            setSelectedFormats(prev => prev.filter(f => f !== format));
                          }
                        }} />
                              <label htmlFor={format} className="text-sm">{format}</label>
                            </div>)}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm mb-3">Topics</h3>
                        <div className="flex flex-wrap gap-2">
                          {topicTags.map(topic => <button key={topic} onClick={() => handleTopicToggle(topic)} className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedTopics.includes(topic) ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'}`}>
                              {topic}
                            </button>)}
                        </div>
                      </div>
                    </div>
                  </CardContent>}
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              {educationCategories.map(category => <div key={category.name} className="border rounded-lg transition-all duration-200">
                  <button onClick={() => toggleCategoryExpansion(category.name)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count} reports</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories.includes(category.name) ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedCategories.includes(category.name) && <div className="border-t animate-fade-in">
                      {/* Subfolders */}
                      {category.subfolders && category.subfolders.map(subfolder => <Collapsible key={subfolder}>
                          <CollapsibleTrigger className="w-full px-4 py-3 bg-gray-50 border-b flex items-center justify-between hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium">{subfolder}</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="animate-accordion-down">
                            <div className="px-8 py-4 grid grid-cols-2 gap-4">
                              {category.reports.slice(0, 2).map(report => <div key={report} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <Checkbox checked={selectedItems.includes(report)} onCheckedChange={() => handleItemSelection(report)} />
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
                                </div>)}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>)}
                    </div>}
                </div>)}
            </div>
          </div>;
      case "client-forms":
        return <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Client Interaction Forms
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {clientInteractionForms.map(form => <div key={form} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={selectedItems.includes(form)} onCheckedChange={() => handleItemSelection(form)} />
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{form}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(form)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>)}
            </div>
          </div>;
      case "worksheets":
        return <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Worksheets
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {worksheetReports.map(worksheet => <div key={worksheet} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={selectedItems.includes(worksheet)} onCheckedChange={() => handleItemSelection(worksheet)} />
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{worksheet}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(worksheet)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>)}
            </div>
          </div>;
      case "advisor-support":
        return <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Advisor Support
              </h1>
            </div>
            <div className="space-y-4">
              {advisorSupportFolders.map(folder => <div key={folder.name} className="border rounded-lg">
                  <button onClick={() => toggleCategoryExpansion(folder.name)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{folder.name}</span>
                      <span className="text-sm text-gray-500">{folder.count} resources</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedCategories.includes(folder.name) ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedCategories.includes(folder.name) && <div className="border-t p-4 grid grid-cols-2 gap-4">
                      {folder.reports.map(report => <div key={report} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={selectedItems.includes(report)} onCheckedChange={() => handleItemSelection(report)} />
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
                        </div>)}
                    </div>}
                </div>)}
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="p-6 max-w-7xl mx-auto">
      {/* Animated Tabs */}
      <div className="mb-6 flex justify-center">
        <AnimatedTabs tabs={tabs} defaultValue="report-library" onValueChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>;
};
export default Education;