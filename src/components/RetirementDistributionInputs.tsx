import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, DollarSign, TrendingUp, Settings, Plus, Trash2 } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const RetirementDistributionInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Monthly Income Needs Beginning at Retirement (Essential)</Label>
                  <Input placeholder="$8,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Monthly Income Needs Beginning at Retirement (Discretionary)</Label>
                  <Input placeholder="$2,000" className="mt-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Beginning X Years After Retirement</Label>
                  <Input placeholder="10" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Amount</Label>
                  <Input placeholder="$7,000" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Beginning X Years After Retirement</Label>
                  <Input placeholder="20" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Amount</Label>
                  <Input placeholder="$6,000" className="mt-1" />
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

              <div className="grid grid-cols-3 gap-4">
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
                <div>
                  <Label className="text-sm">Percent Taxable</Label>
                  <Input placeholder="85%" className="mt-1" />
                </div>
              </div>

              {sharedInputs.hasClient2 && (
                <div className="grid grid-cols-3 gap-4">
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
                  <div>
                    <Label className="text-sm">Percent Taxable</Label>
                    <Input placeholder="85%" className="mt-1" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capital</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tax Deferred Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-blue-600">Tax Deferred</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Client 1 Retirement Balance</Label>
                    <Input 
                      value={sharedInputs.client1RetirementBalance}
                      onChange={(e) => updateSharedInput('client1RetirementBalance', e.target.value)}
                      placeholder="$500,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 1 Monthly Contributions</Label>
                    <Input 
                      value={sharedInputs.client1MonthlyContributions}
                      onChange={(e) => updateSharedInput('client1MonthlyContributions', e.target.value)}
                      placeholder="$2,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 1 Interest & Dividends</Label>
                    <Input placeholder="$12,000" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Distribution Order</Label>
                  <Input placeholder="1" className="mt-1" />
                </div>
              </div>

              {/* Taxable Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-green-600">Taxable</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Client 1 Balance</Label>
                    <Input placeholder="$200,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Client 1 Monthly Contributions</Label>
                    <Input placeholder="$1,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Client 1 Interest & Dividends</Label>
                    <Input placeholder="$6,000" className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Client 1 Market Growth</Label>
                    <Input placeholder="7%" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Client 1 Cost Basis</Label>
                    <Input placeholder="$150,000" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Distribution Order</Label>
                  <Input placeholder="2" className="mt-1" />
                </div>
              </div>

              {/* Tax Free Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-purple-600">Tax Free</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Client 1 Retirement Balance</Label>
                    <Input placeholder="$100,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Client 1 Monthly Contributions</Label>
                    <Input placeholder="$500" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Client 1 Interest & Dividends</Label>
                    <Input placeholder="$3,000" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Distribution Order</Label>
                  <Input placeholder="3" className="mt-1" />
                </div>
              </div>

              {/* Other Assets Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-orange-600">Other Assets</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Balance</Label>
                    <Input placeholder="$50,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Monthly Contributions</Label>
                    <Input placeholder="$250" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Interest & Dividends</Label>
                    <Input placeholder="$1,500" className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Market Growth</Label>
                    <Input placeholder="6%" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Cost Basis</Label>
                    <Input placeholder="$40,000" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Distribution Order</Label>
                  <Input placeholder="4" className="mt-1" />
                </div>
              </div>

              {/* Annuity Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-red-600">Annuity</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Maximum Percent of Assets for Annuity Purchase</Label>
                    <Input placeholder="25%" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Cost per $1,000 of Income</Label>
                    <Input placeholder="$15,000" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Annuity COLA</Label>
                  <Input placeholder="2%" className="mt-1" />
                </div>
              </div>

              {/* LTC Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-indigo-600">LTC</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Monthly Amount</Label>
                    <Input placeholder="$5,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Age to Begin</Label>
                    <Input placeholder="80" className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Years to Continue</Label>
                    <Input placeholder="5" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Inflation Rate</Label>
                    <Input placeholder="3%" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Illustrate LTC for</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ltcClient1" />
                      <Label htmlFor="ltcClient1" className="text-sm">Client 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ltcClient2" />
                      <Label htmlFor="ltcClient2" className="text-sm">Client 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ltcBoth" />
                      <Label htmlFor="ltcBoth" className="text-sm">Both</Label>
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
                  <Label className="text-sm">Annual Social Security Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.ssBenefitInflationRate}
                    onChange={(e) => updateSharedInput('ssBenefitInflationRate', e.target.value)}
                    placeholder="2.5%" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Income Tax Rate</Label>
                  <Input placeholder="25%" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Capital Gains Tax Rate</Label>
                  <Input placeholder="15%" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Retirement Surplus Rate</Label>
                <Input placeholder="5%" className="mt-1" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="rmd" />
                <Label htmlFor="rmd" className="text-sm">Required Minimum Distribution</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
