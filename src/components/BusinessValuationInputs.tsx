import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const BusinessValuationInputs = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [ownerNames, setOwnerNames] = useState<string[]>(["", "", "", "", ""]);
  const [activeOwnerTab, setActiveOwnerTab] = useState("owner-0");

  const handleOwnerNameChange = (index: number, name: string) => {
    const newNames = [...ownerNames];
    newNames[index] = name;
    setOwnerNames(newNames);
  };

  const getOwnerTabLabel = (index: number) => {
    return ownerNames[index] || "Owner";
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
          <TabsTrigger value="income" className="text-xs">Income</TabsTrigger>
          <TabsTrigger value="balance-sheet" className="text-xs">Balance Sheet</TabsTrigger>
          <TabsTrigger value="owners" className="text-xs">Owners</TabsTrigger>
          <TabsTrigger value="assumptions" className="text-xs">Assumptions</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <TabsContent value="general" className="space-y-4">
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">General</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Business Name:</Label>
                  <Input className="h-8 flex-1" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Company contact:</Label>
                  <div className="flex-1 flex space-x-2">
                    <Input className="h-8" />
                    <Input className="h-8" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Plan date:</Label>
                  <Input className="h-8 w-32" type="date" defaultValue="2025-09-23" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-64 text-sm">Average book value of assets (last 3-5 years):</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-64 text-sm">Marginal tax bracket (combined state, fed & local):</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-64 text-sm">Alternative investment rate (after-tax):</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Business loan</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Interest rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Term:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="5" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="interest-deductible" />
                  <Label htmlFor="interest-deductible" className="text-sm">Interest is deductible</Label>
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
                  <Label className="w-32 text-sm">Term:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="3" />
                  </div>
                </div>
              </div>
            </fieldset>
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Base year</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-24 text-sm">Year ends:</Label>
                  <Input className="h-8 w-32" type="date" defaultValue="2025-09-23" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-24 text-sm">Gross sales:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Net income</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">After-tax base year:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">After-tax 2 years ago:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">After-tax 3 years ago:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">After-tax 4 years ago:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">After-tax 5 years ago:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Growth rate for projections:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
            </fieldset>
          </TabsContent>

          <TabsContent value="balance-sheet" className="space-y-4">
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Average last 3 to 5 years</legend>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div></div>
                <div className="text-center text-sm font-medium">Gross</div>
                <div className="text-center text-sm font-medium">Adjustments</div>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">Assets</div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <Label className="text-sm">Current</Label>
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <Label className="text-sm">Fixed</Label>
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <Label className="text-sm">Other</Label>
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                </div>
                
                <div className="text-sm font-medium mt-4">Liabilities</div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <Label className="text-sm">Current</Label>
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <Label className="text-sm">Long term</Label>
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                  <Input className="h-8 text-right" defaultValue="$ 0" />
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Projections</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-64 text-sm">Owner's estimate of whole business value:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-64 text-sm">Long term growth rate for value of business:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-64 text-sm">Industry average rate of return for similar business:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
            </fieldset>
          </TabsContent>

          <TabsContent value="owners" className="space-y-4">
            <Tabs value={activeOwnerTab} onValueChange={setActiveOwnerTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <TabsTrigger key={index} value={`owner-${index}`} className="text-xs">
                    {getOwnerTabLabel(index)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {[0, 1, 2, 3, 4].map((ownerIndex) => (
                <TabsContent key={ownerIndex} value={`owner-${ownerIndex}`} className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Label className="w-32 text-sm">Name:</Label>
                      <div className="flex-1 flex space-x-2">
                        <Input 
                          className="h-8" 
                          value={ownerNames[ownerIndex]}
                          onChange={(e) => handleOwnerNameChange(ownerIndex, e.target.value)}
                        />
                        <Input className="h-8" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Label className="w-32 text-sm">Birthdate:</Label>
                      <Input className="h-8 w-32" type="date" defaultValue="1975-09-23" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Label className="w-32 text-sm">Retirement age:</Label>
                      <Input className="h-8 w-16 text-center" defaultValue="65" />
                      <Label className="w-32 text-sm ml-8">Mortality age:</Label>
                      <Input className="h-8 w-16 text-center" defaultValue="90" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Label className="w-32 text-sm">Annual compensation:</Label>
                      <div className="flex-1 flex justify-end">
                        <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Label className="w-32 text-sm">Replacement compensation:</Label>
                      <div className="flex-1 flex justify-end">
                        <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Label className="w-32 text-sm">Ownership percentage:</Label>
                      <div className="flex-1 flex justify-end items-center space-x-1">
                        <Input className="h-8 w-16 text-right" defaultValue="0" />
                        <span className="text-sm">%</span>
                      </div>
                    </div>

                    <fieldset className="border border-border rounded-lg p-4 space-y-4">
                      <legend className="text-sm font-medium px-2">Insurance solution</legend>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Label className="w-32 text-sm">Face amount:</Label>
                          <div className="flex-1 flex justify-end">
                            <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Label className="w-32 text-sm">Monthly premium:</Label>
                          <div className="flex-1 flex justify-end">
                            <Input className="h-8 w-20 text-right" defaultValue="$ 0" />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Label className="w-32 text-sm">Years to pay:</Label>
                          <div className="flex-1 flex justify-end">
                            <Input className="h-8 w-16 text-right" defaultValue="0" />
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-4">
            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Installment payments to heirs</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Interest rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Term:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="5" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="installment-deductible" />
                  <Label htmlFor="installment-deductible" className="text-sm">Interest is deductible</Label>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Full years goodwill is expected to last:</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input className="h-8 w-16 text-right" defaultValue="0" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Risk free rate:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Split's risk premium:</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Ownership premium (+) or discount (-):</Label>
                  <div className="flex-1 flex justify-end items-center space-x-1">
                    <Input className="h-8 w-16 text-right" defaultValue="0" />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-border rounded-lg p-4 space-y-4">
              <legend className="text-sm font-medium px-2">Business continuation valuation weights</legend>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Net asset method weight:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="1" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Discounted future earnings weight:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="1" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Treasury method weight:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="1" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label className="w-32 text-sm">Capitalization method weight:</Label>
                  <div className="flex-1 flex justify-end">
                    <Input className="h-8 w-16 text-right" defaultValue="1" />
                  </div>
                </div>
              </div>
            </fieldset>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};