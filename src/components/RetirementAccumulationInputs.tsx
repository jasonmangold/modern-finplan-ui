import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, DollarSign, TrendingUp, Settings, Plus, Trash2 } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const RetirementAccumulationInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

  const addIncomeSource = () => {
    const newSource = {
      name: '',
      type: 'Pension',
      owner: 'Client 1',
      startAge: '',
      amount: '',
      frequency: 'Monthly',
      valueType: 'Present Value',
      payableFor: 'Life',
      endAge: '',
      inflationRate: '',
      percentAvailableToSurvivors: ''
    };
    const newSources = [...sharedInputs.otherIncomeSources, newSource];
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
        <h2 className="text-xl font-semibold mb-2">Analysis Inputs</h2>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="income-needs" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Income Needs
          </TabsTrigger>
          <TabsTrigger value="income-sources" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Income Sources
          </TabsTrigger>
          <TabsTrigger value="capital" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Capital
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
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

              <div>
                <Label className="text-sm">Client 1 Retirement Age</Label>
                <Input 
                  value={sharedInputs.client1RetirementAge}
                  onChange={(e) => updateSharedInput('client1RetirementAge', e.target.value)}
                  placeholder="67" 
                  className="mt-1" 
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="married" 
                  checked={sharedInputs.isMarried}
                  onCheckedChange={(checked) => updateSharedInput('isMarried', checked)}
                />
                <Label htmlFor="married" className="text-sm">Married</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasClient2" 
                  checked={sharedInputs.hasClient2}
                  onCheckedChange={(checked) => updateSharedInput('hasClient2', checked)}
                />
                <Label htmlFor="hasClient2" className="text-sm">Add Client 2</Label>
              </div>

              {sharedInputs.hasClient2 && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 Retirement Age</Label>
                    <Input 
                      value={sharedInputs.client2RetirementAge}
                      onChange={(e) => updateSharedInput('client2RetirementAge', e.target.value)}
                      placeholder="67" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-needs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income Needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Current Annual Income</Label>
                <Input placeholder="$150,000" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Desired Income Replacement Percentage</Label>
                <Input placeholder="80%" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Additional Annual Retirement Expenses</Label>
                <Input placeholder="$5,000" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-sources" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Annual Employment Income</Label>
                  <Input 
                    value={sharedInputs.client1EmploymentIncome}
                    onChange={(e) => updateSharedInput('client1EmploymentIncome', e.target.value)}
                    placeholder="$100,000" 
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
                    placeholder="67" 
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
                      placeholder="$30,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 SS Start Age</Label>
                    <Input 
                      value={sharedInputs.client2SSStartAge}
                      onChange={(e) => updateSharedInput('client2SSStartAge', e.target.value)}
                      placeholder="67" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Other Income Sources</Label>
                  <Button onClick={addIncomeSource} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Income Source
                  </Button>
                </div>

                {sharedInputs.otherIncomeSources.map((source, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Income Source {index + 1}</Label>
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
                          placeholder="Income source name" 
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
                            <SelectItem value="Pension">Pension</SelectItem>
                            <SelectItem value="Annuity">Annuity</SelectItem>
                            <SelectItem value="Rental Income">Rental Income</SelectItem>
                            <SelectItem value="Business Income">Business Income</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
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
                            <SelectItem value="Client 1">Client 1</SelectItem>
                            <SelectItem value="Client 2">Client 2</SelectItem>
                            <SelectItem value="Joint">Joint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm">Start Age</Label>
                        <Input value={source.startAge} onChange={e => updateIncomeSource(index, 'startAge', e.target.value)} placeholder="65" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Amount</Label>
                        <Input value={source.amount} onChange={e => updateIncomeSource(index, 'amount', e.target.value)} placeholder="$2,000" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Frequency</Label>
                        <Select value={source.frequency} onValueChange={value => updateIncomeSource(index, 'frequency', value)}>
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
                        <Select value={source.valueType} onValueChange={value => updateIncomeSource(index, 'valueType', value)}>
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
                        <Select value={source.payableFor} onValueChange={value => updateIncomeSource(index, 'payableFor', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="life">Life</SelectItem>
                            <SelectItem value="specific-age">Until Specific Age</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {source.payableFor === 'specific-age' && <div>
                          <Label className="text-sm">End Age</Label>
                          <Input value={source.endAge} onChange={e => updateIncomeSource(index, 'endAge', e.target.value)} placeholder="85" className="mt-1" />
                        </div>}
                      <div>
                        <Label className="text-sm">Inflation Rate</Label>
                        <Input value={source.inflationRate} onChange={e => updateIncomeSource(index, 'inflationRate', e.target.value)} placeholder="3.0%" className="mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capital</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label className="text-base font-medium">Client 1 Retirement</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Retirement Balance</Label>
                    <Input 
                      value={sharedInputs.client1RetirementBalance}
                      onChange={(e) => updateSharedInput('client1RetirementBalance', e.target.value)}
                      placeholder="$500,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Monthly Contributions</Label>
                    <Input 
                      value={sharedInputs.client1MonthlyContributions}
                      onChange={(e) => updateSharedInput('client1MonthlyContributions', e.target.value)}
                      placeholder="$2,000" 
                      className="mt-1" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Company Match</Label>
                    <Input 
                      value={sharedInputs.client1CompanyMatch}
                      onChange={(e) => updateSharedInput('client1CompanyMatch', e.target.value)}
                      placeholder="$500" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Annual Increase</Label>
                    <Input 
                      value={sharedInputs.client1AnnualIncrease}
                      onChange={(e) => updateSharedInput('client1AnnualIncrease', e.target.value)}
                      placeholder="3%" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Rate of Return</Label>
                    <Input 
                      value={sharedInputs.client1ROR}
                      onChange={(e) => updateSharedInput('client1ROR', e.target.value)}
                      placeholder="7%" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>

              {sharedInputs.hasClient2 && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                  <Label className="text-base font-medium">Client 2 Retirement</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Retirement Balance</Label>
                      <Input 
                        value={sharedInputs.client2RetirementBalance}
                        onChange={(e) => updateSharedInput('client2RetirementBalance', e.target.value)}
                        placeholder="$300,000" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Monthly Contributions</Label>
                      <Input 
                        value={sharedInputs.client2MonthlyContributions}
                        onChange={(e) => updateSharedInput('client2MonthlyContributions', e.target.value)}
                        placeholder="$1,500" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Company Match</Label>
                      <Input 
                        value={sharedInputs.client2CompanyMatch}
                        onChange={(e) => updateSharedInput('client2CompanyMatch', e.target.value)}
                        placeholder="$400" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Annual Increase</Label>
                      <Input 
                        value={sharedInputs.client2AnnualIncrease}
                        onChange={(e) => updateSharedInput('client2AnnualIncrease', e.target.value)}
                        placeholder="3%" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Rate of Return</Label>
                      <Input 
                        value={sharedInputs.client2ROR}
                        onChange={(e) => updateSharedInput('client2ROR', e.target.value)}
                        placeholder="7%" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
              )}
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
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Mortality Age</Label>
                    <Input 
                      value={sharedInputs.client2MortalityAge}
                      onChange={(e) => updateSharedInput('client2MortalityAge', e.target.value)}
                      placeholder="90" 
                      className="mt-1" 
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.inflationRate}
                    onChange={(e) => updateSharedInput('inflationRate', e.target.value)}
                    placeholder="3.0%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 Employment Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.client1EmploymentInflationRate}
                    onChange={(e) => updateSharedInput('client1EmploymentInflationRate', e.target.value)}
                    placeholder="3.0%" 
                    className="mt-1" 
                  />
                </div>
              </div>

              {sharedInputs.hasClient2 && (
                <div>
                  <Label className="text-sm">Client 2 Employment Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.client2EmploymentInflationRate}
                    onChange={(e) => updateSharedInput('client2EmploymentInflationRate', e.target.value)}
                    placeholder="3.0%" 
                    className="mt-1" 
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual Social Security Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.ssBenefitInflationRate}
                    onChange={(e) => updateSharedInput('ssBenefitInflationRate', e.target.value)}
                    placeholder="2.5%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Assumed Rate of Return During Retirement</Label>
                  <Input placeholder="5%" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Solution Rate of Return</Label>
                  <Input placeholder="6%" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Number of Months Since Last Review</Label>
                  <Input placeholder="12" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
