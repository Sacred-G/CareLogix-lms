import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';

// Define onboarding steps
const getOnboardingSteps = (): Step[] => [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Welcome to CareLogix LMS!</h2>
        <p>Let's take a quick tour to help you get started with our learning platform.</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.nav-home',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Home</h2>
        <p>Access the home page to see featured courses and important announcements.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.nav-courses',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Courses</h2>
        <p>Browse and enroll in our catalog of available training courses.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.nav-dashboard',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Dashboard</h2>
        <p>Track your progress, access your enrolled courses, and view your certificates.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.nav-extras',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Extras</h2>
        <p>Access standalone interactive learning modules for additional training.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.user-profile',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Your Profile</h2>
        <p>Click here to access your profile settings, manage your account, and sign out.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Ready to Learn!</h2>
        <p>You're all set to start your learning journey. If you need help at any time, visit our Help Center.</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  }
];

const OnboardingTour: React.FC = () => {
  const { user } = useAuth();
  const { showOnboarding, setShowOnboarding, completeOnboarding } = useOnboarding(user?.id);
  
  // State to track if the tour is running
  const [run, setRun] = useState(false);
  // State to store steps
  const [steps] = useState(getOnboardingSteps);

  // Handle tour callbacks
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    // Check if the tour is finished or skipped
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      completeOnboarding();
    }
  };

  // Start the tour
  const startTour = () => {
    setRun(true);
  };

  // Show the start tour button if onboarding is needed but not currently running
  if (showOnboarding && !run) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={startTour}
          className="shadow-lg bg-gradient-primary hover:opacity-90"
        >
          Start Tour
        </Button>
      </div>
    );
  }

  // Render the Joyride component when the tour should run
  return (
    <>
      {run && (
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton
          run={run}
          scrollToFirstStep
          showProgress
          showSkipButton
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
              primaryColor: '#7366ff',
              textColor: '#343541',
              backgroundColor: '#ffffff',
              arrowColor: '#ffffff',
            },
            buttonNext: {
              backgroundColor: '#7366ff',
            },
            buttonBack: {
              color: '#7366ff',
            },
          }}
          locale={{
            last: 'Finish',
            skip: 'Skip tour',
          }}
        />
      )}
    </>
  );
};

export default OnboardingTour;
