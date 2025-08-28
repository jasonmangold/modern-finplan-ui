import { useState, useEffect } from "react";
import { TopNavigation } from "./TopNavigation";
import { ClientSelector } from "./ClientSelector";
import { SaveSection } from "./SaveSection";
import { EnhancedSearchBar } from "./search/EnhancedSearchBar";
import { UserMenu } from "./UserMenu";
export const Header = () => {
  const [saveState, setSaveState] = useState<"initial" | "loading" | "success">("initial");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const [clientFiles, setClientFiles] = useState<string[]>(["No Client Selected"]);
  const [selectedClient, setSelectedClient] = useState("No Client Selected");

  // Listen for changes in inputs or checkboxes
  useEffect(() => {
    const handleInputChange = () => {
      setHasUnsavedChanges(true);
      setSaveState("initial");
    };
    const handleCheckboxChange = () => {
      setHasUnsavedChanges(true);
      setSaveState("initial");
    };

    // Listen for input changes
    document.addEventListener('input', handleInputChange);
    document.addEventListener('change', handleCheckboxChange);
    return () => {
      document.removeEventListener('input', handleInputChange);
      document.removeEventListener('change', handleCheckboxChange);
    };
  }, []);

  // Listen for form clearing events to reset header state
  useEffect(() => {
    const handleClearFormData = () => {
      console.log('Header: Resetting state after form clear');
      setHasUnsavedChanges(false);
      setSaveState("initial");
      setLastSavedTime(null);
    };
    window.addEventListener('clearAllFormData', handleClearFormData);
    return () => {
      window.removeEventListener('clearAllFormData', handleClearFormData);
    };
  }, []);
  return <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-700/60 sticky top-0 z-50">
      <div className="h-16 flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div className="flex flex-col items-center flex-shrink-0">
            <img alt="eAdvisys" className="h-8 flex-shrink-0" src="/lovable-uploads/d049ffc1-bfa2-4803-a78b-769c4f72c83e.png" />
            <div className="text-xs text-muted-foreground font-medium">(800) 777-3162</div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <ClientSelector clientFiles={clientFiles} setClientFiles={setClientFiles} selectedClient={selectedClient} setSelectedClient={setSelectedClient} isFirstSave={isFirstSave} setIsFirstSave={setIsFirstSave} setHasUnsavedChanges={setHasUnsavedChanges} setSaveState={setSaveState} setLastSavedTime={setLastSavedTime} />
            <SaveSection saveState={saveState} setSaveState={setSaveState} hasUnsavedChanges={hasUnsavedChanges} setHasUnsavedChanges={setHasUnsavedChanges} lastSavedTime={lastSavedTime} setLastSavedTime={setLastSavedTime} isFirstSave={isFirstSave} setIsFirstSave={setIsFirstSave} clientFiles={clientFiles} setClientFiles={setClientFiles} setSelectedClient={setSelectedClient} />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
          <div className="hidden sm:block">
            <TopNavigation />
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <EnhancedSearchBar />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>;
};