import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Download, Printer } from "lucide-react";
interface GoalOutputPanelProps {
  goalId: string;
  outputType: string;
}
const sampleData = [{
  year: 2024,
  value: 50000,
  target: 45000
}, {
  year: 2026,
  value: 75000,
  target: 70000
}, {
  year: 2028,
  value: 105000,
  target: 100000
}, {
  year: 2030,
  value: 140000,
  target: 135000
}, {
  year: 2032,
  value: 180000,
  target: 175000
}, {
  year: 2034,
  value: 225000,
  target: 220000
}];
export const GoalOutputPanel = ({
  goalId,
  outputType
}: GoalOutputPanelProps) => {
  const handlePrint = () => {
    window.print();
  };
  return <div className="space-y-6">
      {/* Status Badge */}
      <div className="flex justify-end">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          On Track
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Success Probability</span>
            </div>
            <div className="text-2xl font-bold text-primary">87%</div>
          </CardContent>
        </Card>
        
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Monthly Need</span>
            </div>
            <div className="text-2xl font-bold text-primary">$650</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium">Projection Timeline</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                formatter={value => [`$${value.toLocaleString()}`, ""]} 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3} 
                name="Projected Balance" 
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                name="Target" 
                opacity={0.7}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium">Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
            <p className="text-sm text-muted-foreground">Current savings rate is sufficient to meet the goal timeline</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 shrink-0"></div>
            <p className="text-sm text-muted-foreground">Consider increasing contributions by $150/month for better security</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary/40 rounded-full mt-2 shrink-0"></div>
            <p className="text-sm text-muted-foreground">Tax-advantaged accounts are being utilized effectively</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex items-center gap-2 h-9">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-9" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
    </div>;
};