import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Target, Settings, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "@/contexts/FormContext";

export const AccumulationFundingInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  const [selectedGoal, setSelectedGoal] = useState(0);

  const addGoal = () => {
    const newGoals = [...sharedInputs.accumulationGoals];
    if (newGoals.length < 5) {
      newGoals.push({
        name: '',
        yearsUntilStart: '',
        goalDurationYears: '',
        goalAmountTodaysDollars: '',
        inflateGoalAmount: 'No',
        amountCurrentlySaved: '',
        plannedMonthlySavings: '',
        rateOfReturn: ''
      });
      updateSharedInput('accumulationGoals', newGoals);
      setSelectedGoal(newGoals.length - 1);
    }
  };

  const updateGoal = (index: number, field: string, value: string) => {
    const newGoals = [...sharedInputs.accumulationGoals];
    newGoals[index] = { ...newGoals[index], [field]: value };
    updateSharedInput('accumulationGoals', newGoals);
  };

  const currentGoal = sharedInputs.accumulationGoals[selectedGoal] || {
    name: '',
    yearsUntilStart: '',
    goalDurationYears: '',
    goalAmountTodaysDollars: '',
    inflateGoalAmount: 'No',
    amountCurrentlySaved: '',
    plannedMonthlySavings: '',
    rateOfReturn: ''
  };

  const goToFirst = () => setSelectedGoal(0);
  const goToPrevious = () => setSelectedGoal(Math.max(0, selectedGoal - 1));
  const goToNext = () => setSelectedGoal(Math.min(sharedInputs.accumulationGoals.length - 1, selectedGoal + 1));
  const goToLast = () => setSelectedGoal(sharedInputs.accumulationGoals.length - 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Accumulation Funding Analysis</h2>
      </div>

      <Tabs defaultValue="goal-information" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="goal-information" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goal Information
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="goal-information" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Goal Selection and Navigation */}
                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm font-medium">Select Item</Label>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={goToFirst}
                        disabled={selectedGoal === 0}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={goToPrevious}
                        disabled={selectedGoal === 0}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="px-3 py-1 text-sm border rounded">
                        {selectedGoal + 1}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={goToNext}
                        disabled={selectedGoal >= sharedInputs.accumulationGoals.length - 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={goToLast}
                        disabled={selectedGoal >= sharedInputs.accumulationGoals.length - 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Goal {selectedGoal + 1} of {sharedInputs.accumulationGoals.length}
                    </span>
                    {sharedInputs.accumulationGoals.length < 5 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addGoal}
                        className="text-sm"
                      >
                        Add Goal
                      </Button>
                    )}
                  </div>
                </div>

                {/* Goal Fields */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Name:</Label>
                    <Input 
                      value={currentGoal.name}
                      onChange={(e) => updateGoal(selectedGoal, 'name', e.target.value)}
                      placeholder="Enter goal name" 
                      className="mt-1" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Years until start of goal:</Label>
                      <Input 
                        value={currentGoal.yearsUntilStart}
                        onChange={(e) => updateGoal(selectedGoal, 'yearsUntilStart', e.target.value)}
                        placeholder="1" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Goal duration in years:</Label>
                      <Input 
                        value={currentGoal.goalDurationYears}
                        onChange={(e) => updateGoal(selectedGoal, 'goalDurationYears', e.target.value)}
                        placeholder="1" 
                        className="mt-1" 
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Amount of goal in today's dollars:</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={currentGoal.goalAmountTodaysDollars}
                        onChange={(e) => updateGoal(selectedGoal, 'goalAmountTodaysDollars', e.target.value)}
                        placeholder="1" 
                        className="pl-6"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Inflate goal amount:</Label>
                    <RadioGroup 
                      value={currentGoal.inflateGoalAmount} 
                      onValueChange={(value) => updateGoal(selectedGoal, 'inflateGoalAmount', value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id={`yes-${selectedGoal}`} />
                        <Label htmlFor={`yes-${selectedGoal}`} className="text-sm">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id={`no-${selectedGoal}`} />
                        <Label htmlFor={`no-${selectedGoal}`} className="text-sm">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Amount currently saved:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={currentGoal.amountCurrentlySaved}
                          onChange={(e) => updateGoal(selectedGoal, 'amountCurrentlySaved', e.target.value)}
                          placeholder="0" 
                          className="pl-6"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Planned monthly savings:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={currentGoal.plannedMonthlySavings}
                          onChange={(e) => updateGoal(selectedGoal, 'plannedMonthlySavings', e.target.value)}
                          placeholder="0" 
                          className="pl-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Rate of return on assets:</Label>
                    <div className="relative mt-1">
                      <Input 
                        value={currentGoal.rateOfReturn}
                        onChange={(e) => updateGoal(selectedGoal, 'rateOfReturn', e.target.value)}
                        placeholder="0" 
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Applicable to all analyses</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Analysis date:</Label>
                      <Input 
                        type="date"
                        value={sharedInputs.AnalysisDate || ''}
                        onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Annual inflation rate:</Label>
                      <div className="relative mt-1">
                        <Input 
                          value={sharedInputs.inflationRate}
                          onChange={(e) => updateSharedInput('inflationRate', e.target.value)}
                          placeholder="3" 
                          className="pr-8"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};