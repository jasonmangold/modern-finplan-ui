import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CalculatorInputs {
  currentSum: number;
  annualRate: number;
  frequency: string;
  withdrawalAmount: number;
  inflationRate: number;
}

interface CalculatorResult {
  years: number;
  months: number;
  totalMonths: number;
  monthlyData: Array<{
    month: number;
    balance: number;
  }>;
}

export const LengthOfTimeCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentSum: 500000,
    annualRate: 3.0,
    frequency: "Monthly",
    withdrawalAmount: 4500,
    inflationRate: 3.0
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateDuration = () => {
    const { currentSum, annualRate, frequency, withdrawalAmount, inflationRate } = inputs;
    
    if (currentSum <= 0 || withdrawalAmount <= 0 || annualRate < 0) {
      setResult(null);
      return;
    }

    let balance = currentSum;
    let monthlyWithdrawal = withdrawalAmount;
    const monthlyInterestRate = annualRate / 100 / 12;
    const monthlyInflationRate = inflationRate / 100 / 12;
    const monthlyData: Array<{ month: number; balance: number }> = [];
    let month = 0;

    while (balance > 0 && month < 1200) { // Max 100 years
      // Add interest
      balance = balance * (1 + monthlyInterestRate);
      
      // Subtract withdrawal
      if (balance >= monthlyWithdrawal) {
        balance -= monthlyWithdrawal;
      } else {
        balance = 0;
      }
      
      month++;
      monthlyData.push({ month, balance: Math.max(0, balance) });
      
      // Inflate withdrawal for next month
      monthlyWithdrawal = monthlyWithdrawal * (1 + monthlyInflationRate);
      
      if (balance <= 0) break;
    }

    const years = Math.floor(month / 12);
    const remainingMonths = month % 12;

    setResult({
      years,
      months: remainingMonths,
      totalMonths: month,
      monthlyData: monthlyData.slice(0, Math.min(120, monthlyData.length)) // Show max 10 years on chart
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Input Panel */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Calculator Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentSum">Current sum:</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-sm text-muted-foreground">$</span>
                <Input
                  id="currentSum"
                  type="number"
                  value={inputs.currentSum}
                  onChange={(e) => setInputs(prev => ({ ...prev, currentSum: Number(e.target.value) }))}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRate">Annual rate of return:</Label>
              <div className="relative">
                <Input
                  id="annualRate"
                  type="number"
                  step="0.1"
                  value={inputs.annualRate}
                  onChange={(e) => setInputs(prev => ({ ...prev, annualRate: Number(e.target.value) }))}
                  className="pr-8"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency of withdrawals:</Label>
              <Select value={inputs.frequency} onValueChange={(value) => setInputs(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawalAmount">Withdrawal amount:</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-sm text-muted-foreground">$</span>
                <Input
                  id="withdrawalAmount"
                  type="number"
                  value={inputs.withdrawalAmount}
                  onChange={(e) => setInputs(prev => ({ ...prev, withdrawalAmount: Number(e.target.value) }))}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inflationRate">Inflate withdrawal by:</Label>
              <div className="relative">
                <Input
                  id="inflationRate"
                  type="number"
                  step="0.1"
                  value={inputs.inflationRate}
                  onChange={(e) => setInputs(prev => ({ ...prev, inflationRate: Number(e.target.value) }))}
                  className="pr-8"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
              </div>
            </div>

            <Button onClick={calculateDuration} className="w-full">
              Calculate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Panel */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Results & Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {result ? (
            <div className="space-y-6">
              {/* Results Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Item Description</th>
                      <th className="px-4 py-3 text-right font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">Current sum</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(inputs.currentSum)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Assumed annual interest rate<sup>1</sup></td>
                      <td className="px-4 py-3 text-right">{formatPercent(inputs.annualRate)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Frequency of withdrawals</td>
                      <td className="px-4 py-3 text-right">{inputs.frequency}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Beginning monthly withdrawal amount:</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(inputs.withdrawalAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Inflate withdrawal by:</td>
                      <td className="px-4 py-3 text-right">{formatPercent(inputs.inflationRate)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Main Result */}
              <div className="text-center p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                <h3 className="text-lg font-semibold mb-2">
                  Sum will last {result.years} years and {result.months} months
                </h3>
              </div>

              {/* Example Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Example</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have {formatCurrency(inputs.currentSum)} in your account earning an annual return of {formatPercent(inputs.annualRate)}, compounded 
                  monthly, and you withdraw {formatCurrency(inputs.withdrawalAmount)} monthly, with the withdrawal inflating each year by {formatPercent(inputs.inflationRate)}, 
                  the account will be exhausted in {result.years} years and {result.months} months.
                </p>
              </div>

              {/* Chart */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Length of Time a Sum Will Last</h4>
                <div className="h-64 bg-gradient-to-b from-blue-50 to-white border rounded-lg p-4">
                  <div className="h-full relative">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                      <span>{formatCurrency(inputs.currentSum)}</span>
                      <span>{formatCurrency(inputs.currentSum * 0.8)}</span>
                      <span>{formatCurrency(inputs.currentSum * 0.6)}</span>
                      <span>{formatCurrency(inputs.currentSum * 0.4)}</span>
                      <span>{formatCurrency(inputs.currentSum * 0.2)}</span>
                      <span>$0</span>
                    </div>
                    
                    {/* Chart area */}
                    <div className="ml-16 mr-4 h-full relative">
                      <svg className="w-full h-full">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                            <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 0.6 }} />
                            <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.4 }} />
                          </linearGradient>
                        </defs>
                        {result.monthlyData.length > 0 && (
                          <polygon
                            fill="url(#chartGradient)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            points={
                              result.monthlyData.map((point, index) => {
                                const x = (index / (result.monthlyData.length - 1)) * 100;
                                const y = 100 - (point.balance / inputs.currentSum) * 100;
                                return `${x},${y}`;
                              }).join(' ') + ` 100,100 0,100`
                            }
                          />
                        )}
                      </svg>
                    </div>
                    
                    {/* X-axis */}
                    <div className="absolute bottom-0 left-16 right-4 flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>20</span>
                      <span>40</span>
                      <span>60</span>
                      <span>80</span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">Months</div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-xs text-muted-foreground border-t pt-4">
                <sup>1</sup> The rates of return used in this illustration are not indicative of any actual investment and will fluctuate in value. An
                investment will not provide a consistent rate of return; years with lower (or negative) returns than the hypothetical returns
                shown may substantially affect the scenario presented.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <p>Click "Calculate" to see results</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};