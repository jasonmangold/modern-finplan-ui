
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, GraduationCap, Home, Car, PiggyBank } from "lucide-react";
import { useState } from "react";
import { GoalInputPanel } from "./GoalInputPanel";
import { GoalOutputPanel } from "./GoalOutputPanel";

const goalConfigs = {
  college: {
    title: "College Planning",
    icon: GraduationCap,
    color: "text-blue-600",
    outputs: ["Funding Strategy", "529 Plan Analysis", "Tax Benefits", "Timeline Projections"]
  },
  retirement: {
    title: "Retirement Planning",
    icon: PiggyBank,
    color: "text-green-600",
    outputs: ["Accumulation Analysis", "Withdrawal Strategy", "Social Security Optimization", "Tax Planning"]
  },
  home: {
    title: "Home Purchase",
    icon: Home,
    color: "text-orange-600",
    outputs: ["Affordability Analysis", "Down Payment Strategy", "Mortgage Comparison", "Timeline Planning"]
  },
  "debt-payoff": {
    title: "Debt Payoff",
    icon: Car,
    color: "text-red-600",
    outputs: ["Payoff Strategy", "Consolidation Options", "Interest Savings", "Cash Flow Impact"]
  }
};

interface GoalDetailViewProps {
  goalId: string;
  onBack: () => void;
}

export const GoalDetailView = ({ goalId, onBack }: GoalDetailViewProps) => {
  const [selectedOutput, setSelectedOutput] = useState("Funding Strategy");
  
  const config = goalConfigs[goalId as keyof typeof goalConfigs] || goalConfigs.college;
  const IconComponent = config.icon;

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
              <p className="text-gray-600">Configure inputs and view analysis</p>
            </div>
          </div>
        </div>
        
        {/* Output Selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">View:</span>
          <Select value={selectedOutput} onValueChange={setSelectedOutput}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {config.outputs.map((output) => (
                <SelectItem key={output} value={output}>
                  {output}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content with proper padding */}
      <div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden">
        {/* Left Panel - Inputs */}
        <div className="overflow-y-auto">
          <GoalInputPanel goalId={goalId} />
        </div>

        {/* Right Panel - Outputs */}
        <div className="overflow-y-auto">
          <GoalOutputPanel goalId={goalId} outputType={selectedOutput} />
        </div>
      </div>
    </div>
  );
};
