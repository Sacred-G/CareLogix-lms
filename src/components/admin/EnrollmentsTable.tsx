
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { createCertificate, saveCertificate } from '@/services/certificateService';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

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
  })[] | null;
  loadingEnrollments: boolean;
  refetchEnrollments?: () => void;
}

export default function EnrollmentsTable({ 
  enrollments, 
  loadingEnrollments,
  refetchEnrollments 
}: EnrollmentsTableProps) {
  console.log('Enrollments data:', enrollments);
  const { toast } = useToast();
  const [loadingCertificates, setLoadingCertificates] = useState<Record<string, boolean>>({});

  const handleIssueCertificate = async (enrollment: any) => {
    if (!enrollment.profile?.email || !enrollment.course) return;
    
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
      
      const result = await saveCertificate(certificate);
      
      if (result.success) {
        toast({
          title: 'Certificate Issued',
          description: `Certificate successfully issued for ${enrollment.profiles.full_name || 'student'}`,
          variant: 'default'
        });
        
        // Refresh the enrollments data
        if (refetchEnrollments) {
          refetchEnrollments();
        }
      } else {
        throw new Error('Failed to save certificate');
      }
    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast({
        title: 'Error',
        description: 'Failed to issue certificate. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoadingCertificates(prev => ({ ...prev, [enrollment.id]: false }));
    }
  };
  // Debug: Log enrollments data
  React.useEffect(() => {
    if (enrollments && enrollments.length > 0) {
      console.log('Enrollments data:', enrollments);
      enrollments.forEach((enrollment, index) => {
        console.log(`Enrollment ${index + 1}:`, {
          id: enrollment.id,
          completed: enrollment.completed,
          hasProfile: !!enrollment.profile,
          hasCourse: !!enrollment.course,
          profile: enrollment.profile,
          course: enrollment.course ? {
            id: enrollment.course.id,
            title: enrollment.course.title,
            certificateAvailable: enrollment.course.certificateAvailable
          } : null
        });
      });
    }
  }, [enrollments]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>All course enrollments and student progress</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {enrollments?.length || 0} enrollments
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loadingEnrollments ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Certificate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments && enrollments.length > 0 ? (
                enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.profiles?.full_name || 'N/A'}
                    </TableCell>
                    <TableCell>{enrollment.courses?.title || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={enrollment.progress || 0} className="h-2 w-40" />
                        <span className="text-sm">{enrollment.progress || 0}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {enrollment.completed ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            In Progress
                          </span>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {enrollment.courses?.certificateAvailable ? 'Certificate available' : 'No certificate'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {enrollment.completed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleIssueCertificate(enrollment)}
                          disabled={loadingCertificates[enrollment.id] || enrollment.certificate_issued}
                        >
                          {loadingCertificates[enrollment.id] ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Issuing...
                            </>
                          ) : enrollment.certificate_issued ? (
                            'Issued'
                          ) : (
                            'Issue Certificate'
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No enrollments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
