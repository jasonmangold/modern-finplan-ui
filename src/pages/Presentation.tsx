
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Presentation as PresentationIcon, FileText, Download, Share2, Play, Settings } from "lucide-react";
import { PresentationReports } from "@/components/PresentationReports";

const Presentation = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-100">
            <PresentationIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Presentation Builder</h1>
        </div>
        <p className="text-gray-600">Create and manage client presentations with your analysis results</p>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Presentation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Selected Reports Section */}
            <PresentationReports />

            {/* Presentation Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Presentation Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <PresentationIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Presentation preview will appear here</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Add Slide</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Download className="h-6 w-6" />
                  <span>Export PDF</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Share2 className="h-6 w-6" />
                  <span>Share Link</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Presentation Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Professional", "Modern", "Classic", "Minimal"].map((template) => (
                  <Card key={template} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3"></div>
                      <h3 className="font-semibold">{template}</h3>
                      <p className="text-sm text-gray-600">Clean and professional design</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Presentation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Company Logo</label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500">Upload your company logo</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Default Font</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option>Arial</option>
                  <option>Helvetica</option>
                  <option>Times New Roman</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Color Theme</label>
                <div className="mt-2 flex gap-2">
                  {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-gray-500"].map((color) => (
                    <div key={color} className={`w-8 h-8 rounded-full ${color} cursor-pointer`}></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Export as PDF</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <PresentationIcon className="h-6 w-6" />
                  <span>Export as PowerPoint</span>
                </Button>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Export Settings</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Include cover page
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Include charts and graphs
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Include raw data tables
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
