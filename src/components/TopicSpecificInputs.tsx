
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface TopicSpecificInputsProps {
  selectedTopic: string;
}

export const TopicSpecificInputs = ({ selectedTopic }: TopicSpecificInputsProps) => {
  const renderInputs = () => {
    switch (selectedTopic) {
      case 'retirement-accumulation':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Target Retirement Age</Label>
              <Input defaultValue="67" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Desired Income Replacement</Label>
              <Select defaultValue="80">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Annual Contribution Increase</Label>
              <Input defaultValue="3%" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Expected Return Rate</Label>
              <Input defaultValue="7%" className="mt-1" />
            </div>
          </div>
        );

      case 'survivor-needs':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Years of Income Replacement</Label>
              <Input defaultValue="20" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Emergency Fund Months</Label>
              <Input defaultValue="6" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Final Expenses</Label>
              <Input defaultValue="$25,000" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Education Fund Needed</Label>
              <Input defaultValue="$200,000" className="mt-1" />
            </div>
          </div>
        );

      case 'education-funding':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Child's Current Age</Label>
              <Input defaultValue="5" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">College Start Age</Label>
              <Input defaultValue="18" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Years of College</Label>
              <Input defaultValue="4" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Current Annual Cost</Label>
              <Input defaultValue="$30,000" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Education Inflation Rate</Label>
              <Input defaultValue="5%" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Investment Return Rate</Label>
              <Input defaultValue="6%" className="mt-1" />
            </div>
          </div>
        );

      case 'asset-allocation':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Investment Timeline</Label>
                <Select defaultValue="long">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short-term (1-5 years)</SelectItem>
                    <SelectItem value="medium">Medium-term (5-15 years)</SelectItem>
                    <SelectItem value="long">Long-term (15+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Risk Tolerance</Label>
                <Select defaultValue="moderate">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Investment Objectives</Label>
              <Textarea 
                placeholder="Primary investment goals and objectives..."
                className="mt-1 resize-none"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-medium">No specific inputs required</p>
            <p className="text-sm">This analysis uses the general client data from the input hub</p>
          </div>
        );
    }
  };

  if (!selectedTopic) {
    return (
      <Card className="border-dashed border-2 border-gray-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 font-medium">Select an analysis topic</p>
          <p className="text-sm text-gray-400">Choose a topic to see relevant input fields</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Topic-Specific Inputs</CardTitle>
      </CardHeader>
      <CardContent>
        {renderInputs()}
      </CardContent>
    </Card>
  );
};
