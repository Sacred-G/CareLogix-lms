
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/data/courseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/courses/CourseCard';
import CertificatesList from '@/components/dashboard/CertificatesList';
import { Award, BookOpen, Clock } from 'lucide-react';

const Dashboard = () => {
  // Mock user progress data
  const userProgress = {
    completedCourses: 1,
    inProgressCourses: 2,
    totalCourses: courses.length,
    courseProgress: {
      'intro-dev-disabilities': 75,
      'client-rights': 30,
      'medication-admin': 0,
      'communication-empathy': 0
    }
  };
  
  const inProgressCourses = courses.filter(course => 
    userProgress.courseProgress[course.id] > 0 && userProgress.courseProgress[course.id] < 100
  );
  
  const completedCourses = courses.filter(course => 
    userProgress.courseProgress[course.id] === 100
  );
  
  const recommendedCourses = courses.filter(course => 
    !userProgress.courseProgress[course.id]
  ).slice(0, 3);

  // Mock certificates data
  const certificates = [
    {
      id: 'cert-1',
      courseTitle: 'Introduction to Developmental Disabilities',
      issueDate: '2023-12-15T00:00:00Z',
      expiryDate: '2024-12-15T00:00:00Z'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* Dashboard Header */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 border-b">
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and continue your courses</p>
          </div>
        </section>
        
        {/* Stats Overview */}
        <section className="py-8 bg-gray-50">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-2 border-b bg-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-medium">Total Progress</h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((userProgress.completedCourses / userProgress.totalCourses) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {userProgress.completedCourses} of {userProgress.totalCourses} courses
                    </div>
                  </div>
                  <Progress value={(userProgress.completedCourses / userProgress.totalCourses) * 100} className="h-2 bg-gray-200" />
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-2 border-b bg-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="text-base font-medium">Courses in Progress</h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 bg-white">
                  <div className="text-2xl font-bold text-gray-900">{userProgress.inProgressCourses}</div>
                  {userProgress.inProgressCourses > 0 && (
                    <p className="text-sm text-gray-600 mt-1">Continue where you left off</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-2 border-b bg-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="text-base font-medium">Completed Courses</h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 bg-white">
                  <div className="text-2xl font-bold text-gray-900">{userProgress.completedCourses}</div>
                  {userProgress.completedCourses > 0 && (
                    <p className="text-sm text-gray-600 mt-1">Great work!</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Course Progress */}
        <section className="py-8">
          <div className="container px-4">
            <Tabs defaultValue="in-progress" className="space-y-8">
              <TabsList className="bg-gray-100 text-gray-700">
                <TabsTrigger value="in-progress" className="data-[state=active]:bg-white data-[state=active]:text-primary">In Progress</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:text-primary">Completed</TabsTrigger>
                <TabsTrigger value="recommended" className="data-[state=active]:bg-white data-[state=active]:text-primary">Recommended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-progress" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgressCourses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      progress={userProgress.courseProgress[course.id]} 
                    />
                  ))}
                  {inProgressCourses.length === 0 && (
                    <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-medium mb-2 text-gray-900">No courses in progress</h3>
                      <p className="text-gray-600 mb-6">Start learning by enrolling in a course!</p>
                      <Link to="/courses" className="text-primary font-medium hover:underline">
                        Browse courses
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      progress={100} 
                    />
                  ))}
                  {completedCourses.length === 0 && (
                    <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-medium mb-2 text-gray-900">No completed courses yet</h3>
                      <p className="text-gray-600 mb-6">Keep learning to complete your first course!</p>
                      <Link to="/courses" className="text-primary font-medium hover:underline">
                        Continue learning
                      </Link>
                    </div>
                  )}
                </div>
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
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Certificates Section */}
        <section className="py-8 bg-gray-50 border-t">
          <div className="container px-4">
            <CertificatesList certificates={certificates} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
