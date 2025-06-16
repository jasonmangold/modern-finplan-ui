
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, GraduationCap, Home, Car, PiggyBank, Shield, Check } from "lucide-react";
import { useState } from "react";
import { GoalInputPanel } from "./GoalInputPanel";
import { GoalOutputPanel } from "./GoalOutputPanel";
import { RetirementAnalysisOutput } from "./RetirementAnalysisOutput";
import { usePresentationSelection } from "@/hooks/usePresentationSelection";

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
    outputs: [
      "Retirement Analysis",
      "Retirement Social Security Optimizer", 
      "Capital Available for Retirement",
      "Achieving Your Retirement Goals",
      "Alternatives to Achieving Retirement Goals",
      "Retirement Timeline",
      "Retirement Analysis Detail",
      "Progress Toward Retirement Goals",
      "Retirement Needs Analysis Data- Fact Finder"
    ],
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
    outputs: ["Funding Strategy", "Savings Analysis", "Tax Benefits", "Timeline Projections"],
    defaultOutput: "Funding Strategy"
  },
  "survivor-needs": {
    title: "Survivor Needs Analysis",
    icon: Shield,
    color: "text-red-600",
    description: "Analyze insurance needs for survivors",
    outputs: ["Life Insurance Analysis", "Income Replacement", "Capital Needs", "Timeline Projections"],
    defaultOutput: "Life Insurance Analysis"
  }
};

interface GoalDetailViewProps {
  goalId: string;
  onBack: () => void;
}

export const GoalDetailView = ({
  goalId,
  onBack
}: GoalDetailViewProps) => {
  const config = goalConfigs[goalId as keyof typeof goalConfigs] || goalConfigs.college;
  const [selectedOutput, setSelectedOutput] = useState(config.defaultOutput);
  const { toggleReport, isSelected, getSelectedCount } = usePresentationSelection();
  const IconComponent = config.icon;

  const handlePresentationToggle = (outputType: string) => {
    toggleReport(goalId, outputType);
  };

  const selectedCount = getSelectedCount();

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Goals
          </Button>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gray-100 ${config.color}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{config.title}</h1>
              <p className="text-gray-600">{config.description}</p>
            </div>
          </div>
        </div>
        
        {/* View & Present Selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">View & Present:</span>
          <Select value={selectedOutput} onValueChange={setSelectedOutput}>
            <SelectTrigger className="w-80">
              <div className="flex items-center justify-between w-full">
                <SelectValue />
                {selectedCount > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    {selectedCount} selected
                  </span>
                )}
              </div>
            </SelectTrigger>
            <SelectContent>
              {config.outputs.map(output => (
                <div key={output} className="flex items-center justify-between px-2 py-1.5">
                  <SelectItem value={output} className="flex-1 cursor-pointer">
                    {output}
                  </SelectItem>
                  <div className="flex items-center gap-2 ml-2">
                    <Checkbox
                      checked={isSelected(goalId, output)}
                      onCheckedChange={() => handlePresentationToggle(output)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {isSelected(goalId, output) && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content with 40/60 split */}
      <div className="flex-1 grid grid-cols-5 gap-6 overflow-hidden">
        {/* Left Panel - Inputs (40% - 2 columns) */}
        <div className="col-span-2 overflow-y-auto">
          <GoalInputPanel goalId={goalId} />
        </div>

        {/* Right Panel - Outputs (60% - 3 columns) */}
        <div className="col-span-3 overflow-y-auto">
          {goalId === "retirement-accumulation" && selectedOutput === "Retirement Analysis" ? (
            <RetirementAnalysisOutput selectedForPresentation={[]} />
          ) : (
            <GoalOutputPanel goalId={goalId} outputType={selectedOutput} />
          )}
        </div>
      </div>
    </div>
  );
};
