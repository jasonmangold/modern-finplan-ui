
import { Toggle } from "@/components/ui/toggle";
import { Database, Target } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "comprehensive" | "goals-based";
  onViewModeChange: (mode: "comprehensive" | "goals-based") => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
      <Toggle
        pressed={viewMode === "comprehensive"}
        onPressedChange={() => onViewModeChange("comprehensive")}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:shadow-sm"
      >
        <Database className="h-4 w-4" />
        Comprehensive Input
      </Toggle>
      <Toggle
        pressed={viewMode === "goals-based"}
        onPressedChange={() => onViewModeChange("goals-based")}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:shadow-sm"
      >
        <Target className="h-4 w-4" />
        Goals-Based Planning
      </Toggle>
    </div>
  );
};
