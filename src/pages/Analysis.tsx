
import { useState } from "react";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { ComprehensiveInputMode } from "@/components/ComprehensiveInputMode";
import { GoalsBasedMode } from "@/components/GoalsBasedMode";
import { AnalysisTopicSelector } from "@/components/AnalysisTopicSelector";
import { TopicSpecificInputs } from "@/components/TopicSpecificInputs";
import { AnalysisVisualization } from "@/components/AnalysisVisualization";
import { ReportOutputPanel } from "@/components/ReportOutputPanel";

const Analysis = () => {
  const [viewMode, setViewMode] = useState<"comprehensive" | "goals-based">("goals-based");
  const [selectedTopic, setSelectedTopic] = useState("retirement-accumulation");

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="grid grid-cols-12 h-full gap-6 p-6">
        {/* Left Panel: Input Section */}
        <div className="col-span-4 h-full overflow-hidden">
          <div className="h-full flex flex-col space-y-4">
            {/* View Mode Toggle */}
            <ViewModeToggle 
              viewMode={viewMode} 
              onViewModeChange={setViewMode}
            />
            
            {/* Dynamic Content Based on Mode */}
            <div className="flex-1 overflow-hidden">
              {viewMode === "comprehensive" ? (
                <ComprehensiveInputMode />
              ) : (
                <GoalsBasedMode />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Analysis Workspace */}
        <div className="col-span-8 h-full overflow-y-auto space-y-6">
          {/* Topic Selector */}
          <AnalysisTopicSelector 
            selectedTopic={selectedTopic} 
            onTopicChange={setSelectedTopic} 
          />

          {/* Topic-Specific Inputs */}
          <TopicSpecificInputs selectedTopic={selectedTopic} />

          {/* Analysis Visualization */}
          <AnalysisVisualization selectedTopic={selectedTopic} />

          {/* Simplified Report Actions */}
          <ReportOutputPanel selectedTopic={selectedTopic} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
