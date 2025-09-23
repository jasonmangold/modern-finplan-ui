import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "@/contexts/FormContext";

export const PersonalFinanceInputs = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { sharedInputs, updateSharedInput } = useFormContext();

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-4">
          <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
          <TabsTrigger value="income" className="text-xs">Income</TabsTrigger>
          <TabsTrigger value="savings" className="text-xs">Savings & Expenses</TabsTrigger>
          <TabsTrigger value="retirement" className="text-xs">Retirement</TabsTrigger>
          <TabsTrigger value="other" className="text-xs">Other</TabsTrigger>
          <TabsTrigger value="assumptions" className="text-xs">Assumptions</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client1-name">Client 1 Name</Label>
                    <Input 
                      id="client1-name" 
                      value={sharedInputs.client1Name}
                      onChange={(e) => updateSharedInput('client1Name', e.target.value)}
                      placeholder="Paul"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client2-name">Client 2 Name</Label>
                    <Input 
                      id="client2-name" 
                      value={sharedInputs.client2Name}
                      onChange={(e) => updateSharedInput('client2Name', e.target.value)}
                      placeholder="Sally"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client1-age">Client 1 Age</Label>
                    <Input 
                      id="client1-age" 
                      type="number" 
                      value={sharedInputs.client1Age}
                      onChange={(e) => updateSharedInput('client1Age', Number(e.target.value))}
                      placeholder="45"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client2-age">Client 2 Age</Label>
                    <Input 
                      id="client2-age" 
                      type="number" 
                      value={sharedInputs.client2Age}
                      onChange={(e) => updateSharedInput('client2Age', Number(e.target.value))}
                      placeholder="42"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client1-gender">Client 1 Gender</Label>
                    <Select 
                      value={sharedInputs.client1Gender} 
                      onValueChange={(value) => updateSharedInput('client1Gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="client2-gender">Client 2 Gender</Label>
                    <Select 
                      value={sharedInputs.client2Gender} 
                      onValueChange={(value) => updateSharedInput('client2Gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client1-retirement">Client 1 Retirement Age</Label>
                    <Input 
                      id="client1-retirement" 
                      type="number" 
                      value={sharedInputs.client1RetirementAge}
                      onChange={(e) => updateSharedInput('client1RetirementAge', Number(e.target.value))}
                      placeholder="67"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client2-retirement">Client 2 Retirement Age</Label>
                    <Input 
                      id="client2-retirement" 
                      type="number" 
                      value={sharedInputs.client2RetirementAge}
                      onChange={(e) => updateSharedInput('client2RetirementAge', Number(e.target.value))}
                      placeholder="67"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client1-life-expectancy">Client 1 Life Expectancy</Label>
                    <Input 
                      id="client1-life-expectancy" 
                      type="number" 
                      value={sharedInputs.client1LifeExpectancy}
                      onChange={(e) => updateSharedInput('client1LifeExpectancy', Number(e.target.value))}
                      placeholder="90"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client2-life-expectancy">Client 2 Life Expectancy</Label>
                    <Input 
                      id="client2-life-expectancy" 
                      type="number" 
                      value={sharedInputs.client2LifeExpectancy}
                      onChange={(e) => updateSharedInput('client2LifeExpectancy', Number(e.target.value))}
                      placeholder="90"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="paul-employment">Paul's Employment Income</Label>
                  <Input 
                    id="paul-employment" 
                    type="number" 
                    value={sharedInputs.paulEmploymentIncome}
                    onChange={(e) => updateSharedInput('paulEmploymentIncome', Number(e.target.value))}
                    placeholder="65000"
                  />
                </div>
                <div>
                  <Label htmlFor="sally-employment">Sally's Employment Income</Label>
                  <Input 
                    id="sally-employment" 
                    type="number" 
                    value={sharedInputs.sallyEmploymentIncome}
                    onChange={(e) => updateSharedInput('sallyEmploymentIncome', Number(e.target.value))}
                    placeholder="50000"
                  />
                </div>
                <div>
                  <Label htmlFor="interest-dividends">Interest and Dividends</Label>
                  <Input 
                    id="interest-dividends" 
                    type="number" 
                    value={sharedInputs.interestDividends}
                    onChange={(e) => updateSharedInput('interestDividends', Number(e.target.value))}
                    placeholder="25000"
                  />
                </div>
                <div>
                  <Label htmlFor="other-income">Other Income</Label>
                  <Input 
                    id="other-income" 
                    type="number" 
                    value={sharedInputs.otherIncome}
                    onChange={(e) => updateSharedInput('otherIncome', Number(e.target.value))}
                    placeholder="17000"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Savings & Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="education-savings">Education Savings</Label>
                  <Input 
                    id="education-savings" 
                    type="number" 
                    value={sharedInputs.educationSavings}
                    onChange={(e) => updateSharedInput('educationSavings', Number(e.target.value))}
                    placeholder="3600"
                  />
                </div>
                <div>
                  <Label htmlFor="retirement-savings">Retirement Savings</Label>
                  <Input 
                    id="retirement-savings" 
                    type="number" 
                    value={sharedInputs.retirementSavings}
                    onChange={(e) => updateSharedInput('retirementSavings', Number(e.target.value))}
                    placeholder="6000"
                  />
                </div>
                <div>
                  <Label htmlFor="other-savings">Other Savings</Label>
                  <Input 
                    id="other-savings" 
                    type="number" 
                    value={sharedInputs.otherSavings}
                    onChange={(e) => updateSharedInput('otherSavings', Number(e.target.value))}
                    placeholder="4800"
                  />
                </div>
                <div>
                  <Label htmlFor="household-expenses">Household Expenses</Label>
                  <Input 
                    id="household-expenses" 
                    type="number" 
                    value={sharedInputs.householdExpenses}
                    onChange={(e) => updateSharedInput('householdExpenses', Number(e.target.value))}
                    placeholder="55908"
                  />
                </div>
                <div>
                  <Label htmlFor="taxes">Taxes</Label>
                  <Input 
                    id="taxes" 
                    type="number" 
                    value={sharedInputs.taxes}
                    onChange={(e) => updateSharedInput('taxes', Number(e.target.value))}
                    placeholder="53484"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retirement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Retirement Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="paul-retirement-assets">Paul's Retirement Assets</Label>
                  <Input 
                    id="paul-retirement-assets" 
                    type="number" 
                    value={sharedInputs.paulRetirementAssets}
                    onChange={(e) => updateSharedInput('paulRetirementAssets', Number(e.target.value))}
                    placeholder="136000"
                  />
                </div>
                <div>
                  <Label htmlFor="sally-retirement-assets">Sally's Retirement Assets</Label>
                  <Input 
                    id="sally-retirement-assets" 
                    type="number" 
                    value={sharedInputs.sallyRetirementAssets}
                    onChange={(e) => updateSharedInput('sallyRetirementAssets', Number(e.target.value))}
                    placeholder="76500"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Other Assets & Liabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="residence">Residence Value</Label>
                  <Input 
                    id="residence" 
                    type="number" 
                    value={sharedInputs.residenceValue}
                    onChange={(e) => updateSharedInput('residenceValue', Number(e.target.value))}
                    placeholder="700000"
                  />
                </div>
                <div>
                  <Label htmlFor="cash">Cash</Label>
                  <Input 
                    id="cash" 
                    type="number" 
                    value={sharedInputs.cash}
                    onChange={(e) => updateSharedInput('cash', Number(e.target.value))}
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label htmlFor="other-assets">Other Assets</Label>
                  <Input 
                    id="other-assets" 
                    type="number" 
                    value={sharedInputs.otherAssets}
                    onChange={(e) => updateSharedInput('otherAssets', Number(e.target.value))}
                    placeholder="90000"
                  />
                </div>
                <div>
                  <Label htmlFor="mortgage">Mortgage</Label>
                  <Input 
                    id="mortgage" 
                    type="number" 
                    value={sharedInputs.mortgage}
                    onChange={(e) => updateSharedInput('mortgage', Number(e.target.value))}
                    placeholder="550000"
                  />
                </div>
                <div>
                  <Label htmlFor="asset-debt">Asset Debt</Label>
                  <Input 
                    id="asset-debt" 
                    type="number" 
                    value={sharedInputs.assetDebt}
                    onChange={(e) => updateSharedInput('assetDebt', Number(e.target.value))}
                    placeholder="25000"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="analysis-date">Analysis Date</Label>
                  <Input 
                    id="analysis-date" 
                    type="date" 
                    value={sharedInputs.analysisDate}
                    onChange={(e) => updateSharedInput('analysisDate', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};