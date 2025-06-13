
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Upload, FileText, Trash2, Download, Copy, Edit3, Save, X } from "lucide-react";

interface ClientFile {
  name: string;
  notes?: string;
  description?: string;
  lastModified: string;
}

interface ClientFileManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientFiles: string[];
  setClientFiles: (files: string[] | ((prev: string[]) => string[])) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
}

export const ClientFileManager = ({ 
  open, 
  onOpenChange, 
  clientFiles, 
  setClientFiles, 
  selectedClient, 
  setSelectedClient 
}: ClientFileManagerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [fileMetadata, setFileMetadata] = useState<Record<string, ClientFile>>({});
  const [editForm, setEditForm] = useState({ name: "", notes: "", description: "" });

  // Convert string array to ClientFile objects
  const clientFileObjects: ClientFile[] = clientFiles.map(fileName => ({
    name: fileName,
    notes: fileMetadata[fileName]?.notes || "",
    description: fileMetadata[fileName]?.description || "",
    lastModified: fileMetadata[fileName]?.lastModified || new Date().toLocaleDateString()
  }));

  const filteredFiles = clientFileObjects.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImportClient = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.csv";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            let importedClients: string[] = [];
            
            if (file.name.endsWith('.json')) {
              const data = JSON.parse(content);
              importedClients = Array.isArray(data) ? data : [data.name || `Imported ${Date.now()}`];
            } else if (file.name.endsWith('.csv')) {
              const lines = content.split('\n').filter(line => line.trim());
              importedClients = lines.slice(1).map(line => line.split(',')[0] || `Client ${Date.now()}`);
            }
            
            if (importedClients.length > 0) {
              setClientFiles(prev => [...prev, ...importedClients]);
              console.log(`Imported ${importedClients.length} clients`);
            }
          } catch (error) {
            console.error("Error importing file:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleEditFile = (file: ClientFile) => {
    setEditingFile(file.name);
    setEditForm({
      name: file.name,
      notes: file.notes || "",
      description: file.description || ""
    });
  };

  const handleSaveEdit = () => {
    if (editingFile && editForm.name) {
      // Update the file name in the array if it changed
      if (editForm.name !== editingFile) {
        setClientFiles(prev => prev.map(name => name === editingFile ? editForm.name : name));
        if (selectedClient === editingFile) {
          setSelectedClient(editForm.name);
        }
      }
      
      // Update metadata
      setFileMetadata(prev => ({
        ...prev,
        [editForm.name]: {
          name: editForm.name,
          notes: editForm.notes,
          description: editForm.description,
          lastModified: new Date().toLocaleDateString()
        }
      }));
      
      setEditingFile(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingFile(null);
    setEditForm({ name: "", notes: "", description: "" });
  };

  const handleDeleteFile = (fileName: string) => {
    if (fileName === "No Client Selected") return;
    setClientFiles(prev => prev.filter(file => file !== fileName));
    if (selectedClient === fileName) {
      setSelectedClient("No Client Selected");
    }
    // Remove metadata
    setFileMetadata(prev => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });
  };

  const handleDuplicateFile = (file: ClientFile) => {
    const newName = `${file.name} (Copy)`;
    setClientFiles(prev => [...prev, newName]);
    setFileMetadata(prev => ({
      ...prev,
      [newName]: {
        name: newName,
        notes: file.notes || "",
        description: file.description || "",
        lastModified: new Date().toLocaleDateString()
      }
    }));
  };

  const handleExportFile = (file: ClientFile) => {
    const data = {
      name: file.name,
      notes: file.notes,
      description: file.description,
      exportDate: new Date().toISOString(),
      data: {} // This would contain actual client data
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">Client File Manager</SheetTitle>
            <Button 
              onClick={handleImportClient}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Client
            </Button>
          </div>
        </SheetHeader>
        
        <div className="space-y-4 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search client files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600 px-2">
              <span>{filteredFiles.length} files found</span>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Current: {selectedClient}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {filteredFiles.map((file, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 transition-colors ${
                    file.name === selectedClient ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {editingFile === file.name ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="edit-name">Client Name</Label>
                        <Input
                          id="edit-name"
                          value={editForm.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Input
                          id="edit-description"
                          value={editForm.description}
                          onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Brief description..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-notes">Notes</Label>
                        <Textarea
                          id="edit-notes"
                          value={editForm.notes}
                          onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Additional notes..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium truncate">{file.name}</div>
                            {file.description && (
                              <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                            )}
                            <p className="text-xs text-gray-500">Last modified: {file.lastModified}</p>
                            {file.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">"{file.notes}"</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {file.name !== selectedClient && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedClient(file.name);
                                onOpenChange(false);
                              }}
                            >
                              Select
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditFile(file)}
                            title="Edit"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleExportFile(file)}
                            title="Export"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDuplicateFile(file)}
                            title="Duplicate"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {file.name !== "No Client Selected" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteFile(file.name)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
