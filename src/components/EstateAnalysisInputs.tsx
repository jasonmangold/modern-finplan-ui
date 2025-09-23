import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Building2, CreditCard, Shield, Settings } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const EstateAnalysisInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Estate Analysis</h2>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger value="debt-bequests" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Debt and Bequests
          </TabsTrigger>
          <TabsTrigger value="life-insurance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Life Insurance
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Personal Information</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Client 1 name:</Label>
                      <Input 
                        value={sharedInputs.client1Name}
                        onChange={(e) => updateSharedInput('client1Name', e.target.value)}
                        placeholder="Enter name" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Client 2 name:</Label>
                      <Input 
                        value={sharedInputs.client2Name}
                        onChange={(e) => updateSharedInput('client2Name', e.target.value)}
                        placeholder="Enter name" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Number of years until Client 1's death:</Label>
                      <Input 
                        value={sharedInputs.estateClient1YearsUntilDeath || ''}
                        onChange={(e) => updateSharedInput('estateClient1YearsUntilDeath', e.target.value)}
                        placeholder="5" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Number of years until Client 2's death:</Label>
                      <Input 
                        value={sharedInputs.estateClient2YearsUntilDeath || ''}
                        onChange={(e) => updateSharedInput('estateClient2YearsUntilDeath', e.target.value)}
                        placeholder="10" 
                        className="mt-1" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="estateMarried" 
                      checked={sharedInputs.isMarried}
                      onCheckedChange={(checked) => updateSharedInput('isMarried', checked)}
                    />
                    <Label htmlFor="estateMarried" className="text-sm">Clients are married</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Retirement Plans */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Retirement Plans</Label>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div></div>
                    <div className="text-center text-sm font-medium">Balance</div>
                    <div></div>
                    <div className="text-center text-sm font-medium">Rate of return</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div><Label className="text-sm">Client 1</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateClient1RetirementBalance || ''}
                        onChange={(e) => updateSharedInput('estateClient1RetirementBalance', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                    <div></div>
                    <div className="relative">
                      <Input 
                        value={sharedInputs.estateClient1RetirementRate || ''}
                        onChange={(e) => updateSharedInput('estateClient1RetirementRate', e.target.value)}
                        placeholder="0"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div><Label className="text-sm">Client 2</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateClient2RetirementBalance || ''}
                        onChange={(e) => updateSharedInput('estateClient2RetirementBalance', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                    <div></div>
                    <div className="relative">
                      <Input 
                        value={sharedInputs.estateClient2RetirementRate || ''}
                        onChange={(e) => updateSharedInput('estateClient2RetirementRate', e.target.value)}
                        placeholder="0"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                {/* Other Assets */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Other assets</Label>
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-7 gap-2 text-xs font-medium text-muted-foreground mb-2">
                      <div></div>
                      <div className="text-center">Balance</div>
                      <div className="text-center">Jointly held assets<br/>Amount</div>
                      <div className="text-center">Non-jointly held assets<br/>Amount</div>
                      <div className="text-center">Ownership Percentage<br/>Client 1</div>
                      <div className="text-center">Client 2</div>
                      <div className="text-center">Rate of return</div>
                    </div>

                    {/* Other assets row */}
                    <div className="grid grid-cols-7 gap-2 items-center mb-2">
                      <div><Label className="text-sm">Other assets</Label></div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateOtherAssetsBalance || ''}
                          onChange={(e) => updateSharedInput('estateOtherAssetsBalance', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateOtherAssetsJoint || ''}
                          onChange={(e) => updateSharedInput('estateOtherAssetsJoint', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateOtherAssetsNonJoint || ''}
                          onChange={(e) => updateSharedInput('estateOtherAssetsNonJoint', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateOtherAssetsOwnershipClient1 || ''}
                          onChange={(e) => updateSharedInput('estateOtherAssetsOwnershipClient1', e.target.value)}
                          placeholder="100"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateOtherAssetsOwnershipClient2 || ''}
                          onChange={(e) => updateSharedInput('estateOtherAssetsOwnershipClient2', e.target.value)}
                          placeholder="0"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateOtherAssetsRate || ''}
                          onChange={(e) => updateSharedInput('estateOtherAssetsRate', e.target.value)}
                          placeholder="0"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                    </div>

                    {/* Cash row */}
                    <div className="grid grid-cols-7 gap-2 items-center mb-2">
                      <div><Label className="text-sm">Cash</Label></div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateCashBalance || ''}
                          onChange={(e) => updateSharedInput('estateCashBalance', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateCashJoint || ''}
                          onChange={(e) => updateSharedInput('estateCashJoint', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateCashNonJoint || ''}
                          onChange={(e) => updateSharedInput('estateCashNonJoint', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateCashOwnershipClient1 || ''}
                          onChange={(e) => updateSharedInput('estateCashOwnershipClient1', e.target.value)}
                          placeholder="100"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateCashOwnershipClient2 || ''}
                          onChange={(e) => updateSharedInput('estateCashOwnershipClient2', e.target.value)}
                          placeholder="0"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateCashRate || ''}
                          onChange={(e) => updateSharedInput('estateCashRate', e.target.value)}
                          placeholder="0"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                    </div>

                    {/* Residence row */}
                    <div className="grid grid-cols-7 gap-2 items-center">
                      <div><Label className="text-sm">Residence</Label></div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateResidenceBalance || ''}
                          onChange={(e) => updateSharedInput('estateResidenceBalance', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateResidenceJoint || ''}
                          onChange={(e) => updateSharedInput('estateResidenceJoint', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateResidenceNonJoint || ''}
                          onChange={(e) => updateSharedInput('estateResidenceNonJoint', e.target.value)}
                          placeholder="0"
                          className="pl-4 h-8 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateResidenceOwnershipClient1 || ''}
                          onChange={(e) => updateSharedInput('estateResidenceOwnershipClient1', e.target.value)}
                          placeholder="100"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateResidenceOwnershipClient2 || ''}
                          onChange={(e) => updateSharedInput('estateResidenceOwnershipClient2', e.target.value)}
                          placeholder="0"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                      <div className="relative">
                        <Input 
                          value={sharedInputs.estateResidenceRate || ''}
                          onChange={(e) => updateSharedInput('estateResidenceRate', e.target.value)}
                          placeholder="0"
                          className="pr-6 h-8 text-sm"
                        />
                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debt-bequests" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Debt */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Debt</Label>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div></div>
                    <div className="text-center text-sm font-medium">Balance</div>
                    <div className="text-center text-sm font-medium">Ownership percentage<br/>Client 1</div>
                    <div className="text-center text-sm font-medium">Client 2</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div><Label className="text-sm">Mortgage balance</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateMortgageBalance || ''}
                        onChange={(e) => updateSharedInput('estateMortgageBalance', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                    <div className="relative">
                      <Input 
                        value={sharedInputs.estateMortgageOwnershipClient1 || ''}
                        onChange={(e) => updateSharedInput('estateMortgageOwnershipClient1', e.target.value)}
                        placeholder="100"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                    <div className="relative">
                      <Input 
                        value={sharedInputs.estateMortgageOwnershipClient2 || ''}
                        onChange={(e) => updateSharedInput('estateMortgageOwnershipClient2', e.target.value)}
                        placeholder="0"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div><Label className="text-sm">Other debt</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateOtherDebtBalance || ''}
                        onChange={(e) => updateSharedInput('estateOtherDebtBalance', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                    <div className="relative">
                      <Input 
                        value={sharedInputs.estateOtherDebtOwnershipClient1 || ''}
                        onChange={(e) => updateSharedInput('estateOtherDebtOwnershipClient1', e.target.value)}
                        placeholder="100"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                    <div className="relative">
                      <Input 
                        value={sharedInputs.estateOtherDebtOwnershipClient2 || ''}
                        onChange={(e) => updateSharedInput('estateOtherDebtOwnershipClient2', e.target.value)}
                        placeholder="0"
                        className="pr-8"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                {/* Bequests */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Bequests</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Desired bequests at Client 1's death:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateBequestsClient1Death || ''}
                          onChange={(e) => updateSharedInput('estateBequestsClient1Death', e.target.value)}
                          placeholder="0"
                          className="pl-6"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Desired bequests at Client 2's death:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateBequestsClient2Death || ''}
                          onChange={(e) => updateSharedInput('estateBequestsClient2Death', e.target.value)}
                          placeholder="0"
                          className="pl-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carry Forward */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Carry Forward</Label>
                  <div>
                    <Label className="text-sm">Exclusion amount:</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateExclusionAmount || ''}
                        onChange={(e) => updateSharedInput('estateExclusionAmount', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="life-insurance" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Life insurance owned by insured */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Life insurance owned by insured</Label>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div><Label className="text-sm font-medium">Insured</Label></div>
                    <div className="text-center text-sm font-medium">Benefit to surviving client</div>
                    <div className="text-center text-sm font-medium">Benefit to other</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div><Label className="text-sm">Client 1</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateLifeInsClient1BenefitSurviving || ''}
                        onChange={(e) => updateSharedInput('estateLifeInsClient1BenefitSurviving', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateLifeInsClient1BenefitOther || ''}
                        onChange={(e) => updateSharedInput('estateLifeInsClient1BenefitOther', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div><Label className="text-sm">Client 2</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateLifeInsClient2BenefitSurviving || ''}
                        onChange={(e) => updateSharedInput('estateLifeInsClient2BenefitSurviving', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateLifeInsClient2BenefitOther || ''}
                        onChange={(e) => updateSharedInput('estateLifeInsClient2BenefitOther', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Life insurance not owned by insured */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Life insurance not owned by insured</Label>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div><Label className="text-sm font-medium">Insured</Label></div>
                    <div className="text-center text-sm font-medium">Benefit payable to surviving client</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div><Label className="text-sm">Client 1</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateLifeInsNotOwnedClient1 || ''}
                        onChange={(e) => updateSharedInput('estateLifeInsNotOwnedClient1', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div><Label className="text-sm">Client 2</Label></div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        value={sharedInputs.estateLifeInsNotOwnedClient2 || ''}
                        onChange={(e) => updateSharedInput('estateLifeInsNotOwnedClient2', e.target.value)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Insurance for ILIT */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Insurance to be used to illustrate an ILIT at second death</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">New insurance premium per $1,000:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateNewInsurancePremium || ''}
                          onChange={(e) => updateSharedInput('estateNewInsurancePremium', e.target.value)}
                          placeholder="0"
                          className="pl-6"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Number of years to pay new premium:</Label>
                      <Input 
                        value={sharedInputs.estateYearsToPayPremium || ''}
                        onChange={(e) => updateSharedInput('estateYearsToPayPremium', e.target.value)}
                        placeholder="0"
                        className="mt-1"
                      />
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
              <div className="space-y-6">
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
                    <div>
                      <Label className="text-sm">Final expenses:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.estateFinalExpenses || ''}
                          onChange={(e) => updateSharedInput('estateFinalExpenses', e.target.value)}
                          placeholder="5,000"
                          className="pl-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specific to Estate Analysis */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Specific to the Estate Analysis</Label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Asset growth (depletion) rate between first and second death:</Label>
                        <div className="relative mt-1">
                          <Input 
                            value={sharedInputs.estateAssetGrowthRate || ''}
                            onChange={(e) => updateSharedInput('estateAssetGrowthRate', e.target.value)}
                            placeholder="0"
                            className="pr-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm">Applicable exclusion inflation rate:</Label>
                        <div className="relative mt-1">
                          <Input 
                            value={sharedInputs.estateExclusionInflationRate || ''}
                            onChange={(e) => updateSharedInput('estateExclusionInflationRate', e.target.value)}
                            placeholder="0"
                            className="pr-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Miscellaneous Fees */}
                    <div className="space-y-3 p-3 border rounded-md">
                      <Label className="text-sm font-medium text-muted-foreground">Miscellaneous Fees</Label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-5 gap-2 items-center">
                          <div><Label className="text-sm">Probate</Label></div>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                            <Input 
                              value={sharedInputs.estateProbateFeeDollar || ''}
                              onChange={(e) => updateSharedInput('estateProbateFeeDollar', e.target.value)}
                              placeholder="0"
                              className="pl-6 h-8"
                            />
                          </div>
                          <div className="text-center text-sm">plus</div>
                          <div className="relative">
                            <Input 
                              value={sharedInputs.estateProbateFeePercent || ''}
                              onChange={(e) => updateSharedInput('estateProbateFeePercent', e.target.value)}
                              placeholder="0"
                              className="pr-6 h-8"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">of probatable assets</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 items-center">
                          <div><Label className="text-sm">Administration</Label></div>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                            <Input 
                              value={sharedInputs.estateAdminFeeDollar || ''}
                              onChange={(e) => updateSharedInput('estateAdminFeeDollar', e.target.value)}
                              placeholder="0"
                              className="pl-6 h-8"
                            />
                          </div>
                          <div className="text-center text-sm">plus</div>
                          <div className="relative">
                            <Input 
                              value={sharedInputs.estateAdminFeePercent || ''}
                              onChange={(e) => updateSharedInput('estateAdminFeePercent', e.target.value)}
                              placeholder="0"
                              className="pr-6 h-8"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">of probatable assets</div>
                        </div>
                      </div>
                    </div>

                    {/* State Death Taxes */}
                    <div className="space-y-3 p-3 border rounded-md">
                      <Label className="text-sm font-medium text-muted-foreground">State Death Taxes</Label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-5 gap-2 items-center">
                          <div><Label className="text-sm">At first death</Label></div>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                            <Input 
                              value={sharedInputs.estateStateDeathTaxFirstDollar || ''}
                              onChange={(e) => updateSharedInput('estateStateDeathTaxFirstDollar', e.target.value)}
                              placeholder="0"
                              className="pl-6 h-8"
                            />
                          </div>
                          <div className="text-center text-sm">plus</div>
                          <div className="relative">
                            <Input 
                              value={sharedInputs.estateStateDeathTaxFirstPercent || ''}
                              onChange={(e) => updateSharedInput('estateStateDeathTaxFirstPercent', e.target.value)}
                              placeholder="0"
                              className="pr-6 h-8"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">of gross estate</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 items-center">
                          <div><Label className="text-sm">At second death</Label></div>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                            <Input 
                              value={sharedInputs.estateStateDeathTaxSecondDollar || ''}
                              onChange={(e) => updateSharedInput('estateStateDeathTaxSecondDollar', e.target.value)}
                              placeholder="0"
                              className="pl-6 h-8"
                            />
                          </div>
                          <div className="text-center text-sm">plus</div>
                          <div className="relative">
                            <Input 
                              value={sharedInputs.estateStateDeathTaxSecondPercent || ''}
                              onChange={(e) => updateSharedInput('estateStateDeathTaxSecondPercent', e.target.value)}
                              placeholder="0"
                              className="pr-6 h-8"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">of gross estate</div>
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
