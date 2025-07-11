import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, Settings, Eye, Edit3, GripVertical, Trash2, ChevronDown, ChevronRight, Layers, Plus, Upload, User, Building, Download, Import, Zap, Pencil } from "lucide-react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { GoalSelectionDialog } from "@/components/GoalSelectionDialog";
import { FastTrackInputDialog } from "@/components/FastTrackInputDialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { TextEditorModal } from "@/components/TextEditorModal";
import { usePresentationContext } from "@/contexts/PresentationContext";

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
    ]
  },
  {
    id: "2", 
    name: "Quick Analysis",
    description: "Essential analysis reports for client meetings",
    reports: [
      { id: "1", name: "Capital Available", source: "Analysis" },
      { id: "6", name: "Graph", source: "Analysis" }
    ]
  },
  {
    id: "3",
    name: "Education Focus",
    description: "Educational materials and calculators for client understanding",
    reports: [
      { id: "5", name: "Retirement Fact Finder", source: "Education" },
      { id: "2", name: "Social Security Optimizer", source: "Calculators" },
      { id: "4", name: "Retirement Timeline", source: "Calculators" }
    ]
  }
];

const titlePageDesigns = [
  { id: 1, name: "Modern Blue" },
  { id: 2, name: "Professional Gray" },
  { id: 3, name: "Classic White" },
  { id: 4, name: "Corporate Navy" }
];

