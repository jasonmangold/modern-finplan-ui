import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useState, useRef, useEffect } from "react";
import { User, FileText, Play, Calendar, Lightbulb, Star, MoreHorizontal, Clock, ArrowRight, ChevronDown, Folder, GraduationCap, Video, Zap, Sparkles, MessageSquarePlus, TrendingUp, BarChart3, PlusCircle, BookOpen, Users } from "lucide-react";
const Home = () => {
  const userName = "Jason";
  const isFirstTime = false;
  const currentClient = "Anderson Family – Retirement Plan";
  const clientLastModified = "15 minutes ago";
  const recentClients = [{
    name: "John Doe",
    lastUpdated: "2 hours ago",
    status: "active",
    type: "Retirement Plan"
  }, {
    name: "Jane Smith", 
    lastUpdated: "1 day ago",
    status: "pending",
    type: "Financial Review"
  }, {
    name: "Mike Johnson",
    lastUpdated: "3 days ago", 
    status: "active",
    type: "Investment Strategy"
  }, {
    name: "Sarah Wilson",
    lastUpdated: "5 days ago",
    status: "completed", 
    type: "Estate Planning"
  }];

  // Load favorite reports from localStorage (including calculator favorites)
  const [favoriteReports, setFavoriteReports] = useState([{
    name: "Fast Facts",
    type: "Reference"
  }, {
    name: "Federal Income Tax Tables",
    type: "Tax"
  }, {
    name: "Retirement Calculator",
    type: "Planning"
  }]);
  useEffect(() => {
    const homePageFavorites = JSON.parse(localStorage.getItem('home-favorite-reports') || '[]');
    if (homePageFavorites.length > 0) {
      setFavoriteReports(prev => [...prev, ...homePageFavorites]);
    }
  }, []);
  const upcomingWebinars = [{
    title: "Retirement Planning 101",
    date: "Dec 15",
    time: "2:00 PM"
  }, {
    title: "Investing in 2025",
    date: "Dec 18",
    time: "1:00 PM"
  }];
  const twoMinuteTips = [{
    title: "Setting up 529 Plans",
    duration: "2:15"
  }, {
    title: "Budgeting Basics",
    duration: "1:45"
  }];

  // Quick Actions Component
  const QuickActions = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Button variant="outline" className="h-16 flex flex-col gap-1 hover:bg-primary/5 border-primary/20">
        <PlusCircle className="h-5 w-5 text-primary" />
        <span className="text-sm">New Client</span>
      </Button>
      <Button variant="outline" className="h-16 flex flex-col gap-1 hover:bg-primary/5 border-primary/20">
        <BarChart3 className="h-5 w-5 text-primary" />
        <span className="text-sm">Analysis</span>
      </Button>
      <Button variant="outline" className="h-16 flex flex-col gap-1 hover:bg-primary/5 border-primary/20">
        <FileText className="h-5 w-5 text-primary" />
        <span className="text-sm">Reports</span>
      </Button>
      <Button variant="outline" className="h-16 flex flex-col gap-1 hover:bg-primary/5 border-primary/20">
        <Users className="h-5 w-5 text-primary" />
        <span className="text-sm">Presentation</span>
      </Button>
    </div>
  );

  const SectionRecentClients = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Recent Clients
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentClients.slice(0, 4).map((client, index) => (
          <div key={index} className="group flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-all cursor-pointer">
            <div className="flex-1">
              <div className="font-medium text-foreground group-hover:text-primary transition-colors">{client.name}</div>
              <div className="text-sm text-muted-foreground">{client.type}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                {client.lastUpdated}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={client.status === 'active' ? 'default' : client.status === 'pending' ? 'secondary' : 'outline'} 
                className="text-xs"
              >
                {client.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
  const SectionFavoriteReports = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" />
          Quick Access
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {favoriteReports.slice(0, 4).map((report, index) => (
          <div key={index} className="group flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">{report.name}</div>
                <div className="text-sm text-muted-foreground">{report.type}</div>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
  const SectionWhatsNew = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What's New
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4 py-2">
            <h4 className="font-medium text-foreground">2025 Tax Updates</h4>
            <p className="text-sm text-muted-foreground">New calculations and tables</p>
            <span className="text-xs text-primary font-medium">Dec 14, 2024</span>
          </div>
          <div className="border-l-4 border-emerald-500 pl-4 py-2">
            <h4 className="font-medium text-foreground">Enhanced Analysis Tools</h4>
            <p className="text-sm text-muted-foreground">Improved retirement projections</p>
            <span className="text-xs text-emerald-600 font-medium">Dec 8, 2024</span>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <h4 className="font-medium text-foreground">PDF Export Updates</h4>
            <p className="text-sm text-muted-foreground">Faster generation</p>
            <span className="text-xs text-amber-600 font-medium">Dec 1, 2024</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  const SectionTwoMinuteTips = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Play className="h-5 w-5 text-primary" />
          Quick Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {twoMinuteTips.map((tip, index) => (
          <div key={index} className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Play className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground group-hover:text-primary transition-colors">{tip.title}</div>
              <div className="text-sm text-muted-foreground">{tip.duration}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
  const SectionLearnImprove = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Learning Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2 text-foreground">Getting Started Tour</h3>
          <p className="text-sm text-muted-foreground mb-3">Master the platform in 5 minutes</p>
          <Button className="w-full" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Start Tour
          </Button>
        </div>
        <div className="p-4 bg-accent/30 rounded-lg border border-border">
          <h3 className="font-semibold mb-2 text-foreground">Expert Training</h3>
          <p className="text-sm text-muted-foreground mb-3">One-on-one coaching session</p>
          <Button variant="outline" className="w-full" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  const SectionWebinars = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingWebinars.map((webinar, index) => (
          <div key={index} className="group flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Video className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">{webinar.title}</div>
                <div className="text-sm text-muted-foreground">{webinar.date} at {webinar.time}</div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
              Join
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
  const SectionMakeSuggestion = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5 text-primary" />
          Share Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Help us improve your experience with suggestions and feedback.
        </p>
        <Button className="w-full" variant="outline">
          <MessageSquarePlus className="h-4 w-4 mr-2" />
          Send Feedback
        </Button>
      </CardContent>
    </Card>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section - Full Width */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative px-6 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              {/* Welcome Content */}
              <div className="flex-1 text-white">
                <div className="mb-6">
                  <TextShimmer 
                    as="h1" 
                    duration={2}
                    className="text-3xl lg:text-4xl font-bold mb-3"
                  >
                    {isFirstTime ? "Welcome to eAdvisys!" : `Welcome back, ${userName}!`}
                  </TextShimmer>
                  <p className="text-xl text-primary-foreground/90 mb-2">
                    {isFirstTime 
                      ? "Your comprehensive financial planning platform" 
                      : "Ready to help your clients achieve their financial goals"
                    }
                  </p>
                </div>

                {!isFirstTime && currentClient && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Folder className="h-5 w-5 text-white" />
                      <span className="font-semibold text-white">Current Project</span>
                    </div>
                    <div className="text-white/90">
                      <div className="font-medium text-lg">{currentClient}</div>
                      <div className="text-sm text-white/70 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        Last modified {clientLastModified}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-auto">
                {isFirstTime ? (
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                    <Play className="h-5 w-5 mr-2" />
                    Get Started
                  </Button>
                ) : (
                  <>
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Continue Work
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <ChevronDown className="h-5 w-5 mr-2" />
                      Switch Client
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h2>
            <QuickActions />
          </div>

          {/* Primary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content Area - 8 columns */}
            <div className="lg:col-span-8 space-y-6">
              {/* Active Work Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Active Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SectionRecentClients />
                  <SectionFavoriteReports />
                </div>
              </div>

              {/* Learning & Updates Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Updates & Learning
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SectionTwoMinuteTips />
                  <SectionWhatsNew />
                </div>
              </div>
            </div>

            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              <SectionLearnImprove />
              <SectionWebinars />
              <SectionMakeSuggestion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;