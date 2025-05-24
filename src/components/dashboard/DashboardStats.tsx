
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, BookOpen, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStatsProps {
  totalEnrollments: number;
  completedCount: number;
  inProgressCount: number;
  isLoading: boolean;
}

const DashboardStats = ({ 
  totalEnrollments, 
  completedCount, 
  inProgressCount, 
  isLoading 
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {isLoading ? (
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
  );
};

export default DashboardStats;
