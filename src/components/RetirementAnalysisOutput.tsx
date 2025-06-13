
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Presentation } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate yearly retirement data from age 67-90
const generateRetirementData = () => {
  const data = [];
  for (let age = 67; age <= 90; age++) {
    let socialSecurity = 5279; // Combined SS benefits ($2,853 + $2,426)
    let otherIncome = 500; // Rental income
    let appliedAssets = 0;
    let shortfall = 0;
    
    if (age >= 67) {
      if (age <= 77) {
        // Ages 67-77: Need $9,000, have $5,779 from SS + rental
        appliedAssets = Math.max(0, 9000 - socialSecurity - otherIncome);
      } else if (age <= 82) {
        // Ages 77-82: Need $7,000, have $5,779 from SS + rental
        appliedAssets = Math.max(0, 7000 - socialSecurity - otherIncome);
      } else if (age <= 83) {
        // Ages 82-83: Need $6,000, have $5,779 from SS + rental
        appliedAssets = Math.max(0, 6000 - socialSecurity - otherIncome);
      } else {
        // Ages 84+: Funds depleted, shortfall
        shortfall = 6000 - socialSecurity - otherIncome;
        appliedAssets = 0;
      }
    }
    
    data.push({
      age: age,
      socialSecurity,
      otherIncome,
      appliedAssets,
      shortfall: Math.max(0, shortfall),
      total: socialSecurity + otherIncome + appliedAssets + Math.max(0, shortfall)
    });
  }
  return data;
};

