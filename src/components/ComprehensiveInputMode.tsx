
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";
import { ClientInputHub } from "./ClientInputHub";

const inputSections = [
  { id: "personal", label: "Client Overview", completed: true },
  { id: "financial", label: "Income & Employment", completed: true },
  { id: "protection", label: "Insurance", completed: false },
  { id: "planning", label: "Investment Profile", completed: true },
];

export const ComprehensiveInputMode = () => {
  const completedSections = inputSections.filter(section => section.completed).length;
  const completionPercentage = (completedSections / inputSections.length) * 100;

  return (
    <div className="h-full space-y-6">
      {/* Progress Tracker */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Input Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {completedSections} of {inputSections.length} sections completed
              </span>
              <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {inputSections.map((section) => (
                <div key={section.id} className="flex items-center gap-2">
                  {section.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={`text-sm ${section.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {section.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Input Hub */}
      <ClientInputHub />
    </div>
  );
};
