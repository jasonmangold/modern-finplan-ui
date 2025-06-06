
import { useState } from "react";
import { ClientInputHub } from "@/components/ClientInputHub";
import { AnalysisTopicSelector } from "@/components/AnalysisTopicSelector";
import { AnalysisVisualization } from "@/components/AnalysisVisualization";
import { ReportOutputPanel } from "@/components/ReportOutputPanel";

const Analysis = () => {
  const [selectedTopic, setSelectedTopic] = useState("retirement-accumulation");

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="grid grid-cols-12 h-full gap-6 p-6">
        {/* Left Panel: Client Input Hub */}
        <div className="col-span-3 h-full overflow-hidden">
          <ClientInputHub />
        </div>

        {/* Center Panel: Analysis Topic & Visualization */}
        <div className="col-span-6 h-full overflow-y-auto space-y-6">
          <AnalysisTopicSelector 
            selectedTopic={selectedTopic} 
            onTopicChange={setSelectedTopic} 
          />
          <AnalysisVisualization selectedTopic={selectedTopic} />
        </div>

        {/* Right Panel: Report Outputs */}
        <div className="col-span-3 h-full overflow-hidden">
          <ReportOutputPanel selectedTopic={selectedTopic} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
