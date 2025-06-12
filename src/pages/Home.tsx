import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  FileText, 
  Play, 
  Calendar, 
  Lightbulb, 
  Star, 
  MoreHorizontal, 
  Clock, 
  ArrowRight,
  ChevronDown,
  Folder,
  GraduationCap,
  Video,
  Zap,
  Sparkles,
  MessageSquarePlus,
  TrendingUp
} from "lucide-react";

const Home = () => {
  const userName = "Jason"; // This would come from user context in a real app
  const isFirstTime = false; // This would be determined by user session data
  const currentClient = "Anderson Family – Retirement Plan"; // Current client work

  const recentClients = [
    { name: "John Doe", lastUpdated: "2 hours ago", status: "active" },
    { name: "Jane Smith", lastUpdated: "1 day ago", status: "pending" },
    { name: "Mike Johnson", lastUpdated: "3 days ago", status: "active" }
  ];

  const favoriteReports = [
    { name: "Fast Facts", type: "Reference" },
    { name: "Federal Income Tax Tables", type: "Tax" },
    { name: "Retirement Calculator", type: "Planning" }
  ];

  const upcomingWebinars = [
    { title: "Retirement Planning 101", date: "Dec 15", time: "2:00 PM" },
    { title: "Investing in 2025", date: "Dec 18", time: "1:00 PM" }
  ];

  const twoMinuteTips = [
    { title: "Setting up 529 Plans", duration: "2:15" },
    { title: "Budgeting Basics", duration: "1:45" }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner / Smart Hero Strip */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {isFirstTime ? "Welcome to eAdvisys!" : `Welcome back, ${userName}!`}
            </h1>
            {!isFirstTime && currentClient && (
              <div className="flex items-center gap-2 mb-4">
                <Folder className="h-4 w-4 text-blue-200" />
                <p className="text-blue-100 text-sm">
                  You're working on: <span className="text-white font-medium cursor-pointer hover:underline">{currentClient}</span>
                </p>
              </div>
            )}
            <p className="text-blue-100 mb-4">
              {isFirstTime 
                ? "Let's get you started with your financial advisory toolkit" 
                : "Ready to continue where you left off?"
              }
            </p>
          </div>
          <div className="flex gap-3">
            {isFirstTime ? (
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                Take a Quick Tour
              </Button>
            ) : (
              <>
                <Button variant="outline" className="border-blue-400 text-white hover:bg-blue-600">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Switch Client
                </Button>
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                  Resume Working
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Modular Dashboard (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Quick Access */}
        <div className="space-y-6">
          {/* Recent Clients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Recent Clients
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                See all <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {client.lastUpdated}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {client.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Favorite Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Favorite Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {favoriteReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.type}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Learning & Training */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Learn & Improve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Getting Started Tour */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Getting Started Tour</h3>
                <p className="text-sm text-gray-600 mb-3">Learn the basics in just 2 minutes</p>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Take 2-Minute Tour
                </Button>
              </div>

              {/* Schedule Training */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Schedule Training</h3>
                <p className="text-sm text-gray-600 mb-3">Book personalized training session</p>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Training
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Webinars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5 text-purple-600" />
                Upcoming Webinars
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingWebinars.map((webinar, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{webinar.title}</div>
                    <div className="text-sm text-gray-500">{webinar.date} at {webinar.time}</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Two Minute Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Two Minute Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {twoMinuteTips.map((tip, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Play className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{tip.title}</div>
                    <div className="text-sm text-gray-500">{tip.duration}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Suggestions & Updates */}
        <div className="space-y-6">
          {/* Make a Suggestion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquarePlus className="h-5 w-5 text-green-600" />
                Got an Idea?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Help us improve eAdvisys with your feedback and suggestions.
              </p>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                Make a Suggestion
              </Button>
            </CardContent>
          </Card>

          {/* Try This Next */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Try This Next
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">Create a Proposal</h3>
                <p className="text-sm text-gray-600 mb-3">
                  You recently worked with John Doe. Ready to create a proposal?
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Start Proposal
                </Button>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold mb-2">Update Tax Tables</h3>
                <p className="text-sm text-gray-600 mb-3">
                  2025 tax tables are now available for your calculations.
                </p>
                <Button size="sm" variant="outline">
                  View Updates
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What's New */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                What's New
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium">Enhanced Goal Planning</h4>
                <p className="text-sm text-gray-600">New visualizations for retirement goals</p>
                <span className="text-xs text-blue-600">Dec 10, 2024</span>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium">Improved PDF Exports</h4>
                <p className="text-sm text-gray-600">Faster generation with better formatting</p>
                <span className="text-xs text-green-600">Dec 8, 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
