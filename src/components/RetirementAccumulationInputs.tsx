
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, PiggyBank, TrendingUp, Settings, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const RetirementAccumulationInputs = () => {
  const [hasClient2, setHasClient2] = useState(false);
  const [isMarried, setIsMarried] = useState(false);
  const [incomeSourcesCount, setIncomeSourcesCount] = useState(1);

  const addIncomeSource = () => {
    if (incomeSourcesCount < 5) {
      setIncomeSourcesCount(incomeSourcesCount + 1);
    }
  };

  const removeIncomeSource = (index: number) => {
    if (incomeSourcesCount > 1) {
      setIncomeSourcesCount(incomeSourcesCount - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Retirement Accumulation Inputs</h2>
        <p className="text-gray-600">Configure your retirement planning parameters</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="income-needs" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Income Needs
          </TabsTrigger>
          <TabsTrigger value="income-sources" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
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
              <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Name</Label>
                  <Input placeholder="Enter client 1 name" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Date of Birth</Label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Retirement Age</Label>
                  <Input defaultValue="67" className="mt-1" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="married" 
                    checked={isMarried}
                    onChange={(e) => setIsMarried(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="married" className="text-sm">Married</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="hasClient2" 
                    checked={hasClient2}
                    onChange={(e) => setHasClient2(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="hasClient2" className="text-sm">Add Client 2</Label>
                </div>
              </div>

              {hasClient2 && (
                <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50/50">
                  <div>
                    <Label className="text-sm">Client 2 Name</Label>
                    <Input placeholder="Enter client 2 name" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Date of Birth</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Retirement Age</Label>
                    <Input defaultValue="67" className="mt-1" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-needs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Income Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Monthly Income Needs Beginning at Retirement</Label>
                <Input placeholder="$8,000" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Beginning X Years After Retirement</Label>
                  <Input placeholder="10" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Monthly Income Amount</Label>
                  <Input placeholder="$6,000" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Beginning X Years After Retirement</Label>
                  <Input placeholder="20" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Monthly Income Amount</Label>
                  <Input placeholder="$5,000" className="mt-1" />
                </div>
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
                  <Label className="text-sm">Client 1 Employment Income</Label>
                  <Input placeholder="$150,000" className="mt-1" />
                </div>
                {hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Employment Income</Label>
                    <Input placeholder="$120,000" className="mt-1" />
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
                  <Label className="text-sm">Client 1 Social Security</Label>
                  <Input placeholder="$3,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Start Age</Label>
                  <Input defaultValue="67" className="mt-1" />
                </div>
              </div>
              {hasClient2 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Client 2 Social Security</Label>
                    <Input placeholder="$2,500" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Start Age</Label>
                    <Input defaultValue="67" className="mt-1" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Other Income Sources</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addIncomeSource}
                  disabled={incomeSourcesCount >= 5}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Source
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: incomeSourcesCount }, (_, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Income Source {index + 1}</h4>
                    {incomeSourcesCount > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeIncomeSource(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm">Name</Label>
                      <Input placeholder="Source name" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pension">Pension</SelectItem>
                          <SelectItem value="annuity">Annuity</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Owner</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select owner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client1">Client 1</SelectItem>
                          {hasClient2 && <SelectItem value="client2">Client 2</SelectItem>}
                          <SelectItem value="joint">Joint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Start Age</Label>
                      <Input placeholder="65" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm">Amount</Label>
                      <Input placeholder="$1,000" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Payment Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="lump-sum">Lump Sum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Value Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present Value</SelectItem>
                          <SelectItem value="future">Future Value</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Duration</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="life">Payable for Life</SelectItem>
                          <SelectItem value="end-age">End at Specific Age</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Inflation Rate (%)</Label>
                      <Input defaultValue="3.0" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Percent Available to Survivors (%)</Label>
                      <Input defaultValue="100" className="mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Retirement Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Client 1</h4>
                  <div>
                    <Label className="text-sm">Retirement Balance</Label>
                    <Input placeholder="$500,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Monthly Contributions</Label>
                    <Input placeholder="$2,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Company Match</Label>
                    <Input placeholder="$1,000" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Annual Increase (%)</Label>
                    <Input defaultValue="3.0" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Rate of Return (%)</Label>
                    <Input defaultValue="7.0" className="mt-1" />
                  </div>
                </div>
                {hasClient2 && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Client 2</h4>
                    <div>
                      <Label className="text-sm">Retirement Balance</Label>
                      <Input placeholder="$300,000" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Monthly Contributions</Label>
                      <Input placeholder="$1,500" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Company Match</Label>
                      <Input placeholder="$750" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Annual Increase (%)</Label>
                      <Input defaultValue="3.0" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Rate of Return (%)</Label>
                      <Input defaultValue="7.0" className="mt-1" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Other Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm">Balance</Label>
                  <Input placeholder="$200,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Monthly Contributions</Label>
                  <Input placeholder="$500" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Rate of Return (%)</Label>
                  <Input defaultValue="6.0" className="mt-1" />
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
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Mortality Age</Label>
                  <Input defaultValue="90" className="mt-1" />
                </div>
                {hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Mortality Age</Label>
                    <Input defaultValue="90" className="mt-1" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Inflation Rate (%)</Label>
                  <Input defaultValue="3.0" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Social Security Benefit Inflation Rate (%)</Label>
                  <Input defaultValue="2.5" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Employment Inflation Rate (%)</Label>
                  <Input defaultValue="3.0" className="mt-1" />
                </div>
                {hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Employment Inflation Rate (%)</Label>
                    <Input defaultValue="3.0" className="mt-1" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Assumed Rate of Return During Retirement (%)</Label>
                  <Input defaultValue="5.0" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Solution Rate of Return (%)</Label>
                  <Input defaultValue="6.0" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Number of Months Since Last Review</Label>
                <Input defaultValue="12" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
