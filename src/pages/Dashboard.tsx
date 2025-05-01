
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/data/courseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/courses/CourseCard';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        {/* Dashboard Header */}
        <section className="bg-white border-b py-8">
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and continue your courses</p>
          </div>
        </section>
        
        {/* Stats Overview */}
        <section className="py-8">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Progress</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold">
                      {Math.round((userProgress.completedCourses / userProgress.totalCourses) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {userProgress.completedCourses} of {userProgress.totalCourses} courses
                    </div>
                  </div>
                  <Progress value={(userProgress.completedCourses / userProgress.totalCourses) * 100} className="h-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Courses in Progress</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProgress.inProgressCourses}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Completed Courses</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProgress.completedCourses}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Course Progress */}
        <section className="py-8">
          <div className="container px-4">
            <Tabs defaultValue="in-progress" className="space-y-8">
              <TabsList>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
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
                    <div className="col-span-3 text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No courses in progress</h3>
                      <p className="text-muted-foreground mb-6">Start learning by enrolling in a course!</p>
                      <Link to="/courses" className="text-primary hover:underline">
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
                    <div className="col-span-3 text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No completed courses yet</h3>
                      <p className="text-muted-foreground mb-6">Keep learning to complete your first course!</p>
                      <Link to="/courses" className="text-primary hover:underline">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
