
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, TrendingUp } from "lucide-react";

const fitnessTopics = [
  { id: "accumulation-funding", label: "Accumulation Funding", score: 8.9 },
  { id: "critical-illness", label: "Critical Illness", score: 1.8 },
  { id: "debt-repayment", label: "Debt", score: 6.3 },
  { id: "disability", label: "Disability", score: 2.1 },
  { id: "education-funding", label: "Education Funding", score: 8.5 },
  { id: "long-term-care", label: "Long Term Care", score: 3.2 },
  { id: "retirement-accumulation", label: "Retirement Accumulation", score: 7.8 },
  { id: "retirement-distribution", label: "Retirement Income Distribution", score: 4.2 },
  { id: "survivor-needs", label: "Survivor", score: 9.2 }
];

interface FinancialFitnessScoreProps {
  onBack: () => void;
}

export const FinancialFitnessScore = ({ onBack }: FinancialFitnessScoreProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "accumulation-funding",
    "education-funding", 
    "retirement-accumulation",
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
    ? selectedTopicData.reduce((sum, topic) => sum + topic.score, 0) / selectedTopicData.length 
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    if (score >= 4) return "text-orange-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    if (score >= 4) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="h-full flex flex-col p-6">
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

      {/* Main Content with proper height management */}
      <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
        {/* Left Panel - Topic Selection */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Select Topics to Include
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {fitnessTopics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={topic.id}
                    checked={selectedTopics.includes(topic.id)}
                    onCheckedChange={() => handleTopicToggle(topic.id)}
                  />
                  <label htmlFor={topic.id} className="flex-1 cursor-pointer font-medium">
                    {topic.label}
                  </label>
                  <span className={`text-sm font-semibold ${getScoreColor(topic.score)}`}>
                    {topic.score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Scores */}
        <div className="flex flex-col space-y-4 min-h-0">
          {/* Overall Score - More compact */}
          <Card className="flex-shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Overall Financial Fitness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-1 ${getScoreColor(overallScore)}`}>
                  {overallScore.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 mb-3">out of 10.0</div>
                <Progress 
                  value={overallScore * 10} 
                  className="h-3"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Based on {selectedTopics.length} selected topics
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Individual Scores - Takes remaining space */}
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0 pb-3">
              <CardTitle className="text-base">Individual Topic Scores</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-3">
                {selectedTopicData.map((topic) => (
                  <div key={topic.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{topic.label}</span>
                      <span className={`text-sm font-semibold ${getScoreColor(topic.score)}`}>
                        {topic.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(topic.score)}`}
                        style={{ width: `${(topic.score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
