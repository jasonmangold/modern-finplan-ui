
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download, Search, Filter, X, ArrowLeft } from "lucide-react";
import { ReportViewer } from "@/components/ReportViewer";

const educationCategories = ["Personal Finance", "Income Taxes", "Investments", "Retirement Planning", "Insurance", "Home Ownership", "Education Funding", "Estate Planning", "Business Planning", "Charitable Planning", "Social Security and Government Programs"];

const educationReports = ["The Need for Financial Planning", "The Need for Retirement Planning (2)", "Up to Your Neck in Debt?", "Budgeting Basics", "Income Tax Fundamentals", "Advanced Tax Strategies", "Tax Planning Guide", "Investment Planning 101", "Understanding Mutual Funds", "Stocks and Bonds Basics", "Alternative Investments", "The Road to Retirement Planning"];

const topicTags = ["Retirement", "Life Insurance", "College", "Disability", "Long-Term Care", "Debt", "Estate Planning", "Tax Strategy"];

const Education = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const filteredReports = educationReports.filter(report => 
    report.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    } else if (reportTitle === "Up to Your Neck in Debt?") {
      setSelectedReport("debt-management");
    }
  };

  const handleBackToReports = () => {
    setSelectedReport(null);
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

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Modern Search and Filter Section */}
      <div className="smooth-card p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search reports and topics..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-12 h-12 text-base border-gray-200 bg-gray-50/50 focus:bg-white transition-colors rounded-xl"
            />
          </div>
          
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="modern-button h-12 px-6 border-gray-200 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
          
          <Button className="modern-button h-12 px-6 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50" disabled={selectedItems.length === 0}>
            <Download className="h-4 w-4" />
            Download Selected ({selectedItems.length})
          </Button>
        </div>
        
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleContent>
            <div className="border-t border-gray-200 pt-6 animate-fade-in">
              <div className="space-y-6">
                {/* Topic Pills */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {topicTags.map(topic => (
                      <button
                        key={topic}
                        onClick={() => handleTopicToggle(topic)}
                        className={`pill-tag transition-all ${
                          selectedTopics.includes(topic)
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {topic}
                        {selectedTopics.includes(topic) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Format Options */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Format</h3>
                  <div className="flex flex-wrap gap-4">
                    {["One Pagers", "Detailed Reports", "Infographics"].map(format => (
                      <div key={format} className="flex items-center space-x-3">
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
                        <label htmlFor={format} className="text-sm font-medium text-gray-700">{format}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm" onClick={clearAllFilters} className="modern-button">
                    Clear All Filters
                  </Button>
                  <Button size="sm" className="modern-button bg-blue-600 text-white hover:bg-blue-700">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Categories Sidebar */}
        <div className="col-span-3">
          <div className="smooth-card p-6">
            <h3 className="font-semibold text-lg mb-6 text-gray-900">Categories</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start h-auto p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg">
                <div className="text-left">
                  <div className="font-medium">All Reports</div>
                  <div className="text-xs text-blue-500">52 available</div>
                </div>
              </Button>
              {educationCategories.map(category => (
                <details key={category} className="group">
                  <summary className="flex items-center justify-between p-3 text-sm font-medium cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">{category}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="smooth-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-gray-900">
                Reports ({filteredReports.length})
              </h3>
              {selectedItems.length > 0 && (
                <div className="text-sm text-blue-600 font-medium">
                  {selectedItems.length} selected
                </div>
              )}
            </div>
            <div className="space-y-3">
              {filteredReports.map(report => (
                <div key={report} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <Checkbox 
                      checked={selectedItems.includes(report)} 
                      onCheckedChange={() => handleItemSelection(report)} 
                    />
                    <div>
                      <button
                        onClick={() => handleReportClick(report)}
                        className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-left hover:underline"
                      >
                        {report}
                      </button>
                      <div className="text-xs text-gray-500 mt-1">PDF • 2.1 MB</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownload(report)} 
                    className="modern-button opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
