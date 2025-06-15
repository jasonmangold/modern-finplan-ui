
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Calculator, 
  FileText, 
  PresentationChart, 
  Users, 
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const quickActions = [
    {
      title: "Start Analysis",
      description: "Begin comprehensive financial analysis",
      icon: BarChart3,
      href: "/analysis",
      color: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
    },
    {
      title: "Use Calculator",
      description: "Access financial calculators",
      icon: Calculator,
      href: "/calculators",
      color: "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
    },
    {
      title: "Browse Reports",
      description: "View educational resources",
      icon: FileText,
      href: "/education",
      color: "bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
    },
    {
      title: "Create Presentation",
      description: "Build client presentations",
      icon: PresentationChart,
      href: "/presentation",
      color: "bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
    }
  ];

  const recentActivity = [
    {
      title: "Johnson Family Analysis",
      description: "Retirement planning analysis completed",
      time: "2 hours ago",
      status: "completed"
    },
    {
      title: "Social Security Calculator",
      description: "Optimization calculation in progress",
      time: "4 hours ago",
      status: "pending"
    },
    {
      title: "Investment Portfolio Review",
      description: "Quarterly review presentation created",
      time: "1 day ago",
      status: "completed"
    }
  ];

  const stats = [
    {
      title: "Active Clients",
      value: "24",
      change: "+12%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Analyses Completed",
      value: "156",
      change: "+8%",
      icon: BarChart3,
      trend: "up"
    },
    {
      title: "Reports Generated",
      value: "89",
      change: "+15%",
      icon: FileText,
      trend: "up"
    },
    {
      title: "Goals Tracked",
      value: "67",
      change: "+23%",
      icon: Target,
      trend: "up"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to eAdvisys
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your comprehensive financial planning platform. Analyze, calculate, educate, and present with confidence.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Card key={action.title} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-700/20 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${action.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{action.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{action.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-600"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-green-600 dark:text-green-400">{stat.change}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <IconComponent className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className={`p-1 rounded-full ${activity.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{activity.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Target className="h-5 w-5" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Goals-Based Planning</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Start with the Goals-Based mode for a more focused analysis approach that aligns with specific client objectives.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Financial Fitness Score</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Use the Financial Fitness Score to quickly assess and communicate overall financial health to clients.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Education Resources</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Browse our comprehensive library of financial reports and research to stay informed on latest trends.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
