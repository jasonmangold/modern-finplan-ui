import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Settings, Plus, Trash2, School, HelpCircle } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";

export const EducationFundingInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };

  const addChild = () => {
    const newChildren = [...sharedInputs.children, { 
      name: '', 
      dateOfBirth: '',
      schools: [],
      percentageToFund: '100',
      amountCurrentlySaved: '',
      plannedMonthlySavings: ''
    }];
    updateSharedInput('children', newChildren);
  };
  
  const removeChild = (index: number) => {
    const newChildren = sharedInputs.children.filter((_, i) => i !== index);
    updateSharedInput('children', newChildren);
  };
  
  const updateChild = (index: number, field: string, value: any) => {
    const newChildren = [...sharedInputs.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateSharedInput('children', newChildren);
  };

  const addSchool = (childIndex: number) => {
    const newChildren = [...sharedInputs.children];
    newChildren[childIndex].schools.push({
      schoolName: '',
      annualTuitionCost: '',
      ageWhenSchoolBegins: '18',
      numberOfYearsInSchool: '4'
    });
    updateSharedInput('children', newChildren);
  };

  const removeSchool = (childIndex: number, schoolIndex: number) => {
    const newChildren = [...sharedInputs.children];
    newChildren[childIndex].schools = newChildren[childIndex].schools.filter((_, i) => i !== schoolIndex);
    updateSharedInput('children', newChildren);
  };

  const updateSchool = (childIndex: number, schoolIndex: number, field: string, value: string) => {
    const newChildren = [...sharedInputs.children];
    newChildren[childIndex].schools[schoolIndex] = {
      ...newChildren[childIndex].schools[schoolIndex],
      [field]: value
    };
    updateSharedInput('children', newChildren);
  };

  const formatPercentageInput = (value: string) => {
    // Remove any non-numeric characters except decimal points
    const numericValue = value.replace(/[^\d.]/g, '');
    // Add % symbol if not already present
    return numericValue ? `${numericValue}%` : '';
  };

  const handlePercentageChange = (childIndex: number, value: string) => {
    const formattedValue = formatPercentageInput(value);
    updateChild(childIndex, 'percentageToFund', formattedValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-foreground">Analysis Inputs</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelpClick}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground p-1 h-auto"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start bg-muted h-auto p-1 gap-1">
          <TabsTrigger value="personal" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>Personal</span>
          </TabsTrigger>
          {sharedInputs.children.map((child, index) => (
            <TabsTrigger key={index} value={`child-${index}`} className="flex items-center gap-2 px-3 py-2 text-sm">
              <GraduationCap className="h-4 w-4 flex-shrink-0" />
              <span>{child.name || `Child ${index + 1}`}</span>
            </TabsTrigger>
          ))}
          <TabsTrigger value="assumptions" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Settings className="h-4 w-4 flex-shrink-0" />
            <span>Assumptions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium flex items-center justify-between">
                Dependent Information
                <Button onClick={addChild} size="sm" variant="outline" className="h-8">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Child
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
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

        {sharedInputs.children.map((child, childIndex) => (
          <TabsContent key={childIndex} value={`child-${childIndex}`} className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Education Planning for {child.name || `Child ${childIndex + 1}`}
                  <Button onClick={() => addSchool(childIndex)} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add School
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Schools Section */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium flex items-center gap-2">
                    <School className="h-4 w-4" />
                    Educational Institutions
                  </h3>
                  
                  {child.schools?.map((school, schoolIndex) => (
                    <div key={schoolIndex} className="p-4 border rounded-lg bg-blue-50/30">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">School {schoolIndex + 1}</h4>
                        <Button 
                          onClick={() => removeSchool(childIndex, schoolIndex)} 
                          size="sm" 
                          variant="outline"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm">School Name</Label>
                          <Input 
                            value={school.schoolName}
                            onChange={(e) => updateSchool(childIndex, schoolIndex, 'schoolName', e.target.value)}
                            placeholder="Enter school name" 
                            className="mt-1" 
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Annual Tuition Cost</Label>
                          <Input 
                            value={school.annualTuitionCost}
                            onChange={(e) => updateSchool(childIndex, schoolIndex, 'annualTuitionCost', e.target.value)}
                            placeholder="$50,000" 
                            className="mt-1" 
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Age When School Begins</Label>
                          <Input 
                            value={school.ageWhenSchoolBegins}
                            onChange={(e) => updateSchool(childIndex, schoolIndex, 'ageWhenSchoolBegins', e.target.value)}
                            placeholder="18" 
                            className="mt-1" 
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Number of Years in School</Label>
                          <Input 
                            value={school.numberOfYearsInSchool}
                            onChange={(e) => updateSchool(childIndex, schoolIndex, 'numberOfYearsInSchool', e.target.value)}
                            placeholder="4" 
                            className="mt-1" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {(!child.schools || child.schools.length === 0) && (
                    <p className="text-gray-500 text-center py-4">No schools added yet</p>
                  )}
                </div>

                {/* Funding Details Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-md font-medium">Funding Details</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Percentage to Fund</Label>
                      <Input 
                        value={child.percentageToFund || ''}
                        onChange={(e) => handlePercentageChange(childIndex, e.target.value)}
                        placeholder="100%"
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Amount Currently Saved</Label>
                      <Input 
                        value={child.amountCurrentlySaved || ''}
                        onChange={(e) => updateChild(childIndex, 'amountCurrentlySaved', e.target.value)}
                        placeholder="$25,000" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm">Planned Monthly Savings</Label>
                    <Input 
                      value={child.plannedMonthlySavings || ''}
                      onChange={(e) => updateChild(childIndex, 'plannedMonthlySavings', e.target.value)}
                      placeholder="$500" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

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
      
      <HelpDialog
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        sections={getHelpText("education-funding")}
        title="Education Funding Analysis Help"
      />
    </div>
  );
};