
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, FileText, Trash2, Download, Copy, Edit3, Plus, ArrowUpDown, Calendar, BarChart3, ChevronUp, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

type SortField = "name" | "lastModified" | "reportsCount";
type SortDirection = "asc" | "desc";

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
  const [sortField, setSortField] = useState<SortField>("lastModified");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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
    let aValue, bValue;
    
    switch (sortField) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "lastModified":
        aValue = new Date(a.lastModified).getTime();
        bValue = new Date(b.lastModified).getTime();
        break;
      case "reportsCount":
        aValue = a.reportsCount;
        bValue = b.reportsCount;
        break;
      default:
        return 0;
    }
    
    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const filteredFiles = sortedFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />;
    }
    return sortDirection === "asc" ? 
      <ChevronUp className="h-4 w-4 ml-1" /> : 
      <ChevronDown className="h-4 w-4 ml-1" />;
  };

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
        <SheetContent
          className="w-full max-w-[100vw] h-[100vh] sm:w-full sm:max-w-[100vw] sm:h-[100vh] p-0 rounded-none overflow-y-auto"
          side="right"
        >
          <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
            <SheetHeader className="space-y-4 pb-6 px-8 pt-8">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Client Files</SheetTitle>
                <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                  {filteredFiles.length} files
                </Badge>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleImportClient}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button 
                  onClick={handleCreateNew}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white flex-1"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Client
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search client files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100"
                />
              </div>
            </SheetHeader>
            <div className="space-y-4 flex-1 flex flex-col px-8 pb-8 overflow-y-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 px-1">
                <span>Current: <span className="font-medium text-blue-600 dark:text-blue-400">{selectedClient}</span></span>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg flex-1 flex flex-col overflow-hidden">
                <Table className="flex-1 min-h-0">
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 select-none text-gray-900 dark:text-gray-100"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Client
                          {getSortIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 select-none text-gray-900 dark:text-gray-100"
                        onClick={() => handleSort("lastModified")}
                      >
                        <div className="flex items-center">
                          Last Updated
                          {getSortIcon("lastModified")}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 select-none text-gray-900 dark:text-gray-100"
                        onClick={() => handleSort("reportsCount")}
                      >
                        <div className="flex items-center">
                          Number of Reports
                          {getSortIcon("reportsCount")}
                        </div>
                      </TableHead>
                      <TableHead className="w-48 text-gray-900 dark:text-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFiles.map((file, index) => (
                      <TableRow
                        key={index}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 ${
                          file.name === selectedClient ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-md ${
                              file.name === selectedClient 
                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}>
                              <FileText className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{file.name}</h3>
                              {file.description && (
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{file.description}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {file.lastModified}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {file.reportsCount}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {file.name !== selectedClient && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedClient(file.name);
                                  onOpenChange(false);
                                }}
                                className="h-7 px-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                              >
                                Select
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditFile(file.name)}
                              className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                              title="Edit"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDuplicateFile(file.name)}
                              className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                              title="Duplicate"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleExportFile(file.name)}
                              className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                              title="Export"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteFile(file.name)}
                              className="h-7 w-7 p-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Delete"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit/Create Dialog */}
      <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              {editingFile === "new" ? "Create New Client" : "Edit Client File"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-gray-100">Client Name *</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter client name"
                className="mt-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-900 dark:text-gray-100">Description</Label>
              <Input
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description (optional)"
                className="mt-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-900 dark:text-gray-100">Notes</Label>
              <Textarea
                id="notes"
                value={editForm.notes}
                onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter notes (optional)"
                className="mt-1 min-h-[80px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setEditingFile(null)}
                className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                onClick={editingFile === "new" ? handleSaveNew : handleSaveEdit}
                disabled={!editForm.name.trim()}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
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
