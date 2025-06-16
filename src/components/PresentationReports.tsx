
import { Card, CardContent } from "@/components/ui/card";
import { usePresentationSelection } from "@/hooks/usePresentationSelection";

export const PresentationReports = () => {
  const { selectedReports } = usePresentationSelection();

  if (selectedReports.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">No reports selected for presentation yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {selectedReports.map((report, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h3 className="font-medium">{report.outputType}</h3>
            <p className="text-sm text-gray-600">Goal: {report.goalId}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
