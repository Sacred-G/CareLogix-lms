
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { courses } from '@/data/courseData';
import CourseCard from '@/components/courses/CourseCard';

const Index = () => {
  const featuredCourses = courses.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-lms-blue-600 to-lms-teal-600 text-white">
          <div className="container px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Learn with Compassion and Confidence
              </h1>
              <p className="text-xl mb-8">
                Empowering Direct Support Professionals with accessible, engaging training to better serve individuals with developmental disabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-lms-teal-500 hover:bg-lms-teal-600" asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30" asChild>
                  <Link to="/dashboard">My Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-800">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Centered Learning?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-700 text-slate-100 border-slate-600 border-t-4 border-t-lms-blue-500">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lms-blue-400">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Accessible Learning</h3>
                  <p className="text-slate-300">
                    Designed with accessibility in mind, our courses are easy to navigate and understand for all learning styles.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 text-slate-100 border-slate-600 border-t-4 border-t-lms-teal-500">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lms-teal-400">
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z" />
                      <path d="M10 2c1 .5 2 2 2 5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Compassionate Approach</h3>
                  <p className="text-slate-300">
                    Our training emphasizes empathy and person-centered approaches to support individuals with dignity and respect.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700 text-slate-100 border-slate-600 border-t-4 border-t-lms-blue-400">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lms-blue-400">
                      <path d="M17 14V2" />
                      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Interactive Learning</h3>
                  <p className="text-slate-300">
                    Engage with real-world scenarios, quizzes, and multimedia content that reinforces learning through practice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Featured Courses Section */}
        <section className="py-16 bg-slate-900">
          <div className="container px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Courses</h2>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-200" asChild>
                <Link to="/courses">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-lms-blue-600 to-lms-teal-600 text-white">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Support Skills?</h2>
              <p className="text-xl mb-8">
                Join thousands of Direct Support Professionals who are improving their knowledge and skills through our comprehensive training platform.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-lms-blue-700 hover:bg-slate-100" asChild>
                <Link to="/courses">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
