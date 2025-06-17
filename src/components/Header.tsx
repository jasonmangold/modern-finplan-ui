
import { useState, useEffect } from "react";
import { TopNavigation } from "./TopNavigation";
import { ClientSelector } from "./ClientSelector";
import { SaveSection } from "./SaveSection";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { useSearch } from "@/contexts/SearchContext";

export const Header = () => {
  const [saveState, setSaveState] = useState<"initial" | "loading" | "success">("initial");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const [clientFiles, setClientFiles] = useState<string[]>(["No Client Selected"]);
  const [selectedClient, setSelectedClient] = useState("No Client Selected");
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const { setGlobalSearchTerm } = useSearch();

  // Update global search when local search changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setGlobalSearchTerm]);

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

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-700/60 sticky top-0 z-50">
      <div className="h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/428ceeaf-44a8-4add-8c22-c75669029b06.png" 
              alt="eAdvisys" 
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center gap-3">
            <ClientSelector
              clientFiles={clientFiles}
              setClientFiles={setClientFiles}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              isFirstSave={isFirstSave}
              setIsFirstSave={setIsFirstSave}
              setHasUnsavedChanges={setHasUnsavedChanges}
              setSaveState={setSaveState}
              setLastSavedTime={setLastSavedTime}
            />
            <SaveSection
              saveState={saveState}
              setSaveState={setSaveState}
              hasUnsavedChanges={hasUnsavedChanges}
              setHasUnsavedChanges={setHasUnsavedChanges}
              lastSavedTime={lastSavedTime}
              setLastSavedTime={setLastSavedTime}
              isFirstSave={isFirstSave}
              setIsFirstSave={setIsFirstSave}
              clientFiles={clientFiles}
              setClientFiles={setClientFiles}
              setSelectedClient={setSelectedClient}
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <TopNavigation />
          
          <div className="flex items-center gap-4">
            <SearchBar
              localSearchTerm={localSearchTerm}
              setLocalSearchTerm={setLocalSearchTerm}
            />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
