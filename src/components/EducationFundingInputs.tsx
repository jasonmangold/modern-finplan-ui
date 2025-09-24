import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, GraduationCap, Settings, Plus, Trash2, School, HelpCircle } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";

export const EducationFundingInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Mock data for states and schools
  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  const schoolsByState: Record<string, Array<{ value: string; label: string; cost: string }>> = {
    'CA': [
      { value: 'cal-state-fullerton', label: 'California State University: Fullerton', cost: '32686' },
      { value: 'ucla', label: 'University of California, Los Angeles', cost: '45000' },
      { value: 'usc', label: 'University of Southern California', cost: '65000' },
      { value: 'stanford', label: 'Stanford University', cost: '75000' }
    ],
    'NY': [
      { value: 'nyu', label: 'New York University', cost: '60000' },
      { value: 'columbia', label: 'Columbia University', cost: '70000' },
      { value: 'suny-buffalo', label: 'SUNY Buffalo', cost: '25000' }
    ],
    'TX': [
      { value: 'ut-austin', label: 'University of Texas at Austin', cost: '40000' },
      { value: 'rice', label: 'Rice University', cost: '65000' },
      { value: 'texas-am', label: 'Texas A&M University', cost: '35000' }
    ]
  };

  const getSchoolsForState = (stateCode: string) => {
    return schoolsByState[stateCode] || [];
  };
  
  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };

  const addChild = () => {
    const newChildren = [...sharedInputs.children, { 
      StudentName: '', 
      StudentBirth: '',
      schools: [],
      EduPercentageToFund: '100',
      EduAmountCurrentlySaved: '',
      EduPlannedMonthlySavings: ''
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
      CollegeName: '',
      CollegeStateText: '',
      AnnualCosts: '',
      AgeWhenSchoolBegins: '18',
      YearsInSchool: '4',
      UseCollegeBoardInfo: false,
      CollegeState: '',
      IncludeOutOfStateFees: false,
      IncludeRoomBoardBooksAndOther: false
    });
    updateSharedInput('children', newChildren);
  };

  const removeSchool = (childIndex: number, schoolIndex: number) => {
    const newChildren = [...sharedInputs.children];
    newChildren[childIndex].schools = newChildren[childIndex].schools.filter((_, i) => i !== schoolIndex);
    updateSharedInput('children', newChildren);
  };

  const updateSchool = (childIndex: number, schoolIndex: number, field: string, value: string | boolean) => {
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
    updateChild(childIndex, 'EduPercentageToFund', formattedValue);
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
              <span>{child.StudentName || `Child ${index + 1}`}</span>
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
                      value={child.StudentName}
                      onChange={(e) => updateChild(index, 'StudentName', e.target.value)}
                      placeholder={`Enter child ${index + 1} name`} 
                      className="mt-1" 
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-sm">Date of Birth</Label>
                      <Input 
                        type="date"
                        value={child.StudentBirth}
                        onChange={(e) => updateChild(index, 'StudentBirth', e.target.value)}
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
                  Education Planning for {child.StudentName || `Child ${childIndex + 1}`}
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
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Age When School Begins</Label>
                            <Input 
                              value={school.AgeWhenSchoolBegins}
                              onChange={(e) => updateSchool(childIndex, schoolIndex, 'AgeWhenSchoolBegins', e.target.value)}
                              placeholder="18" 
                              className="mt-1" 
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Number of Years in School</Label>
                            <Input 
                              value={school.YearsInSchool}
                              onChange={(e) => updateSchool(childIndex, schoolIndex, 'YearsInSchool', e.target.value)}
                              placeholder="4" 
                              className="mt-1" 
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`college-board-${childIndex}-${schoolIndex}`}
                            checked={school.UseCollegeBoardInfo || false}
                            onCheckedChange={(checked) => updateSchool(childIndex, schoolIndex, 'UseCollegeBoardInfo', checked as boolean)}
                          />
                          <Label htmlFor={`college-board-${childIndex}-${schoolIndex}`} className="text-sm">
                            Use college board information
                          </Label>
                        </div>

                        {school.UseCollegeBoardInfo && (
                          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm">Location</Label>
                                <Select 
                                  value={school.CollegeState || ''} 
                                  onValueChange={(value) => {
                                    updateSchool(childIndex, schoolIndex, 'CollegeState', value);
                                    updateSchool(childIndex, schoolIndex, 'CollegeName', '');
                                  }}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {states.map((state) => (
                                      <SelectItem key={state.value} value={state.value}>
                                        {state.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-sm">School</Label>
                                <Select 
                                  value={school.CollegeName || ''} 
                                  onValueChange={(value) => {
                                    const selectedSchool = getSchoolsForState(school.CollegeState || '').find(s => s.value === value);
                                    updateSchool(childIndex, schoolIndex, 'CollegeName', selectedSchool?.label || '');
                                    updateSchool(childIndex, schoolIndex, 'AnnualCosts', selectedSchool?.cost || '');
                                  }}
                                  disabled={!school.CollegeState}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select school" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getSchoolsForState(school.CollegeState || '').map((schoolOption) => (
                                      <SelectItem key={schoolOption.value} value={schoolOption.value}>
                                        {schoolOption.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`out-of-state-${childIndex}-${schoolIndex}`}
                                  checked={school.IncludeOutOfStateFees || false}
                                  onCheckedChange={(checked) => updateSchool(childIndex, schoolIndex, 'IncludeOutOfStateFees', checked as boolean)}
                                />
                                <Label htmlFor={`out-of-state-${childIndex}-${schoolIndex}`} className="text-sm">
                                  Include additional out-of-state fees
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`room-board-${childIndex}-${schoolIndex}`}
                                  checked={school.IncludeRoomBoardBooksAndOther || false}
                                  onCheckedChange={(checked) => updateSchool(childIndex, schoolIndex, 'IncludeRoomBoardBooksAndOther', checked as boolean)}
                                />
                                <Label htmlFor={`room-board-${childIndex}-${schoolIndex}`} className="text-sm">
                                  Include room, board, and other fees
                                </Label>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className={`grid grid-cols-3 gap-4 ${school.UseCollegeBoardInfo ? 'opacity-50 pointer-events-none' : ''}`}>
                          <div>
                            <Label className="text-sm">School Name</Label>
                            <Input 
                              value={school.CollegeName}
                              onChange={(e) => updateSchool(childIndex, schoolIndex, 'CollegeName', e.target.value)}
                              placeholder="Enter school name" 
                              className="mt-1" 
                              disabled={school.UseCollegeBoardInfo}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">State</Label>
                            <Input 
                              value={school.CollegeStateText || ''}
                              onChange={(e) => updateSchool(childIndex, schoolIndex, 'CollegeStateText', e.target.value)}
                              placeholder="CA" 
                              className="mt-1" 
                              disabled={school.UseCollegeBoardInfo}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Annual Costs</Label>
                            <Input 
                              value={school.AnnualCosts}
                              onChange={(e) => updateSchool(childIndex, schoolIndex, 'AnnualCosts', e.target.value)}
                              placeholder="$50,000" 
                              className="mt-1" 
                              disabled={school.UseCollegeBoardInfo}
                            />
                          </div>
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
                        value={child.EduPercentageToFund || ''}
                        onChange={(e) => handlePercentageChange(childIndex, e.target.value)}
                        placeholder="100%"
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Amount Currently Saved</Label>
                      <Input 
                        value={child.EduAmountCurrentlySaved || ''}
                        onChange={(e) => updateChild(childIndex, 'EduAmountCurrentlySaved', e.target.value)}
                        placeholder="$25,000" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm">Planned Monthly Savings</Label>
                    <Input 
                      value={child.EduPlannedMonthlySavings || ''}
                      onChange={(e) => updateChild(childIndex, 'EduPlannedMonthlySavings', e.target.value)}
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
                  value={sharedInputs.AnalysisDate}
                  onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
                  className="mt-1" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual Education Inflation Rate</Label>
                  <Input 
                    value={sharedInputs.AnnualEducationInflationRate}
                    onChange={(e) => updateSharedInput('AnnualEducationInflationRate', e.target.value)}
                    placeholder="5.0%" 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-sm">Annual Rate of Return on Education Assets</Label>
                  <Input 
                    value={sharedInputs.RateOfReturnOnEducationAssets}
                    onChange={(e) => updateSharedInput('RateOfReturnOnEducationAssets', e.target.value)}
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