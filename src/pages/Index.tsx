
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { courses } from '@/data/courseData';
import CourseCard from '@/components/courses/CourseCard';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  // Dynamic org/university name logic (same as Header)
  let orgName = 'Your Organization';
  if (user && user.email) {
    const domain = user.email.split('@')[1]?.split('.')[0];
    if (domain) {
      orgName = `${domain.charAt(0).toUpperCase() + domain.slice(1)} University`;
    }
  }
  // Show up to 6 courses on the home page instead of just 3
  const featuredCourses = courses.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Blurred background circles */}
          <div className="blurred-circle-pink" />
          <div className="blurred-circle-blue" />
          <div className="blurred-circle-purple" />
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6 animate-fade-in text-center">
                <span className="block text-2xl md:text-3xl font-semibold text-gradient-primary">Learn with</span>
                <span className="block text-5xl md:text-6xl font-extrabold text-gradient-primary leading-tight">Compassion</span>
                <span className="block text-3xl md:text-4xl font-bold text-gradient-primary">and Confidence</span>
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                Empowering Direct Support Professionals with accessible, engaging training to better serve individuals with developmental disabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <>
                    <Button size="lg" className="px-8 py-3 text-lg bg-gradient-primary text-primary-foreground shadow-lg-glow hover:opacity-90 transition-opacity" asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-border text-foreground hover:bg-muted transition-colors" asChild>
                      <Link to="/dashboard">My Dashboard</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="px-8 py-3 text-lg bg-gradient-primary text-primary-foreground shadow-lg-glow hover:opacity-90 transition-opacity" asChild>
                      <Link to="/auth">Sign In to Access Courses</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-border text-foreground hover:bg-muted transition-colors" asChild>
                      <Link to="/auth?tab=register">Create Account</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose {orgName}?</h2>
            <p className="text-center text-lg text-pink-300 mb-10">Empowering direct support professionals for your organization.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-glow text-slate-100">
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
              
              <Card className="card-glow text-slate-100">
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
              
              <Card className="card-glow text-slate-100">
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
              {user ? (
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-200" asChild>
                  <Link to="/courses">View All</Link>
                </Button>
              ) : (
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-200" asChild>
                  <Link to="/auth">Sign In to View</Link>
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {!user && (
                <div className="col-span-full mt-6 p-4 bg-slate-800 rounded-lg text-center">
                  <p className="text-slate-200 mb-4">Please sign in to access our full course catalog and start learning.</p>
                  <Button className="bg-gradient-primary text-primary-foreground" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-footer-accent text-white">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Support Skills?</h2>
              <p className="text-xl mb-8">
                Join thousands of Direct Support Professionals who are improving their knowledge and skills through our comprehensive training platform.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-lms-blue-700 hover:bg-slate-100" asChild>
                <Link to={user ? "/courses" : "/auth"}>{user ? "Get Started Today" : "Sign In to Begin"}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Powered By Section */}
      <div className="w-full text-center py-6 text-xs text-slate-400 tracking-wide">
        Powered By <span className="text-pink-400 font-semibold">CareLogix Learning Management System</span>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
