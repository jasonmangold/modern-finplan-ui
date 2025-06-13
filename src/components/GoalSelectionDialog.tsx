
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface GoalSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoalsSelected: (goals: string[]) => void;
}

const availableGoals = [
  { id: "retirement", label: "Retirement Planning", description: "Plan for retirement income and savings" },
  { id: "education", label: "Education Funding", description: "Save for children's education expenses" },
  { id: "insurance", label: "Insurance Planning", description: "Life and disability insurance analysis" },
  { id: "estate", label: "Estate Planning", description: "Wealth transfer and estate tax planning" },
  { id: "tax", label: "Tax Planning", description: "Tax optimization strategies" },
  { id: "investment", label: "Investment Planning", description: "Portfolio analysis and recommendations" },
  { id: "debt", label: "Debt Management", description: "Debt reduction and management strategies" },
  { id: "emergency", label: "Emergency Fund", description: "Emergency savings planning" }
];

export const GoalSelectionDialog = ({ open, onOpenChange, onGoalsSelected }: GoalSelectionDialogProps) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      onGoalsSelected(selectedGoals);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Select Financial Goals</DialogTitle>
          <p className="text-gray-600">Choose the financial planning topics you want to include in your Fast Track presentation.</p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {availableGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedGoals.includes(goal.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleGoalToggle(goal.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={goal.id}
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                />
                <div className="flex-1">
                  <Label htmlFor={goal.id} className="font-medium cursor-pointer">
                    {goal.label}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={selectedGoals.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue ({selectedGoals.length} selected)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
