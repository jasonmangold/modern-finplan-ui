
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Circle, BarChart3, RefreshCw } from "lucide-react";
import { ClientInputHub } from "./ClientInputHub";
import { useFormContext } from "@/contexts/FormContext";

interface ComprehensiveInputModeProps {
  onSeeResults: () => void;
}

export const ComprehensiveInputMode = ({ onSeeResults }: ComprehensiveInputModeProps) => {
  const { sections, getCompletionPercentage, clearAllData, loadClientData, setActiveTab } = useFormContext();
  const completionPercentage = getCompletionPercentage();
  const completedSections = sections.filter(section => section.completed).length;

  const handleSectionClick = (sectionId: string) => {
    setActiveTab(sectionId);
  };

  const handleNewClient = () => {
    clearAllData();
  };

  const handleClientSelect = (clientName: string) => {
    if (clientName && clientName !== "new") {
      loadClientData(clientName);
    }
  };

  return (
    <div className="h-full flex gap-6 p-6">
      {/* Progress Sidebar - Fixed height with proper flex */}
      <div className="w-80 flex flex-col">
        {/* Client Selection */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Client Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select onValueChange={handleClientSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select client..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paul and Sally Johnson">Paul and Sally Johnson</SelectItem>
                <SelectItem value="new">New Client</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={handleNewClient}
              className="w-full flex items-center gap-2"
              size="sm"
            >
              <RefreshCw className="h-4 w-4" />
              New Client
            </Button>
          </CardContent>
        </Card>

        {/* Progress Section - Flexible height */}
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="pb-4 flex-shrink-0">
            <CardTitle className="text-xl">Input Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 min-h-0">
            <div className="space-y-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-600">
                  {completedSections} of {sections.length} completed
                </span>
                <span className="text-lg font-medium">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </div>
            
            <div className="space-y-3 mt-6 flex-1 overflow-y-auto">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSectionClick(section.id)}
                >
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
          </CardContent>
        </Card>

        {/* See Results Button - Fixed at bottom */}
        <Button 
          onClick={onSeeResults}
          className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4"
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
