
import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useLocation } from 'react-router-dom';

interface InteractiveTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Welcome to eAdvisys!</h3>
        <p>Let's take a quick tour to show you how to get the most out of your financial planning software.</p>
      </div>
    ),
    placement: 'center',
  },
  {
    target: '[data-tour="home-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Home Tab</h3>
        <p>Resources all in one spot - from training materials to your favorite reports. This is your dashboard for quick access to everything you need.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="analysis-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Analysis Tab</h3>
        <p>Build comprehensive plans for your clients. Choose between two powerful modes depending on your workflow.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="comprehensive-mode"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Comprehensive Input Mode</h3>
        <p>Perfect if you prefer inputting all client data at once or just want a dedicated space to input data without worrying about outputs.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="goals-based-mode"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Goals-Based Planning</h3>
        <p>Ideal when you want to build an analysis for one specific topic. Let's explore how this works...</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="financial-goals"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Financial Goals</h3>
        <p>Click any financial goal card to start building your analysis. Each goal has specialized inputs and outputs.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="input-panel"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Input Panel</h3>
        <p>Make your inputs on the left using the various tabs. Each goal has specific input fields tailored to that analysis type.</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-tour="output-panel"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Output Panel & Reports</h3>
        <p>See the analysis output on the right. Use the View dropdown to see different report options, then check the reports you want to add to your client presentation.</p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="education-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Education Tab</h3>
        <p>Access over 600 educational reports that you can also include in your client presentations. A comprehensive knowledge base at your fingertips.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="calculators-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Calculators Tab</h3>
        <p>Utilize over 80 easy-to-use calculators for quick calculations and client scenarios.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="presentation-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Presentation Tab</h3>
        <p>All done? View the reports you've added, remove any you don't want, change the order by dragging and dropping, customize in Presentation Options, and finally click Preview Presentation to see your final client presentation.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">You're All Set!</h3>
        <p>You now know the basics of eAdvisys. Start by exploring the Home tab or jump right into creating your first client analysis. You can restart this tour anytime from the help menu.</p>
      </div>
    ),
    placement: 'center',
  },
];

export const InteractiveTour = ({ isOpen, onClose }: InteractiveTourProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const location = useLocation();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      onClose();
      localStorage.setItem('tour-completed', 'true');
    }

    if (type === 'step:after') {
      setStepIndex(index + 1);
    }
  };

  // Navigate to appropriate routes during tour
  useEffect(() => {
    if (!isOpen) return;

    const handleNavigation = () => {
      switch (stepIndex) {
        case 2: // Analysis tab step
          if (location.pathname !== '/analysis') {
            window.location.href = '/analysis';
          }
          break;
        case 8: // Education tab step  
          if (location.pathname !== '/education') {
            window.location.href = '/education';
          }
          break;
        case 9: // Calculators tab step
          if (location.pathname !== '/calculators') {
            window.location.href = '/calculators';
          }
          break;
        case 10: // Presentation tab step
          if (location.pathname !== '/presentation') {
            window.location.href = '/presentation';
          }
          break;
        default:
          if (location.pathname !== '/home' && stepIndex < 8) {
            window.location.href = '/home';
          }
      }
    };

    const timeout = setTimeout(handleNavigation, 500);
    return () => clearTimeout(timeout);
  }, [stepIndex, isOpen, location.pathname]);

  return (
    <Joyride
      steps={tourSteps}
      run={isOpen}
      continuous
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0066cc',
          textColor: '#333',
          backgroundColor: '#fff',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
          spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: '8px',
          fontSize: '14px',
          padding: '20px',
        },
        tooltipContent: {
          padding: '0',
        },
        buttonNext: {
          backgroundColor: '#0066cc',
          fontSize: '14px',
          padding: '8px 16px',
          borderRadius: '6px',
        },
        buttonBack: {
          color: '#666',
          fontSize: '14px',
          padding: '8px 16px',
        },
        buttonSkip: {
          color: '#666',
          fontSize: '14px',
          padding: '8px 16px',
        },
      }}
      locale={{
        back: 'Previous',
        close: 'Close',
        last: 'Finish Tour',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};
