import { useState, useEffect } from "react";
import { Search, User, HelpCircle, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TopNavigation } from "./TopNavigation";
import { ToastSave } from "@/components/ui/toast-save";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ClientFileManager } from "./ClientFileManager";
import { SettingsDialog } from "./SettingsDialog";
import { useSearch } from "@/contexts/SearchContext";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const [saveState, setSaveState] = useState<"initial" | "loading" | "success">("initial");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showClientManager, setShowClientManager] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [clientFiles, setClientFiles] = useState<string[]>(["No Client Selected"]);
  const [selectedClient, setSelectedClient] = useState("No Client Selected");
  const [clientSearch, setClientSearch] = useState("");
  const [newClientData, setNewClientData] = useState({
    title: "",
    description: "",
    notes: ""
  });
  const [showSettings, setShowSettings] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
  const location = useLocation();

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

  const handleSave = () => {
    if (isFirstSave) {
      setShowClientDialog(true);
    } else {
      performSave();
    }
  };

  const performSave = () => {
    setSaveState("loading");
    // Simulate save operation
    setTimeout(() => {
      setSaveState("success");
      setHasUnsavedChanges(false);
      const now = new Date();
      setLastSavedTime(now.toLocaleTimeString());
      setTimeout(() => {
        setSaveState("initial");
      }, 2000);
    }, 1500);
  };

  const handleClientSave = () => {
    if (newClientData.title.trim()) {
      const newClient = newClientData.title;
      setClientFiles(prev => [...prev, newClient]);
      setSelectedClient(newClient);
      setIsFirstSave(false);
      setShowClientDialog(false);
      performSave();
      setNewClientData({ title: "", description: "", notes: "" });
    }
  };

  const handleNewClient = () => {
    // Clear all form inputs and uncheck reports
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    const selects = document.querySelectorAll('select');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    
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
    
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    
    // Reset to "No Client Selected"
    setSelectedClient("No Client Selected");
    setIsFirstSave(true);
    setHasUnsavedChanges(false);
    setSaveState("initial");
    setLastSavedTime(null);
  };

  const handleReset = () => {
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    setHasUnsavedChanges(false);
    setSaveState("initial");
    setShowResetDialog(false);
    console.log("Reset changes");
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

  const handleHelp = () => {
    console.log("Help clicked");
  };

  const handleSampleFiles = () => {
    console.log("Sample Files clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  // Determine search placeholder based on current page
  const getSearchPlaceholder = () => {
    if (location.pathname === '/education') {
      return 'Search reports...';
    }
    return 'Search...';
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="h-16 flex items-center justify-between px-8">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              eAdvisys
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedClient} onValueChange={setSelectedClient}>
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
                  {/* Show "No Client Selected" option */}
                  <SelectItem value="No Client Selected">No Client Selected</SelectItem>
                  {/* New Client option */}
                  <SelectItem value="__new_client__" onSelect={handleNewClient}>
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
              <div className="flex items-center gap-3">
                {hasUnsavedChanges ? (
                  <ToastSave
                    state={saveState}
                    onSave={handleSave}
                    onReset={handleReset}
                    saveText="Save"
                    resetText="Reset"
                    loadingText="Saving..."
                    successText="Saved!"
                    initialText="Unsaved changes"
                    className="bg-blue-50 border-blue-200 text-blue-700"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full"
                    >
                      Save
                    </Button>
                    {lastSavedTime && (
                      <div className="text-sm text-gray-500">
                        Last saved: {lastSavedTime}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <TopNavigation />
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder={getSearchPlaceholder()}
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  className="pl-10 w-64 border-gray-200 bg-gray-50/50 hover:bg-white transition-colors focus:bg-white"
                />
                {localSearchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocalSearchTerm("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-lg">
                    <User className="h-5 w-5 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
                  <DropdownMenuItem onClick={handleHelp} className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSampleFiles} className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    Sample Files
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSettings(true)} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Client File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Client File Title *</label>
              <Input
                value={newClientData.title}
                onChange={(e) => setNewClientData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter client file title"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={newClientData.description}
                onChange={(e) => setNewClientData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description (optional)"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Input
                value={newClientData.notes}
                onChange={(e) => setNewClientData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter notes (optional)"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowClientDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleClientSave}
                disabled={!newClientData.title.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save Client File
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Discard Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to discard your changes? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              No
            </Button>
            <Button 
              onClick={confirmReset}
              variant="destructive"
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ClientFileManager 
        open={showClientManager} 
        onOpenChange={setShowClientManager}
        clientFiles={clientFiles}
        setClientFiles={setClientFiles}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />

      <SettingsDialog 
        open={showSettings} 
        onOpenChange={setShowSettings} 
      />
    </>
  );
};
