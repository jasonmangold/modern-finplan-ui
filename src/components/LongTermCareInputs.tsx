import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Database, Settings } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const LongTermCareInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Long-Term Care Analysis</h2>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="ltc-data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            LTC Data
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              {/* Client 1 Section */}
              <div className="space-y-3 p-3 border rounded-md">
                <Label className="text-sm font-medium text-muted-foreground">Client 1</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">First Name:</Label>
                    <Input 
                      value={sharedInputs.Client1_FirstName}
                      onChange={(e) => updateSharedInput('Client1_FirstName', e.target.value)}
                      placeholder="First name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Last Name:</Label>
                    <Input 
                      value={sharedInputs.Client1_LastName}
                      onChange={(e) => updateSharedInput('Client1_LastName', e.target.value)}
                      placeholder="Last name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Date of birth:</Label>
                    <Input 
                      type="date"
                      value={sharedInputs.Client1_BirthDate}
                      onChange={(e) => updateSharedInput('Client1_BirthDate', e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Retirement age:</Label>
                    <Input 
                      value={sharedInputs.Client1_RetirementAge}
                      onChange={(e) => updateSharedInput('Client1_RetirementAge', e.target.value)}
                      placeholder="65" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>

              {/* Client 2 Section */}
              <div className="space-y-3 p-3 border rounded-md">
                <Label className="text-sm font-medium text-muted-foreground">Client 2</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">First Name:</Label>
                    <Input 
                      value={sharedInputs.Client2_FirstName}
                      onChange={(e) => updateSharedInput('Client2_FirstName', e.target.value)}
                      placeholder="First name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Last Name:</Label>
                    <Input 
                      value={sharedInputs.Client2_LastName}
                      onChange={(e) => updateSharedInput('Client2_LastName', e.target.value)}
                      placeholder="Last name" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Date of birth:</Label>
                    <Input 
                      type="date"
                      value={sharedInputs.Client2_BirthDate}
                      onChange={(e) => updateSharedInput('Client2_BirthDate', e.target.value)}
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Retirement age:</Label>
                    <Input 
                      value={sharedInputs.Client2_RetirementAge}
                      onChange={(e) => updateSharedInput('Client2_RetirementAge', e.target.value)}
                      placeholder="65" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ltc-data" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Current monthly insurance benefit */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div>
                    <Label className="text-sm">Current monthly insurance benefit:</Label>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Client1</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.ltcClient1MonthlyBenefit || ''}
                        onChange={(e) => updateSharedInput('ltcClient1MonthlyBenefit', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Client2</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.ltcClient2MonthlyBenefit || ''}
                        onChange={(e) => updateSharedInput('ltcClient2MonthlyBenefit', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Current insurance benefit COLA */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div>
                    <Label className="text-sm">Current insurance benefit COLA:</Label>
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <Input 
                        value={sharedInputs.ltcClient1BenefitCOLA || ''}
                        onChange={(e) => updateSharedInput('ltcClient1BenefitCOLA', e.target.value)}
                        placeholder="0"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <Input 
                        value={sharedInputs.ltcClient2BenefitCOLA || ''}
                        onChange={(e) => updateSharedInput('ltcClient2BenefitCOLA', e.target.value)}
                        placeholder="0"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                {/* Estimated monthly cost */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Estimated monthly cost of long-term care today:</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.ltcEstimatedMonthlyCost || ''}
                        onChange={(e) => updateSharedInput('ltcEstimatedMonthlyCost', e.target.value)}
                        placeholder="6,000"
                        className="pl-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Market value of assets */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Market value of assets:</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.ltcMarketValueAssets || ''}
                        onChange={(e) => updateSharedInput('ltcMarketValueAssets', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Rate of return */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Rate of return:</Label>
                    <div className="relative mt-1">
                      <Input 
                        value={sharedInputs.ltcRateOfReturn || ''}
                        onChange={(e) => updateSharedInput('ltcRateOfReturn', e.target.value)}
                        placeholder="4"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Applicable to all analyses */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Applicable to all analyses</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Analysis date:</Label>
                      <Input 
                        type="date"
                        value={sharedInputs.analysisDate || ''}
                        onChange={(e) => updateSharedInput('analysisDate', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>

                {/* Specific to the long-term care analysis */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Specific to the long-term care analysis</Label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Age at which long term care begins:</Label>
                        <Input 
                          value={sharedInputs.ltcAgeCareBeginsAge || ''}
                          onChange={(e) => updateSharedInput('ltcAgeCareBeginsAge', e.target.value)}
                          placeholder="70"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Long term care duration (years):</Label>
                        <Input 
                          value={sharedInputs.ltcCareDurationYears || ''}
                          onChange={(e) => updateSharedInput('ltcCareDurationYears', e.target.value)}
                          placeholder="5"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Long term care inflation rate:</Label>
                        <div className="relative mt-1">
                          <Input 
                            value={sharedInputs.ltcInflationRate || ''}
                            onChange={(e) => updateSharedInput('ltcInflationRate', e.target.value)}
                            placeholder="8"
                            className="pr-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};