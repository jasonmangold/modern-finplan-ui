import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, GraduationCap, Home, Car, PiggyBank, Shield, Check, PieChart, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { GoalInputPanel } from "./GoalInputPanel";
import { GoalOutputPanel } from "./GoalOutputPanel";
import { RetirementAnalysisOutput } from "./RetirementAnalysisOutput";
import { CapitalAvailableOutput } from "./CapitalAvailableOutput";
import { AlternativesToRetirementOutput } from "./AlternativesToRetirementOutput";
import { SurvivorNeedsOutput } from "./SurvivorNeedsOutput";
import { RetirementTimelineOutput } from "./RetirementTimelineOutput";
import { EducationFundingSummaryOutput } from "./EducationFundingSummaryOutput";
import { TotalNeedsSpendingOutput } from "./TotalNeedsSpendingOutput";
import { AssetAllocationComparisonOutput } from "./AssetAllocationComparisonOutput";
import { usePresentationContext } from "@/contexts/PresentationContext";
const goalConfigs = {
  college: {
    title: "College Planning",
    icon: GraduationCap,
    color: "text-blue-600",
    description: "Plan for higher education expenses",
    outputs: ["Funding Strategy", "529 Plan Analysis", "Tax Benefits", "Timeline Projections"],
    defaultOutput: "Funding Strategy"
  },
  retirement: {
    title: "Retirement Planning",
    icon: PiggyBank,
    color: "text-green-600",
    description: "Project retirement for clients who aren't at or near retirement age yet",
    outputs: ["Accumulation Analysis", "Withdrawal Strategy", "Social Security Optimization", "Tax Planning"],
    defaultOutput: "Accumulation Analysis"
  },
  "retirement-accumulation": {
    title: "Retirement Accumulation",
    icon: PiggyBank,
    color: "text-green-600",
    description: "Project retirement for clients who aren't at or near retirement age yet",
    outputs: ["Retirement Analysis", "Retirement Social Security Optimizer", "Capital Available for Retirement", "Achieving Your Retirement Goals", "Alternatives to Achieving Retirement Goals", "Retirement Timeline", "Retirement Analysis Detail", "Progress Toward Retirement Goals", "Retirement Needs Analysis Data- Fact Finder"],
    defaultOutput: "Retirement Analysis"
  },
  home: {
    title: "Home Purchase",
    icon: Home,
    color: "text-orange-600",
    description: "Plan for home purchase and financing",
    outputs: ["Affordability Analysis", "Down Payment Strategy", "Mortgage Comparison", "Timeline Planning"],
    defaultOutput: "Affordability Analysis"
  },
  "debt-payoff": {
    title: "Debt Payoff",
    icon: Car,
    color: "text-red-600",
    description: "Create debt elimination strategies",
    outputs: ["Payoff Strategy", "Consolidation Options", "Interest Savings", "Cash Flow Impact"],
    defaultOutput: "Payoff Strategy"
  },
  "education-funding": {
    title: "Education Funding",
    icon: GraduationCap,
    color: "text-purple-600",
    description: "Plan for education expenses and funding strategies",
    outputs: ["Education Funding Summary", "Education Funding Analysis - Child 1", "Education Funding Timeline - Child 1", "Education Funding Analysis - Child 2", "Education Funding Timeline - Child 2", "Education Funding Analysis - Child 3", "Education Funding Timeline - Child 3", "Education Funding Analysis - Child 4", "Education Funding Timeline - Child 4", "Education Funding Analysis - Child 5", "Education Funding Timeline - Child 5", "Progress Toward Education Goals", "Education Funding Analysis Data - Fact Finder"],
    defaultOutput: "Education Funding Summary"
  },
  "survivor-needs": {
    title: "Survivor Needs Analysis",
    icon: Shield,
    color: "text-red-600",
    description: "Analyze insurance needs for survivors",
    outputs: ["Survivor Needs - Client 1 dies", "Survivor's Immediate Needs - Client 1 dies", "Survivor Needs Timeline - Client 1 dies", "Survivor Analysis Detail - Client 1 dies", "Survivor Needs - Client 2 dies", "Survivor's Immediate Needs - Client 2 dies", "Survivor Needs Timeline - Client 2 dies", "Survivor Analysis Detail - Client 2 dies", "Survivor Needs Analysis Data - Fact Finder"],
    defaultOutput: "Survivor Needs - Client 1 dies"
  },
  "retirement-distribution": {
    title: "Retirement Distribution",
    icon: PiggyBank,
    color: "text-green-600",
    description: "Plan withdrawal strategies and income replacement during retirement years",
    outputs: [
      "You and Your Retirement",
      "Essential Needs and Secure Income", 
      "Essential Needs and Secure Income Timeline",
      "Essential Needs (Capital use)",
      "Essential Needs Timeline (Capital Use)",
      "Essential Needs and Secure Income With a new annuity",
      "Essential Needs and Secure Income Timeline (With annuity)",
      "Essential Needs (Capital Use with new annuity)",
      "Essential Needs Timeline (Capital Use with new annuity)",
      "Essential Needs and Secure Income Needs",
      "Essential Needs Timeline (Capital LTC)",
      "Total Needs Spending",
      "Retirement Timeline",
      "Retirement Distribution Analysis Data - Fact Finder"
    ],
    defaultOutput: "You and Your Retirement"
  },
  "asset-allocation": {
    title: "Asset Allocation",
    icon: PieChart,
    color: "text-indigo-600",
    description: "Analyze and optimize portfolio asset allocation",
    outputs: [
      "Current Allocation for Assets",
      "Recommended Allocation for Assets",
      "Asset Allocation Comparison",
      "Risk Tolerance Analysis",
      "Risk Tolerance Questionnaire",
      "Asset Allocation Data - Fact Finder"
    ],
    defaultOutput: "Current Allocation for Assets"
  },
  "critical-illness": {
    title: "Critical Illness",
    icon: Shield,
    color: "text-red-600",
    description: "Plan for financial impact of critical illness diagnosis",
    outputs: [
      "Coverage Assessment",
      "Benefit Options",
      "Cost Analysis",
      "Risk Factors"
    ],
    defaultOutput: "Coverage Assessment"
  },
  "long-term-care": {
    title: "Long-Term Care",
    icon: Shield,
    color: "text-purple-600",
    description: "Plan for long-term care needs and insurance options",
    outputs: [
      "Care Assessment",
      "Insurance Options",
      "Cost Projections",
      "Funding Strategies"
    ],
    defaultOutput: "Care Assessment"
  },
  "estate-analysis": {
    title: "Estate Analysis",
    icon: Shield,
    color: "text-indigo-600",
    description: "Analyze estate tax implications and planning strategies",
    outputs: [
      "Estate Tax Planning",
      "Trust Analysis", 
      "Wealth Transfer",
      "Tax Strategies"
    ],
    defaultOutput: "Estate Tax Planning"
  },
  "accumulation-funding": {
    title: "Accumulation Funding",
    icon: Target,
    color: "text-green-600",
    description: "Plan systematic saving and investment strategies for multiple goals",
    outputs: [
      "Savings Plan",
      "Investment Strategy", 
      "Goal Progress",
      "Timeline Analysis"
    ],
    defaultOutput: "Savings Plan"
  },
  "charitable-remainder-trust": {
    title: "Charitable Remainder Trust",
    icon: Shield,
    color: "text-blue-600",
    description: "Evaluate charitable remainder trust strategies for tax and legacy planning",
    outputs: [
      "CRT Analysis",
      "Tax Benefits",
      "Income Stream",
      "Remainder Calculation"
    ],
    defaultOutput: "CRT Analysis"
  },
  "personal-finance": {
    title: "Personal Finance",
    icon: Target,
    color: "text-green-600",
    description: "Comprehensive personal financial planning and analysis",
    outputs: [
      "Financial Summary",
      "Cash Flow Analysis",
      "Net Worth Statement",
      "Budget Planning"
    ],
    defaultOutput: "Financial Summary"
  },
  "business-continuation": {
    title: "Business Continuation",
    icon: Target,
    color: "text-orange-600",
    description: "Plan for business continuation and succession strategies",
    outputs: [
      "Business Valuation Analysis",
      "Four Ways to Pay Comparison",
      "Funding Strategy",
      "Succession Planning"
    ],
    defaultOutput: "Business Valuation Analysis"
  },
  "business-valuation": {
    title: "Business Valuation",
    icon: Target,
    color: "text-indigo-600",
    description: "Comprehensive business valuation analysis and projections",
    outputs: [
      "Valuation Summary",
      "Income Approach",
      "Asset Approach",
      "Market Approach"
    ],
    defaultOutput: "Valuation Summary"
  }
};
interface GoalDetailViewProps {
  goalId: string;
  onBack: () => void;
  initialReportView?: string | null;
}
export const GoalDetailView = ({
  goalId,
  onBack,
  initialReportView
}: GoalDetailViewProps) => {
  const config = goalConfigs[goalId as keyof typeof goalConfigs] || goalConfigs.college;
  
  // Map report view names to actual output names
  const reportViewMap: Record<string, string> = {
    'RetirementAnalysis': 'Retirement Analysis',
    'CapitalAvailable': 'Capital Available for Retirement',
    'AlternativesToRetirement': 'Alternatives to Achieving Retirement Goals',
    'RetirementTimeline': 'Retirement Timeline',
    'SurvivorNeeds': 'Survivor Needs - Client 1 dies',
    'EducationFunding': 'Education Funding Summary',
    'AssetAllocation': 'Asset Allocation Comparison'
  };
  
  const initialOutput = initialReportView && reportViewMap[initialReportView] 
    ? reportViewMap[initialReportView]
    : config.defaultOutput;
  
  const [selectedOutput, setSelectedOutput] = useState(initialOutput);
  const {
    addPresentationItem,
    removePresentationItem,
    presentationItems
  } = usePresentationContext();

  // Calculate which outputs are currently selected based on presentation items
  const selectedForPresentation = presentationItems.filter(item => config.outputs.includes(item.name)).map(item => item.name);
  const IconComponent = config.icon;
  const handlePresentationToggle = (outputType: string) => {
    const isCurrentlySelected = selectedForPresentation.includes(outputType);
    if (isCurrentlySelected) {
      // Remove from presentation
      const existingItem = presentationItems.find(item => item.name === outputType);
      if (existingItem) {
        removePresentationItem(existingItem.id);
      }
    } else {
      // Add to presentation
      const newItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        // More unique ID
        name: outputType,
        source: "Analysis" as const
      };
      addPresentationItem(newItem);
    }
  };
  return <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-card border-b border-border px-6 py-2 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 shrink-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Goals
          </Button>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg bg-muted ${config.color}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{config.title}</h1>
              <p className="text-muted-foreground text-sm">{config.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-background min-h-0">
        <div className="h-full grid grid-cols-5 gap-4 p-6">
          {/* Left Panel - Analysis Inputs */}
          <div className="col-span-2 h-full min-h-0">
            <Card className="h-full flex flex-col">
              
              <CardContent className="pt-0 flex-1 min-h-0 p-0">
                <div className="h-full max-h-[calc(100vh-240px)]">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <GoalInputPanel goalId={goalId} />
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Analysis Output */}
          <div className="col-span-3 h-full min-h-0">
            <div className="bg-card rounded-lg border border-border shadow-sm h-full flex flex-col">
              {/* Output Controls */}
              <div className="border-b border-border px-6 py-4 bg-muted/20 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">View:</span>
                  <Select value={selectedOutput} onValueChange={setSelectedOutput}>
                    <SelectTrigger className="w-96 bg-background border-input">
                      <SelectValue placeholder="Select view..." />
                      {selectedForPresentation.length > 0 && <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {selectedForPresentation.length} selected
                        </span>}
                    </SelectTrigger>
                    <SelectContent className="w-96 bg-popover border-border">
                      {config.outputs.map(output => (
                        <div key={output} className="relative flex items-center">
                          <SelectItem value={output} className="flex-1 pr-8 cursor-pointer">
                            <div className="flex items-center w-full">
                              <span className="truncate block max-w-[20rem]">{output}</span>
                            </div>
                          </SelectItem>
                          <div 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 flex-shrink-0" 
                            onMouseDown={e => {
                              e.preventDefault();
                              e.stopPropagation();
                            }} 
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePresentationToggle(output);
                            }}
                          >
                            <Checkbox 
                              checked={selectedForPresentation.includes(output)} 
                              onCheckedChange={() => handlePresentationToggle(output)}
                              className="flex-shrink-0" 
                            />
                          </div>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Output Content */}
              <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="p-6 h-full">
                    {goalId === "retirement-accumulation" && selectedOutput === "Retirement Analysis" ? (
                      <RetirementAnalysisOutput selectedForPresentation={selectedForPresentation} />
                    ) : goalId === "retirement-accumulation" && selectedOutput === "Capital Available for Retirement" ? (
                      <CapitalAvailableOutput selectedForPresentation={selectedForPresentation} />
                    ) : goalId === "retirement-accumulation" && selectedOutput === "Alternatives to Achieving Retirement Goals" ? (
                      <AlternativesToRetirementOutput selectedForPresentation={selectedForPresentation} />
                    ) : goalId === "retirement-accumulation" && selectedOutput === "Retirement Timeline" ? (
                      <RetirementTimelineOutput selectedForPresentation={selectedForPresentation} />
                    ) : goalId === "survivor-needs" && selectedOutput === "Survivor Needs - Client 1 dies" ? (
                      <SurvivorNeedsOutput selectedForPresentation={selectedForPresentation} />
                    ) : goalId === "education-funding" && selectedOutput === "Education Funding Summary" ? (
                      <EducationFundingSummaryOutput selectedForPresentation={selectedForPresentation} />
                    ) : goalId === "retirement-distribution" && selectedOutput === "Total Needs Spending" ? (
                      <TotalNeedsSpendingOutput selectedForPresentation={selectedForPresentation} />
                    ) : goalId === "asset-allocation" && selectedOutput === "Asset Allocation Comparison" ? (
                      <AssetAllocationComparisonOutput selectedForPresentation={selectedForPresentation} />
                    ) : (
                      <GoalOutputPanel goalId={goalId} outputType={selectedOutput} />
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};