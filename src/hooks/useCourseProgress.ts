import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PostgrestError } from '@supabase/supabase-js';
import { Course, Module } from '@/data/courseTypes';
import { courses } from '@/data/courseData';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { supabase } from '@/integrations/supabase/client'; // Import supabase client directly

interface UseCourseProgressProps {
  courseId: string;
}

interface ProgressData {
  progress: any;
  enrollment: any;
}

interface ProgressMutationVars {
  lessonId?: string;
  quizId?: string;
  completed: boolean;
  score?: number;
}

export const useCourseProgress = ({ courseId }: UseCourseProgressProps) => {
  const { user } = useAuth(); // Use user from custom AuthContext
  const queryClient = useQueryClient();

  const calculateAndSetCourseProgress = async () => {
    if (!user?.id) {
      console.warn('User not logged in, cannot calculate course progress.');
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) {
      console.warn(`Course with ID ${courseId} not found.`);
      return;
    }

    const totalModules = course.modules.length;
    if (totalModules === 0) {
      console.warn(`Course ${courseId} has no modules.`);
      return;
    }

    // Fetch all module completion records for the current user and course
    const { data: completedModules, error: progressError } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .like('lesson_id', `${courseId}:%:module_completion`)
      .eq('completed', true);

    if (progressError) {
      console.error('Error fetching completed modules:', progressError);
      return;
    }

    const completedModuleIds = new Set(completedModules.map(p => p.lesson_id.split(':')[1]));
    const actualCompletedModulesCount = course.modules.filter(module =>
      completedModuleIds.has(module.id)
    ).length;

    const newProgressPercentage = (actualCompletedModulesCount / totalModules) * 100;
    const isCourseCompleted = newProgressPercentage === 100;

    const { error: updateError } = await supabase
      .from('enrollments')
      .update({
        progress: newProgressPercentage,
        completed: isCourseCompleted,
        last_accessed_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('course_id', courseId);

    if (updateError) {
      console.error('Error updating enrollment progress:', updateError);
      toast.error(`Failed to update course progress: ${updateError.message}`);
    }
  };
  
  // Update progress mutation with proper typing
  const updateProgressMutation = useMutation<ProgressData, PostgrestError | Error, ProgressMutationVars>({
    mutationFn: async ({ lessonId, quizId, completed, score }) => {
      if (!user?.id) throw new Error('User not logged in');
      
      const targetId = lessonId || quizId;
      if (!targetId) throw new Error('Either lessonId or quizId is required');

      // Update or create progress record
      const { data: progress, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: targetId,
          completed,
          score,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        })
        .select()
        .single();

      if (error) throw error;

      // Update enrollment progress
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('progress, completed')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      if (enrollmentError) throw enrollmentError;

      // The progress and completed status for enrollments will be calculated dynamically
      // based on completed modules/lessons, not directly updated here.
      // This mutation only handles individual lesson/quiz progress.
      return { progress, enrollment };
    },
    onSuccess: async () => {
      // Invalidate relevant queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['user-progress', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['enrollment-status', courseId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['course-modules', courseId] });
      await calculateAndSetCourseProgress(); // Recalculate and update overall course progress
    },
    onError: (error: Error) => {
      console.error('Error updating progress:', error);
      toast.error(`Failed to save progress: ${error.message}`);
    }
  });


  // Handle content completion
  const handleContentComplete = async (lessonId: string, completed: boolean = true): Promise<boolean> => {
    if (!user?.id) {
      toast.error('Please sign in to save your progress');
      return false;
    }
    
    try {
      // First check if progress already exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('id, completed')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (!existingProgress || !existingProgress.completed) {
        await updateProgressMutation.mutateAsync({
          lessonId,
          completed: true
        });
        toast.success('Progress saved!');
        return true;
      } else {
        toast('Already completed', { description: 'You\'ve already completed this content.' });
        return true; // Already completed counts as success
      }
    } catch (error) {
      console.error('Error in handleContentComplete:', error);
      toast.error('Failed to save progress');
      return false;
    }
  };

  // Handle quiz completion
  const handleQuizComplete = async (quizId: string, score: number): Promise<boolean> => {
    if (!user?.id) {
      toast.error('Please sign in to save your quiz result');
      return false;
    }

    const isPassing = score >= 70;

    try {
      // First check if quiz progress already exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('id, completed, score')
        .eq('user_id', user.id)
        .eq('lesson_id', quizId)
        .maybeSingle();

      // Only update if no progress exists or if this is a better score
      if (!existingProgress || !existingProgress.completed || 
          (existingProgress.score !== null && existingProgress.score < score)) {
        await updateProgressMutation.mutateAsync({
          quizId,
          completed: isPassing,
          score
        });

        // Show appropriate toast
        if (isPassing) {
          toast.success('Quiz passed!', { description: `You scored ${score}%. Great job!` });
        } else {
          toast.warning('Quiz not passed', { 
            description: `You scored ${score}%. You need 70% to pass. Try again!` 
          });
        }
        return isPassing;
      } else {
        toast('Quiz already completed', { 
          description: `You've already completed this quiz with a score of ${existingProgress.score || 0}%.` 
        });
        return existingProgress.score >= 70;
      }
    } catch (error) {
      console.error('Error in handleQuizComplete:', error);
      toast.error('Failed to save quiz result');
      throw error;
    }
  };

  return {
    updateProgress: updateProgressMutation.mutate,
    handleContentComplete: handleContentComplete as (lessonId: string, completed?: boolean) => Promise<boolean>,
    handleQuizComplete: handleQuizComplete as (quizId: string, score: number) => Promise<boolean>,
    isUpdating: updateProgressMutation.isPending
  };
};
