import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Settings, Plus, Trash2, HelpCircle } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";

export const EducationFundingInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Helper functions for indexed children fields
  const getStudentName = (index: number): string => {
    return sharedInputs[`StudentName${index}` as keyof typeof sharedInputs] as string || '';
  };

  const getStudentBirth = (index: number): string => {
    return sharedInputs[`StudentBirth${index}` as keyof typeof sharedInputs] as string || '';
  };

  const updateStudentName = (index: number, value: string) => {
    updateSharedInput(`StudentName${index}` as keyof typeof sharedInputs, value);
  };

  const updateStudentBirth = (index: number, value: string) => {
    updateSharedInput(`StudentBirth${index}` as keyof typeof sharedInputs, value);
  };

  const getChildren = () => {
    const children = [];
    for (let i = 0; i < 5; i++) {
      const name = getStudentName(i);
      const birth = getStudentBirth(i);
      if (name || birth) {
        children.push({ index: i, StudentName: name, StudentBirth: birth });
      }
    }
    return children;
  };

  const addChild = () => {
    const children = getChildren();
    if (children.length < 5) {
      const nextIndex = children.length;
      updateStudentName(nextIndex, '');
      updateStudentBirth(nextIndex, '');
    }
  };

  const removeChild = (index: number) => {
    // Shift all subsequent children down
    for (let i = index; i < 4; i++) {
      const nextName = getStudentName(i + 1);
      const nextBirth = getStudentBirth(i + 1);
      updateStudentName(i, nextName);
      updateStudentBirth(i, nextBirth);
    }
    // Clear the last slot
    updateStudentName(4, '');
    updateStudentBirth(4, '');
  };
  
  const handleHelpClick = () => {
    setIsHelpOpen(true);
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
          {getChildren().map((child) => (
            <TabsTrigger key={child.index} value={`child-${child.index}`} className="flex items-center gap-2 px-3 py-2 text-sm">
              <GraduationCap className="h-4 w-4 flex-shrink-0" />
              <span>{child.StudentName || `Child ${child.index + 1}`}</span>
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
              {getChildren().map(({ index }) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50/50">
                  <div>
                    <Label className="text-sm">Child {index + 1} Name</Label>
                    <Input 
                      value={getStudentName(index)}
                      onChange={(e) => updateStudentName(index, e.target.value)}
                      placeholder={`Enter child ${index + 1} name`} 
                      className="mt-1" 
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm">Date of Birth</Label>
                      <Input 
                        type="date"
                        value={getStudentBirth(index)}
                        onChange={(e) => updateStudentBirth(index, e.target.value)}
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
              {getChildren().length === 0 && (
                <p className="text-gray-500 text-center py-4">No children added yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {getChildren().map(({ index: childIndex, StudentName }) => (
          <TabsContent key={childIndex} value={`child-${childIndex}`} className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Education Planning for {StudentName || `Child ${childIndex + 1}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-500 text-center py-4">
                  Education planning details for {StudentName || `Child ${childIndex + 1}`}
                </p>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Analysis Date</Label>
                  <Input 
                    type="date"
                    value={sharedInputs.AnalysisDate}
                    onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Mortality Age</Label>
                  <Input 
                    value={sharedInputs.MortalityAge}
                    onChange={(e) => updateSharedInput('MortalityAge', e.target.value)}
                    placeholder="90" 
                    className="mt-1" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.AnnualInflationRate}
                    onChange={(e) => updateSharedInput('AnnualInflationRate', e.target.value)}
                    placeholder="3.0%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Annual Education Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.AnnualEducationInflationRate}
                    onChange={(e) => updateSharedInput('AnnualEducationInflationRate', e.target.value)}
                    placeholder="5.0%" 
                    className="mt-1" 
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm">Rate of Return on Education Assets</Label>
                <Input 
                  value={sharedInputs.RateOfReturnOnEducationAssets}
                  onChange={(e) => updateSharedInput('RateOfReturnOnEducationAssets', e.target.value)}
                  placeholder="7.0%" 
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
      />
    </div>
  );
};