import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const BusinessContinuationInputs = () => {
  const [activeTab, setActiveTab] = useState("business-valuation");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="business-valuation" className="text-xs">Business Valuation</TabsTrigger>
          <TabsTrigger value="four-ways-to-pay" className="text-xs">Four Ways to Pay</TabsTrigger>
          <TabsTrigger value="assumptions" className="text-xs">Assumptions</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <TabsContent value="business-valuation" className="space-y-4">
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Business owner</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Name:</Label>
                  <Input className="h-8 flex-1" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Years until retirement:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="3" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Percentage of company owned:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="1" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Current life insurance benefits:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Death benefit annual increase rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Business</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Name:</Label>
                  <Input className="h-8 flex-1" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Current value:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Estimated annual growth rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
            </fieldset>
          </TabsContent>

          <TabsContent value="four-ways-to-pay" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Label className="text-sm">Years to illustrate:</Label>
              <Input className="h-8 w-16 text-center" defaultValue="1" />
            </div>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Loan</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Interest rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Term in years:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="5" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Payment frequency:</Label>
                  <div className="flex-1 flex justify-end">
                    <RadioGroup defaultValue="monthly" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="loan-monthly" />
                        <Label htmlFor="loan-monthly" className="text-sm">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="annual" id="loan-annual" />
                        <Label htmlFor="loan-annual" className="text-sm">Annual</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Sinking fund</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Rate of return:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Payment frequency:</Label>
                  <div className="flex-1 flex justify-end">
                    <RadioGroup defaultValue="monthly" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="sinking-monthly" />
                        <Label htmlFor="sinking-monthly" className="text-sm">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="annual" id="sinking-annual" />
                        <Label htmlFor="sinking-annual" className="text-sm">Annual</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Life insurance</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Premium per $1,000:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0.00" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Number of years to pay premiums:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Premium annual increase rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-48 text-sm">Death benefit annual increase rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
            </fieldset>
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