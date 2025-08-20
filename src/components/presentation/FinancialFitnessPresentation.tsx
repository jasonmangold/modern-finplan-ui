import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

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

export const FinancialFitnessPresentation: React.FC = () => {
  const overallScore = Math.round(fitnessTopics.reduce((sum, topic) => sum + topic.score, 0) / fitnessTopics.length);

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
    <div className="p-6 bg-gray-50 dark:bg-gray-900 space-y-6 min-h-full">
      {/* Chart and Overall Score */}
      <div className="grid grid-cols-4 gap-6">
        {/* Chart */}
        <Card className="col-span-3">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-6">Financial Fitness by Category</h3>
              {fitnessTopics.map((topic) => (
                <div key={topic.id} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">
                    {topic.label}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className={`h-6 rounded-full ${getBarColor(topic.score)} flex items-center justify-end pr-2`}
                      style={{ width: `${topic.score * 10}%` }}
                    >
                      <span className="text-xs font-semibold text-white">{topic.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overall Score */}
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold mb-2">{overallScore}</div>
            <div className="text-sm opacity-90">Overall Score</div>
            <div className="text-sm text-gray-600">6 out of 10</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Cards */}
      <div className="grid grid-cols-2 gap-4">
        {fitnessTopics.map((topic) => (
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