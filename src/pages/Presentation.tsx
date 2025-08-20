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
import { PresentationPreview } from "@/components/PresentationPreview";
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
const presentationItems: PresentationItem[] = [{
  id: "1",
  name: "Capital Available",
  source: "Analysis"
}, {
  id: "2",
  name: "Social Security Optimizer",
  source: "Calculators"
}, {
  id: "3",
  name: "Alternatives Retirement",
  source: "Analysis"
}, {
  id: "4",
  name: "Retirement Timeline",
  source: "Calculators"
}, {
  id: "5",
  name: "Retirement Fact Finder",
  source: "Education"
}, {
  id: "6",
  name: "Graph",
  source: "Analysis"
}];
const templates: Template[] = [{
  id: "1",
  name: "Retirement Planning Complete",
  description: "Comprehensive retirement analysis with all key reports",
  reports: [{
    id: "1",
    name: "Capital Available",
    source: "Analysis"
  }, {
    id: "2",
    name: "Social Security Optimizer",
    source: "Calculators"
  }, {
    id: "4",
    name: "Retirement Timeline",
    source: "Calculators"
  }, {
    id: "5",
    name: "Retirement Fact Finder",
    source: "Education"
  }]
}, {
  id: "2",
  name: "Quick Analysis",
  description: "Essential analysis reports for client meetings",
  reports: [{
    id: "1",
    name: "Capital Available",
    source: "Analysis"
  }, {
    id: "6",
    name: "Graph",
    source: "Analysis"
  }]
}, {
  id: "3",
  name: "Education Focus",
  description: "Educational materials and calculators for client understanding",
  reports: [{
    id: "5",
    name: "Retirement Fact Finder",
    source: "Education"
  }, {
    id: "2",
    name: "Social Security Optimizer",
    source: "Calculators"
  }, {
    id: "4",
    name: "Retirement Timeline",
    source: "Calculators"
  }]
}];
const titlePageDesigns = [{
  id: 1,
  name: "Modern Blue"
}, {
  id: 2,
  name: "Professional Gray"
}, {
  id: 3,
  name: "Classic White"
}, {
  id: 4,
  name: "Corporate Navy"
}];
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
  const {
    presentationItems: items,
    setPresentationItems: setItems,
    removePresentationItem,
    loadMockClient
  } = usePresentationContext();

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
  const [editorModal, setEditorModal] = useState<{
    open: boolean;
    field: string | null;
  }>({
    open: false,
    field: null
  });
  const [profile, setProfile] = useState({
    bio: ""
  });
  const [editorDraft, setEditorDraft] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  // Template management states
  const [templatesData, setTemplatesData] = useState(templates);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [templateDraggedItem, setTemplateDraggedItem] = useState<string | null>(null);
  const [templateDropIndicator, setTemplateDropIndicator] = useState<number | null>(null);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
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
      case "Analysis":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Education":
        return "bg-green-100 text-green-700 border-green-200";
      case "Calculators":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
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
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
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
      retirement: [{
        id: "1",
        name: "Capital Available",
        source: "Analysis"
      }, {
        id: "2",
        name: "Social Security Optimizer",
        source: "Calculators"
      }, {
        id: "4",
        name: "Retirement Timeline",
        source: "Calculators"
      }],
      education: [{
        id: "5",
        name: "Retirement Fact Finder",
        source: "Education"
      }]
      // Add more mappings as needed
    };
    let newReports: PresentationItem[] = [];
    selectedGoals.forEach(goal => {
      if (goalToReportsMap[goal]) {
        newReports = [...newReports, ...goalToReportsMap[goal]];
      }
    });

    // Remove duplicates
    const uniqueReports = newReports.filter((report, index, self) => index === self.findIndex(r => r.id === report.id));
    setItems(uniqueReports);
    setActiveTab("Presentation");
  };
  const handleLoadSampleClient = () => {
    const result = loadMockClient("sample-client-1");
    if (result) {
      setClientName(result.clientData.name);
      setClientPhone(result.clientData.phone);
      setClientAddress(result.clientData.address);
      setCompanyInfo(prev => ({
        ...prev,
        ...result.companyData
      }));
      setTitle("Comprehensive Financial Analysis");
    }
  };
  const handleBackToGoalSelection = () => {
    setShowFastTrackInput(false);
    setShowGoalSelection(true);
  };

  // Template management handlers
  const handleCreateNewTemplate = () => {
    setIsCreatingTemplate(true);
    setSelectedTemplateId(null);
    setNewTemplateName("");
    setNewTemplateDescription("");
  };
  const handleSaveNewTemplate = () => {
    if (!newTemplateName.trim()) return;
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: newTemplateName,
      description: newTemplateDescription,
      reports: []
    };
    setTemplatesData(prev => [...prev, newTemplate]);
    setSelectedTemplateId(newTemplate.id);
    setIsCreatingTemplate(false);
    setNewTemplateName("");
    setNewTemplateDescription("");
  };
  const handleUpdateTemplate = (templateId: string, updates: Partial<Template>) => {
    setTemplatesData(prev => prev.map(template => template.id === templateId ? {
      ...template,
      ...updates
    } : template));
  };
  const handleDeleteTemplate = (templateId: string) => {
    setTemplatesData(prev => prev.filter(template => template.id !== templateId));
    if (selectedTemplateId === templateId) {
      setSelectedTemplateId(null);
    }
  };
  const handleTemplateDragStart = (e: React.DragEvent, itemId: string) => {
    setTemplateDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleTemplateDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (templateDraggedItem) {
      setTemplateDropIndicator(index);
    }
  };
  const handleTemplateDrop = (e: React.DragEvent, dropIndex: number, isFromAvailable = false) => {
    e.preventDefault();
    if (!templateDraggedItem || !selectedTemplateId) return;
    const selectedTemplate = templatesData.find(t => t.id === selectedTemplateId);
    if (!selectedTemplate) return;
    if (isFromAvailable) {
      // Adding from available reports
      const reportToAdd = presentationItems.find(item => item.id === templateDraggedItem);
      if (reportToAdd && !selectedTemplate.reports.some(r => r.id === reportToAdd.id)) {
        handleUpdateTemplate(selectedTemplateId, {
          reports: [...selectedTemplate.reports, reportToAdd]
        });
      }
    } else {
      // Reordering within template
      const draggedIndex = selectedTemplate.reports.findIndex(item => item.id === templateDraggedItem);
      if (draggedIndex === -1) return;
      const newReports = [...selectedTemplate.reports];
      const [removed] = newReports.splice(draggedIndex, 1);
      newReports.splice(dropIndex, 0, removed);
      handleUpdateTemplate(selectedTemplateId, {
        reports: newReports
      });
    }
    setTemplateDraggedItem(null);
    setTemplateDropIndicator(null);
  };
  const handleRemoveFromTemplate = (reportId: string) => {
    if (!selectedTemplateId) return;
    const selectedTemplate = templatesData.find(t => t.id === selectedTemplateId);
    if (!selectedTemplate) return;
    handleUpdateTemplate(selectedTemplateId, {
      reports: selectedTemplate.reports.filter(report => report.id !== reportId)
    });
  };
  const selectedTemplate = selectedTemplateId ? templatesData.find(t => t.id === selectedTemplateId) : null;
  const availableReports = presentationItems.filter(item => !selectedTemplate?.reports.some(report => report.id === item.id));
  const tabs = [{
    label: "Presentation",
    value: "Presentation"
  }, {
    label: "Templates",
    value: "Templates"
  }, {
    label: "Company Information",
    value: "Company Information"
  }, {
    label: "Presentation Defaults",
    value: "Presentation Defaults"
  }];
  return <div className="h-full flex flex-col bg-gradient-subtle">
      {/* Top Navigation Bar with Animated Tabs */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Presentation Builder</h1>
          </div>
          <AnimatedTabs tabs={tabs} defaultValue={activeTab} onValueChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === "Presentation" && <>
            {/* Left Sidebar - Presentation Metadata & Controls */}
            <div className="w-96 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-border/50 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Presentation Header */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                  <div className="space-y-4">
                    {/* Title Section */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Presentation Title
                      </Label>
                      {isEditingTitle ? <div className="flex items-center gap-2">
                          <Input value={title} onChange={e => setTitle(e.target.value)} className="font-semibold text-lg border-primary/30 focus:border-primary bg-white/80" onBlur={() => setIsEditingTitle(false)} onKeyDown={e => e.key === 'Enter' && setIsEditingTitle(false)} autoFocus />
                          <Button variant="ghost" size="sm" onClick={() => setIsEditingTitle(false)} className="text-green-600 hover:text-green-800 hover:bg-green-50">
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </div> : <div className="flex items-center gap-2 group">
                          <h2 className="font-semibold text-lg text-foreground flex-1">{title}</h2>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10" onClick={() => setIsEditingTitle(true)}>
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        </div>}
                    </div>

                    {/* Client Information */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Prepared For
                      </Label>
                      {isEditingClient ? <div className="space-y-3 p-4 bg-white/80 rounded-lg border border-border">
                          <div>
                            <Input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client name" className="font-medium" />
                          </div>
                          <div>
                            <Input value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="Phone number" />
                          </div>
                          <div>
                            <Input value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder="Address" />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => setIsEditingClient(false)} className="bg-green-600 hover:bg-green-700">
                              Save
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setIsEditingClient(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div> : <div className="group cursor-pointer" onClick={() => setIsEditingClient(true)}>
                          <div className="p-3 bg-white/50 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-white/80 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="font-medium text-foreground">{clientName}</p>
                                {clientPhone && <p className="text-xs text-muted-foreground">{clientPhone}</p>}
                                {clientAddress && <p className="text-xs text-muted-foreground">{clientAddress}</p>}
                              </div>
                              <Edit3 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>

                {/* Presentation Status */}
                <div className="bg-white/80 rounded-xl p-4 border border-border/50">
                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Status
                    </Label>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-amber-600">Draft</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {items.length} reports
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Created: {new Date().toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">Updated: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/80 rounded-xl p-4 border border-border/50 space-y-3">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Quick Actions
                  </Label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleLoadSampleClient}>
                      <User className="h-4 w-4 mr-2" />
                      Load Sample Client
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
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
                                  {presentationOptions.header && <Input placeholder="Enter header text" value={presentationOptions.headerText} className="ml-6" />}
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="footer" checked={presentationOptions.footer} />
                                    <Label htmlFor="footer">Footer</Label>
                                  </div>
                                  {presentationOptions.footer && <Input placeholder="Enter footer text" value={presentationOptions.footerText} className="ml-6" />}
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="pageNumbers" checked={presentationOptions.pageNumbers} />
                                    <Label htmlFor="pageNumbers">Page Numbers</Label>
                                  </div>
                                  {presentationOptions.pageNumbers && <RadioGroup value={presentationOptions.pageNumberFormat} className="ml-6 space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="page-x" id="page-x" />
                                        <Label htmlFor="page-x">Page X</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="page-x-of-y" id="page-x-of-y" />
                                        <Label htmlFor="page-x-of-y">Page X of Y</Label>
                                      </div>
                                    </RadioGroup>}
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="presentationDate" checked={presentationOptions.presentationDate} />
                                    <Label htmlFor="presentationDate">Presentation Date</Label>
                                  </div>
                                  {presentationOptions.presentationDate && <Input type="date" value={presentationOptions.presentationDateText} className="ml-6" />}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Title Page Designs */}
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-4">Title Page Design</h3>
                              <div className="grid grid-cols-2 gap-4">
                                {titlePageDesigns.map(design => <div key={design.id} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${presentationOptions.selectedTitlePage === design.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <div className="aspect-[4/3] bg-gray-100 rounded mb-2 flex items-center justify-center">
                                      <span className="text-xs text-gray-500">Preview</span>
                                    </div>
                                    <p className="text-sm font-medium text-center">{design.name}</p>
                                  </div>)}
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
                    
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Presentation
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area - Reports List */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">Presentation Reports</h2>
                    <p className="text-muted-foreground">Drag to reorder • {items.length} reports selected</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-primary hover:bg-primary/90 shadow-md">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Report
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-3 pb-6" onDragLeave={handleDragLeave}>
                  {items.length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-center bg-white/50 rounded-2xl border-2 border-dashed border-border">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No reports selected</h3>
                      <p className="text-muted-foreground mb-4">Add reports to start building your presentation</p>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Report
                      </Button>
                    </div> : items.map((item, index) => <div key={item.id}>
                        {/* Enhanced drop indicator */}
                        {dropIndicator === index && <div className="h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full mb-3 shadow-lg animate-pulse" />}
                        <div draggable onDragStart={e => handleDragStart(e, item.id)} onDragOver={e => handleDragOver(e, index)} onDrop={e => handleDrop(e, index)} onDragEnd={handleDragEnd} className={`group bg-white/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 
                            hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-move
                            ${draggedItem === item.id ? 'opacity-50 scale-95' : 'hover:-translate-y-1'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                <GripVertical className="h-5 w-5" />
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 text-primary rounded-xl font-semibold text-sm">
                                  {index + 1}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                                    {item.name}
                                  </h3>
                                  <Badge className={`text-xs font-medium ${getSourceColor(item.source)}`}>
                                    {item.source}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Ready to include in presentation
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Inputs
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>)}
                  {/* Drop indicator for end of list */}
                  {dropIndicator === items.length && items.length > 0 && <div className="h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full shadow-lg animate-pulse" />}
                </div>
              </div>

              {/* Floating Action Panel */}
              {items.length > 0 && <div className="flex-shrink-0 p-6 pt-0">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-foreground">Ready to Generate</h4>
                        <p className="text-muted-foreground">
                          Your presentation with {items.length} reports is ready to be generated.
                        </p>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md px-8">
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Presentation
                        </Button>
                        <Button variant="outline" className="border-primary/30 hover:bg-primary/5" onClick={() => setShowPreview(true)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
          </>}

        {/* Other Tab Contents */}
        {activeTab === "Templates" && <>
            {/* Left Sidebar - Template Management */}
            <div className="w-96 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-border/50 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Template Header */}
                <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Layers className="h-6 w-6 text-purple-600" />
                      <h2 className="text-lg font-semibold text-foreground">Template Library</h2>
                    </div>
                    
                    <div className="flex gap-2">
                      
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleImportTemplate} variant="outline" className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50" size="sm">
                        <Import className="h-4 w-4 mr-2" />
                        Import
                      </Button>
                      {selectedTemplate && <Button onClick={() => handleExportTemplate(selectedTemplate)} variant="outline" className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>}
                    </div>
                  </div>
                </div>

                {/* Fast Track Section */}
                <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-2xl p-6 border border-orange-500/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Zap className="h-6 w-6 text-orange-600" />
                      <h3 className="text-lg font-semibold text-foreground">Fast Track</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quickly create a presentation by selecting your financial goals.
                    </p>
                    <Button onClick={handleFastTrackClick} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" size="sm">
                      <Zap className="h-4 w-4 mr-2" />
                      Start Fast Track
                    </Button>
                  </div>
                </div>

                {/* Template List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Templates ({templatesData.length})
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {templatesData.map(template => <div key={template.id} onClick={() => setSelectedTemplateId(template.id)} className={`group cursor-pointer p-4 rounded-xl border transition-all ${selectedTemplateId === template.id ? 'bg-purple-50 border-purple-300' : 'bg-white/50 border-border/50 hover:border-purple-200 hover:bg-purple-50/50'}`}>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">{template.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {template.reports.length}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {[...new Set(template.reports.map(r => r.source))].map(source => <Badge key={source} className={`text-xs ${getSourceColor(source)}`}>
                                {source}
                              </Badge>)}
                          </div>
                        </div>
                      </div>)}

                    {isCreatingTemplate && <div className="p-4 bg-white rounded-xl border-2 border-dashed border-purple-300">
                        <div className="space-y-3">
                          <Input placeholder="Template name" value={newTemplateName} onChange={e => setNewTemplateName(e.target.value)} />
                          <Textarea placeholder="Template description" value={newTemplateDescription} onChange={e => setNewTemplateDescription(e.target.value)} rows={3} />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveNewTemplate} disabled={!newTemplateName.trim()} size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              Save
                            </Button>
                            <Button onClick={() => setIsCreatingTemplate(false)} variant="outline" size="sm" className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>}
                  </div>
                </div>

                {/* Selected Template Actions */}
                {selectedTemplate && <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Actions
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <Button onClick={() => loadTemplate(selectedTemplate)} className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                      
                      <Button onClick={() => handleDeleteTemplate(selectedTemplate.id)} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Template
                      </Button>
                    </div>
                  </div>}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {!selectedTemplate ? (/* No Template Selected State */
          <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-500/20 rounded-2xl mx-auto flex items-center justify-center">
                      <Layers className="h-16 w-16 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Select a Template</h3>
                    <p className="text-muted-foreground">Choose a template from the sidebar to view and edit its reports.</p>
                    
                  </div>
                </div>) : <>
                  {/* Template Header */}
                  <div className="flex-shrink-0 p-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">{selectedTemplate.name}</h2>
                        <p className="text-muted-foreground">{selectedTemplate.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedTemplate.reports.length} reports • Drag to reorder or add from available reports
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Template Content */}
                  <div className="flex-1 overflow-y-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                      {/* Available Reports */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-foreground">Available Reports</h3>
                          <Badge variant="outline">{availableReports.length}</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          {availableReports.length === 0 ? <div className="text-center py-8 text-muted-foreground">
                              All reports are already in this template
                            </div> : availableReports.map(item => <div key={item.id} draggable onDragStart={e => handleTemplateDragStart(e, item.id)} className={`group bg-white/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 
                                  hover:shadow-md hover:border-purple-300 transition-all duration-300 cursor-move
                                  ${templateDraggedItem === item.id ? 'opacity-50 scale-95' : 'hover:-translate-y-1'}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-purple-500" />
                                    <div className="space-y-1">
                                      <h4 className="font-medium text-foreground">{item.name}</h4>
                                      <Badge className={`text-xs ${getSourceColor(item.source)}`}>
                                        {item.source}
                                      </Badge>
                                    </div>
                                  </div>
                                  <Plus className="h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>)}
                        </div>
                      </div>

                      {/* Template Reports */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-foreground">Template Reports</h3>
                          <Badge variant="outline">{selectedTemplate.reports.length}</Badge>
                        </div>
                        
                        <div className="space-y-2 min-h-[200px] bg-purple-50/50 rounded-xl p-4 border-2 border-dashed border-purple-200" onDragOver={e => e.preventDefault()} onDrop={e => handleTemplateDrop(e, selectedTemplate.reports.length, true)}>
                          {selectedTemplate.reports.length === 0 ? <div className="text-center py-8 text-muted-foreground">
                              <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              Drag reports here to add them to this template
                            </div> : selectedTemplate.reports.map((item, index) => <div key={item.id}>
                                {templateDropIndicator === index && <div className="h-1 bg-gradient-to-r from-purple-500/50 to-purple-500 rounded-full mb-2 shadow-lg animate-pulse" />}
                                <div draggable onDragStart={e => handleTemplateDragStart(e, item.id)} onDragOver={e => handleTemplateDragOver(e, index)} onDrop={e => handleTemplateDrop(e, index)} className={`group bg-white/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 
                                    hover:shadow-md hover:border-purple-300 transition-all duration-300 cursor-move
                                    ${templateDraggedItem === item.id ? 'opacity-50 scale-95' : 'hover:-translate-y-1'}`}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-purple-500 transition-colors">
                                        <GripVertical className="h-4 w-4" />
                                        <div className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-lg text-xs font-semibold">
                                          {index + 1}
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <h4 className="font-medium text-foreground">{item.name}</h4>
                                        <Badge className={`text-xs ${getSourceColor(item.source)}`}>
                                          {item.source}
                                        </Badge>
                                      </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleRemoveFromTemplate(item.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>)}
                          {templateDropIndicator === selectedTemplate.reports.length && selectedTemplate.reports.length > 0 && <div className="h-1 bg-gradient-to-r from-purple-500/50 to-purple-500 rounded-full shadow-lg animate-pulse" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </>}
            </div>
          </>}

        {/* Other tabs with constraining layout */}
        {activeTab !== "Presentation" && activeTab !== "Templates" && <div className="p-8 max-w-6xl mx-auto space-y-8">

            {activeTab === "Company Information" && <Card className="border-gray-200 shadow-sm">
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
                        <Input id="advisorName" value={companyInfo.advisorName} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    advisorName: e.target.value
                  }))} placeholder="Enter advisor name" />
                      </div>
                      <div>
                        <Label htmlFor="designations">Designations</Label>
                        <Input id="designations" value={companyInfo.designations} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    designations: e.target.value
                  }))} placeholder="e.g., CFP®, ChFC®, CLU®" />
                      </div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={companyInfo.title} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    title: e.target.value
                  }))} placeholder="e.g., Financial Advisor, Wealth Manager" />
                      </div>
                      <div>
                        <Label htmlFor="advisorPhoto">Advisor Photo</Label>
                        <Input id="advisorPhoto" type="file" accept="image/*" onChange={e => handleFileUpload(e, 'advisorPhoto')} />
                        {companyInfo.advisorPhoto && <p className="text-sm text-green-600 mt-1">
                            File selected: {companyInfo.advisorPhoto.name}
                          </p>}
                      </div>
                    </div>

                    {/* Right Column - Company Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" value={companyInfo.companyName} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    companyName: e.target.value
                  }))} placeholder="Enter company name" />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" value={companyInfo.address} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    address: e.target.value
                  }))} placeholder="Enter complete address" rows={3} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" value={companyInfo.phone} onChange={e => setCompanyInfo(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))} placeholder="Phone number" />
                        </div>
                        <div>
                          <Label htmlFor="mobile">Mobile</Label>
                          <Input id="mobile" value={companyInfo.mobile} onChange={e => setCompanyInfo(prev => ({
                      ...prev,
                      mobile: e.target.value
                    }))} placeholder="Mobile number" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fax">Fax</Label>
                          <Input id="fax" value={companyInfo.fax} onChange={e => setCompanyInfo(prev => ({
                      ...prev,
                      fax: e.target.value
                    }))} placeholder="Fax number" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={companyInfo.email} onChange={e => setCompanyInfo(prev => ({
                      ...prev,
                      email: e.target.value
                    }))} placeholder="Email address" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" value={companyInfo.website} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    website: e.target.value
                  }))} placeholder="Website URL" />
                      </div>
                      <div>
                        <Label htmlFor="logo">Company Logo</Label>
                        <Input id="logo" type="file" accept="image/*" onChange={e => handleFileUpload(e, 'logo')} />
                        {companyInfo.logo && <p className="text-sm text-green-600 mt-1">
                            File selected: {companyInfo.logo.name}
                          </p>}
                      </div>
                    </div>
                  </div>

                  {/* Legal & Compliance Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Legal & Compliance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="disclaimer">Disclaimer</Label>
                          <Button variant="outline" size="sm" onClick={() => {
                      setEditorDraft(companyInfo.disclaimer);
                      setEditorModal({
                        open: true,
                        field: 'disclaimer'
                      });
                    }}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Rich Editor
                          </Button>
                        </div>
                        <Textarea id="disclaimer" value={companyInfo.disclaimer} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    disclaimer: e.target.value
                  }))} placeholder="Enter disclaimer text" rows={4} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="disclosure">Disclosure</Label>
                          <Button variant="outline" size="sm" onClick={() => {
                      setEditorDraft(companyInfo.disclosure);
                      setEditorModal({
                        open: true,
                        field: 'disclosure'
                      });
                    }}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Rich Editor
                          </Button>
                        </div>
                        <Textarea id="disclosure" value={companyInfo.disclosure} onChange={e => setCompanyInfo(prev => ({
                    ...prev,
                    disclosure: e.target.value
                  }))} placeholder="Enter disclosure text" rows={4} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Save Information</Button>
                  </div>
                </CardContent>
              </Card>}

            {activeTab === "Presentation Defaults" && <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg text-gray-900">Presentation Defaults</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Set default options that will be applied to all new presentations.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - General Defaults */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">General Defaults</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="defaultTitlePage" checked={presentationDefaults.titlePage} onCheckedChange={checked => setPresentationDefaults(prev => ({
                        ...prev,
                        titlePage: checked as boolean
                      }))} />
                            <Label htmlFor="defaultTitlePage">Title Page</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="defaultTableOfContents" checked={presentationDefaults.tableOfContents} onCheckedChange={checked => setPresentationDefaults(prev => ({
                        ...prev,
                        tableOfContents: checked as boolean
                      }))} />
                            <Label htmlFor="defaultTableOfContents">Table of Contents</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="defaultPersonalProfile" checked={presentationDefaults.personalProfile} onCheckedChange={checked => setPresentationDefaults(prev => ({
                        ...prev,
                        personalProfile: checked as boolean
                      }))} />
                            <Label htmlFor="defaultPersonalProfile">Personal Profile Page</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="defaultRecordOfReports" checked={presentationDefaults.recordOfReports} onCheckedChange={checked => setPresentationDefaults(prev => ({
                        ...prev,
                        recordOfReports: checked as boolean
                      }))} />
                            <Label htmlFor="defaultRecordOfReports">Record of Reports</Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Legal & Compliance Defaults</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="defaultDisclaimer" checked={presentationDefaults.disclaimer} onCheckedChange={checked => setPresentationDefaults(prev => ({
                        ...prev,
                        disclaimer: checked as boolean
                      }))} />
                            <Label htmlFor="defaultDisclaimer">Disclaimer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="defaultDisclosure" checked={presentationDefaults.disclosure} onCheckedChange={checked => setPresentationDefaults(prev => ({
                        ...prev,
                        disclosure: checked as boolean
                      }))} />
                            <Label htmlFor="defaultDisclosure">Disclosure</Label>
                          </div>
                          <div className="ml-6">
                            <RadioGroup value={presentationDefaults.disclaimerPosition} onValueChange={value => setPresentationDefaults(prev => ({
                        ...prev,
                        disclaimerPosition: value as "beginning" | "end"
                      }))} className="flex gap-4">
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
                    </div>

                    {/* Right Column - Layout Defaults */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Page Layout Defaults</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="defaultHeader" checked={presentationDefaults.header} onCheckedChange={checked => setPresentationDefaults(prev => ({
                          ...prev,
                          header: checked as boolean
                        }))} />
                              <Label htmlFor="defaultHeader">Header</Label>
                            </div>
                            {presentationDefaults.header && <Input placeholder="Enter default header text" value={presentationDefaults.headerText} onChange={e => setPresentationDefaults(prev => ({
                        ...prev,
                        headerText: e.target.value
                      }))} className="ml-6" />}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="defaultFooter" checked={presentationDefaults.footer} onCheckedChange={checked => setPresentationDefaults(prev => ({
                          ...prev,
                          footer: checked as boolean
                        }))} />
                              <Label htmlFor="defaultFooter">Footer</Label>
                            </div>
                            {presentationDefaults.footer && <Input placeholder="Enter default footer text" value={presentationDefaults.footerText} onChange={e => setPresentationDefaults(prev => ({
                        ...prev,
                        footerText: e.target.value
                      }))} className="ml-6" />}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="defaultPageNumbers" checked={presentationDefaults.pageNumbers} onCheckedChange={checked => setPresentationDefaults(prev => ({
                          ...prev,
                          pageNumbers: checked as boolean
                        }))} />
                              <Label htmlFor="defaultPageNumbers">Page Numbers</Label>
                            </div>
                            {presentationDefaults.pageNumbers && <RadioGroup value={presentationDefaults.pageNumberFormat} onValueChange={value => setPresentationDefaults(prev => ({
                        ...prev,
                        pageNumberFormat: value as "page-x" | "page-x-of-y"
                      }))} className="ml-6 space-y-2">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="page-x" id="defaultPageX" />
                                  <Label htmlFor="defaultPageX">Page X</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="page-x-of-y" id="defaultPageXY" />
                                  <Label htmlFor="defaultPageXY">Page X of Y</Label>
                                </div>
                              </RadioGroup>}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="defaultPresentationDate" checked={presentationDefaults.presentationDate} onCheckedChange={checked => setPresentationDefaults(prev => ({
                          ...prev,
                          presentationDate: checked as boolean
                        }))} />
                              <Label htmlFor="defaultPresentationDate">Presentation Date</Label>
                            </div>
                            {presentationDefaults.presentationDate && <Input type="date" value={presentationDefaults.presentationDateText} onChange={e => setPresentationDefaults(prev => ({
                        ...prev,
                        presentationDateText: e.target.value
                      }))} className="ml-6" />}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Default Title Page Design</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {titlePageDesigns.map(design => <div key={design.id} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${presentationDefaults.selectedTitlePage === design.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setPresentationDefaults(prev => ({
                      ...prev,
                      selectedTitlePage: design.id
                    }))}>
                              <div className="aspect-[4/3] bg-gray-100 rounded mb-2 flex items-center justify-center">
                                <span className="text-xs text-gray-500">Preview</span>
                              </div>
                              <p className="text-sm font-medium text-center">{design.name}</p>
                            </div>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 border-t mt-8">
                    <Button variant="outline" onClick={() => setPresentationDefaults({
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
              })}>
                      Reset to System Defaults
                    </Button>
                    <div className="flex gap-4">
                      <Button variant="outline">Cancel Changes</Button>
                      <Button className="bg-green-600 hover:bg-green-700">Save Defaults</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>}
          </div>}
      </div>

      {/* Dialogs */}
      <GoalSelectionDialog open={showGoalSelection} onOpenChange={setShowGoalSelection} onGoalsSelected={handleGoalsSelected} />

      <FastTrackInputDialog open={showFastTrackInput} onOpenChange={setShowFastTrackInput} selectedGoals={selectedGoals} onCreatePresentation={handleCreatePresentation} onBack={handleBackToGoalSelection} />

      <TextEditorModal open={editorModal.open} title={editorModal.field === 'disclaimer' ? 'Edit Disclaimer' : editorModal.field === 'disclosure' ? 'Edit Disclosure' : 'Edit Bio'} initialValue={editorDraft} onClose={() => setEditorModal({
      open: false,
      field: null
    })} onSave={content => {
      if (editorModal.field === 'disclaimer') {
        setCompanyInfo(prev => ({
          ...prev,
          disclaimer: content
        }));
      } else if (editorModal.field === 'disclosure') {
        setCompanyInfo(prev => ({
          ...prev,
          disclosure: content
        }));
      } else if (editorModal.field === 'bio') {
        setProfile(prev => ({
          ...prev,
          bio: content
        }));
      }
      setEditorModal({
        open: false,
        field: null
      });
    }} />

      <PresentationPreview open={showPreview} onClose={() => setShowPreview(false)} title={title} clientName={clientName} presentationItems={items} companyInfo={{
      name: companyInfo.companyName || "Company Name",
      address: companyInfo.address,
      phone: companyInfo.phone,
      email: companyInfo.email,
      website: companyInfo.website,
      logo: companyInfo.logo?.name || "",
      disclaimer: companyInfo.disclaimer,
      disclosure: companyInfo.disclosure,
      bio: profile.bio
    }} onExportPDF={() => {
      // Add export functionality here
      console.log("Exporting PDF...");
    }} />
    </div>;
};
export default Presentation;