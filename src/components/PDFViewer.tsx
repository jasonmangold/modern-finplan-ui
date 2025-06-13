
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, ZoomIn, ZoomOut } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onBack: () => void;
}

export const PDFViewer = ({ pdfUrl, title, onBack }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Reports
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className="w-full overflow-auto bg-gray-100 rounded-b-lg"
            style={{ height: 'calc(100vh - 200px)' }}
          >
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
                width: `${10000 / zoom}%`,
                height: `${10000 / zoom}%`
              }}
              title={`PDF: ${title}`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
