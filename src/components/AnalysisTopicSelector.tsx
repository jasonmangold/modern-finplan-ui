
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Shield, 
  GraduationCap, 
  PiggyBank, 
  Building2, 
  CreditCard,
  BarChart3,
  Heart,
  Users,
  FileText,
  DollarSign,
  Calculator
} from "lucide-react";

interface AnalysisTopicSelectorProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

const topicCategories = [
  {
    category: "Retirement Planning",
    icon: TrendingUp,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    topics: [
      { value: "retirement-accumulation", label: "Retirement Accumulation" },
      { value: "retirement-distribution", label: "Retirement Distribution" },
      { value: "social-security", label: "Social Security Analysis" }
    ]
  },
  {
    category: "Protection Planning", 
    icon: Shield,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    topics: [
      { value: "survivor-needs", label: "Survivor Needs Analysis" },
      { value: "disability", label: "Disability Planning" },
      { value: "critical-illness", label: "Critical Illness" },
      { value: "long-term-care", label: "Long-Term Care" }
    ]
  },
  {
    category: "Education & Family",
    icon: GraduationCap,
    color: "bg-green-50 text-green-700 border-green-200",
    topics: [
      { value: "education-funding", label: "Education Funding" }
    ]
  },
  {
    category: "Wealth Management",
    icon: BarChart3,
    color: "bg-orange-50 text-orange-700 border-orange-200",
    topics: [
      { value: "asset-allocation", label: "Asset Allocation" },
      { value: "estate-analysis", label: "Estate Analysis" },
      { value: "charitable-trust", label: "Charitable Remainder Trust" },
      { value: "accumulation-funding", label: "Accumulation Funding" }
    ]
  },
  {
    category: "Business Planning",
    icon: Building2,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    topics: [
      { value: "business-continuation", label: "Business Continuation" },
      { value: "business-valuation", label: "Business Valuation" },
      { value: "key-employee", label: "Key Employee Planning" }
    ]
  },
  {
    category: "Personal Finance",
    icon: CreditCard,
    color: "bg-red-50 text-red-700 border-red-200",
    topics: [
      { value: "personal-finance", label: "Personal Finance Analysis" },
      { value: "debt-repayment", label: "Debt Repayment Strategy" }
    ]
  },
  {
    category: "Comprehensive",
    icon: Calculator,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    topics: [
      { value: "summary", label: "Financial Summary" }
    ]
  }
];

export const AnalysisTopicSelector = ({ selectedTopic, onTopicChange }: AnalysisTopicSelectorProps) => {
  const getSelectedTopicInfo = () => {
    for (const category of topicCategories) {
      const topic = category.topics.find(t => t.value === selectedTopic);
      if (topic) {
        return { topic, category };
      }
    }
    return null;
  };

  const selectedInfo = getSelectedTopicInfo();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis Topic</h3>
        <Select value={selectedTopic} onValueChange={onTopicChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select analysis topic" />
          </SelectTrigger>
          <SelectContent className="max-h-96">
            {topicCategories.map((category) => (
              <div key={category.category}>
                <div className="px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
                  {category.category}
                </div>
                {category.topics.map((topic) => (
                  <SelectItem key={topic.value} value={topic.value}>
                    {topic.label}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedInfo && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${selectedInfo.category.color}`}>
                <selectedInfo.category.icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{selectedInfo.topic.label}</h4>
                <Badge variant="secondary" className="text-xs">
                  {selectedInfo.category.category}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {getTopicDescription(selectedTopic)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const getTopicDescription = (topic: string): string => {
  const descriptions: Record<string, string> = {
    "retirement-accumulation": "Analyze savings needed to reach retirement goals and optimal contribution strategies.",
    "retirement-distribution": "Plan withdrawal strategies and income replacement during retirement years.",
    "social-security": "Optimize Social Security claiming strategies for maximum lifetime benefits.",
    "survivor-needs": "Calculate life insurance needs to protect family financial security.",
    "disability": "Assess income replacement needs in case of disability.",
    "critical-illness": "Plan for financial impact of critical illness diagnosis.",
    "long-term-care": "Prepare for potential long-term care costs and funding strategies.",
    "education-funding": "Plan savings strategies for children's education expenses.",
    "asset-allocation": "Optimize investment portfolio allocation based on goals and risk tolerance.",
    "estate-analysis": "Analyze estate tax implications and planning strategies.",
    "charitable-trust": "Evaluate charitable remainder trust strategies for tax and legacy planning.",
    "accumulation-funding": "Plan systematic saving and investment strategies.",
    "business-continuation": "Plan for business succession and continuity strategies.",
    "business-valuation": "Analyze business value for planning and succession purposes.",
    "key-employee": "Plan retention and protection strategies for key employees.",
    "personal-finance": "Comprehensive analysis of current financial position and recommendations.",
    "debt-repayment": "Optimize debt repayment strategies to minimize interest and accelerate payoff.",
    "summary": "Comprehensive overview of client's financial situation and planning recommendations."
  };
  
  return descriptions[topic] || "Comprehensive financial analysis and planning recommendations.";
};
