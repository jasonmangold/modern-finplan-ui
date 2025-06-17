import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GraduationCap, Shield, PiggyBank, TrendingUp, Users, Heart, AlertTriangle, Activity, FileText, Target, BarChart3, Gift, CreditCard, Minus, Building, DollarSign, UserCheck, ArrowRight, Award } from "lucide-react";
const planningGoals = [{
  id: "education-funding",
  title: "Education Funding",
  icon: GraduationCap,
  description: "College and education planning",
  status: "529 Plan started • $50k target",
  completed: true,
  color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  iconColor: "text-blue-600 dark:text-blue-400"
}, {
  id: "survivor-needs",
  title: "Survivor Needs",
  icon: Shield,
  description: "Life insurance and protection",
  status: "$500k coverage in place",
  completed: true,
  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  iconColor: "text-green-600 dark:text-green-400"
}, {
  id: "retirement-accumulation",
  title: "Retirement Accumulation",
  icon: PiggyBank,
  description: "Building retirement wealth",
  status: "$500k saved • On track",
  completed: true,
  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  iconColor: "text-green-600 dark:text-green-400"
}, {
  id: "retirement-distribution",
  title: "Retirement Distribution",
  icon: TrendingUp,
  description: "Withdrawal strategy planning",
  status: "Strategy needed",
  completed: false,
  color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
  iconColor: "text-orange-600 dark:text-orange-400"
}, {
  id: "social-security",
  title: "Social Security",
  icon: Users,
  description: "Optimization and timing",
  status: "Analysis pending",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "disability",
  title: "Disability",
  icon: Heart,
  description: "Income protection planning",
  status: "Not started",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "critical-illness",
  title: "Critical Illness",
  icon: AlertTriangle,
  description: "Health crisis protection",
  status: "Not started",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "long-term-care",
  title: "Long-Term Care",
  icon: Activity,
  description: "Healthcare cost planning",
  status: "Analysis needed",
  completed: false,
  color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  iconColor: "text-purple-600 dark:text-purple-400"
}, {
  id: "estate-analysis",
  title: "Estate Analysis",
  icon: FileText,
  description: "Wealth transfer planning",
  status: "Will completed • Trust needed",
  completed: false,
  color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  iconColor: "text-purple-600 dark:text-purple-400"
}, {
  id: "accumulation-funding",
  title: "Accumulation Funding",
  icon: Target,
  description: "General savings goals",
  status: "Emergency fund complete",
  completed: true,
  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  iconColor: "text-green-600 dark:text-green-400"
}, {
  id: "asset-allocation",
  title: "Asset Allocation",
  icon: BarChart3,
  description: "Investment portfolio strategy",
  status: "Rebalancing needed",
  completed: false,
  color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
  iconColor: "text-orange-600 dark:text-orange-400"
}, {
  id: "charitable-remainder-trust",
  title: "Charitable Remainder Trust",
  icon: Gift,
  description: "Tax-efficient giving",
  status: "Not started",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "personal-finance",
  title: "Personal Finance",
  icon: DollarSign,
  description: "Cash flow and budgeting",
  status: "Budget tracking active",
  completed: true,
  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  iconColor: "text-green-600 dark:text-green-400"
}, {
  id: "debt-repayment",
  title: "Debt Repayment",
  icon: CreditCard,
  description: "Debt elimination strategy",
  status: "$23.5k total • 3.2 years",
  completed: false,
  color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  iconColor: "text-red-600 dark:text-red-400"
}, {
  id: "business-continuation",
  title: "Business Continuation",
  icon: Building,
  description: "Business succession planning",
  status: "Not applicable",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "business-valuation",
  title: "Business Valuation",
  icon: Minus,
  description: "Asset valuation analysis",
  status: "Not applicable",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "key-employee",
  title: "Key Employee",
  icon: UserCheck,
  description: "Key person insurance",
  status: "Not applicable",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}];
interface GoalsBasedModeProps {
  onGoalSelect: (goalId: string) => void;
  onShowFitnessScore: () => void;
}
export const GoalsBasedMode = ({
  onGoalSelect,
  onShowFitnessScore
}: GoalsBasedModeProps) => {
  const handleGoalClick = (goalId: string) => {
    console.log(`Opening goal wizard for: ${goalId}`);
    onGoalSelect(goalId);
  };
  const completedGoals = planningGoals.filter(goal => goal.completed).length;
  return <div className="h-full p-6 space-y-6 bg-background dark:bg-gray-900">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Financial Goals</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            {completedGoals} of {planningGoals.length} goals in progress
          </p>
        </div>
        <ShimmerButton className="flex items-center gap-2" onClick={onShowFitnessScore} shimmerColor="#000000" shimmerDuration="2s">
          <Award className="h-4 w-4" />
          Financial Fitness Score
        </ShimmerButton>
      </div>

      {/* Goals Grid - Full Screen with proper spacing */}
      <div className="grid grid-cols-3 gap-6 h-[calc(100%-120px)] overflow-y-auto">
        {planningGoals.map(goal => {
        const IconComponent = goal.icon;
        return <Card key={goal.id} className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${goal.color} h-fit`} onClick={() => handleGoalClick(goal.id)}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 ${goal.iconColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{goal.title}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{goal.description}</p>
                    </div>
                  </div>
                  {goal.completed && <Badge variant="secondary" className="text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      Active
                    </Badge>}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{goal.status}</p>
                  <ArrowRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>;
      })}
      </div>

      {/* Switch Mode Prompt */}
      
    </div>;
};