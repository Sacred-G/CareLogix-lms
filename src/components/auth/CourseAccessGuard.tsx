import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useCourseAccess } from '@/hooks/useCourseAccess';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface CourseAccessGuardProps {
  children: React.ReactNode;
}

/**
 * Component that guards course access
 * Only allows access if:
 * 1. User is an admin
 * 2. User is enrolled in the course
 */
export const CourseAccessGuard: React.FC<CourseAccessGuardProps> = ({ children }) => {
  const { courseId = '' } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { isAdmin, checkCourseAccess } = useCourseAccess();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setIsChecking(false);
        return;
      }

      try {
        // Check if user has access to this course
        const access = await checkCourseAccess(courseId);
        setHasAccess(access);
      } catch (error) {
        console.error('Error checking course access:', error);
        setHasAccess(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAccess();
  }, [user, courseId, checkCourseAccess, isAdmin]);

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-lg">Checking course access...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <Navigate 
        to="/dashboard" 
        replace 
        state={{ 
          accessDenied: true, 
          message: "You don't have access to this course. Please contact your system administrator to request access." 
        }} 
      />
    );
  }

  return <>{children}</>;
};

export default CourseAccessGuard;
