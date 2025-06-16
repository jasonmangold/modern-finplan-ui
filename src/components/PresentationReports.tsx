
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export const PresentationReports = () => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  useEffect(() => {
    const loadReports = () => {
      const saved = localStorage.getItem('presentation-reports');
      if (saved) {
        setSelectedReports(JSON.parse(saved));
      }
    };

    loadReports();
    
    // Listen for storage changes to update when reports are added/removed
    const handleStorageChange = () => {
      loadReports();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from the same tab
    window.addEventListener('presentation-reports-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('presentation-reports-updated', handleStorageChange);
    };
  }, []);

  const removeReport = (reportToRemove: string) => {
    const updated = selectedReports.filter(report => report !== reportToRemove);
    setSelectedReports(updated);
    localStorage.setItem('presentation-reports', JSON.stringify(updated));
    
    // Dispatch custom event to update other components
    window.dispatchEvent(new CustomEvent('presentation-reports-updated'));
  };

  const clearAllReports = () => {
    setSelectedReports([]);
    localStorage.removeItem('presentation-reports');
    window.dispatchEvent(new CustomEvent('presentation-reports-updated'));
  };

  if (selectedReports.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Presentation Reports</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No reports selected</p>
            <p className="text-sm">Select reports from the Analysis tab to add them to your presentation</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Presentation Reports ({selectedReports.length})</CardTitle>
        <Button variant="outline" size="sm" onClick={clearAllReports}>
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {selectedReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{report}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeReport(report)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
