import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, TrendingUp, GraduationCap, Settings, Plus, Trash2, HelpCircle } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";

export const SurvivorNeedsInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };

  // Helper functions for indexed children fields
  const getStudentName = (index: number): string => {
    return sharedInputs[`StudentName${index}` as keyof typeof sharedInputs] as string || '';
  };

  const getStudentBirth = (index: number): string => {
    return sharedInputs[`StudentBirth${index}` as keyof typeof sharedInputs] as string || '';
  };

  const updateStudentName = (index: number, value: string) => {
    updateSharedInput(`StudentName${index}` as keyof typeof sharedInputs, value);
  };

  const updateStudentBirth = (index: number, value: string) => {
    updateSharedInput(`StudentBirth${index}` as keyof typeof sharedInputs, value);
  };

  const getChildren = () => {
    const children = [];
    for (let i = 0; i < 5; i++) {
      const name = getStudentName(i);
      const birth = getStudentBirth(i);
      if (name || birth) {
        children.push({ index: i, StudentName: name, StudentBirth: birth });
      }
    }
    return children;
  };

  const addChild = () => {
    const children = getChildren();
    if (children.length < 5) {
      const nextIndex = children.length;
      updateStudentName(nextIndex, '');
      updateStudentBirth(nextIndex, '');
    }
  };

  const removeChild = (index: number) => {
    // Shift all subsequent children down
    for (let i = index; i < 4; i++) {
      const nextName = getStudentName(i + 1);
      const nextBirth = getStudentBirth(i + 1);
      updateStudentName(i, nextName);
      updateStudentBirth(i, nextBirth);
    }
    // Clear the last slot
    updateStudentName(4, '');
    updateStudentBirth(4, '');
  };

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
    <div className="space-y-4">
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

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start bg-muted h-auto p-1 gap-1">
          <TabsTrigger value="personal" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="income-needs" className="flex items-center gap-2 px-3 py-2 text-sm">
            <DollarSign className="h-4 w-4" />
            Income Needs
          </TabsTrigger>
          <TabsTrigger value="income-sources" className="flex items-center gap-2 px-3 py-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            Income Sources
          </TabsTrigger>
          <TabsTrigger value="capital-debt" className="flex items-center gap-2 px-3 py-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            Capital & Debt
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2 px-3 py-2 text-sm">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 First Name</Label>
                  <Input 
                    value={sharedInputs.Client1_FirstName}
                    onChange={(e) => updateSharedInput('Client1_FirstName', e.target.value)}
                    placeholder="First name" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 Last Name</Label>
                  <Input 
                    value={sharedInputs.Client1_LastName}
                    onChange={(e) => updateSharedInput('Client1_LastName', e.target.value)}
                    placeholder="Last name" 
                    className="mt-1" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Date of Birth</Label>
                  <Input 
                    type="date"
                    value={sharedInputs.Client1_BirthDate}
                    onChange={(e) => updateSharedInput('Client1_BirthDate', e.target.value)}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 Retirement Age</Label>
                  <Input 
                    value={sharedInputs.Client1_RetirementAge}
                    onChange={(e) => updateSharedInput('Client1_RetirementAge', e.target.value)}
                    placeholder="67" 
                    className="mt-1" 
                  />
                </div>
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
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Client 2 First Name</Label>
                      <Input 
                        value={sharedInputs.Client2_FirstName}
                        onChange={(e) => updateSharedInput('Client2_FirstName', e.target.value)}
                        placeholder="First name" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Client 2 Last Name</Label>
                      <Input 
                        value={sharedInputs.Client2_LastName}
                        onChange={(e) => updateSharedInput('Client2_LastName', e.target.value)}
                        placeholder="Last name" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Client 2 Date of Birth</Label>
                      <Input 
                        type="date"
                        value={sharedInputs.Client2_BirthDate}
                        onChange={(e) => updateSharedInput('Client2_BirthDate', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Client 2 Retirement Age</Label>
                      <Input 
                        value={sharedInputs.Client2_RetirementAge}
                        onChange={(e) => updateSharedInput('Client2_RetirementAge', e.target.value)}
                        placeholder="67" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {sharedInputs.hasClient2 && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="married" 
                    checked={sharedInputs.ClientsAreMarried}
                    onCheckedChange={(checked) => updateSharedInput('ClientsAreMarried', checked)}
                  />
                  <Label htmlFor="married" className="text-sm">Married</Label>
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
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 p-2 border-b font-medium text-sm bg-muted/30">
                  <div>Name</div>
                  <div>Date of birth</div>
                  <div className="text-center">--- Dependent of ---</div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-2 border-b font-medium text-sm bg-muted/30">
                  <div></div>
                  <div></div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>Client 1</div>
                    <div>Client 2</div>
                  </div>
                  <div></div>
                </div>
                
                {getChildren().map(({ index }) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-2 items-center border rounded-lg">
                    <div>
                      <Input 
                        value={getStudentName(index)}
                        onChange={(e) => updateStudentName(index, e.target.value)}
                        placeholder={`Child ${index + 1} name`} 
                        className="h-8" 
                      />
                    </div>
                    <div>
                      <Input 
                        type="date"
                        value={getStudentBirth(index)}
                        onChange={(e) => updateStudentBirth(index, e.target.value)}
                        className="h-8" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 justify-items-center">
                      <Checkbox 
                        checked={false}
                        onCheckedChange={(checked) => {}}
                      />
                      <Checkbox 
                        checked={false}
                        onCheckedChange={(checked) => {}}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => removeChild(index)} 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {getChildren().length === 0 && (
                  <p className="text-gray-500 text-center py-4">No children added yet</p>
                )}
              </div>
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
                <Label className="text-sm">Monthly Income Need Today</Label>
                <Input placeholder="$8,000" className="mt-1" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">When Youngest Child Reaches Age</Label>
                  <Input placeholder="18" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Amount</Label>
                  <Input placeholder="$6,000" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Beginning at Retirement</Label>
                <Input placeholder="$5,000" className="mt-1" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="includeEducation" />
                <Label htmlFor="includeEducation" className="text-sm">Include Education Funding for Dependents</Label>
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
                      placeholder="$25,000" 
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
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Income Source {index + 1}</h4>
                    <Button onClick={() => removeIncomeSource(index)} size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Name</Label>
                      <Input 
                        value={source.Name || ''}
                        onChange={(e) => updateIncomeSource(index, 'Name', e.target.value)}
                        placeholder="Pension, Rental Income, etc." 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Type</Label>
                      <Select value={source.TypeOfIncome || 'Pension'} onValueChange={(value) => updateIncomeSource(index, 'TypeOfIncome', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pension">Pension</SelectItem>
                          <SelectItem value="Rental Income">Rental Income</SelectItem>
                          <SelectItem value="Investment Income">Investment Income</SelectItem>
                          <SelectItem value="Business Income">Business Income</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Owner</Label>
                      <Select value={source.Owner1BasedIndex || 'Client 1'} onValueChange={(value) => updateIncomeSource(index, 'Owner1BasedIndex', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select owner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Client 1">Client 1</SelectItem>
                          <SelectItem value="Client 2">Client 2</SelectItem>
                          <SelectItem value="Joint">Joint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Start Age</Label>
                      <Input 
                        value={source.StartAge || ''}
                        onChange={(e) => updateIncomeSource(index, 'StartAge', e.target.value)}
                        placeholder="65" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Amount</Label>
                      <Input 
                        value={source.Amount || ''}
                        onChange={(e) => updateIncomeSource(index, 'Amount', e.target.value)}
                        placeholder="$2,000" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {sharedInputs.otherIncomeSources.length === 0 && (
                <p className="text-gray-500 text-center py-4">No additional income sources added</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital-debt" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Retirement Plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium"></th>
                      <th className="text-center p-2 font-medium">Balance</th>
                      <th className="text-center p-2 font-medium">Monthly Contributions</th>
                      <th className="text-center p-2 font-medium">Company Match</th>
                      <th className="text-center p-2 font-medium">Annual Increase</th>
                      <th className="text-center p-2 font-medium">Rate of Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Client 1</td>
                      <td className="p-2">
                        <Input 
                          value={sharedInputs.Client1_RPBalance}
                          onChange={(e) => updateSharedInput('Client1_RPBalance', e.target.value)}
                          placeholder="$91,000" 
                          className="text-center" 
                        />
                      </td>
                      <td className="p-2">
                        <Input 
                          value={sharedInputs.Client1_RPMonthlyContribution}
                          onChange={(e) => updateSharedInput('Client1_RPMonthlyContribution', e.target.value)}
                          placeholder="$300" 
                          className="text-center" 
                        />
                      </td>
                      <td className="p-2">
                        <Input 
                          value={sharedInputs.Client1_RPCompanyMatch}
                          onChange={(e) => updateSharedInput('Client1_RPCompanyMatch', e.target.value)}
                          placeholder="$0" 
                          className="text-center" 
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <Input 
                            value={sharedInputs.Client1_RPAnnualIncrease}
                            onChange={(e) => updateSharedInput('Client1_RPAnnualIncrease', e.target.value)}
                            placeholder="1" 
                            className="text-center flex-1" 
                          />
                          <span className="ml-1 text-sm">%</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <Input 
                            value={sharedInputs.Client1_RPRateOfReturn}
                            onChange={(e) => updateSharedInput('Client1_RPRateOfReturn', e.target.value)}
                            placeholder="6" 
                            className="text-center flex-1" 
                          />
                          <span className="ml-1 text-sm">%</span>
                        </div>
                      </td>
                    </tr>
                    {sharedInputs.hasClient2 && (
                      <tr className="border-b">
                        <td className="p-2 font-medium">Client 2</td>
                        <td className="p-2">
                          <Input 
                            value={sharedInputs.Client2_RPBalance}
                            onChange={(e) => updateSharedInput('Client2_RPBalance', e.target.value)}
                            placeholder="$80,000" 
                            className="text-center" 
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            value={sharedInputs.Client2_RPMonthlyContribution}
                            onChange={(e) => updateSharedInput('Client2_RPMonthlyContribution', e.target.value)}
                            placeholder="$200" 
                            className="text-center" 
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            value={sharedInputs.Client2_RPCompanyMatch}
                            onChange={(e) => updateSharedInput('Client2_RPCompanyMatch', e.target.value)}
                            placeholder="$0" 
                            className="text-center" 
                          />
                        </td>
                        <td className="p-2">
                          <div className="flex items-center">
                            <Input 
                              value={sharedInputs.Client2_RPAnnualIncrease}
                              onChange={(e) => updateSharedInput('Client2_RPAnnualIncrease', e.target.value)}
                              placeholder="1" 
                              className="text-center flex-1" 
                            />
                            <span className="ml-1 text-sm">%</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center">
                            <Input 
                              value={sharedInputs.Client2_RPRateOfReturn}
                              onChange={(e) => updateSharedInput('Client2_RPRateOfReturn', e.target.value)}
                              placeholder="6" 
                              className="text-center flex-1" 
                            />
                            <span className="ml-1 text-sm">%</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="delayRetirement" 
                  checked={sharedInputs.DelayUseOfRetirement}
                  onCheckedChange={(checked) => updateSharedInput('DelayUseOfRetirement', checked)}
                />
                <Label htmlFor="delayRetirement" className="text-sm">Delay using retirement funds until retired</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Other Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm w-20">Cash:</Label>
                  <Input 
                    value={sharedInputs.Cash_Balance}
                    onChange={(e) => updateSharedInput('Cash_Balance', e.target.value)}
                    placeholder="$0" 
                    className="flex-1" 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm w-20">Other:</Label>
                  <Input 
                    value={sharedInputs.OtherAsset_Balance}
                    onChange={(e) => updateSharedInput('OtherAsset_Balance', e.target.value)}
                    placeholder="$35,000" 
                    className="flex-1" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Life Insurance Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm w-20">Client 1:</Label>
                  <Input 
                    value={sharedInputs.Client1_SurvivorLifeInsurance_DeathBenefit}
                    onChange={(e) => updateSharedInput('Client1_SurvivorLifeInsurance_DeathBenefit', e.target.value)}
                    placeholder="$500,000" 
                    className="flex-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm w-20">Client 2:</Label>
                    <Input 
                      value={sharedInputs.Client2_SurvivorLifeInsurance_DeathBenefit}
                      onChange={(e) => updateSharedInput('Client2_SurvivorLifeInsurance_DeathBenefit', e.target.value)}
                      placeholder="$500,000" 
                      className="flex-1" 
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Debts to be repaid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm w-32">Mortgage balance:</Label>
                  <Input 
                    value={sharedInputs.Mortgage_Debt}
                    onChange={(e) => updateSharedInput('Mortgage_Debt', e.target.value)}
                    placeholder="$205,000" 
                    className="flex-1" 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm w-32">Other debt:</Label>
                  <Input 
                    value={sharedInputs.OtherDebt_Debt}
                    onChange={(e) => updateSharedInput('OtherDebt_Debt', e.target.value)}
                    placeholder="$105,000" 
                    className="flex-1" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Education Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500 text-center py-4">
                Education planning details will be shown here
              </p>
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
                  <Label className="text-sm">Analysis Date</Label>
                  <Input 
                    type="date"
                    value={sharedInputs.AnalysisDate}
                    onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
                    placeholder="1/1/2025"
                    className="mt-1" 
                  />
                </div>
                <div></div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Mortality age - Client 1:</Label>
                  <Input 
                    value={sharedInputs.MortalityAge}
                    onChange={(e) => updateSharedInput('MortalityAge', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 2:</Label>
                  <Input 
                    value={sharedInputs.MortalityAgeOfClient2}
                    onChange={(e) => updateSharedInput('MortalityAgeOfClient2', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
                <div></div>
                <div></div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Annual inflation rate:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.AnnualInflationRate.replace('%', '')}
                      onChange={(e) => updateSharedInput('AnnualInflationRate', e.target.value + '%')}
                      placeholder="2.5" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Annual employment inflation rate - Client 1:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.Client1_AnnualEmploymentInflationRate.replace('%', '')}
                      onChange={(e) => updateSharedInput('Client1_AnnualEmploymentInflationRate', e.target.value + '%')}
                      placeholder="1.5" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Client 2:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.Client2_AnnualEmploymentInflationRate.replace('%', '')}
                      onChange={(e) => updateSharedInput('Client2_AnnualEmploymentInflationRate', e.target.value + '%')}
                      placeholder="1.5" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div></div>
                <div></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Annual education inflation rate:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.AnnualEducationInflationRate.replace('%', '')}
                      onChange={(e) => updateSharedInput('AnnualEducationInflationRate', e.target.value + '%')}
                      placeholder="5" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Annual rate of return on education assets:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.RateOfReturnOnEducationAssets.replace('%', '')}
                      onChange={(e) => updateSharedInput('RateOfReturnOnEducationAssets', e.target.value + '%')}
                      placeholder="6" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Annual social security benefit inflation rate:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.AnnualSocialSecurityBenefitInflationRate.replace('%', '')}
                      onChange={(e) => updateSharedInput('AnnualSocialSecurityBenefitInflationRate', e.target.value + '%')}
                      placeholder="2" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Final expenses:</Label>
                  <Input 
                    value={sharedInputs.FinalExpenses}
                    onChange={(e) => updateSharedInput('FinalExpenses', e.target.value)}
                    placeholder="$10,000" 
                    className="mt-1" 
                  />
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Specific to the survivor analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Emergency reserves should be equal to</Label>
                  <div className="flex items-center mt-1 space-x-2">
                    <Input 
                      value={sharedInputs.ReserveInIncomeMonths}
                      onChange={(e) => updateSharedInput('ReserveInIncomeMonths', e.target.value)}
                      placeholder="3" 
                      className="flex-1" 
                    />
                    <span className="text-sm">months total income</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Assumed rate of return for survivor's assets:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.ReserveRateOfReturn.replace('%', '')}
                      onChange={(e) => updateSharedInput('ReserveRateOfReturn', e.target.value + '%')}
                      placeholder="5" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Assumed rate of return during retirement:</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      value={sharedInputs.RetirementRateOfReturn.replace('%', '')}
                      onChange={(e) => updateSharedInput('RetirementRateOfReturn', e.target.value + '%')}
                      placeholder="5" 
                      className="flex-1" 
                    />
                    <span className="ml-1 text-sm">%</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <HelpDialog 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
        sections={getHelpText('survivor-needs')}
      />
    </div>
  );
};