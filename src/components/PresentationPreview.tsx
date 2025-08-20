import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ReportComponent } from '@/components/presentation/ReportComponentMap';

interface PresentationItem {
  id: string;
  name: string;
  source: "Analysis" | "Education" | "Calculators";
}

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  disclaimer: string;
  disclosure: string;
  bio: string;
}

interface PresentationPreviewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  clientName: string;
  presentationItems: PresentationItem[];
  companyInfo: CompanyInfo;
  onExportPDF?: () => void;
}

interface Slide {
  id: string;
  type: 'title' | 'content';
  title: string;
  content?: string;
  source?: string;
}

export const PresentationPreview: React.FC<PresentationPreviewProps> = ({
  open,
  onClose,
  title,
  clientName,
  presentationItems,
  companyInfo,
  onExportPDF
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Generate slides from presentation data
  const slides: Slide[] = React.useMemo(() => {
    const generatedSlides: Slide[] = [];
    
    // Title slide
    generatedSlides.push({
      id: 'title',
      type: 'title',
      title: title || 'Financial Planning Presentation',
      content: `Prepared for ${clientName}`,
      source: companyInfo.name
    });

    // Content slides for each presentation item
    presentationItems.forEach((item) => {
      generatedSlides.push({
        id: item.id,
        type: 'content',
        title: item.name,
        content: `${item.source} • ${item.name}`,
        source: item.source
      });
    });

    return generatedSlides;
  }, [title, clientName, presentationItems, companyInfo.name]);

  const totalSlides = slides.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!open) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          setCurrentSlide(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
          setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1));
          break;
        case 'Escape':
          onClose();
          break;
        case 'Home':
          setCurrentSlide(0);
          break;
        case 'End':
          setCurrentSlide(totalSlides - 1);
          break;
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [open, totalSlides, onClose]);

  // Reset slide when modal opens
  useEffect(() => {
    if (open) {
      setCurrentSlide(0);
    }
  }, [open]);

  // Reset scroll position when slide changes
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-slide-content]');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];
  const canGoPrevious = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  const nextSlide = () => {
    if (canGoNext) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const previousSlide = () => {
    if (canGoPrevious) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  if (!currentSlideData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-full h-full p-0 bg-background">
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground">
              {currentSlide + 1} of {totalSlides}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onExportPDF && (
              <Button variant="outline" size="sm" onClick={onExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            )}
          </div>
        </div>

        {/* Main Slide Area */}
        <div className="flex items-center justify-center min-h-screen bg-muted/20 relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute left-4 z-10 h-12 w-12 ${!canGoPrevious ? 'opacity-30 cursor-not-allowed' : ''}`}
            onClick={previousSlide}
            disabled={!canGoPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-4 z-10 h-12 w-12 ${!canGoNext ? 'opacity-30 cursor-not-allowed' : ''}`}
            onClick={nextSlide}
            disabled={!canGoNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Slide Content */}
          <div className="w-full max-w-7xl mx-8 bg-background rounded-lg shadow-lg h-[90vh] flex flex-col animate-fade-in">
            {currentSlideData.type === 'title' ? (
              // Title Slide
              <div className="flex flex-col items-center justify-center h-full text-center p-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">
                      {currentSlideData.title}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      {currentSlideData.content}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                      <div className="text-2xl font-bold text-primary">
                        {companyInfo.name.charAt(0) || 'F'}
                      </div>
                    </div>
                    <p className="text-lg font-medium text-foreground">
                      {companyInfo.name}
                    </p>
                    {companyInfo.website && (
                      <p className="text-sm text-muted-foreground">
                        {companyInfo.website}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Content Slide
              <div className="flex flex-col h-full">
                {/* Slide Header */}
                <div className="border-b bg-muted/50 p-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {currentSlideData.title}
                  </h2>
                </div>

                {/* Slide Content */}
                <div className="flex-1 overflow-hidden">
                  <div className="w-full h-full overflow-y-auto p-6" data-slide-content>
                    <ReportComponent 
                      reportName={currentSlideData.title}
                      selectedForPresentation={[currentSlideData.title]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 border">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};