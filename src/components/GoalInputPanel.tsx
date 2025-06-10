
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, Target, DollarSign, Calendar } from "lucide-react";
import { EducationFundingInputs } from "./EducationFundingInputs";
import { RetirementAccumulationInputs } from "./RetirementAccumulationInputs";
import { SurvivorNeedsInputs } from "./SurvivorNeedsInputs";

interface GoalInputPanelProps {
  goalId: string;
}

export const GoalInputPanel = ({ goalId }: GoalInputPanelProps) => {
  const renderCollegeInputs = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-blue-600" />
            Education Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Number of Children</Label>
              <Input defaultValue="2" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Years Until College</Label>
              <Input defaultValue="10" className="mt-1" />
            </div>
          </div>
          
          <div>
            <Label className="text-sm">School Type</Label>
            <Select defaultValue="public">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public In-State</SelectItem>
                <SelectItem value="public-out">Public Out-of-State</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm">Current Annual Cost</Label>
            <Input defaultValue="$25,000" className="mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
            Current Savings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">529 Plan Balance</Label>
            <Input defaultValue="$50,000" className="mt-1" />
          </div>
          
          <div>
            <Label className="text-sm">Monthly Contribution</Label>
            <Input defaultValue="$500" className="mt-1" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Coverage Goal</Label>
            <Slider defaultValue={[75]} max={100} step={5} className="mt-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderRetirementInputs = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-green-600" />
            Retirement Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Current Age</Label>
              <Input defaultValue="40" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Retirement Age</Label>
              <Input defaultValue="67" className="mt-1" />
            </div>
          </div>
          
          <div>
            <Label className="text-sm">Life Expectancy</Label>
            <Input defaultValue="90" className="mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Financial Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">Current Income</Label>
            <Input defaultValue="$150,000" className="mt-1" />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">Income Replacement</Label>
            <Slider defaultValue={[80]} max={100} step={5} className="mt-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>60%</span>
              <span>80%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <Label className="text-sm">Current Retirement Savings</Label>
            <Input defaultValue="$500,000" className="mt-1" />
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderDefaultInputs = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-gray-600" />
          Goal Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm">Target Amount</Label>
          <Input placeholder="Enter target amount" className="mt-1" />
        </div>
        
        <div>
          <Label className="text-sm">Time Horizon (years)</Label>
          <Input placeholder="Enter time horizon" className="mt-1" />
        </div>

        <div>
          <Label className="text-sm">Monthly Contribution</Label>
          <Input placeholder="Enter monthly amount" className="mt-1" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {goalId === "education-funding" && <EducationFundingInputs />}
      {goalId === "retirement-accumulation" && <RetirementAccumulationInputs />}
      {goalId === "retirement" && <RetirementAccumulationInputs />}
      {goalId === "survivor-needs" && <SurvivorNeedsInputs />}
      {goalId === "college" && (
        <>
          <div>
            <h2 className="text-xl font-semibold mb-2">Input Parameters</h2>
            <p className="text-gray-600">Configure the specific inputs for this goal</p>
          </div>
          {renderCollegeInputs()}
        </>
      )}
      {(goalId !== "college" && goalId !== "retirement" && goalId !== "education-funding" && goalId !== "retirement-accumulation" && goalId !== "survivor-needs") && (
        <>
          <div>
            <h2 className="text-xl font-semibold mb-2">Input Parameters</h2>
            <p className="text-gray-600">Configure the specific inputs for this goal</p>
          </div>
          {renderDefaultInputs()}
        </>
      )}
    </div>
  );
};
