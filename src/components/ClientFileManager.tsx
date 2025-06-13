
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, FileText, Trash2, Download, Copy, Edit3, Plus, ArrowUpDown, Calendar, BarChart3 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientFileManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientFiles: string[];
  setClientFiles: (files: string[] | ((prev: string[]) => string[])) => void;
  selectedClient: string;
  setSelectedClient: (client: string) => void;
}

interface ClientFile {
  name: string;
  description?: string;
  notes?: string;
  lastModified: string;
  reportsCount: number;
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
  const [editForm, setEditForm] = useState({ name: "", description: "", notes: "" });
  const [sortBy, setSortBy] = useState<"lastModified" | "reportsCount">("lastModified");

  // Convert string array to file objects, excluding "No Client Selected"
  const fileObjects: ClientFile[] = clientFiles
    .filter(name => name !== "No Client Selected")
    .map((name, index) => ({
      name,
      description: "Client financial planning data",
      notes: "Created on " + new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      reportsCount: Math.floor(Math.random() * 15) + 1
    }));

  // Sort files based on selected criteria
  const sortedFiles = [...fileObjects].sort((a, b) => {
    if (sortBy === "lastModified") {
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    } else {
      return b.reportsCount - a.reportsCount;
    }
  });

  const filteredFiles = sortedFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    setClientFiles(prev => prev.filter(file => file !== fileName));
    if (selectedClient === fileName) {
      setSelectedClient("No Client Selected");
    }
  };

  const handleExportFile = (fileName: string) => {
    const fileData = fileObjects.find(f => f.name === fileName);
    const data = {
      name: fileName,
      description: fileData?.description || "",
      notes: fileData?.notes || "",
      exportDate: new Date().toISOString(),
      data: {} // This would contain actual client data
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDuplicateFile = (fileName: string) => {
    const newName = `${fileName} (Copy)`;
    setClientFiles(prev => [...prev, newName]);
  };

  const handleEditFile = (fileName: string) => {
    const fileData = fileObjects.find(f => f.name === fileName);
    setEditForm({
      name: fileName,
      description: fileData?.description || "",
      notes: fileData?.notes || ""
    });
    setEditingFile(fileName);
  };

  const handleSaveEdit = () => {
    if (editingFile && editForm.name.trim()) {
      const oldName = editingFile;
      const newName = editForm.name.trim();
      
      setClientFiles(prev => prev.map(file => file === oldName ? newName : file));
      
      if (selectedClient === oldName) {
        setSelectedClient(newName);
      }
      
      setEditingFile(null);
      setEditForm({ name: "", description: "", notes: "" });
    }
  };

  const handleCreateNew = () => {
    setEditForm({ name: "", description: "", notes: "" });
    setEditingFile("new");
  };

  const handleSaveNew = () => {
    if (editForm.name.trim()) {
      setClientFiles(prev => [...prev, editForm.name.trim()]);
      setEditingFile(null);
      setEditForm({ name: "", description: "", notes: "" });
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
          <SheetHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold text-gray-900">Client Files</SheetTitle>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                {filteredFiles.length} files
              </Badge>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleImportClient}
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button 
                onClick={handleCreateNew}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Client
              </Button>
            </div>
            
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search client files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
              <Select value={sortBy} onValueChange={(value: "lastModified" | "reportsCount") => setSortBy(value)}>
                <SelectTrigger className="w-44">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastModified">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Last Updated
                    </div>
                  </SelectItem>
                  <SelectItem value="reportsCount">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Reports Count
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SheetHeader>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600 px-1">
              <span>Current: <span className="font-medium text-blue-600">{selectedClient}</span></span>
              <span className="text-xs">
                Sorted by {sortBy === "lastModified" ? "Last Updated" : "Reports Count"}
              </span>
            </div>
            
            <div className="space-y-2">
              {filteredFiles.map((file, index) => (
                <div
                  key={index}
                  className={`group p-3 border rounded-lg hover:shadow-sm transition-all duration-200 ${
                    file.name === selectedClient 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-1.5 rounded-md ${
                        file.name === selectedClient 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate text-sm">{file.name}</h3>
                        {file.description && (
                          <p className="text-xs text-gray-600 mt-0.5">{file.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-gray-500">Modified: {file.lastModified}</p>
                          <p className="text-xs text-gray-500">{file.reportsCount} reports</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {file.name !== selectedClient && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedClient(file.name);
                            onOpenChange(false);
                          }}
                          className="h-7 px-2 text-xs text-blue-600 hover:bg-blue-100"
                        >
                          Select
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditFile(file.name)}
                        className="h-7 w-7 p-0 hover:bg-gray-100"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDuplicateFile(file.name)}
                        className="h-7 w-7 p-0 hover:bg-gray-100"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleExportFile(file.name)}
                        className="h-7 w-7 p-0 hover:bg-gray-100"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteFile(file.name)}
                        className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit/Create Dialog */}
      <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingFile === "new" ? "Create New Client" : "Edit Client File"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Client Name *</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter client name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Input
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description (optional)"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
              <Textarea
                id="notes"
                value={editForm.notes}
                onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter notes (optional)"
                className="mt-1 min-h-[80px]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setEditingFile(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={editingFile === "new" ? handleSaveNew : handleSaveEdit}
                disabled={!editForm.name.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingFile === "new" ? "Create" : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
