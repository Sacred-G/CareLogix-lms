import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define the type for the onboarding state
export type OnboardingState = {
  hasCompletedOnboarding: boolean;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  completeOnboarding: () => void;
};

export const useOnboarding = (userId?: string): OnboardingState => {
  // Track if the user has completed onboarding
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  // Control whether to show the onboarding
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

  // Load the onboarding state from local storage on component mount
  useEffect(() => {
    if (!userId) return;

    // Check local storage for onboarding completion status
    const onboardingStatus = localStorage.getItem(`onboarding_completed_${userId}`);
    
    if (onboardingStatus === 'true') {
      setHasCompletedOnboarding(true);
      setShowOnboarding(false);
    } else {
      setHasCompletedOnboarding(false);
      setShowOnboarding(true);
    }
  }, [userId]);

  // Function to mark onboarding as complete
  const completeOnboarding = async () => {
    if (!userId) return;

    try {
      // Store completion status in localStorage
      localStorage.setItem(`onboarding_completed_${userId}`, 'true');

      // Update local state
      setHasCompletedOnboarding(true);
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error in completeOnboarding:', error);
    }
  };

  return {
    hasCompletedOnboarding,
    showOnboarding,
    setShowOnboarding,
    completeOnboarding,
  };
};
