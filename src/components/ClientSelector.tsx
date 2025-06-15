
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClientFileManager } from "./ClientFileManager";

interface ClientSelectorProps {
  clientFiles: string[];
  setClientFiles: (files: string[] | ((prev: string[]) => string[])) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  isFirstSave: boolean;
  setIsFirstSave: (value: boolean) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  setSaveState: (state: "initial" | "loading" | "success") => void;
  setLastSavedTime: (time: string | null) => void;
}

export const ClientSelector = ({
  clientFiles,
  setClientFiles,
  selectedClient,
  setSelectedClient,
  isFirstSave,
  setIsFirstSave,
  setHasUnsavedChanges,
  setSaveState,
  setLastSavedTime
}: ClientSelectorProps) => {
  const [clientSearch, setClientSearch] = useState("");
  const [showClientManager, setShowClientManager] = useState(false);

  const handleNewClient = () => {
    // Clear all form inputs across different pages
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    const selects = document.querySelectorAll('select');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const radioButtons = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    
    // Clear text inputs and textareas
    inputs.forEach(input => {
      if (input.type !== 'checkbox' && input.type !== 'radio') {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    
    textareas.forEach(textarea => {
      textarea.value = '';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    });
    
    // Uncheck all checkboxes (including reports)
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // Uncheck all radio buttons
    radioButtons.forEach(radio => {
      if (radio.checked) {
        radio.checked = false;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // Clear any React state that might be in forms
    // Dispatch a custom event that components can listen to for clearing their state
    window.dispatchEvent(new CustomEvent('clearAllFormData'));
    
    // Reset client selection to "No Client Selected" and set first save state
    setSelectedClient("No Client Selected");
    setIsFirstSave(true);
    setHasUnsavedChanges(false);
    setSaveState("initial");
    setLastSavedTime(null);
  };

  const handleClientChange = (value: string) => {
    if (value === "__new_client__") {
      handleNewClient();
      return;
    }
    setSelectedClient(value);
    setIsFirstSave(false);
  };

  // Get only last 3 recent clients (excluding "No Client Selected")
  const recentClients = clientFiles
    .filter(client => client !== "No Client Selected")
    .slice(-3)
    .reverse();

  // Show all clients for search, excluding "No Client Selected"
  const searchableClients = clientFiles.filter(client => client !== "No Client Selected");
  const filteredClients = searchableClients.filter(client =>
    client.toLowerCase().includes(clientSearch.toLowerCase())
  );

  // Get the display value for the select trigger
  const getSelectDisplayValue = () => {
    // If it's first save or explicitly "No Client Selected", show "No Client Selected"
    if (isFirstSave || selectedClient === "No Client Selected") {
      return "No Client Selected";
    }
    return selectedClient;
  };

  return (
    <>
      <Select value={getSelectDisplayValue()} onValueChange={handleClientChange}>
        <SelectTrigger className="w-52 border-gray-200 bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2 border-b">
            <Input
              placeholder="Search clients..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className="h-8"
            />
          </div>
          {/* New Client option at the TOP */}
          <SelectItem value="__new_client__">
            <span className="text-blue-600 font-medium">+ New Client</span>
          </SelectItem>
          {/* Show only last 3 recent clients */}
          {recentClients.map(client => (
            <SelectItem key={client} value={client}>{client}</SelectItem>
          ))}
          {/* Show filtered search results if search is active */}
          {clientSearch && filteredClients.length > 0 && (
            <>
              <div className="border-t my-1 pt-1">
                <div className="px-2 py-1 text-xs font-medium text-gray-500">Search Results</div>
              </div>
              {filteredClients.map(client => (
                <SelectItem key={`search-${client}`} value={client}>{client}</SelectItem>
              ))}
            </>
          )}
          <div className="border-t mt-1 pt-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setShowClientManager(true)}
            >
              View All Files
            </Button>
          </div>
        </SelectContent>
      </Select>

      <ClientFileManager 
        open={showClientManager} 
        onOpenChange={setShowClientManager}
        clientFiles={clientFiles}
        setClientFiles={setClientFiles}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
    </>
  );
};
