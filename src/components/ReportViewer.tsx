import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ReportViewerProps {
  reportId: string;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ reportId }) => {
  // Handle PDF reports that should use <object> tag
  if (reportId === "retirement-planning-4") {
    return (
      <div className="w-full h-full min-h-screen">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">The Need for Retirement Planning 4</h1>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        <object
          data="/retirement-planning-4.pdf"
          type="application/pdf"
          className="w-full h-[800px] border border-gray-200 rounded-lg"
        >
          <p className="p-4 text-center text-gray-600">
            PDF cannot be displayed. 
            <a href="/retirement-planning-4.pdf" className="text-blue-600 hover:underline ml-1">
              Click here to download the PDF
            </a>
          </p>
        </object>
      </div>
    );
  }

  if (reportId === "retirement-planning-5") {
    return (
      <div className="w-full h-full min-h-screen">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">The Need for Retirement Planning 5</h1>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        <object
          data="/retirement-planning-5.pdf"
          type="application/pdf"
          className="w-full h-[800px] border border-gray-200 rounded-lg"
        >
          <p className="p-4 text-center text-gray-600">
            PDF cannot be displayed. 
            <a href="/retirement-planning-5.pdf" className="text-blue-600 hover:underline ml-1">
              Click here to download the PDF
            </a>
          </p>
        </object>
      </div>
    );
  }

  const getReportContent = () => {
    switch (reportId) {
      case "retirement-planning":
        return (
          <div className="bg-white">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Source+Sans+Pro:wght@400;600;700&display=swap');
              
              .report-content {
                font-family: 'Source Sans Pro', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 1200px;
                margin: 0 auto;
                background: white;
              }
              
              .report-content h1 {
                font-family: 'Roboto Slab', serif;
                color: #3F528C;
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
                line-height: 1.2;
              }
              
              .report-content h2 {
                font-family: 'Roboto Slab', serif;
                color: #344373;
                font-size: 1.8rem;
                font-weight: 700;
                margin: 2rem 0 1rem 0;
                line-height: 1.3;
              }
              
              .report-content h3 {
                font-family: 'Roboto Slab', serif;
                color: #344373;
                font-size: 1.4rem;
                font-weight: 600;
                margin: 1.5rem 0 1rem 0;
              }
              
              .report-content p {
                margin-bottom: 1rem;
                font-size: 1rem;
                text-align: justify;
              }
              
              .report-content ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
              }
              
              .report-content li {
                margin-bottom: 0.5rem;
              }
              
              .report-header {
                display: flex;
                align-items: flex-start;
                gap: 2rem;
                margin-bottom: 2rem;
                padding: 2rem;
              }
              
              .report-text {
                flex: 1;
              }
              
              .report-image {
                flex-shrink: 0;
                width: 300px;
              }
              
              .report-image img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              }
              
              .report-body {
                padding: 0 2rem 2rem 2rem;
              }
              
              @media print {
                .report-content {
                  max-width: none;
                }
                
                .report-header {
                  page-break-inside: avoid;
                }
                
                .report-content h2 {
                  page-break-after: avoid;
                }
              }
            `}</style>
            
            <div className="report-content">
              <div className="report-header">
                <div className="report-text">
                  <h1>The Need for Retirement Planning</h1>
                  <p>
                    Retirement planning is one of the most critical financial decisions you'll make in your lifetime. 
                    With increasing life expectancy and rising healthcare costs, having a comprehensive retirement 
                    strategy is more important than ever before.
                  </p>
                  <p>
                    This report will guide you through the essential components of retirement planning, helping you 
                    understand the key factors that will impact your financial security in your golden years.
                  </p>
                </div>
                <div className="report-image">
                  <img 
                    src="/lovable-uploads/b9f3724b-53f8-4430-9fc7-32d280a85c70.png" 
                    alt="Retirement Planning Playbook"
                  />
                </div>
              </div>
              
              <div className="report-body">
                <h2>Why Start Planning Now?</h2>
                <p>
                  The power of compound interest makes early retirement planning crucial. Every year you delay 
                  starting your retirement savings can significantly impact your future financial security. 
                  Consider these key factors:
                </p>
                
                <ul>
                  <li>Time horizon: The longer your money has to grow, the more powerful compound interest becomes</li>
                  <li>Inflation impact: Your purchasing power will likely decrease over time</li>
                  <li>Healthcare costs: Medical expenses typically increase with age</li>
                  <li>Social Security uncertainty: Government benefits may not be sufficient for your needs</li>
                </ul>
                
                <h2>Key Retirement Planning Components</h2>
                
                <h3>1. Setting Retirement Goals</h3>
                <p>
                  Begin by envisioning your ideal retirement lifestyle. Consider where you want to live, 
                  what activities you want to pursue, and how much income you'll need to maintain your 
                  desired standard of living.
                </p>
                
                <h3>2. Calculating Your Retirement Needs</h3>
                <p>
                  Financial experts often recommend planning for 70-80% of your pre-retirement income. 
                  However, your actual needs may vary based on your specific circumstances, including:
                </p>
                
                <ul>
                  <li>Housing costs (paid-off mortgage vs. ongoing payments)</li>
                  <li>Healthcare expenses</li>
                  <li>Travel and leisure activities</li>
                  <li>Family support obligations</li>
                </ul>
                
                <h3>3. Retirement Savings Vehicles</h3>
                <p>
                  Understanding different retirement savings options is crucial for maximizing your 
                  retirement income:
                </p>
                
                <ul>
                  <li><strong>401(k) Plans:</strong> Employer-sponsored plans often with company matching</li>
                  <li><strong>Traditional IRAs:</strong> Tax-deductible contributions with tax-deferred growth</li>
                  <li><strong>Roth IRAs:</strong> After-tax contributions with tax-free withdrawals in retirement</li>
                  <li><strong>Personal Savings:</strong> Flexible investments outside retirement accounts</li>
                </ul>
                
                <h2>Investment Strategies for Retirement</h2>
                <p>
                  Your investment approach should evolve as you age. Generally, younger investors can 
                  afford more aggressive growth strategies, while those closer to retirement should 
                  focus on capital preservation and income generation.
                </p>
                
                <h3>Asset Allocation Guidelines</h3>
                <p>
                  A common rule of thumb is to subtract your age from 100 to determine your stock 
                  allocation percentage. However, modern longevity may require more aggressive 
                  approaches even in retirement.
                </p>
                
                <h2>Common Retirement Planning Mistakes</h2>
                <ul>
                  <li>Starting too late</li>
                  <li>Underestimating retirement expenses</li>
                  <li>Not taking advantage of employer matching</li>
                  <li>Being too conservative with investments</li>
                  <li>Not planning for healthcare costs</li>
                  <li>Taking early withdrawals from retirement accounts</li>
                </ul>
                
                <h2>Taking Action</h2>
                <p>
                  The best time to start retirement planning was yesterday; the second-best time is today. 
                  Begin by assessing your current financial situation, setting clear retirement goals, 
                  and implementing a systematic savings and investment strategy.
                </p>
                
                <p>
                  Consider working with a qualified financial advisor who can help you develop a 
                  personalized retirement plan based on your unique circumstances and goals.
                </p>
              </div>
            </div>
          </div>
        );
        
      case "retirement-planning-2":
        return (
          <div className="space-y-6 p-8">
            <h1 className="text-3xl font-bold text-gray-900">The Need for Retirement Planning (Part 2)</h1>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Advanced Retirement Strategies</h2>
              <p className="text-gray-700 leading-relaxed">
                Building on the foundational concepts from Part 1, this section explores more sophisticated retirement planning strategies for maximizing your retirement income and minimizing tax implications.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800">Tax-Efficient Withdrawal Strategies</h3>
              <p className="text-gray-700 leading-relaxed">
                Understanding how to withdraw from different accounts in retirement can significantly impact your tax burden and the longevity of your savings.
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Strategic Roth conversions during low-income years</li>
                <li>Tax diversification across account types</li>
                <li>Managing Required Minimum Distributions (RMDs)</li>
                <li>Harvesting losses to offset gains</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Healthcare Planning</h3>
              <p className="text-gray-700 leading-relaxed">
                Healthcare costs represent one of the largest expenses in retirement. Planning for these costs is crucial for maintaining financial stability.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800">Estate Planning Considerations</h3>
              <p className="text-gray-700 leading-relaxed">
                Ensuring your retirement assets are properly positioned for wealth transfer to your beneficiaries requires careful planning and regular updates to your estate planning documents.
              </p>
            </div>
          </div>
        );
        
      case "retirement-planning-3":
        return (
          <div className="space-y-6 p-8">
            <h1 className="text-3xl font-bold text-gray-900">The Need for Retirement Planning (Part 3)</h1>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Retirement Income Planning</h2>
              <p className="text-gray-700 leading-relaxed">
                The final part of our retirement planning series focuses on creating sustainable income streams in retirement and managing longevity risk.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800">Creating Multiple Income Streams</h3>
              <p className="text-gray-700 leading-relaxed">
                Diversifying your retirement income sources helps protect against market volatility and provides greater financial security.
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Social Security optimization strategies</li>
                <li>Pension maximization techniques</li>
                <li>Annuity considerations for guaranteed income</li>
                <li>Part-time work and consulting opportunities</li>
                <li>Rental income and real estate investments</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Managing Sequence of Returns Risk</h3>
              <p className="text-gray-700 leading-relaxed">
                Poor market performance early in retirement can significantly impact your portfolio's longevity. Understanding and mitigating this risk is crucial.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800">Long-Term Care Planning</h3>
              <p className="text-gray-700 leading-relaxed">
                With the potential for extended care needs, planning for long-term care costs is an essential component of comprehensive retirement planning.
              </p>
            </div>
          </div>
        );
        
      case "debt-management":
        return (
          <div className="space-y-6 p-8">
            <h1 className="text-3xl font-bold text-gray-900">Up to Your Neck in Debt?</h1>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Understanding Your Debt Situation</h2>
              <p className="text-gray-700 leading-relaxed">
                Debt can feel overwhelming, but with the right strategy and commitment, you can regain control of your financial situation. This guide will help you understand different types of debt and create a plan to eliminate them systematically.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800">Types of Debt</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Good Debt:</strong> Mortgages, student loans, business loans</li>
                <li><strong>Bad Debt:</strong> Credit cards, payday loans, auto loans</li>
                <li><strong>Ugly Debt:</strong> High-interest consumer debt, gambling debt</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Debt Elimination Strategies</h3>
              <p className="text-gray-700 leading-relaxed">
                Choose a strategy that matches your personality and financial situation:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Debt Snowball:</strong> Pay minimums on all debts, focus extra payments on smallest balance</li>
                <li><strong>Debt Avalanche:</strong> Pay minimums on all debts, focus extra payments on highest interest rate</li>
                <li><strong>Debt Consolidation:</strong> Combine multiple debts into a single payment</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800">Creating a Budget for Debt Elimination</h3>
              <p className="text-gray-700 leading-relaxed">
                A well-structured budget is essential for finding extra money to pay down debt faster.
              </p>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Report Not Found</h1>
            <p className="text-gray-600">The requested report could not be found.</p>
          </div>
        );
    }
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF for", reportId);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-bold text-gray-900">Report Viewer</h1>
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {getReportContent()}
      </div>
    </div>
  );
};
