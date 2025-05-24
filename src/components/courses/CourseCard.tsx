
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/data/courseTypes';
import { Star, PlayCircle, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export default function CourseCard({ course, progress = 0 }: CourseCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Determine if this course is featured
  const isFeatured = course.featured === true;
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    
    if (!user) {
      // If user is not authenticated, redirect to login page
      navigate('/auth', { state: { from: `/courses/${course.id}` } });
    } else {
      // If user is authenticated, navigate to course detail
      navigate(`/courses/${course.id}`);
    }
  };
  
  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card
        className={
          "h-full overflow-hidden transition-all relative lms-card border-2 border-primary/40 shadow-xl-glow"
        }
      >
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute left-0 top-5 z-10">
            <div className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-r-full flex items-center gap-1 shadow-md">
              <Star className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Featured</span>
            </div>
          </div>
        )}
        
        {/* Lock badge for unauthenticated users */}
        {!user && (
          <div className="absolute right-0 top-5 z-10">
            <div className="bg-slate-800/80 text-white px-3 py-1 rounded-l-full flex items-center gap-1 shadow-md backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Login Required</span>
            </div>
          </div>
        )}

        <div className="aspect-video relative overflow-hidden">
          {/* Background gradient overlay for all cards */}
          <div className="absolute inset-0 bg-gradient-primary opacity-20 z-0"></div>

          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500 brightness-105"
          />

          {/* Category and play indicator */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            <Badge className="bg-background/80 backdrop-blur-sm">{course.category}</Badge>
            <div className="bg-gradient-primary text-primary-foreground p-1.5 rounded-full shadow-lg">
              <PlayCircle className="h-4 w-4" />
            </div>
          </div>
        </div>
        <CardHeader className="p-4 bg-gradient-primary/10">
          <h3 className="font-semibold line-clamp-2 text-lg text-gradient-primary">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground">By {course.instructor}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-muted-foreground">{course.duration}</div>
          <div className="flex items-center gap-2 w-1/2">
            <Progress value={progress} className="h-2 bg-gradient-primary" />
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
