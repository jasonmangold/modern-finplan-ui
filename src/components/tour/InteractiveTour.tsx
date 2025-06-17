
import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step, EVENTS, ACTIONS } from 'react-joyride';
import { useLocation, useNavigate } from 'react-router-dom';

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
        <p>Let's take an interactive tour. You'll click on highlighted elements as we guide you through the software.</p>
        <p className="mt-2 text-sm text-gray-600">Click "Next" to begin!</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="analysis-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Click on Analysis Tab</h3>
        <p>Start by clicking on the "Analysis" tab in the navigation. This is where you'll build comprehensive plans for your clients.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: false,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="comprehensive-mode"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Click on Comprehensive Input</h3>
        <p>Now click on "Comprehensive Input" mode. This is perfect when you prefer inputting all client data at once.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: false,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="goals-based-mode"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Try Goals-Based Planning</h3>
        <p>Click on "Goals-Based Planning" to see the alternative approach. This mode is ideal for focusing on specific client goals.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: false,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="financial-goals"] .grid > div:first-child',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Click a Financial Goal</h3>
        <p>Click on any goal card to see how goal-specific analysis works. Each goal has tailored inputs and outputs.</p>
      </div>
    ),
    placement: 'top',
    disableBeacon: false,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="education-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Click Education Tab</h3>
        <p>Click on "Education" to explore over 600 educational reports for your client presentations.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: false,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="calculators-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Click Calculators Tab</h3>
        <p>Click on "Calculators" to access over 80 easy-to-use calculators for quick scenarios.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: false,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="presentation-nav"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Click Presentation Tab</h3>
        <p>Finally, click on "Presentation" where you'll organize and customize your client presentations.</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: false,
    spotlightClicks: true,
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Tour Complete!</h3>
        <p>Great job! You've experienced the interactive workflow of eAdvisys. You can restart this tour anytime from the help menu.</p>
        <p className="mt-2 text-sm text-blue-600">Start exploring on your own!</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
];

export const InteractiveTour = ({ isOpen, onClose }: InteractiveTourProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Start tour when isOpen becomes true
  useEffect(() => {
    if (isOpen) {
      setRun(true);
      setStepIndex(0);
      // Start from home page
      if (location.pathname !== '/home') {
        navigate('/home');
      }
    } else {
      setRun(false);
    }
  }, [isOpen, navigate, location.pathname]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action } = data;

    console.log('Tour callback:', { status, type, index, action });

    // Handle tour completion or skip
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      onClose();
      localStorage.setItem('tour-completed', 'true');
      setRun(false);
      return;
    }

    // Handle target not found - wait and retry
    if (type === EVENTS.TARGET_NOT_FOUND) {
      console.log('Target not found, waiting...');
      // Give page time to load and retry
      setTimeout(() => {
        setStepIndex(index);
      }, 500);
      return;
    }

    // Handle user clicking on beacon/target
    if (type === EVENTS.BEACON || (type === EVENTS.TOOLTIP && action === ACTIONS.CLOSE)) {
      const nextIndex = index + 1;
      
      // Special handling for specific steps that require navigation
      if (index === 1 && action === ACTIONS.CLOSE) {
        // User clicked Analysis tab, navigate there
        navigate('/analysis');
        setTimeout(() => setStepIndex(nextIndex), 300);
      } else if (index === 5 && action === ACTIONS.CLOSE) {
        // User clicked Education tab, navigate there
        navigate('/education');
        setTimeout(() => setStepIndex(nextIndex), 300);
      } else if (index === 6 && action === ACTIONS.CLOSE) {
        // User clicked Calculators tab, navigate there
        navigate('/calculators');
        setTimeout(() => setStepIndex(nextIndex), 300);
      } else if (index === 7 && action === ACTIONS.CLOSE) {
        // User clicked Presentation tab, navigate there
        navigate('/presentation');
        setTimeout(() => setStepIndex(nextIndex), 300);
      } else {
        setStepIndex(nextIndex);
      }
    }

    // Handle regular next/back button clicks
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
      setStepIndex(index + 1);
    } else if (type === EVENTS.STEP_AFTER && action === ACTIONS.PREV) {
      setStepIndex(index - 1);
    }
  };

  return (
    <Joyride
      steps={tourSteps}
      run={run}
      continuous={false}
      showProgress={true}
      showSkipButton={true}
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0066cc',
          textColor: '#333',
          backgroundColor: '#fff',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          spotlightShadow: '0 0 20px rgba(0, 102, 204, 0.8)',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: '12px',
          fontSize: '14px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
        tooltipContent: {
          padding: '0',
        },
        buttonNext: {
          backgroundColor: '#0066cc',
          fontSize: '14px',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'medium',
        },
        buttonBack: {
          color: '#666',
          fontSize: '14px',
          padding: '10px 20px',
        },
        buttonSkip: {
          color: '#666',
          fontSize: '14px',
          padding: '10px 20px',
        },
        beacon: {
          backgroundColor: '#0066cc',
          animation: 'joyride-beacon 1.5s infinite',
        },
        beaconInner: {
          backgroundColor: '#0066cc',
        },
        spotlight: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
        },
      }}
      locale={{
        back: 'Previous',
        close: 'Got it!',
        last: 'Finish Tour',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};
