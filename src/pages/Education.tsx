import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download, Search, Filter, ArrowLeft, Eye, FileText, FolderOpen } from "lucide-react";
import { ReportViewer } from "@/components/ReportViewer";
import { PDFViewer } from "@/components/PDFViewer";
import { useEducationCategories, useEducationSearch, useEducationData } from "@/hooks/useEducationData";

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
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubfolders, setExpandedSubfolders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("report-library");

  // Use Supabase data for Report Library tab
  const { data: educationCategories, isLoading, error } = useEducationCategories();
  const { data: searchResults } = useEducationSearch(searchTerm);
  const { data: educationData } = useEducationData();

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

  const handleReportClick = (report: any) => {
    if (report.file_pdf) {
      setSelectedPDF({ url: report.file_pdf, title: report.DocumentTitle });
    } else {
      // Fallback to existing report viewer for specific hardcoded reports
      if (report.DocumentTitle === "The Need for Financial Planning") {
        setSelectedReport("retirement-planning");
      } else if (report.DocumentTitle === "The Need for Retirement Planning (2)") {
        setSelectedReport("retirement-planning-2");
      } else if (report.DocumentTitle === "The Need for Retirement Planning (3)") {
        setSelectedReport("retirement-planning-3");
      } else if (report.DocumentTitle === "Up to Your Neck in Debt?") {
        setSelectedReport("debt-management");
      }
    }
  };

  const handleBackToReports = () => {
    setSelectedReport(null);
    setSelectedPDF(null);
  };

  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories(prev => prev.includes(categoryName) ? prev.filter(cat => cat !== categoryName) : [...prev, categoryName]);
  };

  const toggleSubfolderExpansion = (subfolderName: string) => {
    setExpandedSubfolders(prev => prev.includes(subfolderName) ? prev.filter(sub => sub !== subfolderName) : [...prev, subfolderName]);
  };

  // Get reports for a specific folder and subfolder
  const getReportsForSubfolder = (folderName: string, subfolderName: string) => {
    if (!educationData) return [];
    return educationData.filter(record => 
      record.Folder === folderName && record.Subfolder === subfolderName
    );
  };

  // Get reports directly in a folder (no subfolder)
  const getDirectReports = (folderName: string) => {
    if (!educationData) return [];
    return educationData.filter(record => 
      record.Folder === folderName && (!record.Subfolder || record.Subfolder.trim() === '')
    );
  };

  if (selectedPDF) {
    return <PDFViewer 
      pdfUrl={selectedPDF.url} 
      title={selectedPDF.title} 
      onBack={handleBackToReports} 
    />;
  }

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
        if (isLoading) {
          return <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Loading education data...</div>
          </div>;
        }

        if (error) {
          return <div className="text-center py-12">
            <div className="text-red-500">Error loading education data</div>
            <p className="text-gray-500 mt-2">Please check your Supabase connection</p>
          </div>;
        }

        if (!educationCategories || educationCategories.length === 0) {
          return <div className="text-center py-12">
            <div className="text-gray-500">No education data found</div>
            <p className="text-gray-400 mt-2">Make sure your Education table has data</p>
          </div>;
        }

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

            {/* Main Content - Dynamic from Supabase */}
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
                      {category.subfolders && category.subfolders.map(subfolder => <Collapsible key={subfolder} open={expandedSubfolders.includes(subfolder)} onOpenChange={(open) => {
                          if (open) {
                            setExpandedSubfolders(prev => [...prev, subfolder]);
                          } else {
                            setExpandedSubfolders(prev => prev.filter(sub => sub !== subfolder));
                          }
                        }}>
                          <CollapsibleTrigger className="w-full px-4 py-3 bg-gray-50 border-b flex items-center justify-between hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-medium">{subfolder}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSubfolders.includes(subfolder) ? 'rotate-180' : ''}`} />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="animate-accordion-down">
                            <div className="px-8 py-4 grid grid-cols-2 gap-4">
                              {getReportsForSubfolder(category.name, subfolder).map(report => <div key={report.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <Checkbox checked={selectedItems.includes(report.DocumentTitle)} onCheckedChange={() => handleItemSelection(report.DocumentTitle)} />
                                    <FileText className="h-4 w-4 text-gray-400" />
                                    <button 
                                      onClick={() => handleReportClick(report)}
                                      className="text-sm hover:text-blue-600 transition-colors text-left"
                                    >
                                      {report.DocumentTitle}
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleReportClick(report)}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDownload(report.DocumentTitle)}>
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>)}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>)}
                      
                      {/* Direct reports in category (no subfolder) */}
                      {getDirectReports(category.name).length > 0 && <div className="px-8 py-4 grid grid-cols-2 gap-4">
                        {getDirectReports(category.name).map(report => <div key={report.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <Checkbox checked={selectedItems.includes(report.DocumentTitle)} onCheckedChange={() => handleItemSelection(report.DocumentTitle)} />
                              <FileText className="h-4 w-4 text-gray-400" />
                              <button 
                                onClick={() => handleReportClick(report)}
                                className="text-sm hover:text-blue-600 transition-colors text-left"
                              >
                                {report.DocumentTitle}
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleReportClick(report)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDownload(report.DocumentTitle)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>)}
                      </div>}
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