const Presentation = () => {
  const [title, setTitle] = useState("No Title");
  const [clientName, setClientName] = useState("Paul Johnson & Sally Johnson");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Presentation");
  
  // Use presentation context instead of local state
  const { presentationItems: items, setPresentationItems: setItems, removePresentationItem } = usePresentationContext();
  
  // Company Information State
  const [companyInfo, setCompanyInfo] = useState({
    advisorName: "",
    designations: "",
    title: "",
    companyName: "",
    address: "",
    phone: "",
    mobile: "",
    fax: "",
    email: "",
    website: "",
    logo: null as File | null,
    advisorPhoto: null as File | null,
    disclaimer: "",
    disclosure: ""
  });

  // Presentation Defaults State (same structure as presentation options)
  const [presentationDefaults, setPresentationDefaults] = useState({
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

  // Fast Track states
  const [showGoalSelection, setShowGoalSelection] = useState(false);
  const [showFastTrackInput, setShowFastTrackInput] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const [editorModal, setEditorModal] = useState<{ open: boolean, field: string | null }>({ open: false, field: null });
  const [profile, setProfile] = useState({ bio: "" });
  const [editorDraft, setEditorDraft] = useState<string>("");

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
    removePresentationItem(itemId);
  };

  const loadTemplate = (template: Template) => {
    setItems(template.reports);
    setActiveTab("Presentation"); // Switch to presentation tab after loading template
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "Analysis": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Education": return "bg-green-100 text-green-700 border-green-200";
      case "Calculators": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'advisorPhoto') => {
    const file = event.target.files?.[0];
    if (file) {
      setCompanyInfo(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  // Template export/import handlers
  const handleExportTemplate = (template: Template) => {
    const data = {
      ...template,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTemplate = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const templateData = JSON.parse(event.target?.result as string);
            console.log("Imported template:", templateData);
            // Here you would add the template to your templates array
          } catch (error) {
            console.error("Error importing template:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Fast Track handlers
  const handleFastTrackClick = () => {
    setShowGoalSelection(true);
  };

  const handleGoalsSelected = (goals: string[]) => {
    setSelectedGoals(goals);
    setShowFastTrackInput(true);
  };

  const handleCreatePresentation = () => {
    // Auto-select reports based on selected goals
    const goalToReportsMap: Record<string, PresentationItem[]> = {
      retirement: [
        { id: "1", name: "Capital Available", source: "Analysis" },
        { id: "2", name: "Social Security Optimizer", source: "Calculators" },
        { id: "4", name: "Retirement Timeline", source: "Calculators" }
      ],
      education: [
        { id: "5", name: "Retirement Fact Finder", source: "Education" }
      ],
      // Add more mappings as needed
    };

    let newReports: PresentationItem[] = [];
    selectedGoals.forEach(goal => {
      if (goalToReportsMap[goal]) {
        newReports = [...newReports, ...goalToReportsMap[goal]];
      }
    });

    // Remove duplicates
    const uniqueReports = newReports.filter((report, index, self) => 
      index === self.findIndex(r => r.id === report.id)
    );

    setItems(uniqueReports);
    setActiveTab("Presentation");
  };

  const handleBackToGoalSelection = () => {
    setShowFastTrackInput(false);
    setShowGoalSelection(true);
  };

  const tabs = [
    { label: "Presentation", value: "Presentation" },
    { label: "Templates", value: "Templates" },
    { label: "Company Information", value: "Company Information" },
    { label: "Presentation Defaults", value: "Presentation Defaults" }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Animated Tabs - Moved to top */}
      <div className="flex justify-center">
        <AnimatedTabs
          tabs={tabs}
          defaultValue={activeTab}
          onValueChange={setActiveTab}
        />
      </div>

      {/* Modern Header Section - Only show on Presentation tab */}
      {activeTab === "Presentation" && (
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
      )}

      {/* Tab Content */}
      {activeTab === "Presentation" && (
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
      )}

      {activeTab === "Templates" && (
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg text-gray-900">Presentation Templates</CardTitle>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {templates.length} templates available
              </span>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleImportTemplate}
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <Import className="h-4 w-4 mr-2" />
                Import Template
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Fast Track Button */}
            <div className="mb-6 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-orange-600" />
                    Fast Track Presentation
                  </h3>
                  <p className="text-orange-700 mb-4">
                    Quickly create a presentation by selecting your financial goals and inputting key data. 
                    We'll automatically choose the best reports for your needs.
                  </p>
                </div>
                <Button 
                  onClick={handleFastTrackClick}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 text-lg shadow-lg"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Start Fast Track
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                >
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
                  <div className="flex gap-2">
                    <Button
                      onClick={() => loadTemplate(template)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button
                      onClick={() => handleExportTemplate(template)}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Company Information" && (
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg text-gray-900">Company Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Personal Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <div>
                  <Label htmlFor="advisorName">Advisor Name</Label>
                  <Input
                    id="advisorName"
                    value={companyInfo.advisorName}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, advisorName: e.target.value }))}
                    placeholder="Enter advisor name"
                  />
                </div>
                <div>
                  <Label htmlFor="designations">Designations</Label>
                  <Input
                    id="designations"
                    value={companyInfo.designations}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, designations: e.target.value }))}
                    placeholder="e.g., CFP®, ChFC®, CLU®"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={companyInfo.title}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Financial Advisor, Wealth Manager"
                  />
                </div>
                <div>
                  <Label htmlFor="advisorPhoto">Advisor Photo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="advisorPhoto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'advisorPhoto')}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('advisorPhoto')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {companyInfo.advisorPhoto ? companyInfo.advisorPhoto.name : 'Upload Photo'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Company Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.companyName}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="companyAddress">Address</Label>
                  <Input
                    id="companyAddress"
                    value={companyInfo.address}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter company address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input
                      id="companyPhone"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyMobile">Mobile</Label>
                    <Input
                      id="companyMobile"
                      value={companyInfo.mobile}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, mobile: e.target.value }))}
                      placeholder="Mobile number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="companyFax">Fax</Label>
                    <Input
                      id="companyFax"
                      value={companyInfo.fax}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, fax: e.target.value }))}
                      placeholder="Fax number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyWebsite">Website</Label>
                  <Input
                    id="companyWebsite"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="www.yourcompany.com"
                  />
                </div>
                <div>
                  <Label htmlFor="companyLogo">Company Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="companyLogo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'logo')}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('companyLogo')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {companyInfo.logo ? companyInfo.logo.name : 'Upload Logo'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Disclaimer/Disclosure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold mb-1 flex items-center gap-2">
                  Disclaimer
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditorDraft(companyInfo.disclaimer || "");
                      setEditorModal({ open: true, field: "disclaimer" });
                    }}
                    aria-label="Edit Disclaimer"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </label>
                <div
                  className={`prose prose-sm p-3 min-h-[48px] rounded border ${companyInfo.disclaimer ? "" : "text-gray-400"}`}
                  dangerouslySetInnerHTML={{
                    __html: companyInfo.disclaimer || "No disclaimer set. Click pencil to add."
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold mb-1 flex items-center gap-2">
                  Disclosure
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditorDraft(companyInfo.disclosure || "");
                      setEditorModal({ open: true, field: "disclosure" });
                    }}
                    aria-label="Edit Disclosure"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </label>
                <div
                  className={`prose prose-sm p-3 min-h-[48px] rounded border ${companyInfo.disclosure ? "" : "text-gray-400"}`}
                  dangerouslySetInnerHTML={{
                    __html: companyInfo.disclosure || "No disclosure set. Click pencil to add."
                  }}
                />
              </div>
            </div>

            {/* Edit My Profile */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                My Profile
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditorDraft(profile.bio || "");
                    setEditorModal({ open: true, field: "bio" });
                  }}
                  aria-label="Edit My Profile Bio"
                  className="ml-2"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </h3>
              <div
                className={`prose prose-sm p-3 min-h-[48px] rounded border ${profile.bio ? "" : "text-gray-400"}`}
                dangerouslySetInnerHTML={{
                  __html: profile.bio || "No bio set. Click pencil to add."
                }}
              />
            </div>

            {/* Editor Modal */}
            <TextEditorModal
              open={editorModal.open}
              title={
                editorModal.field === "disclaimer" ? "Edit Disclaimer"
                : editorModal.field === "disclosure" ? "Edit Disclosure"
                : editorModal.field === "bio" ? "Edit My Profile"
                : ""
              }
              initialValue={editorDraft}
              onSave={value => {
                if (editorModal.field === "disclaimer") {
                  setCompanyInfo(prev => ({ ...prev, disclaimer: value }));
                } else if (editorModal.field === "disclosure") {
                  setCompanyInfo(prev => ({ ...prev, disclosure: value }));
                } else if (editorModal.field === "bio") {
                  setProfile(prev => ({ ...prev, bio: value }));
                }
              }}
              onClose={() => setEditorModal({ open: false, field: null })}
            />

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Company Information</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Presentation Defaults" && (
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg text-gray-900">Presentation Defaults</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              {/* Left Column - General Options */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">General Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="defaultTitlePage" 
                        checked={presentationDefaults.titlePage}
                        onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, titlePage: checked as boolean }))}
                      />
                      <Label htmlFor="defaultTitlePage">Title Page</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="defaultTableOfContents" 
                        checked={presentationDefaults.tableOfContents}
                        onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, tableOfContents: checked as boolean }))}
                      />
                      <Label htmlFor="defaultTableOfContents">Table of Contents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="defaultPersonalProfile" 
                        checked={presentationDefaults.personalProfile}
                        onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, personalProfile: checked as boolean }))}
                      />
                      <Label htmlFor="defaultPersonalProfile">Personal Profile Page</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="defaultRecordOfReports" 
                        checked={presentationDefaults.recordOfReports}
                        onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, recordOfReports: checked as boolean }))}
                      />
                      <Label htmlFor="defaultRecordOfReports">Record of Reports</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Legal & Compliance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="defaultDisclaimer" 
                        checked={presentationDefaults.disclaimer}
                        onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, disclaimer: checked as boolean }))}
                      />
                      <Label htmlFor="defaultDisclaimer">Disclaimer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="defaultDisclosure" 
                        checked={presentationDefaults.disclosure}
                        onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, disclosure: checked as boolean }))}
                      />
                      <Label htmlFor="defaultDisclosure">Disclosure</Label>
                    </div>
                    <div className="ml-6">
                      <RadioGroup 
                        value={presentationDefaults.disclaimerPosition} 
                        className="flex gap-4"
                        onValueChange={(value) => setPresentationDefaults(prev => ({ ...prev, disclaimerPosition: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="beginning" id="defaultBeginning" />
                          <Label htmlFor="defaultBeginning">Beginning</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="end" id="defaultEnd" />
                          <Label htmlFor="defaultEnd">End</Label>
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
                        <Checkbox 
                          id="defaultHeader" 
                          checked={presentationDefaults.header}
                          onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, header: checked as boolean }))}
                        />
                        <Label htmlFor="defaultHeader">Header</Label>
                      </div>
                      {presentationDefaults.header && (
                        <Input
                          placeholder="Enter header text"
                          value={presentationDefaults.headerText}
                          onChange={(e) => setPresentationDefaults(prev => ({ ...prev, headerText: e.target.value }))}
                          className="ml-6"
                        />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="defaultFooter" 
                          checked={presentationDefaults.footer}
                          onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, footer: checked as boolean }))}
                        />
                        <Label htmlFor="defaultFooter">Footer</Label>
                      </div>
                      {presentationDefaults.footer && (
                        <Input
                          placeholder="Enter footer text"
                          value={presentationDefaults.footerText}
                          onChange={(e) => setPresentationDefaults(prev => ({ ...prev, footerText: e.target.value }))}
                          className="ml-6"
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="defaultPageNumbers" 
                          checked={presentationDefaults.pageNumbers}
                          onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, pageNumbers: checked as boolean }))}
                        />
                        <Label htmlFor="defaultPageNumbers">Page Numbers</Label>
                      </div>
                      {presentationDefaults.pageNumbers && (
                        <RadioGroup 
                          value={presentationDefaults.pageNumberFormat} 
                          className="ml-6 space-y-2"
                          onValueChange={(value) => setPresentationDefaults(prev => ({ ...prev, pageNumberFormat: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="page-x" id="defaultPageX" />
                            <Label htmlFor="defaultPageX">Page X</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="page-x-of-y" id="defaultPageXofY" />
                            <Label htmlFor="defaultPageXofY">Page X of Y</Label>
                          </div>
                        </RadioGroup>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="defaultPresentationDate" 
                          checked={presentationDefaults.presentationDate}
                          onCheckedChange={(checked) => setPresentationDefaults(prev => ({ ...prev, presentationDate: checked as boolean }))}
                        />
                        <Label htmlFor="defaultPresentationDate">Presentation Date</Label>
                      </div>
                      {presentationDefaults.presentationDate && (
                        <Input
                          type="date"
                          value={presentationDefaults.presentationDateText}
                          onChange={(e) => setPresentationDefaults(prev => ({ ...prev, presentationDateText: e.target.value }))}
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
                  <h3 className="text-lg font-medium mb-4">Default Title Page Design</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {titlePageDesigns.map((design) => (
                      <div
                        key={design.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          presentationDefaults.selectedTitlePage === design.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPresentationDefaults(prev => ({ ...prev, selectedTitlePage: design.id }))}
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
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Save Defaults
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Reset to System Defaults
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fast Track Dialogs */}
      <GoalSelectionDialog 
        open={showGoalSelection}
        onOpenChange={setShowGoalSelection}
        onGoalsSelected={handleGoalsSelected}
      />

      <FastTrackInputDialog 
        open={showFastTrackInput}
        onOpenChange={setShowFastTrackInput}
        selectedGoals={selectedGoals}
        onCreatePresentation={handleCreatePresentation}
        onBack={handleBackToGoalSelection}
      />
    </div>
  );
};

export default Presentation;
