import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, GraduationCap, Plane, CreditCard, Home, Heart } from 'lucide-react';

const timelineGoals = [
  { year: "2024", ages: "Ages 45 & 42", title: "Start of Planning", icon: FolderOpen, category: "Short-term", color: "text-yellow-600" },
  { year: "2025", ages: "Ages 46 & 43", title: "Emergency Fund Fully Funded", icon: FolderOpen, category: "Short-term", color: "text-yellow-600" },
  { year: "2028", ages: "Ages 49 & 46", title: "First Child College Begins", icon: GraduationCap, category: "Education", color: "text-blue-600" },
  { year: "2032", ages: "Ages 53 & 50", title: "First Child College Ends", icon: GraduationCap, category: "Education", color: "text-blue-600" },
  { year: "2035", ages: "Ages 56 & 53", title: "Second Child College Begins", icon: GraduationCap, category: "Education", color: "text-blue-600" },
  { year: "2039", ages: "Ages 60 & 57", title: "Second Child College Ends", icon: GraduationCap, category: "Education", color: "text-blue-600" },
  { year: "2041", ages: "Ages 62 & 59", title: "Mortgage Paid Off", icon: Home, category: "Debt Free", color: "text-orange-600" },
  { year: "2042", ages: "Ages 63 & 60", title: "Paul Retires", icon: Plane, category: "Retirement", color: "text-green-600" },
  { year: "2045", ages: "Ages 66 & 63", title: "Sally Retires", icon: Plane, category: "Retirement", color: "text-green-600" },
  { year: "2060", ages: "Ages 81 & 78", title: "Life Expectancy (Paul)", icon: Heart, category: "Retirement", color: "text-green-600" },
  { year: "2068", ages: "Age 85", title: "Life Expectancy (Sally)", icon: Heart, category: "Retirement", color: "text-green-600" }
];

export const AnalysisGoalsPresentation: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <Card>
        <CardHeader>
          <CardTitle>Goals Timeline</CardTitle>
          <p className="text-sm text-gray-600">
            Reviewing your goals is a key step in making sure the action plan is on the right course. 
            Listed below is a timeline of the goals we have identified as important to you, along with 
            the age(s) that each will occur.
          </p>
        </CardHeader>
        <CardContent>
          {/* Category Legend */}
          <div className="flex flex-wrap gap-6 mb-8 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-600">Short-term</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600">Education</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Retirement</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-600">Debt Free</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              {timelineGoals.map((goal, index) => (
                <div key={index} className="flex items-center gap-6">
                  {/* Year and Ages */}
                  <div className="w-20 text-right">
                    <div className="text-xl font-bold text-gray-900">{goal.year}</div>
                    <div className="text-sm text-gray-600">{goal.ages}</div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`relative z-10 p-2 bg-white border-2 border-gray-300 rounded-full ${goal.color}`}>
                    <goal.icon className="h-6 w-6" />
                  </div>
                  
                  {/* Goal Title */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};