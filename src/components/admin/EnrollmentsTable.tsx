import React, { useState, useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { createCertificate, saveCertificate } from '@/services/certificateService';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ChevronDown, ChevronRight, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type EnrollmentItem = NonNullable<EnrollmentsTableProps['enrollments']>[number];

interface Enrollment {
  id: string;
  progress: number | null;
  completed: boolean;
  profiles: {
    full_name: string | null;
  } | null;
  full_name: string | null;
  courses: {
    id: string;
    title: string | null;
    description: string;
    category: string;
    instructor: string;
    thumbnail: string;
    duration: string;
    certificateAvailable?: boolean;
  } | null;
  title: string | null;
  certificate_issued?: boolean;
  [key: string]: any;
}

interface EnrollmentsTableProps {
  enrollments: (Enrollment & {
    profile: {
      email: string;
      full_name: string | null;
    } | null;
    course: {
      id: string;
      title: string | null;
      description: string;
      category: string;
      instructor: string;
      thumbnail: string;
      duration: string;
      certificateAvailable: boolean;
    } | null;
    completed: boolean;
    user_id: string;
  })[] | null;
  loadingEnrollments: boolean;
  refetchEnrollments?: () => void;
}

interface GroupedEnrollments {
  userId: string;
  userName: string;
  userEmail: string;
  enrollments: EnrollmentItem[];
  completedCount: number;
  totalCount: number;
}

export default function EnrollmentsTable({ 
  enrollments, 
  loadingEnrollments,
  refetchEnrollments 
}: EnrollmentsTableProps) {
  console.log('Enrollments data:', enrollments);
  const { toast } = useToast();
  const { user } = useAuth();
  const [loadingCertificates, setLoadingCertificates] = useState<Record<string, boolean>>({});
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  // Group enrollments by user and filter by current user's domain
  const groupedEnrollments = useMemo((): GroupedEnrollments[] => {
    if (!enrollments || !user?.email) return [];
    
    // Get current user's domain
    const currentUserDomain = user.email.split('@')[1];
    
    // Filter enrollments by domain first
    const domainFilteredEnrollments = enrollments.filter(enrollment => {
      const userDomain = enrollment.profile?.email?.split('@')[1];
      return userDomain === currentUserDomain;
    });
    
    // Group by user
    const groupedMap = new Map<string, GroupedEnrollments>();
    
    domainFilteredEnrollments.forEach(enrollment => {
      const userId = enrollment.user_id;
      const userName = enrollment.profile?.full_name || 'Unknown User';
      const userEmail = enrollment.profile?.email || '';
      
      if (!groupedMap.has(userId)) {
        groupedMap.set(userId, {
          userId,
          userName,
          userEmail,
          enrollments: [],
          completedCount: 0,
          totalCount: 0
        });
      }
      
      const group = groupedMap.get(userId)!;
      group.enrollments.push(enrollment);
      group.totalCount++;
      if (enrollment.completed) {
        group.completedCount++;
      }
    });
    
    // Sort by user name
    return Array.from(groupedMap.values()).sort((a, b) => 
      a.userName.localeCompare(b.userName)
    );
  }, [enrollments, user?.email]);

  const handleIssueCertificate = async (enrollment: EnrollmentItem) => {
    if (!enrollment.profile?.email || !enrollment.course || !enrollment.user_id) {
      console.error('Cannot issue certificate: Missing required data. Enrollment details:', {
        hasProfile: !!enrollment.profile,
        hasProfileEmail: !!enrollment.profile?.email,
        hasCourse: !!enrollment.course,
        hasUserId: !!enrollment.user_id,
        enrollmentId: enrollment.id,
      });
      toast({
        title: 'Information Missing for Certificate',
        description: 'Cannot issue certificate: Missing required student, course, or user information. Please check enrollment data.',
        variant: 'default',
      });
      return;
    }

    setLoadingCertificates(prev => ({ ...prev, [enrollment.id]: true }));

    try {
      const certificate = createCertificate(
        enrollment.user_id,
        enrollment.profile.full_name || 'Student',
        {
          id: enrollment.course.id,
          title: enrollment.course.title || 'Course',
          description: enrollment.course.description || '',
          category: enrollment.course.category || '',
          instructor: enrollment.course.instructor || '',
          thumbnail: enrollment.course.thumbnail || '',
          duration: enrollment.course.duration || '',
          modules: [],
          certificateAvailable: enrollment.course.certificateAvailable || false
        },
        enrollment.profile.email
      );
      
      await saveCertificate(certificate);
      
      toast({
        title: 'Certificate Issued Successfully',
        description: `Certificate issued for ${enrollment.profile.full_name || 'student'} in ${enrollment.course.title || 'course'}.`,
        variant: 'default',
      });
      
      // Refresh data if refetch function is available
      if (refetchEnrollments) {
        refetchEnrollments();
      }
    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast({
        title: 'Error Issuing Certificate',
        description: error instanceof Error ? error.message : 'Failed to issue certificate. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingCertificates(prev => ({ ...prev, [enrollment.id]: false }));
    }
  };

  const toggleUserExpansion = (userId: string) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  if (loadingEnrollments) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <CardTitle>Student Enrollments</CardTitle>
          </div>
          <CardDescription>Loading enrollments...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!groupedEnrollments || groupedEnrollments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <CardTitle>Student Enrollments</CardTitle>
          </div>
          <CardDescription>No enrollments found for your domain</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            No students are currently enrolled in courses from your organization.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalStudents = groupedEnrollments.length;
  const totalEnrollments = groupedEnrollments.reduce((sum, group) => sum + group.totalCount, 0);
  const totalCompleted = groupedEnrollments.reduce((sum, group) => sum + group.completedCount, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <CardTitle>Student Enrollments</CardTitle>
          </div>
          <div className="text-sm text-gray-600 space-x-4">
            <span>{totalStudents} Students</span>
            <span>{totalEnrollments} Enrollments</span>
            <span>{totalCompleted} Completed</span>
          </div>
        </div>
        <CardDescription>
          Students grouped by name from your organization domain. Click to expand and view individual enrollments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {groupedEnrollments.map((group) => (
            <Collapsible key={group.userId}>
              <CollapsibleTrigger asChild>
                <div 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => toggleUserExpansion(group.userId)}
                >
                  <div className="flex items-center space-x-3">
                    {expandedUsers.has(group.userId) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <div>
                      <div className="font-medium">{group.userName}</div>
                      <div className="text-sm text-gray-500">{group.userEmail}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {group.totalCount} courses
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {group.completedCount} completed
                    </span>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 ml-7 mr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.enrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img 
                                src={enrollment.course?.thumbnail || 'https://placehold.co/40x30/png'} 
                                alt={enrollment.course?.title || 'Course'}
                                className="w-10 h-8 object-cover rounded"
                              />
                              <div>
                                <div className="font-medium">{enrollment.course?.title || 'Unknown Course'}</div>
                                <div className="text-sm text-gray-500">{enrollment.course?.category || 'General'}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress value={enrollment.progress || 0} className="w-20" />
                              <span className="text-xs text-gray-500">{enrollment.progress || 0}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              enrollment.completed 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {enrollment.completed ? 'Completed' : 'In Progress'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {enrollment.completed && enrollment.course?.certificateAvailable && (
                              <Button
                                size="sm"
                                onClick={() => handleIssueCertificate(enrollment)}
                                disabled={loadingCertificates[enrollment.id]}
                                variant="outline"
                              >
                                {loadingCertificates[enrollment.id] && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Issue Certificate
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
