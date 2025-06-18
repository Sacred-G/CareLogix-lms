import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CourseParticipant } from '@/services/courseService';

interface CourseDetailModalProps {
  course: {
    id: string;
    title: string;
  } | null;
  enrolledUsers: CourseParticipant[] | null;
  completedUsers: CourseParticipant[] | null;
  onClose: () => void;
  loading: boolean;
}

export default function CourseDetailModal({ course, enrolledUsers, completedUsers, onClose, loading }: CourseDetailModalProps) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-slate-800 text-slate-100 border-slate-700 shadow-lg w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{course.title}</CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm">X</Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Enrolled Users</h3>
                {enrolledUsers && enrolledUsers.length > 0 ? (
                  <ul className="space-y-2">
                    {enrolledUsers.map(user => (
                      <li key={user.id} className="text-sm text-slate-300">{user.name} ({user.email})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400">No users enrolled.</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Completed Users</h3>
                {completedUsers && completedUsers.length > 0 ? (
                  <ul className="space-y-2">
                    {completedUsers.map(user => (
                      <li key={user.id} className="text-sm text-slate-300">{user.name} ({user.email})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400">No users have completed this course.</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
