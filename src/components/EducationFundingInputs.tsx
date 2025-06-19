
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Settings, Plus, Trash2 } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const EducationFundingInputs = () => {
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
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>Personal</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 flex-shrink-0" />
            <span>Education</span>
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2">
            <Settings className="h-4 w-4 flex-shrink-0" />
            <span>Assumptions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
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
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Education Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Age When School Begins</Label>
                  <Input 
                    value={sharedInputs.ageWhenSchoolBegins}
                    onChange={(e) => updateSharedInput('ageWhenSchoolBegins', e.target.value)}
                    placeholder="18" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Number of Years in School</Label>
                  <Input 
                    value={sharedInputs.numberOfYearsInSchool}
                    onChange={(e) => updateSharedInput('numberOfYearsInSchool', e.target.value)}
                    placeholder="4" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Percentage to Fund</Label>
                  <Select 
                    value={sharedInputs.percentageToFund} 
                    onValueChange={(value) => updateSharedInput('percentageToFund', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                      <SelectItem value="100">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Amount Currently Saved</Label>
                  <Input 
                    value={sharedInputs.amountCurrentlySaved}
                    onChange={(e) => updateSharedInput('amountCurrentlySaved', e.target.value)}
                    placeholder="$25,000" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Planned Monthly Savings</Label>
                <Input 
                  value={sharedInputs.plannedMonthlySavings}
                  onChange={(e) => updateSharedInput('plannedMonthlySavings', e.target.value)}
                  placeholder="$500" 
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
                  <Label className="text-sm">Annual Education Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.educationInflationRate}
                    onChange={(e) => updateSharedInput('educationInflationRate', e.target.value)}
                    placeholder="5.0%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Annual Rate of Return on Education Assets</Label>
                  <Input 
                    value={sharedInputs.educationROR}
                    onChange={(e) => updateSharedInput('educationROR', e.target.value)}
                    placeholder="7.0%" 
                    className="mt-1" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Number of Months Since Last Review</Label>
                <Input 
                  placeholder="12" 
                  className="mt-1" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
