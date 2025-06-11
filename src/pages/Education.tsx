
import { useState } from "react";
import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Education = () => {
  const [activeTab, setActiveTab] = useState("reports-library");
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({});
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleReportSelect = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports(prev => [...prev, reportId]);
    } else {
      setSelectedReports(prev => prev.filter(id => id !== reportId));
    }
  };

  const reportsLibraryData = {
    "Personal Finance": [
      "Budgeting Basics",
      "Debt Management",
      "Emergency Fund Planning",
      "Credit Score Improvement"
    ],
    "Health and Medical": [
      "Health Savings Accounts",
      "Medical Insurance Planning",
      "Long-term Care Planning",
      "Healthcare Directives"
    ],
    "Income Taxes": [
      "Tax Planning Strategies",
      "Deduction Maximization",
      "Tax-Efficient Investing",
      "Year-End Tax Planning"
    ],
    "Home Ownership": [
      "First-Time Buyer Guide",
      "Mortgage Planning",
      "Refinancing Analysis",
      "Home Equity Strategies"
    ],
    "Investments": [
      "Portfolio Diversification",
      "Risk Assessment",
      "Investment Selection",
      "Asset Allocation"
    ],
    "Retirement Planning": [
      "401(k) Optimization",
      "IRA Strategies",
      "Social Security Planning",
      "Retirement Income Planning"
    ],
    "Education Funding": [
      "529 Plans",
      "Education Savings Accounts",
      "Financial Aid Planning",
      "Student Loan Management"
    ],
    "Life Insurance": [
      "Term vs Permanent",
      "Needs Analysis",
      "Policy Comparison",
      "Beneficiary Planning"
    ],
    "Property and Casualty": [
      "Auto Insurance",
      "Homeowners Insurance",
      "Umbrella Policies",
      "Risk Management"
    ],
    "Social Security": [
      "Claiming Strategies",
      "Spousal Benefits",
      "Survivor Benefits",
      "Medicare Planning"
    ],
    "Estate Planning": [
      "Will Preparation",
      "Trust Planning",
      "Power of Attorney",
      "Estate Tax Planning"
    ],
    "Business Planning": [
      "Business Structure",
      "Succession Planning",
      "Key Person Insurance",
      "Buy-Sell Agreements"
    ],
    "Charitable Planning": [
      "Charitable Giving Strategies",
      "Donor Advised Funds",
      "Charitable Trusts",
      "Tax Benefits of Giving"
    ]
  };

  const clientInteractionForms = [
    "Agenda for Discussion",
    "Beneficiary Audit Checklist",
    "Business Events Checklist",
    "Business Owner Planning Needs",
    "Client Referral",
    "Divorce Checklist",
    "Financial Review Checklist",
    "Life Events Checklist",
    "Planning Task List",
    "Receipt for Documents"
  ];

  const worksheets = [
    "Business Valuation",
    "Capital Needs Analysis Worksheet",
    "Federal Estate Tax Worksheet",
    "Odds of Disability",
    "Personal Alternative Minimum Tax",
    "The Personal Budget Worksheet",
    "Personal Net Worth",
    "Taxation of Social Security Benefits",
    "The Real Rate of Return Worksheet",
    "When to Refinance Your Home"
  ];

  const advisorSupportData = {
    "Planning Tools Reference": [
      "Calculation Methods",
      "Software Guides",
      "Best Practices",
      "Industry Standards"
    ]
  };

  const renderFolder = (name: string, items: string[], folderId: string) => {
    const isOpen = openFolders[folderId];
    
    return (
      <Collapsible key={folderId} open={isOpen} onOpenChange={() => toggleFolder(folderId)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 p-2 h-auto hover:bg-blue-50 transition-all duration-200"
          >
            {isOpen ? (
              <FolderOpen className="h-4 w-4 text-blue-600" />
            ) : (
              <Folder className="h-4 w-4 text-blue-600" />
            )}
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500 transition-transform duration-200" />
            )}
            <span className="font-medium">{name}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="transition-all duration-300 ease-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="ml-6 space-y-1 border-l border-gray-200 pl-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded transition-colors duration-150">
                <Checkbox
                  id={`${folderId}-${index}`}
                  checked={selectedReports.includes(`${folderId}-${index}`)}
                  onCheckedChange={(checked) => handleReportSelect(`${folderId}-${index}`, checked as boolean)}
                />
                <FileText className="h-3 w-3 text-gray-400" />
                <label 
                  htmlFor={`${folderId}-${index}`}
                  className="text-sm cursor-pointer select-none"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const renderSimpleList = (items: string[], prefix: string) => {
    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors duration-150">
            <Checkbox
              id={`${prefix}-${index}`}
              checked={selectedReports.includes(`${prefix}-${index}`)}
              onCheckedChange={(checked) => handleReportSelect(`${prefix}-${index}`, checked as boolean)}
            />
            <FileText className="h-4 w-4 text-gray-400" />
            <label 
              htmlFor={`${prefix}-${index}`}
              className="text-sm cursor-pointer select-none"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    );
  };

  const tabs = [
    { label: "Reports Library", value: "reports-library" },
    { label: "Client Interaction Forms", value: "client-forms" },
    { label: "Worksheets", value: "worksheets" },
    { label: "Advisor Support", value: "advisor-support" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Education & Resources</h1>
            <p className="text-gray-600">Access comprehensive financial planning resources and educational materials</p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <AnimatedTabs 
                tabs={tabs}
                defaultValue="reports-library"
                onValueChange={setActiveTab}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              {activeTab === "reports-library" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Reports Library</h2>
                  <div className="grid gap-2">
                    {Object.entries(reportsLibraryData).map(([folder, items]) =>
                      renderFolder(folder, items, `reports-${folder.replace(/\s+/g, '-').toLowerCase()}`)
                    )}
                  </div>
                </div>
              )}

              {activeTab === "client-forms" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Client Interaction Forms</h2>
                  {renderSimpleList(clientInteractionForms, "client-forms")}
                </div>
              )}

              {activeTab === "worksheets" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Worksheets</h2>
                  {renderSimpleList(worksheets, "worksheets")}
                </div>
              )}

              {activeTab === "advisor-support" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Advisor Support</h2>
                  <div className="grid gap-2">
                    {Object.entries(advisorSupportData).map(([folder, items]) =>
                      renderFolder(folder, items, `advisor-${folder.replace(/\s+/g, '-').toLowerCase()}`)
                    )}
                  </div>
                </div>
              )}
            </div>

            {selectedReports.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">
                  {selectedReports.length} report{selectedReports.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Generate Selected Reports
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedReports([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
