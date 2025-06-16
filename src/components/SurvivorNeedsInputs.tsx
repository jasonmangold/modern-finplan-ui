
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, User, DollarSign, Heart } from "lucide-react";

export const SurvivorNeedsInputs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Survivor Needs Analysis</h2>
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

      {/* Insurance & Protection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-red-600" />
            Insurance & Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Life Insurance</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Analysis Date</Label>
              <Input type="date" className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dependents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-pink-600" />
            Dependents
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
          </div>
        </CardContent>
      </Card>

      {/* Survivor Needs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
            Survivor Income & Needs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Survivor Income Needs</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Other Income (5)</Label>
              <Input className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Years of Income Replacement</Label>
              <Input defaultValue="20" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Emergency Fund Months</Label>
              <Input defaultValue="6" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Final Expenses</Label>
              <Input defaultValue="$25,000" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Education Fund Needed</Label>
              <Input defaultValue="$200,000" className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
