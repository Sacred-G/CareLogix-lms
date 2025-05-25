import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding.tsx';
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

const TOUR_COMPLETED_KEY_PREFIX = 'hasCompletedFirstTour_';

const OnboardingTour: React.FC = () => {
  const { user } = useAuth();
  const { showOnboarding, setShowOnboarding, completeOnboarding } = useOnboarding(user?.id);
  
  // State to track if the tour is running
  const [run, setRun] = useState(false);
  // State to store steps
  const [steps] = useState(getOnboardingSteps);

  useEffect(() => {
    if (user && user.id) {
      const userTourKey = `${TOUR_COMPLETED_KEY_PREFIX}${user.id}`;
      const hasCompleted = localStorage.getItem(userTourKey);

      // If tour hasn't been completed by this user and is not already running,
      // and the useOnboarding hook also thinks it should be shown.
      if (!hasCompleted && !run && showOnboarding) {
        // console.log("Attempting to auto-start tour for user:", user.id); // For debugging
        startTour();
      }
    } else {
      // User logged out, ensure tour is not running
      if (run) {
        setRun(false);
      }
    }
  }, [user, run, showOnboarding]); // Dependencies for the effect

  // Handle tour callbacks
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      if (user && user.id) {
        const userTourKey = `${TOUR_COMPLETED_KEY_PREFIX}${user.id}`;
        localStorage.setItem(userTourKey, 'true');
        // console.log("Tour completed/skipped, localStorage set for user:", user.id); // For debugging
      }
      completeOnboarding(); // Call the original hook's completion logic
    }
  };

  // Start the tour
  const startTour = () => {
    setRun(true);
  };

  // Show the start tour button only if user is logged in, 
  // onboarding is needed (according to the hook), and tour is not currently running.
  // The localStorage check in useEffect handles the "first time" auto-start.
  // The button respects the showOnboarding flag from the hook for manual re-trigger if desired.
  if (user && showOnboarding && !run) {
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
