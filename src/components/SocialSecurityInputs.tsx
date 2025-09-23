import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, TrendingUp, Plus, Trash2, Settings } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const SocialSecurityInputs = () => {
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
          <TabsTrigger value="income-sources" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Income Sources
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
              {/* Client 1 Section */}
              <div className="space-y-3 p-3 border rounded-md">
                <Label className="text-sm font-medium text-muted-foreground">Client 1</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">First Name:</Label>
                    <Input 
                      value={sharedInputs.Client1_FirstName}
                      onChange={(e) => updateSharedInput('Client1_FirstName', e.target.value)}
                      placeholder="First name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Last Name:</Label>
                    <Input 
                      value={sharedInputs.Client1_LastName}
                      onChange={(e) => updateSharedInput('Client1_LastName', e.target.value)}
                      placeholder="Last name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Date of birth:</Label>
                    <Input 
                      type="date"
                      value={sharedInputs.Client1_BirthDate}
                      onChange={(e) => updateSharedInput('Client1_BirthDate', e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Retirement age:</Label>
                    <Input 
                      value={sharedInputs.Client1_RetirementAge}
                      onChange={(e) => updateSharedInput('Client1_RetirementAge', e.target.value)}
                      placeholder="65" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>

              {/* Client 2 Section */}
              <div className="space-y-3 p-3 border rounded-md">
                <Label className="text-sm font-medium text-muted-foreground">Client 2</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">First Name:</Label>
                    <Input 
                      value={sharedInputs.Client2_FirstName}
                      onChange={(e) => updateSharedInput('Client2_FirstName', e.target.value)}
                      placeholder="First name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Last Name:</Label>
                    <Input 
                      value={sharedInputs.Client2_LastName}
                      onChange={(e) => updateSharedInput('Client2_LastName', e.target.value)}
                      placeholder="Last name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Date of birth:</Label>
                    <Input 
                      type="date"
                      value={sharedInputs.Client2_BirthDate}
                      onChange={(e) => updateSharedInput('Client2_BirthDate', e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Retirement age:</Label>
                    <Input 
                      value={sharedInputs.Client2_RetirementAge}
                      onChange={(e) => updateSharedInput('Client2_RetirementAge', e.target.value)}
                      placeholder="65" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>

              {/* Marital Status */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="married" 
                  checked={sharedInputs.ClientsAreMarried}
                  onCheckedChange={(checked) => updateSharedInput('ClientsAreMarried', checked)}
                />
                <Label htmlFor="married" className="text-sm">Clients are married</Label>
              </div>

              {/* Alternate Social Security Start Ages */}
              <div className="space-y-3 p-3 border rounded-md">
                <Label className="text-sm font-medium text-muted-foreground">Alternate Social Security start ages for comparison</Label>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Client 1</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Alternate age 1</Label>
                        <Input 
                          value={sharedInputs.client1AlternateAge1 || ''}
                          onChange={(e) => updateSharedInput('client1AlternateAge1', e.target.value)}
                          placeholder="0" 
                          className="mt-1 text-center" 
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Alternate age 2</Label>
                        <Input 
                          value={sharedInputs.client1AlternateAge2 || ''}
                          onChange={(e) => updateSharedInput('client1AlternateAge2', e.target.value)}
                          placeholder="0" 
                          className="mt-1 text-center" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Client 2</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">0</Label>
                        <Input 
                          value={sharedInputs.client2AlternateAge1 || ''}
                          onChange={(e) => updateSharedInput('client2AlternateAge1', e.target.value)}
                          placeholder="0" 
                          className="mt-1 text-center" 
                        />
                      </div>
                      <div>
                        <Label className="text-xs">0</Label>
                        <Input 
                          value={sharedInputs.client2AlternateAge2 || ''}
                          onChange={(e) => updateSharedInput('client2AlternateAge2', e.target.value)}
                          placeholder="0" 
                          className="mt-1 text-center" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded-md">
                Note: Retirement age only affects when the client's employment income stops.
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
                    value={sharedInputs.Client1_AnnualSalary}
                    onChange={(e) => updateSharedInput('Client1_AnnualSalary', e.target.value)}
                    placeholder="$100,000" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Annual Employment Income</Label>
                    <Input 
                      value={sharedInputs.Client2_AnnualSalary}
                      onChange={(e) => updateSharedInput('Client2_AnnualSalary', e.target.value)}
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
                    value={sharedInputs.Client1_SocialSecurityCalculation}
                    onChange={(e) => updateSharedInput('Client1_SocialSecurityCalculation', e.target.value)}
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
                      value={sharedInputs.Client2_SocialSecurityCalculation}
                      onChange={(e) => updateSharedInput('Client2_SocialSecurityCalculation', e.target.value)}
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
                           value={source.Name}
                           onChange={(e) => updateIncomeSource(index, 'Name', e.target.value)}
                           placeholder="Income source name" 
                           className="mt-1" 
                         />
                       </div>
                       <div>
                         <Label className="text-sm">Type</Label>
                         <Select 
                           value={source.TypeOfIncome} 
                           onValueChange={(value) => updateIncomeSource(index, 'TypeOfIncome', value)}
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
                           value={source.Owner1BasedIndex} 
                           onValueChange={(value) => updateIncomeSource(index, 'Owner1BasedIndex', value)}
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
                         <Input value={source.StartAge} onChange={e => updateIncomeSource(index, 'StartAge', e.target.value)} placeholder="65" className="mt-1" />
                       </div>
                       <div>
                         <Label className="text-sm">Amount</Label>
                         <Input value={source.Amount} onChange={e => updateIncomeSource(index, 'Amount', e.target.value)} placeholder="$2,000" className="mt-1" />
                       </div>
                       <div>
                         <Label className="text-sm">Frequency</Label>
                         <Select value={source.IncomeTimeFrame} onValueChange={value => updateIncomeSource(index, 'IncomeTimeFrame', value)}>
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
                         <Select value={source.Period} onValueChange={value => updateIncomeSource(index, 'Period', value)}>
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
                         <Select value={source.PayableForLife} onValueChange={value => updateIncomeSource(index, 'PayableForLife', value)}>
                           <SelectTrigger className="mt-1">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="life">Life</SelectItem>
                             <SelectItem value="specific-age">Until Specific Age</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                       {source.PayableForLife === 'specific-age' && <div>
                           <Label className="text-sm">End Age</Label>
                           <Input value={source.EndAge} onChange={e => updateIncomeSource(index, 'EndAge', e.target.value)} placeholder="85" className="mt-1" />
                         </div>}
                       <div>
                         <Label className="text-sm">Inflation Rate</Label>
                         <Input value={source.AnnualInflationRate} onChange={e => updateIncomeSource(index, 'AnnualInflationRate', e.target.value)} placeholder="3.0%" className="mt-1" />
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Applicable to all analyses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Mortality age - Client 1:</Label>
                  <Input 
                    value={sharedInputs.client1MortalityAge || ''}
                    onChange={(e) => updateSharedInput('client1MortalityAge', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 2:</Label>
                  <Input 
                    value={sharedInputs.client2MortalityAge || ''}
                    onChange={(e) => updateSharedInput('client2MortalityAge', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual employment inflation rate - Client 1:</Label>
                  <div className="relative mt-1">
                    <Input 
                      value={sharedInputs.client1EmploymentInflationRate || ''}
                      onChange={(e) => updateSharedInput('client1EmploymentInflationRate', e.target.value)}
                      placeholder="4" 
                      className="pr-8" 
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Client 2:</Label>
                  <div className="relative mt-1">
                    <Input 
                      value={sharedInputs.client2EmploymentInflationRate || ''}
                      onChange={(e) => updateSharedInput('client2EmploymentInflationRate', e.target.value)}
                      placeholder="4" 
                      className="pr-8" 
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual social security benefit inflation rate:</Label>
                  <div className="relative mt-1">
                    <Input 
                      value={sharedInputs.ssBenefitInflationRate || ''}
                      onChange={(e) => updateSharedInput('ssBenefitInflationRate', e.target.value)}
                      placeholder="2" 
                      className="pr-8" 
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Income tax rate:</Label>
                  <div className="relative mt-1">
                    <Input 
                      value={sharedInputs.incomeTaxRate || ''}
                      onChange={(e) => updateSharedInput('incomeTaxRate', e.target.value)}
                      placeholder="0" 
                      className="pr-8" 
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
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