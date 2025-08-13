import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, FileText, FolderOpen, Folder, ArrowLeft } from "lucide-react";

interface FactFindersProps {
  onBack: () => void;
}

const fillablePDFReports = [
  "Retirement",
  "Life Insurance", 
  "College",
  "Disability",
  "Long-Term Care",
  "Personal Finance"
];

const printablePDFReports = [
  "Education Funding",
  "Survivor Needs",
  "Retirement Accumulation",
  "Retirement Distribution",
  "Social Security",
  "Disability",
  "Critical Illness",
  "Long-Term Care",
  "Estate Analysis",
  "Accumulation Funding",
  "Asset Allocation",
  "Charitable Remainder Trust",
  "Personal Finance",
  "Debt Repayment",
  "Business Continuation",
  "Business Valuation",
  "Key Employee"
];

export const FactFinders = ({ onBack }: FactFindersProps) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>("");

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleReportClick = (reportName: string) => {
    setSelectedReport(reportName);
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Folder Structure */}
      <div className="w-1/3 border-r border-border bg-background p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Fact Finders</h2>
        </div>

        <div className="space-y-2">
          {/* Fillable PDF's Folder */}
          <Collapsible 
            open={expandedFolders.includes("fillable")}
            onOpenChange={() => toggleFolder("fillable")}
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 hover:bg-muted"
              >
                {expandedFolders.includes("fillable") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                {expandedFolders.includes("fillable") ? (
                  <FolderOpen className="h-4 w-4" />
                ) : (
                  <Folder className="h-4 w-4" />
                )}
                Fillable PDF's
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 space-y-1">
              {/* Client Friendly Subfolder */}
              <Collapsible 
                open={expandedFolders.includes("client-friendly")}
                onOpenChange={() => toggleFolder("client-friendly")}
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start gap-2 hover:bg-muted"
                  >
                    {expandedFolders.includes("client-friendly") ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                    {expandedFolders.includes("client-friendly") ? (
                      <FolderOpen className="h-3 w-3" />
                    ) : (
                      <Folder className="h-3 w-3" />
                    )}
                    Client Friendly
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                  {fillablePDFReports.map((report) => (
                    <Button
                      key={`client-${report}`}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-sm hover:bg-muted"
                      onClick={() => handleReportClick(`Client Friendly - ${report}`)}
                    >
                      <FileText className="h-3 w-3" />
                      {report}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Standard Subfolder */}
              <Collapsible 
                open={expandedFolders.includes("standard")}
                onOpenChange={() => toggleFolder("standard")}
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start gap-2 hover:bg-muted"
                  >
                    {expandedFolders.includes("standard") ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                    {expandedFolders.includes("standard") ? (
                      <FolderOpen className="h-3 w-3" />
                    ) : (
                      <Folder className="h-3 w-3" />
                    )}
                    Standard
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                  {fillablePDFReports.map((report) => (
                    <Button
                      key={`standard-${report}`}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-sm hover:bg-muted"
                      onClick={() => handleReportClick(`Standard - ${report}`)}
                    >
                      <FileText className="h-3 w-3" />
                      {report}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>

          {/* Printable PDF's Folder */}
          <Collapsible 
            open={expandedFolders.includes("printable")}
            onOpenChange={() => toggleFolder("printable")}
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 hover:bg-muted"
              >
                {expandedFolders.includes("printable") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                {expandedFolders.includes("printable") ? (
                  <FolderOpen className="h-4 w-4" />
                ) : (
                  <Folder className="h-4 w-4" />
                )}
                Printable PDF's
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 space-y-1">
              {printablePDFReports.map((report) => (
                <Button
                  key={`printable-${report}`}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-sm hover:bg-muted"
                  onClick={() => handleReportClick(`Printable - ${report}`)}
                >
                  <FileText className="h-3 w-3" />
                  {report}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Right Panel - PDF Viewer */}
      <div className="flex-1 p-6">
        <Card className="h-full">
          <CardContent className="h-full p-6">
            {selectedReport ? (
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{selectedReport}</h3>
                  <p className="text-sm text-muted-foreground">PDF Report</p>
                </div>
                <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">PDF Viewer Placeholder</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedReport} will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Select a Report</p>
                  <p className="text-sm text-muted-foreground">
                    Choose a report from the folder structure to view it here
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};