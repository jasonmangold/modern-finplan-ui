
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Presentation } from "lucide-react";

export const RetirementAnalysisOutput = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Retirement Analysis</h2>
          <p className="text-gray-600">Comprehensive retirement planning analysis</p>
        </div>
      </div>

      {/* Main Analysis Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analysis Summary Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Analysis Summary</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Current Situation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Age:</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retirement Age:</span>
                    <span className="font-medium">67</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Years to Retirement:</span>
                    <span className="font-medium">22</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Retirement Balance:</span>
                    <span className="font-medium">$350,000</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Projected Results</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Projected Balance at Retirement:</span>
                    <span className="font-medium text-green-600">$1,247,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Income Needed:</span>
                    <span className="font-medium">$8,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Income Available:</span>
                    <span className="font-medium text-green-600">$8,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Surplus/(Deficit):</span>
                    <span className="font-medium text-green-600">$247</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Income Sources Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Retirement Income Sources</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Social Security</span>
                <span className="font-medium">$2,800/month</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">401(k) Withdrawals</span>
                <span className="font-medium">$4,200/month</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">IRA Withdrawals</span>
                <span className="font-medium">$1,247/month</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                <span className="font-semibold">Total Monthly Income</span>
                <span className="font-semibold text-blue-600">$8,247/month</span>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Recommendations</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-green-800">On Track for Retirement Goals</p>
                  <p className="text-sm text-green-700">Your current savings rate is sufficient to meet your retirement income needs.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-blue-800">Consider Maximizing Tax-Advantaged Accounts</p>
                  <p className="text-sm text-blue-700">Increase 401(k) contributions to take full advantage of employer matching and tax benefits.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-yellow-800">Review Social Security Strategy</p>
                  <p className="text-sm text-yellow-700">Consider delaying Social Security benefits to age 70 for maximum benefit amount.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Assumptions Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Key Assumptions</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Investment Return:</span>
                  <span className="font-medium">7.0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Inflation Rate:</span>
                  <span className="font-medium">3.0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Life Expectancy:</span>
                  <span className="font-medium">90 years</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Income Replacement:</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="flex justify-between">
                  <span>Social Security Start:</span>
                  <span className="font-medium">Age 67</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Rate in Retirement:</span>
                  <span className="font-medium">22%</span>
                </div>
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
    </div>
  );
};
