
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/data/courseTypes';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export default function CourseCard({ course, progress = 0 }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
          <Badge className="absolute top-3 right-3">{course.category}</Badge>
        </div>
        <CardHeader className="p-4">
          <h3 className="font-semibold line-clamp-2 text-lg">{course.title}</h3>
          <p className="text-sm text-muted-foreground">By {course.instructor}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-muted-foreground">{course.duration}</div>
          <div className="flex items-center gap-2 w-1/2">
            <Progress value={progress} className="h-2" />
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
