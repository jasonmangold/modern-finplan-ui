import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Building2, Target, HelpCircle, Settings } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const AssetAllocationInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

  const riskQuestions = [
    { id: 1, label: 'Question 1' },
    { id: 2, label: 'Question 2' },
    { id: 3, label: 'Question 3' },
    { id: 4, label: 'Question 4' },
    { id: 5, label: 'Question 5' },
    { id: 6, label: 'Question 6' },
    { id: 7, label: 'Question 7' },
    { id: 8, label: 'Question 8' }
  ];

  const riskProfiles = [
    'Conservative',
    'Moderate Conservative', 
    'Moderate',
    'Moderate Aggressive',
    'Aggressive'
  ];

  const assetCategories = [
    { key: 'largeMidCap', label: 'Large/Mid Cap' },
    { key: 'smallCap', label: 'Small Cap' },
    { key: 'usBonds', label: 'US Bonds' },
    { key: 'cash', label: 'Cash' },
    { key: 'intlEquity', label: "Int'l Equity" }
  ];

  const updateAssetAllocation = (category: string, column: string, value: string) => {
    const fieldKey = `assetAlloc${category.charAt(0).toUpperCase()}${category.slice(1)}${column.charAt(0).toUpperCase()}${column.slice(1)}` as keyof typeof sharedInputs;
    updateSharedInput(fieldKey, value);
  };

  const getAssetAllocationValue = (category: string, column: string): string => {
    const fieldKey = `assetAlloc${category.charAt(0).toUpperCase()}${category.slice(1)}${column.charAt(0).toUpperCase()}${column.slice(1)}` as keyof typeof sharedInputs;
    return (sharedInputs[fieldKey] as string) || '';
  };

  const updateRiskAnswer = (questionId: number, value: string) => {
    const fieldKey = `riskQuestion${questionId}Answer` as keyof typeof sharedInputs;
    updateSharedInput(fieldKey, value);
  };

  const getRiskAnswer = (questionId: number): string => {
    const fieldKey = `riskQuestion${questionId}Answer` as keyof typeof sharedInputs;
    return (sharedInputs[fieldKey] as string) || '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Asset Allocation Analysis</h2>
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
          <TabsTrigger value="risk-profile" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Risk Profile
          </TabsTrigger>
          <TabsTrigger value="risk-questionnaire" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Risk Questionnaire
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

                {/* Marital Status */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="assetAllocMarried" 
                    checked={sharedInputs.ClientsAreMarried}
                    onCheckedChange={(checked) => updateSharedInput('ClientsAreMarried', checked)}
                  />
                  <Label htmlFor="assetAllocMarried" className="text-sm">Clients are married</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-6 gap-2 min-w-[800px]">
                    {/* Headers */}
                    <div></div>
                    <div className="text-center text-sm font-medium border rounded p-2 bg-muted/30">
                      Retirement Plans<br/>Client 1
                    </div>
                    <div className="text-center text-sm font-medium border rounded p-2 bg-muted/30">
                      Retirement Plans<br/>Client 2
                    </div>
                    <div className="text-center text-sm font-medium border rounded p-2 bg-muted/30">
                      Cash
                    </div>
                    <div className="text-center text-sm font-medium border rounded p-2 bg-muted/30">
                      Other Assets
                    </div>
                    <div></div>

                    {/* Balance Row */}
                    <div className="text-sm font-medium py-2">Balance</div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                      <Input 
                        value={getAssetAllocationValue('retirementPlansClient1', 'balance')}
                        onChange={(e) => updateAssetAllocation('retirementPlansClient1', 'balance', e.target.value)}
                        placeholder="0"
                        className="pl-6 h-8 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                      <Input 
                        value={getAssetAllocationValue('retirementPlansClient2', 'balance')}
                        onChange={(e) => updateAssetAllocation('retirementPlansClient2', 'balance', e.target.value)}
                        placeholder="0"
                        className="pl-6 h-8 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                      <Input 
                        value={getAssetAllocationValue('cash', 'balance')}
                        onChange={(e) => updateAssetAllocation('cash', 'balance', e.target.value)}
                        placeholder="0"
                        className="pl-6 h-8 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">$</span>
                      <Input 
                        value={getAssetAllocationValue('otherAssets', 'balance')}
                        onChange={(e) => updateAssetAllocation('otherAssets', 'balance', e.target.value)}
                        placeholder="0"
                        className="pl-6 h-8 text-sm"
                      />
                    </div>
                    <div></div>

                    {/* Asset Category Rows */}
                    {assetCategories.map((category) => (
                      <React.Fragment key={category.key}>
                        <div className="text-sm py-2">{category.label}</div>
                        <div className="relative">
                          <Input 
                            value={getAssetAllocationValue(category.key, 'retirementPlansClient1')}
                            onChange={(e) => updateAssetAllocation(category.key, 'retirementPlansClient1', e.target.value)}
                            placeholder="100"
                            className="pr-6 h-8 text-sm"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                        </div>
                        <div className="relative">
                          <Input 
                            value={getAssetAllocationValue(category.key, 'retirementPlansClient2')}
                            onChange={(e) => updateAssetAllocation(category.key, 'retirementPlansClient2', e.target.value)}
                            placeholder="100"
                            className="pr-6 h-8 text-sm"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                        </div>
                        <div className="relative">
                          <Input 
                            value={getAssetAllocationValue(category.key, 'cash')}
                            onChange={(e) => updateAssetAllocation(category.key, 'cash', e.target.value)}
                            placeholder={category.key === 'cash' ? '100' : '0'}
                            className="pr-6 h-8 text-sm"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                        </div>
                        <div className="relative">
                          <Input 
                            value={getAssetAllocationValue(category.key, 'otherAssets')}
                            onChange={(e) => updateAssetAllocation(category.key, 'otherAssets', e.target.value)}
                            placeholder="100"
                            className="pr-6 h-8 text-sm"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                        </div>
                        <div></div>
                      </React.Fragment>
                    ))}

                    {/* Totals Row */}
                    <div className="text-sm font-medium py-2">Totals allocated</div>
                    <div className="text-sm py-2 text-center font-medium">100 %</div>
                    <div className="text-sm py-2 text-center font-medium">100 %</div>
                    <div className="text-sm py-2 text-center font-medium">100 %</div>
                    <div className="text-sm py-2 text-center font-medium">100 %</div>
                    <div></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-profile" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Recommended risk profile</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Select risk profile to illustrate recommended asset allocation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="useRiskProfileByScore" 
                        checked={sharedInputs.useRiskProfileByScore || false}
                        onCheckedChange={(checked) => updateSharedInput('useRiskProfileByScore', checked)}
                      />
                      <Label htmlFor="useRiskProfileByScore" className="text-sm">Use risk profile indicated by score</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Alternate risk profile:</Label>
                        <Select 
                          value={sharedInputs.alternateRiskProfile || ''} 
                          onValueChange={(value) => updateSharedInput('alternateRiskProfile', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Conservative" />
                          </SelectTrigger>
                          <SelectContent>
                            {riskProfiles.map((profile) => (
                              <SelectItem key={profile} value={profile.toLowerCase().replace(/\s+/g, '-')}>
                                {profile}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-questionnaire" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-3 p-3 border rounded-md">
                  <Label className="text-sm font-medium text-muted-foreground">Risk tolerance questionnaire</Label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center text-sm font-medium">
                      <div></div>
                      <div>Answers</div>
                    </div>
                    {riskQuestions.map((question) => (
                      <div key={question.id} className="grid grid-cols-2 gap-4 items-center">
                        <div>
                          <Label className="text-sm">{question.label}</Label>
                        </div>
                        <div>
                          <Select 
                            value={getRiskAnswer(question.id)} 
                            onValueChange={(value) => updateRiskAnswer(question.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="A" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                              <SelectItem value="E">E</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4 items-center pt-4 border-t">
                      <div>
                        <Label className="text-sm font-medium">Total score</Label>
                      </div>
                      <div>
                        <Input 
                          value={sharedInputs.riskQuestionnaireScore || ''}
                          onChange={(e) => updateSharedInput('riskQuestionnaireScore', e.target.value)}
                          placeholder="0"
                          className="text-center"
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
                        value={sharedInputs.AnalysisDate || ''}
                        onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
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