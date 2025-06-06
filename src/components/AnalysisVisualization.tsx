
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface AnalysisVisualizationProps {
  selectedTopic: string;
}

const retirementData = [
  { age: 67, socialSecurity: 35000, portfolioWithdrawal: 45000, shortfall: 25000, totalNeed: 105000 },
  { age: 70, socialSecurity: 35000, portfolioWithdrawal: 48000, shortfall: 28000, totalNeed: 111000 },
  { age: 75, socialSecurity: 35000, portfolioWithdrawal: 53000, shortfall: 33000, totalNeed: 121000 },
  { age: 80, socialSecurity: 35000, portfolioWithdrawal: 58000, shortfall: 38000, totalNeed: 131000 },
  { age: 85, socialSecurity: 35000, portfolioWithdrawal: 63000, shortfall: 43000, totalNeed: 141000 },
  { age: 90, socialSecurity: 35000, portfolioWithdrawal: 68000, shortfall: 48000, totalNeed: 151000 }
];

const accumulationData = [
  { year: 2025, balance: 625000, contributions: 25000 },
  { year: 2030, balance: 890000, contributions: 27000 },
  { year: 2035, balance: 1250000, contributions: 29000 },
  { year: 2040, balance: 1750000, contributions: 31000 },
  { year: 2045, balance: 2400000, contributions: 33000 },
  { year: 2050, balance: 3200000, contributions: 35000 }
];

const assetAllocationData = [
  { name: 'US Stocks', value: 40, color: '#3b82f6' },
  { name: 'International', value: 20, color: '#10b981' },
  { name: 'Bonds', value: 30, color: '#f59e0b' },
  { name: 'Real Estate', value: 7, color: '#ef4444' },
  { name: 'Cash', value: 3, color: '#6b7280' }
];

const educationData = [
  { year: 2025, cost: 30000, savings: 15000, gap: 15000 },
  { year: 2030, cost: 35000, savings: 28000, gap: 7000 },
  { year: 2035, cost: 40000, savings: 42000, gap: -2000 },
  { year: 2040, cost: 45000, savings: 58000, gap: -13000 }
];

export const AnalysisVisualization = ({ selectedTopic }: AnalysisVisualizationProps) => {
  const renderVisualization = () => {
    switch (selectedTopic) {
      case 'retirement-accumulation':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Retirement Accumulation Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={accumulationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Portfolio Balance"
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'retirement-distribution':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Retirement Income Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retirementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="age" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Legend />
                      <Bar dataKey="socialSecurity" stackId="a" fill="#22c55e" name="Social Security" />
                      <Bar dataKey="portfolioWithdrawal" stackId="a" fill="#3b82f6" name="Portfolio Withdrawal" />
                      <Bar dataKey="shortfall" stackId="a" fill="#ef4444" name="Income Shortfall" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'asset-allocation':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {assetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'education-funding':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Education Funding Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={educationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Legend />
                      <Bar dataKey="cost" fill="#ef4444" name="Education Cost" />
                      <Bar dataKey="savings" fill="#22c55e" name="Savings Available" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="h-80 flex items-center justify-center">
            <CardContent>
              <div className="text-center text-gray-500">
                <BarChart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Select an analysis topic</p>
                <p className="text-sm">Choose a topic from the dropdown to view relevant charts and analysis</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Analysis & Visualization</h3>
      {renderVisualization()}
    </div>
  );
};
