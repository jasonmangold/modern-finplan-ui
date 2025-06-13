
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface FastTrackInputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedGoals: string[];
  onCreatePresentation: () => void;
  onBack: () => void;
}

const goalInputs = {
  retirement: [
    { id: "currentAge", label: "Current Age", type: "number" },
    { id: "retirementAge", label: "Desired Retirement Age", type: "number" },
    { id: "currentSavings", label: "Current Retirement Savings", type: "number" },
    { id: "monthlyContribution", label: "Monthly Contribution", type: "number" }
  ],
  education: [
    { id: "childAge", label: "Child's Current Age", type: "number" },
    { id: "collegeAge", label: "Age Starting College", type: "number" },
    { id: "educationCost", label: "Estimated Annual College Cost", type: "number" },
    { id: "currentEducationSavings", label: "Current Education Savings", type: "number" }
  ],
  insurance: [
    { id: "annualIncome", label: "Annual Income", type: "number" },
    { id: "currentLifeInsurance", label: "Current Life Insurance", type: "number" },
    { id: "dependents", label: "Number of Dependents", type: "number" },
    { id: "monthlyExpenses", label: "Monthly Expenses", type: "number" }
  ],
  estate: [
    { id: "totalAssets", label: "Total Estate Value", type: "number" },
    { id: "estateTaxExemption", label: "Estate Tax Exemption", type: "number" },
    { id: "charitableGiving", label: "Annual Charitable Giving", type: "number" }
  ],
  tax: [
    { id: "grossIncome", label: "Gross Annual Income", type: "number" },
    { id: "taxableIncome", label: "Taxable Income", type: "number" },
    { id: "currentTaxRate", label: "Current Tax Bracket (%)", type: "number" }
  ],
  investment: [
    { id: "investmentGoal", label: "Investment Goal Amount", type: "number" },
    { id: "timeHorizon", label: "Time Horizon (Years)", type: "number" },
    { id: "riskTolerance", label: "Risk Tolerance (1-10)", type: "number" },
    { id: "currentPortfolio", label: "Current Portfolio Value", type: "number" }
  ],
  debt: [
    { id: "totalDebt", label: "Total Debt Amount", type: "number" },
    { id: "averageInterestRate", label: "Average Interest Rate (%)", type: "number" },
    { id: "monthlyDebtPayment", label: "Monthly Debt Payment", type: "number" }
  ],
  emergency: [
    { id: "monthlyExpenses", label: "Monthly Living Expenses", type: "number" },
    { id: "currentEmergencyFund", label: "Current Emergency Fund", type: "number" },
    { id: "targetMonths", label: "Target Months of Expenses", type: "number" }
  ]
};

const goalLabels = {
  retirement: "Retirement Planning",
  education: "Education Funding",
  insurance: "Insurance Planning",
  estate: "Estate Planning",
  tax: "Tax Planning",
  investment: "Investment Planning",
  debt: "Debt Management",
  emergency: "Emergency Fund"
};

export const FastTrackInputDialog = ({ open, onOpenChange, selectedGoals, onCreatePresentation, onBack }: FastTrackInputDialogProps) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues(prev => ({ ...prev, [inputId]: value }));
  };

  const handleCreatePresentation = () => {
    console.log("Creating presentation with inputs:", inputValues);
    onCreatePresentation();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold">Fast Track Input</DialogTitle>
          </div>
          <p className="text-gray-600">Enter the required information for your selected financial goals.</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {selectedGoals.map((goalId) => (
            <Card key={goalId}>
              <CardHeader>
                <CardTitle className="text-lg">{goalLabels[goalId as keyof typeof goalLabels]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goalInputs[goalId as keyof typeof goalInputs]?.map((input) => (
                    <div key={input.id}>
                      <Label htmlFor={input.id}>{input.label}</Label>
                      <Input
                        id={input.id}
                        type={input.type}
                        value={inputValues[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        placeholder={`Enter ${input.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreatePresentation}
            className="bg-green-600 hover:bg-green-700"
          >
            Create Presentation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
