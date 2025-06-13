
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Upload, FileText, Trash2, Download, Edit2, Copy, Save, X } from "lucide-react";

interface ClientFileManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientFiles: string[];
  setClientFiles: (files: string[] | ((prev: string[]) => string[])) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
}

interface ClientFileData {
  name: string;
  notes: string;
  description: string;
  lastModified: string;
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
  const [clientData, setClientData] = useState<Record<string, ClientFileData>>({
    "John & Mary Smith": {
      name: "John & Mary Smith",
      notes: "High net worth clients looking for comprehensive retirement planning",
      description: "Married couple, ages 58 and 56, seeking early retirement at 62",
      lastModified: new Date().toLocaleDateString()
    },
    "Robert Johnson": {
      name: "Robert Johnson",
      notes: "Small business owner needing succession planning",
      description: "52-year-old entrepreneur with manufacturing business",
      lastModified: new Date().toLocaleDateString()
    },
    "Sarah Williams": {
      name: "Sarah Williams",
      notes: "Single mother focused on education funding",
      description: "35-year-old professional with two young children",
      lastModified: new Date().toLocaleDateString()
    }
  });

  const [editData, setEditData] = useState<ClientFileData>({
    name: "",
    notes: "",
    description: "",
    lastModified: ""
  });

  const filteredFiles = clientFiles.filter(file =>
    file.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleDeleteFile = (fileName: string) => {
    if (fileName === "No Client Selected") return;
    setClientFiles(prev => prev.filter(file => file !== fileName));
    if (selectedClient === fileName) {
      setSelectedClient("No Client Selected");
    }
    // Remove from client data
    const newClientData = { ...clientData };
    delete newClientData[fileName];
    setClientData(newClientData);
  };

  const handleDuplicateFile = (fileName: string) => {
    const duplicateName = `${fileName} (Copy)`;
    setClientFiles(prev => [...prev, duplicateName]);
    
    // Copy client data if it exists
    if (clientData[fileName]) {
      setClientData(prev => ({
        ...prev,
        [duplicateName]: {
          ...clientData[fileName],
          name: duplicateName,
          lastModified: new Date().toLocaleDateString()
        }
      }));
    }
  };

  const handleExportFile = (fileName: string) => {
    const data = clientData[fileName] || {
      name: fileName,
      notes: "",
      description: "",
      lastModified: new Date().toLocaleDateString()
    };
    
    const exportData = {
      ...data,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEditFile = (fileName: string) => {
    setEditingFile(fileName);
    const fileData = clientData[fileName] || {
      name: fileName,
      notes: "",
      description: "",
      lastModified: new Date().toLocaleDateString()
    };
    setEditData(fileData);
  };

  const handleSaveEdit = () => {
    if (!editingFile) return;
    
    const updatedData = {
      ...editData,
      lastModified: new Date().toLocaleDateString()
    };
    
    // Update client data
    setClientData(prev => ({
      ...prev,
      [editingFile]: updatedData
    }));
    
    // If name changed, update the file list
    if (editData.name !== editingFile) {
      setClientFiles(prev => prev.map(file => file === editingFile ? editData.name : file));
      if (selectedClient === editingFile) {
        setSelectedClient(editData.name);
      }
    }
    
    setEditingFile(null);
  };

  const handleCancelEdit = () => {
    setEditingFile(null);
    setEditData({ name: "", notes: "", description: "", lastModified: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-in-right">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">Client File Manager</DialogTitle>
              <p className="text-gray-600 mt-1">Manage your client files and information</p>
            </div>
            <Button 
              onClick={handleImportClient}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Client
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search client files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600 px-2">
            <span>{filteredFiles.length} files found</span>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Current: {selectedClient}
            </Badge>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {filteredFiles.map((file, index) => (
              <div
                key={index}
                className={`border rounded-lg transition-colors ${
                  file === selectedClient ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {editingFile === file ? (
                  <div className="p-4 space-y-4">
                    <div>
                      <Label htmlFor="edit-name">Client Name</Label>
                      <Input
                        id="edit-name"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter client name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Input
                        id="edit-description"
                        value={editData.description}
                        onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-notes">Notes</Label>
                      <Textarea
                        id="edit-notes"
                        value={editData.notes}
                        onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Enter notes"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveEdit}>
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
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <FileText className="h-5 w-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <div className="font-medium">{file}</div>
                          {clientData[file]?.description && (
                            <p className="text-sm text-gray-600 mt-1">{clientData[file].description}</p>
                          )}
                          {clientData[file]?.notes && (
                            <p className="text-xs text-gray-500 mt-1 italic">{clientData[file].notes}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            Last modified: {clientData[file]?.lastModified || new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-4">
                        {file !== selectedClient && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedClient(file);
                              onOpenChange(false);
                            }}
                          >
                            Select
                          </Button>
                        )}
                        {file !== "No Client Selected" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditFile(file)}
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDuplicateFile(file)}
                              title="Duplicate"
                            >
                              <Copy className="h-4 w-4" />
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
                              onClick={() => handleDeleteFile(file)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
