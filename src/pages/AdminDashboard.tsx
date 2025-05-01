
import React, { useState } from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminData } from '@/hooks/useAdminData';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import CourseStats from '@/components/admin/CourseStats';
import EnrollmentsTable from '@/components/admin/EnrollmentsTable';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    profiles, 
    enrollments, 
    courseStats,
    loadingProfiles, 
    loadingEnrollments, 
    loadingStats,
    refetchProfiles,
    updateUserProfile
  } = useAdminData();

  // Filter profiles based on search query
  const filteredProfiles = profiles?.filter(profile => 
    profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get overall stats
  const totalStudents = profiles?.length || 0;
  const totalEnrollments = enrollments?.length || 0;
  const totalCompletions = enrollments?.filter(e => e.completed)?.length || 0;

  return (
    <AdminRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-muted/30 py-8">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Track and manage student progress across all courses</p>
              </div>
            </div>
            
            {/* Dashboard Overview Cards */}
            <AdminStats 
              totalStudents={totalStudents}
              totalEnrollments={totalEnrollments}
              totalCompletions={totalCompletions}
              loadingProfiles={loadingProfiles}
              loadingEnrollments={loadingEnrollments}
            />
            
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-6 max-w-md">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="courses">Course Stats</TabsTrigger>
                <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
              </TabsList>
              
              {/* Users Tab */}
              <TabsContent value="users">
                <UserManagement
                  profiles={profiles}
                  filteredProfiles={filteredProfiles}
                  enrollments={enrollments}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  loadingProfiles={loadingProfiles}
                  refetchProfiles={refetchProfiles}
                  updateUserProfile={updateUserProfile}
                />
              </TabsContent>
              
              {/* Course Stats Tab */}
              <TabsContent value="courses">
                <CourseStats 
                  courseStats={courseStats}
                  loadingStats={loadingStats}
                />
              </TabsContent>
              
              {/* Enrollments Tab */}
              <TabsContent value="enrollments">
                <EnrollmentsTable 
                  enrollments={enrollments}
                  loadingEnrollments={loadingEnrollments}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </AdminRoute>
  );
}
