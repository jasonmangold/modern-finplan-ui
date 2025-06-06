
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Shield, 
  PiggyBank, 
  TrendingUp, 
  Users, 
  Heart, 
  AlertTriangle, 
  Activity,
  FileText, 
  Target, 
  BarChart3, 
  Gift, 
  CreditCard, 
  Minus,
  Building, 
  DollarSign, 
  UserCheck,
  ArrowRight,
  Award
} from "lucide-react";

const planningGoals = [
  {
    id: "education-funding",
    title: "Education Funding",
    icon: GraduationCap,
    description: "College and education planning",
    status: "529 Plan started • $50k target",
    completed: true,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600"
  },
  {
    id: "survivor-needs",
    title: "Survivor Needs",
    icon: Shield,
    description: "Life insurance and protection",
    status: "$500k coverage in place",
    completed: true,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600"
  },
  {
    id: "retirement-accumulation",
    title: "Retirement Accumulation",
    icon: PiggyBank,
    description: "Building retirement wealth",
    status: "$500k saved • On track",
    completed: true,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600"
  },
  {
    id: "retirement-distribution",
    title: "Retirement Distribution",
    icon: TrendingUp,
    description: "Withdrawal strategy planning",
    status: "Strategy needed",
    completed: false,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600"
  },
  {
    id: "social-security",
    title: "Social Security",
    icon: Users,
    description: "Optimization and timing",
    status: "Analysis pending",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "disability",
    title: "Disability",
    icon: Heart,
    description: "Income protection planning",
    status: "Not started",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "critical-illness",
    title: "Critical Illness",
    icon: AlertTriangle,
    description: "Health crisis protection",
    status: "Not started",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "long-term-care",
    title: "Long-Term Care",
    icon: Activity,
    description: "Healthcare cost planning",
    status: "Analysis needed",
    completed: false,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600"
  },
  {
    id: "estate-analysis",
    title: "Estate Analysis",
    icon: FileText,
    description: "Wealth transfer planning",
    status: "Will completed • Trust needed",
    completed: false,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600"
  },
  {
    id: "accumulation-funding",
    title: "Accumulation Funding",
    icon: Target,
    description: "General savings goals",
    status: "Emergency fund complete",
    completed: true,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600"
  },
  {
    id: "asset-allocation",
    title: "Asset Allocation",
    icon: BarChart3,
    description: "Investment portfolio strategy",
    status: "Rebalancing needed",
    completed: false,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600"
  },
  {
    id: "charitable-remainder-trust",
    title: "Charitable Remainder Trust",
    icon: Gift,
    description: "Tax-efficient giving",
    status: "Not started",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "personal-finance",
    title: "Personal Finance",
    icon: DollarSign,
    description: "Cash flow and budgeting",
    status: "Budget tracking active",
    completed: true,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600"
  },
  {
    id: "debt-repayment",
    title: "Debt Repayment",
    icon: CreditCard,
    description: "Debt elimination strategy",
    status: "$23.5k total • 3.2 years",
    completed: false,
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600"
  },
  {
    id: "business-continuation",
    title: "Business Continuation",
    icon: Building,
    description: "Business succession planning",
    status: "Not applicable",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "business-valuation",
    title: "Business Valuation",
    icon: Minus,
    description: "Asset valuation analysis",
    status: "Not applicable",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  },
  {
    id: "key-employee",
    title: "Key Employee",
    icon: UserCheck,
    description: "Key person insurance",
    status: "Not applicable",
    completed: false,
    color: "bg-gray-50 border-gray-200",
    iconColor: "text-gray-600"
  }
];

interface GoalsBasedModeProps {
  onGoalSelect: (goalId: string) => void;
  onShowFitnessScore: () => void;
}

export const GoalsBasedMode = ({ onGoalSelect, onShowFitnessScore }: GoalsBasedModeProps) => {
  const handleGoalClick = (goalId: string) => {
    console.log(`Opening goal wizard for: ${goalId}`);
    onGoalSelect(goalId);
  };

  const completedGoals = planningGoals.filter(goal => goal.completed).length;

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Financial Goals</h2>
          <p className="text-lg text-gray-600 mt-2">
            {completedGoals} of {planningGoals.length} goals in progress
          </p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onShowFitnessScore}
        >
          <Award className="h-4 w-4" />
          Financial Fitness Score
        </Button>
      </div>

      {/* Goals Grid - Full Screen with proper spacing */}
      <div className="grid grid-cols-3 gap-6 h-[calc(100%-120px)] overflow-y-auto">
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
