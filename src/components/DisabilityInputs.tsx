import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Shield, TrendingUp, HelpCircle } from "lucide-react";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";

export const DisabilityInputs = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
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

      {/* Personal Information */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <User className="h-4 w-4 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Client(s) name</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-6">1)</span>
                    <Input placeholder="Enter client 1 name" className="h-9" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-6">2)</span>
                    <Input placeholder="Enter client 2 name" className="h-9" />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Address</Label>
                <Input placeholder="Enter address" className="mt-1.5 h-9" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Phone</Label>
                  <Input placeholder="Enter phone" className="mt-1.5 h-9" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Email</Label>
                  <Input placeholder="Enter email" className="mt-1.5 h-9" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Date of birth</Label>
                <div className="space-y-2 mt-2">
                  <Input type="date" className="h-9" />
                  <Input type="date" className="h-9" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disability Data */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Shield className="h-4 w-4 text-primary" />
            Disability Data
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-6">
          {/* Income Needs */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Income Needs</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-foreground">Current annual salary</Label>
                <div className="space-y-2 mt-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input placeholder="Client 1" className="h-9 pl-8" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input placeholder="Client 2" className="h-9 pl-8" />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Percent to replace</Label>
                <div className="space-y-2 mt-2">
                  <div className="relative">
                    <Input placeholder="%" className="h-9 pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                  <div className="relative">
                    <Input placeholder="%" className="h-9 pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Timeline end age</Label>
                <Input placeholder="Enter age" className="h-9 mt-2" />
              </div>
            </div>
          </div>

          {/* Client 1 Current Disability Insurance */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Client 1 current disability insurance</h4>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-foreground">Monthly benefit</Label>
                <Input placeholder="Enter amount" className="h-9 mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Elimination period</Label>
                <Input placeholder="Enter period" className="h-9 mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Benefit period</Label>
                <Input placeholder="Enter period" className="h-9 mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">COLA rate</Label>
                <div className="relative mt-2">
                  <Input placeholder="%" className="h-9 pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
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
          </div>

          {/* Client 2 Current Disability Insurance */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Client 2 current disability insurance</h4>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-foreground">Monthly benefit</Label>
                <Input placeholder="Enter amount" className="h-9 mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Elimination period</Label>
                <Input placeholder="Enter period" className="h-9 mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Benefit period</Label>
                <Input placeholder="Enter period" className="h-9 mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">COLA rate</Label>
                <div className="relative mt-2">
                  <Input placeholder="%" className="h-9 pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
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
          </div>
        </CardContent>
      </Card>

      {/* Assumptions */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <TrendingUp className="h-4 w-4 text-primary" />
            Assumptions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="w-fit">
            <Label className="text-sm font-medium text-foreground">Annual inflation rate</Label>
            <div className="relative mt-2">
              <Input defaultValue="3" className="h-9 w-24 pr-8" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <HelpDialog
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        sections={getHelpText("disability")}
        title="Disability Analysis Help"
      />
    </div>
  );
};