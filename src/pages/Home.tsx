
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
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
  const [dragOverItem, setDragOverItem] = useState(null);
  const [dragOverPosition, setDragOverPosition] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (e, sectionId) => {
    setDraggedItem(sectionId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Create a semi-transparent drag image
    const dragImage = e.currentTarget.cloneNode(true);
    dragImage.style.opacity = '0.8';
    dragImage.style.transform = 'rotate(2deg)';
    dragImage.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
    document.body.appendChild(dragImage);
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    e.dataTransfer.setDragImage(dragImage, dragOffset.x, dragOffset.y);
    
    // Remove the temporary drag image after a short delay
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 0);
    
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, targetSectionId, position = 'middle') => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetSectionId) {
      setDragOverItem(targetSectionId);
      setDragOverPosition(position);
    }
  };

  const handleDragLeave = (e) => {
    // Only clear drag over if we're leaving the entire card area
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverItem(null);
      setDragOverPosition(null);
    }
  };

  const handleDrop = (e, targetSectionId, position = 'middle') => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetSectionId) {
      const newSections = [...sections];
      const draggedIndex = newSections.findIndex(s => s.id === draggedItem);
      const targetIndex = newSections.findIndex(s => s.id === targetSectionId);
      const targetSection = newSections[targetIndex];
      
      // Remove dragged item
      const [draggedSection] = newSections.splice(draggedIndex, 1);
      
      // Calculate new position based on drop position
      let insertIndex = targetIndex;
      if (draggedIndex < targetIndex) {
        // If dragging down, adjust for the removed item
        insertIndex = targetIndex;
      }
      
      if (position === 'bottom') {
        insertIndex += 1;
      }
      
      // Update the column of the dragged section to match the target
      draggedSection.column = targetSection.column;
      
      // Insert at calculated position
      newSections.splice(insertIndex, 0, draggedSection);
      
      setSections(newSections);
    }
    setDraggedItem(null);
    setDragOverItem(null);
    setDragOverPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
    setDragOverPosition(null);
  };

  // Group sections by column with smooth transitions
  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.column]) acc[section.column] = [];
    acc[section.column].push(section);
    return acc;
  }, {});

  const renderSection = (section) => {
    const isDragging = draggedItem === section.id;
    const isDragOverTop = dragOverItem === section.id && dragOverPosition === 'top';
    const isDragOverBottom = dragOverItem === section.id && dragOverPosition === 'bottom';
    
    const sectionProps = {
      draggable: true,
      onDragStart: (e) => handleDragStart(e, section.id),
      onDragOver: handleDragOver,
      onDragEnd: handleDragEnd,
      className: `relative transition-all duration-200 ease-in-out transform ${
        isDragging 
          ? 'opacity-50 scale-105 rotate-1 z-50 shadow-2xl' 
          : 'hover:shadow-md'
      } ${
        isDragOverTop ? 'border-t-4 border-blue-500' : ''
      } ${
        isDragOverBottom ? 'border-b-4 border-blue-500' : ''
      }`
    };

    // Add drop zones
    const dropZoneProps = {
      onDragEnter: (e) => e.preventDefault(),
      onDragOver: (e) => e.preventDefault(),
      onDrop: (e) => e.preventDefault()
    };

    const topDropZone = (
      <div
        className="absolute -top-2 left-0 right-0 h-4 z-10"
        onDragEnter={(e) => handleDragEnter(e, section.id, 'top')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, section.id, 'top')}
        {...dropZoneProps}
      />
    );

    const bottomDropZone = (
      <div
        className="absolute -bottom-2 left-0 right-0 h-4 z-10"
        onDragEnter={(e) => handleDragEnter(e, section.id, 'bottom')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, section.id, 'bottom')}
        {...dropZoneProps}
      />
    );

    switch (section.component) {
      case 'RecentClients':
        return (
          <div key={section.id} className="relative">
            {topDropZone}
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
            {bottomDropZone}
          </div>
        );

      case 'FavoriteReports':
        return (
          <div key={section.id} className="relative">
            {topDropZone}
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
            {bottomDropZone}
          </div>
        );

      case 'LearnImprove':
        return (
          <div key={section.id} className="relative">
            {topDropZone}
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
            {bottomDropZone}
          </div>
        );

      case 'Webinars':
        return (
          <div key={section.id} className="relative">
            {topDropZone}
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
            {bottomDropZone}
          </div>
        );

      case 'TwoMinuteTips':
        return (
          <div key={section.id} className="relative">
            {topDropZone}
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
            {bottomDropZone}
          </div>
        );

      case 'MakeSuggestion':
        return (
          <div key={section.id} className="relative">
            {topDropZone}
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
            {bottomDropZone}
          </div>
        );

      case 'WhatsNew':
        return (
          <div key={section.id} className="relative">
            {topDropZone}
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
            {bottomDropZone}
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
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
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
