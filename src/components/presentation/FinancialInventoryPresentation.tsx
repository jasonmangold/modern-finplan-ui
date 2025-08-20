import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FinancialInventoryPresentation: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      {/* Summary Header */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <p className="text-sm text-gray-600">
            A comprehensive overview of your current financial position
          </p>
        </CardHeader>
      </Card>

      {/* Financial Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Income Card */}
        <Card className="bg-slate-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Income</CardTitle>
            <div className="text-2xl font-bold">$157,000</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Paul Employment</span>
                <span>$70,000</span>
              </div>
              <div className="flex justify-between">
                <span>Sally Employment</span>
                <span>$45,000</span>
              </div>
              <div className="flex justify-between">
                <span>Interest and Dividends</span>
                <span>$25,000</span>
              </div>
              <div className="flex justify-between">
                <span>Other</span>
                <span>$17,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Card */}
        <Card className="bg-slate-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Savings</CardTitle>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">$14,400</span>
              <span className="text-lg">9%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Education</span>
                <span>$3,600</span>
                <span>2%</span>
              </div>
              <div className="flex justify-between">
                <span>Retirement</span>
                <span>$6,000</span>
                <span>4%</span>
              </div>
              <div className="flex justify-between">
                <span>Other</span>
                <span>$4,800</span>
                <span>3%</span>
              </div>
              <div className="flex justify-between">
                <span>Unaccounted</span>
                <span>$3,208</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="bg-slate-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Expenses</CardTitle>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">$139,392</span>
              <span className="text-lg">89%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Household</span>
                <span>$55,908</span>
                <span>36%</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>$53,484</span>
                <span>34%</span>
              </div>
              <div className="flex justify-between">
                <span>Other</span>
                <span>$30,000</span>
                <span>19%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets Card */}
        <Card className="bg-slate-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Assets</CardTitle>
            <div className="text-2xl font-bold">$1,003,000</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Paul's Retirement</span>
                <span>$136,000</span>
                <span>14%</span>
              </div>
              <div className="flex justify-between">
                <span>Sally's Retirement</span>
                <span>$76,500</span>
                <span>8%</span>
              </div>
              <div className="flex justify-between">
                <span>Residence</span>
                <span>$700,000</span>
                <span>70%</span>
              </div>
              <div className="flex justify-between">
                <span>Cash</span>
                <span>$30,000</span>
                <span>3%</span>
              </div>
              <div className="flex justify-between">
                <span>Non-Retirement Investment</span>
                <span>$60,500</span>
                <span>6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liabilities Card */}
        <Card className="bg-slate-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Liabilities</CardTitle>
            <div className="text-2xl font-bold">$577,000</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Residence</span>
                <span>$577,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insurance Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Insurance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-medium mb-1">Paul</div>
                <div className="space-y-1 ml-2">
                  <div className="flex justify-between">
                    <span>Life Insurance</span>
                    <span>$65,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disability Insurance</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Long-Term Care Insurance</span>
                    <span>$0</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Sally</div>
                <div className="space-y-1 ml-2">
                  <div className="flex justify-between">
                    <span>Life Insurance</span>
                    <span>$50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disability Insurance</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Long-Term Care Insurance</span>
                    <span>$0</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Worth Card */}
        <Card className="bg-slate-600 text-white col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Net Worth</CardTitle>
            <div className="text-3xl font-bold">$426,000</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="flex justify-between">
                <span>Assets</span>
                <span>$1,003,000</span>
              </div>
              <div className="flex justify-between">
                <span>Liabilities</span>
                <span>$577,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};