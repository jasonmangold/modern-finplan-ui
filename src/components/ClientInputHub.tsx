
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { User, DollarSign, PiggyBank, CreditCard, Shield, FileText, TrendingUp } from "lucide-react";

export const ClientInputHub = () => {
  return (
    <div className="h-full">
      <Card className="h-full border-0 shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Client Data Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 h-[calc(100%-80px)] overflow-hidden">
          <Tabs defaultValue="personal" className="h-full">
            <TabsList className="grid w-full grid-cols-4 mb-4 mx-6">
              <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
              <TabsTrigger value="financial" className="text-xs">Financial</TabsTrigger>
              <TabsTrigger value="protection" className="text-xs">Protection</TabsTrigger>
              <TabsTrigger value="planning" className="text-xs">Planning</TabsTrigger>
            </TabsList>

            <div className="h-[calc(100%-60px)] overflow-y-auto px-6">
              <TabsContent value="personal" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-4 w-4 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Demographics</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Primary Client</Label>
                      <Input defaultValue="Paul Johnson" className="text-sm mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Spouse/Partner</Label>
                      <Input defaultValue="Sally Johnson" className="text-sm mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Age (Primary)</Label>
                      <Input defaultValue="40" className="text-sm mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Age (Spouse)</Label>
                      <Input defaultValue="38" className="text-sm mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Retirement Age</Label>
                      <Input defaultValue="67" className="text-sm mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Life Expectancy</Label>
                      <Input defaultValue="90" className="text-sm mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Financial Goals</Label>
                    <Textarea 
                      placeholder="Primary financial objectives and goals..."
                      className="text-sm mt-1 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6 mt-0">
                <div className="space-y-6">
                  {/* Income Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <h3 className="font-medium text-gray-900">Income & Cash Flow</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Annual Gross Income</Label>
                        <Input defaultValue="$150,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Spouse Income</Label>
                        <Input defaultValue="$80,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Other Income</Label>
                        <Input defaultValue="$15,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Annual Expenses</Label>
                        <Input defaultValue="$120,000" className="text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Assets Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <PiggyBank className="h-4 w-4 text-blue-600" />
                      <h3 className="font-medium text-gray-900">Assets & Savings</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">401(k) Balance</Label>
                        <Input defaultValue="$350,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">IRA Balance</Label>
                        <Input defaultValue="$150,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Taxable Investments</Label>
                        <Input defaultValue="$75,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Cash/Savings</Label>
                        <Input defaultValue="$50,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Home Value</Label>
                        <Input defaultValue="$450,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Other Assets</Label>
                        <Input defaultValue="$25,000" className="text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Liabilities Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="h-4 w-4 text-red-600" />
                      <h3 className="font-medium text-gray-900">Debts & Liabilities</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Mortgage Balance</Label>
                        <Input defaultValue="$320,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Monthly Payment</Label>
                        <Input defaultValue="$2,200" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Credit Card Debt</Label>
                        <Input defaultValue="$8,500" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Other Loans</Label>
                        <Input defaultValue="$15,000" className="text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="protection" className="space-y-6 mt-0">
                <div className="space-y-6">
                  {/* Insurance Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <h3 className="font-medium text-gray-900">Insurance Coverage</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Life Insurance (Primary)</Label>
                        <Input defaultValue="$500,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Life Insurance (Spouse)</Label>
                        <Input defaultValue="$300,000" className="text-sm mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Disability Insurance</Label>
                        <Select defaultValue="group">
                          <SelectTrigger className="text-sm mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="group">Group Coverage</SelectItem>
                            <SelectItem value="individual">Individual Policy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">LTC Insurance</Label>
                        <Select defaultValue="none">
                          <SelectTrigger className="text-sm mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="traditional">Traditional LTC</SelectItem>
                            <SelectItem value="hybrid">Hybrid Policy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="planning" className="space-y-6 mt-0">
                <div className="space-y-6">
                  {/* Estate Planning */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4 text-gray-600" />
                      <h3 className="font-medium text-gray-900">Estate Planning</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="will" defaultChecked />
                        <Label htmlFor="will" className="text-sm">Will in place</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="trust" />
                        <Label htmlFor="trust" className="text-sm">Trust established</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="poa" defaultChecked />
                        <Label htmlFor="poa" className="text-sm">Power of Attorney</Label>
                      </div>
                    </div>
                  </div>

                  {/* Risk Tolerance */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <h3 className="font-medium text-gray-900">Investment Profile</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-600">Risk Tolerance</Label>
                        <Select defaultValue="moderate">
                          <SelectTrigger className="text-sm mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conservative">Conservative</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="aggressive">Aggressive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Time Horizon</Label>
                        <Select defaultValue="long">
                          <SelectTrigger className="text-sm mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short-term (&lt;5 years)</SelectItem>
                            <SelectItem value="medium">Medium-term (5-15 years)</SelectItem>
                            <SelectItem value="long">Long-term (&gt;15 years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
