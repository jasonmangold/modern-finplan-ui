import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientFileManager } from "@/components/ClientFileManager";
import { GoalSelectionDialog } from "@/components/GoalSelectionDialog";
import { FastTrackInputDialog } from "@/components/FastTrackInputDialog";
import { AnalysisVisualization } from "@/components/AnalysisVisualization";
import { RetirementAnalysisOutput } from "@/components/RetirementAnalysisOutput";
import { 
  Upload, Download, Eye, EyeOff, Settings, FileText, 
  Presentation as PresentationIcon, Zap, Import, Users
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Presentation = () => {
  const [activeTab, setActiveTab] = useState("presentation");
  const [clientFiles, setClientFiles] = useState(["John & Mary Smith", "Robert Johnson", "Sarah Williams"]);
  const [selectedClient, setSelectedClient] = useState("John & Mary Smith");
  const [isClientManagerOpen, setIsClientManagerOpen] = useState(false);
  const [isGoalSelectionOpen, setIsGoalSelectionOpen] = useState(false);
  const [isFastTrackInputOpen, setIsFastTrackInputOpen] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  
  // Analysis Financial Goals state
  const [selectedAnalysisGoals, setSelectedAnalysisGoals] = useState<string[]>([]);

  const analysisGoals = [
    { id: "retirement", label: "Retirement Analysis", description: "Comprehensive retirement planning analysis" },
    { id: "education", label: "Education Funding", description: "College savings and funding strategies" },
    { id: "insurance", label: "Insurance Needs", description: "Life and disability insurance analysis" },
    { id: "estate", label: "Estate Planning", description: "Wealth transfer and tax planning" },
    { id: "investment", label: "Investment Planning", description: "Portfolio optimization and allocation" },
    { id: "tax", label: "Tax Planning", description: "Tax optimization strategies" }
  ];

  const handleAnalysisGoalToggle = (goalId: string) => {
    setSelectedAnalysisGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const templates = [
    {
      id: 1,
      name: "Comprehensive Financial Plan",
      description: "Complete financial planning template with all sections",
      sections: ["Executive Summary", "Current Situation", "Goals", "Recommendations", "Implementation"]
    },
    {
      id: 2,
      name: "Retirement Focus Plan",
      description: "Specialized template focusing on retirement planning",
      sections: ["Retirement Goals", "Current Assets", "Projections", "Strategies"]
    },
    {
      id: 3,
      name: "Investment Advisory Report",
      description: "Template for investment recommendations and portfolio analysis",
      sections: ["Portfolio Review", "Risk Assessment", "Recommendations", "Implementation"]
    }
  ];

  const handleUseTemplate = () => {
    // Switch back to the Presentation tab
    setActiveTab("presentation");
  };

  const handleGoalsSelected = (goals: string[]) => {
    setSelectedGoals(goals);
    setIsFastTrackInputOpen(true);
  };

  const handleCreatePresentation = () => {
    console.log("Creating presentation with selected goals:", selectedGoals);
    setActiveTab("presentation");
  };

  const handleGoalSelectionBack = () => {
    setIsFastTrackInputOpen(false);
    setIsGoalSelectionOpen(true);
  };

  const handleExportTemplate = () => {
    console.log("Exporting template...");
    // Create a sample template export
    const templateData = {
      name: "Custom Template",
      sections: ["Executive Summary", "Analysis", "Recommendations"],
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(templateData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'presentation-template.json';
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
            // Here you would process the imported template
          } catch (error) {
            console.error("Error importing template:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const tabs = [
    { label: "Presentation", value: "presentation" },
    { label: "Analysis", value: "analysis" },
    { label: "Templates", value: "templates" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Presentation Builder</h1>
            <p className="text-gray-600">Create and manage financial presentations for your clients</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Current Client: <span className="font-medium text-blue-600">{selectedClient}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsClientManagerOpen(true)}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              View All Client Files
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-4">
        <AnimatedTabs
          tabs={tabs}
          defaultValue={activeTab}
          onValueChange={setActiveTab}
        />
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        {activeTab === "presentation" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Presentation Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="presentation-title">Presentation Title</Label>
                    <Input id="presentation-title" placeholder="Enter presentation title" />
                  </div>
                  <div>
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" value={selectedClient} onChange={() => {}} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="presentation-notes">Notes</Label>
                  <Textarea id="presentation-notes" placeholder="Add presentation notes..." rows={3} />
                </div>
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <PresentationIcon className="h-4 w-4" />
                    Generate Presentation
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="space-y-6">
            {/* Financial Goals Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Financial Goals</CardTitle>
                <p className="text-gray-600">Select which financial goals to include in your analysis</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAnalysisGoals.includes(goal.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAnalysisGoalToggle(goal.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={goal.id}
                          checked={selectedAnalysisGoals.includes(goal.id)}
                          onCheckedChange={() => handleAnalysisGoalToggle(goal.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1">
                          <Label htmlFor={goal.id} className="font-medium cursor-pointer">
                            {goal.label}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Topic Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    <option value="">Select an analysis topic...</option>
                    <option value="retirement-accumulation">Retirement Accumulation</option>
                    <option value="retirement-distribution">Retirement Distribution</option>
                    <option value="asset-allocation">Asset Allocation</option>
                    <option value="education-funding">Education Funding</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Visualization */}
            <AnalysisVisualization selectedTopic={selectedTopic} />

            {/* Retirement Analysis Output */}
            {selectedAnalysisGoals.includes("retirement") && (
              <RetirementAnalysisOutput selectedForPresentation={selectedAnalysisGoals.filter(id => id === "retirement").map(() => "Retirement Analysis")} />
            )}
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-6">
            {/* Template Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Presentation Templates</h2>
                <p className="text-gray-600">Choose from pre-built templates or create your own</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleExportTemplate}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Template
                </Button>
                <Button 
                  onClick={handleImportTemplate}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Import className="h-4 w-4" />
                  Import Template
                </Button>
              </div>
            </div>

            {/* Fast Track Button */}
            <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">Fast Track Presentation</h3>
                    <p className="text-green-600 mb-4">
                      Quickly create a comprehensive presentation by selecting your financial goals and inputting key data points.
                    </p>
                    <Badge className="bg-green-100 text-green-800 border-green-300">Recommended</Badge>
                  </div>
                  <Button 
                    onClick={() => setIsGoalSelectionOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Fast Track
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Sections included:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.sections.map((section, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {section}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        onClick={handleUseTemplate}
                        className="w-full"
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Client File Manager Dialog */}
      <ClientFileManager
        open={isClientManagerOpen}
        onOpenChange={setIsClientManagerOpen}
        clientFiles={clientFiles}
        setClientFiles={setClientFiles}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />

      {/* Goal Selection Dialog */}
      <GoalSelectionDialog
        open={isGoalSelectionOpen}
        onOpenChange={setIsGoalSelectionOpen}
        onGoalsSelected={handleGoalsSelected}
      />

      {/* Fast Track Input Dialog */}
      <FastTrackInputDialog
        open={isFastTrackInputOpen}
        onOpenChange={setIsFastTrackInputOpen}
        selectedGoals={selectedGoals}
        onCreatePresentation={handleCreatePresentation}
        onBack={handleGoalSelectionBack}
      />
    </div>
  );
};

export default Presentation;
