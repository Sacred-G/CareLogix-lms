
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseStatItem {
  id: string;
  title: string;
  totalEnrollments: number;
  completedEnrollments: number;
}

interface CourseStatsProps {
  courseStats: CourseStatItem[] | null;
  loadingStats: boolean;
}

export default function CourseStats({ courseStats, loadingStats }: CourseStatsProps) {
  return (
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
  );
}
