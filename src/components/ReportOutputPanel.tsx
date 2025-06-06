
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Presentation, Eye } from "lucide-react";

interface ReportOutputPanelProps {
  selectedTopic: string;
}

const reportTypes: Record<string, string[]> = {
  "retirement-accumulation": ["Retirement Analysis", "Capital Available", "Alternatives", "Timeline"],
  "retirement-distribution": ["Distribution Strategy", "Income Sources", "Tax Impact", "Withdrawal Timeline"],
  "social-security": ["Claiming Strategy", "Benefit Analysis", "Spousal Benefits", "Break-Even Analysis"],
  "survivor-needs": ["Life Insurance Needs", "Coverage Gap", "Cost Comparison", "Beneficiary Analysis"],
  "disability": ["Income Replacement", "Coverage Analysis", "Premium Comparison", "Benefit Period"],
  "critical-illness": ["Coverage Assessment", "Benefit Options", "Cost Analysis", "Risk Factors"],
  "long-term-care": ["Care Cost Projection", "Insurance Options", "Self-Funding Analysis", "Care Planning"],
  "education-funding": ["529 Plan Analysis", "Savings Strategy", "Cost Projection", "Tax Benefits"],
  "asset-allocation": ["Portfolio Analysis", "Risk Assessment", "Rebalancing Strategy", "Performance Projection"],
  "estate-analysis": ["Estate Tax Planning", "Trust Analysis", "Wealth Transfer", "Tax Strategies"],
  "charitable-trust": ["CRT Analysis", "Tax Benefits", "Income Stream", "Remainder Calculation"],
  "accumulation-funding": ["Savings Plan", "Investment Strategy", "Goal Progress", "Timeline Analysis"],
  "business-continuation": ["Buy-Sell Agreement", "Valuation Methods", "Funding Options", "Tax Implications"],
  "business-valuation": ["Valuation Report", "Market Analysis", "Financial Projections", "Risk Assessment"],
  "key-employee": ["Retention Strategy", "Compensation Analysis", "Insurance Needs", "Succession Planning"],
  "personal-finance": ["Cash Flow Analysis", "Net Worth Statement", "Budget Planning", "Goal Setting"],
  "debt-repayment": ["Debt Consolidation", "Payment Strategy", "Interest Savings", "Payoff Timeline"],
  "summary": ["Financial Overview", "Planning Priorities", "Action Items", "Progress Tracking"]
};

export const ReportOutputPanel = ({ selectedTopic }: ReportOutputPanelProps) => {
  const reports = reportTypes[selectedTopic] || [];

  const handlePreviewReport = (reportType: string) => {
    console.log(`Previewing ${reportType} for ${selectedTopic}`);
  };

  const handleExportPDF = (reportType: string) => {
    console.log(`Exporting ${reportType} as PDF for ${selectedTopic}`);
  };

  const handleAddToPresentation = (reportType: string) => {
    console.log(`Adding ${reportType} to presentation for ${selectedTopic}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Report Actions</h3>
        <Badge variant="outline" className="text-xs">
          {reports.length} reports available
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {reports.map((reportType, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm text-gray-900">{reportType}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handlePreviewReport(reportType)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleExportPDF(reportType)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToPresentation(reportType)}
                >
                  <Presentation className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <Card className="border-dashed border-2 border-gray-200">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Select an analysis topic</p>
            <p className="text-sm text-gray-400">Choose a topic to view available reports</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
