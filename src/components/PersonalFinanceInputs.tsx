import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Client Information</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="client1-name" className="w-24 text-sm">Client 1 name:</Label>
                  <div className="flex space-x-2 flex-1">
                    <Input className="h-8" />
                    <Input className="h-8" />
                    <Input className="h-8" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="client2-name" className="w-24 text-sm">Client 2 name:</Label>
                  <div className="flex space-x-2 flex-1">
                    <Input className="h-8" />
                    <Input className="h-8" />
                    <Input className="h-8" />
                  </div>
                </div>
              </div>
            </fieldset>
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Annual Employment Income</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-16 text-sm">Client 1:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-24 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-16 text-sm text-muted-foreground">Client 2:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-24 text-right text-muted-foreground" defaultValue="$ 0" disabled />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Other Income</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Interest and dividends:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-24 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Other:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-24 text-right" defaultValue="$ 0" />
                  </div>
                </div>
              </div>
            </fieldset>
          </TabsContent>

          <TabsContent value="savings" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <fieldset className="border border-border rounded-lg p-4 space-y-3">
                  <legend className="text-sm font-medium px-2">Monthly Expenses - Household</legend>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Housing:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Food:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Clothing:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Utilities:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </fieldset>

                <fieldset className="border border-border rounded-lg p-4 space-y-3">
                  <legend className="text-sm font-medium px-2">Taxes</legend>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Federal:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">State:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Other:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </fieldset>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <fieldset className="border border-border rounded-lg p-4 space-y-3">
                  <legend className="text-sm font-medium px-2">Other Expenses</legend>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Insurance:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Medical:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Transportation:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Entertainment:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Education:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Debt repayment:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Personal:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Other:</Label>
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </fieldset>
              </div>
            </div>

            <fieldset className="border border-border rounded-lg p-4 space-y-3">
              <legend className="text-sm font-medium px-2">Monthly Savings</legend>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm">Education:</Label>
                <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Retirement:</Label>
                <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Other:</Label>
                <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
              </div>
            </fieldset>
          </TabsContent>

          <TabsContent value="retirement" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Client 1 */}
              <div>
                <h3 className="text-sm font-medium mb-4">Client 1</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted p-2 grid grid-cols-3 gap-2 text-xs font-medium">
                    <div>Account Name</div>
                    <div className="text-center">Balance</div>
                    <div className="text-center">Annual ROR</div>
                  </div>
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="p-2 grid grid-cols-3 gap-2 border-t border-border">
                      <Input className="h-7 text-xs" />
                      <div className="flex items-center justify-center">
                        <Input className="h-7 w-16 text-xs text-right" defaultValue="$ 0" />
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Input className="h-7 w-8 text-xs text-right" defaultValue="0" />
                        <span className="text-xs">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client 2 */}
              <div>
                <h3 className="text-sm font-medium mb-4">Client 2</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted p-2 grid grid-cols-3 gap-2 text-xs font-medium">
                    <div>Account Name</div>
                    <div className="text-center">Balance</div>
                    <div className="text-center">Annual ROR</div>
                  </div>
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="p-2 grid grid-cols-3 gap-2 border-t border-border">
                      <Input className="h-7 text-xs text-muted-foreground" disabled />
                      <div className="flex items-center justify-center">
                        <Input className="h-7 w-16 text-xs text-right text-muted-foreground" defaultValue="$ 0" disabled />
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Input className="h-7 w-8 text-xs text-right text-muted-foreground" defaultValue="0" disabled />
                        <span className="text-xs text-muted-foreground">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 grid grid-cols-4 gap-2 text-xs font-medium">
                <div>Asset name</div>
                <div className="text-center">Balance</div>
                <div className="text-center">Annual ROR</div>
                <div className="text-center">Asset Debt</div>
              </div>
              
              {/* Regular asset rows */}
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="p-2 grid grid-cols-4 gap-2 border-t border-border">
                  <Input className="h-7 text-xs" />
                  <div className="flex items-center justify-center">
                    <Input className="h-7 w-16 text-xs text-right" defaultValue="$ 0" />
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Input className="h-7 w-8 text-xs text-right" defaultValue="0" />
                    <span className="text-xs">%</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Input className="h-7 w-16 text-xs text-right" defaultValue="$ 0" />
                  </div>
                </div>
              ))}
              
              {/* Cash row */}
              <div className="p-2 grid grid-cols-4 gap-2 border-t border-border">
                <div className="flex items-center text-xs font-medium">Cash</div>
                <div className="flex items-center justify-center">
                  <Input className="h-7 w-16 text-xs text-right" defaultValue="$ 0" />
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Input className="h-7 w-8 text-xs text-right" defaultValue="0" />
                  <span className="text-xs">%</span>
                </div>
                <div></div>
              </div>
              
              {/* Residence/mortgage row */}
              <div className="p-2 grid grid-cols-4 gap-2 border-t border-border">
                <div className="flex items-center text-xs font-medium">Residence/mortgage</div>
                <div className="flex items-center justify-center">
                  <Input className="h-7 w-16 text-xs text-right" defaultValue="$ 0" />
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Input className="h-7 w-8 text-xs text-right" defaultValue="0" />
                  <span className="text-xs">%</span>
                </div>
                <div className="flex items-center justify-center">
                  <Input className="h-7 w-16 text-xs text-right" defaultValue="$ 0" />
                </div>
              </div>
              
              {/* Other Debt row */}
              <div className="p-2 grid grid-cols-4 gap-2 border-t border-border">
                <div className="flex items-center text-xs font-medium">Other Debt</div>
                <div></div>
                <div></div>
                <div className="flex items-center justify-center">
                  <Input className="h-7 w-16 text-xs text-right" defaultValue="$ 0" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-4">
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Applicable to all analyses</legend>
              
              <div className="flex items-center space-x-2">
                <Label className="text-sm">Analysis date:</Label>
                <div className="flex-1 flex justify-end">
                  <Input 
                    className="h-8 w-32" 
                    type="date" 
                    defaultValue="2025-09-23"
                  />
                </div>
              </div>
            </fieldset>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};