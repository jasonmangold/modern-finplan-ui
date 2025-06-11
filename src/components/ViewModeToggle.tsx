
import { Toggle } from "@/components/ui/toggle";
import { Database, Target } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "comprehensive" | "goals-based";
  onViewModeChange: (mode: "comprehensive" | "goals-based") => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="relative inline-flex items-center gap-0 bg-muted p-1 rounded-lg">
      {/* Sliding background indicator */}
      <div 
        className={`absolute top-1 bottom-1 bg-background shadow-sm rounded-md transition-transform duration-300 ease-out ${
          viewMode === "comprehensive" 
            ? "left-1 w-[calc(50%-4px)]" 
            : "left-1/2 w-[calc(50%-4px)]"
        }`}
      />
      
      <Toggle
        pressed={viewMode === "comprehensive"}
        onPressedChange={() => onViewModeChange("comprehensive")}
        className="relative z-10 flex items-center gap-2 px-6 py-2 text-sm font-medium border-0 bg-transparent hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:shadow-none"
      >
        <Database className="h-4 w-4" />
        Comprehensive Input
      </Toggle>
      <Toggle
        pressed={viewMode === "goals-based"}
        onPressedChange={() => onViewModeChange("goals-based")}
        className="relative z-10 flex items-center gap-2 px-6 py-2 text-sm font-medium border-0 bg-transparent hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:shadow-none"
      >
        <Target className="h-4 w-4" />
        Goals-Based Planning
      </Toggle>
    </div>
  );
};
