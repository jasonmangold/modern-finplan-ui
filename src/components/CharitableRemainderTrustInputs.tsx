import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Building2, Settings } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const CharitableRemainderTrustInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Charitable Remainder Trust Analysis</h2>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="trust" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Trust
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Client Information */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Client Information</Label>
                  <div className="grid grid-cols-2 gap-4">
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
                </div>

                {/* Donor and income beneficiary information */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Donor and income beneficiary information</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Donor's name for reports:</Label>
                      <Input 
                        value={sharedInputs.crtDonorName || ''}
                        onChange={(e) => updateSharedInput('crtDonorName', e.target.value)}
                        placeholder="Enter donor name" 
                        className="mt-1" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">First income beneficiary:</Label>
                        <Input 
                          value={sharedInputs.crtFirstIncomeBeneficiary || ''}
                          onChange={(e) => updateSharedInput('crtFirstIncomeBeneficiary', e.target.value)}
                          placeholder="Enter beneficiary name" 
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Date of birth:</Label>
                        <Input 
                          type="date"
                          value={sharedInputs.crtFirstBeneficiaryDOB || ''}
                          onChange={(e) => updateSharedInput('crtFirstBeneficiaryDOB', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Second income beneficiary:</Label>
                        <Input 
                          value={sharedInputs.crtSecondIncomeBeneficiary || ''}
                          onChange={(e) => updateSharedInput('crtSecondIncomeBeneficiary', e.target.value)}
                          placeholder="Enter beneficiary name" 
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Date of birth:</Label>
                        <Input 
                          type="date"
                          value={sharedInputs.crtSecondBeneficiaryDOB || ''}
                          onChange={(e) => updateSharedInput('crtSecondBeneficiaryDOB', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm">Transfer date:</Label>
                      <Input 
                        type="date"
                        value={sharedInputs.crtTransferDate || ''}
                        onChange={(e) => updateSharedInput('crtTransferDate', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trust" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Charitable remainder trust */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Charitable remainder trust</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Charitable beneficiary:</Label>
                      <Input 
                        value={sharedInputs.crtCharitableBeneficiary || ''}
                        onChange={(e) => updateSharedInput('crtCharitableBeneficiary', e.target.value)}
                        placeholder="Enter charitable beneficiary" 
                        className="mt-1" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Assets transferred to trust:</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                          <Input 
                            value={sharedInputs.crtAssetsTransferred || ''}
                            onChange={(e) => updateSharedInput('crtAssetsTransferred', e.target.value)}
                            placeholder="0"
                            className="pl-6"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm">Rate of return on trust assets:</Label>
                        <div className="relative mt-1">
                          <Input 
                            value={sharedInputs.crtRateOfReturn || ''}
                            onChange={(e) => updateSharedInput('crtRateOfReturn', e.target.value)}
                            placeholder="0"
                            className="pr-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Duration of payments:</Label>
                        <Select 
                          value={sharedInputs.crtDurationOfPayments || ''} 
                          onValueChange={(value) => updateSharedInput('crtDurationOfPayments', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Term of years" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="term-of-years">Term of years</SelectItem>
                            <SelectItem value="lifetime">Lifetime</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">Trust term (1-20):</Label>
                        <Input 
                          value={sharedInputs.crtTrustTerm || ''}
                          onChange={(e) => updateSharedInput('crtTrustTerm', e.target.value)}
                          placeholder="1"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm">Annual income payout for CRAT (5-50%):</Label>
                        <div className="relative mt-1">
                          <Input 
                            value={sharedInputs.crtAnnualIncomeCRAT || ''}
                            onChange={(e) => updateSharedInput('crtAnnualIncomeCRAT', e.target.value)}
                            placeholder="5"
                            className="pr-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm">Annual income payout for CRUT (5-50%):</Label>
                        <div className="relative mt-1">
                          <Input 
                            value={sharedInputs.crtAnnualIncomeCRUT || ''}
                            onChange={(e) => updateSharedInput('crtAnnualIncomeCRUT', e.target.value)}
                            placeholder="5"
                            className="pr-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm">IRC Section 7520 rate:</Label>
                        <div className="relative mt-1">
                          <Input 
                            value={sharedInputs.crtIRCSection7520Rate || ''}
                            onChange={(e) => updateSharedInput('crtIRCSection7520Rate', e.target.value)}
                            placeholder="1"
                            className="pr-8"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wealth replacement trust */}
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Wealth replacement trust</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Amount of life insurance:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.crtLifeInsuranceAmount || ''}
                          onChange={(e) => updateSharedInput('crtLifeInsuranceAmount', e.target.value)}
                          placeholder="0"
                          className="pl-6"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">First year premium:</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input 
                          value={sharedInputs.crtFirstYearPremium || ''}
                          onChange={(e) => updateSharedInput('crtFirstYearPremium', e.target.value)}
                          placeholder="0"
                          className="pl-6"
                        />
                      </div>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};