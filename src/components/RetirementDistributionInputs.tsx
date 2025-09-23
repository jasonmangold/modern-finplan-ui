import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, DollarSign, TrendingUp, Settings, Plus, Trash2, Shield, Building } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
            <Building className="h-4 w-4" />
            Capital
          </TabsTrigger>
          <TabsTrigger value="annuity" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Annuity
          </TabsTrigger>
          <TabsTrigger value="ltc" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            LTC
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

              {sharedInputs.hasClient2 === true && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="married" 
                    checked={sharedInputs.ClientsAreMarried || false}
                    onCheckedChange={(checked) => updateSharedInput('ClientsAreMarried', !!checked)}
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
              <CardTitle className="text-lg">Monthly income needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Beginning at retirement */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Beginning at retirement</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Essential</Label>
                    <RadioGroup defaultValue="dollar" className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dollar" id="essential-dollar" />
                        <Input placeholder="$0" className="w-24" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percent" id="essential-percent" />
                        <div className="flex items-center gap-2">
                          <Input placeholder="0" className="w-16" />
                          <span className="text-sm">%</span>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="text-sm">Discretionary</Label>
                    <RadioGroup defaultValue="dollar" className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dollar" id="discretionary-dollar" />
                        <Input placeholder="$0" className="w-24" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">or</span>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="0" className="w-16" />
                      <span>%</span>
                      <Input placeholder="0" className="w-16" />
                      <span>%</span>
                    </div>
                    <span>of total current income</span>
                  </div>
                </div>
              </div>

              {/* Future time periods */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Beginning</Label>
                    <Input placeholder="0" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">years after retirement</Label>
                  </div>
                  <div></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroup defaultValue="dollar" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dollar" id="future1-dollar" />
                        <Input placeholder="$0" className="w-24" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percent" id="future1-percent" />
                        <Input placeholder="$0" className="w-24" />
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <span className="text-sm">or</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="0" className="w-16" />
                      <span>%</span>
                      <Input placeholder="0" className="w-16" />
                      <span>%</span>
                    </div>
                    <span>of total current income</span>
                  </div>
                </div>
              </div>

              {/* Second future period */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Beginning</Label>
                    <Input placeholder="0" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">years after retirement</Label>
                  </div>
                  <div></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroup defaultValue="dollar" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dollar" id="future2-dollar" />
                        <Input placeholder="$0" className="w-24" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percent" id="future2-percent" />
                        <Input placeholder="$0" className="w-24" />
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <span className="text-sm">or</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="0" className="w-16" />
                      <span>%</span>
                      <Input placeholder="0" className="w-16" />
                      <span>%</span>
                    </div>
                    <span>of total current income</span>
                  </div>
                </div>
              </div>

              {/* Transition Changes */}
              <div className="flex items-center space-x-2">
                <Checkbox id="transition-changes" />
                <Label htmlFor="transition-changes" className="text-sm">Transition Changes?</Label>
                <Checkbox id="transition-changes-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-sources" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Employment Income */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Employment income</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Client 1:</Label>
                    <Input 
                      value={sharedInputs.client1EmploymentIncome}
                      onChange={(e) => updateSharedInput('client1EmploymentIncome', e.target.value)}
                      placeholder="$65,000" 
                      className="mt-1" 
                    />
                  </div>
                  {sharedInputs.hasClient2 && (
                    <div>
                      <Label className="text-sm">Client 2:</Label>
                      <Input 
                        value={sharedInputs.client2EmploymentIncome}
                        onChange={(e) => updateSharedInput('client2EmploymentIncome', e.target.value)}
                        placeholder="$50,000" 
                        className="mt-1" 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Monthly Social Security Benefits */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label className="text-base font-medium">Monthly social security benefits</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="use-optimizer" />
                    <Label htmlFor="use-optimizer" className="text-sm">Use optimizer</Label>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm">Client 1:</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Earnings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="earnings">Earnings</SelectItem>
                        <SelectItem value="benefits">Benefits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Retirement</Label>
                    <Input placeholder="$0" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Survivor</Label>
                    <Input placeholder="$0" className="mt-1" />
                  </div>
                  <div></div>
                </div>

                {sharedInputs.hasClient2 && (
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm">Client 2:</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Earnings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="earnings">Earnings</SelectItem>
                          <SelectItem value="benefits">Benefits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Retirement</Label>
                      <Input placeholder="$0" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Survivor</Label>
                      <Input placeholder="$0" className="mt-1" />
                    </div>
                    <div></div>
                  </div>
                )}

                <div>
                  <Label className="text-sm">Percent taxable:</Label>
                  <Input placeholder="0" className="mt-1 w-20" />
                  <span className="text-sm ml-2">%</span>
                </div>
              </div>

              {/* Other Income Sources */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Other income sources</Label>
                  <Button variant="outline" size="sm">
                    Delete this income
                  </Button>
                </div>

                <div className="grid grid-cols-6 gap-4">
                  <div>
                    <Label className="text-sm">Select item</Label>
                    <div className="flex gap-2 mt-1">
                      <Button variant="outline" size="sm">⟨</Button>
                      <Input placeholder="1" className="w-16" />
                      <Button variant="outline" size="sm">⟩</Button>
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Name:</Label>
                    <Input placeholder="Rental Income" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Type:</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Other" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="rental">Rental</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Owner:</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Paul Johnson" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client1">Paul Johnson</SelectItem>
                        <SelectItem value="client2">Sally Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Amount:</Label>
                    <Input placeholder="$800" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm">Start age:</Label>
                  <Input placeholder="65" className="mt-1 w-20" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <RadioGroup defaultValue="future">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="present" id="present-value" />
                        <Label htmlFor="present-value" className="text-sm">Present value</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="future" id="future-value" />
                        <Label htmlFor="future-value" className="text-sm">Future value</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <RadioGroup defaultValue="monthly">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly-amount" />
                        <Label htmlFor="monthly-amount" className="text-sm">Monthly amount</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lump" id="lump-sum" />
                        <Label htmlFor="lump-sum" className="text-sm">Lump sum</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="payable-for-life" defaultChecked />
                      <Label htmlFor="payable-for-life" className="text-sm">Payable for life</Label>
                    </div>
                    <div>
                      <Label className="text-sm">End age:</Label>
                      <Input placeholder="90" className="mt-1 w-16" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inflate-annually" />
                      <Label htmlFor="inflate-annually" className="text-sm">Inflate amount annually at</Label>
                    </div>
                    <Input placeholder="2" className="mt-1 w-16" />
                    <span className="text-sm ml-2">% Percent Taxable:</span>
                  </div>
                  <div>
                    <Input placeholder="0" className="mt-1 w-16" />
                    <span className="text-sm ml-2">%</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm">Percent available to survivors:</Label>
                  <Input placeholder="100" className="mt-1 w-20" />
                  <span className="text-sm ml-2">%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capital</CardTitle>
              <p className="text-sm text-muted-foreground">Do NOT include the residence or funds set aside for college needs</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tax-deferred" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="tax-deferred">Tax Deferred</TabsTrigger>
                  <TabsTrigger value="taxable">Taxable</TabsTrigger>
                  <TabsTrigger value="tax-free">Tax-free</TabsTrigger>
                  <TabsTrigger value="other-assets">Other Assets</TabsTrigger>
                </TabsList>

                <TabsContent value="tax-deferred" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Tax Deferred Retirement plans</Label>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Balance</th>
                            <th className="text-left p-2">Monthly contributions</th>
                            <th className="text-left p-2">Company match</th>
                            <th className="text-left p-2">Annual increase</th>
                            <th className="text-left p-2">Int. & Div.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">
                              <div>
                                <Label className="text-sm">Client 1</Label>
                                <Input 
                                  value={sharedInputs.client1RetirementBalance}
                                  onChange={(e) => updateSharedInput('client1RetirementBalance', e.target.value)}
                                  placeholder="$91,000" 
                                  className="mt-1" 
                                />
                              </div>
                            </td>
                            <td className="p-2">
                              <Input 
                                value={sharedInputs.client1MonthlyContributions}
                                onChange={(e) => updateSharedInput('client1MonthlyContributions', e.target.value)}
                                placeholder="$300" 
                                className="mt-1" 
                              />
                            </td>
                            <td className="p-2">
                              <Input placeholder="$0" className="mt-1" />
                            </td>
                            <td className="p-2">
                              <Input placeholder="1%" className="mt-1" />
                            </td>
                            <td className="p-2">
                              <Input placeholder="6%" className="mt-1" />
                            </td>
                          </tr>
                          {sharedInputs.hasClient2 && (
                            <tr className="border-b">
                              <td className="p-2">
                                <div>
                                  <Label className="text-sm">Client 2</Label>
                                  <Input 
                                    value={sharedInputs.client2RetirementBalance}
                                    onChange={(e) => updateSharedInput('client2RetirementBalance', e.target.value)}
                                    placeholder="$80,000" 
                                    className="mt-1" 
                                  />
                                </div>
                              </td>
                              <td className="p-2">
                                <Input 
                                  value={sharedInputs.client2MonthlyContributions}
                                  onChange={(e) => updateSharedInput('client2MonthlyContributions', e.target.value)}
                                  placeholder="$200" 
                                  className="mt-1" 
                                />
                              </td>
                              <td className="p-2">
                                <Input placeholder="$0" className="mt-1" />
                              </td>
                              <td className="p-2">
                                <Input placeholder="1%" className="mt-1" />
                              </td>
                              <td className="p-2">
                                <Input placeholder="6%" className="mt-1" />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <Label className="text-sm">Distribution Order:</Label>
                      <Input placeholder="1" className="mt-1 w-20" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="taxable" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Taxable Retirement plans</Label>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Balance</th>
                            <th className="text-left p-2">Monthly contrib.</th>
                            <th className="text-left p-2">Company match</th>
                            <th className="text-left p-2">Annual increase</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">
                              <div>
                                <Label className="text-sm">Client 1</Label>
                                <Input placeholder="$0" className="mt-1" />
                              </div>
                            </td>
                            <td className="p-2">
                              <Input placeholder="$0" className="mt-1" />
                            </td>
                            <td className="p-2">
                              <Input placeholder="$0" className="mt-1" />
                            </td>
                            <td className="p-2">
                              <Input placeholder="0%" className="mt-1" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm">Int. & Div.:</Label>
                        <Input placeholder="0%" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Mkt. Growth:</Label>
                        <Input placeholder="0%" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Cost basis:</Label>
                        <Input placeholder="$0" className="mt-1" />
                      </div>
                    </div>
                    {sharedInputs.hasClient2 && (
                      <>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b">
                                <td className="p-2">
                                  <div>
                                    <Label className="text-sm">Client 2</Label>
                                    <Input placeholder="$0" className="mt-1" />
                                  </div>
                                </td>
                                <td className="p-2">
                                  <Input placeholder="$0" className="mt-1" />
                                </td>
                                <td className="p-2">
                                  <Input placeholder="$0" className="mt-1" />
                                </td>
                                <td className="p-2">
                                  <Input placeholder="0%" className="mt-1" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm">Int. & Div.:</Label>
                            <Input placeholder="0%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm">Mkt. Growth:</Label>
                            <Input placeholder="0%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm">Cost basis:</Label>
                            <Input placeholder="$0" className="mt-1" />
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <Label className="text-sm">Distribution Order:</Label>
                      <Input placeholder="1" className="mt-1 w-20" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tax-free" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Tax-free Retirement plans</Label>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Balance</th>
                            <th className="text-left p-2">Monthly contributions</th>
                            <th className="text-left p-2">Company match</th>
                            <th className="text-left p-2">Annual increase</th>
                            <th className="text-left p-2">Int. & Div.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">
                              <div>
                                <Label className="text-sm">Client 1</Label>
                                <Input placeholder="$0" className="mt-1" />
                              </div>
                            </td>
                            <td className="p-2">
                              <Input placeholder="$0" className="mt-1" />
                            </td>
                            <td className="p-2">
                              <Input placeholder="$0" className="mt-1" />
                            </td>
                            <td className="p-2">
                              <Input placeholder="0%" className="mt-1" />
                            </td>
                            <td className="p-2">
                              <Input placeholder="0%" className="mt-1" />
                            </td>
                          </tr>
                          {sharedInputs.hasClient2 && (
                            <tr className="border-b">
                              <td className="p-2">
                                <div>
                                  <Label className="text-sm">Client 2</Label>
                                  <Input placeholder="$0" className="mt-1" />
                                </div>
                              </td>
                              <td className="p-2">
                                <Input placeholder="$0" className="mt-1" />
                              </td>
                              <td className="p-2">
                                <Input placeholder="$0" className="mt-1" />
                              </td>
                              <td className="p-2">
                                <Input placeholder="0%" className="mt-1" />
                              </td>
                              <td className="p-2">
                                <Input placeholder="0%" className="mt-1" />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <Label className="text-sm">Distribution Order:</Label>
                      <Input placeholder="1" className="mt-1 w-20" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="other-assets" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Other assets</Label>
                    <div className="grid grid-cols-5 gap-4">
                      <div>
                        <Label className="text-sm">Balance</Label>
                        <Input placeholder="$35,000" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Monthly contributions</Label>
                        <Input placeholder="$50" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Int. & Div.</Label>
                        <Input placeholder="1.5%" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Mkt. Growth</Label>
                        <Input placeholder="0%" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Cost Basis</Label>
                        <Input placeholder="$0" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Distribution Order:</Label>
                      <Input placeholder="1" className="mt-1 w-20" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annuity" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Annuity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Maximum percent of assets for annuity purchase:</Label>
                  <Input placeholder="0%" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Cost per $1,000 of income:</Label>
                  <Input placeholder="$0" className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-sm">Annuity COLA:</Label>
                <Input placeholder="0%" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ltc" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Long-term Care</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Monthly amount:</Label>
                  <Input placeholder="$4,500" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Age to begin:</Label>
                  <Input placeholder="70" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Years to continue:</Label>
                  <Input placeholder="5" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Inflation rate:</Label>
                  <Input placeholder="8%" className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-sm">Illustrate LTC for:</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="client1">Client 1</SelectItem>
                    <SelectItem value="client2">Client 2</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Applicable to all analyses */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Applicable to all analyses</Label>
                <div>
                  <Label className="text-sm">Analysis date:</Label>
                  <Input 
                    type="date" 
                    value={sharedInputs.analysisDate}
                    onChange={(e) => updateSharedInput('analysisDate', e.target.value)}
                    placeholder="1/1/2025"
                    className="mt-1" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Mortality age - Client 1:</Label>
                    <Input 
                      value={sharedInputs.client1MortalityAge}
                      onChange={(e) => updateSharedInput('client1MortalityAge', e.target.value)}
                      placeholder="90" 
                      className="mt-1" 
                    />
                  </div>
                  {sharedInputs.hasClient2 && (
                    <div>
                      <Label className="text-sm">Client 2:</Label>
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
                    <Label className="text-sm">Annual inflation rate - Client 1:</Label>
                    <Input 
                      value={sharedInputs.inflationRate}
                      onChange={(e) => updateSharedInput('inflationRate', e.target.value)}
                      placeholder="2.5%" 
                      className="mt-1" 
                    />
                  </div>
                  {sharedInputs.hasClient2 && (
                    <div>
                      <Label className="text-sm">Client 2:</Label>
                      <Input 
                        value={sharedInputs.client2EmploymentInflationRate}
                        onChange={(e) => updateSharedInput('client2EmploymentInflationRate', e.target.value)}
                        placeholder="1.5%" 
                        className="mt-1" 
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Annual employment inflation rate - Client 1:</Label>
                  <Input 
                    value={sharedInputs.client1EmploymentInflationRate}
                    onChange={(e) => updateSharedInput('client1EmploymentInflationRate', e.target.value)}
                    placeholder="1.5%" 
                    className="mt-1" 
                  />
                </div>

                <div>
                  <Label className="text-sm">Annual social security benefit inflation rate:</Label>
                  <Input 
                    value={sharedInputs.ssBenefitInflationRate}
                    onChange={(e) => updateSharedInput('ssBenefitInflationRate', e.target.value)}
                    placeholder="2%" 
                    className="mt-1" 
                  />
                </div>
              </div>

              {/* Specific to Retirement Income Distribution */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Specific to Retirement Income Distribution</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Income tax rate:</Label>
                    <Input placeholder="0%" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Capital gains tax rate:</Label>
                    <Input placeholder="0%" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm">Retirement surplus rate:</Label>
                  <Input placeholder="0%" className="mt-1" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="rmd" />
                  <Label htmlFor="rmd" className="text-sm">Required minimum distribution</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
