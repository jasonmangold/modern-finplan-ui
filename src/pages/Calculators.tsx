
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const calculatorCategories = [
  "Borrowing",
  "Discussion Organization", 
  "Education Funding",
  "Estate Planning",
  "Health and Medical",
  "Income Taxes",
  "Investments",
  "Life Insurance, Debt, Mortgage and Education Analysis",
  "Personal Finance",
  "Retirement Planning"
];

const Calculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("Future Value");
  const [initialInvestment, setInitialInvestment] = useState("");
  const [periodicContribution, setPeriodicContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [futureValue, setFutureValue] = useState(0);

  const calculateFutureValue = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const periodic = parseFloat(periodicContribution) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const years = parseFloat(timePeriod) || 0;

    // Simple future value calculation
    const compoundedInitial = initial * Math.pow(1 + rate, years);
    const compoundedAnnuity = periodic * (Math.pow(1 + rate, years) - 1) / rate;
    const total = compoundedInitial + compoundedAnnuity;
    
    setFutureValue(total);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {calculatorCategories.map((category) => (
                  <details key={category} className="group">
                    <summary className="flex items-center justify-between p-2 text-sm font-medium cursor-pointer hover:bg-gray-50 rounded">
                      <span>{category}</span>
                      <span className="text-gray-400">▼</span>
                    </summary>
                    <div className="pl-4 py-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-sm text-blue-600 hover:bg-blue-50"
                        onClick={() => setSelectedCalculator("Future Value")}
                      >
                        Future Value Calculator
                      </Button>
                    </div>
                  </details>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="grid grid-cols-2 gap-6">
            {/* Client Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>Client Inputs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Future Value Inputs</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="initial">Initial Investment ($)</Label>
                        <Input
                          id="initial"
                          type="number"
                          value={initialInvestment}
                          onChange={(e) => setInitialInvestment(e.target.value)}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="periodic">Periodic Contribution ($)</Label>
                        <Input
                          id="periodic"
                          type="number"
                          value={periodicContribution}
                          onChange={(e) => setPeriodicContribution(e.target.value)}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="frequency">Contribution Frequency</Label>
                        <Select defaultValue="annually">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annually">Annually</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                        <Input
                          id="rate"
                          type="number"
                          step="0.01"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <Label htmlFor="time">Time Period (Years)</Label>
                        <Input
                          id="time"
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(e.target.value)}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="compounding">Compounding Frequency</Label>
                        <Select defaultValue="annually">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annually">Annually</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Outputs */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Outputs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">Future Value</h3>
                  
                  {futureValue > 0 ? (
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        ${futureValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-600">Please enter valid inputs to calculate the future value.</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button 
                      onClick={calculateFutureValue}
                      className="w-full bg-blue-600 text-white"
                    >
                      Recalculate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full text-blue-600 border-blue-600"
                    >
                      Export Graph
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
