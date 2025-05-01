import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, UserIcon, BookOpen, Award } from 'lucide-react';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch all profiles (admin access)
  const { data: profiles, isLoading: loadingProfiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name');
      
      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Fetch all enrollments with course info
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ['admin-enrollments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles:user_id(id, full_name, email),
          courses:course_id(id, title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching enrollments:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Fetch course completion statistics
  const { data: courseStats, isLoading: loadingStats } = useQuery({
    queryKey: ['admin-course-stats'],
    queryFn: async () => {
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('id, title');
      
      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
        throw coursesError;
      }
      
      const stats = await Promise.all(courses.map(async (course) => {
        // Fix: Get the actual count from the response data
        const { count: enrollmentCount, error: countError } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', course.id);
        
        const { count: completedCount, error: completedError } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', course.id)
          .eq('completed', true);
        
        if (countError || completedError) {
          console.error('Error fetching course stats:', countError || completedError);
          return {
            id: course.id,
            title: course.title,
            totalEnrollments: 0,
            completedEnrollments: 0
          };
        }
        
        return {
          id: course.id,
          title: course.title,
          totalEnrollments: enrollmentCount || 0,
          completedEnrollments: completedCount || 0
        };
      }));
      
      return stats;
    }
  });

  // Filter profiles based on search query
  const filteredProfiles = profiles?.filter(profile => 
    profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get overall stats
  const totalStudents = profiles?.length || 0;
  const totalEnrollments = enrollments?.length || 0;
  const totalCompletions = enrollments?.filter(e => e.completed)?.length || 0;

  return (
    <AdminRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-muted/30 py-8">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Track and manage student progress across all courses</p>
              </div>
            </div>
            
            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    <span>Total Students</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingProfiles ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <div className="text-3xl font-bold">{totalStudents}</div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Active Enrollments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingEnrollments ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <div className="text-3xl font-bold">{totalEnrollments}</div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span>Course Completions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingEnrollments ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <div className="text-3xl font-bold">{totalCompletions}</div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-6 max-w-md">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="courses">Course Stats</TabsTrigger>
                <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
              </TabsList>
              
              {/* Students Tab */}
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Directory</CardTitle>
                    <CardDescription>All registered students in the system</CardDescription>
                    <div className="relative mt-2">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or email..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {loadingProfiles ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Courses</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProfiles && filteredProfiles.length > 0 ? (
                            filteredProfiles.map((profile) => (
                              <TableRow key={profile.id}>
                                <TableCell className="font-medium">{profile.full_name || 'N/A'}</TableCell>
                                <TableCell>{profile.email || 'N/A'}</TableCell>
                                <TableCell>{profile.role || 'student'}</TableCell>
                                <TableCell>
                                  {enrollments ? 
                                    enrollments.filter(e => e.user_id === profile.id).length : 
                                    'Loading...'}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-4">
                                {searchQuery ? 'No matching students found' : 'No students registered yet'}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Course Stats Tab */}
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>Enrollment and completion statistics by course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingStats ? (
                      <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ) : courseStats && courseStats.length > 0 ? (
                      <div className="space-y-6">
                        {courseStats.map((course) => (
                          <div key={course.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{course.title}</h3>
                                <div className="flex items-center text-sm text-muted-foreground gap-4">
                                  <span>{course.totalEnrollments} enrollments</span>
                                  <span>{course.completedEnrollments} completions</span>
                                </div>
                              </div>
                              <div className="text-sm font-medium">
                                {course.totalEnrollments > 0 
                                  ? Math.round((course.completedEnrollments / course.totalEnrollments) * 100) 
                                  : 0}%
                              </div>
                            </div>
                            <Progress 
                              value={course.totalEnrollments > 0 
                                ? (course.completedEnrollments / course.totalEnrollments) * 100 
                                : 0} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No course data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Enrollments Tab */}
              <TabsContent value="enrollments">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Enrollments</CardTitle>
                    <CardDescription>All course enrollments and student progress</CardDescription>
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
                                  {enrollment.completed ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Completed
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      In Progress
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-4">
                                No enrollments found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </AdminRoute>
  );
}
