
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, Settings, Eye, Edit3, GripVertical, Trash2, ChevronDown, ChevronRight, Template, Plus } from "lucide-react";
import { useState } from "react";

interface PresentationItem {
  id: string;
  name: string;
  source: "Analysis" | "Education" | "Calculators";
}

interface Template {
  id: string;
  name: string;
  description: string;
  reports: PresentationItem[];
  thumbnail: string;
}

const presentationItems: PresentationItem[] = [
  { id: "1", name: "Capital Available", source: "Analysis" },
  { id: "2", name: "Social Security Optimizer", source: "Calculators" }, 
  { id: "3", name: "Alternatives Retirement", source: "Analysis" },
  { id: "4", name: "Retirement Timeline", source: "Calculators" },
  { id: "5", name: "Retirement Fact Finder", source: "Education" },
  { id: "6", name: "Graph", source: "Analysis" }
];

const templates: Template[] = [
  {
    id: "1",
    name: "Retirement Planning Complete",
    description: "Comprehensive retirement analysis with all key reports",
    reports: [
      { id: "1", name: "Capital Available", source: "Analysis" },
      { id: "2", name: "Social Security Optimizer", source: "Calculators" },
      { id: "4", name: "Retirement Timeline", source: "Calculators" },
      { id: "5", name: "Retirement Fact Finder", source: "Education" }
    ],
    thumbnail: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "Quick Analysis",
    description: "Essential analysis reports for client meetings",
    reports: [
      { id: "1", name: "Capital Available", source: "Analysis" },
      { id: "6", name: "Graph", source: "Analysis" }
    ],
    thumbnail: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Education Focus",
    description: "Educational materials and calculators for client understanding",
    reports: [
      { id: "5", name: "Retirement Fact Finder", source: "Education" },
      { id: "2", name: "Social Security Optimizer", source: "Calculators" },
      { id: "4", name: "Retirement Timeline", source: "Calculators" }
    ],
    thumbnail: "/placeholder.svg"
  }
];

const titlePageDesigns = [
  { id: 1, name: "Modern Blue", thumbnail: "/placeholder.svg" },
  { id: 2, name: "Professional Gray", thumbnail: "/placeholder.svg" },
  { id: 3, name: "Classic White", thumbnail: "/placeholder.svg" },
  { id: 4, name: "Corporate Navy", thumbnail: "/placeholder.svg" }
];

