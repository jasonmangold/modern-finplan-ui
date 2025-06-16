
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { useState, useEffect } from "react";

export const PresentationReports = () => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  // Load selected reports from localStorage
  useEffect(() => {
    const loadReports = () => {
      const saved = localStorage.getItem('selectedPresentationReports');
      if (saved) {
        setSelectedReports(JSON.parse(saved));
      }
    };

    loadReports();
    
    // Listen for localStorage changes from other components
    const handleStorageChange = () => {
      loadReports();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    window.addEventListener('presentationReportsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('presentationReportsUpdated', handleStorageChange);
    };
  }, []);

  const removeReport = (reportToRemove: string) => {
    const updatedReports = selectedReports.filter(report => report !== reportToRemove);
    setSelectedReports(updatedReports);
    localStorage.setItem('selectedPresentationReports', JSON.stringify(updatedReports));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('presentationReportsUpdated'));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Selected Reports for Presentation</span>
          <Badge variant="outline">{selectedReports.length} reports</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedReports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No reports selected for presentation</p>
            <p className="text-sm">Select reports from the Analysis tab to include them here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{report}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReport(report)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
