
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const ClientInputTabs = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Inputs</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
            <TabsTrigger value="income-needs" className="text-xs">Income Needs</TabsTrigger>
            <TabsTrigger value="income-sources" className="text-xs">Income Sources</TabsTrigger>
            <TabsTrigger value="capital" className="text-xs">Capital</TabsTrigger>
            <TabsTrigger value="assumptions" className="text-xs">Assumptions</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium">Marital Status</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="married" defaultChecked />
                <Label htmlFor="married" className="text-sm">Married</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-blue-600">Client 1</Label>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-600">Name:</Label>
                    <Input defaultValue="Paul Johnson" className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Date of Birth:</Label>
                    <Input type="date" defaultValue="1985-01-01" className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Current Age:</Label>
                    <Input defaultValue="40" className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Retirement Age:</Label>
                    <Input defaultValue="67" className="text-sm mt-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-blue-600">Client 2</Label>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-600">Name:</Label>
                    <Input defaultValue="Sally Johnson" className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Date of Birth:</Label>
                    <Input type="date" defaultValue="1987-01-01" className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Current Age:</Label>
                    <Input defaultValue="38" className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Retirement Age:</Label>
                    <Input defaultValue="67" className="text-sm mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="income-needs" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600">Current Annual Income Need:</Label>
                <Input defaultValue="$120,000" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Retirement Income Need (% of current):</Label>
                <Input defaultValue="80%" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Inflation Rate:</Label>
                <Input defaultValue="3%" className="text-sm mt-1" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="income-sources" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600">Social Security (Annual):</Label>
                <Input defaultValue="$35,000" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Pension (Annual):</Label>
                <Input defaultValue="$0" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Other Income (Annual):</Label>
                <Input defaultValue="$15,000" className="text-sm mt-1" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="capital" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600">Current Retirement Savings:</Label>
                <Input defaultValue="$500,000" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Annual Contribution:</Label>
                <Input defaultValue="$25,000" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Other Assets:</Label>
                <Input defaultValue="$100,000" className="text-sm mt-1" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600">Investment Return (Pre-retirement):</Label>
                <Input defaultValue="7%" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Investment Return (Post-retirement):</Label>
                <Input defaultValue="5%" className="text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Life Expectancy:</Label>
                <Input defaultValue="90" className="text-sm mt-1" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
