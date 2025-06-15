
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ToastSave } from "@/components/ui/toast-save";

interface SaveSectionProps {
  saveState: "initial" | "loading" | "success";
  setSaveState: (state: "initial" | "loading" | "success") => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
  lastSavedTime: string | null;
  setLastSavedTime: (time: string | null) => void;
  isFirstSave: boolean;
  setIsFirstSave: (value: boolean) => void;
  clientFiles: string[];
  setClientFiles: (files: string[] | ((prev: string[]) => string[])) => void;
  setSelectedClient: (client: string) => void;
}

export const SaveSection = ({
  saveState,
  setSaveState,
  hasUnsavedChanges,
  setHasUnsavedChanges,
  lastSavedTime,
  setLastSavedTime,
  isFirstSave,
  setIsFirstSave,
  clientFiles,
  setClientFiles,
  setSelectedClient
}: SaveSectionProps) => {
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [newClientData, setNewClientData] = useState({
    title: "",
    description: "",
    notes: ""
  });

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

  const handleSave = () => {
    if (isFirstSave) {
      setShowClientDialog(true);
    } else {
      performSave();
    }
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
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    setHasUnsavedChanges(false);
    setSaveState("initial");
    setShowResetDialog(false);
    console.log("Reset changes");
  };

  return (
    <>
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
    </>
  );
};
