
import { useState } from "react";
import { Search, Star, Edit, Download, Copy, Trash2, FileText, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ClientFile {
  id: string;
  name: string;
  lastUpdated: string;
  reportCount: number;
  notes: string;
  isPinned: boolean;
}

interface ClientFileManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientFiles: string[];
  setClientFiles: (files: string[]) => void;
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
  const [sortBy, setSortBy] = useState<"name" | "lastUpdated" | "reports">("lastUpdated");
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState("");

  // Mock data - in real app this would come from your state/API
  const mockFiles: ClientFile[] = clientFiles.slice(1).map((name, index) => ({
    id: `file-${index}`,
    name,
    lastUpdated: index === 0 ? "2 days ago" : index === 1 ? "1 week ago" : `${index + 1} weeks ago`,
    reportCount: Math.floor(Math.random() * 5) + 1,
    notes: index === 0 ? "Needs Roth review" : index === 1 ? "Show tax buckets" : "",
    isPinned: index < 2
  }));

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "reports":
        return b.reportCount - a.reportCount;
      case "lastUpdated":
      default:
        return 0; // Mock sorting
    }
  });

  const selectedFile = selectedFileId ? mockFiles.find(f => f.id === selectedFileId) : null;

  const handleEditNotes = () => {
    setTempNotes(selectedFile?.notes || "");
    setEditingNotes(true);
  };

  const handleSaveNotes = () => {
    // In real app, save to state/API
    setEditingNotes(false);
  };

  const handleExport = () => {
    console.log("Exporting client file:", selectedFile?.name);
  };

  const handleCopy = () => {
    console.log("Copying client file:", selectedFile?.name);
  };

  const handleDelete = () => {
    if (selectedFile) {
      const updatedFiles = clientFiles.filter(name => name !== selectedFile.name);
      setClientFiles(updatedFiles);
      setSelectedFileId(null);
    }
  };

  const handleDuplicate = () => {
    if (selectedFile) {
      const duplicateName = `${selectedFile.name} (Copy)`;
      setClientFiles([...clientFiles, duplicateName]);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-4xl w-full p-0">
        <div className="flex h-full">
          {/* Left Column - Client List */}
          <div className="w-1/2 border-r bg-gray-50/30 flex flex-col">
            <SheetHeader className="p-6 border-b bg-white">
              <SheetTitle>Client Files</SheetTitle>
              <div className="flex gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search client files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort by: {sortBy === "lastUpdated" ? "Last Updated" : sortBy === "name" ? "Name" : "Reports"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("lastUpdated")}>
                      Last Updated
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("name")}>
                      Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("reports")}>
                      # of Reports
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFiles.map((file) => (
                    <TableRow
                      key={file.id}
                      className={`cursor-pointer ${selectedFileId === file.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedFileId(file.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {file.isPinned && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          {file.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{file.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{file.reportCount}</Badge>
                      </TableCell>
                      <TableCell className="max-w-32 truncate text-sm text-gray-500" title={file.notes}>
                        {file.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Right Pane - File Details */}
          <div className="w-1/2 flex flex-col">
            {selectedFile ? (
              <>
                <div className="p-6 border-b bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {selectedFile.isPinned && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Last Updated:</span>
                      <span className="ml-2">{selectedFile.lastUpdated}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500"># of Reports:</span>
                      <span className="ml-2">{selectedFile.reportCount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-medium text-gray-700">Notes:</label>
                      {!editingNotes && (
                        <Button variant="ghost" size="sm" onClick={handleEditNotes}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {editingNotes ? (
                      <div className="space-y-2">
                        <Textarea
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Add notes about this client..."
                          className="min-h-24"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveNotes}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingNotes(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border min-h-24">
                        {selectedFile.notes || "No notes added yet."}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleExport} className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Client File
                    </Button>
                    <Button onClick={handleCopy} className="w-full justify-start" variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Client File
                    </Button>
                    <Button onClick={handleDuplicate} className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button onClick={handleDelete} className="w-full justify-start" variant="outline" disabled={selectedFile.name === selectedClient}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a client file to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
