import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useState, useRef, useEffect } from "react";
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
  TrendingUp,
  GripVertical
} from "lucide-react";

const Home = () => {
  const userName = "Jason";
  const isFirstTime = false;
  const currentClient = "Anderson Family – Retirement Plan";

  const recentClients = [
    { name: "John Doe", lastUpdated: "2 hours ago", status: "active" },
    { name: "Jane Smith", lastUpdated: "1 day ago", status: "pending" },
    { name: "Mike Johnson", lastUpdated: "3 days ago", status: "active" }
  ];

  // Load favorite reports from localStorage (including calculator favorites)
  const [favoriteReports, setFavoriteReports] = useState([
    { name: "Fast Facts", type: "Reference" },
    { name: "Federal Income Tax Tables", type: "Tax" },
    { name: "Retirement Calculator", type: "Planning" }
  ]);

  useEffect(() => {
    const homePageFavorites = JSON.parse(localStorage.getItem('home-favorite-reports') || '[]');
    if (homePageFavorites.length > 0) {
      setFavoriteReports(prev => [...prev, ...homePageFavorites]);
    }
  }, []);

  const upcomingWebinars = [
    { title: "Retirement Planning 101", date: "Dec 15", time: "2:00 PM" },
    { title: "Investing in 2025", date: "Dec 18", time: "1:00 PM" }
  ];

  const twoMinuteTips = [
    { title: "Setting up 529 Plans", duration: "2:15" },
    { title: "Budgeting Basics", duration: "1:45" }
  ];

  // Remove drag-and-drop & dynamic state (now all columns are static layout)

  // --- Helper: Section Components ---
  const SectionRecentClients = () => (
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
  );

  const SectionFavoriteReports = () => (
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
  );

  const SectionLearnImprove = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          Learn & Improve
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Getting Started Tour</h3>
          <p className="text-sm text-gray-600 mb-3">Learn the basics in just 2 minutes</p>
          <Button className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Take 2-Minute Tour
          </Button>
        </div>
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
  );

  const SectionWhatsNew = () => (
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
  );

  const SectionTwoMinuteTips = () => (
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
  );

  const SectionWebinars = () => (
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
  );

  const SectionMakeSuggestion = () => (
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
  );

  // --- End: Section Components ---

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Modernized Welcome Banner */}
      <div className="relative rounded-xl p-6 text-white overflow-hidden mb-6 shadow-lg">
        {/* Modern mesh gradient and subtle dot-pattern overlay */}
        <div aria-hidden className="absolute inset-0 z-0">
          {/* Main mesh gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 opacity-95" />
          {/* Subtle mesh/texture */}
          <svg
            className="absolute inset-0 w-full h-full opacity-15"
            style={{ pointerEvents: 'none' }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 600 400"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="600" height="400" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative z-10 flex items-center flex-wrap justify-between">
          <div>
            {isFirstTime ? (
              <h1 className="text-2xl font-bold mb-2">Welcome to eAdvisys!</h1>
            ) : (
              <TextShimmer
                as="h1"
                duration={1.2}
                className="text-2xl font-bold mb-2 [--base-color:theme(colors.blue.200)] [--base-gradient-color:theme(colors.white)] dark:[--base-color:theme(colors.blue.300)] dark:[--base-gradient-color:theme(colors.blue.100)]"
              >
                {`Welcome back, ${userName}!`}
              </TextShimmer>
            )}
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
          <div className="flex gap-3 mt-4 lg:mt-0">
            {isFirstTime ? (
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 shadow border">
                Take a Quick Tour
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 shadow-sm font-semibold transition-all focus:ring-2 focus:ring-blue-300"
                  style={{ minWidth: 148 }}
                >
                  <ChevronDown className="h-4 w-4 mr-2 text-blue-700" />
                  <span className="text-blue-800 font-semibold">Switch Client</span>
                </Button>
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                  Resume Working
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: 3 Columns, balanced height, fixed order */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-[260px] flex">
            <SectionRecentClients />
          </div>
          <div className="flex-1 min-h-[260px] flex">
            <SectionWhatsNew />
          </div>
          <div className="flex-1 min-h-[260px] flex">
            <SectionMakeSuggestion />
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-[260px] flex">
            <SectionFavoriteReports />
          </div>
          <div className="flex-1 min-h-[260px] flex">
            <SectionTwoMinuteTips />
          </div>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-[260px] flex">
            <SectionLearnImprove />
          </div>
          <div className="flex-1 min-h-[260px] flex">
            <SectionWebinars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
