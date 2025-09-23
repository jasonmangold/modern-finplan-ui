import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PersonalFinanceInputs } from "./PersonalFinanceInputs";

interface FinancialInventoryProps {
  onBack: () => void;
}

export const FinancialInventory = ({ onBack }: FinancialInventoryProps) => {
  return (
    <div className="h-full flex">
      {/* Left Side - Input Panel */}
      <div className="w-1/2 p-6 border-r border-border bg-background">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Goals
          </Button>
          <h2 className="text-2xl font-semibold text-foreground">Financial Inventory</h2>
          <p className="text-muted-foreground mt-1">Comprehensive financial data collection</p>
        </div>

        <div className="h-[calc(100%-120px)] overflow-y-auto">
          <PersonalFinanceInputs />
        </div>
      </div>

      {/* Right Side - Output Panel */}
      <div className="w-1/2 p-6 bg-muted/30">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground">Financial Summary</h3>
          <p className="text-muted-foreground">Comprehensive financial overview</p>
        </div>

        <div className="grid grid-cols-2 gap-4 h-[calc(100%-80px)] overflow-y-auto">
          {/* Income Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Income</CardTitle>
              <div className="text-2xl font-bold">$157,000</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Paul's Employment Income</span>
                  <span>$65,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Sally's Employment Income</span>
                  <span>$50,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest and Dividends</span>
                  <span>$25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$17,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Savings</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$14,400</span>
                <span className="text-lg">9%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Education</span>
                  <span>$3,600</span>
                  <span>2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Retirement</span>
                  <span>$6,000</span>
                  <span>4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$4,800</span>
                  <span>3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Unaccounted</span>
                  <span>$3,208</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Expenses</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$139,392</span>
                <span className="text-lg">89%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Household</span>
                  <span>$55,908</span>
                  <span>36%</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$53,484</span>
                  <span>34%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$30,000</span>
                  <span>19%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assets Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Assets</CardTitle>
              <div className="text-2xl font-bold">$1,003,000</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Paul's Retirement</span>
                  <span>$136,000</span>
                  <span>14%</span>
                </div>
                <div className="flex justify-between">
                  <span>Sally's Retirement</span>
                  <span>$76,500</span>
                  <span>8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Residence</span>
                  <span>$700,000</span>
                  <span>70%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cash</span>
                  <span>$500</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Assets</span>
                  <span>$90,000</span>
                  <span>9%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liabilities Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Liabilities</CardTitle>
              <div className="text-2xl font-bold">$577,000</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Mortgage</span>
                  <span>$550,000</span>
                  <span>95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Debt</span>
                  <span>$25,000</span>
                  <span>4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span>$2,000</span>
                  <span>0%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Card */}
          <Card className="bg-slate-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium mb-1">Paul</div>
                  <div className="space-y-1 ml-2">
                    <div className="flex justify-between">
                      <span>Life Insurance</span>
                      <span>$65,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disability Insurance</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Long-Term Care Insurance</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Sally</div>
                  <div className="space-y-1 ml-2">
                    <div className="flex justify-between">
                      <span>Life Insurance</span>
                      <span>$50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disability Insurance</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Long-Term Care Insurance</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Net Worth Card */}
          <Card className="bg-slate-600 text-white col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Net Worth</CardTitle>
              <div className="text-3xl font-bold">$426,000</div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div className="flex justify-between">
                  <span>Assets</span>
                  <span>$1,003,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Liabilities</span>
                  <span>$577,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};