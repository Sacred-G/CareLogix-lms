import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { directScormModules } from '@/data/scormConfig';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Extras = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-2 font-heading text-gradient-primary">Additional Resources</h1>
        <p className="text-muted-foreground mb-8">Access additional learning resources and tools.</p>
        
        {/* Certificate Preview Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Certificate Preview</h2>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>View Sample Certificate</CardTitle>
              <CardDescription>
                See what your course completion certificates will look like when you finish a course.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our certificates are professionally designed and can be downloaded, printed, or shared with others.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href="/certificate-preview">View Certificate Example</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Interactive Learning Modules</h2>
        <p className="text-muted-foreground mb-8">Access standalone interactive SCORM modules for enhanced learning.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directScormModules.map((module) => (
            <Card key={module.id} className="flex flex-col h-full transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="line-clamp-2">{module.title}</CardTitle>
                <CardDescription>
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  From course: <span className="font-medium">{module.courseId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-2">
                  <a href={module.path} target="_blank" rel="noopener noreferrer">
                    Open Module <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Extras;
