import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Printer, BookOpen, TrendingUp, Users, Heart, Home, PiggyBank, Calendar, DollarSign, CreditCard, AlertTriangle, FileText, Gavel, Search, TrendingDown, X, ArrowLeft } from "lucide-react";

interface ReportViewerProps {
  reportId: string;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ reportId }) => {
  const handleDownload = () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${reportId}-report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        compress: true
      }
    };

    import('html2pdf.js').then((html2pdf) => {
      html2pdf.default().set(opt).from(element).save();
    });
  };

  const renderRetirementPlanning3 = () => (
    <div className="space-y-6">
      {/* Page 1 */}
      <div className="min-h-screen bg-white p-8 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-normal text-center mb-8 report-heading" style={{ color: '#3F528C', fontFamily: 'Roboto Slab, serif' }}>
            The Need for Retirement Planning
          </h1>
          
          <div className="flex gap-8 items-start">
            <div className="flex-1 space-y-4">
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.
              </p>
              
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                More recently, however, many individuals are beginning to recognize that for a number of reasons, this traditional view of retirement is no longer accurate. Some individuals, for example, are voluntarily choosing to retire early, in their 40s or 50s. Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65. And, many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as travel, returning to school, volunteer work, or the pursuit of favorite hobbies or sports.
              </p>
              
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                This changed the face of retirement, however, with all of its possibilities, does not happen automatically. Many of the issues associated with retirement, such as ill health, and the need to provide income, still exist. With proper planning, however, these needs can be met.
              </p>
            </div>
            
            <div className="w-64 flex-shrink-0">
              <img 
                src="/lovable-uploads/b9f3724b-53f8-4430-9fc7-32d280a85c70.png" 
                alt="Retirement Planning Book" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-normal mb-4 report-subheading" style={{ color: '#344373', fontFamily: 'Roboto Slab, serif' }}>
              Longer Lives
            </h2>
            
            <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
              The single most important factor in this changed retirement picture is the fact that we now live much longer than before. A child born in 1900, for example, had an average life expectancy of 47.3 years. For a child born in 2020, however, average life expectancy had increased to 77.0 years. The following graph¹ illustrates this change.
            </p>
          </div>
          
          <div className="absolute bottom-4 left-8 text-sm text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Page 1 of 3
          </div>
          <div className="absolute bottom-4 right-8 text-sm text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Presented by Jason Mangold
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="min-h-screen bg-white p-8 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-normal text-center mb-8 report-heading" style={{ color: '#3F528C', fontFamily: 'Roboto Slab, serif' }}>
            The Need for Retirement Planning
          </h1>
          
          <h2 className="text-2xl font-normal mb-6 text-center report-subheading" style={{ color: '#344373', fontFamily: 'Roboto Slab, serif' }}>
            Average U.S. Life Expectancy (1900 – 2020)
          </h2>
          
          <div className="mb-8 bg-gray-100 h-64 flex items-center justify-center">
            <div className="text-center text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
              [Life Expectancy Chart - 1900 to 2020 showing increase from ~47 to ~77 years]
            </div>
          </div>
          
          <h2 className="text-2xl font-normal mb-4 report-subheading" style={{ color: '#344373', fontFamily: 'Roboto Slab, serif' }}>
            Common Retirement Planning Issues
          </h2>
          
          <p className="text-base leading-relaxed mb-4 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include the following:
          </p>
          
          <div className="space-y-4">
            <div>
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                <strong style={{ color: '#344373' }}>• Paying for retirement:</strong> Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings. Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required. If income is insufficient, a retiree may be forced to either continue working, or face a reduced standard of living.
              </p>
            </div>
            
            <div>
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                <strong style={{ color: '#344373' }}>• Health care:</strong> The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy, to provide needed benefits not available through Medicare. Health care planning should also consider a health care proxy, allowing someone else to make medical decisions when an individual is temporarily incapacitated, as well as a living will that expresses an individual's wishes when no hope of recovery is possible.
              </p>
            </div>
            
            <div>
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                <strong style={{ color: '#344373' }}>• Estate planning:</strong> Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure not only
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-8 text-sm text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Page 2 of 3
          </div>
          <div className="absolute bottom-4 right-8 text-sm text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Presented by Jason Mangold
          </div>
        </div>
      </div>

      {/* Page 3 */}
      <div className="min-h-screen bg-white p-8 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-normal text-center mb-8 report-heading" style={{ color: '#3F528C', fontFamily: 'Roboto Slab, serif' }}>
            The Need for Retirement Planning
          </h1>
          
          <div className="space-y-4 mb-8">
            <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
              that assets are transferred to the individuals or organizations chosen by the owner, but also that the transfer is done with the least amount of tax and administrative expense.
            </p>
            
            <div>
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                <strong style={{ color: '#344373' }}>• Housing:</strong> This question involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location. Such factors as climate and proximity to close family members and medical care are often important. Completely paying off a home loan can reduce monthly income needs. A reverse mortgage may provide additional monthly income.
              </p>
            </div>
            
            <div>
              <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                <strong style={{ color: '#344373' }}>• Lifestyle:</strong> Some individuals, accustomed to a busy work life, find it difficult to enjoy the freedom offered by retirement. Planning ahead can make this transition easier.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-normal mb-4 report-subheading" style={{ color: '#344373', fontFamily: 'Roboto Slab, serif' }}>
            Seek Professional Guidance
          </h2>
          
          <p className="text-base leading-relaxed report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals, from many professional disciplines. The key is to begin planning as early as possible.
          </p>
          
          <div className="mt-16">
            <p className="text-xs text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
              ¹ Source: National Vital Statistics Reports, Volume 71, Number 1 – United States Life Tables, 2020, Table 19. August 8, 2022.
            </p>
          </div>
          
          <div className="absolute bottom-4 left-8 text-sm text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Page 3 of 3
          </div>
          <div className="absolute bottom-4 right-8 text-sm text-gray-600 report-body" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
            Presented by Jason Mangold
          </div>
        </div>
      </div>
    </div>
  );

  const renderReport = () => {
    switch (reportId) {
      case 'retirement-planning-3':
        return renderRetirementPlanning3();
      case "debt-management":
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
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
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
      case "retirement-planning":
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
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
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
      case "retirement-planning-2":
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
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
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
      case "retirement-planning-3":
        return (
          <div className="max-w-4xl mx-auto space-y-6 report-content">
            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 no-print mb-6">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
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

            {/* Page 1 */}
            <div className="space-y-6">
              {/* Header */}
              <h1 className="report-3-heading text-4xl font-normal text-center border-b-2 border-gray-300 pb-4 mb-8">
                The Need for Retirement Planning
              </h1>

              {/* Introduction with image */}
              <div className="report-3-body text-base leading-relaxed">
                <img 
                  src="/lovable-uploads/719f850d-208e-436a-84a3-c4b1512811cb.png"
                  alt="Retirement planning book"
                  className="retirement-image"
                />
                <p className="mb-4">
                  Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.
                </p>
                
                <p className="mb-4">
                  More recently, however, many individuals are beginning to recognize that for a number of reasons, this traditional view of retirement is no longer accurate. Some individuals, for example, are voluntarily choosing to retire early, in their 40s or 50s. Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65. And, many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as travel, returning to school, volunteer work, or the pursuit of favorite hobbies or sports.
                </p>
                
                <p className="mb-4">
                  This changed the face of retirement, however, with all of its possibilities, does not happen automatically. Many of the issues associated with retirement, such as ill health, and the need to provide income, still exist. With proper planning, however, these needs can be met.
                </p>
              </div>

              {/* Longer Lives Section */}
              <div className="mt-8">
                <h2 className="report-3-subheading text-2xl font-normal mb-4">
                  Longer Lives
                </h2>
                
                <div className="report-3-body text-base leading-relaxed">
                  <p className="mb-4">
                    The single most important factor in this changed retirement picture is the fact that we now live much longer than before. A child born in 1900, for example, had an average life expectancy of 47.3 years. For a child born in 2020, however, average life expectancy had increased to 77.0 years. The following graph¹ illustrates this change.
                  </p>
                </div>

                <div className="report-3-footnote text-xs mt-6 pt-3 border-t border-gray-300">
                  ¹ Source: National Vital Statistics Reports, Volume 71, Number 1 – United States Life Tables, 2020, Table 19. August 8, 2022.
                </div>
              </div>

              {/* Page footer */}
              <div className="report-3-page-footer text-xs flex justify-between items-center mt-8 pt-3 border-t">
                <span>Page 1 of 3</span>
                <span>Presented by Jason Mangold</span>
              </div>
            </div>

            {/* Page break */}
            <div className="page-break"></div>

            {/* Page 2 */}
            <div className="space-y-6">
              <h1 className="report-3-heading text-4xl font-normal text-center border-b-2 border-gray-300 pb-4 mb-8">
                The Need for Retirement Planning
              </h1>

              {/* Chart */}
              <div className="chart-container mb-8">
                <h3 className="chart-title text-lg mb-4">Average U.S. Life Expectancy (1900 – 2020)</h3>
                <img 
                  src="/lovable-uploads/b9f3724b-53f8-4430-9fc7-32d280a85c70.png"
                  alt="Life expectancy chart"
                  className="mx-auto max-w-full"
                />
              </div>

              {/* Common Retirement Planning Issues */}
              <div>
                <h2 className="report-3-subheading text-2xl font-normal mb-4">
                  Common Retirement Planning Issues
                </h2>
                
                <div className="report-3-body text-base leading-relaxed">
                  <p className="mb-4">
                    Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include the following:
                  </p>

                  <ul className="list-disc ml-6 space-y-3">
                    <li>
                      <strong className="text-blue-600">Paying for retirement:</strong> Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings. Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required. If income is insufficient, a retiree may be forced to either continue working, or face a reduced standard of living.
                    </li>

                    <li>
                      <strong className="text-red-600">Health care:</strong> The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy, to provide needed benefits not available through Medicare. Health care planning should also consider a health care proxy, allowing someone else to make medical decisions when an individual is temporarily incapacitated, as well as a living will that expresses an individual's wishes when no hope of recovery is possible.
                    </li>

                    <li>
                      <strong className="text-blue-600">Estate planning:</strong> Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure not only
                    </li>
                  </ul>
                </div>
              </div>

              {/* Page footer */}
              <div className="report-3-page-footer text-xs flex justify-between items-center mt-8 pt-3 border-t">
                <span>Page 2 of 3</span>
                <span>Presented by Jason Mangold</span>
              </div>
            </div>

            {/* Page break */}
            <div className="page-break"></div>

            {/* Page 3 */}
            <div className="space-y-6">
              <h1 className="report-3-heading text-4xl font-normal text-center border-b-2 border-gray-300 pb-4 mb-8">
                The Need for Retirement Planning
              </h1>

              <div className="report-3-body text-base leading-relaxed">
                <p className="mb-4">
                  that assets are transferred to the individuals or organizations chosen by the owner, but also that the transfer is done with the least amount of tax and administrative expense.
                </p>

                <ul className="list-disc ml-6 space-y-3 mb-6">
                  <li>
                    <strong className="text-orange-600">Housing:</strong> This question involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location. Such factors as climate and proximity to close family members and medical care are often important. Completely paying off a home loan can reduce monthly income needs. A reverse mortgage may provide additional monthly income.
                  </li>

                  <li>
                    <strong className="text-purple-600">Lifestyle:</strong> Some individuals, accustomed to a busy work life, find it difficult to enjoy the freedom offered by retirement. Planning ahead can make this transition easier.
                  </li>
                </ul>

                <h2 className="report-3-subheading text-2xl font-normal mb-4">
                  Seek Professional Guidance
                </h2>

                <p className="mb-4">
                  Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals, from many professional disciplines. The key is to begin planning as early as possible.
                </p>
              </div>

              {/* Page footer */}
              <div className="report-3-page-footer text-xs flex justify-between items-center mt-8 pt-3 border-t">
                <span>Page 3 of 3</span>
                <span>Presented by Jason Mangold</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Report Not Found</h2>
            <p>The requested report could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with download button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Report Viewer</h1>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Report content */}
      <div id="report-content" className="print:shadow-none">
        {renderReport()}
      </div>
    </div>
  );
};
