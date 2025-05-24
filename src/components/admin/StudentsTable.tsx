
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
}

interface Enrollment {
  user_id: string;
  [key: string]: any;
}

interface StudentsTableProps {
  profiles: Profile[] | null;
  filteredProfiles: Profile[] | null;
  enrollments: Enrollment[] | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loadingProfiles: boolean;
}

export default function StudentsTable({
  profiles,
  filteredProfiles,
  enrollments,
  searchQuery,
  setSearchQuery,
  loadingProfiles
}: StudentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Directory</CardTitle>
        <CardDescription>All registered students in the system</CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loadingProfiles ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Courses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles && filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.full_name || 'N/A'}</TableCell>
                    <TableCell>{profile.email || 'N/A'}</TableCell>
                    <TableCell>{profile.role || 'student'}</TableCell>
                    <TableCell>
                      {enrollments ? 
                        enrollments.filter(e => e.user_id === profile.id).length : 
                        'Loading...'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    {searchQuery ? 'No matching students found' : 'No students registered yet'}
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
