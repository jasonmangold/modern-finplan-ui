import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, FileSpreadsheet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface AssetAllocationComparisonOutputProps {
  selectedForPresentation?: string[];
}

const currentAssetData = [
  { name: 'US Large/Mid Cap Stocks', value: 32, amount: 107160, color: '#3b82f6' },
  { name: 'US Small Cap Stocks', value: 15, amount: 36095, color: '#22c55e' },
  { name: 'Aggregate US Bonds', value: 45, amount: 75400, color: '#8b5cf6' },
  { name: 'Cash', value: 5, amount: 11685, color: '#f59e0b' },
  { name: 'International Equity', value: 3, amount: 8160, color: '#ef4444' }
];

const recommendedAssetData = [
  { name: 'US Large/Mid Cap Stocks', value: 38, amount: 90630, color: '#3b82f6' },
  { name: 'US Small Cap Stocks', value: 4, amount: 9540, color: '#22c55e' },
  { name: 'Aggregate US Bonds', value: 38, amount: 90630, color: '#8b5cf6' },
  { name: 'Cash', value: 2, amount: 4770, color: '#f59e0b' },
  { name: 'International Equity', value: 18, amount: 42930, color: '#ef4444' }
];

const assetMixData = [
  {
    assetClass: 'US Large/Mid Cap Stocks',
    currentPercent: '44.33%',
    currentAmount: '$107,160',
    change: '-$16,530',
    recommendedPercent: '38.00%',
    recommendedAmount: '$90,630'
  },
  {
    assetClass: 'US Small Cap Stocks',
    currentPercent: '15.13%',
    currentAmount: '$36,095',
    change: '-$26,555',
    recommendedPercent: '4.00%',
    recommendedAmount: '$9,540'
  },
  {
    assetClass: 'Aggregate US Bonds',
    currentPercent: '31.61%',
    currentAmount: '$75,400',
    change: '$15,230',
    recommendedPercent: '38.00%',
    recommendedAmount: '$90,630'
  },
  {
    assetClass: 'Cash',
    currentPercent: '4.90%',
    currentAmount: '$11,685',
    change: '-$6,915',
    recommendedPercent: '2.00%',
    recommendedAmount: '$4,770'
  },
  {
    assetClass: 'International Equity',
    currentPercent: '3.42%',
    currentAmount: '$8,160',
    change: '$34,770',
    recommendedPercent: '18.00%',
    recommendedAmount: '$42,930'
  },
  {
    assetClass: 'Total Assets',
    currentPercent: '100.00%',
    currentAmount: '$238,500',
    change: '$0',
    recommendedPercent: '100.00%',
    recommendedAmount: '$238,500'
  }
];

export const AssetAllocationComparisonOutput = ({ selectedForPresentation }: AssetAllocationComparisonOutputProps) => {
  const isSelectedForPresentation = selectedForPresentation?.includes("Asset Allocation Comparison");

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    console.log("Export to Excel functionality");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Portfolio allocation recommended: <span className="text-primary">Moderate</span>
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleExportExcel} className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Asset Mix Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Asset Class</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground" colSpan={2}>Current Asset Mix</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Change</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground" colSpan={2}>Recommended Asset Mix</th>
                </tr>
                <tr className="border-b border-border bg-muted/30">
                  <th className="py-2 px-4"></th>
                  <th className="text-center py-2 px-4 text-sm font-medium text-muted-foreground">Percent</th>
                  <th className="text-center py-2 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-center py-2 px-4 text-sm font-medium text-muted-foreground">$</th>
                  <th className="text-center py-2 px-4 text-sm font-medium text-muted-foreground">Percent</th>
                  <th className="text-center py-2 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {assetMixData.map((row, index) => (
                  <tr key={index} className={`border-b border-border ${index === assetMixData.length - 1 ? 'font-semibold bg-muted/20' : ''}`}>
                    <td className="py-3 px-4 text-foreground">{row.assetClass}</td>
                    <td className="text-center py-3 px-4 text-foreground">{row.currentPercent}</td>
                    <td className="text-center py-3 px-4 text-foreground">{row.currentAmount}</td>
                    <td className={`text-center py-3 px-4 ${row.change.startsWith('-') ? 'text-red-600' : row.change === '$0' ? 'text-muted-foreground' : 'text-green-600'}`}>
                      {row.change}
                    </td>
                    <td className="text-center py-3 px-4 text-foreground">{row.recommendedPercent}</td>
                    <td className="text-center py-3 px-4 text-foreground">{row.recommendedAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pie Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg font-semibold text-foreground">Current</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentAssetData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={false}
                  >
                    {currentAssetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg font-semibold text-foreground">Recommended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={recommendedAssetData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={false}
                  >
                    {recommendedAssetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {currentAssetData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Description Text */}
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-foreground leading-relaxed">
            Moderate investors typically have a higher tolerance for risk and/or a longer time horizon than either of the 
            previous investors while seeking more stable growth than their more aggressive counterparts would welcome. 
            The main objective of a moderate investor is to achieve steady portfolio growth while limiting fluctuations to 
            less than those found in the stock market.
          </p>
          <div className="mt-4 text-xs text-muted-foreground">
            ©2024 Morningstar Investment Management LLC. Used with permission. All Rights Reserved. Morningstar Investment Management is a 
            registered investment adviser and wholly owned subsidiary of Morningstar, Inc. The Morningstar name and logo are registered marks of 
            Morningstar, Inc. Advisory fees reduce investment returns. Consolidated investment product model portfolios used. Neither 
            financial advisors at Advisys, Morningstar Investment Management nor affiliates of either Advisys, Morningstar Investment Management is acting 
            in the capacity of a licensed investment adviser, individual investors should consult a licensed and/or the investment adviser making 
            investment recommendations make no warranties, express or implied, as results to be obtained from use of information or advice herein. The sole 
            purpose of performance statistics and other data is to quantify the expected return for each risk component being considered, where statistical judgment of a financial advisor in making their investment decisions. Individual investors should consult a licensed financial advisor in making the 
            presentation of performance statistics and other data.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};