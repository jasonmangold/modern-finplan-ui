import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate spending data from age 66/64 to 89
const generateSpendingData = () => {
  const data = [];
  for (let age = 66; age <= 89; age++) {
    // Base values - adjust based on the chart pattern in the image
    let income = 60000; // Green section - secure income
    let fromAssets = 40000; // Orange section - from assets
    let shortfall = 0; // Red section - shortfall
    
    // Pattern from the image shows changes over time
    if (age >= 75) {
      // Later years show more shortfall, less from assets
      fromAssets = Math.max(20000, 40000 - (age - 75) * 2000);
      shortfall = Math.max(0, (age - 80) * 3000);
    }
    
    if (age >= 85) {
      // Very late years show significant shortfall
      fromAssets = 10000;
      shortfall = 30000;
    }
    
    data.push({
      age: age === 66 ? "66/64" : age === 67 ? "67/65" : age.toString(),
      income,
      fromAssets,
      shortfall,
      total: income + fromAssets + shortfall
    });
  }
  return data;
};

const spendingData = generateSpendingData();

export const TotalNeedsSpendingOutput = ({
  selectedForPresentation = []
}: {
  selectedForPresentation?: string[];
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Analysis Text */}
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            You estimated your essential <span className="font-semibold text-red-600">spending</span> to be $7,000 in today's dollars, which will be $7,210 when you retire in <span className="font-semibold">1 years</span>. In addition, you would like to spend an additional $2,000 in today's dollars, which is $2,060 at retirement.
          </p>
          
          <p className="text-sm leading-relaxed">
            The chart below illustrates how much of your total spending can be satisfied with secure income and by liquidating your capital.
          </p>
        </div>

        {/* Spending Chart */}
        <div className="space-y-4">
          <div className="h-80 w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={spendingData} 
                margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
              >
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="assetsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#D97706" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="shortfallGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#DC2626" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="age" 
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={false}
                  interval={2}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    const formatName = name === 'income' ? 'Income' : 
                                     name === 'fromAssets' ? 'From Assets' : 'Shortfall';
                    return [`$${value.toLocaleString()}`, formatName];
                  }}
                  labelFormatter={(age) => `Age ${age}`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="income" 
                  stackId="spending" 
                  fill="url(#incomeGradient)" 
                  name="income"
                  radius={[0, 0, 0, 0]}
                />
                <Bar 
                  dataKey="fromAssets" 
                  stackId="spending" 
                  fill="url(#assetsGradient)" 
                  name="fromAssets"
                  radius={[0, 0, 0, 0]}
                />
                <Bar 
                  dataKey="shortfall" 
                  stackId="spending" 
                  fill="url(#shortfallGradient)" 
                  name="shortfall"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-red-500"></div>
              <span className="text-gray-700">Shortfall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-orange-500"></div>
              <span className="text-gray-700">From Assets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-green-500"></div>
              <span className="text-gray-700">Income</span>
            </div>
          </div>
        </div>

        {/* Summary Statement */}
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-600 mb-2">
            On average, 58% of your total needs and desires can be satisfied with both income and by liquidating assets.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Values shown in this presentation are hypothetical and not a promise of future performance.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  );
};