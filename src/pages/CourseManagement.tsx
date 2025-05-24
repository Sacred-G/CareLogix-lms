
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateCourse from '@/components/admin/CreateCourse';
import ManageCourses from '@/components/admin/ManageCourses';
import ScormUploader from '@/components/admin/ScormUploader';
import ScormManager from '@/components/admin/ScormManager';
import ScormGuide from '@/components/admin/ScormGuide';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function CourseManagement() {
  const { user } = useAuth();

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile-domain', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!user
  });

  return (
    <div className="min-h-screen flex flex-col bg-include-glow text-foreground">
      <Header />
      <AdminRoute>
        <main className="flex-1 py-8 relative overflow-hidden">
          {/* Blurred background circles for glassy/gradient effect */}
          <div className="blurred-circle-pink" />
          <div className="blurred-circle-blue" />
          <div className="blurred-circle-purple" />
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Course Management</h1>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <p className="text-muted-foreground">Create and manage courses, modules, and quizzes</p>
                  
                  {isLoadingProfile ? (
                    <Skeleton className="h-6 w-24 ml-0 md:ml-2" />
                  ) : userProfile?.email_domain ? (
                    <Badge variant="outline" className="ml-0 md:ml-2">
                      Domain: {userProfile.email_domain}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          
            
            {isLoadingProfile ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full max-w-md" />
                <Skeleton className="h-[300px] w-full" />
              </div>
            ) : (
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid grid-cols-3 w-full mb-6 max-w-md">
                  <TabsTrigger value="create">Create Course</TabsTrigger>
                  <TabsTrigger value="manage">Manage Courses</TabsTrigger>
                  <TabsTrigger value="scorm">SCORM Content</TabsTrigger>
                </TabsList>
                
                {/* Create Course Tab */}
                <TabsContent value="create">
                  <CreateCourse />
                </TabsContent>
                
                {/* Manage Courses Tab */}
                <TabsContent value="manage">
                  <ManageCourses />
                </TabsContent>
                
                {/* SCORM Content Tab */}
                <TabsContent value="scorm">
                  <div className="space-y-6">
                    <ScormGuide />
                    <ScormUploader />
                    <ScormManager />
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </AdminRoute>
</div>
  );
}
