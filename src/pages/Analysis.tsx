
import { useState } from "react";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { ComprehensiveInputMode } from "@/components/ComprehensiveInputMode";
import { GoalsBasedMode } from "@/components/GoalsBasedMode";
import { GoalDetailView } from "@/components/GoalDetailView";
import { FormProvider } from "@/contexts/FormContext";

const Analysis = () => {
  const [viewMode, setViewMode] = useState<"comprehensive" | "goals-based">("goals-based");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleBackToGoals = () => {
    setSelectedGoal(null);
  };

  return (
    <FormProvider>
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <div className="h-full flex flex-col">
          {/* View Mode Toggle - centered and only show when not in goal detail */}
          {!selectedGoal && (
            <div className="flex justify-center py-4 border-b bg-background">
              <ViewModeToggle 
                viewMode={viewMode} 
                onViewModeChange={setViewMode}
              />
            </div>
          )}
          
          {/* Full Screen Content */}
          <div className="flex-1 overflow-hidden">
            {selectedGoal ? (
              <GoalDetailView 
                goalId={selectedGoal} 
                onBack={handleBackToGoals}
              />
            ) : viewMode === "comprehensive" ? (
              <ComprehensiveInputMode onSeeResults={() => setViewMode("goals-based")} />
            ) : (
              <GoalsBasedMode onGoalSelect={handleGoalSelect} />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Analysis;
