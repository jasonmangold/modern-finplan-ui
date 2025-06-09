import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Printer, BookOpen, TrendingUp, Users, Heart, Home, PiggyBank, Calendar, DollarSign, CreditCard, AlertTriangle, FileText, Gavel, Search, TrendingDown, X } from "lucide-react";

interface ReportViewerProps {
  reportId: string;
}

export const ReportViewer = ({ reportId }: ReportViewerProps) => {
  const handleDownloadPDF = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get the current report content
    const reportContent = document.querySelector('.report-content');
    if (!reportContent) return;

    // Create the HTML structure for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Report - ${getReportTitle()}</title>
          <style>
            @media print {
              @page {
                margin: 0.5in;
                size: A4;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                line-height: 1.5;
                color: #374151;
                background: white;
                margin: 0;
                padding: 0;
              }
              .no-print {
                display: none !important;
              }
              .page-break {
                page-break-before: always;
              }
              img {
                max-width: 100%;
                height: auto;
                display: block;
              }
              table {
                border-collapse: collapse;
                width: 100%;
                margin: 0.75rem 0;
                break-inside: avoid;
              }
              th, td {
                border: 1px solid #d1d5db;
                padding: 0.5rem;
                text-align: left;
                vertical-align: top;
              }
              th {
                background-color: #f3f4f6;
                font-weight: 600;
              }
              .text-4xl { font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem; }
              .text-3xl { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; }
              .text-2xl { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
              .text-xl { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; }
              .text-lg { font-size: 1rem; font-weight: 500; }
              .font-bold { font-weight: 700; }
              .font-semibold { font-weight: 600; }
              .mb-4 { margin-bottom: 0.75rem; }
              .mb-6 { margin-bottom: 1rem; }
              .mb-8 { margin-bottom: 1.25rem; }
              .mt-4 { margin-top: 0.75rem; }
              .mt-6 { margin-top: 1rem; }
              .p-4 { padding: 0.75rem; }
              .p-6 { padding: 0.75rem; }
              .border { border: 1px solid #d1d5db; }
              .border-l-4 { border-left: 4px solid; padding-left: 0.75rem; }
              .border-l-red-600 { border-left-color: #dc2626; }
              .border-l-blue-600 { border-left-color: #2563eb; }
              .border-l-green-500 { border-left-color: #10b981; }
              .border-l-purple-600 { border-left-color: #9333ea; }
              .border-l-orange-600 { border-left-color: #ea580c; }
              .border-l-yellow-500 { border-left-color: #eab308; }
              .bg-red-50 { background-color: #fef2f2; }
              .bg-blue-50 { background-color: #eff6ff; }
              .bg-green-50 { background-color: #f0fdf4; }
              .bg-yellow-50 { background-color: #fefce8; }
              .bg-orange-50 { background-color: #fff7ed; }
              .bg-purple-50 { background-color: #faf5ff; }
              .text-red-800 { color: #991b1b; }
              .text-blue-800 { color: #1e40af; }
              .text-green-600 { color: #16a34a; }
              .text-red-600 { color: #dc2626; }
              .text-blue-600 { color: #2563eb; }
              .text-purple-600 { color: #9333ea; }
              .text-orange-600 { color: #ea580c; }
              .text-yellow-600 { color: #ca8a04; }
              .text-gray-700 { color: #374151; }
              .text-gray-900 { color: #111827; }
              .rounded-lg { border-radius: 0.375rem; }
              .rounded-xl { border-radius: 0.5rem; }
              .space-y-4 > * + * { margin-top: 0.75rem; }
              .space-y-6 > * + * { margin-top: 1rem; }
              .space-y-8 > * + * { margin-top: 1.25rem; }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .gap-4 { gap: 0.75rem; }
              .gap-6 { gap: 1rem; }
              .flex { display: flex; }
              .items-center { align-items: center; }
              .items-start { align-items: flex-start; }
              .justify-between { justify-content: space-between; }
              .justify-center { justify-content: center; }
              .text-center { text-align: center; }
              .max-w-3xl { max-width: 48rem; }
              .max-w-4xl { max-width: 56rem; }
              .mx-auto { margin-left: auto; margin-right: auto; }
              .list-disc { list-style-type: disc; }
              .list-inside { list-style-position: inside; }
              .overflow-x-auto { overflow-x: auto; }
              .w-full { width: 100%; }
              .h-64 { height: 12rem; }
              .h-48 { height: 10rem; }
              .relative { position: relative; }
              .absolute { position: absolute; }
              .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
              .object-cover { object-fit: cover; }
              .flex-shrink-0 { flex-shrink: 0; }
              
              /* Card styles */
              .card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 0.375rem;
                margin-bottom: 0.75rem;
                break-inside: avoid;
                overflow: hidden;
              }
              
              .card-content {
                padding: 0.75rem;
              }
              
              .card-header {
                padding: 0.75rem 0.75rem 0.25rem 0.75rem;
              }
              
              .card-title {
                font-size: 1.125rem;
                font-weight: 600;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
              }
              
              /* Icon styling */
              svg {
                width: 1.25rem;
                height: 1.25rem;
                flex-shrink: 0;
                display: inline-block;
                vertical-align: middle;
              }
              
              .icon-large svg {
                width: 1.5rem;
                height: 1.5rem;
              }
              
              /* Header icons */
              .header-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 0.375rem;
                flex-shrink: 0;
              }
              
              .header-icon svg {
                width: 1.75rem;
                height: 1.75rem;
              }
              
              /* Badge styles */
              .badge {
                display: inline-flex;
                align-items: center;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                font-weight: 500;
                margin: 0 0.25rem;
              }
              
              /* Hero image container */
              .hero-container {
                height: 8rem;
                border-radius: 0.5rem;
                overflow: hidden;
                margin: 1rem 0;
                position: relative;
                background: linear-gradient(to right, #fef2f2, #fed7aa);
              }
              
              /* Table hover effects removed for print */
              .hover\\:bg-gray-50 { background-color: transparent; }
              
              /* Grid responsive adjustments for print */
              @media print and (max-width: 8in) {
                .grid-cols-2 { grid-template-columns: 1fr; }
                .md\\:grid-cols-2 { grid-template-columns: 1fr; }
              }
              
              /* Ensure proper spacing between major sections */
              .report-content > * {
                margin-bottom: 1.25rem;
              }
              
              .report-content > *:last-child {
                margin-bottom: 0;
              }
              
              /* Improve paragraph spacing */
              p {
                margin: 0 0 0.75rem 0;
              }
              
              p:last-child {
                margin-bottom: 0;
              }
              
              /* List styling */
              ul {
                margin: 0.5rem 0;
                padding-left: 1.25rem;
              }
              
              li {
                margin-bottom: 0.25rem;
              }
              
              /* Header section specific styling */
              .header-section {
                text-align: center;
                margin-bottom: 1.5rem;
                break-inside: avoid;
              }
              
              .header-section h1 {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
              }
              
              .header-section .badge-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-top: 0.75rem;
              }
            }
          </style>
        </head>
        <body>
          ${reportContent.innerHTML}
        </body>
      </html>
    `;

    // Write the content to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const getReportTitle = () => {
    switch (reportId) {
      case "debt-management":
        return "Up to Your Neck in Debt?";
      case "retirement-planning":
        return "The Need for Retirement Planning";
      case "retirement-planning-2":
        return "The Need for Retirement Planning (2)";
      default:
        return "Report";
    }
  };

  if (reportId === "debt-management") {
    return (
      <div className="max-w-4xl mx-auto space-y-8 report-content">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Up to Your Neck in Debt?</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practical strategies and solutions for managing overwhelming debt and regaining financial control
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Debt Management
            </Badge>
            <Badge variant="outline">10 min read</Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 no-print">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-orange-100 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
            alt="Debt management and financial stress"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-red-600/20"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Warning Signs */}
          <Card className="border-l-4 border-l-red-600 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-4">Warning Signs</h3>
                  <div className="space-y-3 text-red-800">
                    <p>Are you afraid to open your bills? Do you juggle bills, paying Paul one month and Peter the next? Do you make only the required minimum payment? Do you have to pay for basic necessities like food, rent, or gasoline on credit because you're out of cash?</p>
                    <p className="font-semibold">If some or all of these apply to you, it's a good bet you've taken on too much debt.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Initial Steps */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              Initial Steps
            </h2>
            
            <Card className="border-l-4 border-l-blue-600">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 mb-6">
                  Many of us have to deal with a financial crisis at some point in our lives. Whatever the cause, there are ways to overcome these financial problems. Often the first step is to recognize that there is a problem. Then you can begin to take action to solve it.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-green-600" />
                    Create a budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    One key step is to create a realistic budget, a cold, hard look at both your income and your necessary living expenses. Are there ways to increase income, as well as reducing expenses?
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    Talk with your creditors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Contacting your creditors and explaining why you're having trouble paying your bills on time may lead to a reduced payment plan. Setting up an automatic payment plan from your checking or savings account can help establish how serious you are about paying your bills.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Search className="h-6 w-6 text-purple-600" />
                    Check for mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Your bills or credit report could contain errors that, once corrected, could provide some partial relief.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Lower the Cost of Debt */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-green-600" />
              Lower the Cost of Debt
            </h2>
            
            <p className="text-lg text-gray-700">
              Lowering the cost of debt is another way to improve the situation:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="border border-gray-300 p-4 text-left font-semibold text-blue-900">Method</th>
                    <th className="border border-gray-300 p-4 text-left font-semibold text-blue-900">Description</th>
                    <th className="border border-gray-300 p-4 text-left font-semibold text-blue-900">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-4 font-medium">Refinance High-Cost Loans</td>
                    <td className="border border-gray-300 p-4">Lower interest rates may allow you to refinance an existing loan and lower your payment.</td>
                    <td className="border border-gray-300 p-4">Mortgages: Generally, the interest saved must be greater than the cost of acquiring the new loan. Credit cards: You may be able to move balances from one card to another, to take advantage of introductory rates.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-4 font-medium">Consolidate Loans</td>
                    <td className="border border-gray-300 p-4">Taking a number of high interest rate debts (often credit card debt) and replacing them with a single loan, often secured by the borrower's home or auto.</td>
                    <td className="border border-gray-300 p-4">If payments are not made on the new loan, the lender often can seize the asset securing the loan.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-4 font-medium">Reposition Assets</td>
                    <td className="border border-gray-300 p-4">Using existing assets such as cash, jewelry, or securities to pay down or pay off debt. Loans with the highest interest rates should be paid off first.</td>
                    <td className="border border-gray-300 p-4">There may be negative tax implications if an asset with long-term appreciation is sold. Be sure you keep adequate liquid reserves to cover any future emergency.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Outside Help */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-purple-600" />
              Outside Help
            </h2>
            
            <Card className="border-l-4 border-l-purple-600">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700">
                  Many credit counseling agencies are available to help consumers who find themselves in financial trouble. Not all of these agencies work in a consumer's best interest. A reputable credit counseling agency has counselors trained in budgeting, credit, and debt management. A good counselor works closely with you to develop a personalized plan to resolve your individual debt problems.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-green-600" />
                    Debt management plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    A debt management plan, or DMP, may be recommended by a credit counselor. In a DMP, you make monthly payments to the credit counseling agency, which then uses your money to pay your unsecured debts in accordance with an agreement between you and your creditors. DMPs are not for everyone and may have restrictions which are unacceptable to some consumers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    Debt negotiation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    For a fee, debt negotiation firms offer to "negotiate" settling a debt with a creditor, often for 10% to 50% of the amount owed. These programs can be highly risky and can have a negative, long-term impact on your credit rating. The IRS may consider any debt forgiven as taxable income.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <X className="h-6 w-6 text-red-600" />
                    Credit "repair" firms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Companies or agencies that offer or promise to "repair" your credit record should be regarded as scams. The passage of time and a regular history of repaying your debts are the only way to truly "fix" your credit report.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bankruptcy Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Gavel className="h-8 w-8 text-orange-600" />
              A Last Resort – Personal Bankruptcy
            </h2>
            
            <Card className="bg-orange-50 border-l-4 border-l-orange-600">
              <CardContent className="p-6">
                <p className="text-lg text-orange-800 mb-4">
                  If your debts are truly overwhelming, personal bankruptcy is a drastic option of last resort.
                </p>
                <p className="text-gray-700">
                  Bankruptcy is a court-supervised process in which a debtor either has his debts eliminated (Chapter 7) or a plan is arranged which allows debt repayment under the supervision of the bankruptcy court (Chapter 13). Certain debts, such as most taxes, child support, and alimony, cannot be "discharged" through bankruptcy. Federal law requires a debtor to undergo credit counseling before filing bankruptcy and to complete debtor education before bankruptcy can be finalized. Competent legal advice is highly recommended.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-red-600" />
                    Chapter 7
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Also known as "liquidation", Chapter 7 effectively erases your unsecured debts. With the exception of certain "exempt" property,¹ other assets that you own, such as your home, jewelry, or artwork, may be sold and the proceeds used to pay your debts.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Impact:</strong> Not everyone qualifies for Chapter 7 bankruptcy; if you have a regular income that exceeds certain limits, you may be required to file Chapter 13. A Chapter 7 bankruptcy remains on your credit record for 10 years.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                    Chapter 13
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Also known as "wage earner" bankruptcy, Chapter 13 allows you to propose a plan to repay your debts over a three to five year period. To qualify for Chapter 13, you need a steady source of income and your debts must not exceed certain dollar limits.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Impact:</strong> A Chapter 13 bankruptcy remains on your credit record for 7 years.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50 border border-blue-200">
              <CardContent className="p-6">
                <p className="text-blue-800">
                  <strong>Online resources:</strong> See the website of the Department of Justice, U.S. Trustee, at https://www.justice.gov/ust.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (reportId === "retirement-planning") {
    return (
      <div className="max-w-4xl mx-auto space-y-8 report-content">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">The Need for Retirement Planning</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the evolving landscape of retirement and the importance of comprehensive planning for your financial future
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Financial Planning
            </Badge>
            <Badge variant="outline">8 min read</Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 no-print">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"
            alt="Retirement planning concept"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/20"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. 
                An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. 
                Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.
              </p>
            </CardContent>
          </Card>

          {/* Modern Retirement */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              The Changing Face of Retirement
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Early Retirement</h3>
                  <p className="text-gray-700">
                    Many individuals are voluntarily choosing to retire early, in their 40s or 50s, enabled by careful financial planning and lifestyle choices.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Extended Careers</h3>
                  <p className="text-gray-700">
                    Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <p className="text-lg text-gray-700">
                Many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as 
                <strong className="text-blue-700"> travel, returning to school, volunteer work,</strong> or the pursuit of favorite hobbies or sports.
              </p>
            </div>
          </div>

          {/* Longevity Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              Longer Lives, Greater Opportunities
            </h2>
            
            <Card className="bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Life Expectancy Growth</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">1900:</span>
                        <span className="text-2xl font-bold text-red-600">47.3 years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">2020:</span>
                        <span className="text-2xl font-bold text-green-600">77.0 years</span>
                      </div>
                      <div className="text-center pt-2">
                        <span className="text-lg font-semibold text-blue-600">+29.7 years increase</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
                      alt="Healthy aging"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Issues */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
              Common Retirement Planning Issues
            </h2>
            
            <p className="text-lg text-gray-700">
              Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include:
            </p>

            <div className="grid gap-6">
              {/* Income Issue */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <PiggyBank className="h-6 w-6 text-green-600" />
                    Paying for Retirement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Key Consideration:</strong> Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Health Care */}
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-red-600" />
                    Health Care Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Health care proxy for medical decisions</li>
                    <li>Living will expressing individual wishes</li>
                    <li>Long-term care insurance consideration</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Estate Planning */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    Estate Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure assets are transferred efficiently with minimal tax and administrative expense.
                  </p>
                </CardContent>
              </Card>

              {/* Housing */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Home className="h-6 w-6 text-orange-600" />
                    Housing Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    This involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Factors:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Climate preferences</li>
                        <li>Proximity to family</li>
                        <li>Access to medical care</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Financial Options:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Paying off home loans</li>
                        <li>Reverse mortgage options</li>
                        <li>Downsizing strategies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Professional Guidance */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-900">
                Seek Professional Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-blue-800">
                Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. 
                Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals from many professional disciplines.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-xl font-bold text-blue-900">
                  The key is to begin planning as early as possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (reportId === "retirement-planning-2") {
    return (
      <div className="max-w-4xl mx-auto space-y-8 report-content">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">The Need for Retirement Planning (2)</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the evolving landscape of retirement and the importance of comprehensive planning for your financial future
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Financial Planning
            </Badge>
            <Badge variant="outline">12 min read</Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 no-print">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
            alt="Retirement planning concept"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/20"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Traditional Retirement */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.
              </p>
            </CardContent>
          </Card>

          {/* Modern Retirement Changes */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              The Changing Face of Retirement
            </h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <p className="text-lg text-gray-700 mb-4">
                More recently, however, many individuals are beginning to recognize that for a number of reasons, this traditional view of retirement is no longer accurate. Some individuals, for example, are voluntarily choosing to retire early, in their 40s or 50s. Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65.
              </p>
              <p className="text-lg text-gray-700">
                And, many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as travel, returning to school, volunteer work, or the pursuit of favorite hobbies or sports.
              </p>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700">
                  This changed the face of retirement, however, with all of its possibilities, does not happen automatically. Many of the issues associated with retirement, such as ill health, and the need to provide income, still exist. With proper planning, however, these needs can be met.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Longer Lives Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              Longer Lives
            </h2>
            
            <Card className="bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-lg text-gray-700 mb-6">
                      The single most important factor in this changed retirement picture is the fact that we now live much longer than before. A child born in 1900, for example, had an average life expectancy of 47.3 years. For a child born in 2020, however, average life expectancy had increased to 77.0 years. The following graph illustrates this change.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">1900:</span>
                        <span className="text-2xl font-bold text-red-600">47.3 years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">2020:</span>
                        <span className="text-2xl font-bold text-green-600">77.0 years</span>
                      </div>
                      <div className="text-center pt-2">
                        <span className="text-lg font-semibold text-blue-600">+29.7 years increase</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
                      alt="Healthy aging and longer lives"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Issues Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
              Common Retirement Planning Issues
            </h2>
            
            <p className="text-lg text-gray-700">
              Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include the following:
            </p>

            <div className="grid gap-6">
              {/* Paying for Retirement */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    Paying for retirement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings. Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required. If income is insufficient, a retiree may be forced to either continue working, or face a reduced standard of living.
                  </p>
                </CardContent>
              </Card>

              {/* Health Care */}
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-red-600" />
                    Health care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy, to provide needed benefits not available through Medicare. Health care planning should also consider a health care proxy, allowing someone else to make medical decisions when an individual is temporarily incapacitated, as well as a living will that expresses an individual's wishes when no hope of recovery is possible.
                  </p>
                </CardContent>
              </Card>

              {/* Estate Planning */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    Estate planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure not only that assets are transferred to the individuals or organizations chosen by the owner, but also that the transfer is done with the least amount of tax and administrative expense.
                  </p>
                </CardContent>
              </Card>

              {/* Housing */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Home className="h-6 w-6 text-orange-600" />
                    Housing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    This question involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location. Such factors as climate and proximity to close family members and medical care are often important. Completely paying off a home loan can reduce monthly income needs. A reverse mortgage may provide additional monthly income.
                  </p>
                </CardContent>
              </Card>

              {/* Lifestyle */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    Lifestyle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Some individuals, accustomed to a busy work life, find it difficult to enjoy the freedom offered by retirement. Planning ahead can make this transition easier.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Professional Guidance */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-900">
                Seek Professional Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-blue-800">
                Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals, from many professional disciplines. The key is to begin planning as early as possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <div>Report not found</div>;
};
