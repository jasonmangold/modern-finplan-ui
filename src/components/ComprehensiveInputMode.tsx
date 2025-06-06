
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";
import { ClientInputHub } from "./ClientInputHub";

const inputSections = [
  { id: "personal", label: "Personal & Demographics", completed: true },
  { id: "income", label: "Income & Employment", completed: true },
  { id: "savings", label: "Savings & Investments", completed: false },
  { id: "expenses", label: "Expenses & Cash Flow", completed: true },
  { id: "assets", label: "Assets & Liabilities", completed: false },
  { id: "insurance", label: "Insurance & Protection", completed: false },
];

export const ComprehensiveInputMode = () => {
  const completedSections = inputSections.filter(section => section.completed).length;
  const completionPercentage = (completedSections / inputSections.length) * 100;

  return (
    <div className="h-full flex gap-6">
      {/* Progress Sidebar */}
      <div className="w-80 space-y-4">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Input Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-600">
                  {completedSections} of {inputSections.length} completed
                </span>
                <span className="text-lg font-medium">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              
              <div className="space-y-3 mt-6">
                {inputSections.map((section) => (
                  <div key={section.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    {section.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={`text-base ${section.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                      {section.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Input Area */}
      <div className="flex-1">
        <ClientInputHub />
      </div>
    </div>
  );
};
