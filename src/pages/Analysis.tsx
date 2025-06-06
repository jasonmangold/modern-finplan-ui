
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { ClientInputTabs } from "@/components/ClientInputTabs";

const retirementData = [
  { age: 67, socialSecurity: 35000, income: 15000, withdrawal: 45000, shortfall: 25000, incomeNeed: 120000 },
  { age: 68, socialSecurity: 35000, income: 16000, withdrawal: 46000, shortfall: 26000, incomeNeed: 123000 },
  { age: 69, socialSecurity: 35000, income: 17000, withdrawal: 47000, shortfall: 27000, incomeNeed: 126000 },
  { age: 70, socialSecurity: 35000, income: 18000, withdrawal: 48000, shortfall: 28000, incomeNeed: 129000 },
  { age: 71, socialSecurity: 35000, income: 19000, withdrawal: 49000, shortfall: 29000, incomeNeed: 132000 },
  { age: 72, socialSecurity: 35000, income: 20000, withdrawal: 50000, shortfall: 30000, incomeNeed: 135000 },
  { age: 73, socialSecurity: 35000, income: 21000, withdrawal: 51000, shortfall: 31000, incomeNeed: 138000 },
  { age: 74, socialSecurity: 35000, income: 22000, withdrawal: 52000, shortfall: 32000, incomeNeed: 141000 },
  { age: 75, socialSecurity: 35000, income: 23000, withdrawal: 53000, shortfall: 33000, incomeNeed: 144000 },
  { age: 76, socialSecurity: 35000, income: 24000, withdrawal: 54000, shortfall: 34000, incomeNeed: 147000 },
  { age: 77, socialSecurity: 35000, income: 25000, withdrawal: 55000, shortfall: 35000, incomeNeed: 150000 },
  { age: 78, socialSecurity: 35000, income: 26000, withdrawal: 56000, shortfall: 36000, incomeNeed: 153000 },
  { age: 79, socialSecurity: 35000, income: 27000, withdrawal: 57000, shortfall: 37000, incomeNeed: 156000 },
  { age: 80, socialSecurity: 35000, income: 28000, withdrawal: 58000, shortfall: 38000, incomeNeed: 159000 },
  { age: 81, socialSecurity: 35000, income: 29000, withdrawal: 59000, shortfall: 39000, incomeNeed: 162000 },
  { age: 82, socialSecurity: 35000, income: 30000, withdrawal: 60000, shortfall: 40000, incomeNeed: 165000 },
  { age: 83, socialSecurity: 35000, income: 31000, withdrawal: 61000, shortfall: 41000, incomeNeed: 168000 },
  { age: 84, socialSecurity: 35000, income: 32000, withdrawal: 62000, shortfall: 42000, incomeNeed: 171000 },
  { age: 85, socialSecurity: 35000, income: 33000, withdrawal: 63000, shortfall: 43000, incomeNeed: 174000 },
  { age: 86, socialSecurity: 35000, income: 34000, withdrawal: 64000, shortfall: 44000, incomeNeed: 177000 },
  { age: 87, socialSecurity: 35000, income: 35000, withdrawal: 65000, shortfall: 45000, incomeNeed: 180000 },
  { age: 88, socialSecurity: 35000, income: 36000, withdrawal: 66000, shortfall: 46000, incomeNeed: 183000 },
  { age: 89, socialSecurity: 35000, income: 37000, withdrawal: 67000, shortfall: 47000, incomeNeed: 186000 },
  { age: 90, socialSecurity: 35000, income: 38000, withdrawal: 68000, shortfall: 48000, incomeNeed: 189000 },
];

const Analysis = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-4">
          <div className="space-y-4">
            <Select defaultValue="retirement-accumulation">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retirement-accumulation">Retirement Accumulation</SelectItem>
                <SelectItem value="retirement-distribution">Retirement Distribution</SelectItem>
              </SelectContent>
            </Select>
            
            <ClientInputTabs />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Analysis Outputs</CardTitle>
                <Select defaultValue="retirement-analysis">
                  <SelectTrigger className="w-48 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retirement-analysis">Retirement Analysis</SelectItem>
                    <SelectItem value="investment-analysis">Investment Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="add-presentation" />
                  <Label htmlFor="add-presentation" className="text-sm">Add to Presentation</Label>
                </div>
                <Button className="bg-blue-600 text-white">Save PDF</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">Retirement Income Analysis</h3>
                <div className="mb-4">
                  <h4 className="text-center font-medium mb-2">Retirement Income Sources by Age (67-90)</h4>
                </div>
                
                <div className="h-96 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={retirementData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      barCategoryGap="10%"
                    >
                      <defs>
                        <linearGradient id="socialSecurityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#16a34a" stopOpacity={0.9}/>
                        </linearGradient>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.9}/>
                        </linearGradient>
                        <linearGradient id="withdrawalGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#d97706" stopOpacity={0.9}/>
                        </linearGradient>
                        <linearGradient id="shortfallGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#dc2626" stopOpacity={0.9}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                      <XAxis 
                        dataKey="age" 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        axisLine={{ stroke: '#d1d5db' }}
                        tickLine={{ stroke: '#d1d5db' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        axisLine={{ stroke: '#d1d5db' }}
                        tickLine={{ stroke: '#d1d5db' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="rect"
                      />
                      <Bar 
                        dataKey="socialSecurity" 
                        stackId="a" 
                        fill="url(#socialSecurityGradient)" 
                        name="Social Security"
                        radius={[0, 0, 2, 2]}
                      />
                      <Bar 
                        dataKey="income" 
                        stackId="a" 
                        fill="url(#incomeGradient)" 
                        name="Other Income"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="withdrawal" 
                        stackId="a" 
                        fill="url(#withdrawalGradient)" 
                        name="Portfolio Withdrawal"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="shortfall" 
                        stackId="a" 
                        fill="url(#shortfallGradient)" 
                        name="Income Shortfall"
                        radius={[2, 2, 0, 0]}
                      />
                      <ReferenceLine 
                        y={120000} 
                        stroke="#374151" 
                        strokeDasharray="5 5" 
                        strokeWidth={2}
                        label={{ value: "Income Need", position: "insideTopRight" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