const retirementYearlyData = generateRetirementData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{`Age ${label}`}</p>
        {payload.map((entry: any, index: number) => {
          const names = {
            socialSecurity: 'Social Security',
            otherIncome: 'Other Income',
            appliedAssets: 'Applied Assets',
            shortfall: 'Income Shortfall'
          };
          return (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {names[entry.dataKey as keyof typeof names]}: ${entry.value.toLocaleString()}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export const RetirementAnalysisOutput = ({ selectedForPresentation = [] }: { selectedForPresentation?: string[] }) => {
  const isSelectedForPresentation = selectedForPresentation.includes("Retirement Analysis");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Retirement Analysis</h2>
          {isSelectedForPresentation && (
            <span className="text-sm text-green-600 font-medium">✓ Selected for Presentation</span>
          )}
        </div>
      </div>

      {/* Main Analysis Content */}
      <Card>
        <CardHeader className="px-0 mx-0 py-[5px]">
          
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Income Goals Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Income Goals</h3>
            <p className="text-sm leading-relaxed">
              You have indicated that you would like to have the following monthly retirement income:<sup>1</sup>
            </p>
            <div className="space-y-3 ml-4">
              <div className="text-sm">
                <span className="font-medium">At Paul's age 67 and Sally's age 65</span> - 93.91% of current income, or <span className="font-semibold text-green-600">$9,000</span>.
              </div>
              <div className="text-sm">
                <span className="font-medium">At Paul's age 77 and Sally's age 75</span> - 73.04% of current income, or <span className="font-semibold text-green-600">$7,000</span>.
              </div>
              <div className="text-sm">
                <span className="font-medium">At Paul's age 82 and Sally's age 80</span> - 62.61% of current income, or <span className="font-semibold text-green-600">$6,000</span>.
              </div>
            </div>
          </div>

          {/* Income Sources and Assets Section - 2 columns */}
          <div className="grid grid-cols-2 gap-8">
            {/* Income Sources Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Income Sources</h3>
              <p className="text-sm leading-relaxed">
                To support your retirement goals you have the following monthly sources:
              </p>
              
              <div className="space-y-4 ml-4">
                <div>
                  <h4 className="font-medium text-base mb-2">Earned Income</h4>
                  <p className="text-sm ml-4">Sally's employment income from age 65 until age 67</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-base mb-2">Social Security</h4>
                  <div className="space-y-1 ml-4 text-sm">
                    <div>Social Security benefits at Paul's age 67 - <span className="font-semibold">$2,853</span></div>
                    <div>Social Security benefits at Sally's age 67 - <span className="font-semibold">$2,426</span></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-base mb-2">Other Income</h4>
                  <p className="text-sm ml-4">Rental Income beginning at Paul's age 67 - <span className="font-semibold">$500</span></p>
                </div>
              </div>
            </div>

            {/* Assets Available at Retirement Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Assets Available at Retirement</h3>
              <div className="space-y-2 ml-4 text-sm">
                <div className="flex justify-between">
                  <span>Paul retirement assets -</span>
                  <span className="font-semibold">$860,051</span>
                </div>
                <div className="flex justify-between">
                  <span>Sally retirement assets -</span>
                  <span className="font-semibold">$670,667</span>
                </div>
                <div className="flex justify-between">
                  <span>Other assets -</span>
                  <span className="font-semibold">$72,444</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-900">Results</h3>
            <div className="space-y-4">
              <p className="text-sm font-medium">According to the analysis:</p>
              
              <div className="space-y-3 ml-4 text-sm">
                <div className="p-3 bg-red-50 rounded border border-red-200">
                  <span className="text-red-800 font-medium">Your funds will be depleted at Paul's age 83.</span>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                  <span className="text-yellow-800">Your current savings of <span className="font-semibold">$550</span> will need to be increased by <span className="font-semibold">$636</span> with the additional monthly savings earning a rate of return of <span className="font-semibold">5.00%</span>.</span>
                </div>
              </div>

              {/* Modern Bar Chart - Yearly Retirement Income */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-lg">
                <h4 className="font-semibold text-lg mb-6 text-gray-800">Retirement Income Projection (Age 67-90)</h4>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={retirementYearlyData} 
                      margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                      barCategoryGap="10%"
                    >
                      <defs>
                        <linearGradient id="socialSecurityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                        </linearGradient>
                        <linearGradient id="otherIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1}/>
                        </linearGradient>
                        <linearGradient id="appliedAssetsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#D97706" stopOpacity={1}/>
                        </linearGradient>
                        <linearGradient id="shortfallGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#DC2626" stopOpacity={1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#E5E7EB" 
                        strokeOpacity={0.6}
                      />
                      <XAxis 
                        dataKey="age" 
                        tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }} 
                        interval={1}
                        axisLine={{ stroke: '#D1D5DB', strokeWidth: 1 }}
                        tickLine={{ stroke: '#D1D5DB' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }} 
                        tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                        axisLine={{ stroke: '#D1D5DB', strokeWidth: 1 }}
                        tickLine={{ stroke: '#D1D5DB' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="socialSecurity" 
                        stackId="income" 
                        fill="url(#socialSecurityGradient)"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="otherIncome" 
                        stackId="income" 
                        fill="url(#otherIncomeGradient)"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="appliedAssets" 
                        stackId="income" 
                        fill="url(#appliedAssetsGradient)"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="shortfall" 
                        stackId="income" 
                        fill="url(#shortfallGradient)"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-6 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-b from-green-400 to-green-600 rounded shadow-sm"></div>
                    <span className="text-gray-700">Social Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded shadow-sm"></div>
                    <span className="text-gray-700">Other Income</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-b from-amber-400 to-amber-600 rounded shadow-sm"></div>
                    <span className="text-gray-700">Applied Assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-b from-red-400 to-red-600 rounded shadow-sm"></div>
                    <span className="text-gray-700">Income Shortfall</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <span className="text-blue-800">An additional <span className="font-semibold">$436,248</span> will be required at retirement to meet your goals.</span>
              </div>

              <div className="mt-6 text-xs text-gray-500 italic">
                Values shown in this presentation are hypothetical and not a promise of future performance.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
        <Button className="flex items-center gap-2">
          <Presentation className="h-4 w-4" />
          Add to Presentation
        </Button>
      </div>
    </div>
  );
};
