
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, User, DollarSign, Calendar } from "lucide-react";

export const EducationFundingInputs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Education Funding Analysis</h2>
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
          </div>
        </CardContent>
      </Card>

      {/* Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
            Assets & Savings
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

      {/* Dependents & Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            Education Details
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
              <Label className="text-sm">College Info</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Education Inflation Rate</Label>
              <Input defaultValue="5%" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">ROR on Education Assets</Label>
              <Input defaultValue="6%" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Number of Months Since Review</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Child's Current Age</Label>
              <Input defaultValue="5" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">College Start Age</Label>
              <Input defaultValue="18" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Years of College</Label>
              <Input defaultValue="4" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Current Annual Cost</Label>
              <Input defaultValue="$30,000" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Investment Return Rate</Label>
              <Input defaultValue="6%" className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
