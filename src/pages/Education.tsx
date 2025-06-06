
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download, Search } from "lucide-react";

const educationCategories = [
  "Personal Finance",
  "Income Taxes", 
  "Investments",
  "Retirement Planning",
  "Insurance",
  "Home Ownership",
  "Education Funding",
  "Estate Planning",
  "Business Planning",
  "Charitable Planning",
  "Social Security and Government Programs"
];

const educationReports = [
  "The Need for Financial Planning",
  "Up to Your Neck in Debt?",
  "Budgeting Basics",
  "Income Tax Fundamentals",
  "Advanced Tax Strategies",
  "Tax Planning Guide",
  "Investment Planning 101",
  "Understanding Mutual Funds",
  "Stocks and Bonds Basics",
  "Alternative Investments",
  "The Road to Retirement Planning"
];

const Education = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);

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
    // Placeholder download functionality
    console.log(`Downloading: ${reportTitle}`);
    // In a real app, this would trigger a PDF download
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Education</h1>
        
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Collapsible Filter Options */}
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 mb-4">
              <span className="font-medium">Filter Reports</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Format:</span>
              <div className="flex items-center space-x-2">
                <Checkbox id="one-pagers" />
                <label htmlFor="one-pagers" className="text-sm">One Pagers</label>
              </div>
              
              <span className="font-medium">Topic:</span>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center space-x-2">
                  <Checkbox id="retirement" />
                  <label htmlFor="retirement" className="text-sm">Retirement</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="life-insurance" />
                  <label htmlFor="life-insurance" className="text-sm">Life Insurance</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="college" />
                  <label htmlFor="college" className="text-sm">College</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disability" />
                  <label htmlFor="disability" className="text-sm">Disability</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="long-term-care" />
                  <label htmlFor="long-term-care" className="text-sm">Long-Term Care</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="debt" />
                  <label htmlFor="debt" className="text-sm">Debt</label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Categories Sidebar */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-blue-600 bg-blue-50">
                  All (52)
                </Button>
                {educationCategories.map((category) => (
                  <details key={category} className="group">
                    <summary className="flex items-center justify-between p-2 text-sm font-medium cursor-pointer hover:bg-gray-50 rounded">
                      <span>{category}</span>
                      <span className="text-gray-400">▼</span>
                    </summary>
                  </details>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Reports ({filteredReports.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredReports.map((report) => (
                  <div key={report} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        checked={selectedItems.includes(report)}
                        onCheckedChange={() => handleItemSelection(report)}
                      />
                      <span className="font-medium">{report}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(report)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Education;
