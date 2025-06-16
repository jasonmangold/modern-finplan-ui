
import { useState, useEffect } from 'react';

interface PresentationSelection {
  goalId: string;
  outputType: string;
}

export const usePresentationSelection = () => {
  const [selectedReports, setSelectedReports] = useState<PresentationSelection[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('presentationReports');
    if (stored) {
      try {
        setSelectedReports(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored presentation reports:', error);
      }
    }
  }, []);

  const saveToStorage = (reports: PresentationSelection[]) => {
    localStorage.setItem('presentationReports', JSON.stringify(reports));
    setSelectedReports(reports);
  };

  const toggleReport = (goalId: string, outputType: string) => {
    const newSelection = { goalId, outputType };
    const exists = selectedReports.some(
      report => report.goalId === goalId && report.outputType === outputType
    );

    if (exists) {
      const filtered = selectedReports.filter(
        report => !(report.goalId === goalId && report.outputType === outputType)
      );
      saveToStorage(filtered);
    } else {
      saveToStorage([...selectedReports, newSelection]);
    }
  };

  const isSelected = (goalId: string, outputType: string) => {
    return selectedReports.some(
      report => report.goalId === goalId && report.outputType === outputType
    );
  };

  const getSelectedCount = () => selectedReports.length;

  return {
    selectedReports,
    toggleReport,
    isSelected,
    getSelectedCount
  };
};
