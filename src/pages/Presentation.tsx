
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const presentationItems = [
  "Capital Available",
  "Social Security Optimizer", 
  "Alternatives Retirement",
  "Retirement Timeline",
  "Retirement Fact Finder",
  "Graph"
];

const Presentation = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Financial Analysis</h1>
          <Button variant="ghost" size="sm">✏️</Button>
        </div>
        
        <div className="text-gray-600 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">Prepared For:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">Paul Johnson & Sally Johnson</span>
            <Button variant="ghost" size="sm">✏️</Button>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {presentationItems.map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium text-blue-600">{item}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">Remove</Button>
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">Edit Inputs</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Reports in presentation: 0</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-green-600 text-white hover:bg-green-700">
                Presentation Options
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Preview Presentation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Presentation;
