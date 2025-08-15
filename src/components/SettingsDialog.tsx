import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  // Global Assumptions sub-tabs state
  const [generalAssumptions, setGeneralAssumptions] = useState({
    annualInflationRate: "3",
    annualEmploymentInflationRate: "4",
    annualEducationInflationRate: "6",
    annualSocialSecurityBenefitInflationRate: "2",
    mortalityAgeClient1: "90",
    mortalityAgeClient2: "90",
    finalExpenses: "5000"
  });

  const [longTermCareAssumptions, setLongTermCareAssumptions] = useState({
    ageAtWhichLongTermCareBegins: "70",
    longTermCareDuration: "5",
    longTermCareInflationRate: "8",
    estimatedMonthlyCost: "6000"
  });

  const [survivorAssumptions, setSurvivorAssumptions] = useState({
    emergencyReserves: "3"
  });

  const [estateAssumptions, setEstateAssumptions] = useState({
    assetGrowthRate: "0",
    applicableExclusionInflationRate: "0",
    miscellaneousFeesFixed: "0",
    miscellaneousFeesPercent: "0",
    administrationFixed: "0",
    administrationPercent: "0",
    stateDeathTaxesFirstFixed: "0",
    stateDeathTaxesFirstPercent: "0",
    stateDeathTaxesSecondFixed: "0",
    stateDeathTaxesSecondPercent: "0"
  });

  const [retirementDistributionAssumptions, setRetirementDistributionAssumptions] = useState({
    incomeTaxRate: "0",
    capitalGainsTaxRate: "0",
    retirementSurplusRate: "0",
    requiredMinimumDistribution: false
  });

  const [rateOfReturnAssumptions, setRateOfReturnAssumptions] = useState({
    rateOfReturnOnEducationAssets: "0",
    assumedRateOfReturnSurvivor: "0",
    assumedRateOfReturnDuringRetirement: "0",
    assumedRateOfReturnForSolutionsDuringRetirement: "0"
  });

  const [options, setOptions] = useState({
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    autoSave: true,
    notifications: true
  });

  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [billingInfo, setBillingInfo] = useState({
    currentPlan: "Advisys Advanced",
    autoRenewal: true,
    nextBillingDate: "07/15/2024",
    expirationDate: "07/15/2024",
    cardLast4: "1234",
    cardExpiration: "12/26"
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
          <DialogDescription>
            Update your application settings, profile, and billing information in these tabs. All changes are saved securely.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="global-assumptions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="global-assumptions">Global Assumptions</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="change-password">Change Password</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="global-assumptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Global Financial Assumptions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="long-term-care">Long-Term Care</TabsTrigger>
                    <TabsTrigger value="survivor">Survivor</TabsTrigger>
                    <TabsTrigger value="estate">Estate</TabsTrigger>
                    <TabsTrigger value="retirement-distribution">Retirement Distribution</TabsTrigger>
                    <TabsTrigger value="rate-of-return">Rate of Return</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Applicable to multiple analyses</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="annualInflationRate">Annual inflation rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="annualInflationRate"
                              value={generalAssumptions.annualInflationRate}
                              onChange={(e) => setGeneralAssumptions(prev => ({ ...prev, annualInflationRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="annualEmploymentInflationRate">Annual employment inflation rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="annualEmploymentInflationRate"
                              value={generalAssumptions.annualEmploymentInflationRate}
                              onChange={(e) => setGeneralAssumptions(prev => ({ ...prev, annualEmploymentInflationRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="annualEducationInflationRate">Annual education inflation rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="annualEducationInflationRate"
                              value={generalAssumptions.annualEducationInflationRate}
                              onChange={(e) => setGeneralAssumptions(prev => ({ ...prev, annualEducationInflationRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="annualSocialSecurityBenefitInflationRate">Annual social security benefit inflation rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="annualSocialSecurityBenefitInflationRate"
                              value={generalAssumptions.annualSocialSecurityBenefitInflationRate}
                              onChange={(e) => setGeneralAssumptions(prev => ({ ...prev, annualSocialSecurityBenefitInflationRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="mortalityAgeClient1">Mortality age - Client 1:</Label>
                          <Input
                            id="mortalityAgeClient1"
                            value={generalAssumptions.mortalityAgeClient1}
                            onChange={(e) => setGeneralAssumptions(prev => ({ ...prev, mortalityAgeClient1: e.target.value }))}
                            className="w-20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mortalityAgeClient2">Mortality age - Client 2:</Label>
                          <Input
                            id="mortalityAgeClient2"
                            value={generalAssumptions.mortalityAgeClient2}
                            onChange={(e) => setGeneralAssumptions(prev => ({ ...prev, mortalityAgeClient2: e.target.value }))}
                            className="w-20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="finalExpenses">Final expenses:</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">$</span>
                            <Input
                              id="finalExpenses"
                              value={generalAssumptions.finalExpenses}
                              onChange={(e) => setGeneralAssumptions(prev => ({ ...prev, finalExpenses: e.target.value }))}
                              className="w-28"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="long-term-care" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Specific to long-term care</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ageAtWhichLongTermCareBegins">Age at which long-term care begins:</Label>
                          <Input
                            id="ageAtWhichLongTermCareBegins"
                            value={longTermCareAssumptions.ageAtWhichLongTermCareBegins}
                            onChange={(e) => setLongTermCareAssumptions(prev => ({ ...prev, ageAtWhichLongTermCareBegins: e.target.value }))}
                            className="w-20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="longTermCareDuration">Long-term care duration (years):</Label>
                          <Input
                            id="longTermCareDuration"
                            value={longTermCareAssumptions.longTermCareDuration}
                            onChange={(e) => setLongTermCareAssumptions(prev => ({ ...prev, longTermCareDuration: e.target.value }))}
                            className="w-20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="longTermCareInflationRate">Long-term care inflation rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="longTermCareInflationRate"
                              value={longTermCareAssumptions.longTermCareInflationRate}
                              onChange={(e) => setLongTermCareAssumptions(prev => ({ ...prev, longTermCareInflationRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="estimatedMonthlyCost">Estimated monthly cost of long-term care today:</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">$</span>
                            <Input
                              id="estimatedMonthlyCost"
                              value={longTermCareAssumptions.estimatedMonthlyCost}
                              onChange={(e) => setLongTermCareAssumptions(prev => ({ ...prev, estimatedMonthlyCost: e.target.value }))}
                              className="w-28"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="survivor" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Specific to the survivor analysis</h4>
                      <div>
                        <Label htmlFor="emergencyReserves">Emergency reserves should be equal to:</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="emergencyReserves"
                            value={survivorAssumptions.emergencyReserves}
                            onChange={(e) => setSurvivorAssumptions(prev => ({ ...prev, emergencyReserves: e.target.value }))}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">months total income</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="estate" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Specific to the Estate Analysis</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="assetGrowthRate">Asset growth (depletion) rate between first and second death:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="assetGrowthRate"
                              value={estateAssumptions.assetGrowthRate}
                              onChange={(e) => setEstateAssumptions(prev => ({ ...prev, assetGrowthRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="applicableExclusionInflationRate">Applicable exclusion inflation rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="applicableExclusionInflationRate"
                              value={estateAssumptions.applicableExclusionInflationRate}
                              onChange={(e) => setEstateAssumptions(prev => ({ ...prev, applicableExclusionInflationRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-blue-600">Miscellaneous Fees</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">$</span>
                            <Input
                              value={estateAssumptions.miscellaneousFeesFixed}
                              onChange={(e) => setEstateAssumptions(prev => ({ ...prev, miscellaneousFeesFixed: e.target.value }))}
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">plus</span>
                            <Input
                              value={estateAssumptions.miscellaneousFeesPercent}
                              onChange={(e) => setEstateAssumptions(prev => ({ ...prev, miscellaneousFeesPercent: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">% of probatable assets</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-blue-600">Administration</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">$</span>
                            <Input
                              value={estateAssumptions.administrationFixed}
                              onChange={(e) => setEstateAssumptions(prev => ({ ...prev, administrationFixed: e.target.value }))}
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">plus</span>
                            <Input
                              value={estateAssumptions.administrationPercent}
                              onChange={(e) => setEstateAssumptions(prev => ({ ...prev, administrationPercent: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">% of probatable assets</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-blue-600">State Death Taxes</Label>
                          <div className="space-y-2">
                            <div>
                              <Label className="text-sm">At first death</Label>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">$</span>
                                <Input
                                  value={estateAssumptions.stateDeathTaxesFirstFixed}
                                  onChange={(e) => setEstateAssumptions(prev => ({ ...prev, stateDeathTaxesFirstFixed: e.target.value }))}
                                  className="w-24"
                                />
                                <span className="text-sm text-muted-foreground">plus</span>
                                <Input
                                  value={estateAssumptions.stateDeathTaxesFirstPercent}
                                  onChange={(e) => setEstateAssumptions(prev => ({ ...prev, stateDeathTaxesFirstPercent: e.target.value }))}
                                  className="w-20"
                                />
                                <span className="text-sm text-muted-foreground">% of gross estate</span>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm">At second death</Label>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">$</span>
                                <Input
                                  value={estateAssumptions.stateDeathTaxesSecondFixed}
                                  onChange={(e) => setEstateAssumptions(prev => ({ ...prev, stateDeathTaxesSecondFixed: e.target.value }))}
                                  className="w-24"
                                />
                                <span className="text-sm text-muted-foreground">plus</span>
                                <Input
                                  value={estateAssumptions.stateDeathTaxesSecondPercent}
                                  onChange={(e) => setEstateAssumptions(prev => ({ ...prev, stateDeathTaxesSecondPercent: e.target.value }))}
                                  className="w-20"
                                />
                                <span className="text-sm text-muted-foreground">% of gross estate</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="retirement-distribution" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Specific to Retirement Income Distribution</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="incomeTaxRate">Income tax rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="incomeTaxRate"
                              value={retirementDistributionAssumptions.incomeTaxRate}
                              onChange={(e) => setRetirementDistributionAssumptions(prev => ({ ...prev, incomeTaxRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="capitalGainsTaxRate">Capital gains tax rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="capitalGainsTaxRate"
                              value={retirementDistributionAssumptions.capitalGainsTaxRate}
                              onChange={(e) => setRetirementDistributionAssumptions(prev => ({ ...prev, capitalGainsTaxRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="retirementSurplusRate">Retirement surplus rate:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="retirementSurplusRate"
                              value={retirementDistributionAssumptions.retirementSurplusRate}
                              onChange={(e) => setRetirementDistributionAssumptions(prev => ({ ...prev, retirementSurplusRate: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="requiredMinimumDistribution"
                            checked={retirementDistributionAssumptions.requiredMinimumDistribution}
                            onCheckedChange={(checked) => setRetirementDistributionAssumptions(prev => ({ ...prev, requiredMinimumDistribution: checked as boolean }))}
                          />
                          <Label htmlFor="requiredMinimumDistribution">Required minimum distribution</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rate-of-return" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Rate of return</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="rateOfReturnOnEducationAssets">Rate of return on education assets:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="rateOfReturnOnEducationAssets"
                              value={rateOfReturnAssumptions.rateOfReturnOnEducationAssets}
                              onChange={(e) => setRateOfReturnAssumptions(prev => ({ ...prev, rateOfReturnOnEducationAssets: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="assumedRateOfReturnSurvivor">Assumed rate of return survivor:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="assumedRateOfReturnSurvivor"
                              value={rateOfReturnAssumptions.assumedRateOfReturnSurvivor}
                              onChange={(e) => setRateOfReturnAssumptions(prev => ({ ...prev, assumedRateOfReturnSurvivor: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="assumedRateOfReturnDuringRetirement">Assumed rate of return during retirement:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="assumedRateOfReturnDuringRetirement"
                              value={rateOfReturnAssumptions.assumedRateOfReturnDuringRetirement}
                              onChange={(e) => setRateOfReturnAssumptions(prev => ({ ...prev, assumedRateOfReturnDuringRetirement: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="assumedRateOfReturnForSolutionsDuringRetirement">Assumed rate of return for solutions during retirement:</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="assumedRateOfReturnForSolutionsDuringRetirement"
                              value={rateOfReturnAssumptions.assumedRateOfReturnForSolutionsDuringRetirement}
                              onChange={(e) => setRateOfReturnAssumptions(prev => ({ ...prev, assumedRateOfReturnForSolutionsDuringRetirement: e.target.value }))}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Global Assumptions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="options" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={options.currency} onValueChange={(value) => setOptions(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={options.dateFormat} onValueChange={(value) => setOptions(prev => ({ ...prev, dateFormat: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoSave">Auto-save changes</Label>
                    <Switch
                      id="autoSave"
                      checked={options.autoSave}
                      onCheckedChange={(checked) => setOptions(prev => ({ ...prev, autoSave: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Enable notifications</Label>
                    <Switch
                      id="notifications"
                      checked={options.notifications}
                      onCheckedChange={(checked) => setOptions(prev => ({ ...prev, notifications: checked }))}
                    />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Options</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="change-password" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Current Plan</Label>
                    <p className="text-lg font-semibold text-blue-600">{billingInfo.currentPlan}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Auto-Renewal</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Switch
                        checked={billingInfo.autoRenewal}
                        onCheckedChange={(checked) => setBillingInfo(prev => ({ ...prev, autoRenewal: checked }))}
                      />
                      <span className="text-sm">{billingInfo.autoRenewal ? "Yes" : "No"}</span>
                    </div>
                  </div>
                  {billingInfo.autoRenewal ? (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Next Billing Date</Label>
                      <p className="text-sm text-gray-600">{billingInfo.nextBillingDate}</p>
                    </div>
                  ) : (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Expiration Date</Label>
                      <p className="text-sm text-gray-600">{billingInfo.expirationDate}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Payment Method</Label>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">**** **** **** {billingInfo.cardLast4}</p>
                      <p className="text-xs text-muted-foreground">Expires: {billingInfo.cardExpiration}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Update Payment Method</Button>
                  <Button variant="outline">Download Invoice</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
