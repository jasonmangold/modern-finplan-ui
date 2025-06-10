import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, GraduationCap, Settings, Heart, AlertTriangle, Plus, Trash2 } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const SurvivorNeedsInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  
  const addChild = () => {
    const newChildren = [...sharedInputs.children, { name: '', dateOfBirth: '' }];
    updateSharedInput('children', newChildren);
  };
  
  const removeChild = (index: number) => {
    const newChildren = sharedInputs.children.filter((_, i) => i !== index);
    updateSharedInput('children', newChildren);
  };
  
  const updateChild = (index: number, field: 'name' | 'dateOfBirth', value: string) => {
    const newChildren = [...sharedInputs.children];
    newChildren[index][field] = value;
    updateSharedInput('children', newChildren);
  };

  const addIncomeSource = () => {
    const newSources = [...sharedInputs.otherIncomeSources, {
      name: '',
      type: 'pension',
      owner: 'client1',
      startAge: '',
      amount: '',
      frequency: 'monthly',
      valueType: 'present',
      payableFor: 'life',
      endAge: '',
      inflationRate: '3.0%',
      percentAvailableToSurvivors: '100%'
    }];
    updateSharedInput('otherIncomeSources', newSources);
  };

  const removeIncomeSource = (index: number) => {
    const newSources = sharedInputs.otherIncomeSources.filter((_, i) => i !== index);
    updateSharedInput('otherIncomeSources', newSources);
  };

  const updateIncomeSource = (index: number, field: string, value: string) => {
    const newSources = [...sharedInputs.otherIncomeSources];
    newSources[index] = { ...newSources[index], [field]: value };
    updateSharedInput('otherIncomeSources', newSources);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Survivor Needs Analysis</h2>
        <p className="text-gray-600">Configure your survivor planning parameters with shared inputs</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="income-needs" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Income Needs
          </TabsTrigger>
          <TabsTrigger value="income-sources" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Income Sources
          </TabsTrigger>
          <TabsTrigger value="capital-debt" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Capital & Debt
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Name</Label>
                  <Input 
                    value={sharedInputs.client1Name}
                    onChange={(e) => updateSharedInput('client1Name', e.target.value)}
                    placeholder="Enter client 1 name" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 Date of Birth</Label>
                  <Input 
                    type="date"
                    value={sharedInputs.client1DateOfBirth}
                    onChange={(e) => updateSharedInput('client1DateOfBirth', e.target.value)}
                    className="mt-1" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Retirement Age</Label>
                  <Input 
                    value={sharedInputs.client1RetirementAge}
                    onChange={(e) => updateSharedInput('client1RetirementAge', e.target.value)}
                    defaultValue="67" 
                    className="mt-1" 
                  />
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox 
                    checked={sharedInputs.isMarried}
                    onCheckedChange={(checked) => updateSharedInput('isMarried', checked)}
                    id="married" 
                  />
                  <Label htmlFor="married" className="text-sm">Married</Label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={sharedInputs.hasClient2}
                  onCheckedChange={(checked) => updateSharedInput('hasClient2', checked)}
                  id="hasClient2" 
                />
                <Label htmlFor="hasClient2" className="text-sm">Add Client 2</Label>
              </div>

              {sharedInputs.hasClient2 && (
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50/50">
                  <div>
                    <Label className="text-sm">Client 2 Name</Label>
                    <Input 
                      value={sharedInputs.client2Name}
                      onChange={(e) => updateSharedInput('client2Name', e.target.value)}
                      placeholder="Enter client 2 name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 Date of Birth</Label>
                    <Input 
                      type="date"
                      value={sharedInputs.client2DateOfBirth}
                      onChange={(e) => updateSharedInput('client2DateOfBirth', e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 Retirement Age</Label>
                    <Input 
                      value={sharedInputs.client2RetirementAge}
                      onChange={(e) => updateSharedInput('client2RetirementAge', e.target.value)}
                      defaultValue="67" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Dependent Information
                <Button onClick={addChild} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Child
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sharedInputs.children.map((child, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50/50">
                  <div>
                    <Label className="text-sm">Child {index + 1} Name</Label>
                    <Input 
                      value={child.name}
                      onChange={(e) => updateChild(index, 'name', e.target.value)}
                      placeholder={`Enter child ${index + 1} name`} 
                      className="mt-1" 
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm">Date of Birth</Label>
                      <Input 
                        type="date"
                        value={child.dateOfBirth}
                        onChange={(e) => updateChild(index, 'dateOfBirth', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <Button 
                      onClick={() => removeChild(index)} 
                      size="sm" 
                      variant="outline"
                      className="mb-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {sharedInputs.children.length === 0 && (
                <p className="text-gray-500 text-center py-4">No dependents added yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-needs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Monthly Income Need Today</Label>
                <Input placeholder="$8,000" className="mt-1" />
              </div>
              
              <div>
                <Label className="text-sm">When Youngest Child Reaches Age</Label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <Input placeholder="22" />
                  <Input placeholder="$6,000" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Beginning at Retirement</Label>
                <Input placeholder="$5,000" className="mt-1" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="includeEducation" />
                <Label htmlFor="includeEducation" className="text-sm">
                  Include Education Funding for Dependents
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-sources" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Employment Income</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Annual Employment Income</Label>
                  <Input 
                    value={sharedInputs.client1EmploymentIncome}
                    onChange={(e) => updateSharedInput('client1EmploymentIncome', e.target.value)}
                    placeholder="$120,000" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Annual Employment Income</Label>
                    <Input 
                      value={sharedInputs.client2EmploymentIncome}
                      onChange={(e) => updateSharedInput('client2EmploymentIncome', e.target.value)}
                      placeholder="$80,000" 
                      className="mt-1" 
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Social Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Annual Social Security</Label>
                  <Input 
                    value={sharedInputs.client1SocialSecurity}
                    onChange={(e) => updateSharedInput('client1SocialSecurity', e.target.value)}
                    placeholder="$35,000" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 SS Start Age</Label>
                  <Input 
                    value={sharedInputs.client1SSStartAge}
                    onChange={(e) => updateSharedInput('client1SSStartAge', e.target.value)}
                    defaultValue="67" 
                    className="mt-1" 
                  />
                </div>
              </div>
              
              {sharedInputs.hasClient2 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Client 2 Annual Social Security</Label>
                    <Input 
                      value={sharedInputs.client2SocialSecurity}
                      onChange={(e) => updateSharedInput('client2SocialSecurity', e.target.value)}
                      placeholder="$25,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 SS Start Age</Label>
                    <Input 
                      value={sharedInputs.client2SSStartAge}
                      onChange={(e) => updateSharedInput('client2SSStartAge', e.target.value)}
                      defaultValue="67" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Other Income Sources
                <Button onClick={addIncomeSource} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Source
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sharedInputs.otherIncomeSources.map((source, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Income Source {index + 1}</h4>
                    <Button 
                      onClick={() => removeIncomeSource(index)} 
                      size="sm" 
                      variant="outline"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Name</Label>
                      <Input 
                        value={source.name}
                        onChange={(e) => updateIncomeSource(index, 'name', e.target.value)}
                        placeholder="Source name" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Type</Label>
                      <Select 
                        value={source.type} 
                        onValueChange={(value) => updateIncomeSource(index, 'type', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pension">Pension</SelectItem>
                          <SelectItem value="annuity">Annuity</SelectItem>
                          <SelectItem value="rental">Rental Income</SelectItem>
                          <SelectItem value="business">Business Income</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Owner</Label>
                      <Select 
                        value={source.owner} 
                        onValueChange={(value) => updateIncomeSource(index, 'owner', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client1">Client 1</SelectItem>
                          {sharedInputs.hasClient2 && <SelectItem value="client2">Client 2</SelectItem>}
                          <SelectItem value="joint">Joint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm">Start Age</Label>
                      <Input 
                        value={source.startAge}
                        onChange={(e) => updateIncomeSource(index, 'startAge', e.target.value)}
                        placeholder="65" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Amount</Label>
                      <Input 
                        value={source.amount}
                        onChange={(e) => updateIncomeSource(index, 'amount', e.target.value)}
                        placeholder="$2,000" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Frequency</Label>
                      <Select 
                        value={source.frequency} 
                        onValueChange={(value) => updateIncomeSource(index, 'frequency', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="lump-sum">Lump Sum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Value Type</Label>
                      <Select 
                        value={source.valueType} 
                        onValueChange={(value) => updateIncomeSource(index, 'valueType', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present Value</SelectItem>
                          <SelectItem value="future">Future Value</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Payable For</Label>
                      <Select 
                        value={source.payableFor} 
                        onValueChange={(value) => updateIncomeSource(index, 'payableFor', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="life">Life</SelectItem>
                          <SelectItem value="specific-age">Until Specific Age</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {source.payableFor === 'specific-age' && (
                      <div>
                        <Label className="text-sm">End Age</Label>
                        <Input 
                          value={source.endAge}
                          onChange={(e) => updateIncomeSource(index, 'endAge', e.target.value)}
                          placeholder="85" 
                          className="mt-1" 
                        />
                      </div>
                    )}
                    <div>
                      <Label className="text-sm">Inflation Rate</Label>
                      <Input 
                        value={source.inflationRate}
                        onChange={(e) => updateIncomeSource(index, 'inflationRate', e.target.value)}
                        defaultValue="3.0%" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">% Available to Survivors</Label>
                      <Input 
                        value={source.percentAvailableToSurvivors}
                        onChange={(e) => updateIncomeSource(index, 'percentAvailableToSurvivors', e.target.value)}
                        defaultValue="100%" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {sharedInputs.otherIncomeSources.length === 0 && (
                <p className="text-gray-500 text-center py-4">No other income sources added yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital-debt" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Retirement Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Retirement Balance</Label>
                  <Input 
                    value={sharedInputs.client1RetirementBalance}
                    onChange={(e) => updateSharedInput('client1RetirementBalance', e.target.value)}
                    placeholder="$350,000" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 Monthly Contributions</Label>
                  <Input 
                    value={sharedInputs.client1MonthlyContributions}
                    onChange={(e) => updateSharedInput('client1MonthlyContributions', e.target.value)}
                    placeholder="$1,500" 
                    className="mt-1" 
                  />
                </div>
              </div>

              {sharedInputs.hasClient2 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Client 2 Retirement Balance</Label>
                    <Input 
                      value={sharedInputs.client2RetirementBalance}
                      onChange={(e) => updateSharedInput('client2RetirementBalance', e.target.value)}
                      placeholder="$200,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 Monthly Contributions</Label>
                    <Input 
                      value={sharedInputs.client2MonthlyContributions}
                      onChange={(e) => updateSharedInput('client2MonthlyContributions', e.target.value)}
                      placeholder="$800" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox id="delayRetirement" />
                <Label htmlFor="delayRetirement" className="text-sm">
                  Delay using retirement funds until retired
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Other Assets & Insurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Cash</Label>
                  <Input placeholder="$50,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Other Assets</Label>
                  <Input placeholder="$25,000" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Current Life Insurance</Label>
                  <Input placeholder="$500,000" className="mt-1" />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Current Life Insurance</Label>
                    <Input placeholder="$300,000" className="mt-1" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Mortgage Debt</Label>
                  <Input placeholder="$320,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Other Debt</Label>
                  <Input placeholder="$25,000" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Education Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">School</Label>
                  <Input 
                    value={sharedInputs.schoolName}
                    onChange={(e) => updateSharedInput('schoolName', e.target.value)}
                    placeholder="Enter school name" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Annual Tuition Cost</Label>
                  <Input 
                    value={sharedInputs.annualTuitionCost}
                    onChange={(e) => updateSharedInput('annualTuitionCost', e.target.value)}
                    placeholder="$50,000" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Age When School Begins</Label>
                  <Input 
                    value={sharedInputs.ageWhenSchoolBegins}
                    onChange={(e) => updateSharedInput('ageWhenSchoolBegins', e.target.value)}
                    defaultValue="18" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Number of Years in School</Label>
                  <Input 
                    value={sharedInputs.numberOfYearsInSchool}
                    onChange={(e) => updateSharedInput('numberOfYearsInSchool', e.target.value)}
                    defaultValue="4" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Percentage to Fund</Label>
                  <Select 
                    value={sharedInputs.percentageToFund} 
                    onValueChange={(value) => updateSharedInput('percentageToFund', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                      <SelectItem value="100">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Amount Currently Saved</Label>
                  <Input 
                    value={sharedInputs.amountCurrentlySaved}
                    onChange={(e) => updateSharedInput('amountCurrentlySaved', e.target.value)}
                    placeholder="$25,000" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Planned Monthly Savings</Label>
                <Input 
                  value={sharedInputs.plannedMonthlySavings}
                  onChange={(e) => updateSharedInput('plannedMonthlySavings', e.target.value)}
                  placeholder="$500" 
                  className="mt-1" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Analysis Date</Label>
                <Input 
                  type="date" 
                  value={sharedInputs.analysisDate}
                  onChange={(e) => updateSharedInput('analysisDate', e.target.value)}
                  className="mt-1" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Mortality Age</Label>
                  <Input 
                    value={sharedInputs.client1MortalityAge}
                    onChange={(e) => updateSharedInput('client1MortalityAge', e.target.value)}
                    defaultValue="90" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Mortality Age</Label>
                    <Input 
                      value={sharedInputs.client2MortalityAge}
                      onChange={(e) => updateSharedInput('client2MortalityAge', e.target.value)}
                      defaultValue="90" 
                      className="mt-1" 
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">General Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.inflationRate}
                    onChange={(e) => updateSharedInput('inflationRate', e.target.value)}
                    defaultValue="3.0%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Education Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.educationInflationRate}
                    onChange={(e) => updateSharedInput('educationInflationRate', e.target.value)}
                    defaultValue="5.0%" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">ROR on Education Assets</Label>
                  <Input 
                    value={sharedInputs.educationROR}
                    onChange={(e) => updateSharedInput('educationROR', e.target.value)}
                    defaultValue="7.0%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">SS Benefit Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.ssBenefitInflationRate}
                    onChange={(e) => updateSharedInput('ssBenefitInflationRate', e.target.value)}
                    defaultValue="2.5%" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Final Expenses</Label>
                  <Input placeholder="$15,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Emergency Reserves (Months of Income)</Label>
                  <Input defaultValue="6" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Assumed ROR for Survivor's Assets</Label>
                <Input defaultValue="6.0%" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
