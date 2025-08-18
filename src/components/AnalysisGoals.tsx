import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FolderOpen, CreditCard, GraduationCap, Plane } from "lucide-react";

interface AnalysisGoalsProps {
  onBack: () => void;
}

const goalOptions = [
  { id: "accumulation-funding", label: "Accumulation Funding", checked: true },
  { id: "retirement", label: "Retirement", checked: true },
  { id: "education-funding", label: "Education Funding", checked: true },
  { id: "debt-repayment", label: "Debt Repayment", checked: true }
];

const timelineGoals = [
  {
    year: "2026",
    ages: "42/40",
    title: "6 Month Emergency Fund",
    icon: FolderOpen,
    category: "short-term",
    color: "text-yellow-600"
  },
  {
    year: "2028",
    ages: "44/42",
    title: "Kauai Vacation",
    icon: FolderOpen,
    category: "short-term",
    color: "text-yellow-600"
  },
  {
    year: "2028",
    ages: "44/42",
    title: "Debt Free Date",
    icon: CreditCard,
    category: "debt-free",
    color: "text-orange-600"
  },
  {
    year: "2039",
    ages: "55/53",
    title: "College - Catherine",
    icon: GraduationCap,
    category: "education",
    color: "text-blue-600"
  },
  {
    year: "2051",
    ages: "67/65",
    title: "Retirement - Paul",
    icon: Plane,
    category: "retirement",
    color: "text-green-600"
  },
  {
    year: "2053",
    ages: "69/67",
    title: "Retirement - Sally",
    icon: Plane,
    category: "retirement",
    color: "text-green-600"
  }
];

export const AnalysisGoals = ({ onBack }: AnalysisGoalsProps) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "accumulation-funding",
    "retirement",
    "education-funding",
    "debt-repayment"
  ]);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700 bg-background">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Goals
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Analysis Goals</h1>
          <p className="text-gray-600">Review your financial goals timeline</p>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Goal Selection */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-background p-6 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Needs Analysis</CardTitle>
              <p className="text-sm text-gray-600">Select to Apply:</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-sm text-gray-700">
                  This report is automatically generated based on your inputs in the below needs 
                  analysis. Select which areas of planning you would like to include in the Goals report:
                </p>
                
                <div className="space-y-4">
                  {goalOptions.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={goal.id}
                        checked={selectedGoals.includes(goal.id)}
                        onCheckedChange={() => handleGoalToggle(goal.id)}
                      />
                      <label htmlFor={goal.id} className="cursor-pointer font-medium">
                        {goal.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Timeline */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Card>
            <CardHeader>
              <CardTitle>Goals Timeline</CardTitle>
              <p className="text-sm text-gray-600">
                Reviewing your goals is a key step in making sure the action plan is on the right course. 
                Listed below is a timeline of the goals we have identified as important to you, along with 
                the age(s) that each will occur.
              </p>
            </CardHeader>
            <CardContent>
              {/* Category Legend */}
              <div className="flex flex-wrap gap-6 mb-8 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">Short-term</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Retirement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-600">Debt Free</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                
                <div className="space-y-8">
                  {timelineGoals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-6">
                      {/* Year and Ages */}
                      <div className="w-20 text-right">
                        <div className="text-xl font-bold text-gray-900">{goal.year}</div>
                        <div className="text-sm text-gray-600">{goal.ages}</div>
                      </div>
                      
                      {/* Icon */}
                      <div className={`relative z-10 p-2 bg-white border-2 border-gray-300 rounded-full ${goal.color}`}>
                        <goal.icon className="h-6 w-6" />
                      </div>
                      
                      {/* Goal Title */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};