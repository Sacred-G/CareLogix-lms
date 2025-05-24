
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface Enrollment {
  id: string;
  progress: number | null;
  completed: boolean;
  profiles: {
    full_name: string | null;
  } | null;
  courses: {
    title: string | null;
  } | null;
  [key: string]: any;
}

interface EnrollmentsTableProps {
  enrollments: Enrollment[] | null;
  loadingEnrollments: boolean;
}

export default function EnrollmentsTable({ enrollments, loadingEnrollments }: EnrollmentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
        <CardDescription>All course enrollments and student progress</CardDescription>
      </CardHeader>
      <CardContent>
        {loadingEnrollments ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments && enrollments.length > 0 ? (
                enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.profiles?.full_name || 'N/A'}
                    </TableCell>
                    <TableCell>{enrollment.courses?.title || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={enrollment.progress || 0} className="h-2 w-40" />
                        <span className="text-sm">{enrollment.progress || 0}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {enrollment.completed ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No enrollments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
