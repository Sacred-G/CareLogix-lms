
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/courses/CourseCard';
import CertificatesList from '@/components/dashboard/CertificatesList';
import { Award, BookOpen, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Course } from '@/data/courseTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { courses as staticCourses } from '@/data/courseData';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Fetch user enrollments
  const { data: enrollments, isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ['user-enrollments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          progress,
          completed,
          course_id,
          courses:course_id (
            id,
            title,
            description,
            thumbnail,
            domain
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching enrollments:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user
  });
  
  // Fetch certificates
  const { data: certificates, isLoading: isLoadingCertificates } = useQuery({
    queryKey: ['user-certificates', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('issue_date', { ascending: false });
        
      if (error) {
        console.error('Error fetching certificates:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user
  });
  
  // Map enrolled database courses to the Course type
  const mapDatabaseCourse = (enrollment: any): Course => {
    const dbCourse = enrollment.courses;
    if (!dbCourse) {
      // Find the course in static courses
      const staticCourse = staticCourses.find(c => c.id === enrollment.course_id);
      return staticCourse || {
        id: enrollment.course_id,
        title: 'Unknown Course',
        description: '',
        category: 'General',
        instructor: '',
        thumbnail: '',
        duration: '',
        modules: []
      };
    }
    
    return {
      id: dbCourse.id,
      title: dbCourse.title || 'Untitled Course',
      description: dbCourse.description || '',
      category: dbCourse.domain || 'General',
      instructor: 'Course Instructor',
      thumbnail: dbCourse.thumbnail || 'https://placehold.co/600x400/png',
      duration: 'Self-paced',
      modules: [],
      domain: dbCourse.domain
    };
  };
  
  // Process enrollments into courses with progress
  const inProgressCourses = enrollments && !isLoadingEnrollments
    ? enrollments
        .filter(enrollment => !enrollment.completed)
        .map(enrollment => ({
          ...mapDatabaseCourse(enrollment),
          progress: enrollment.progress || 0
        }))
    : [];
    
  const completedCourses = enrollments && !isLoadingEnrollments
    ? enrollments
        .filter(enrollment => enrollment.completed)
        .map(enrollment => ({
          ...mapDatabaseCourse(enrollment),
          progress: 100
        }))
    : [];
  
  // Get recommended courses by excluding enrolled courses
  const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];
  
  const recommendedCourses = staticCourses
    .filter(course => !enrolledCourseIds.includes(course.id))
    .slice(0, 3);
  
  // Calculate stats
  const totalEnrollments = enrollments?.length || 0;
  const completedCount = completedCourses.length;
  const inProgressCount = inProgressCourses.length;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Dashboard Header */}
        <section className="bg-gradient-to-r from-primary/20 to-secondary/20 py-8 border-b border-border">
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and continue your courses</p>
          </div>
        </section>
        
        {/* Stats Overview */}
        <section className="py-8 bg-card/50">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoadingEnrollments ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="shadow-md bg-card border-muted">
                      <CardHeader className="pb-2 border-b border-border">
                        <Skeleton className="h-8 w-40" />
                      </CardHeader>
                      <CardContent className="pt-4">
                        <Skeleton className="h-6 w-20 mb-2" />
                        <Skeleton className="h-2 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <Card className="shadow-md bg-card border-muted">
                    <CardHeader className="pb-2 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-base font-medium text-foreground">Total Progress</h3>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-foreground">
                          {totalEnrollments === 0 ? 0 : 
                           Math.round((completedCount / totalEnrollments) * 100)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {completedCount} of {totalEnrollments} courses
                        </div>
                      </div>
                      <Progress 
                        value={totalEnrollments === 0 ? 0 : 
                              (completedCount / totalEnrollments) * 100} 
                        className="h-2 bg-muted" 
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md bg-card border-muted">
                    <CardHeader className="pb-2 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-500/10 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-base font-medium text-foreground">Courses in Progress</h3>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-foreground">{inProgressCount}</div>
                      {inProgressCount > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">Continue where you left off</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md bg-card border-muted">
                    <CardHeader className="pb-2 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500/10 p-2 rounded-full">
                          <BookOpen className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="text-base font-medium text-foreground">Completed Courses</h3>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-foreground">{completedCount}</div>
                      {completedCount > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">Great work!</p>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Course Progress */}
        <section className="py-8">
          <div className="container px-4">
            <Tabs defaultValue="in-progress" className="space-y-8">
              <TabsList className="bg-muted text-muted-foreground">
                <TabsTrigger value="in-progress" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white">In Progress</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white">Completed</TabsTrigger>
                <TabsTrigger value="recommended" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white">Recommended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-progress" className="space-y-8">
                {isLoadingEnrollments ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-64 w-full rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inProgressCourses.length > 0 ? (
                      inProgressCourses.map((course) => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          progress={course.progress} 
                        />
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-12 bg-card/30 rounded-lg border border-border">
                        <h3 className="text-xl font-medium mb-2 text-foreground">No courses in progress</h3>
                        <p className="text-muted-foreground mb-6">Start learning by enrolling in a course!</p>
                        <Link to="/courses" className="text-primary font-medium hover:underline">
                          Browse courses
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-8">
                {isLoadingEnrollments ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-64 w-full rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedCourses.length > 0 ? (
                      completedCourses.map((course) => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          progress={100} 
                        />
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-12 bg-card/30 rounded-lg border border-border">
                        <h3 className="text-xl font-medium mb-2 text-foreground">No completed courses yet</h3>
                        <p className="text-muted-foreground mb-6">Keep learning to complete your first course!</p>
                        <Link to="/courses" className="text-primary font-medium hover:underline">
                          Continue learning
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recommended" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      progress={0} 
                    />
                  ))}
                  {recommendedCourses.length === 0 && (
                    <div className="col-span-3 text-center py-12 bg-card/30 rounded-lg border border-border">
                      <h3 className="text-xl font-medium mb-2 text-foreground">You've enrolled in all available courses!</h3>
                      <p className="text-muted-foreground mb-6">Check back later for new course offerings.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Certificates Section */}
        <section className="py-8 bg-card/50 border-t border-border">
          <div className="container px-4">
            <CertificatesList 
              certificates={certificates || []} 
              loading={isLoadingCertificates}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