const Presentation = () => {
  const [title, setTitle] = useState("No Title");
  const [clientName, setClientName] = useState("Paul Johnson & Sally Johnson");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [items, setItems] = useState(presentationItems);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<number | null>(null);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  
  // Presentation Options State
  const [presentationOptions, setPresentationOptions] = useState({
    titlePage: true,
    tableOfContents: true,
    personalProfile: false,
    recordOfReports: true,
    disclaimer: false,
    disclosure: false,
    disclaimerPosition: "beginning",
    header: false,
    headerText: "",
    footer: false,
    footerText: "",
    pageNumbers: false,
    pageNumberFormat: "page-x",
    presentationDate: true,
    presentationDateText: new Date().toLocaleDateString(),
    selectedTitlePage: 1
  });

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem) {
      setDropIndicator(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're leaving the container entirely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDropIndicator(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    if (draggedIndex === -1) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, removed);

    setItems(newItems);
    setDraggedItem(null);
    setDropIndicator(null);
  };

  const handleDragEnd = () => {
    // Clean up any stuck states
    setDraggedItem(null);
    setDropIndicator(null);
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const loadTemplate = (template: Template) => {
    setItems(template.reports);
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "Analysis": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Education": return "bg-green-100 text-green-700 border-green-200";
      case "Calculators": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Modern Header Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl p-8 border border-blue-100/50">
        <div className="flex items-start justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-3xl font-bold h-12"
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingTitle(false)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 text-balance">{title}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="modern-button text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                </>
              )}
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Prepared For</p>
              {isEditingClient ? (
                <div className="space-y-4 p-4 bg-white rounded-lg border">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">Phone Number</Label>
                    <Input
                      id="clientPhone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientAddress">Address</Label>
                    <Input
                      id="clientAddress"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setIsEditingClient(false)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingClient(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-gray-800">{clientName}</h2>
                    {clientPhone && <p className="text-sm text-gray-600">{clientPhone}</p>}
                    {clientAddress && <p className="text-sm text-gray-600">{clientAddress}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="modern-button text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    onClick={() => setIsEditingClient(true)}
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <p className="text-sm text-gray-500">Created: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <Card className="border-gray-200 shadow-sm">
        <Collapsible open={isTemplatesOpen} onOpenChange={setIsTemplatesOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Template className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg text-gray-900">Presentation Templates</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {templates.length} templates available
                  </span>
                  {isTemplatesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Template Preview</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.reports.slice(0, 3).map((report) => (
                        <Badge
                          key={report.id}
                          className={`text-xs ${getSourceColor(report.source)}`}
                        >
                          {report.source}
                        </Badge>
                      ))}
                      {template.reports.length > 3 && (
                        <Badge className="text-xs bg-gray-100 text-gray-600">
                          +{template.reports.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={() => loadTemplate(template)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Enhanced Reports Section */}
      <div className="smooth-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Presentation Reports</h3>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {items.length} reports selected
          </span>
        </div>
        
        <div 
          className="space-y-2 mb-8"
          onDragLeave={handleDragLeave}
        >
          {items.map((item, index) => (
            <div key={item.id}>
              {/* Simple blue line drop indicator */}
              {dropIndicator === index && (
                <div className="h-0.5 bg-blue-500 rounded-full mb-2" />
              )}
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-all duration-200 group cursor-move"
              >
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-blue-700">{item.name}</span>
                    <Badge className={`text-xs ${getSourceColor(item.source)}`}>
                      {item.source}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Button
                    size="sm"
                    variant="outline"
                    className="modern-button text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                  <Button size="sm" className="modern-button bg-green-600 text-white hover:bg-green-700">
                    Edit Inputs
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {/* Drop indicator for end of list */}
          {dropIndicator === items.length && (
            <div className="h-0.5 bg-blue-500 rounded-full" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-8 text-center border border-gray-200/50">
          <div className="max-w-md mx-auto space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Ready to generate your presentation?</h4>
            <p className="text-gray-600">Create a professional financial analysis presentation for your client.</p>
            <div className="flex justify-center gap-4 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="modern-button bg-green-600 text-white hover:bg-green-700 px-6">
                    <Settings className="h-4 w-4" />
                    Presentation Options
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Presentation Options</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                    {/* Left Column - General Options */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">General Options</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="titlePage" checked={presentationOptions.titlePage} />
                            <Label htmlFor="titlePage">Title Page</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="tableOfContents" checked={presentationOptions.tableOfContents} />
                            <Label htmlFor="tableOfContents">Table of Contents</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="personalProfile" checked={presentationOptions.personalProfile} />
                            <Label htmlFor="personalProfile">Personal Profile Page</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="recordOfReports" checked={presentationOptions.recordOfReports} />
                            <Label htmlFor="recordOfReports">Record of Reports</Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Legal & Compliance</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="disclaimer" checked={presentationOptions.disclaimer} />
                            <Label htmlFor="disclaimer">Disclaimer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="disclosure" checked={presentationOptions.disclosure} />
                            <Label htmlFor="disclosure">Disclosure</Label>
                          </div>
                          <div className="ml-6">
                            <RadioGroup value={presentationOptions.disclaimerPosition} className="flex gap-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="beginning" id="beginning" />
                                <Label htmlFor="beginning">Beginning</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="end" id="end" />
                                <Label htmlFor="end">End</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Page Layout</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="header" checked={presentationOptions.header} />
                              <Label htmlFor="header">Header</Label>
                            </div>
                            {presentationOptions.header && (
                              <Input
                                placeholder="Enter header text"
                                value={presentationOptions.headerText}
                                className="ml-6"
                              />
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="footer" checked={presentationOptions.footer} />
                              <Label htmlFor="footer">Footer</Label>
                            </div>
                            {presentationOptions.footer && (
                              <Input
                                placeholder="Enter footer text"
                                value={presentationOptions.footerText}
                                className="ml-6"
                              />
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="pageNumbers" checked={presentationOptions.pageNumbers} />
                              <Label htmlFor="pageNumbers">Page Numbers</Label>
                            </div>
                            {presentationOptions.pageNumbers && (
                              <RadioGroup value={presentationOptions.pageNumberFormat} className="ml-6 space-y-2">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="page-x" id="page-x" />
                                  <Label htmlFor="page-x">Page X</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="page-x-of-y" id="page-x-of-y" />
                                  <Label htmlFor="page-x-of-y">Page X of Y</Label>
                                </div>
                              </RadioGroup>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="presentationDate" checked={presentationOptions.presentationDate} />
                              <Label htmlFor="presentationDate">Presentation Date</Label>
                            </div>
                            {presentationOptions.presentationDate && (
                              <Input
                                type="date"
                                value={presentationOptions.presentationDateText}
                                className="ml-6"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Title Page Designs */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Title Page Design</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {titlePageDesigns.map((design) => (
                            <div
                              key={design.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                presentationOptions.selectedTitlePage === design.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="aspect-[4/3] bg-gray-100 rounded mb-2 flex items-center justify-center">
                                <span className="text-xs text-gray-500">Preview</span>
                              </div>
                              <p className="text-sm font-medium text-center">{design.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Apply Settings
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button className="modern-button bg-blue-600 text-white hover:bg-blue-700 px-6">
                <Eye className="h-4 w-4" />
                Preview Presentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
