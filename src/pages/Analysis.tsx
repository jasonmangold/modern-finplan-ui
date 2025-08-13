
import { useState } from "react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ComprehensiveInputMode } from "@/components/ComprehensiveInputMode";
import { GoalsBasedMode } from "@/components/GoalsBasedMode";
import { GoalDetailView } from "@/components/GoalDetailView";
import { FinancialFitnessScore } from "@/components/FinancialFitnessScore";
import { FinancialInventory } from "@/components/FinancialInventory";
import { FormProvider } from "@/contexts/FormContext";
import { Award } from "lucide-react";

const Analysis = () => {
  const [viewMode, setViewMode] = useState<"comprehensive" | "goals-based" | "fitness-score" | "financial-inventory">("goals-based");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleBackToGoals = () => {
    setSelectedGoal(null);
  };

  const handleShowFitnessScore = () => {
    setViewMode("fitness-score");
  };

  const handleBackFromFitnessScore = () => {
    setViewMode("goals-based");
  };

  const handleShowAnalysisGoals = () => {
    // Placeholder for Analysis Goals functionality
    console.log("Analysis Goals clicked");
  };

  const handleShowFinancialInventory = () => {
    setViewMode("financial-inventory");
  };

  const handleBackFromFinancialInventory = () => {
    setViewMode("goals-based");
  };

  const handleViewModeChange = (value: string) => {
    setViewMode(value as "comprehensive" | "goals-based");
  };

  return (
    <FormProvider>
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <div className="h-full flex flex-col">
          {/* View Mode Toggle - centered and only show when not in goal detail or fitness score or financial inventory */}
          {!selectedGoal && viewMode !== "fitness-score" && viewMode !== "financial-inventory" && (
            <div className="flex justify-center py-4 border-b border-gray-200 dark:border-gray-700 bg-background dark:bg-gray-900">
              <AnimatedTabs 
                tabs={[
                  { label: "Comprehensive Input", value: "comprehensive" },
                  { label: "Goals-Based Planning", value: "goals-based" }
                ]}
                defaultValue={viewMode}
                onValueChange={handleViewModeChange}
              />
            </div>
          )}
          
          {/* Full Screen Content */}
          <div className="flex-1 overflow-hidden bg-background dark:bg-gray-900">
            {selectedGoal ? (
              <GoalDetailView 
                goalId={selectedGoal} 
                onBack={handleBackToGoals}
              />
            ) : viewMode === "comprehensive" ? (
              <ComprehensiveInputMode onSeeResults={() => setViewMode("goals-based")} />
            ) : viewMode === "fitness-score" ? (
              <FinancialFitnessScore onBack={handleBackFromFitnessScore} />
            ) : viewMode === "financial-inventory" ? (
              <FinancialInventory onBack={handleBackFromFinancialInventory} />
            ) : (
              <GoalsBasedMode 
                onGoalSelect={handleGoalSelect} 
                onShowFitnessScore={handleShowFitnessScore}
                onShowAnalysisGoals={handleShowAnalysisGoals}
                onShowFinancialInventory={handleShowFinancialInventory}
              />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Analysis;
