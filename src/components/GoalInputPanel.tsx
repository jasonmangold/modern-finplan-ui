import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, Target, DollarSign, Calendar, HelpCircle } from "lucide-react";
import { EducationFundingInputs } from "./EducationFundingInputs";
import { RetirementAccumulationInputs } from "./RetirementAccumulationInputs";
import { SurvivorNeedsInputs } from "./SurvivorNeedsInputs";
import { RetirementDistributionInputs } from "./RetirementDistributionInputs";
import { SocialSecurityInputs } from "./SocialSecurityInputs";
import { DisabilityInputs } from "./DisabilityInputs";
import { DebtRepaymentInputs } from "./DebtRepaymentInputs";
import { CriticalIllnessInputs } from "./CriticalIllnessInputs";
import { LongTermCareInputs } from "./LongTermCareInputs";
import { EstateAnalysisInputs } from "./EstateAnalysisInputs";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";

interface GoalInputPanelProps {
  goalId: string;
}

export const GoalInputPanel = ({ goalId }: GoalInputPanelProps) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };
  const renderCollegeInputs = () => (
    <div className="space-y-4">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Target className="h-4 w-4 text-primary" />
            Education Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Number of Children</Label>
              <Input defaultValue="2" className="mt-1.5 h-9" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Years Until College</Label>
              <Input defaultValue="10" className="mt-1.5 h-9" />
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-foreground">School Type</Label>
            <Select defaultValue="public">
              <SelectTrigger className="mt-1.5 h-9">
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
            <Label className="text-sm font-medium text-foreground">Current Annual Cost</Label>
            <Input defaultValue="$25,000" className="mt-1.5 h-9" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <DollarSign className="h-4 w-4 text-primary" />
            Current Savings
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground">529 Plan Balance</Label>
            <Input defaultValue="$50,000" className="mt-1.5 h-9" />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-foreground">Monthly Contribution</Label>
            <Input defaultValue="$500" className="mt-1.5 h-9" />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Coverage Goal</Label>
            <Slider defaultValue={[75]} max={100} step={5} className="mt-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Calculator className="h-4 w-4 text-primary" />
          Goal Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div>
          <Label className="text-sm font-medium text-foreground">Target Amount</Label>
          <Input placeholder="Enter target amount" className="mt-1.5 h-9" />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-foreground">Time Horizon (years)</Label>
          <Input placeholder="Enter time horizon" className="mt-1.5 h-9" />
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Monthly Contribution</Label>
          <Input placeholder="Enter monthly amount" className="mt-1.5 h-9" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {goalId === "education-funding" && <EducationFundingInputs />}
      {goalId === "retirement-accumulation" && <RetirementAccumulationInputs />}
      {goalId === "retirement" && <RetirementAccumulationInputs />}
      {goalId === "survivor-needs" && <SurvivorNeedsInputs />}
      {goalId === "retirement-distribution" && <RetirementDistributionInputs />}
      {goalId === "social-security" && <SocialSecurityInputs />}
      {goalId === "disability" && <DisabilityInputs />}
      {goalId === "debt-repayment" && <DebtRepaymentInputs />}
      {goalId === "critical-illness" && <CriticalIllnessInputs />}
      {goalId === "long-term-care" && <LongTermCareInputs />}
      {goalId === "estate-analysis" && <EstateAnalysisInputs />}
      {goalId === "college" && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-foreground">Analysis Inputs</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHelpClick}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground p-1 h-auto"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
          {renderCollegeInputs()}
          <HelpDialog
            isOpen={isHelpOpen}
            onClose={() => setIsHelpOpen(false)}
            sections={getHelpText(goalId)}
            title="College Planning Help"
          />
        </>
      )}
      {(goalId !== "college" && goalId !== "retirement" && goalId !== "education-funding" && goalId !== "retirement-accumulation" && goalId !== "survivor-needs" && goalId !== "retirement-distribution" && goalId !== "social-security" && goalId !== "disability" && goalId !== "debt-repayment" && goalId !== "critical-illness" && goalId !== "long-term-care" && goalId !== "estate-analysis") && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-foreground">Analysis Inputs</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHelpClick}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground p-1 h-auto"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
          {renderDefaultInputs()}
          <HelpDialog
            isOpen={isHelpOpen}
            onClose={() => setIsHelpOpen(false)}
            sections={getHelpText(goalId)}
            title="Analysis Input Help"
          />
        </>
      )}
    </div>
  );
};
