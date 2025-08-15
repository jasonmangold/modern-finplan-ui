
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User, DollarSign, PiggyBank, CreditCard, Shield, TrendingUp, GraduationCap, Building, Heart, Calculator, CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const ClientInputHub = () => {
  const { updateSectionCompletion, updateFormData, formData, activeTab, setActiveTab } = useFormContext();
  
  // State for optional sections
  const [showCriticalIllness, setShowCriticalIllness] = useState(false);
  const [showEstate, setShowEstate] = useState(false);
  const [showCharitableRemainderTrust, setShowCharitableRemainderTrust] = useState(false);
  const [showBusinessContinuation, setShowBusinessContinuation] = useState(false);
  const [showBusinessValuation, setShowBusinessValuation] = useState(false);
  const [showKeyEmployee, setShowKeyEmployee] = useState(false);

  // State for date pickers
  const [client1DOB, setClient1DOB] = useState<Date>();
  const [client2DOB, setClient2DOB] = useState<Date>();
  const [analysisDate, setAnalysisDate] = useState<Date>();

  // State for dynamic lists
  const [educationGoals, setEducationGoals] = useState([{ child: '', yearsUntilCollege: '', schoolType: 'public', currentCost: '' }]);
  const [incomeSourcesClient1, setIncomeSourcesClient1] = useState([{ name: '', type: 'Pension', amount: '', startAge: '' }]);
  const [incomeSourcesClient2, setIncomeSourcesClient2] = useState([{ name: '', type: 'Pension', amount: '', startAge: '' }]);

  // Check section completion logic
  const checkSectionCompletion = (sectionId: string, data: Record<string, any>) => {
    const requiredFields: Record<string, string[]> = {
      personal: ['primaryClient', 'age'],
      income: ['grossIncome', 'annualExpenses'],
      retirement: ['retirementAge', 'currentRetirementSavings'],
      education: [],
      savings: ['401kBalance', 'cashSavings'],
      expenses: ['monthlyExpenses'],
      assets: ['homeValue', 'totalAssets'],
      insurance: ['lifeInsurance'],
      goals: [],
      assumptions: ['inflationRate']
    };

    const required = requiredFields[sectionId] || [];
    const completed = required.every(field => data[field] && data[field].toString().trim() !== '');
    updateSectionCompletion(sectionId, completed);
  };

  const handleInputChange = (sectionId: string, field: string, value: any) => {
    updateFormData(field, value);
    const newData = { ...formData, [field]: value };
    checkSectionCompletion(sectionId, newData);
  };

  // Dynamic list handlers
  const addEducationGoal = () => {
    setEducationGoals([...educationGoals, { child: '', yearsUntilCollege: '', schoolType: 'public', currentCost: '' }]);
  };

  const removeEducationGoal = (index: number) => {
    setEducationGoals(educationGoals.filter((_, i) => i !== index));
  };

  const updateEducationGoal = (index: number, field: string, value: string) => {
    const updated = [...educationGoals];
    updated[index] = { ...updated[index], [field]: value };
    setEducationGoals(updated);
  };

  const addIncomeSource = (client: 'client1' | 'client2') => {
    if (client === 'client1') {
      setIncomeSourcesClient1([...incomeSourcesClient1, { name: '', type: 'Pension', amount: '', startAge: '' }]);
    } else {
      setIncomeSourcesClient2([...incomeSourcesClient2, { name: '', type: 'Pension', amount: '', startAge: '' }]);
    }
  };

  const removeIncomeSource = (client: 'client1' | 'client2', index: number) => {
    if (client === 'client1') {
      setIncomeSourcesClient1(incomeSourcesClient1.filter((_, i) => i !== index));
    } else {
      setIncomeSourcesClient2(incomeSourcesClient2.filter((_, i) => i !== index));
    }
  };

  const updateIncomeSource = (client: 'client1' | 'client2', index: number, field: string, value: string) => {
    if (client === 'client1') {
      const updated = [...incomeSourcesClient1];
      updated[index] = { ...updated[index], [field]: value };
      setIncomeSourcesClient1(updated);
    } else {
      const updated = [...incomeSourcesClient2];
      updated[index] = { ...updated[index], [field]: value };
      setIncomeSourcesClient2(updated);
    }
  };

  // Check all sections when formData changes
  useEffect(() => {
    ['personal', 'income', 'retirement', 'education', 'savings', 'expenses', 'assets', 'insurance', 'goals', 'assumptions'].forEach(sectionId => {
      checkSectionCompletion(sectionId, formData);
    });
  }, [formData]);

  return (
    <div className="h-full">
      <Card className="h-full border-0 shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Comprehensive Client Data
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 h-[calc(100%-80px)] overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-10 mb-4 mx-6 text-xs">
              <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
              <TabsTrigger value="income" className="text-xs">Income</TabsTrigger>
              <TabsTrigger value="retirement" className="text-xs">Retirement</TabsTrigger>
              <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
              <TabsTrigger value="savings" className="text-xs">Savings</TabsTrigger>
              <TabsTrigger value="expenses" className="text-xs">Expenses</TabsTrigger>
              <TabsTrigger value="assets" className="text-xs">Assets</TabsTrigger>
              <TabsTrigger value="insurance" className="text-xs">Insurance</TabsTrigger>
              <TabsTrigger value="goals" className="text-xs">Goals</TabsTrigger>
              <TabsTrigger value="assumptions" className="text-xs">Assumptions</TabsTrigger>
            </TabsList>

            <div className="h-[calc(100%-60px)] overflow-y-auto px-6">
              <TabsContent value="personal" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 1 Name</Label>
                      <Input 
                        value={formData.primaryClient || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('personal', 'primaryClient', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 1 Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1.5 h-9",
                              !client1DOB && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {client1DOB ? format(client1DOB, "MM/dd/yyyy") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={client1DOB}
                            onSelect={setClient1DOB}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 1 Age</Label>
                      <Input 
                        value={formData.age || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('personal', 'age', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 1 Retirement Age</Label>
                      <Input 
                        value={formData.retirementAge || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('personal', 'retirementAge', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasClient2" 
                      checked={formData.hasClient2}
                      onCheckedChange={(checked) => handleInputChange('personal', 'hasClient2', checked)}
                    />
                    <Label htmlFor="hasClient2" className="text-sm">Add Client 2</Label>
                  </div>

                  {formData.hasClient2 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 2 Name</Label>
                        <Input 
                          value={formData.spouse || ""} 
                          className="mt-1.5 h-9"
                          onChange={(e) => handleInputChange('personal', 'spouse', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 2 Date of Birth</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal mt-1.5 h-9",
                                !client2DOB && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {client2DOB ? format(client2DOB, "MM/dd/yyyy") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={client2DOB}
                              onSelect={setClient2DOB}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 2 Age</Label>
                        <Input 
                          value={formData.spouseAge || ""} 
                          className="mt-1.5 h-9"
                          onChange={(e) => handleInputChange('personal', 'spouseAge', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 2 Retirement Age</Label>
                        <Input 
                          value={formData.spouseRetirementAge || ""} 
                          className="mt-1.5 h-9"
                          onChange={(e) => handleInputChange('personal', 'spouseRetirementAge', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="married" 
                      checked={formData.isMarried}
                      onCheckedChange={(checked) => handleInputChange('personal', 'isMarried', checked)}
                    />
                    <Label htmlFor="married" className="text-sm">Married</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="income" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Income & Employment</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 1 Annual Employment Income</Label>
                      <Input 
                        value={formData.grossIncome || ""} 
                        className="mt-1.5 h-9"
                        placeholder="$100,000"
                        onChange={(e) => handleInputChange('income', 'grossIncome', e.target.value)}
                      />
                    </div>
                    {formData.hasClient2 && (
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 2 Annual Employment Income</Label>
                        <Input 
                          value={formData.spouseIncome || ""} 
                          className="mt-1.5 h-9"
                          placeholder="$80,000"
                          onChange={(e) => handleInputChange('income', 'spouseIncome', e.target.value)}
                        />
                      </div>
                    )}
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 1 Annual Social Security</Label>
                      <Input 
                        value={formData.client1SocialSecurity || ""} 
                        className="mt-1.5 h-9"
                        placeholder="$35,000"
                        onChange={(e) => handleInputChange('income', 'client1SocialSecurity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 1 SS Start Age</Label>
                      <Input 
                        value={formData.client1SSStartAge || ""} 
                        className="mt-1.5 h-9"
                        placeholder="67"
                        onChange={(e) => handleInputChange('income', 'client1SSStartAge', e.target.value)}
                      />
                    </div>
                  </div>

                  {formData.hasClient2 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 2 Annual Social Security</Label>
                        <Input 
                          value={formData.client2SocialSecurity || ""} 
                          className="mt-1.5 h-9"
                          placeholder="$30,000"
                          onChange={(e) => handleInputChange('income', 'client2SocialSecurity', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 2 SS Start Age</Label>
                        <Input 
                          value={formData.client2SSStartAge || ""} 
                          className="mt-1.5 h-9"
                          placeholder="67"
                          onChange={(e) => handleInputChange('income', 'client2SSStartAge', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium text-foreground">Annual Expenses</Label>
                    <Input 
                      value={formData.annualExpenses || ""} 
                      className="mt-1.5 h-9"
                      onChange={(e) => handleInputChange('income', 'annualExpenses', e.target.value)}
                    />
                  </div>

                  {/* Client 1 Other Income Sources */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-foreground">Client 1 Other Income Sources</Label>
                      <Button onClick={() => addIncomeSource('client1')} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Income Source
                      </Button>
                    </div>

                    {incomeSourcesClient1.map((source, index) => (
                      <Card key={index} className="p-4 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium">Income Source {index + 1}</Label>
                          <Button 
                            onClick={() => removeIncomeSource('client1', index)} 
                            size="sm" 
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Name</Label>
                            <Input 
                              value={source.name}
                              onChange={(e) => updateIncomeSource('client1', index, 'name', e.target.value)}
                              placeholder="Income source name" 
                              className="mt-1 h-9" 
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Type</Label>
                            <Select 
                              value={source.type} 
                              onValueChange={(value) => updateIncomeSource('client1', index, 'type', value)}
                            >
                              <SelectTrigger className="mt-1 h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-background border border-border z-50">
                                <SelectItem value="Pension">Pension</SelectItem>
                                <SelectItem value="Annuity">Annuity</SelectItem>
                                <SelectItem value="Rental Income">Rental Income</SelectItem>
                                <SelectItem value="Business Income">Business Income</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Annual Amount</Label>
                            <Input 
                              value={source.amount}
                              onChange={(e) => updateIncomeSource('client1', index, 'amount', e.target.value)}
                              placeholder="$0" 
                              className="mt-1 h-9" 
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Start Age</Label>
                            <Input 
                              value={source.startAge}
                              onChange={(e) => updateIncomeSource('client1', index, 'startAge', e.target.value)}
                              placeholder="65" 
                              className="mt-1 h-9" 
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Client 2 Other Income Sources */}
                  {formData.hasClient2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-foreground">Client 2 Other Income Sources</Label>
                        <Button onClick={() => addIncomeSource('client2')} size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Income Source
                        </Button>
                      </div>

                      {incomeSourcesClient2.map((source, index) => (
                        <Card key={index} className="p-4 border border-border">
                          <div className="flex items-center justify-between mb-3">
                            <Label className="text-sm font-medium">Income Source {index + 1}</Label>
                            <Button 
                              onClick={() => removeIncomeSource('client2', index)} 
                              size="sm" 
                              variant="outline"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Name</Label>
                              <Input 
                                value={source.name}
                                onChange={(e) => updateIncomeSource('client2', index, 'name', e.target.value)}
                                placeholder="Income source name" 
                                className="mt-1 h-9" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Type</Label>
                              <Select 
                                value={source.type} 
                                onValueChange={(value) => updateIncomeSource('client2', index, 'type', value)}
                              >
                                <SelectTrigger className="mt-1 h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-background border border-border z-50">
                                  <SelectItem value="Pension">Pension</SelectItem>
                                  <SelectItem value="Annuity">Annuity</SelectItem>
                                  <SelectItem value="Rental Income">Rental Income</SelectItem>
                                  <SelectItem value="Business Income">Business Income</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-sm">Annual Amount</Label>
                              <Input 
                                value={source.amount}
                                onChange={(e) => updateIncomeSource('client2', index, 'amount', e.target.value)}
                                placeholder="$0" 
                                className="mt-1 h-9" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Start Age</Label>
                              <Input 
                                value={source.startAge}
                                onChange={(e) => updateIncomeSource('client2', index, 'startAge', e.target.value)}
                                placeholder="65" 
                                className="mt-1 h-9" 
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="retirement" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <PiggyBank className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Retirement Planning</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Current Retirement Savings</Label>
                      <Input 
                        value={formData.currentRetirementSavings || ""} 
                        className="mt-1.5 h-9"
                        placeholder="$500,000"
                        onChange={(e) => handleInputChange('retirement', 'currentRetirementSavings', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Monthly Retirement Contribution</Label>
                      <Input 
                        value={formData.monthlyRetirementContribution || ""} 
                        className="mt-1.5 h-9"
                        placeholder="$1,500"
                        onChange={(e) => handleInputChange('retirement', 'monthlyRetirementContribution', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Desired Monthly Income at Retirement</Label>
                      <Input 
                        value={formData.desiredMonthlyIncome || ""} 
                        className="mt-1.5 h-9"
                        placeholder="$8,000"
                        onChange={(e) => handleInputChange('retirement', 'desiredMonthlyIncome', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Life Expectancy</Label>
                      <Input 
                        value={formData.lifeExpectancy || ""} 
                        className="mt-1.5 h-9"
                        placeholder="90"
                        onChange={(e) => handleInputChange('retirement', 'lifeExpectancy', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Education Funding</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-foreground">Education Goals</Label>
                      <Button onClick={addEducationGoal} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Child
                      </Button>
                    </div>

                    {educationGoals.map((goal, index) => (
                      <Card key={index} className="p-4 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium">Child {index + 1}</Label>
                          <Button 
                            onClick={() => removeEducationGoal(index)} 
                            size="sm" 
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Child's Name</Label>
                            <Input 
                              value={goal.child}
                              onChange={(e) => updateEducationGoal(index, 'child', e.target.value)}
                              placeholder="Enter child's name" 
                              className="mt-1 h-9" 
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Years Until College</Label>
                            <Input 
                              value={goal.yearsUntilCollege}
                              onChange={(e) => updateEducationGoal(index, 'yearsUntilCollege', e.target.value)}
                              placeholder="10" 
                              className="mt-1 h-9" 
                            />
                          </div>
                          <div>
                            <Label className="text-sm">School Type</Label>
                            <Select 
                              value={goal.schoolType} 
                              onValueChange={(value) => updateEducationGoal(index, 'schoolType', value)}
                            >
                              <SelectTrigger className="mt-1 h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-background border border-border z-50">
                                <SelectItem value="public">Public In-State</SelectItem>
                                <SelectItem value="public-out">Public Out-of-State</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Current Annual Cost</Label>
                            <Input 
                              value={goal.currentCost}
                              onChange={(e) => updateEducationGoal(index, 'currentCost', e.target.value)}
                              placeholder="$25,000" 
                              className="mt-1 h-9" 
                            />
                          </div>
                        </div>
                      </Card>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground">529 Plan Balance</Label>
                        <Input 
                          value={formData.fiveTwentyNineBalance || ""} 
                          className="mt-1.5 h-9"
                          placeholder="$50,000"
                          onChange={(e) => handleInputChange('education', 'fiveTwentyNineBalance', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground">Monthly Education Contribution</Label>
                        <Input 
                          value={formData.monthlyEducationContribution || ""} 
                          className="mt-1.5 h-9"
                          placeholder="$500"
                          onChange={(e) => handleInputChange('education', 'monthlyEducationContribution', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="savings" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <PiggyBank className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Savings & Investments</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">401(k) Balance</Label>
                      <Input 
                        value={formData["401kBalance"] || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('savings', '401kBalance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">IRA Balance</Label>
                      <Input 
                        value={formData.iraBalance || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('savings', 'iraBalance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Taxable Investments</Label>
                      <Input 
                        value={formData.taxableInvestments || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('savings', 'taxableInvestments', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Cash/Savings</Label>
                      <Input 
                        value={formData.cashSavings || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('savings', 'cashSavings', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Other Investments</Label>
                      <Input 
                        value={formData.otherInvestments || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('savings', 'otherInvestments', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Investment Risk Tolerance</Label>
                      <Select 
                        value={formData.riskTolerance || ""} 
                        onValueChange={(value) => handleInputChange('savings', 'riskTolerance', value)}
                      >
                        <SelectTrigger className="mt-1.5 h-9">
                          <SelectValue placeholder="Select risk tolerance" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="conservative">Conservative</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="expenses" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Expenses & Cash Flow</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Monthly Housing</Label>
                      <Input 
                        value={formData.housing || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('expenses', 'housing', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Monthly Utilities</Label>
                      <Input 
                        value={formData.utilities || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('expenses', 'utilities', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Monthly Food</Label>
                      <Input 
                        value={formData.food || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('expenses', 'food', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Other Monthly Expenses</Label>
                      <Input 
                        value={formData.monthlyExpenses || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('expenses', 'monthlyExpenses', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Transportation</Label>
                      <Input 
                        value={formData.transportation || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('expenses', 'transportation', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Entertainment/Recreation</Label>
                      <Input 
                        value={formData.entertainment || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('expenses', 'entertainment', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assets" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Assets & Liabilities</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Home Value</Label>
                      <Input 
                        value={formData.homeValue || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('assets', 'homeValue', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Mortgage Balance</Label>
                      <Input 
                        value={formData.mortgageBalance || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('assets', 'mortgageBalance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Other Real Estate</Label>
                      <Input 
                        value={formData.otherRealEstate || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('assets', 'otherRealEstate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Vehicles Value</Label>
                      <Input 
                        value={formData.vehiclesValue || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('assets', 'vehiclesValue', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Other Assets</Label>
                      <Input 
                        value={formData.otherAssets || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('assets', 'otherAssets', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Total Debt</Label>
                      <Input 
                        value={formData.totalAssets || ""} 
                        className="mt-1.5 h-9"
                        onChange={(e) => handleInputChange('assets', 'totalAssets', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insurance" className="space-y-6 mt-0">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Insurance & Protection</h3>
                  </div>
                  
                  {/* Basic Insurance */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Life Insurance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 1 Life Insurance Coverage</Label>
                        <Input 
                          value={formData.lifeInsurance || ""} 
                          className="mt-1.5 h-9"
                          onChange={(e) => handleInputChange('insurance', 'lifeInsurance', e.target.value)}
                        />
                      </div>
                      {formData.hasClient2 && (
                        <div>
                          <Label className="text-sm font-medium text-foreground">Client 2 Life Insurance Coverage</Label>
                          <Input 
                            value={formData.spouseLifeInsurance || ""} 
                            className="mt-1.5 h-9"
                            onChange={(e) => handleInputChange('insurance', 'spouseLifeInsurance', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Disability Insurance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 1 Disability Coverage</Label>
                        <Select 
                          value={formData.disabilityInsurance || ""} 
                          onValueChange={(value) => handleInputChange('insurance', 'disabilityInsurance', value)}
                        >
                          <SelectTrigger className="mt-1.5 h-9">
                            <SelectValue placeholder="Select coverage" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border z-50">
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="group">Group Coverage</SelectItem>
                            <SelectItem value="individual">Individual Policy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.hasClient2 && (
                        <div>
                          <Label className="text-sm font-medium text-foreground">Client 2 Disability Coverage</Label>
                          <Select 
                            value={formData.spouseDisabilityInsurance || ""} 
                            onValueChange={(value) => handleInputChange('insurance', 'spouseDisabilityInsurance', value)}
                          >
                            <SelectTrigger className="mt-1.5 h-9">
                              <SelectValue placeholder="Select coverage" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-border z-50">
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="group">Group Coverage</SelectItem>
                              <SelectItem value="individual">Individual Policy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Long-Term Care Insurance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-foreground">Client 1 LTC Coverage</Label>
                        <Select 
                          value={formData.ltcInsurance || ""} 
                          onValueChange={(value) => handleInputChange('insurance', 'ltcInsurance', value)}
                        >
                          <SelectTrigger className="mt-1.5 h-9">
                            <SelectValue placeholder="Select coverage" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border z-50">
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="traditional">Traditional LTC</SelectItem>
                            <SelectItem value="hybrid">Hybrid Policy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.hasClient2 && (
                        <div>
                          <Label className="text-sm font-medium text-foreground">Client 2 LTC Coverage</Label>
                          <Select 
                            value={formData.spouseLtcInsurance || ""} 
                            onValueChange={(value) => handleInputChange('insurance', 'spouseLtcInsurance', value)}
                          >
                            <SelectTrigger className="mt-1.5 h-9">
                              <SelectValue placeholder="Select coverage" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-border z-50">
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="traditional">Traditional LTC</SelectItem>
                              <SelectItem value="hybrid">Hybrid Policy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Optional Insurance Sections */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="criticalIllness" 
                          checked={showCriticalIllness}
                          onCheckedChange={(checked) => setShowCriticalIllness(checked === true)}
                        />
                        <Label htmlFor="criticalIllness" className="text-sm">Critical Illness Insurance</Label>
                      </div>

                      {showCriticalIllness && (
                        <div className="ml-6 grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Client 1 Critical Illness Coverage</Label>
                            <Input 
                              value={formData.criticalIllnessInsurance || ""} 
                              className="mt-1 h-9"
                              placeholder="$50,000"
                              onChange={(e) => handleInputChange('insurance', 'criticalIllnessInsurance', e.target.value)}
                            />
                          </div>
                          {formData.hasClient2 && (
                            <div>
                              <Label className="text-sm">Client 2 Critical Illness Coverage</Label>
                              <Input 
                                value={formData.spouseCriticalIllnessInsurance || ""} 
                                className="mt-1 h-9"
                                placeholder="$50,000"
                                onChange={(e) => handleInputChange('insurance', 'spouseCriticalIllnessInsurance', e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-6 mt-0">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Specialized Planning</h3>
                  </div>

                  {/* Optional Goals Sections */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="estate" 
                          checked={showEstate}
                          onCheckedChange={(checked) => setShowEstate(checked === true)}
                        />
                        <Label htmlFor="estate" className="text-sm">Estate Planning</Label>
                      </div>

                      {showEstate && (
                        <div className="ml-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Estate Value</Label>
                              <Input 
                                value={formData.estateValue || ""} 
                                className="mt-1 h-9"
                                placeholder="$2,000,000"
                                onChange={(e) => handleInputChange('goals', 'estateValue', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Estate Tax Exposure</Label>
                              <Input 
                                value={formData.estateTaxExposure || ""} 
                                className="mt-1 h-9"
                                placeholder="$500,000"
                                onChange={(e) => handleInputChange('goals', 'estateTaxExposure', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="charitableRemainderTrust" 
                          checked={showCharitableRemainderTrust}
                          onCheckedChange={(checked) => setShowCharitableRemainderTrust(checked === true)}
                        />
                        <Label htmlFor="charitableRemainderTrust" className="text-sm">Charitable Remainder Trust</Label>
                      </div>

                      {showCharitableRemainderTrust && (
                        <div className="ml-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Trust Value</Label>
                              <Input 
                                value={formData.crtValue || ""} 
                                className="mt-1 h-9"
                                placeholder="$1,000,000"
                                onChange={(e) => handleInputChange('goals', 'crtValue', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Annual Payout Rate</Label>
                              <Input 
                                value={formData.crtPayoutRate || ""} 
                                className="mt-1 h-9"
                                placeholder="5%"
                                onChange={(e) => handleInputChange('goals', 'crtPayoutRate', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="businessContinuation" 
                          checked={showBusinessContinuation}
                          onCheckedChange={(checked) => setShowBusinessContinuation(checked === true)}
                        />
                        <Label htmlFor="businessContinuation" className="text-sm">Business Continuation</Label>
                      </div>

                      {showBusinessContinuation && (
                        <div className="ml-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Business Interest Percentage</Label>
                              <Input 
                                value={formData.businessInterestPercentage || ""} 
                                className="mt-1 h-9"
                                placeholder="50%"
                                onChange={(e) => handleInputChange('goals', 'businessInterestPercentage', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Buy-Sell Agreement Value</Label>
                              <Input 
                                value={formData.buySellAgreementValue || ""} 
                                className="mt-1 h-9"
                                placeholder="$5,000,000"
                                onChange={(e) => handleInputChange('goals', 'buySellAgreementValue', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="businessValuation" 
                          checked={showBusinessValuation}
                          onCheckedChange={(checked) => setShowBusinessValuation(checked === true)}
                        />
                        <Label htmlFor="businessValuation" className="text-sm">Business Valuation</Label>
                      </div>

                      {showBusinessValuation && (
                        <div className="ml-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Current Business Value</Label>
                              <Input 
                                value={formData.currentBusinessValue || ""} 
                                className="mt-1 h-9"
                                placeholder="$10,000,000"
                                onChange={(e) => handleInputChange('goals', 'currentBusinessValue', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Expected Growth Rate</Label>
                              <Input 
                                value={formData.businessGrowthRate || ""} 
                                className="mt-1 h-9"
                                placeholder="5%"
                                onChange={(e) => handleInputChange('goals', 'businessGrowthRate', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="keyEmployee" 
                          checked={showKeyEmployee}
                          onCheckedChange={(checked) => setShowKeyEmployee(checked === true)}
                        />
                        <Label htmlFor="keyEmployee" className="text-sm">Key Employee Insurance</Label>
                      </div>

                      {showKeyEmployee && (
                        <div className="ml-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Key Employee Value</Label>
                              <Input 
                                value={formData.keyEmployeeValue || ""} 
                                className="mt-1 h-9"
                                placeholder="$1,000,000"
                                onChange={(e) => handleInputChange('goals', 'keyEmployeeValue', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Replacement Cost Multiple</Label>
                              <Input 
                                value={formData.replacementCostMultiple || ""} 
                                className="mt-1 h-9"
                                placeholder="3x"
                                onChange={(e) => handleInputChange('goals', 'replacementCostMultiple', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assumptions" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground">Analysis Assumptions</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Inflation Rate</Label>
                      <div className="relative mt-1.5">
                        <Input 
                          value={formData.inflationRate || ""} 
                          className="h-9 pr-8"
                          placeholder="3.0"
                          onChange={(e) => handleInputChange('assumptions', 'inflationRate', e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Expected Return Rate</Label>
                      <div className="relative mt-1.5">
                        <Input 
                          value={formData.expectedReturnRate || ""} 
                          className="h-9 pr-8"
                          placeholder="7.0"
                          onChange={(e) => handleInputChange('assumptions', 'expectedReturnRate', e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Tax Rate</Label>
                      <div className="relative mt-1.5">
                        <Input 
                          value={formData.taxRate || ""} 
                          className="h-9 pr-8"
                          placeholder="25.0"
                          onChange={(e) => handleInputChange('assumptions', 'taxRate', e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Analysis Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1.5 h-9",
                              !analysisDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {analysisDate ? format(analysisDate, "MM/dd/yyyy") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={analysisDate}
                            onSelect={setAnalysisDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
