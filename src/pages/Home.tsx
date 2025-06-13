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

  // Default section order as requested
  const [sections, setSections] = useState([
    { id: 'recent-clients', column: 0, title: 'Recent Clients', component: 'RecentClients' },
    { id: 'favorite-reports', column: 0, title: 'Favorite Reports', component: 'FavoriteReports' },
    { id: 'whats-new', column: 1, title: "What's New", component: 'WhatsNew' },
    { id: 'learn-improve', column: 1, title: 'Learn & Improve', component: 'LearnImprove' },
    { id: 'two-minute-tips', column: 1, title: 'Two Minute Tips', component: 'TwoMinuteTips' },
    { id: 'webinars', column: 2, title: 'Upcoming Webinars', component: 'Webinars' },
    { id: 'make-suggestion', column: 2, title: 'Got an Idea?', component: 'MakeSuggestion' }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dropIndicator, setDropIndicator] = useState(null);

  const handleDragStart = (e, sectionId) => {
    setDraggedItem(sectionId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Enhanced drag image
    const dragImage = e.currentTarget.cloneNode(true);
    dragImage.style.opacity = '0.9';
    dragImage.style.transform = 'rotate(3deg) scale(1.05)';
    dragImage.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    dragImage.style.borderRadius = '12px';
    document.body.appendChild(dragImage);
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    e.dataTransfer.setDragImage(dragImage, 150, 50);
    
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const getDropPosition = (e, targetElement) => {
    const rect = targetElement.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    return e.clientY < midY ? 'before' : 'after';
  };

  const handleDragEnter = (e, targetSectionId) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetSectionId) {
      const position = getDropPosition(e, e.currentTarget);
      setDropIndicator({ sectionId: targetSectionId, position });
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropIndicator(null);
    }
  };

  const handleDrop = (e, targetSectionId) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetSectionId) {
      const position = getDropPosition(e, e.currentTarget);
      const newSections = [...sections];
      
      // Find indices
      const draggedIndex = newSections.findIndex(s => s.id === draggedItem);
      const targetIndex = newSections.findIndex(s => s.id === targetSectionId);
      const targetSection = newSections[targetIndex];
      
      // Remove dragged item
      const [draggedSection] = newSections.splice(draggedIndex, 1);
      
      // Calculate insertion index
      let insertIndex = targetIndex;
      if (draggedIndex < targetIndex) {
        insertIndex = targetIndex;
      }
      
      if (position === 'after') {
        insertIndex += 1;
      }
      
      // Update column and insert
      draggedSection.column = targetSection.column;
      newSections.splice(insertIndex, 0, draggedSection);
      
      setSections(newSections);
    }
    
    setDraggedItem(null);
    setDropIndicator(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropIndicator(null);
  };

  // Group sections by column
  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.column]) acc[section.column] = [];
    acc[section.column].push(section);
    return acc;
  }, {});

  const renderSection = (section) => {
    const isDragging = draggedItem === section.id;
    const isDropTarget = dropIndicator?.sectionId === section.id;
    const showBeforeIndicator = isDropTarget && dropIndicator.position === 'before';
    const showAfterIndicator = isDropTarget && dropIndicator.position === 'after';
    
    const sectionProps = {
      draggable: true,
      onDragStart: (e) => handleDragStart(e, section.id),
      onDragOver: handleDragOver,
      onDragEnter: (e) => handleDragEnter(e, section.id),
      onDragLeave: handleDragLeave,
      onDrop: (e) => handleDrop(e, section.id),
      onDragEnd: handleDragEnd,
      className: `relative transition-all duration-300 ease-out ${
        isDragging 
          ? 'opacity-40 scale-105 rotate-2 z-50 shadow-2xl ring-2 ring-blue-400' 
          : 'hover:shadow-lg hover:-translate-y-1'
      }`
    };

    switch (section.component) {
      case 'RecentClients':
        return (
          <div key={section.id} className="relative">
            {showBeforeIndicator && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
            <Card {...sectionProps}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
            {showAfterIndicator && (
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
          </div>
        );

      case 'FavoriteReports':
        return (
          <div key={section.id} className="relative">
            {showBeforeIndicator && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
            <Card {...sectionProps}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
            {showAfterIndicator && (
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
          </div>
        );

      case 'LearnImprove':
        return (
          <div key={section.id} className="relative">
            {showBeforeIndicator && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
            <Card {...sectionProps}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
            {showAfterIndicator && (
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
          </div>
        );

      case 'Webinars':
        return (
          <div key={section.id} className="relative">
            {showBeforeIndicator && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
            <Card {...sectionProps}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
            {showAfterIndicator && (
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
          </div>
        );

      case 'TwoMinuteTips':
        return (
          <div key={section.id} className="relative">
            {showBeforeIndicator && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
            <Card {...sectionProps}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
            {showAfterIndicator && (
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
          </div>
        );

      case 'MakeSuggestion':
        return (
          <div key={section.id} className="relative">
            {showBeforeIndicator && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
            <Card {...sectionProps}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
            {showAfterIndicator && (
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
          </div>
        );

      case 'WhatsNew':
        return (
          <div key={section.id} className="relative">
            {showBeforeIndicator && (
              <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
            <Card {...sectionProps}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
            {showAfterIndicator && (
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg z-20" />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner / Smart Hero Strip */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
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
          <div className="flex gap-3">
            {isFirstTime ? (
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                Take a Quick Tour
              </Button>
            ) : (
              <>
                <Button variant="outline" className="border-blue-300 text-blue-100 hover:bg-blue-600 hover:border-blue-200 hover:text-white">
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
        {/* Left Column */}
        <div className="space-y-6">
          {groupedSections[0]?.map(section => renderSection(section))}
        </div>

        {/* Center Column */}
        <div className="space-y-6">
          {groupedSections[1]?.map(section => renderSection(section))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {groupedSections[2]?.map(section => renderSection(section))}
        </div>
      </div>
    </div>
  );
};

export default Home;
