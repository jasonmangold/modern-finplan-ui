import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useState, useRef, useEffect } from "react";
import { User, FileText, Play, Calendar, Lightbulb, Star, MoreHorizontal, Clock, ArrowRight, ChevronDown, Folder, GraduationCap, Video, Zap, Sparkles, MessageSquarePlus, TrendingUp, GripVertical } from "lucide-react";
const Home = () => {
  const userName = "Jason";
  const isFirstTime = false;
  const currentClient = "Anderson Family – Retirement Plan";
  const recentClients = [{
    name: "John Doe",
    lastUpdated: "2 hours ago",
    status: "active"
  }, {
    name: "Jane Smith",
    lastUpdated: "1 day ago",
    status: "pending"
  }, {
    name: "Mike Johnson",
    lastUpdated: "3 days ago",
    status: "active"
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

  // Modern card styling with consistent height
  const cardClass = "h-[420px] flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl";
  const SectionRecentClients = () => <Card className={cardClass}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          Recent Clients
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          See all <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {recentClients.map((client, index) => <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-accent/50 transition-all duration-200 hover:shadow-md">
            <div className="flex-1">
              <div className="font-semibold text-foreground">{client.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <Clock className="h-3 w-3" />
                {client.lastUpdated}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="text-xs font-medium">
                {client.status}
              </Badge>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>)}
      </CardContent>
    </Card>;
  const SectionFavoriteReports = () => <Card className={cardClass}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          Favorite Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {favoriteReports.map((report, index) => <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-accent/50 transition-all duration-200 cursor-pointer hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{report.name}</div>
                <div className="text-sm text-muted-foreground">{report.type}</div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              Open
            </Button>
          </div>)}
      </CardContent>
    </Card>;
  const SectionWhatsNew = () => <Card className={cardClass}>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          What's New
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        <div className="space-y-6">
          <div className="relative pl-6 border-l-2 border-primary">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
            <h4 className="font-semibold text-foreground">One Big Beautiful Bill Act of 2025 Update</h4>
            <p className="text-sm text-muted-foreground mt-1">New visualizations for retirement goals</p>
            <Badge variant="secondary" className="text-xs mt-2">Aug 31, 2025</Badge>
          </div>
          <div className="relative pl-6 border-l-2 border-green-500">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
            <h4 className="font-semibold text-foreground">Improved PDF Exports</h4>
            <p className="text-sm text-muted-foreground mt-1">Faster generation with better formatting</p>
            <Badge variant="secondary" className="text-xs mt-2">Dec 8, 2024</Badge>
          </div>
        </div>
      </CardContent>
    </Card>;
  const SectionTwoMinuteTips = () => <Card className={cardClass}>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>
          Two Minute Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="space-y-4">
          {twoMinuteTips.map((tip, index) => <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-accent/50 transition-all duration-200 cursor-pointer hover:shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{tip.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{tip.duration}</div>
              </div>
            </div>)}
        </div>
      </CardContent>
    </Card>;
  const SectionLearnImprove = () => <Card className={cardClass}>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          Learn & Improve
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="font-semibold mb-3 text-foreground">Getting Started Tour</h3>
            <p className="text-sm text-muted-foreground mb-4">Learn the basics in just 2 minutes</p>
            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Take 2-Minute Tour
            </Button>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="font-semibold mb-3 text-foreground">Schedule Training</h3>
            <p className="text-sm text-muted-foreground mb-4">Book personalized training session</p>
            <Button variant="outline" className="w-full hover:bg-green-50 hover:text-green-700 border-green-200">
              <Calendar className="h-4 w-4 mr-2" />
              Book Training
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
  const SectionWebinars = () => <Card className={cardClass}>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Video className="h-5 w-5 text-purple-600" />
          </div>
          Upcoming Webinars
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="space-y-4">
          {upcomingWebinars.map((webinar, index) => <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-accent/50 transition-all duration-200 hover:shadow-md">
              <div>
                <div className="font-semibold text-foreground">{webinar.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{webinar.date} at {webinar.time}</div>
              </div>
              <Button size="sm" variant="outline" className="hover:bg-purple-500 hover:text-white hover:border-purple-500">
                Join
              </Button>
            </div>)}
        </div>
      </CardContent>
    </Card>;
  const SectionMakeSuggestion = () => <Card className={cardClass}>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <MessageSquarePlus className="h-5 w-5 text-green-600" />
          </div>
          Got an Idea?
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Help us improve eAdvisys with your feedback and suggestions.
          </p>
          <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center">
            <Lightbulb className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <Button className="w-full mt-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg">
          <MessageSquarePlus className="h-4 w-4 mr-2" />
          Make a Suggestion
        </Button>
      </CardContent>
    </Card>;
  return <div className="min-h-screen w-full bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto p-8 space-y-8">
        {/* Hero Welcome Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-2xl shadow-2xl"></div>
          <div className="relative bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-primary-foreground shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                {isFirstTime ? (
                  <h1 className="text-4xl font-bold">Welcome to eAdvisys!</h1>
                ) : (
                  <TextShimmer 
                    as="h1" 
                    duration={1.2} 
                    className="text-4xl font-bold [--base-color:hsl(var(--primary-foreground)/0.7)] [--base-gradient-color:hsl(var(--primary-foreground))]"
                  >
                    {`Welcome back, ${userName}!`}
                  </TextShimmer>
                )}
                {!isFirstTime && currentClient && (
                  <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-3">
                    <Folder className="h-5 w-5 text-primary-foreground/80" />
                    <p className="text-primary-foreground/90">
                      Currently working on: <span className="font-semibold text-primary-foreground cursor-pointer hover:underline">{currentClient}</span>
                    </p>
                  </div>
                )}
                <p className="text-xl text-primary-foreground/90">
                  {isFirstTime ? "Let's get you started with your comprehensive financial advisory toolkit" : "Ready to continue where you left off?"}
                </p>
              </div>
              <div className="flex gap-3">
                {isFirstTime ? (
                  <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Play className="h-5 w-5 mr-2" />
                    Take a Quick Tour
                  </Button>
                ) : (
                  <>
                    <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      <ChevronDown className="h-5 w-5 mr-2" />
                      Switch Client
                    </Button>
                    <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Resume Working
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <SectionRecentClients />
          <SectionFavoriteReports />
          <SectionWhatsNew />
          <SectionLearnImprove />
          <SectionTwoMinuteTips />
          <SectionWebinars />
          <div className="lg:col-start-2">
            <SectionMakeSuggestion />
          </div>
        </div>
      </div>
    </div>;
};
export default Home;