import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GraduationCap, Shield, PiggyBank, TrendingUp, Users, Heart, AlertTriangle, Activity, FileText, Target, BarChart3, Gift, CreditCard, Minus, Building, DollarSign, UserCheck, ArrowRight, Award } from "lucide-react";
const planningGoals = [{
  id: "education-funding",
  title: "Education Funding",
  icon: GraduationCap,
  description: "College and education planning",
  status: "92% funded • $8,000 additional needed",
  completed: true,
  color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  iconColor: "text-blue-600 dark:text-blue-400"
}, {
  id: "survivor-needs",
  title: "Survivor Needs",
  icon: Shield,
  description: "Life insurance and protection",
  status: "100% funded • $500,000 coverage secured",
  completed: true,
  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  iconColor: "text-green-600 dark:text-green-400"
}, {
  id: "retirement-accumulation",
  title: "Retirement Accumulation",
  icon: PiggyBank,
  description: "Building retirement wealth",
  status: "68% funded • $750,000 additional needed",
  completed: true,
  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  iconColor: "text-green-600 dark:text-green-400"
}, {
  id: "retirement-distribution",
  title: "Retirement Distribution",
  icon: TrendingUp,
  description: "Withdrawal strategy planning",
  status: "15% planned • $2.1M withdrawal strategy needed",
  completed: false,
  color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
  iconColor: "text-orange-600 dark:text-orange-400"
}, {
  id: "social-security",
  title: "Social Security",
  icon: Users,
  description: "Optimization and timing",
  status: "Optimization potential • $85,000 additional lifetime benefit",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "disability",
  title: "Disability",
  icon: Heart,
  description: "Income protection planning",
  status: "Coverage gap • $4,200 monthly income shortfall",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "critical-illness",
  title: "Critical Illness",
  icon: AlertTriangle,
  description: "Health crisis protection",
  status: "Risk exposure • $150,000 potential cost uncovered",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "long-term-care",
  title: "Long-Term Care",
  icon: Activity,
  description: "Healthcare cost planning",
  status: "High risk • $380,000 estimated lifetime care cost",
  completed: false,
  color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  iconColor: "text-purple-600 dark:text-purple-400"
}, {
  id: "estate-analysis",
  title: "Estate Analysis",
  icon: FileText,
  description: "Wealth transfer planning",
  status: "40% complete • $1.2M estate tax exposure",
  completed: false,
  color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  iconColor: "text-purple-600 dark:text-purple-400"
}, {
  id: "accumulation-funding",
  title: "Accumulation Funding",
  icon: Target,
  description: "General savings goals",
  status: "100% funded • $45,000 emergency fund secured",
  completed: true,
  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  iconColor: "text-green-600 dark:text-green-400"
}, {
  id: "asset-allocation",
  title: "Asset Allocation",
  icon: BarChart3,
  description: "Investment portfolio strategy",
  status: "Drift detected • 12% overweight equities",
  completed: false,
  color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
  iconColor: "text-orange-600 dark:text-orange-400"
}, {
  id: "charitable-remainder-trust",
  title: "Charitable Remainder Trust",
  icon: Gift,
  description: "Tax-efficient giving",
  status: "Tax opportunity • $25,000 annual deduction potential",
  completed: false,
  color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  iconColor: "text-gray-600 dark:text-gray-400"
}, {
  id: "personal-finance",
  title: "Personal Finance",
  icon: DollarSign,
  description: "Cash flow and budgeting",
  status: "Optimized • $1,200 monthly surplus identified",
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

const factFinderItem = {
  id: "fact-finders",
  title: "Fact Finders",
  icon: FileText,
  description: "Client data collection forms",
  status: "Available",
  completed: false,
  color: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
  iconColor: "text-indigo-600 dark:text-indigo-400"
};
interface GoalsBasedModeProps {
  onGoalSelect: (goalId: string) => void;
  onShowFitnessScore: () => void;
  onShowAnalysisGoals?: () => void;
  onShowFinancialInventory?: () => void;
  onShowFactFinders?: () => void;
}
export const GoalsBasedMode = ({
  onGoalSelect,
  onShowFitnessScore,
  onShowAnalysisGoals,
  onShowFinancialInventory,
  onShowFactFinders
}: GoalsBasedModeProps) => {
  const handleGoalClick = (goalId: string) => {
    if (goalId === "fact-finders") {
      onShowFactFinders?.();
    } else {
      console.log(`Opening goal wizard for: ${goalId}`);
      onGoalSelect(goalId);
    }
  };
  const completedGoals = planningGoals.filter(goal => goal.completed).length;
  return <div className="h-full p-6 space-y-6 bg-background dark:bg-gray-900 py-[2px]">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Financial Goals</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            {completedGoals} of {planningGoals.length} goals in progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ShimmerButton 
            className="flex items-center gap-2 px-4 py-2 text-sm" 
            onClick={onShowAnalysisGoals}
            shimmerColor="#3b82f6" 
            shimmerDuration="2s"
          >
            <Target className="h-4 w-4" />
            Analysis Goals
          </ShimmerButton>
          <ShimmerButton 
            className="flex items-center gap-2 px-4 py-2 text-sm" 
            onClick={onShowFinancialInventory}
            shimmerColor="#10b981" 
            shimmerDuration="2s"
          >
            <BarChart3 className="h-4 w-4" />
            Financial Inventory
          </ShimmerButton>
          <ShimmerButton 
            className="flex items-center gap-2 px-4 py-2 text-sm" 
            onClick={onShowFitnessScore} 
            shimmerColor="#f59e0b" 
            shimmerDuration="2s"
          >
            <Award className="h-4 w-4" />
            Financial Fitness Score
          </ShimmerButton>
        </div>
      </div>

      {/* Goals Grid - Full Screen with proper spacing */}
      <div className="grid grid-cols-3 gap-6 h-[calc(100%-120px)] overflow-y-auto">
        {[...planningGoals, factFinderItem].map(goal => {
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