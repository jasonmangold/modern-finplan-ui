import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2pdf from 'html2pdf.js';

interface ReportViewerProps {
  reportId: string;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ reportId }) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('report-content');
    const opt = {
      margin: 1,
      filename: `${reportId}-report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (reportId === "retirement-planning-4") {
    return (
      <div className="max-w-6xl mx-auto bg-white">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">The Need for Retirement Planning 4</h1>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        
        <div className="w-full h-screen border border-gray-300 rounded-lg overflow-hidden">
          <object
            data="/retirement-planning-4.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
            className="w-full h-full"
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="mb-4">PDF cannot be displayed in this browser.</p>
              <a 
                href="/retirement-planning-4.pdf" 
                download
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Download PDF instead
              </a>
            </div>
          </object>
        </div>
      </div>
    );
  }

  if (reportId === "retirement-planning") {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">The Need for Financial Planning</h1>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div id="report-content" className="prose max-w-none">
          <h2>Introduction</h2>
          <p>Financial planning is essential for achieving your life goals. It provides a roadmap to manage your resources effectively.</p>

          <h3>Key Benefits of Financial Planning</h3>
          <ul>
            <li>Setting clear financial goals</li>
            <li>Managing debt and expenses</li>
            <li>Saving for retirement</li>
            <li>Investing wisely</li>
            <li>Protecting your assets</li>
          </ul>

          <h3>Retirement Planning</h3>
          <p>Retirement planning is a critical aspect of financial planning. It ensures you have enough resources to live comfortably during your retirement years.</p>

          <h3>Investment Strategies</h3>
          <p>Smart investment strategies can help grow your wealth over time. Diversification and risk management are key components.</p>

          <h3>Conclusion</h3>
          <p>Financial planning is a lifelong process that requires regular review and adjustments. Start planning today to secure your financial future.</p>
        </div>
      </div>
    );
  }

  if (reportId === "retirement-planning-2") {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">The Need for Retirement Planning (2)</h1>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div id="report-content" className="prose max-w-none">
          <h2>Introduction</h2>
          <p>Retirement planning is a critical aspect of financial planning, ensuring a comfortable and secure future.</p>

          <h3>Key Steps in Retirement Planning</h3>
          <ul>
            <li>Estimating retirement expenses</li>
            <li>Determining income sources</li>
            <li>Calculating savings needed</li>
            <li>Developing an investment strategy</li>
            <li>Regularly reviewing and adjusting the plan</li>
          </ul>

          <h3>Investment Options for Retirement</h3>
          <p>Various investment options can help grow your retirement savings, including stocks, bonds, and mutual funds.</p>

          <h3>Tax-Advantaged Retirement Accounts</h3>
          <p>Utilizing tax-advantaged accounts like 401(k)s and IRAs can significantly boost your retirement savings.</p>

          <h3>Conclusion</h3>
          <p>Start planning for retirement early to take advantage of compounding and ensure a financially secure future.</p>
        </div>
      </div>
    );
  }

  if (reportId === "retirement-planning-3") {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">The Need for Retirement Planning (3)</h1>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div id="report-content" className="prose max-w-none">
          <h2>Introduction</h2>
          <p>Effective retirement planning involves understanding your financial needs and setting realistic goals.</p>

          <h3>Understanding Your Retirement Needs</h3>
          <ul>
            <li>Estimating living expenses</li>
            <li>Accounting for healthcare costs</li>
            <li>Considering inflation</li>
            <li>Planning for leisure and travel</li>
          </ul>

          <h3>Strategies for Maximizing Retirement Savings</h3>
          <p>Maximize your retirement savings through consistent contributions and diversified investments.</p>

          <h3>The Role of Social Security</h3>
          <p>Social Security benefits can provide a portion of your retirement income, but it's essential to plan for additional sources.</p>

          <h3>Conclusion</h3>
          <p>A well-thought-out retirement plan can provide financial security and peace of mind during your retirement years.</p>
        </div>
      </div>
    );
  }

  if (reportId === "debt-management") {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Up to Your Neck in Debt?</h1>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div id="report-content" className="prose max-w-none">
          <h2>Introduction</h2>
          <p>Debt can be overwhelming, but effective management strategies can help you regain control of your finances.</p>

          <h3>Understanding Your Debt</h3>
          <ul>
            <li>Identifying all sources of debt</li>
            <li>Calculating total debt amount</li>
            <li>Understanding interest rates and fees</li>
          </ul>

          <h3>Strategies for Debt Reduction</h3>
          <p>Implement strategies such as the debt snowball or debt avalanche to aggressively pay down your debt.</p>

          <h3>Creating a Budget</h3>
          <p>A budget can help you track your income and expenses, allowing you to allocate more funds towards debt repayment.</p>

          <h3>Conclusion</h3>
          <p>With a clear plan and consistent effort, you can overcome debt and achieve financial freedom.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <p>Report content for {reportId} will be displayed here.</p>
    </div>
  );
};
