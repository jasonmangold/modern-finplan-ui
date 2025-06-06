
import { useState } from "react";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { ComprehensiveInputMode } from "@/components/ComprehensiveInputMode";
import { GoalsBasedMode } from "@/components/GoalsBasedMode";
import { GoalDetailView } from "@/components/GoalDetailView";

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
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="h-full flex flex-col p-6">
        {/* View Mode Toggle - only show when not in goal detail */}
        {!selectedGoal && (
          <div className="mb-6">
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
            <ComprehensiveInputMode />
          ) : (
            <GoalsBasedMode onGoalSelect={handleGoalSelect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
