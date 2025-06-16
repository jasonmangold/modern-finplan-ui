
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PresentationReports } from "@/components/PresentationReports";
import { 
  Presentation as PresentationIcon, 
  Download, 
  Play, 
  Settings, 
  FileText,
  BarChart3,
  Users,
  Calendar
} from "lucide-react";

const Presentation = () => {
  const presentations = [
    {
      name: "Q4 Client Review - Anderson Family",
      lastModified: "2 hours ago",
      status: "draft",
      slides: 12
    },
    {
      name: "Retirement Planning Presentation",
      lastModified: "1 day ago", 
      status: "completed",
      slides: 8
    },
    {
      name: "Investment Strategy Overview",
      lastModified: "3 days ago",
      status: "draft", 
      slides: 15
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <PresentationIcon className="h-8 w-8 text-blue-600" />
            Presentations
          </h1>
          <p className="text-gray-600 mt-1">Create and manage client presentations</p>
        </div>
        <Button className="flex items-center gap-2">
          <PresentationIcon className="h-4 w-4" />
          New Presentation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Selected Reports */}
        <div className="lg:col-span-1">
          <PresentationReports />
        </div>

        {/* Right Column - Existing Presentations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Presentations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {presentations.map((presentation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{presentation.name}</h3>
                        <Badge variant={presentation.status === 'completed' ? 'default' : 'secondary'}>
                          {presentation.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {presentation.lastModified}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {presentation.slides} slides
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Present
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <PresentationIcon className="h-6 w-6" />
                  <span className="text-sm">Create from Template</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <Download className="h-6 w-6" />
                  <span className="text-sm">Export All</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Share Settings</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Presentation Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
