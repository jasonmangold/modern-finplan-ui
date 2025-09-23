import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Shield, TrendingUp, Settings, HelpCircle } from "lucide-react";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";
import { useFormContext } from "@/contexts/FormContext";

export const DisabilityInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();
  const [activeTab, setActiveTab] = useState("personal");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-foreground">Disability Analysis Inputs</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelpClick}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground p-1 h-auto"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start bg-muted h-auto p-1 gap-1">
          <TabsTrigger value="personal" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="income-needs" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Shield className="h-4 w-4" />
            Income Needs
          </TabsTrigger>
          <TabsTrigger value="current-coverage" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Shield className="h-4 w-4" />
            Current Coverage
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Client 1 First Name</Label>
                  <Input 
                    value={sharedInputs.Client1_FirstName}
                    onChange={(e) => updateSharedInput('Client1_FirstName', e.target.value)}
                    placeholder="First name" 
                    className="mt-1.5 h-9" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Client 1 Last Name</Label>
                  <Input 
                    value={sharedInputs.Client1_LastName}
                    onChange={(e) => updateSharedInput('Client1_LastName', e.target.value)}
                    placeholder="Last name" 
                    className="mt-1.5 h-9" 
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Client 1 Date of Birth</Label>
                <Input 
                  type="date"
                  value={sharedInputs.Client1_BirthDate}
                  onChange={(e) => updateSharedInput('Client1_BirthDate', e.target.value)}
                  className="mt-1.5 h-9" 
                />
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
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 2 First Name</Label>
                      <Input 
                        value={sharedInputs.Client2_FirstName}
                        onChange={(e) => updateSharedInput('Client2_FirstName', e.target.value)}
                        placeholder="First name" 
                        className="mt-1.5 h-9" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Client 2 Last Name</Label>
                      <Input 
                        value={sharedInputs.Client2_LastName}
                        onChange={(e) => updateSharedInput('Client2_LastName', e.target.value)}
                        placeholder="Last name" 
                        className="mt-1.5 h-9" 
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">Client 2 Date of Birth</Label>
                    <Input 
                      type="date"
                      value={sharedInputs.Client2_BirthDate}
                      onChange={(e) => updateSharedInput('Client2_BirthDate', e.target.value)}
                      className="mt-1.5 h-9" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-needs" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Income Needs</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Current annual salary</Label>
                  <div className="space-y-2 mt-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input placeholder="Client 1" className="h-9 pl-8" />
                    </div>
                    {sharedInputs.hasClient2 && (
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input placeholder="Client 2" className="h-9 pl-8" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Percent to replace</Label>
                  <div className="space-y-2 mt-2">
                    <div className="relative">
                      <Input placeholder="%" className="h-9 pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                    {sharedInputs.hasClient2 && (
                      <div className="relative">
                        <Input placeholder="%" className="h-9 pr-8" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Timeline end age</Label>
                  <Input placeholder="Enter age" className="h-9 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="current-coverage" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Client 1 Current Disability Insurance</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Monthly benefit</Label>
                  <Input placeholder="Enter amount" className="h-9 mt-2" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Elimination period</Label>
                  <Select>
                    <SelectTrigger className="mt-2 h-9">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">365 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Benefit period</Label>
                  <Select>
                    <SelectTrigger className="mt-2 h-9">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="2-years">2 years</SelectItem>
                      <SelectItem value="5-years">5 years</SelectItem>
                      <SelectItem value="10-years">10 years</SelectItem>
                      <SelectItem value="to-age-65">To age 65</SelectItem>
                      <SelectItem value="to-age-67">To age 67</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">COLA rate</Label>
                  <div className="relative mt-2">
                    <Input placeholder="%" className="h-9 pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Policy #1</Label>
                  <div className="relative mt-2">
                    <Input placeholder="%" className="h-9 pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Policy #2</Label>
                  <div className="relative mt-2">
                    <Input placeholder="%" className="h-9 pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {sharedInputs.hasClient2 && (
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Client 2 Current Disability Insurance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Monthly benefit</Label>
                    <Input placeholder="Enter amount" className="h-9 mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">Elimination period</Label>
                    <Select>
                      <SelectTrigger className="mt-2 h-9">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">365 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">Benefit period</Label>
                    <Select>
                      <SelectTrigger className="mt-2 h-9">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        <SelectItem value="2-years">2 years</SelectItem>
                        <SelectItem value="5-years">5 years</SelectItem>
                        <SelectItem value="10-years">10 years</SelectItem>
                        <SelectItem value="to-age-65">To age 65</SelectItem>
                        <SelectItem value="to-age-67">To age 67</SelectItem>
                        <SelectItem value="lifetime">Lifetime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">COLA rate</Label>
                    <div className="relative mt-2">
                      <Input placeholder="%" className="h-9 pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Policy #1</Label>
                    <div className="relative mt-2">
                      <Input placeholder="%" className="h-9 pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">Policy #2</Label>
                    <div className="relative mt-2">
                      <Input placeholder="%" className="h-9 pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Annual inflation rate</Label>
                  <div className="relative mt-2">
                    <Input defaultValue="3" className="h-9 pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Analysis date</Label>
                  <Input type="date" className="h-9 mt-2" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Mortality age</Label>
                  <Input placeholder="90" className="h-9 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <HelpDialog
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        sections={getHelpText("disability")}
        title="Disability Analysis Help"
      />
    </div>
  );
};