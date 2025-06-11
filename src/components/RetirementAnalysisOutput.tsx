import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Presentation } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const retirementIncomeData = [{
  age: "67-77",
  income: 9000,
  label: "Age 67-77"
}, {
  age: "77-82",
  income: 7000,
  label: "Age 77-82"
}, {
  age: "82+",
  income: 6000,
  label: "Age 82+"
}];
export const RetirementAnalysisOutput = () => {
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Retirement Analysis</h2>
          
        </div>
      </div>

      {/* Main Analysis Content */}
      <Card>
        <CardHeader className="px-0 mx-0 py-[5px]">
          
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Income Goals Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Income Goals</h3>
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

          {/* Income Sources Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Income Sources</h3>
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
            <h3 className="font-semibold text-lg border-b pb-2">Assets Available at Retirement</h3>
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

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Results</h3>
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

              {/* Bar Chart */}
              <div className="mt-6">
                <h4 className="font-medium text-base mb-4">Retirement Income by Age Period</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retirementIncomeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" tick={{
                      fontSize: 12
                    }} />
                      <YAxis tick={{
                      fontSize: 12
                    }} tickFormatter={value => `$${value.toLocaleString()}`} />
                      <Tooltip formatter={value => [`$${value.toLocaleString()}`, 'Monthly Income']} labelStyle={{
                      color: '#374151'
                    }} />
                      <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
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
        <Button variant="outline" className="flex items-center gap-2">
          <Presentation className="h-4 w-4" />
          Add to Presentation
        </Button>
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>;
};