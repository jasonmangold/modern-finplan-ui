import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Data for the alternatives chart
const alternativesData = [
  {
    category: "Savings",
    current: 45,
    shortfall: 55,
    currentValue: 45,
    shortfallValue: 55
  },
  {
    category: "Rate of\nReturn",
    current: 18,
    shortfall: 82,
    currentValue: 18,
    shortfallValue: 82
  },
  {
    category: "Monthly\nIncome",
    current: 86,
    shortfall: 14,
    currentValue: 86,
    shortfallValue: 14
  },
  {
    category: "Years to\nRetirement",
    current: 86,
    shortfall: 14,
    currentValue: 86,
    shortfallValue: 14
  }
];

export const AlternativesToRetirementOutput = ({
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
      <div className="space-y-8">
        {/* Introduction */}
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-blue-800 font-medium">
            There are several alternatives available which will provide a better chance of meeting your goals.
          </p>
        </div>

        {/* Save More Alternative */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-blue-600">You Can Save More Until Retirement</h3>
          <p className="text-sm leading-relaxed">
            Your current savings of <span className="font-semibold">$550</span> will need to be increased by <span className="font-semibold">$636</span> with the additional monthly savings earning a rate of return of <span className="font-semibold">5.00%</span>.
          </p>
        </div>

        {/* Earn More Alternative */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-blue-600">You Can Earn More on Your Assets Until Retirement</h3>
          <p className="text-sm leading-relaxed">
            The rate of return on your existing savings of <span className="font-semibold">1.50%</span> will need to be increased to <span className="font-semibold">9.37%</span>.
          </p>
        </div>

        {/* Spend Less Alternative */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-blue-600">You Can Spend Less During Retirement</h3>
          <p className="text-sm leading-relaxed">
            Your desired retirement spending goals will need to be reduced by <span className="font-semibold">14.00%</span> resulting in <span className="font-semibold">$7,740</span> per month during the first year of retirement.
          </p>
        </div>

        {/* Retire Later Alternative */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-blue-600">You Can Retire Later</h3>
          <p className="text-sm leading-relaxed">
            You can satisfy your spending goals if retirement is postponed until Paul's age <span className="font-semibold">71</span> and Sally's age <span className="font-semibold">71</span>.
          </p>
          <p className="text-sm leading-relaxed mt-4">
            Each of these alternatives may not be possible to implement fully. Therefore, you might consider some steps in several different areas. Investments with the potential for a higher rate of return also have increased risk of losing principal, and may have increased short-term volatility.
          </p>
        </div>

        {/* Alternatives Chart */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-center text-blue-600">Alternatives to Achieving Retirement Goals</h3>
          <div className="h-96 w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={alternativesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A3C585" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#7FB069" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="shortfallGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#B91C1C" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="category" 
                  tick={{fontSize: 11, fill: '#6B7280'}}
                  axisLine={{stroke: '#E5E7EB'}}
                  tickLine={false}
                  interval={0}
                />
                <YAxis 
                  tick={{fontSize: 11, fill: '#6B7280'}}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => `${value}%`}
                  domain={[0, 100]}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    const formatName = name === 'current' ? 'Current' : 'Shortfall';
                    return [`${value}%`, formatName];
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', fontWeight: '500', paddingTop: '20px' }}
                  formatter={(value) => value === 'current' ? 'Current' : 'Shortfall'}
                />
                <Bar
                  dataKey="current"
                  stackId="alternatives"
                  fill="url(#currentGradient)"
                  stroke="#7FB069"
                  strokeWidth={1}
                />
                <Bar
                  dataKey="shortfall"
                  stackId="alternatives"
                  fill="url(#shortfallGradient)"
                  stroke="#B91C1C"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-gray-500 italic border-t pt-4">
          <p className="text-center">Values shown in this presentation are hypothetical and not a promise of future performance.</p>
        </div>
      </div>

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