
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PiggyBank, User, DollarSign, Calendar } from "lucide-react";

export const RetirementAccumulationInputs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Retirement Accumulation Analysis</h2>
      </div>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-blue-600" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Client 1 Name</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Client 2 Name</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Client 1 Employment Income</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Client 2 Employment Income</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Interest and Dividends</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Other Income</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Expenses (Categories)</Label>
              <Input className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets & Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
            Assets & Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Retirement Accounts</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Other Assets</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Cash</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Analysis Date</Label>
              <Input type="date" className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dependents & Planning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-purple-600" />
            Planning Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Dependents Name</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Dependents DOB</Label>
              <Input type="date" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Client 1 Retirement Age</Label>
              <Input defaultValue="67" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Client 2 Retirement Age</Label>
              <Input defaultValue="67" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Monthly SS</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Other Income (5)</Label>
              <Input className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PiggyBank className="h-5 w-5 text-blue-600" />
            Investment Assumptions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Expected Return Rate</Label>
              <Input defaultValue="7%" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Annual Contribution Increase</Label>
              <Input defaultValue="3%" className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
