import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface FinancialInventoryProps {
  onBack: () => void;
}

export const FinancialInventory = ({ onBack }: FinancialInventoryProps) => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="h-full flex">
      {/* Left Side - Input Panel */}
      <div className="w-1/2 p-6 border-r border-border bg-background">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Goals
          </Button>
          <h2 className="text-2xl font-semibold text-foreground">Financial Inventory</h2>
          <p className="text-muted-foreground mt-1">Comprehensive financial data collection</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-120px)]">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-4">
            <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
            <TabsTrigger value="income" className="text-xs">Income</TabsTrigger>
            <TabsTrigger value="savings" className="text-xs">Savings & Expenses</TabsTrigger>
            <TabsTrigger value="retirement" className="text-xs">Retirement</TabsTrigger>
            <TabsTrigger value="other" className="text-xs">Other</TabsTrigger>
            <TabsTrigger value="insurance" className="text-xs">Insurance</TabsTrigger>
            <TabsTrigger value="assumptions" className="text-xs">Assumptions</TabsTrigger>
          </TabsList>

          <div className="h-[calc(100%-60px)] overflow-y-auto">
            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client1-name">Client 1 Name</Label>
                      <Input id="client1-name" placeholder="Paul" />
                    </div>
                    <div>
                      <Label htmlFor="client2-name">Client 2 Name</Label>
                      <Input id="client2-name" placeholder="Sally" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client1-age">Client 1 Age</Label>
                      <Input id="client1-age" type="number" placeholder="45" />
                    </div>
                    <div>
                      <Label htmlFor="client2-age">Client 2 Age</Label>
                      <Input id="client2-age" type="number" placeholder="42" />
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
                    <Input id="paul-employment" type="number" placeholder="65000" />
                  </div>
                  <div>
                    <Label htmlFor="sally-employment">Sally's Employment Income</Label>
                    <Input id="sally-employment" type="number" placeholder="50000" />
                  </div>
                  <div>
                    <Label htmlFor="interest-dividends">Interest and Dividends</Label>
                    <Input id="interest-dividends" type="number" placeholder="25000" />
                  </div>
                  <div>
                    <Label htmlFor="other-income">Other Income</Label>
                    <Input id="other-income" type="number" placeholder="17000" />
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
                    <Input id="education-savings" type="number" placeholder="3600" />
                  </div>
                  <div>
                    <Label htmlFor="retirement-savings">Retirement Savings</Label>
                    <Input id="retirement-savings" type="number" placeholder="6000" />
                  </div>
                  <div>
                    <Label htmlFor="other-savings">Other Savings</Label>
                    <Input id="other-savings" type="number" placeholder="4800" />
                  </div>
                  <div>
                    <Label htmlFor="household-expenses">Household Expenses</Label>
                    <Input id="household-expenses" type="number" placeholder="55908" />
                  </div>
                  <div>
                    <Label htmlFor="taxes">Taxes</Label>
                    <Input id="taxes" type="number" placeholder="53484" />
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
                    <Label htmlFor="paul-retirement">Paul's Retirement</Label>
                    <Input id="paul-retirement" type="number" placeholder="136000" />
                  </div>
                  <div>
                    <Label htmlFor="sally-retirement">Sally's Retirement</Label>
                    <Input id="sally-retirement" type="number" placeholder="76500" />
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
                    <Input id="residence" type="number" placeholder="700000" />
                  </div>
                  <div>
                    <Label htmlFor="cash">Cash</Label>
                    <Input id="cash" type="number" placeholder="500" />
                  </div>
                  <div>
                    <Label htmlFor="other-assets">Other Assets</Label>
                    <Input id="other-assets" type="number" placeholder="90000" />
                  </div>
                  <div>
                    <Label htmlFor="mortgage">Mortgage</Label>
                    <Input id="mortgage" type="number" placeholder="550000" />
                  </div>
                  <div>
                    <Label htmlFor="asset-debt">Asset Debt</Label>
                    <Input id="asset-debt" type="number" placeholder="25000" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insurance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="paul-life">Paul's Life Insurance</Label>
                    <Input id="paul-life" type="number" placeholder="65000" />
                  </div>
                  <div>
                    <Label htmlFor="paul-disability">Paul's Disability Insurance</Label>
                    <Input id="paul-disability" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="sally-life">Sally's Life Insurance</Label>
                    <Input id="sally-life" type="number" placeholder="50000" />
                  </div>
                  <div>
                    <Label htmlFor="sally-disability">Sally's Disability Insurance</Label>
                    <Input id="sally-disability" type="number" placeholder="0" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assumptions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Planning Assumptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="inflation-rate">Inflation Rate (%)</Label>
                    <Input id="inflation-rate" type="number" placeholder="3.0" step="0.1" />
                  </div>
                  <div>
                    <Label htmlFor="investment-return">Investment Return (%)</Label>
                    <Input id="investment-return" type="number" placeholder="7.0" step="0.1" />
                  </div>
                  <div>
                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" placeholder="25.0" step="0.1" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Right Side - Output Panel */}
      <div className="w-1/2 p-6 bg-muted/30">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground">Financial Summary</h3>
          <p className="text-muted-foreground">Comprehensive financial overview</p>
        </div>

        <div className="grid grid-cols-2 gap-4 h-[calc(100%-80px)] overflow-y-auto">
          {/* Income Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Income</CardTitle>
              <div className="text-2xl font-bold">$157,000</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Paul's Employment Income</span>
                  <span>$65,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Sally's Employment Income</span>
                  <span>$50,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest and Dividends</span>
                  <span>$25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$17,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Savings</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$14,400</span>
                <span className="text-lg">9%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Education</span>
                  <span>$3,600</span>
                  <span>2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Retirement</span>
                  <span>$6,000</span>
                  <span>4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$4,800</span>
                  <span>3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Unaccounted</span>
                  <span>$3,208</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Expenses</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$139,392</span>
                <span className="text-lg">89%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Household</span>
                  <span>$55,908</span>
                  <span>36%</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$53,484</span>
                  <span>34%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$30,000</span>
                  <span>19%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assets Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Assets</CardTitle>
              <div className="text-2xl font-bold">$1,003,000</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Paul's Retirement</span>
                  <span>$136,000</span>
                  <span>14%</span>
                </div>
                <div className="flex justify-between">
                  <span>Sally's Retirement</span>
                  <span>$76,500</span>
                  <span>8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Residence</span>
                  <span>$700,000</span>
                  <span>70%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cash</span>
                  <span>$500</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Assets</span>
                  <span>$90,000</span>
                  <span>9%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liabilities Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Liabilities</CardTitle>
              <div className="text-2xl font-bold">$577,000</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Mortgage</span>
                  <span>$550,000</span>
                  <span>95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Debt</span>
                  <span>$25,000</span>
                  <span>4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$2,000</span>
                  <span>0%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium mb-1">Paul</div>
                  <div className="space-y-1 ml-2">
                    <div className="flex justify-between">
                      <span>Life Insurance</span>
                      <span>$65,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disability Insurance</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Long-Term Care Insurance</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Sally</div>
                  <div className="space-y-1 ml-2">
                    <div className="flex justify-between">
                      <span>Life Insurance</span>
                      <span>$50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disability Insurance</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Long-Term Care Insurance</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Net Worth Card */}
          <Card className="bg-slate-600 text-white col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Net Worth</CardTitle>
              <div className="text-3xl font-bold">$426,000</div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div className="flex justify-between">
                  <span>Assets</span>
                  <span>$1,003,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Liabilities</span>
                  <span>$577,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};