
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserIcon, BookOpen, Award } from 'lucide-react';

interface AdminStatsProps {
  totalStudents: number;
  totalEnrollments: number;
  totalCompletions: number;
  loadingProfiles: boolean;
  loadingEnrollments: boolean;
}

export default function AdminStats({
  totalStudents,
  totalEnrollments,
  totalCompletions,
  loadingProfiles,
  loadingEnrollments
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            <span>Total Students</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingProfiles ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-3xl font-bold">{totalStudents}</div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span>Active Enrollments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEnrollments ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-3xl font-bold">{totalEnrollments}</div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Award className="h-5 w-5" />
            <span>Course Completions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEnrollments ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-3xl font-bold">{totalCompletions}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
