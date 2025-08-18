import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Generate retirement timeline data matching the uploaded image
const generateRetirementTimelineData = () => {
  const data = [];
  
  // Starting values from the image
  const startingAge = 67;
  const endingAge = 85;
  
  // Data from the uploaded image
  const tableData = [
    { age: "67/65", need: 210362, earnedIncome: 74740, socialSecurity: 34233, otherIncome: 6000, earningsFromAssets: 79397, assetBalance: 1587170, shortfall: 0 },
    { age: "68/66", need: 215621, earnedIncome: 75861, socialSecurity: 34917, otherIncome: 6000, earningsFromAssets: 78484, assetBalance: 1566812, shortfall: 0 },
    { age: "69/67", need: 221012, earnedIncome: 0, socialSecurity: 64732, otherIncome: 6000, earningsFromAssets: 76028, assetBalance: 1492559, shortfall: 0 },
    { age: "70/68", need: 226537, earnedIncome: 0, socialSecurity: 66026, otherIncome: 6000, earningsFromAssets: 72113, assetBalance: 1410161, shortfall: 0 },
    { age: "71/69", need: 232201, earnedIncome: 0, socialSecurity: 67347, otherIncome: 6000, earningsFromAssets: 67778, assetBalance: 1319085, shortfall: 0 },
    { age: "72/70", need: 238006, earnedIncome: 0, socialSecurity: 68694, otherIncome: 6000, earningsFromAssets: 62996, assetBalance: 1218769, shortfall: 0 },
    { age: "73/71", need: 243956, earnedIncome: 0, socialSecurity: 70068, otherIncome: 6000, earningsFromAssets: 57737, assetBalance: 1108618, shortfall: 0 },
    { age: "74/72", need: 250056, earnedIncome: 0, socialSecurity: 71469, otherIncome: 6000, earningsFromAssets: 51973, assetBalance: 988005, shortfall: 0 },
    { age: "75/73", need: 256306, earnedIncome: 0, socialSecurity: 72898, otherIncome: 6000, earningsFromAssets: 45669, assetBalance: 856266, shortfall: 0 },
    { age: "76/74", need: 262714, earnedIncome: 0, socialSecurity: 74356, otherIncome: 6000, earningsFromAssets: 38793, assetBalance: 712702, shortfall: 0 },
    { age: "77/75", need: 269441, earnedIncome: 0, socialSecurity: 75843, otherIncome: 6000, earningsFromAssets: 32954, assetBalance: 618058, shortfall: 0 },
    { age: "78/76", need: 214677, earnedIncome: 0, socialSecurity: 77360, otherIncome: 6000, earningsFromAssets: 28010, assetBalance: 514751, shortfall: 0 },
    { age: "79/77", need: 220044, earnedIncome: 0, socialSecurity: 78908, otherIncome: 6000, earningsFromAssets: 22619, assetBalance: 402233, shortfall: 0 },
    { age: "80/78", need: 225545, earnedIncome: 0, socialSecurity: 80486, otherIncome: 6000, earningsFromAssets: 16755, assetBalance: 279928, shortfall: 0 },
    { age: "81/79", need: 231184, earnedIncome: 0, socialSecurity: 82095, otherIncome: 6000, earningsFromAssets: 10387, assetBalance: 147226, shortfall: 0 },
    { age: "82/80", need: 203112, earnedIncome: 0, socialSecurity: 83737, otherIncome: 6000, earningsFromAssets: 4414, assetBalance: 38266, shortfall: 0 },
    { age: "83/81", need: 208189, earnedIncome: 0, socialSecurity: 85412, otherIncome: 6000, earningsFromAssets: 0, assetBalance: 0, shortfall: 78511 },
    { age: "84/82", need: 213394, earnedIncome: 0, socialSecurity: 87120, otherIncome: 6000, earningsFromAssets: 0, assetBalance: 0, shortfall: 120274 },
    { age: "85/83", need: 218729, earnedIncome: 0, socialSecurity: 88863, otherIncome: 6000, earningsFromAssets: 0, assetBalance: 0, shortfall: 123866 }
  ];

  return tableData;
};

export const RetirementTimelineOutput = ({
  selectedForPresentation = []
}: {
  selectedForPresentation?: string[];
}) => {
  const timelineData = generateRetirementTimelineData();
  
  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Assumptions:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Retirement Rate of Return:</span>
                  <span className="font-medium">5.00%</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate of Inflation:</span>
                  <span className="font-medium">2.50%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Analysis Results:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total of Annual Shortfalls:</span>
                  <span className="font-medium text-red-600">$1,236,140</span>
                </div>
                <div className="flex justify-between">
                  <span>Additional Capital Required:</span>
                  <span className="font-medium text-red-600">$436,248</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="flex-1 overflow-hidden">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-lg font-semibold bg-slate-600 text-white py-2 rounded">
              Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <div className="overflow-auto h-full max-h-[calc(100vh-400px)]">
              <Table>
                <TableHeader className="bg-slate-600 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="text-white text-center font-semibold border-r border-slate-500">Ages</TableHead>
                    <TableHead className="text-white text-center font-semibold border-r border-slate-500">Need</TableHead>
                    <TableHead className="text-white text-center font-semibold border-r border-slate-500">Earned<br />Income</TableHead>
                    <TableHead className="text-white text-center font-semibold border-r border-slate-500">Social<br />Security</TableHead>
                    <TableHead className="text-white text-center font-semibold border-r border-slate-500">Other<br />Income</TableHead>
                    <TableHead className="text-white text-center font-semibold border-r border-slate-500">Earnings<br />from<br />Assets</TableHead>
                    <TableHead className="text-white text-center font-semibold border-r border-slate-500">Asset<br />Balance</TableHead>
                    <TableHead className="text-white text-center font-semibold">Annual<br />Shortfall</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Beginning Balance Row */}
                  <TableRow className="bg-slate-200 dark:bg-slate-700 font-medium">
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center border-r font-semibold">Beginning Balance</TableCell>
                    <TableCell className="text-center border-r font-semibold">$1,603,163</TableCell>
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                  
                  {/* Data Rows */}
                  {timelineData.map((row, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-800"}>
                      <TableCell className="text-center border-r font-medium text-slate-700 dark:text-slate-300">
                        {row.age}
                      </TableCell>
                      <TableCell className="text-center border-r font-medium">
                        {formatCurrency(row.need)}
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {row.earnedIncome > 0 ? formatCurrency(row.earnedIncome) : '0'}
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {formatCurrency(row.socialSecurity)}
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {formatCurrency(row.otherIncome)}
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {row.earningsFromAssets > 0 ? formatCurrency(row.earningsFromAssets) : '0'}
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {row.assetBalance > 0 ? formatCurrency(row.assetBalance) : '0'}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.shortfall > 0 ? (
                          <span className="text-red-600 font-medium">{formatCurrency(row.shortfall)}</span>
                        ) : (
                          '$0'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="text-xs text-muted-foreground italic text-center py-2">
        Values shown in this presentation are hypothetical and not a promise of future performance
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