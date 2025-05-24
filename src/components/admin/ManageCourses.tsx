
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CourseModuleEditor } from './CourseModuleEditor';
import { useAuth } from '@/hooks/useAuth';

export default function ManageCourses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!user
  });

  const { data: courses, isLoading } = useQuery({
    queryKey: ['admin-courses', userProfile?.email_domain],
    queryFn: async () => {
      if (!userProfile) return [];
      
      console.log('Fetching courses for domain:', userProfile.email_domain);
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
      
      console.log('Fetched courses:', data);
      return data || [];
    },
    enabled: !!userProfile
  });

  const deleteCourse = useMutation({
    mutationFn: async (courseId: string) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);
      
      if (error) throw error;
      return courseId;
    },
    onSuccess: (courseId) => {
      toast.success('Course deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      queryClient.invalidateQueries({ queryKey: ['admin-course-stats'] });
    },
    onError: (error) => {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course: You can only delete courses for your domain');
    }
  });

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      deleteCourse.mutate(courseId);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Courses</CardTitle>
          <CardDescription>
            View, edit and delete existing courses for your organization
            {userProfile?.email_domain && (
              <span className="block text-sm font-medium mt-1">
                Domain: {userProfile.email_domain}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || isLoadingProfile ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell className="truncate max-w-md">
                        {course.description?.substring(0, 100) || 'No description'}{course.description?.length > 100 ? '...' : ''}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCourse(course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      {userProfile ? 
                        `No courses found for domain ${userProfile.email_domain}. Create your first course to get started.` :
                        'Loading profile information...'
                      }
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedCourse && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Course: {selectedCourse.title}</DialogTitle>
              <DialogDescription>
                Modify course details, add modules and content
              </DialogDescription>
            </DialogHeader>
            <CourseModuleEditor 
              courseId={selectedCourse.id} 
              onClose={() => setIsEditModalOpen(false)}
              domain={userProfile?.email_domain}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
