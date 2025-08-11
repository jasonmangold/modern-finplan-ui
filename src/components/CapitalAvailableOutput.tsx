import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Generate asset growth data from age 41/39 to 66/64
const generateAssetGrowthData = () => {
  const data = [];
  const startYear = 2023;
  const paulStartAge = 41;
  const sallyStartAge = 39;
  
  for (let year = 0; year <= 25; year++) {
    const paulAge = paulStartAge + year;
    const sallyAge = sallyStartAge + year;
    const displayAge = `${paulAge}/${sallyAge}`;
    
    // Simulated growth over time
    const basePaulRetirement = 91000 * Math.pow(1.06, year);
    const baseSallyRetirement = 80000 * Math.pow(1.06, year);
    const baseOtherAssets = 35000 * Math.pow(1.015, year);
    
    data.push({
      age: displayAge,
      paulRetirement: Math.round(basePaulRetirement),
      sallyRetirement: Math.round(baseSallyRetirement),
      otherAssets: Math.round(baseOtherAssets),
      total: Math.round(basePaulRetirement + baseSallyRetirement + baseOtherAssets)
    });
  }
  return data;
};

const assetGrowthData = generateAssetGrowthData();

export const CapitalAvailableOutput = ({
  selectedForPresentation = []
}: {
  selectedForPresentation?: string[];
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Main Analysis Content */}
      <Card>
        <CardHeader className="px-0 mx-0 py-[5px]">
          {/* Empty header to match layout */}
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Current Assets Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Current Assets</h3>
            <p className="text-sm leading-relaxed">
              You have indicated that you currently own the following assets that will be used to support your retirement needs:
            </p>
            <div className="space-y-2 ml-4 text-sm">
              <div>Paul's retirement plan current value of $91,000 assuming a rate of return of 6.00%</div>
              <div>Sally's retirement plan current value of $80,000 assuming a rate of return of 6.00%</div>
              <div>Other assets current value of $35,000 assuming a rate of return of 1.50%</div>
            </div>
          </div>

          {/* Monthly Savings Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Monthly Savings</h3>
            <p className="text-sm leading-relaxed">
              You currently, and plan to continue, contributing to the following assets:<sup>1</sup>
            </p>
            <div className="space-y-2 ml-4 text-sm">
              <div>Paul's retirement plan - $300 with a company contribution of $150</div>
              <div>Sally's retirement plan - $200 with a company contribution of $100</div>
              <div>Other assets - $50</div>
              <div>Paul's contributions increasing at 1.00% per year; Sally's at 1.00% per year</div>
            </div>
          </div>

          {/* Available Assets Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Available Assets</h3>
            <p className="text-sm leading-relaxed">
              You will have accumulated the following at Paul's age 67:
            </p>
            <div className="space-y-2 ml-4 text-sm">
              <div>Paul's retirement assets - $860,051</div>
              <div>Sally's retirement assets - $670,667</div>
              <div>Other assets - $72,444</div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Analysis</h3>
            <p className="text-sm leading-relaxed">
              You will have accumulated $1,603,163 by Paul's age 67, Sally's age 65.
            </p>
          </div>

          {/* Asset Growth Chart */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Asset Growth</h3>
            <div className="h-96 w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 shadow-lg">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={assetGrowthData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="paulRetirementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="sallyRetirementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="otherAssetsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="age" 
                    tick={{fontSize: 11, fill: '#6B7280'}}
                    axisLine={{stroke: '#E5E7EB'}}
                    tickLine={false}
                    label={{ value: 'Pre-Retirement Ages', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fontSize: '12px', fill: '#6B7280' } }}
                  />
                  <YAxis 
                    tick={{fontSize: 11, fill: '#6B7280'}}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Amount', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '12px', fill: '#6B7280' } }}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      const formatName = name === 'paulRetirement' ? "Paul's retirement" : 
                                       name === 'sallyRetirement' ? "Sally's retirement" : 
                                       'Other Assets';
                      return [`$${value.toLocaleString()}`, formatName];
                    }}
                    labelFormatter={(label) => `Ages ${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}
                    formatter={(value) => {
                      return value === 'paulRetirement' ? "Paul's retirement" : 
                             value === 'sallyRetirement' ? "Sally's retirement" : 
                             'Other Assets';
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="paulRetirement"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="url(#paulRetirementGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="sallyRetirement"
                    stackId="1"
                    stroke="#10B981"
                    fill="url(#sallyRetirementGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="otherAssets"
                    stackId="1"
                    stroke="#8B5CF6"
                    fill="url(#otherAssetsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Notice */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              An additional $436,248 will be required at retirement to meet your goals.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-xs text-gray-500 italic border-t pt-4">
            <p><sup>1</sup> Monthly amounts shown are in today's dollars.</p>
            <p className="mt-2">Values shown in this presentation are hypothetical and not a promise of future performance.</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
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