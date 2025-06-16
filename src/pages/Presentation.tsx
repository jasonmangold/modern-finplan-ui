import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Settings,
  Calendar,
  User,
  Building
} from "lucide-react";
import { PresentationReports } from "@/components/PresentationReports";

const Presentation = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("comprehensive");

  const templates = [
    {
      id: "comprehensive",
      name: "Comprehensive Report",
      description: "Complete financial analysis with all recommendations",
      sections: 12,
      pages: "15-20"
    },
    {
      id: "executive",
      name: "Executive Summary",
      description: "High-level overview for decision makers",
      sections: 6,
      pages: "5-8"
    },
    {
      id: "client-friendly",
      name: "Client-Friendly",
      description: "Simplified language and visual presentation",
      sections: 8,
      pages: "10-12"
    }
  ];

  const clientInfo = {
    name: "John & Sarah Mitchell",
    date: "December 16, 2025",
    advisor: "Michael Thompson, CFP®",
    firm: "Thompson Financial Advisory"
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Presentation Center</h1>
        <p className="text-gray-600">Create and manage client presentations</p>
      </div>

      <Tabs defaultValue="presentation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="presentation">Presentation</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="presentation" className="space-y-6">
          {/* Client Information Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{clientInfo.name}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{clientInfo.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{clientInfo.advisor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{clientInfo.firm}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Presentation Templates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      {selectedTemplate === template.id && (
                        <Badge variant="secondary">Selected</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{template.sections} sections</span>
                      <span>{template.pages} pages</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <PresentationReports />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Browse and select from available analysis reports to include in your presentation.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Presentation Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Branding</h3>
                <p className="text-sm text-gray-600 mb-4">Customize the appearance of your presentations</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Logo</label>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                      <span className="text-sm text-gray-600">#2563eb</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Default Settings</h3>
                <p className="text-sm text-gray-600 mb-4">Set default preferences for new presentations</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Include executive summary</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Show page numbers</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Include appendix</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Presentation;
