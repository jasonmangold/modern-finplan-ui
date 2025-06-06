
import { useState } from "react";
import { ClientInputHub } from "@/components/ClientInputHub";
import { AnalysisTopicSelector } from "@/components/AnalysisTopicSelector";
import { TopicSpecificInputs } from "@/components/TopicSpecificInputs";
import { AnalysisVisualization } from "@/components/AnalysisVisualization";
import { ReportOutputPanel } from "@/components/ReportOutputPanel";

const Analysis = () => {
  const [selectedTopic, setSelectedTopic] = useState("retirement-accumulation");

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="grid grid-cols-12 h-full gap-6 p-6">
        {/* Left Panel: Client Input Hub */}
        <div className="col-span-4 h-full overflow-hidden">
          <ClientInputHub />
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

          {/* Report Actions */}
          <ReportOutputPanel selectedTopic={selectedTopic} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
