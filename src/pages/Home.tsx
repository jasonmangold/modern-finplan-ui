import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useState, useRef, useEffect } from "react";
import { User, FileText, Play, Calendar, Lightbulb, Star, MoreHorizontal, Clock, ArrowRight, ChevronDown, Folder, GraduationCap, Video, Zap, Sparkles, MessageSquarePlus, TrendingUp, GripVertical, Edit2, FileBarChart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Home = () => {
  const userName = "Jason";
  const isFirstTime = false;
  const currentClient = "Anderson Family – Retirement Plan";
  const recentClients = [{
    name: "John Doe",
    lastUpdated: "2 hours ago",
    reportCount: 5
  }, {
    name: "Jane Smith",
    lastUpdated: "1 day ago",
    reportCount: 3
  }, {
    name: "Mike Johnson",
    lastUpdated: "3 days ago",
    reportCount: 8
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

  // Modern section components with content-driven heights and design system colors
  const SectionRecentClients = () => <Card className="glass-card border-2 border-border/60 shadow-xl shadow-blue-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Recent Clients
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          See all <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentClients.map((client, index) => <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/60 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
            <div className="flex-1">
              <div className="font-semibold text-foreground group-hover:text-primary">{client.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {client.lastUpdated}
                </div>
                <div className="flex items-center gap-1.5">
                  <FileBarChart className="h-3.5 w-3.5" />
                  {client.reportCount} reports
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" className="modern-button">
                Open
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    Description
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>)}
      </CardContent>
    </Card>;
  const SectionWhatsNew = () => <Card className="glass-card border-2 border-border/60 shadow-xl shadow-blue-500/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          What's New
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="relative pl-4 border-l-2 border-blue-500">
            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
            <h4 className="font-semibold text-foreground">One Big Beautiful Bill Act of 2025 Update</h4>
            <p className="text-sm text-muted-foreground mt-1">2 new reports and 24 updated reports</p>
            <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Aug 1, 2025</span>
          </div>
          <div className="relative pl-4 border-l-2 border-green-500">
            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-green-500 rounded-full"></div>
            <h4 className="font-semibold text-foreground">2025.01 Update</h4>
            <p className="text-sm text-muted-foreground mt-1">Updated with new inflation, tax, and cost-of-living stats; GPO and WEP reports removed per the Social Security Fairness Act.</p>
            <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Mar 1, 2025</span>
          </div>
        </div>
      </CardContent>
    </Card>;
  const SectionFavoriteReports = () => <Card className="glass-card border-2 border-border/60 shadow-xl shadow-amber-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" />
          Favorite Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {favoriteReports.map((report, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/60 backdrop-blur-sm hover:border-accent/60 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">{report.name}</div>
                <div className="text-sm text-muted-foreground">{report.type}</div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="modern-button opacity-0 group-hover:opacity-100 transition-opacity">
              Open
            </Button>
          </div>)}
      </CardContent>
    </Card>;
  const SectionLearnImprove = () => <Card className="glass-card border-2 border-border/60 shadow-xl shadow-green-500/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          Learn & Improve
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-2 text-foreground">Getting Started Tour</h3>
          <p className="text-sm text-muted-foreground mb-3">Learn the basics in just 2 minutes</p>
          <Button className="w-full modern-button">
            <Play className="h-4 w-4 mr-2" />
            Take 2-Minute Tour
          </Button>
        </div>
        <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl border border-secondary/20">
          <h3 className="font-semibold mb-2 text-foreground">Schedule Training</h3>
          <p className="text-sm text-muted-foreground mb-3">Book personalized training session</p>
          <Button variant="outline" className="w-full modern-button">
            <Calendar className="h-4 w-4 mr-2" />
            Book Training
          </Button>
        </div>
      </CardContent>
    </Card>;
  const SectionTwoMinuteTips = () => <Card className="glass-card border-2 border-border/60 shadow-lg shadow-amber-500/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Two Minute Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {twoMinuteTips.map((tip, index) => <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/50 transition-all">
              <Play className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{tip.title}</div>
              <div className="text-sm text-muted-foreground">{tip.duration}</div>
            </div>
          </div>)}
      </CardContent>
    </Card>;
  const SectionWebinars = () => <Card className="glass-card border-2 border-border/60 shadow-lg shadow-violet-500/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Video className="h-5 w-5 text-violet-600" />
          Upcoming Webinars
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingWebinars.map((webinar, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:border-accent hover:bg-accent/10 transition-all duration-200 group">
            <div>
              <div className="font-medium text-foreground">{webinar.title}</div>
              <div className="text-sm text-muted-foreground">{webinar.date} at {webinar.time}</div>
            </div>
            <Button size="sm" variant="outline" className="modern-button opacity-0 group-hover:opacity-100 transition-opacity">
              Join
            </Button>
          </div>)}
      </CardContent>
    </Card>;
  const SectionMakeSuggestion = () => <Card className="glass-card border-2 border-border/60 shadow-lg shadow-emerald-500/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5 text-emerald-600" />
          Got an Idea?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Help us improve eAdvisys with your feedback and suggestions.
        </p>
        <Button className="w-full modern-button bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground">
          Make a Suggestion
        </Button>
      </CardContent>
    </Card>;
  return <div className="p-6 lg:p-8 space-y-8 min-h-screen bg-background">
      {/* Clean Welcome Header */}
      <div className="space-y-2">
        {isFirstTime ? <h1 className="text-3xl font-bold text-foreground">Welcome to eAdvisys!</h1> : <TextShimmer as="h1" duration={1.2} className="text-3xl font-bold text-foreground">
            {`Welcome back, ${userName}!`}
          </TextShimmer>}
        <p className="text-lg text-muted-foreground">
          {isFirstTime ? "Let's get you started with your financial advisory toolkit" : "Your comprehensive financial planning dashboard"}
        </p>
      </div>

      {/* Modern Asymmetric Layout */}
      <div className="space-y-8">
        {/* Primary Row - Recent Clients (Larger) + What's New */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SectionRecentClients />
          </div>
          <div className="lg:col-span-1">
            <SectionWhatsNew />
          </div>
        </div>

        {/* Secondary Row - Equal width cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SectionFavoriteReports />
          <SectionLearnImprove />
          <div className="md:col-span-2 lg:col-span-1">
            <Card className="glass-card border-2 border-border/60 shadow-xl shadow-emerald-500/10 h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Active Clients</div>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-secondary">8</div>
                    <div className="text-xs text-muted-foreground">Plans Created</div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-accent/20 to-accent/30 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-1">This Month</div>
                  <div className="text-2xl font-bold text-accent-foreground">$2.4M</div>
                  <div className="text-xs text-muted-foreground">Assets Under Management</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Supporting Row - Smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SectionTwoMinuteTips />
          <SectionWebinars />
          <SectionMakeSuggestion />
        </div>
      </div>
    </div>;
};
export default Home;