
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, FileText, Trash2, Download } from "lucide-react";

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
  };

  const handleExportFile = (fileName: string) => {
    const data = {
      name: fileName,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Client File Manager</DialogTitle>
            <Button 
              onClick={handleImportClient}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Client
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
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
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                    file === selectedClient ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <span className="font-medium">{file}</span>
                      <p className="text-sm text-gray-500">Last modified: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
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
                          onClick={() => handleExportFile(file)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteFile(file)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
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
      </DialogContent>
    </Dialog>
  );
};
