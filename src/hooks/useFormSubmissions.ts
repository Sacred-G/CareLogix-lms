import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Assuming you have an auth hook
import { saveFormSubmission, getUserFormSubmissions } from '@/lib/supabase';

export function useFormSubmissions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get the current user

  // Save a form submission to Supabase
  const submitForm = async (courseId: string, formType: string, formData: Record<string, any>) => {
    if (!user?.id) {
      setError('You must be logged in to submit forms');
      return { success: false, error: 'Not authenticated' };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await saveFormSubmission({
        userId: user.id,
        courseId,
        formType,
        formData,
      });

      if (!result.success) {
        setError('Failed to save form submission');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Get user's form submissions
  const getSubmissions = async (courseId?: string) => {
    if (!user?.id) {
      setError('You must be logged in to view submissions');
      return { success: false, error: 'Not authenticated' };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getUserFormSubmissions(user.id, courseId);
      
      if (!result.success) {
        setError('Failed to fetch form submissions');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForm,
    getSubmissions,
    isLoading,
    error,
  };
}
