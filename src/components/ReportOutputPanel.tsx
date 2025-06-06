
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Presentation, 
  Share2, 
  Eye, 
  Plus,
  Settings,
  BarChart3
} from "lucide-react";

interface ReportOutputPanelProps {
  selectedTopic: string;
}

const reportOptions: Record<string, { label: string; description: string }[]> = {
  "retirement-accumulation": [
    { label: "Retirement Analysis", description: "Comprehensive retirement readiness report" },
    { label: "Capital Available", description: "Available capital at retirement" },
    { label: "Alternatives", description: "Alternative scenarios and strategies" },
    { label: "Timeline", description: "Year-by-year accumulation timeline" }
  ],
  "retirement-distribution": [
    { label: "Income Analysis", description: "Retirement income sustainability" },
    { label: "Withdrawal Strategy", description: "Optimal withdrawal approach" },
    { label: "Tax Efficiency", description: "Tax-efficient distribution planning" },
    { label: "Longevity Analysis", description: "Income through life expectancy" }
  ],
  "asset-allocation": [
    { label: "Portfolio Analysis", description: "Current vs. recommended allocation" },
    { label: "Risk Assessment", description: "Risk-return analysis" },
    { label: "Rebalancing Plan", description: "Step-by-step rebalancing guide" }
  ],
  "education-funding": [
    { label: "Funding Analysis", description: "Education cost vs. savings projection" },
    { label: "Savings Strategy", description: "Optimal savings approach" },
    { label: "Tax Benefits", description: "529 and tax-advantaged strategies" }
  ],
  "survivor-needs": [
    { label: "Needs Analysis", description: "Life insurance needs calculation" },
    { label: "Coverage Gap", description: "Current vs. required coverage" },
    { label: "Product Comparison", description: "Term vs. permanent insurance options" }
  ]
};

export const ReportOutputPanel = ({ selectedTopic }: ReportOutputPanelProps) => {
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [addToPresentation, setAddToPresentation] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const currentReportOptions = reportOptions[selectedTopic] || [];

  const handleAddReport = () => {
    if (selectedReport && !selectedReports.includes(selectedReport)) {
      setSelectedReports([...selectedReports, selectedReport]);
      setSelectedReport("");
    }
  };

  const handleRemoveReport = (report: string) => {
    setSelectedReports(selectedReports.filter(r => r !== report));
  };

  return (
    <div className="h-full">
      <Card className="h-full border-0 shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Report Outputs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Selection */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Select Report Type</Label>
              <div className="flex gap-2 mt-2">
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Choose report..." />
                  </SelectTrigger>
                  <SelectContent>
                    {currentReportOptions.map((option) => (
                      <SelectItem key={option.label} value={option.label}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleAddReport}
                  disabled={!selectedReport}
                  size="icon"
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Selected Reports */}
            {selectedReports.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Selected Reports</Label>
                <div className="space-y-2">
                  {selectedReports.map((report) => (
                    <div key={report} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">{report}</span>
                        <Badge variant="secondary" className="text-xs">Ready</Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveReport(report)}
                        className="h-6 w-6 p-0 hover:bg-blue-100"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Output Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="add-presentation" 
                  checked={addToPresentation}
                  onCheckedChange={setAddToPresentation}
                />
                <Label htmlFor="add-presentation" className="text-sm">Add to Client Presentation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-assumptions" defaultChecked />
                <Label htmlFor="include-assumptions" className="text-sm">Include Assumptions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="executive-summary" defaultChecked />
                <Label htmlFor="executive-summary" className="text-sm">Executive Summary</Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={selectedReports.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Generate PDF Report
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" disabled={selectedReports.length === 0}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button variant="outline" size="sm" disabled={selectedReports.length === 0}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>

            {addToPresentation && (
              <Button variant="outline" className="w-full" disabled={selectedReports.length === 0}>
                <Presentation className="h-4 w-4 mr-2" />
                Add to Presentation
              </Button>
            )}
          </div>

          {/* Report Settings */}
          <div className="pt-4 border-t border-gray-100">
            <Button variant="ghost" size="sm" className="w-full text-gray-600">
              <Settings className="h-4 w-4 mr-2" />
              Report Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
