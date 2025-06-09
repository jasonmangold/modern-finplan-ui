import { useEffect } from 'react';
import html2pdf from 'html2pdf.js';

interface ReportViewerProps {
  reportId: string;
}

export const ReportViewer = ({ reportId }: ReportViewerProps) => {
  useEffect(() => {
    // Load PDF.js from CDN for retirement-planning-4
    if (reportId === 'retirement-planning-4') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [reportId]);

  const handleDownload = () => {
    const element = document.getElementById('report-content');
    if (element) {
      const opt = {
        margin: 1,
        filename: `${reportId}-report.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  // Handle PDF.js viewer for retirement-planning-4
  if (reportId === 'retirement-planning-4') {
    return (
      <div className="w-full h-screen">
        <div className="mb-4 p-4 bg-white border-b">
          <h1 className="text-2xl font-bold text-gray-900">The Need for Retirement Planning 4</h1>
        </div>
        <div className="w-full h-full">
          <iframe
            src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/web/viewer.html?file=/retirement-planning-4.pdf"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="The Need for Retirement Planning 4 PDF Viewer"
          />
        </div>
      </div>
    );
  }

  if (reportId === 'retirement-planning') {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
        <div id="report-content" className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">The Need for Retirement Planning</h1>
          <p className="text-lg leading-relaxed">
            This report discusses the importance of retirement planning and provides guidance on how to prepare for a financially secure retirement.
          </p>
        </div>
      </div>
    );
  }

  if (reportId === 'retirement-planning-2') {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
        <div id="report-content" className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">The Need for Retirement Planning (2)</h1>
          <p className="text-lg leading-relaxed">
            This report discusses the importance of retirement planning and provides guidance on how to prepare for a financially secure retirement.
          </p>
        </div>
      </div>
    );
  }

  if (reportId === 'retirement-planning-3') {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
        <div id="report-content" className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">The Need for Retirement Planning (3)</h1>
          <p className="text-lg leading-relaxed">
            This report discusses the importance of retirement planning and provides guidance on how to prepare for a financially secure retirement.
          </p>
        </div>
      </div>
    );
  }

  if (reportId === 'debt-management') {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
        <div id="report-content" className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Debt Management</h1>
          <p className="text-lg leading-relaxed">
            This report provides information on managing and reducing debt.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
      <div id="report-content" className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Financial Planning Report</h1>
        <p className="text-lg leading-relaxed">
          This is a sample report. The actual content would be dynamically loaded based on the reportId: {reportId}
        </p>
      </div>
    </div>
  );
};
