
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
  const { sections, getCompletionPercentage, setActiveTab } = useFormContext();
  const completionPercentage = getCompletionPercentage();
  const completedSections = sections.filter(section => section.completed).length;

  const handleSectionClick = (sectionId: string) => {
    setActiveTab(sectionId);
  };

  return (
    <div className="h-full flex gap-6 p-6 bg-background dark:bg-gray-900">
      {/* Progress Sidebar - Compact layout */}
      <div className="w-80 flex flex-col">
        {/* Progress Section - Compact header and content */}
        <Card className="flex-1 flex flex-col bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Input Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 space-y-4">
            <div className="space-y-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {completedSections} of {sections.length} completed
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div className="space-y-2 flex-1">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleSectionClick(section.id)}
                >
                  {section.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${section.completed ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                    {section.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* See Results Button - Fixed at bottom */}
        <Button 
          onClick={onSeeResults}
          className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2.5 mt-4"
          size="lg"
        >
          <BarChart3 className="h-4 w-4" />
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
