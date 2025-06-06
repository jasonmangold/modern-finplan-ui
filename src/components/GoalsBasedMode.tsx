
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Home, 
  Car, 
  PiggyBank, 
  CreditCard, 
  Heart, 
  Users, 
  Plane,
  Lightbulb,
  ArrowRight
} from "lucide-react";

const planningGoals = [
  {
    id: "college",
    title: "College Planning",
    icon: GraduationCap,
    description: "Education funding strategy",
    status: "529 Plan started • $50k target • 2 children",
    completed: true,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600"
  },
  {
    id: "retirement",
    title: "Retirement",
    icon: PiggyBank,
    description: "Long-term wealth accumulation",
    status: "$500k saved • On track for 67",
    completed: true,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600"
  },
  {
    id: "home",
    title: "Home Purchase",
    icon: Home,
    description: "Primary residence planning",
    status: "Target: $450k • 20% down needed",
    completed: false,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600"
  },
  {
    id: "debt-payoff",
    title: "Debt Payoff",
    icon: CreditCard,
    description: "Debt consolidation strategy",
    status: "$23.5k total • 3.2 years to payoff",
    completed: false,
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600"
  },
  {
    id: "vehicle",
    title: "Vehicle",
    icon: Car,
    description: "Transportation planning",
    status: "Not started",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "long-term-care",
    title: "Long-Term Care",
    icon: Heart,
    description: "Healthcare protection",
    status: "Not started",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "estate",
    title: "Legacy & Estate",
    icon: Users,
    description: "Wealth transfer planning",
    status: "Will completed • Trust needed",
    completed: false,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600"
  },
  {
    id: "travel",
    title: "Travel Goals",
    icon: Plane,
    description: "Vacation & travel planning",
    status: "Not started",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  }
];

interface GoalsBasedModeProps {
  onGoalSelect: (goalId: string) => void;
}

export const GoalsBasedMode = ({ onGoalSelect }: GoalsBasedModeProps) => {
  const handleGoalClick = (goalId: string) => {
    console.log(`Opening goal wizard for: ${goalId}`);
    onGoalSelect(goalId);
  };

  const completedGoals = planningGoals.filter(goal => goal.completed).length;

  return (
    <div className="h-full space-y-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Financial Goals</h2>
          <p className="text-lg text-gray-600 mt-2">
            {completedGoals} of {planningGoals.length} goals in progress
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          Suggest Next Goal
        </Button>
      </div>

      {/* Goals Grid - Full Screen */}
      <div className="grid grid-cols-4 gap-6 h-[calc(100%-120px)] overflow-y-auto">
        {planningGoals.map((goal) => {
          const IconComponent = goal.icon;
          return (
            <Card 
              key={goal.id} 
              className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${goal.color} h-fit`}
              onClick={() => handleGoalClick(goal.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-white ${goal.iconColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    </div>
                  </div>
                  {goal.completed && (
                    <Badge variant="secondary" className="text-sm">
                      Active
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">{goal.status}</p>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Switch Mode Prompt */}
      <Card className="border-dashed border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <p className="text-lg text-blue-800 font-medium">
            Want to review everything at once?
          </p>
          <p className="text-sm text-blue-600 mt-2">
            Switch to Comprehensive Mode to see all your client's data in one view.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
