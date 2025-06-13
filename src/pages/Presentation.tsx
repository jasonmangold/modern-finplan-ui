
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Download, FileText, Users, Settings, Presentation as PresentationIcon, Template } from "lucide-react";

export default function Presentation() {
  const [activeTab, setActiveTab] = useState("presentation");

  const loadTemplate = (templateName: string) => {
    console.log(`Loading template: ${templateName}`);
    // Switch back to Presentation tab after loading template
    setActiveTab("presentation");
  };

  const tabs = [
    {
      value: "presentation",
      label: "Presentation",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Financial Planning Presentation</h2>
              <p className="text-gray-600 mt-1">Create and manage client presentations</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <PresentationIcon className="h-4 w-4" />
                Present
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Current Presentation</CardTitle>
                    <Badge variant="outline" className="text-green-600 border-green-200 mt-1">
                      Ready
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  12 slides prepared for Johnson Family Financial Review
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Retirement Analysis</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Investment Portfolio</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax Planning</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-600 text-white rounded-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Client Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Primary Client:</span>
                    <p className="text-sm text-gray-600">Paul Johnson</p>
                  </div>
                  <div>
                    <span className="font-medium">Spouse:</span>
                    <p className="text-sm text-gray-600">Sally Johnson</p>
                  </div>
                  <div>
                    <span className="font-medium">Meeting Date:</span>
                    <p className="text-sm text-gray-600">March 15, 2024</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Edit Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-600 text-white rounded-lg">
                    <Settings className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Presentation Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-advance slides</span>
                    <Badge variant="outline">Off</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show notes</span>
                    <Badge variant="secondary">On</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Full screen mode</span>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      value: "templates",
      label: "Templates",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Presentation Templates</h2>
            <p className="text-gray-600 mt-1">Choose from pre-built presentation templates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-lg">
                    <Template className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Comprehensive Review</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Complete financial planning presentation covering all major areas
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-500">Includes:</div>
                  <div className="text-xs">• Retirement Planning</div>
                  <div className="text-xs">• Investment Analysis</div>
                  <div className="text-xs">• Tax Planning</div>
                  <div className="text-xs">• Insurance Review</div>
                </div>
                <Button 
                  onClick={() => loadTemplate("Comprehensive Review")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 text-white rounded-lg">
                    <Template className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Retirement Focus</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Specialized presentation focusing on retirement planning strategies
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-500">Includes:</div>
                  <div className="text-xs">• Retirement Income Analysis</div>
                  <div className="text-xs">• Social Security Optimization</div>
                  <div className="text-xs">• 401(k) Strategies</div>
                </div>
                <Button 
                  onClick={() => loadTemplate("Retirement Focus")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 text-white rounded-lg">
                    <Template className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Investment Review</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Portfolio analysis and investment strategy presentation
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-500">Includes:</div>
                  <div className="text-xs">• Portfolio Performance</div>
                  <div className="text-xs">• Asset Allocation</div>
                  <div className="text-xs">• Risk Assessment</div>
                </div>
                <Button 
                  onClick={() => loadTemplate("Investment Review")}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <AnimatedTabs 
        tabs={tabs} 
        value={activeTab}
        onValueChange={setActiveTab}
      />
    </div>
  );
}
