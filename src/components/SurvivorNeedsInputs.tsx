import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, TrendingUp, GraduationCap, Settings, Plus, Trash2 } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const SurvivorNeedsInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

  const addChild = () => {
    const newChildren = [...sharedInputs.children, { name: '', dateOfBirth: '' }];
    updateSharedInput('children', newChildren);
  };
  
  const removeChild = (index: number) => {
    const newChildren = sharedInputs.children.filter((_, i) => i !== index);
    updateSharedInput('children', newChildren);
  };
  
  const updateChild = (index: number, field: 'name' | 'dateOfBirth', value: string) => {
    const newChildren = [...sharedInputs.children];
    newChildren[index][field] = value;
    updateSharedInput('children', newChildren);
  };

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
          <TabsTrigger value="capital-debt" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Capital & Debt
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
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
                  <Label className="text-sm">Client 1 Name</Label>
                  <Input 
                    value={sharedInputs.client1Name}
                    onChange={(e) => updateSharedInput('client1Name', e.target.value)}
                    placeholder="Enter client 1 name" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 Date of Birth</Label>
                  <Input 
                    type="date"
                    value={sharedInputs.client1DateOfBirth}
                    onChange={(e) => updateSharedInput('client1DateOfBirth', e.target.value)}
                    className="mt-1" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Client 1 Retirement Age</Label>
                <Input 
                  value={sharedInputs.client1RetirementAge}
                  onChange={(e) => updateSharedInput('client1RetirementAge', e.target.value)}
                  placeholder="67" 
                  className="mt-1" 
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="married" 
                  checked={sharedInputs.isMarried}
                  onCheckedChange={(checked) => updateSharedInput('isMarried', checked)}
                />
                <Label htmlFor="married" className="text-sm">Married</Label>
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
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Client 2 Name</Label>
                      <Input 
                        value={sharedInputs.client2Name}
                        onChange={(e) => updateSharedInput('client2Name', e.target.value)}
                        placeholder="Enter client 2 name" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Client 2 Date of Birth</Label>
                      <Input 
                        type="date"
                        value={sharedInputs.client2DateOfBirth}
                        onChange={(e) => updateSharedInput('client2DateOfBirth', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 Retirement Age</Label>
                    <Input 
                      value={sharedInputs.client2RetirementAge}
                      onChange={(e) => updateSharedInput('client2RetirementAge', e.target.value)}
                      placeholder="67" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Dependent Information
                    <Button onClick={addChild} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Child
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sharedInputs.children.map((child, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50/50">
                      <div>
                        <Label className="text-sm">Child {index + 1} Name</Label>
                        <Input 
                          value={child.name}
                          onChange={(e) => updateChild(index, 'name', e.target.value)}
                          placeholder={`Enter child ${index + 1} name`} 
                          className="mt-1" 
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Label className="text-sm">Date of Birth</Label>
                          <Input 
                            type="date"
                            value={child.dateOfBirth}
                            onChange={(e) => updateChild(index, 'dateOfBirth', e.target.value)}
                            className="mt-1" 
                          />
                        </div>
                        <Button 
                          onClick={() => removeChild(index)} 
                          size="sm" 
                          variant="outline"
                          className="mb-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {sharedInputs.children.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No children added yet</p>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-needs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income Needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Monthly Income Need Today</Label>
                <Input placeholder="$8,000" className="mt-1" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">When Youngest Child Reaches Age</Label>
                  <Input placeholder="18" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Amount</Label>
                  <Input placeholder="$6,000" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Beginning at Retirement</Label>
                <Input placeholder="$5,000" className="mt-1" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="includeEducation" />
                <Label htmlFor="includeEducation" className="text-sm">Include Education Funding for Dependents</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-sources" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Annual Employment Income</Label>
                  <Input 
                    value={sharedInputs.client1EmploymentIncome}
                    onChange={(e) => updateSharedInput('client1EmploymentIncome', e.target.value)}
                    placeholder="$100,000" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Annual Employment Income</Label>
                    <Input 
                      value={sharedInputs.client2EmploymentIncome}
                      onChange={(e) => updateSharedInput('client2EmploymentIncome', e.target.value)}
                      placeholder="$80,000" 
                      className="mt-1" 
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Annual Social Security</Label>
                  <Input 
                    value={sharedInputs.client1SocialSecurity}
                    onChange={(e) => updateSharedInput('client1SocialSecurity', e.target.value)}
                    placeholder="$35,000" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Client 1 SS Start Age</Label>
                  <Input 
                    value={sharedInputs.client1SSStartAge}
                    onChange={(e) => updateSharedInput('client1SSStartAge', e.target.value)}
                    placeholder="67" 
                    className="mt-1" 
                  />
                </div>
              </div>

              {sharedInputs.hasClient2 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Client 2 Annual Social Security</Label>
                    <Input 
                      value={sharedInputs.client2SocialSecurity}
                      onChange={(e) => updateSharedInput('client2SocialSecurity', e.target.value)}
                      placeholder="$30,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Client 2 SS Start Age</Label>
                    <Input 
                      value={sharedInputs.client2SSStartAge}
                      onChange={(e) => updateSharedInput('client2SSStartAge', e.target.value)}
                      placeholder="67" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital-debt" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capital & Debt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label className="text-base font-medium">Client 1 Retirement</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Retirement Balance</Label>
                    <Input 
                      value={sharedInputs.client1RetirementBalance}
                      onChange={(e) => updateSharedInput('client1RetirementBalance', e.target.value)}
                      placeholder="$500,000" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Monthly Contributions</Label>
                    <Input 
                      value={sharedInputs.client1MonthlyContributions}
                      onChange={(e) => updateSharedInput('client1MonthlyContributions', e.target.value)}
                      placeholder="$2,000" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">Education-related funding inputs for dependents</p>
              <div>
                <Label className="text-sm">School Name</Label>
                <Input 
                  value={sharedInputs.schoolName}
                  onChange={(e) => updateSharedInput('schoolName', e.target.value)}
                  placeholder="Enter school name" 
                  className="mt-1" 
                />
              </div>
              <div>
                <Label className="text-sm">Annual Tuition Cost</Label>
                <Input 
                  value={sharedInputs.annualTuitionCost}
                  onChange={(e) => updateSharedInput('annualTuitionCost', e.target.value)}
                  placeholder="$50,000" 
                  className="mt-1" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Analysis Date</Label>
                <Input 
                  type="date" 
                  value={sharedInputs.analysisDate}
                  onChange={(e) => updateSharedInput('analysisDate', e.target.value)}
                  className="mt-1" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Client 1 Mortality Age</Label>
                  <Input 
                    value={sharedInputs.client1MortalityAge}
                    onChange={(e) => updateSharedInput('client1MortalityAge', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
                {sharedInputs.hasClient2 && (
                  <div>
                    <Label className="text-sm">Client 2 Mortality Age</Label>
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
                  <Label className="text-sm">Final Expenses</Label>
                  <Input placeholder="$25,000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Emergency Reserves (Months of Employment Income)</Label>
                  <Input placeholder="6" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Assumed Rate of Return on Survivor's Assets</Label>
                <Input placeholder="6%" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
