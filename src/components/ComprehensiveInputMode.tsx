
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, BarChart3 } from "lucide-react";
import { ClientInputHub } from "./ClientInputHub";
import { useFormContext } from "@/contexts/FormContext";

interface ComprehensiveInputModeProps {
  onSeeResults: () => void;
}

export const ComprehensiveInputMode = ({ onSeeResults }: ComprehensiveInputModeProps) => {
  const { sections, getCompletionPercentage } = useFormContext();
  const completionPercentage = getCompletionPercentage();
  const completedSections = sections.filter(section => section.completed).length;

  return (
    <div className="h-full flex gap-6 p-6">
      {/* Progress Sidebar */}
      <div className="w-80 flex flex-col space-y-4">
        <Card className="flex-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Input Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-600">
                  {completedSections} of {sections.length} completed
                </span>
                <span className="text-lg font-medium">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              
              <div className="space-y-3 mt-6 overflow-y-auto">
                {sections.map((section) => (
                  <div key={section.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    {section.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
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

        {/* See Results Button - Always visible at bottom */}
        <Button 
          onClick={onSeeResults}
          className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3"
          size="lg"
        >
          <BarChart3 className="h-5 w-5" />
          See Results
        </Button>
      </div>

      {/* Main Input Area */}
      <div className="flex-1 overflow-hidden">
        <ClientInputHub />
      </div>
    </div>
  );
};
