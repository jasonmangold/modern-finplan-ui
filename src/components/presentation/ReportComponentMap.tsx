import React from 'react';
import { AnalysisGoals } from '@/components/AnalysisGoals';
import { FinancialInventory } from '@/components/FinancialInventory';
import { FinancialFitnessScore } from '@/components/FinancialFitnessScore';
import { RetirementAnalysisOutput } from '@/components/RetirementAnalysisOutput';
import { CapitalAvailableOutput } from '@/components/CapitalAvailableOutput';
import { RetirementTimelineOutput } from '@/components/RetirementTimelineOutput';
import { AlternativesToRetirementOutput } from '@/components/AlternativesToRetirementOutput';
import { EducationFundingSummaryOutput } from '@/components/EducationFundingSummaryOutput';
import { SurvivorNeedsOutput } from '@/components/SurvivorNeedsOutput';
import { AssetAllocationComparisonOutput } from '@/components/AssetAllocationComparisonOutput';

interface ReportComponentProps {
  reportName: string;
  selectedForPresentation?: string[];
}

export const ReportComponent: React.FC<ReportComponentProps> = ({ 
  reportName, 
  selectedForPresentation = [] 
}) => {
  // Mock onBack function for components that require it
  const mockOnBack = () => {};

  switch (reportName) {
    case "Analysis Goals":
      return <AnalysisGoals onBack={mockOnBack} />;
    
    case "Financial Inventory":
      return <FinancialInventory onBack={mockOnBack} />;
    
    case "Financial Fitness":
      return <FinancialFitnessScore onBack={mockOnBack} />;
    
    case "Retirement Analysis":
      return <RetirementAnalysisOutput selectedForPresentation={selectedForPresentation} />;
    
    case "Capital Available for Retirement":
      return <CapitalAvailableOutput selectedForPresentation={selectedForPresentation} />;
    
    case "Retirement Timeline":
      return <RetirementTimelineOutput selectedForPresentation={selectedForPresentation} />;
    
    case "Alternatives to Achieving Retirement Goals":
      return <AlternativesToRetirementOutput selectedForPresentation={selectedForPresentation} />;
    
    case "Education Funding Summary":
      return <EducationFundingSummaryOutput selectedForPresentation={selectedForPresentation} />;
    
    case "Survivor Needs - Client 1 Dies":
      return <SurvivorNeedsOutput selectedForPresentation={selectedForPresentation} />;
    
    case "Asset Allocation Comparison":
      return <AssetAllocationComparisonOutput selectedForPresentation={selectedForPresentation} />;
    
    default:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 bg-muted rounded-lg mx-auto flex items-center justify-center">
              <div className="text-4xl text-muted-foreground">📊</div>
            </div>
            <p className="text-lg text-muted-foreground">
              {reportName}
            </p>
            <p className="text-sm text-muted-foreground">
              Report component not found
            </p>
          </div>
        </div>
      );
  }
};