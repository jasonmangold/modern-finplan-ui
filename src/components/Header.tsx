
import { useState, useEffect } from "react";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TopNavigation } from "./TopNavigation";
import { ToastSave } from "@/components/ui/toast-save";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Header = () => {
  const [saveState, setSaveState] = useState<"initial" | "loading" | "success">("initial");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [clientFiles, setClientFiles] = useState<string[]>(["No Client Selected"]);
  const [selectedClient, setSelectedClient] = useState("No Client Selected");
  const [newClientData, setNewClientData] = useState({
    title: "",
    description: "",
    notes: ""
  });

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

  const handleReset = () => {
    setHasUnsavedChanges(false);
    setSaveState("initial");
    console.log("Reset changes");
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
                  {clientFiles.map(client => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(hasUnsavedChanges || lastSavedTime) && (
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
                  ) : lastSavedTime ? (
                    <div className="text-sm text-gray-500">
                      Last saved: {lastSavedTime}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <TopNavigation />
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64 border-gray-200 bg-gray-50/50 hover:bg-white transition-colors focus:bg-white"
                />
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-lg">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
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
    </>
  );
};
