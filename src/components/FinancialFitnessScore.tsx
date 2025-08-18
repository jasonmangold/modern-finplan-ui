
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Award, TrendingUp } from "lucide-react";

const fitnessTopics = [
  { 
    id: "accumulation-funding", 
    label: "Accumulation", 
    score: 9,
    additionalInfo: "Additional monthly savings needed is $564",
    fundingInfo: "Based on your current goal, 92% may be funded."
  },
  { 
    id: "education-funding", 
    label: "Education", 
    score: 8,
    additionalInfo: "Additional monthly savings needed is $80",
    fundingInfo: "Based on your current goal, 79% of your college costs may be funded."
  },
  { 
    id: "retirement-accumulation", 
    label: "Retirement", 
    score: 6,
    additionalInfo: "Additional monthly savings needed is $1,649",
    fundingInfo: "Based on your current goal, 59% of your retirement expenses may be satisfied."
  },
  { 
    id: "life-insurance", 
    label: "Life Insurance", 
    score: 3,
    additionalInfo: "Paul's additional need is $2,356,102\nSally's additional need is $2,117,123",
    fundingInfo: "In the event of a death, 26% of your family's needs may be satisfied."
  },
  { 
    id: "disability", 
    label: "Disability", 
    score: 0,
    additionalInfo: "Paul's additional income need is $3,250\nSally's additional income need is $2,500",
    fundingInfo: "With a disability, 0% of your needs may be satisfied."
  },
  { 
    id: "debt-repayment", 
    label: "Debt", 
    score: 9,
    additionalInfo: "Your annual income is $115,000\nYour annual debt payments is $8,400",
    fundingInfo: "7% of your income is used to pay debts."
  }
];

interface FinancialFitnessScoreProps {
  onBack: () => void;
}

export const FinancialFitnessScore = ({ onBack }: FinancialFitnessScoreProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "accumulation-funding",
    "education-funding", 
    "retirement-accumulation",
    "life-insurance",
    "disability",
    "debt-repayment"
  ]);

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const selectedTopicData = fitnessTopics.filter(topic => selectedTopics.includes(topic.id));
  const overallScore = selectedTopicData.length > 0 
    ? Math.round(selectedTopicData.reduce((sum, topic) => sum + topic.score, 0) / selectedTopicData.length)
    : 0;

  const getBarColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    if (score >= 4) return "bg-orange-500";
    return "bg-red-500";
  };

  const getCardBorderColor = (score: number) => {
    if (score >= 8) return "border-l-green-500";
    if (score >= 6) return "border-l-yellow-500";
    if (score >= 4) return "border-l-orange-500";
    return "border-l-red-500";
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 flex-shrink-0">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Goals
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Financial Fitness Score</h1>
            <p className="text-gray-600">Evaluate your comprehensive financial health</p>
          </div>
        </div>
      </div>

      {/* Topic Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Select Topics to Include
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {fitnessTopics.map((topic) => (
              <div key={topic.id} className="flex items-center space-x-2">
                <Checkbox
                  id={topic.id}
                  checked={selectedTopics.includes(topic.id)}
                  onCheckedChange={() => handleTopicToggle(topic.id)}
                />
                <label htmlFor={topic.id} className="cursor-pointer font-medium text-sm">
                  {topic.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart and Overall Score */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="col-span-3">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-end justify-between h-64 space-x-4">
              {selectedTopicData.map((topic) => (
                <div key={topic.id} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="flex-1 flex items-end w-full">
                    <div 
                      className={`w-full ${getBarColor(topic.score)} rounded-t-sm`}
                      style={{ height: `${(topic.score / 10) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-center font-medium text-gray-700 leading-tight max-w-16">
                    {topic.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="col-span-1">
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg border h-full flex flex-col justify-center items-center">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Your overall score</h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">{overallScore}</div>
            <div className="text-sm text-gray-600">out of 10</div>
          </div>
        </div>
      </div>

      {/* Detailed Information Cards */}
      <div className="grid grid-cols-2 gap-4">
        {selectedTopicData.map((topic) => (
          <Card key={topic.id} className={`border-l-4 ${getCardBorderColor(topic.score)}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">{topic.label} Score - {topic.score}</h3>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {topic.additionalInfo.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
              <div className="text-sm font-medium text-gray-800">
                {topic.fundingInfo}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
