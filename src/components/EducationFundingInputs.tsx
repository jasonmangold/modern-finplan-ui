
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, GraduationCap, Settings } from "lucide-react";

export const EducationFundingInputs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Education Funding Inputs</h2>
        <p className="text-gray-600">Configure your education planning parameters</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personal
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
              <CardTitle className="text-lg">Children Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50/50">
                  <div>
                    <Label className="text-sm">Child {index} Name</Label>
                    <Input placeholder={`Enter child ${index} name`} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm">Date of Birth</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                </div>
              ))}
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
                  <Label className="text-sm">School</Label>
                  <Input placeholder="Enter school name" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Annual Tuition Cost</Label>
                  <Input placeholder="$50,000" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Age When School Begins</Label>
                  <Input defaultValue="18" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Number of Years in School</Label>
                  <Input defaultValue="4" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Percentage to Fund</Label>
                  <Select defaultValue="100">
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
                  <Input placeholder="$25,000" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Planned Monthly Savings</Label>
                <Input placeholder="$500" className="mt-1" />
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
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Annual Education Inflation Rate</Label>
                  <Input defaultValue="5.0%" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Annual Rate of Return on Education Assets</Label>
                  <Input defaultValue="7.0%" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="text-sm">Number of Months Since Last Review</Label>
                <Input defaultValue="12" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
