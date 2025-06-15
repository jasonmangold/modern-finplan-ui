
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit, 
  FileText, 
  Calendar, 
  Users, 
  Plus, 
  Download, 
  Share,
  Settings,
  Presentation as PresentationIcon
} from "lucide-react";

const Presentation = () => {
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set(["1", "2", "3", "4", "5", "6"]));

  const toggleReportSelection = (reportId: string) => {
    const newSelected = new Set(selectedReports);
    if (newSelected.has(reportId)) {
      newSelected.delete(reportId);
    } else {
      newSelected.add(reportId);
    }
    setSelectedReports(newSelected);
  };

  const availableReports = [
    { id: "1", title: "Capital Available", category: "Analysis", type: "analysis" },
    { id: "2", title: "Social Security Optimizer", category: "Calculators", type: "calculator" },
    { id: "3", title: "Alternatives Retirement", category: "Analysis", type: "analysis" },
    { id: "4", title: "Investment Portfolio Review", category: "Analysis", type: "analysis" },
    { id: "5", title: "Tax Planning Summary", category: "Analysis", type: "analysis" },
    { id: "6", title: "Estate Planning Overview", category: "Analysis", type: "analysis" }
  ];

  const getBadgeColor = (type: string) => {
    return type === "analysis" 
      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
      : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Presentation Builder</h1>
          <p className="text-gray-600 dark:text-gray-400">Create professional client presentations</p>
        </div>

        <Tabs defaultValue="presentation" className="space-y-6">
          <TabsList className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <TabsTrigger value="presentation" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:text-gray-900 data-[state=active]:dark:text-gray-100">
              Presentation
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:text-gray-900 data-[state=active]:dark:text-gray-100">
              Templates
            </TabsTrigger>
            <TabsTrigger value="company-info" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:text-gray-900 data-[state=active]:dark:text-gray-100">
              Company Information
            </TabsTrigger>
            <TabsTrigger value="defaults" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:text-gray-900 data-[state=active]:dark:text-gray-100">
              Presentation Defaults
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presentation" className="space-y-6">
            {/* Presentation Details */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">No Title</CardTitle>
                      <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">PREPARED FOR</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Paul Johnson & Sally Johnson</p>
                        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    <p>Created: 6/15/2025</p>
                    <p>Last Updated: 6/15/2025</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Presentation Reports */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <CardTitle className="text-gray-900 dark:text-gray-100">Presentation Reports</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {selectedReports.size} reports selected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableReports.map((report, index) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-600 dark:text-blue-400">{report.title}</h4>
                        <Badge 
                          variant="secondary" 
                          className={`mt-1 text-xs ${getBadgeColor(report.type)}`}
                        >
                          {report.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                <PresentationIcon className="h-4 w-4 mr-2" />
                Generate Presentation
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Presentation Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">Template management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company-info" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name" className="text-gray-700 dark:text-gray-300">Company Name</Label>
                    <Input id="company-name" placeholder="Your Company Name" className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="advisor-name" className="text-gray-700 dark:text-gray-300">Advisor Name</Label>
                    <Input id="advisor-name" placeholder="Advisor Name" className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address" className="text-gray-700 dark:text-gray-300">Address</Label>
                  <Textarea id="company-address" placeholder="Company Address" className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defaults" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Presentation Defaults</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">Default settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Presentation;
