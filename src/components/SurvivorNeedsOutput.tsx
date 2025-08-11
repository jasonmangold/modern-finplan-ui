import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SurvivorNeedsOutputProps {
  selectedForPresentation: string[];
}

export const SurvivorNeedsOutput = ({ selectedForPresentation }: SurvivorNeedsOutputProps) => {
  // Sample data for the chart
  const chartData = [
    { age: 38, earnedIncome: 120000, socialSecurity: 0, otherIncome: 0, appliedAssets: 0, shortfall: 0 },
    { age: 42, earnedIncome: 110000, socialSecurity: 15000, otherIncome: 5000, appliedAssets: 10000, shortfall: 0 },
    { age: 46, earnedIncome: 100000, socialSecurity: 20000, otherIncome: 8000, appliedAssets: 15000, shortfall: 0 },
    { age: 50, earnedIncome: 90000, socialSecurity: 25000, otherIncome: 10000, appliedAssets: 20000, shortfall: 0 },
    { age: 54, earnedIncome: 80000, socialSecurity: 30000, otherIncome: 12000, appliedAssets: 25000, shortfall: 0 },
    { age: 58, earnedIncome: 0, socialSecurity: 35000, otherIncome: 15000, appliedAssets: 30000, shortfall: 25000 },
    { age: 62, earnedIncome: 0, socialSecurity: 40000, otherIncome: 18000, appliedAssets: 35000, shortfall: 35000 },
    { age: 66, earnedIncome: 0, socialSecurity: 45000, otherIncome: 20000, appliedAssets: 40000, shortfall: 45000 },
    { age: 70, earnedIncome: 0, socialSecurity: 50000, otherIncome: 22000, appliedAssets: 45000, shortfall: 55000 },
    { age: 74, earnedIncome: 0, socialSecurity: 55000, otherIncome: 25000, appliedAssets: 50000, shortfall: 65000 },
    { age: 78, earnedIncome: 0, socialSecurity: 60000, otherIncome: 28000, appliedAssets: 55000, shortfall: 75000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">In the event of Paul's death</h1>
      </div>

      {/* Areas of Need */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg">Areas of Need</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            There are two areas of needs that arise in the event of a death: Immediate cash needs and income to support Sally and the children.
          </p>
        </CardContent>
      </Card>

      {/* Immediate Needs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg">Immediate Needs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            This generally includes funds required immediately after death to establish an emergency reserve fund, pay final expenses, create a college fund, and repay outstanding debts. You would like to provide for the education of the children. The total amount required for these needs is $499,479. You currently have assets and life insurance in the amount of $718,000.
          </p>
        </CardContent>
      </Card>

      {/* Income Needs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg">Income Needs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Income needs change over time. This analysis assumes that monthly income needs will be: $7,000 or 73.39% of total income until the children reach age 18. $6,000 or 62.61% of today's total income after the children reach age 18. $5,000 or 52.17% of today's total income during retirement.
          </p>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg">Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            According to this analysis, your immediate needs can be satisfied with your liquid assets. Your other assets of $206,000 can be held until needed, which will allow you to liquidate them at an appropriate time. All assets will be depleted by Sally's age 61.
          </p>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg text-center">Income Needs and Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barCategoryGap="10%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="age" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  label={{ value: "Sally's Age", position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  label={{ value: 'Annual Amount', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  labelFormatter={(label) => `Age: ${label}`}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="rect"
                />
                <Bar dataKey="earnedIncome" stackId="a" fill="#87CEEB" name="Earned Income" />
                <Bar dataKey="socialSecurity" stackId="a" fill="#90EE90" name="Social Security" />
                <Bar dataKey="otherIncome" stackId="a" fill="#DDA0DD" name="Other Income" />
                <Bar dataKey="appliedAssets" stackId="a" fill="#F0E68C" name="Applied Assets" />
                <Bar dataKey="shortfall" stackId="a" fill="#DC143C" name="Shortfall" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-primary font-semibold mb-2">
              In order to provide for all needs today, you
            </p>
            <p className="text-primary font-semibold mb-4">
              would need an additional amount of $415,000 today.
            </p>
            <p className="text-xs text-muted-foreground italic">
              Values shown in this presentation are hypothetical and not a promise of future performance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};