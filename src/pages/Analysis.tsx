
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const retirementData = [
  { age: 67, socialSecurity: 35000, income: 15000, withdrawal: 45000, shortfall: 25000, incomeNeed: 120000 },
  { age: 68, socialSecurity: 35000, income: 16000, withdrawal: 46000, shortfall: 26000, incomeNeed: 123000 },
  { age: 69, socialSecurity: 35000, income: 17000, withdrawal: 47000, shortfall: 27000, incomeNeed: 126000 },
  { age: 70, socialSecurity: 35000, income: 18000, withdrawal: 48000, shortfall: 28000, incomeNeed: 129000 },
  { age: 71, socialSecurity: 35000, income: 19000, withdrawal: 49000, shortfall: 29000, incomeNeed: 132000 },
  { age: 72, socialSecurity: 35000, income: 20000, withdrawal: 50000, shortfall: 30000, incomeNeed: 135000 },
];

const Analysis = () => {
  const [selectedView, setSelectedView] = useState("Retirement Analysis");

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <Select defaultValue="retirement-accumulation">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retirement-accumulation">Retirement Accumulation</SelectItem>
                  <SelectItem value="retirement-distribution">Retirement Distribution</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Client Inputs</h3>
                  <Button className="w-full bg-blue-600 text-white">Personal</Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Marital Status</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Checkbox id="married" defaultChecked />
                      <Label htmlFor="married" className="text-sm">Married</Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Client 1</Label>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs">Name:</Label>
                          <Input defaultValue="Paul Johnson" className="text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Date of Birth:</Label>
                          <Input type="date" defaultValue="1985-01-01" className="text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Current Age:</Label>
                          <Input defaultValue="40" className="text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Retirement Age:</Label>
                          <Input defaultValue="67" className="text-sm" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Client 2</Label>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs">Name:</Label>
                          <Input defaultValue="Sally Johnson" className="text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Date of Birth:</Label>
                          <Input type="date" defaultValue="1987-01-01" className="text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Current Age:</Label>
                          <Input defaultValue="38" className="text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Retirement Age:</Label>
                          <Input defaultValue="67" className="text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Analysis Outputs</CardTitle>
                <Select defaultValue="retirement-analysis">
                  <SelectTrigger className="w-48 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retirement-analysis">Retirement Analysis</SelectItem>
                    <SelectItem value="investment-analysis">Investment Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="add-presentation" />
                <Label htmlFor="add-presentation" className="text-sm">Add to Presentation</Label>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">Retirement Income Graph</h3>
                <div className="mb-4">
                  <h4 className="text-center font-medium mb-2">Retirement Income Sources by Age</h4>
                </div>
                
                <div className="h-96 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retirementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Legend />
                      <Bar dataKey="socialSecurity" stackId="a" fill="#22c55e" name="Social Security" />
                      <Bar dataKey="income" stackId="a" fill="#3b82f6" name="Income" />
                      <Bar dataKey="withdrawal" stackId="a" fill="#f59e0b" name="Withdrawal" />
                      <Bar dataKey="shortfall" stackId="a" fill="#ef4444" name="Shortfall" />
                      <Bar dataKey="incomeNeed" fill="none" stroke="#000" strokeWidth={2} name="Income Need" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-center">
                  <Button className="bg-blue-600 text-white mr-2">Start Tour</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
