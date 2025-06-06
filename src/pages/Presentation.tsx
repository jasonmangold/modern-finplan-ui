
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Eye, Edit3 } from "lucide-react";

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
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Modern Header Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl p-8 border border-blue-100/50">
        <div className="flex items-start justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900 text-balance">Financial Analysis</h1>
              <Button variant="ghost" size="sm" className="modern-button text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Prepared For</p>
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Paul Johnson & Sally Johnson</h2>
                <Button variant="ghost" size="sm" className="modern-button text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <p className="text-sm text-gray-500">Created: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Compact Reports Section */}
      <div className="smooth-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Presentation Reports</h3>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {presentationItems.length} reports selected
          </span>
        </div>
        
        <div className="grid gap-3 mb-8">
          {presentationItems.map((item, index) => (
            <div key={item} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-all duration-200 group">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="font-medium text-blue-700">{item}</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <Button size="sm" variant="outline" className="modern-button text-red-600 border-red-200 hover:bg-red-50">
                  Remove
                </Button>
                <Button size="sm" className="modern-button bg-green-600 text-white hover:bg-green-700">
                  Edit Inputs
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-8 text-center border border-gray-200/50">
          <div className="max-w-md mx-auto space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Ready to generate your presentation?</h4>
            <p className="text-gray-600">Create a professional financial analysis presentation for your client.</p>
            <div className="flex justify-center gap-4 pt-2">
              <Button className="modern-button bg-green-600 text-white hover:bg-green-700 px-6">
                <Settings className="h-4 w-4" />
                Presentation Options
              </Button>
              <Button className="modern-button bg-blue-600 text-white hover:bg-blue-700 px-6">
                <Eye className="h-4 w-4" />
                Preview Presentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
