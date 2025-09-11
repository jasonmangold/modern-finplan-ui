import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, Filter, Eye, FileText, FolderOpen, X, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ReportViewer } from "@/components/ReportViewer";
import { useEducationCategories, useEducationSearch, useEducationData } from "@/hooks/useEducationData";
import { useSearch } from "@/contexts/SearchContext";
import { usePresentationContext } from "@/contexts/PresentationContext";

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
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubfolders, setExpandedSubfolders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("report-library");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);
  const scrollPositionRef = useRef<number>(0);

  // Handle navigation from presentation page
  useEffect(() => {
    if (location.state) {
      const { goalId, reportView, reportName, fromPresentation } = location.state as any;
      
      if (fromPresentation && reportName) {
        // Set search term to help find the report
        if (reportName === "Retirement Fact Finder") {
          setLocalSearchTerm("Retirement");
        } else if (reportName === "Education Funding Summary") {
          setLocalSearchTerm("Education");
        }
        
        // Auto-expand relevant categories
        setExpandedCategories(["Retirement Planning", "Education Funding"]);
      }
    }
  }, [location.state]);

  // Use global search context
  const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
  
  // Use presentation context
  const { addPresentationItem, removePresentationItem, presentationItems } = usePresentationContext();
  
  // Combine local and global search terms
  const effectiveSearchTerm = localSearchTerm || globalSearchTerm;

  // Use Supabase data for Report Library tab - now with format filtering and search
  const { data: educationCategories, isLoading, error } = useEducationCategories(selectedFormats);
  const { data: searchResults } = useEducationSearch(effectiveSearchTerm, selectedFormats);
  const { data: educationData } = useEducationData();

  // Sync with global search when on Education page
  useEffect(() => {
    if (globalSearchTerm && !localSearchTerm) {
      setLocalSearchTerm(globalSearchTerm);
    }
  }, [globalSearchTerm, localSearchTerm]);

  // Clear search function
  const clearSearch = () => {
    setLocalSearchTerm("");
    setGlobalSearchTerm("");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedPDF || selectedReport) {
          handleBackToReports();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPDF, selectedReport]);

  // Initialize selected items from presentation
  useEffect(() => {
    const educationItemsInPresentation = presentationItems
      .filter(item => item.source === "Education")
      .map(item => item.name);
    setSelectedItems(educationItemsInPresentation);
  }, [presentationItems]);

  const handleItemSelection = (item: string) => {
    setSelectedItems(prev => {
      const isCurrentlySelected = prev.includes(item);
      
      if (isCurrentlySelected) {
        // Remove from local state and presentation
        const existingPresentationItem = presentationItems.find(p => p.name === item && p.source === "Education");
        if (existingPresentationItem) {
          removePresentationItem(existingPresentationItem.id);
        }
        return prev.filter(i => i !== item);
      } else {
        // Add to local state and presentation
        const newPresentationItem = {
          id: crypto.randomUUID(),
          name: item,
          source: "Education" as const
        };
        addPresentationItem(newPresentationItem);
        return [...prev, item];
      }
    });
  };

  const handleReportClick = (report: any) => {
    // Save current scroll position
    scrollPositionRef.current = window.scrollY;
    setSavedScrollPosition(window.scrollY);
    
    // Only check file_path column for PDF URL
    if (report.file_path) {
      setSelectedPDF({ url: report.file_path, title: report.DocumentTitle });
    }
  };

  const handleBackToReports = () => {
    setSelectedReport(null);
    setSelectedPDF(null);
    
    // Restore scroll position after a brief delay to ensure DOM is updated
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPosition, behavior: 'smooth' });
    }, 100);
  };

  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories(prev => prev.includes(categoryName) ? prev.filter(cat => cat !== categoryName) : [...prev, categoryName]);
  };

  const toggleSubfolderExpansion = (subfolderName: string) => {
    setExpandedSubfolders(prev => prev.includes(subfolderName) ? prev.filter(sub => sub !== subfolderName) : [...prev, subfolderName]);
  };

  const getReportsForSubfolder = (folderName: string, subfolderName: string) => {
    if (!educationData) return [];
    
    let filtered = educationData.filter(record => 
      record.Folder === folderName && record.Subfolder === subfolderName
    );

    // Apply format filter
    if (selectedFormats.length > 0) {
      filtered = filtered.filter(record => 
        selectedFormats.includes(record.Format || '')
      );
    }

    // Apply search filter if there's a search term - only search DocumentTitle and FormNumber
    if (effectiveSearchTerm) {
      const searchLower = effectiveSearchTerm.toLowerCase();
      filtered = filtered.filter(record =>
        record.DocumentTitle.toLowerCase().includes(searchLower) ||
        record.FormNumber?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const getDirectReports = (folderName: string) => {
    if (!educationData) return [];
    
    let filtered = educationData.filter(record => 
      record.Folder === folderName && (!record.Subfolder || record.Subfolder.trim() === '')
    );

    // Apply format filter
    if (selectedFormats.length > 0) {
      filtered = filtered.filter(record => 
        selectedFormats.includes(record.Format || '')
      );
    }

    // Apply search filter if there's a search term - only search DocumentTitle and FormNumber
    if (effectiveSearchTerm) {
      const searchLower = effectiveSearchTerm.toLowerCase();
      filtered = filtered.filter(record =>
        record.DocumentTitle.toLowerCase().includes(searchLower) ||
        record.FormNumber?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const clearAllFilters = () => {
    setSelectedTopics([]);
    setSelectedFormats([]);
    clearSearch();
  };

  // Check if we should show search results instead of categories
  const showingSearchResults = effectiveSearchTerm.length > 0;

  if (selectedPDF) {
    return (
      <div className="flex h-screen w-full">
        {/* Collapsible Sidebar */}
        <div className={`transition-all duration-300 ease-in-out border-r bg-gray-50/50 ${sidebarCollapsed ? 'w-0' : 'w-80'} overflow-hidden`}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-700">Reports</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarCollapsed(true)}
                className="h-8 w-8 p-0"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search reports..." 
                value={localSearchTerm} 
                onChange={e => setLocalSearchTerm(e.target.value)} 
                className="pl-10 h-8 text-xs" 
              />
            </div>

            {/* Report Categories */}
            <div className="space-y-2">
              {educationCategories?.map(category => {
                const categoryHasResults = getDirectReports(category.name).length > 0 || 
                  category.subfolders.some(subfolder => getReportsForSubfolder(category.name, subfolder).length > 0);
                
                if (!categoryHasResults) return null;
                
                return (
                  <div key={category.name} className="border rounded-md">
                    <button 
                      onClick={() => toggleCategoryExpansion(category.name)}
                      className="w-full p-2 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <ChevronDown className={`h-3 w-3 transition-transform ${expandedCategories.includes(category.name) ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedCategories.includes(category.name) && (
                      <div className="border-t bg-white">
                        {/* Subfolders */}
                        {category.subfolders && category.subfolders.map(subfolder => {
                          const subfolderReports = getReportsForSubfolder(category.name, subfolder);
                          if (subfolderReports.length === 0) return null;
                          
                          return (
                            <Collapsible key={subfolder} open={expandedSubfolders.includes(subfolder)} onOpenChange={(open) => {
                              if (open) {
                                setExpandedSubfolders(prev => [...prev, subfolder]);
                              } else {
                                setExpandedSubfolders(prev => prev.filter(sub => sub !== subfolder));
                              }
                            }}>
                              <CollapsibleTrigger className="w-full px-3 py-2 bg-gray-50 border-b flex items-center justify-between hover:bg-gray-100 transition-colors">
                                <span className="text-xs font-medium">{subfolder}</span>
                                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${expandedSubfolders.includes(subfolder) ? 'rotate-180' : ''}`} />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="animate-accordion-down">
                                <div className="px-1 py-1 space-y-1">
                                  {subfolderReports.map(report => (
                                    <button
                                      key={report.id}
                                      onClick={() => handleReportClick(report)}
                                      className={`w-full p-2 text-left text-xs hover:bg-blue-50 transition-colors border-b last:border-b-0 ${
                                        selectedPDF?.title === report.DocumentTitle ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-3 w-3" />
                                        <span className="truncate">{report.DocumentTitle}</span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          );
                        })}
                        
                        {/* Direct reports in category (no subfolder) */}
                        {getDirectReports(category.name).map(report => (
                          <button
                            key={report.id}
                            onClick={() => handleReportClick(report)}
                            className={`w-full p-2 text-left text-xs hover:bg-blue-50 transition-colors border-b last:border-b-0 ${
                              selectedPDF?.title === report.DocumentTitle ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-3 w-3" />
                              <span className="truncate">{report.DocumentTitle}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b bg-white p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              {sidebarCollapsed && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSidebarCollapsed(false)}
                  className="h-8 w-8 p-0"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </Button>
              )}
              <h1 className="font-semibold text-lg truncate">{selectedPDF.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="default" 
                onClick={() => handleItemSelection(selectedPDF.title)}
                className="flex items-center gap-2"
              >
                Add to Presentation
              </Button>
              <Button 
                variant="outline" 
                onClick={handleBackToReports} 
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 bg-gray-100">
            <iframe
              src={selectedPDF.url}
              className="w-full h-full border-0"
              title={`PDF: ${selectedPDF.title}`}
              sandbox="allow-scripts allow-same-origin"
              onError={(e) => {
                console.warn('PDF iframe error:', e);
              }}
              style={{
                border: 'none',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (selectedReport) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBackToReports} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Back to Reports
          </Button>
        </div>
        <ReportViewer reportId={selectedReport} />
      </div>
    );
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

        return (
          <div className="space-y-6">
            {/* Header - Always visible */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Report Library
                </h1>
              </div>

              {/* Search - Always visible */}
              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search reports by title or form number..." 
                  value={localSearchTerm} 
                  onChange={e => setLocalSearchTerm(e.target.value)} 
                  className="pl-10" 
                />
                {localSearchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              {/* Enhanced Filters Card - Always visible */}
              <Card className="border shadow-sm">
                <CardHeader className="pb-3 py-[7px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm">Filters</CardTitle>
                      {(selectedFormats.length > 0 || selectedTopics.length > 0) && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {selectedFormats.length + selectedTopics.length} active
                        </span>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-sm" onClick={() => setFiltersVisible(!filtersVisible)}>
                      {filtersVisible ? 'Hide' : 'Show'}
                      <ChevronDown className={`h-4 w-4 transition-transform ${filtersVisible ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                
                {filtersVisible && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium text-sm mb-3">Format</h3>
                        <div className="flex gap-4">
                          {formatOptions.map(format => (
                            <div key={format} className="flex items-center space-x-2">
                              <Checkbox 
                                id={format} 
                                checked={selectedFormats.includes(format)} 
                                onCheckedChange={checked => {
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
                            <button key={topic} onClick={() => handleTopicToggle(topic)} className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedTopics.includes(topic) ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'}`}>
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {(selectedFormats.length > 0 || selectedTopics.length > 0 || effectiveSearchTerm) && (
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" onClick={clearAllFilters}>
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Main Content - Show search results or categories */}
            {showingSearchResults ? (
              // Search Results
              searchResults && searchResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="mb-4">
                    <h2 className="text-lg font-medium">Search Results for "{effectiveSearchTerm}"</h2>
                    <p className="text-gray-500 text-sm">{searchResults.length} reports found</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {searchResults.map(report => (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-3 flex-1">
                          <Checkbox checked={selectedItems.includes(report.DocumentTitle)} onCheckedChange={() => handleItemSelection(report.DocumentTitle)} />
                          <FileText className="h-4 w-4 text-gray-400" />
                          <div className="flex-1">
                            <button 
                              onClick={() => handleReportClick(report)}
                              className="text-sm hover:text-blue-600 transition-colors text-left block"
                            >
                              {report.DocumentTitle}
                            </button>
                            {report.FormNumber && (
                              <p className="text-xs text-gray-500 mt-1">Form: {report.FormNumber}</p>
                            )}
                            <p className="text-xs text-gray-400">{report.Folder}{report.Subfolder ? ` > ${report.Subfolder}` : ''}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleReportClick(report)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // No search results found
                <div className="text-center py-12">
                  <div className="text-gray-500">No reports found</div>
                  <p className="text-gray-400 mt-2">
                    No reports match your search for "{effectiveSearchTerm}"
                  </p>
                </div>
              )
            ) : (
              // Regular category view (no search)
              educationCategories && educationCategories.length > 0 ? (
                <div className="space-y-4">
                  {educationCategories.map(category => (
                    <div key={category.name} className="border rounded-lg transition-all duration-200 hover:shadow-md">
                      <button onClick={() => toggleCategoryExpansion(category.name)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FolderOpen className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm text-gray-500">{category.count} reports</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories.includes(category.name) ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedCategories.includes(category.name) && (
                        <div className="border-t animate-fade-in">
                          {/* Subfolders */}
                          {category.subfolders && category.subfolders.map(subfolder => {
                            const subfolderReports = getReportsForSubfolder(category.name, subfolder);
                            if (subfolderReports.length === 0) return null;
                            
                            return (
                              <Collapsible key={subfolder} open={expandedSubfolders.includes(subfolder)} onOpenChange={(open) => {
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
                                    {subfolderReports.map(report => (
                                      <div key={report.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-colors group">
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
                                        <Button variant="ghost" size="sm" onClick={() => handleReportClick(report)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            );
                          })}
                          
                          {/* Direct reports in category (no subfolder) */}
                          {getDirectReports(category.name).length > 0 && (
                            <div className="px-8 py-4 grid grid-cols-2 gap-4">
                              {getDirectReports(category.name).map(report => (
                                <div key={report.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-colors group">
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
                                  <Button variant="ghost" size="sm" onClick={() => handleReportClick(report)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // No education data or filtered out
                <div className="text-center py-12">
                  <div className="text-gray-500">No education data found</div>
                  <p className="text-gray-400 mt-2">
                    {selectedFormats.length > 0 
                      ? `No reports found matching the selected format(s): ${selectedFormats.join(', ')}`
                      : "Make sure your Education table has data"
                    }
                  </p>
                </div>
              )
            )}
          </div>
        );

      case "client-forms":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Client Interaction Forms
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {clientInteractionForms.map(form => (
                <div key={form} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={selectedItems.includes(form)} onCheckedChange={() => handleItemSelection(form)} />
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{form}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      case "worksheets":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Worksheets
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {worksheetReports.map(worksheet => (
                <div key={worksheet} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={selectedItems.includes(worksheet)} onCheckedChange={() => handleItemSelection(worksheet)} />
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{worksheet}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      case "advisor-support":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Advisor Support
              </h1>
            </div>
            <div className="space-y-4">
              {advisorSupportFolders.map(folder => (
                <div key={folder.name} className="border rounded-lg">
                  <button onClick={() => toggleCategoryExpansion(folder.name)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{folder.name}</span>
                      <span className="text-sm text-gray-500">{folder.count} resources</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedCategories.includes(folder.name) ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedCategories.includes(folder.name) && (
                    <div className="border-t p-4 grid grid-cols-2 gap-4">
                      {folder.reports.map(report => (
                        <div key={report} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={selectedItems.includes(report)} onCheckedChange={() => handleItemSelection(report)} />
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{report}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
        <AnimatedTabs tabs={tabs} defaultValue="report-library" onValueChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Education;
