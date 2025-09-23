import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, DollarSign, TrendingUp, Settings, Plus, Trash2, HelpCircle } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";

export const RetirementAccumulationInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  const [activeTab, setActiveTab] = useState("personal");
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

      <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
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
          <TabsTrigger value="capital" className="flex items-center gap-2 px-3 py-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            Capital
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Client 1 First Name</Label>
                  <Input 
                    value={sharedInputs.Client1_FirstName}
                    onChange={(e) => updateSharedInput('Client1_FirstName', e.target.value)}
                    placeholder="Enter first name" 
                    className="mt-1.5 h-9" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Client 1 Middle Name</Label>
                  <Input 
                    value={sharedInputs.Client1_MiddleName}
                    onChange={(e) => updateSharedInput('Client1_MiddleName', e.target.value)}
                    placeholder="Enter middle name" 
                    className="mt-1.5 h-9" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Client 1 Last Name</Label>
                  <Input 
                    value={sharedInputs.Client1_LastName}
                    onChange={(e) => updateSharedInput('Client1_LastName', e.target.value)}
                    placeholder="Enter last name" 
                    className="mt-1.5 h-9" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Client 1 Date of Birth</Label>
                  <Input 
                    type="date"
                    value={sharedInputs.Client1_BirthDate}
                    onChange={(e) => updateSharedInput('Client1_BirthDate', e.target.value)}
                    className="mt-1.5 h-9" 
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
                <div>
                  <Label className="text-sm">Client 1 Social Security Start Age</Label>
                  <Input 
                    value={sharedInputs.Client1_SocialSecurityPaymentsStartAge}
                    onChange={(e) => updateSharedInput('Client1_SocialSecurityPaymentsStartAge', e.target.value)}
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
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Client 2 First Name</Label>
                      <Input 
                        value={sharedInputs.Client2_FirstName}
                        onChange={(e) => updateSharedInput('Client2_FirstName', e.target.value)}
                        placeholder="Enter first name" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Client 2 Middle Name</Label>
                      <Input 
                        value={sharedInputs.Client2_MiddleName}
                        onChange={(e) => updateSharedInput('Client2_MiddleName', e.target.value)}
                        placeholder="Enter middle name" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Client 2 Last Name</Label>
                      <Input 
                        value={sharedInputs.Client2_LastName}
                        onChange={(e) => updateSharedInput('Client2_LastName', e.target.value)}
                        placeholder="Enter last name" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
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
                    <div>
                      <Label className="text-sm">Client 2 Social Security Start Age</Label>
                      <Input 
                        value={sharedInputs.Client2_SocialSecurityPaymentsStartAge}
                        onChange={(e) => updateSharedInput('Client2_SocialSecurityPaymentsStartAge', e.target.value)}
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
        </TabsContent>

        <TabsContent value="income-needs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Income Needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Beginning at retirement */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Beginning at retirement</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="retirement-dollar" 
                      name="retirement-method"
                      className="w-4 h-4" 
                      defaultChecked
                    />
                    <Input placeholder="$0" className="w-24" />
                    <span className="text-sm">or</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="retirement-percent" 
                      name="retirement-method"
                      className="w-4 h-4" 
                    />
                    <Input placeholder="0" className="w-16" />
                    <span className="text-sm">% of total current income</span>
                  </div>
                </div>
              </div>

              {/* Beginning X years after retirement - Period 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Beginning</Label>
                  <Input placeholder="0" className="w-16" />
                  <Label className="text-sm font-medium">years after retirement</Label>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="period1-dollar" 
                      name="period1-method"
                      className="w-4 h-4" 
                      defaultChecked
                    />
                    <Input placeholder="$0" className="w-24" />
                    <span className="text-sm">or</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="period1-percent" 
                      name="period1-method"
                      className="w-4 h-4" 
                    />
                    <Input placeholder="0" className="w-16" />
                    <span className="text-sm">% of total current income</span>
                  </div>
                </div>
              </div>

              {/* Beginning X years after retirement - Period 2 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Beginning</Label>
                  <Input placeholder="0" className="w-16" />
                  <Label className="text-sm font-medium">years after retirement</Label>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="period2-dollar" 
                      name="period2-method"
                      className="w-4 h-4" 
                      defaultChecked
                    />
                    <Input placeholder="$0" className="w-24" />
                    <span className="text-sm">or</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="period2-percent" 
                      name="period2-method"
                      className="w-4 h-4" 
                    />
                    <Input placeholder="0" className="w-16" />
                    <span className="text-sm">% of total current income</span>
                  </div>
                </div>
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

        <TabsContent value="capital" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capital</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Retirement Plans</Label>
                </div>

                <div className="space-y-4 p-4 border rounded-lg bg-background">
                  <Label className="text-sm font-medium">Client 1:</Label>
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
                        placeholder="$500" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Annual Increase</Label>
                      <Input 
                        value={sharedInputs.Client1_RPAnnualIncrease}
                        onChange={(e) => updateSharedInput('Client1_RPAnnualIncrease', e.target.value)}
                        placeholder="3%" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Rate of Return</Label>
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
                  <div className="space-y-4 p-4 border rounded-lg bg-background">
                    <Label className="text-sm font-medium">Client 2:</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Retirement Balance</Label>
                        <Input 
                          value={sharedInputs.Client2_RPBalance}
                          onChange={(e) => updateSharedInput('Client2_RPBalance', e.target.value)}
                          placeholder="$300,000" 
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
                          placeholder="$400" 
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Annual Increase</Label>
                        <Input 
                          value={sharedInputs.Client2_RPAnnualIncrease}
                          onChange={(e) => updateSharedInput('Client2_RPAnnualIncrease', e.target.value)}
                          placeholder="3%" 
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Rate of Return</Label>
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

                <div className="space-y-4 p-4 border rounded-lg bg-background">
                  <Label className="text-sm font-medium">Other Assets:</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Balance</Label>
                      <Input 
                        value={sharedInputs.OtherAssetBalance}
                        onChange={(e) => updateSharedInput('OtherAssetBalance', e.target.value)}
                        placeholder="$100,000" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Monthly Contributions</Label>
                      <Input 
                        value={sharedInputs.OtherAssetMonthlyContribution}
                        onChange={(e) => updateSharedInput('OtherAssetMonthlyContribution', e.target.value)}
                        placeholder="$500" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Rate of Return</Label>
                      <Input 
                        value={sharedInputs.OtherAssetRoR}
                        onChange={(e) => updateSharedInput('OtherAssetRoR', e.target.value)}
                        placeholder="6%" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
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
                  value={sharedInputs.AnalysisDate}
                  onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
                  className="mt-1" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Mortality Age - Client 1</Label>
                  <Input 
                    value={sharedInputs.MortalityAge}
                    onChange={(e) => updateSharedInput('MortalityAge', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 2</Label>
                  <Input 
                    value={sharedInputs.MortalityAgeOfClient2}
                    onChange={(e) => updateSharedInput('MortalityAgeOfClient2', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Annual Inflation Rate</Label>
                <Input 
                  value={sharedInputs.AnnualInflationRate}
                  onChange={(e) => updateSharedInput('AnnualInflationRate', e.target.value)}
                  placeholder="3.0%" 
                  className="mt-1" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual Employment Inflation Rate - Client 1</Label>
                  <Input 
                    value={sharedInputs.Client1_AnnualEmploymentInflationRate}
                    onChange={(e) => updateSharedInput('Client1_AnnualEmploymentInflationRate', e.target.value)}
                    placeholder="3.0%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 2</Label>
                  <Input 
                    value={sharedInputs.Client2_AnnualEmploymentInflationRate}
                    onChange={(e) => updateSharedInput('Client2_AnnualEmploymentInflationRate', e.target.value)}
                    placeholder="3.0%" 
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

              <div className="border-t pt-4 mt-6">
                <h4 className="text-sm font-medium mb-4">Specific to the Retirement Analysis</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Assumed Rate of Return During Retirement</Label>
                    <Input placeholder="5%" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Solution Rate of Return</Label>
                    <Input placeholder="6%" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Number of Months Since the Last Review</Label>
                    <Input placeholder="12" className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <HelpDialog
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        sections={getHelpText("retirement-accumulation", activeTab)}
        title={`Retirement Accumulation - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Help`}
      />
    </div>
  );
};
