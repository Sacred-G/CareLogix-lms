
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserIcon, BookOpen, Award } from 'lucide-react';

interface AdminStatsProps {
  totalStudents: number;
  totalAdmins: number;
  totalEnrollments: number;
  totalCompletions: number;
  loadingProfiles: boolean;
  loadingEnrollments: boolean;
}

export default function AdminStats({
  totalStudents,
  totalAdmins,
  totalEnrollments,
  totalCompletions,
  loadingProfiles,
  loadingEnrollments
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-slate-800 text-slate-100 border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-lms-teal-400" />
            <span>Total Students</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingProfiles ? (
            <Skeleton className="h-8 w-20 bg-slate-700" />
          ) : (
            <div className="text-3xl font-bold">{totalStudents}</div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-slate-800 text-slate-100 border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-pink-400" />
            <span>Total Admins</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingProfiles ? (
            <Skeleton className="h-8 w-20 bg-slate-700" />
          ) : (
            <div className="text-3xl font-bold">{totalAdmins}</div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-slate-800 text-slate-100 border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-lms-teal-400" />
            <span>Active Enrollments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEnrollments ? (
            <Skeleton className="h-8 w-20 bg-slate-700" />
          ) : (
            <div className="text-3xl font-bold">{totalEnrollments}</div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-slate-800 text-slate-100 border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Award className="h-5 w-5 text-lms-teal-400" />
            <span>Course Completions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEnrollments ? (
            <Skeleton className="h-8 w-20 bg-slate-700" />
          ) : (
            <div className="text-3xl font-bold">{totalCompletions}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
