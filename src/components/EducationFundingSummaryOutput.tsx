import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

interface EducationFundingSummaryOutputProps {
  selectedForPresentation: string[];
}

export const EducationFundingSummaryOutput = ({ selectedForPresentation }: EducationFundingSummaryOutputProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // PDF export functionality would be implemented here
    console.log("Exporting to PDF...");
  };

  const students = [
    {
      name: "Robert",
      ageToday: 11,
      beginAge: 18,
      currentAnnualCost: 32390,
      currentFundingBalance: 10000,
      currentMonthlySavings: 200,
      fundedPercentage: 25,
      shortfallPercentage: 75
    },
    {
      name: "Catherine", 
      ageToday: 9,
      beginAge: 18,
      currentAnnualCost: 33210,
      currentFundingBalance: 2000,
      currentMonthlySavings: 200,
      fundedPercentage: 35,
      shortfallPercentage: 65
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Education Funding Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">
              With education costs increasing at a rate that exceeds the general inflation rate, it is 
              important to prepare as early as possible.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Objective: Your goal is to meet the following education funding needs.
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border border-border p-3 text-left font-semibold">Name</th>
                    <th className="border border-border p-3 text-center font-semibold">Student Age Today</th>
                    <th className="border border-border p-3 text-center font-semibold">Student Begin Age</th>
                    <th className="border border-border p-3 text-center font-semibold">Current Annual Cost</th>
                    <th className="border border-border p-3 text-center font-semibold">Current Funding Balance</th>
                    <th className="border border-border p-3 text-center font-semibold">Current Monthly Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.name} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="border border-border p-3 font-medium">{student.name}</td>
                      <td className="border border-border p-3 text-center">{student.ageToday}</td>
                      <td className="border border-border p-3 text-center">{student.beginAge}</td>
                      <td className="border border-border p-3 text-center">${student.currentAnnualCost.toLocaleString()}</td>
                      <td className="border border-border p-3 text-center">${student.currentFundingBalance.toLocaleString()}</td>
                      <td className="border border-border p-3 text-center">${student.currentMonthlySavings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>For Robert, you will need additional monthly savings of $1,235.</p>
              <p>For Catherine, you will need additional monthly savings of $345.</p>
              <p>Assumes college inflation of 4.00% and rate of return on assets of 6.00%.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-6 text-center">
              Current Funding Program
            </h3>
            
            <div className="space-y-6">
              {students.map((student) => (
                <div key={student.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{student.name}</span>
                  </div>
                  <div className="relative h-8 bg-background border border-border rounded">
                    <div 
                      className="h-full bg-green-500 rounded-l"
                      style={{ width: `${student.fundedPercentage}%` }}
                    />
                    <div 
                      className="h-full bg-red-500 rounded-r absolute right-0 top-0"
                      style={{ width: `${student.shortfallPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center items-center gap-2 mt-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm">Applied Funds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm">Shortfall</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>20%</span>
                  <span>40%</span>
                  <span>60%</span>
                  <span>80%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Percent Funded
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic text-center">
              Values shown in this presentation are hypothetical and not a promise of future performance.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end pt-4">
        <Button onClick={handleExportPDF} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
        <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  );
};