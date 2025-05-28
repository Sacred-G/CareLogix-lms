import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Plus, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { allCourses } from '@/data/courses/completeDataIndex';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminRoleType } from '@/types/admin';
import { createAdminBypassClient } from '@/utils/supabaseAdmin';
import { Skeleton } from '@/components/ui/skeleton';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  email_domain?: string | null;
}

interface CourseAssignmentProps {
  profiles: Profile[] | null;
  refetchEnrollments: () => void;
  adminType: AdminRoleType | null;
  canManageUser: (userId: string) => Promise<boolean>;
}

export default function CourseAssignment({ 
  profiles, 
  refetchEnrollments,
  adminType,
  canManageUser
}: CourseAssignmentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[] | null>(profiles);
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [loadingProfiles, setLoadingProfiles] = useState(true); // Add loading state
  
  // Get unique domains from profiles
  const domains = React.useMemo(() => {
    if (!profiles) return [];
    const domainsSet = new Set<string>();
    profiles.forEach(profile => {
      if (profile.email_domain) {
        domainsSet.add(profile.email_domain);
      }
    });
    return Array.from(domainsSet);
  }, [profiles]);

  // Filter profiles based on search query and selected domain
  useEffect(() => {
    if (!profiles) {
      setFilteredProfiles(null);
      setLoadingProfiles(false); // Set loading to false if no profiles
      return;
    }

    let filtered = [...profiles];
    
    // Filter by domain if selected (and not 'all')
    if (selectedDomain && selectedDomain !== 'all') {
      filtered = filtered.filter(profile => profile.email_domain === selectedDomain);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(profile => 
        (profile.full_name && profile.full_name.toLowerCase().includes(query)) ||
        (profile.email && profile.email.toLowerCase().includes(query))
      );
    }
    
    setFilteredProfiles(filtered);
    setLoadingProfiles(false); // Set loading to false after filtering
  }, [profiles, searchQuery, selectedDomain]);

  // Handle student selection
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };

  // Handle course selection
  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId) 
        : [...prev, courseId]
    );
  };

  // Handle select all students
  const handleSelectAllStudents = () => {
    if (!filteredProfiles) return;
    
    if (selectedStudents.length === filteredProfiles.length) {
      // If all are selected, deselect all
      setSelectedStudents([]);
    } else {
      // Otherwise, select all
      setSelectedStudents(filteredProfiles.map(profile => profile.id));
    }
  };

  // Handle select all courses
  const handleSelectAllCourses = () => {
    const allCourseIds = allCourses.map(course => course.id);
    
    if (selectedCourses.length === allCourseIds.length) {
      // If all are selected, deselect all
      setSelectedCourses([]);
    } else {
      // Otherwise, select all
      setSelectedCourses(allCourseIds);
    }
  };

  // Function to assign courses to students
  const assignCourses = async () => {
    if (selectedStudents.length === 0 || selectedCourses.length === 0) {
      toast.error('Please select at least one student and one course');
      return;
    }

    setIsAssigning(true);
    setIsDialogOpen(false);

    let successCount = 0;
    let failureCount = 0;

    try {
      // Process each student-course combination individually
      for (const studentId of selectedStudents) {
        // Verify if the current admin can manage this user
        const canManage = await canManageUser(studentId);
        if (!canManage) {
          toast.error(`You don't have permission to manage some of the selected students`);
          setIsAssigning(false);
          return;
        }
        
        // Process each course for this student
        for (const courseId of selectedCourses) {
          try {
            // First check if enrollment already exists to avoid duplicates
            const { data: existingEnrollment } = await supabase
              .from('enrollments')
              .select('id')
              .eq('user_id', studentId)
              .eq('course_id', courseId)
              .maybeSingle();
              
            if (existingEnrollment) {
              // Enrollment already exists, count as success
              console.log(`Enrollment already exists for user ${studentId} and course ${courseId}`);
              successCount++;
              continue;
            }
            
            // Prepare enrollment data
            const enrollmentData = {
              user_id: studentId,
              course_id: courseId,
              progress: 0,
              completed: false,
              created_at: new Date().toISOString(),
              last_accessed: new Date().toISOString()
            };
            
            // Try multiple approaches to insert the enrollment
            let enrollmentAdded = false;

            // Try standard upsert with conflict handling
            try {
              const { error: upsertError } = await supabase
                .from('enrollments')
                .upsert(enrollmentData, {
                  onConflict: 'user_id,course_id',
                  ignoreDuplicates: true
                });
                
              if (!upsertError) {
                enrollmentAdded = true;
                successCount++;
                console.log(`Successfully assigned course ${courseId} to user ${studentId} via upsert`);
              } else {
                console.log(`Upsert error: ${upsertError.message}`);
              }
            } catch (upsertErr) {
              console.log(`Upsert exception: ${upsertErr}`);
            }
            
            // If that failed, try direct insert
            if (!enrollmentAdded) {
              try {
                const { error: insertError } = await supabase
                  .from('enrollments')
                  .insert(enrollmentData);
                  
                if (!insertError) {
                  enrollmentAdded = true;
                  successCount++;
                  console.log(`Successfully assigned course ${courseId} to user ${studentId} via insert`);
                } else {
                  console.error(`Insert error: ${insertError.message}`);
                  
                  // If we're here, the issue is likely RLS - log solution for admin
                  if (adminType === 'super_admin') {
                    console.error(`
SQL to fix Supabase RLS issue (run in SQL Editor):

-- Update RLS policy to allow admins to manage enrollments
CREATE POLICY "Allow admins to manage enrollments"
  ON public.enrollments
  FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE role IN ('super_admin', 'domain_admin')
    )
  );
                    `);
                  }
                }
              } catch (insertErr) {
                console.error(`Insert exception: ${insertErr}`);
              }
            }
            
            // If still not added, record the failure
            if (!enrollmentAdded) {
              failureCount++;
            }
          } catch (courseErr) {
            console.error(`Error processing course ${courseId} for user ${studentId}:`, courseErr);
            failureCount++;
          }
        }
      }
      
      // Show appropriate toast based on results
      if (failureCount > 0) {
        if (successCount > 0) {
          toast.warning(`Partially successful: ${successCount} enrollments created, ${failureCount} failed. Check console for details.`);
        } else {
          toast.error(`Failed to assign courses. Check console for SQL instructions to fix permissions.`);
        }
      } else if (successCount > 0) {
        toast.success(`Successfully assigned ${selectedCourses.length} courses to ${selectedStudents.length} students`);
      }
    } catch (error) {
      console.error('Error in course assignment process:', error);
      toast.error('An unexpected error occurred during course assignment');
    } finally {
      // Clear selections
      setSelectedStudents([]);
      setSelectedCourses([]);
      
      // Refresh enrollments data
      refetchEnrollments();
      
      // Reset assigning state
      setIsAssigning(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Course Assignment</CardTitle>
        <CardDescription>
          Assign courses to students
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Student selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">
                Select Students
              </label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                {domains.length > 0 && (
                  <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All domains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All domains</SelectItem>
                      {domains.map(domain => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={handleSelectAllStudents}
            >
              {selectedStudents.length === (filteredProfiles?.length || 0) ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
          
          {/* Student list */}
          <div className="border rounded-md p-2">
            <ScrollArea className="h-48">
              {loadingProfiles ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              ) : filteredProfiles && filteredProfiles.length > 0 ? (
                <div className="space-y-2">
                  {filteredProfiles.map(profile => (
                    <div key={profile.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`student-${profile.id}`}
                        checked={selectedStudents.includes(profile.id)}
                        onCheckedChange={() => toggleStudentSelection(profile.id)}
                      />
                      <Label
                        htmlFor={`student-${profile.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        {profile.full_name || 'Unnamed User'}
                        {profile.email && (
                          <span className="text-sm text-gray-500 ml-2">
                            ({profile.email})
                          </span>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-gray-500">
                  No students found
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Course selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                Select Courses
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAllCourses}
              >
                {selectedCourses.length === allCourses.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            {/* Course list */}
            <div className="border rounded-md p-2">
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {allCourses.map(course => (
                    <div key={course.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`course-${course.id}`}
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={() => toggleCourseSelection(course.id)}
                      />
                      <Label
                        htmlFor={`course-${course.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        {course.title}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          
          {/* Assignment button */}
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={selectedStudents.length === 0 || selectedCourses.length === 0 || isAssigning}
            >
              <Plus className="mr-2 h-4 w-4" />
              Assign Courses
            </Button>
          </div>
          
          {/* Confirmation dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Course Assignment</DialogTitle>
                <DialogDescription>
                  You are about to assign {selectedCourses.length} course(s) to {selectedStudents.length} student(s).
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Selected Students: {selectedStudents.length}</h3>
                  <ul className="text-sm text-gray-500 max-h-20 overflow-y-auto">
                    {selectedStudents.map(studentId => {
                      const student = profiles?.find(p => p.id === studentId);
                      return (
                        <li key={studentId}>
                          {student?.full_name || 'Unnamed User'}
                          {student?.email && ` (${student.email})`}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Selected Courses: {selectedCourses.length}</h3>
                  <ul className="text-sm text-gray-500 max-h-20 overflow-y-auto">
                    {selectedCourses.map(courseId => {
                      const course = allCourses.find(c => c.id === courseId);
                      return (
                        <li key={courseId}>
                          {course?.title || courseId}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={assignCourses} disabled={isAssigning}>
                  {isAssigning ? 'Assigning...' : 'Confirm Assignment'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
