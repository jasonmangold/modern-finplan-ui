
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
      {/* Modern Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Financial Analysis</h1>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                ✏️ Edit
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">Prepared For:</p>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-800">Paul Johnson & Sally Johnson</h2>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  ✏️ Edit
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Created: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Presentation Reports</span>
            <span className="text-sm font-normal text-gray-500">6 reports selected</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 mb-6">
            {presentationItems.map((item, index) => (
              <div key={item} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium text-blue-600">{item}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    Remove
                  </Button>
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                    Edit Inputs
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-4 font-medium">Ready to generate your presentation?</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-green-600 text-white hover:bg-green-700 px-6">
                Presentation Options
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6">
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
