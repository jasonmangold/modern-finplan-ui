
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ComprehensiveInputMode } from "@/components/ComprehensiveInputMode";
import { GoalsBasedMode } from "@/components/GoalsBasedMode";
import { GoalDetailView } from "@/components/GoalDetailView";
import { FinancialFitnessScore } from "@/components/FinancialFitnessScore";
import { AnalysisGoals } from "@/components/AnalysisGoals";
import { FinancialInventory } from "@/components/FinancialInventory";
import { FactFinders } from "@/components/FactFinders";
import { FormProvider } from "@/contexts/FormContext";
import { Award } from "lucide-react";

const Analysis = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<"comprehensive" | "goals-based" | "fitness-score" | "analysis-goals" | "financial-inventory" | "fact-finders">("goals-based");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [initialReportView, setInitialReportView] = useState<string | null>(null);

  // Handle navigation from presentation page
  useEffect(() => {
    if (location.state) {
      const { goalId, reportView, fromPresentation, showInputs } = location.state as any;
      
      if (fromPresentation && goalId) {
        // Map goalId to specific view modes or goals
        if (goalId === 'goals') {
          setViewMode('analysis-goals');
        } else if (goalId === 'inventory') {
          setViewMode('financial-inventory');
        } else if (goalId === 'fitness') {
          setViewMode('fitness-score');
        } else if (goalId === 'survivor') {
          setSelectedGoal('survivor-needs');
          if (reportView) setInitialReportView(reportView);
        } else if (goalId === 'assetAllocation') {
          setSelectedGoal('asset-allocation');
          if (reportView) setInitialReportView(reportView);
        } else if (goalId === 'retirement') {
          setSelectedGoal('retirement-accumulation');
          if (reportView) setInitialReportView(reportView);
        } else {
          setSelectedGoal(goalId);
          if (reportView) setInitialReportView(reportView);
        }
      }
    }
  }, [location.state]);

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
    setViewMode("analysis-goals");
  };

  const handleBackFromAnalysisGoals = () => {
    setViewMode("goals-based");
  };

  const handleShowFinancialInventory = () => {
    setViewMode("financial-inventory");
  };

  const handleBackFromFinancialInventory = () => {
    setViewMode("goals-based");
  };

  const handleShowFactFinders = () => {
    setViewMode("fact-finders");
  };

  const handleBackFromFactFinders = () => {
    setViewMode("goals-based");
  };

  const handleViewModeChange = (value: string) => {
    setViewMode(value as "comprehensive" | "goals-based");
  };

  return (
    <FormProvider>
      <div className="h-full overflow-hidden">
        <div className="h-full flex flex-col">
          {/* View Mode Toggle - centered and only show when not in goal detail or fitness score or financial inventory or fact finders */}
          {!selectedGoal && viewMode !== "fitness-score" && viewMode !== "analysis-goals" && viewMode !== "financial-inventory" && viewMode !== "fact-finders" && (
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
                initialReportView={initialReportView}
              />
            ) : viewMode === "comprehensive" ? (
              <ComprehensiveInputMode onSeeResults={() => setViewMode("goals-based")} />
            ) : viewMode === "fitness-score" ? (
              <FinancialFitnessScore onBack={handleBackFromFitnessScore} />
            ) : viewMode === "analysis-goals" ? (
              <AnalysisGoals onBack={handleBackFromAnalysisGoals} />
            ) : viewMode === "financial-inventory" ? (
              <FinancialInventory onBack={handleBackFromFinancialInventory} />
            ) : viewMode === "fact-finders" ? (
              <FactFinders onBack={handleBackFromFactFinders} />
            ) : (
              <GoalsBasedMode 
                onGoalSelect={handleGoalSelect} 
                onShowFitnessScore={handleShowFitnessScore}
                onShowAnalysisGoals={handleShowAnalysisGoals}
                onShowFinancialInventory={handleShowFinancialInventory}
                onShowFactFinders={handleShowFactFinders}
              />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Analysis;
