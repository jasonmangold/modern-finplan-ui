import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, TrendingUp, GraduationCap, Settings, Plus, Trash2, School, HelpCircle } from "lucide-react";
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

  const addChild = () => {
    const newChildren = [...sharedInputs.children, { 
      StudentName: '', 
      StudentBirth: '',
      schools: [],
      EduPercentageToFund: '100',
      EduAmountCurrentlySaved: '',
      EduPlannedMonthlySavings: ''
    }];
    updateSharedInput('children', newChildren);
  };
  
  const removeChild = (index: number) => {
    const newChildren = sharedInputs.children.filter((_, i) => i !== index);
    updateSharedInput('children', newChildren);
  };
  
  const updateChild = (index: number, field: string, value: any) => {
    const newChildren = [...sharedInputs.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateSharedInput('children', newChildren);
  };

  const addSchool = (childIndex: number) => {
    const newChildren = [...sharedInputs.children];
        newChildren[childIndex].schools.push({
          CollegeName: '',
          CollegeStateText: '',
          AnnualCosts: '',
          AgeWhenSchoolBegins: '18',
          YearsInSchool: '4',
          UseCollegeBoardInfo: false,
          CollegeState: '',
          IncludeOutOfStateFees: false,
          IncludeRoomBoardBooksAndOther: false
        });
    updateSharedInput('children', newChildren);
  };

  const removeSchool = (childIndex: number, schoolIndex: number) => {
    const newChildren = [...sharedInputs.children];
    newChildren[childIndex].schools = newChildren[childIndex].schools.filter((_, i) => i !== schoolIndex);
    updateSharedInput('children', newChildren);
  };

  const updateSchool = (childIndex: number, schoolIndex: number, field: string, value: string) => {
    const newChildren = [...sharedInputs.children];
    newChildren[childIndex].schools[schoolIndex] = {
      ...newChildren[childIndex].schools[schoolIndex],
      [field]: value
    };
    updateSharedInput('children', newChildren);
  };

  const formatPercentageInput = (value: string) => {
    // Remove any non-numeric characters except decimal points
    const numericValue = value.replace(/[^\d.]/g, '');
    // Add % symbol if not already present
    return numericValue ? `${numericValue}%` : '';
  };

  const handlePercentageChange = (childIndex: number, value: string) => {
    const formattedValue = formatPercentageInput(value);
    updateChild(childIndex, 'EduPercentageToFund', formattedValue);
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
              {sharedInputs.children.map((child, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50/50">
                  <div>
                    <Label className="text-sm">Child {index + 1} Name</Label>
                    <Input 
                      value={child.StudentName}
                      onChange={(e) => updateChild(index, 'StudentName', e.target.value)}
                      placeholder={`Enter child ${index + 1} name`} 
                      className="mt-1" 
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm">Date of Birth</Label>
                      <Input 
                        type="date"
                        value={child.StudentBirth}
                        onChange={(e) => updateChild(index, 'StudentBirth', e.target.value)}
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
                <p className="text-gray-500 text-center py-4">No children added yet</p>
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

        <TabsContent value="capital-debt" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capital & Debt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                <Label className="text-base font-medium">Client 1 Retirement</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Retirement Balance</Label>
                    <Input 
                      value={sharedInputs.Client1_RPBalance}
                       onChange={(e) => updateSharedInput('Client1_RPBalance', e.target.value)}
                      placeholder="$500,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Monthly Contributions</Label>
                    <Input 
                      value={sharedInputs.Client1_RPMonthlyContribution}
                       onChange={(e) => updateSharedInput('Client1_RPMonthlyContribution', e.target.value)}
                      placeholder="$2,000" 
                      className="mt-1" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Company Match</Label>
                    <Input 
                      value={sharedInputs.Client1_RPCompanyMatch}
                       onChange={(e) => updateSharedInput('Client1_RPCompanyMatch', e.target.value)}
                      placeholder="$200" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Annual Increase %</Label>
                    <Input 
                      value={sharedInputs.Client1_RPAnnualIncrease}
                       onChange={(e) => updateSharedInput('Client1_RPAnnualIncrease', e.target.value)}
                      placeholder="3%" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">ROR %</Label>
                    <Input 
                      value={sharedInputs.Client1_RPRateOfReturn}
                       onChange={(e) => updateSharedInput('Client1_RPRateOfReturn', e.target.value)}
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
                        value={sharedInputs.Client2_RPBalance}
                         onChange={(e) => updateSharedInput('Client2_RPBalance', e.target.value)}
                        placeholder="$400,000" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Monthly Contributions</Label>
                      <Input 
                        value={sharedInputs.Client2_RPMonthlyContribution}
                         onChange={(e) => updateSharedInput('Client2_RPMonthlyContribution', e.target.value)}
                        placeholder="$1,500" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Company Match</Label>
                      <Input 
                        value={sharedInputs.Client2_RPCompanyMatch}
                         onChange={(e) => updateSharedInput('Client2_RPCompanyMatch', e.target.value)}
                        placeholder="$150" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Annual Increase %</Label>
                      <Input 
                        value={sharedInputs.Client2_RPAnnualIncrease}
                         onChange={(e) => updateSharedInput('Client2_RPAnnualIncrease', e.target.value)}
                        placeholder="3%" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">ROR %</Label>
                      <Input 
                        value={sharedInputs.Client2_RPRateOfReturn}
                         onChange={(e) => updateSharedInput('Client2_RPRateOfReturn', e.target.value)}
                        placeholder="7%" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="delayRetirementFunds" 
                  checked={sharedInputs.delayRetirementFunds}
                  onCheckedChange={(checked) => updateSharedInput('delayRetirementFunds', checked)}
                />
                <Label htmlFor="delayRetirementFunds" className="text-sm">Delay using retirement funds until retired</Label>
              </div>

              <div>
                <Label className="text-sm">Cash</Label>
                <Input 
                  value={sharedInputs.cash}
                  onChange={(e) => updateSharedInput('cash', e.target.value)}
                  placeholder="$50,000" 
                  className="mt-1" 
                />
              </div>

              <div>
                <Label className="text-sm">Other Assets</Label>
                <Input 
                  value={sharedInputs.otherAssets}
                  onChange={(e) => updateSharedInput('otherAssets', e.target.value)}
                  placeholder="$50,000" 
                  className="mt-1" 
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Current Life Insurance</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Label className="text-sm w-20">Client 1:</Label>
                    <Input 
                      value={sharedInputs.client1LifeInsurance}
                      onChange={(e) => updateSharedInput('client1LifeInsurance', e.target.value)}
                      placeholder="$500,000" 
                      className="flex-1" 
                    />
                  </div>
                  {sharedInputs.hasClient2 && (
                    <div className="flex items-center gap-4">
                      <Label className="text-sm w-20">Client 2:</Label>
                      <Input 
                        value={sharedInputs.client2LifeInsurance}
                        onChange={(e) => updateSharedInput('client2LifeInsurance', e.target.value)}
                        placeholder="$400,000" 
                        className="flex-1" 
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Debts to Be Repaid</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Label className="text-sm w-32">Mortgage Balance:</Label>
                    <Input 
                      value={sharedInputs.mortgageBalance}
                      onChange={(e) => updateSharedInput('mortgageBalance', e.target.value)}
                      placeholder="$300,000" 
                      className="flex-1" 
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="text-sm w-32">Other Debt:</Label>
                    <Input 
                      value={sharedInputs.otherDebt}
                      onChange={(e) => updateSharedInput('otherDebt', e.target.value)}
                      placeholder="$25,000" 
                      className="flex-1" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          <Tabs defaultValue={sharedInputs.children.length > 0 ? "child-0" : undefined} className="w-full">
            <TabsList className="w-full justify-start">
              {sharedInputs.children.map((child, index) => (
                <TabsTrigger key={index} value={`child-${index}`} className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 flex-shrink-0" />
                  <span>{child.StudentName || `Child ${index + 1}`}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {sharedInputs.children.map((child, childIndex) => (
              <TabsContent key={childIndex} value={`child-${childIndex}`} className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Education Planning for {child.StudentName || `Child ${childIndex + 1}`}
                      <Button onClick={() => addSchool(childIndex)} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add School
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Schools Section */}
                    <div className="space-y-4">
                      <h3 className="text-md font-medium flex items-center gap-2">
                        <School className="h-4 w-4" />
                        Educational Institutions
                      </h3>
                      
                      {child.schools?.map((school, schoolIndex) => (
                        <div key={schoolIndex} className="p-4 border rounded-lg bg-blue-50/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">School {schoolIndex + 1}</h4>
                            <Button 
                              onClick={() => removeSchool(childIndex, schoolIndex)} 
                              size="sm" 
                              variant="outline"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">School Name</Label>
                              <Input 
                                value={school.CollegeName}
                                onChange={(e) => updateSchool(childIndex, schoolIndex, 'CollegeName', e.target.value)}
                                placeholder="Enter school name" 
                                className="mt-1" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Annual Tuition Cost</Label>
                              <Input 
                                value={school.AnnualCosts}
                                onChange={(e) => updateSchool(childIndex, schoolIndex, 'AnnualCosts', e.target.value)}
                                placeholder="$50,000" 
                                className="mt-1" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Age When School Begins</Label>
                              <Input 
                                value={school.AgeWhenSchoolBegins}
                                onChange={(e) => updateSchool(childIndex, schoolIndex, 'AgeWhenSchoolBegins', e.target.value)}
                                placeholder="18" 
                                className="mt-1" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Number of Years in School</Label>
                              <Input 
                                value={school.YearsInSchool}
                                onChange={(e) => updateSchool(childIndex, schoolIndex, 'YearsInSchool', e.target.value)}
                                placeholder="4" 
                                className="mt-1" 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {child.schools?.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No schools added yet</p>
                      )}
                    </div>

                    {/* Financial Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-md font-medium">Financial Information</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm">Percent to Fund</Label>
                          <Input 
                            value={child.EduPercentageToFund}
                            onChange={(e) => handlePercentageChange(childIndex, e.target.value)}
                            placeholder="100%" 
                            className="mt-1" 
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Amount Currently Saved</Label>
                          <Input 
                            value={child.EduAmountCurrentlySaved}
                            onChange={(e) => updateChild(childIndex, 'EduAmountCurrentlySaved', e.target.value)}
                            placeholder="$10,000" 
                            className="mt-1" 
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Planned Monthly Savings</Label>
                          <Input 
                            value={child.EduPlannedMonthlySavings}
                            onChange={(e) => updateChild(childIndex, 'EduPlannedMonthlySavings', e.target.value)}
                            placeholder="$500" 
                            className="mt-1" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
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
                  value={sharedInputs.AnalysisDate}
                   onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
                  className="mt-1" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Mortality Age</Label>
                  <Input 
                    value={sharedInputs.MortalityAge}
                     onChange={(e) => updateSharedInput('MortalityAge', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Mortality Age</Label>
                    <Input 
                      value={sharedInputs.MortalityAgeOfClient2}
                       onChange={(e) => updateSharedInput('MortalityAgeOfClient2', e.target.value)}
                      placeholder="90" 
                      className="mt-1" 
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Final Expenses</Label>
                  <Input placeholder="$25,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Emergency Reserves (Months of Employment Income)</Label>
                  <Input placeholder="6" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Assumed Rate of Return on Survivor's Assets</Label>
                <Input placeholder="6%" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm">Inflation Rate</Label>
                <Input 
                  value={sharedInputs.AnnualInflationRate}
                   onChange={(e) => updateSharedInput('AnnualInflationRate', e.target.value)}
                  placeholder="3%" 
                  className="mt-1" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual Employment Inflation Rate - Client 1</Label>
                  <Input 
                    value={sharedInputs.Client1_AnnualEmploymentInflationRate}
                     onChange={(e) => updateSharedInput('Client1_AnnualEmploymentInflationRate', e.target.value)}
                    placeholder="3%" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Annual Employment Inflation Rate - Client 2</Label>
                    <Input 
                      value={sharedInputs.Client2_AnnualEmploymentInflationRate}
                       onChange={(e) => updateSharedInput('Client2_AnnualEmploymentInflationRate', e.target.value)}
                      placeholder="3%" 
                      className="mt-1" 
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Education Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.AnnualEducationInflationRate}
                     onChange={(e) => updateSharedInput('AnnualEducationInflationRate', e.target.value)}
                    placeholder="5%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Annual Rate of Return on Education Assets</Label>
                  <Input 
                    value={sharedInputs.RateOfReturnOnEducationAssets}
                     onChange={(e) => updateSharedInput('RateOfReturnOnEducationAssets', e.target.value)}
                    placeholder="7%" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Annual Social Security Benefit Inflation Rate</Label>
                <Input 
                  value={sharedInputs.AnnualSocialSecurityBenefitInflationRate}
                   onChange={(e) => updateSharedInput('AnnualSocialSecurityBenefitInflationRate', e.target.value)}
                  placeholder="2.5%" 
                  className="mt-1" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <HelpDialog
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        sections={getHelpText("survivor-needs")}
        title="Survivor Needs Analysis Help"
      />
    </div>
  );
};
