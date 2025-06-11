
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminData } from '@/hooks/useAdminData';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { AdminRoleType } from '@/types/admin';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import CreateUserForm from '@/components/admin/CreateUserForm';
import CourseStats from '@/components/admin/CourseStats';
import EnrollmentsTable from '@/components/admin/EnrollmentsTable';
import CourseAssignment from '@/components/admin/CourseAssignment';
import ScormUploader from '@/components/admin/ScormUploader';
import ScormManager from '@/components/admin/ScormManager';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, UserPlus, Users, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  
  const { 
    // Admin status
    adminType,
    loadingAdminType,
    managedDomains,
    loadingDomains,
    canManageUser,
    
    // User management
    profiles, 
    loadingProfiles,
    createUser,
    updateUserProfile,
    refetchProfiles,
    
    // Domain management
    
    // Existing stats
    enrollments,
    loadingEnrollments, 
    courseStats,
    loadingStats
  } = useAdminData();

  // Filter profiles based on search query and admin type
  const filteredProfiles = profiles?.filter(profile => {
    // Only filter by full_name since email is not stored in profiles table
    // If search is empty, show all profiles
    if (!searchQuery) return true;
    
    // Filter by full name only
    const matchesSearch = profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Return matches
    return matchesSearch;
  });

  // Get overall stats based on filtered profiles
  const totalStudents = profiles?.filter(p => p.role === 'student').length || 0;
  const totalAdmins = profiles?.filter(p => p.role !== 'student').length || 0;
  const totalEnrollments = enrollments?.length || 0;
  const totalCompletions = enrollments?.filter(e => e.completed)?.length || 0;
  
  // Handle creating a new user
  const handleCreateUser = async (data: any) => {
    try {
      await createUser.mutateAsync(data);
      setIsCreateUserOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    }
  };
  
  // Handle adding a domain admin for a specific domain
  const handleAddDomainAdmin = (domain: string) => {
    // First check if user has permission to add domain admins
    if (adminType !== 'super_admin' && adminType !== 'domain_admin') {
      toast.error('You do not have permission to add domain admins');
      return;
    }
    
    setSelectedDomain(domain);
    setIsCreateUserOpen(true);
    
    // Log the action for debugging
    console.log('[ADMIN] Adding domain admin for domain:', domain, {
      adminType,
      managedDomains,
      currentUserEmail: user?.email
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-include-glow text-foreground">
      <Header />
      <AdminRoute>
        <div className="min-h-screen flex flex-col">
        
        <main className="flex-1 bg-muted/30 py-8">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Admin Dashboard
                  {adminType && (
                    <Badge variant="outline" className="ml-2 font-normal text-xs py-0">
                      {adminType === 'super_admin' ? 'Super Admin' : 
                       adminType === 'domain_admin' ? 'Domain Admin' : 'Admin'}
                    </Badge>
                  )}
                </h1>
                <p className="text-muted-foreground">
                  {adminType === 'super_admin' 
                    ? 'Manage all users, domains, and courses in the system' 
                    : adminType === 'domain_admin' 
                    ? 'Manage users and track progress within your domains' 
                    : 'Track and manage student progress across all courses'}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setIsCreateUserOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
                <Button asChild variant="outline">
                  <Link to="/admin/courses">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage Courses
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Dashboard Overview Cards */}
            <AdminStats 
              totalStudents={totalStudents}
              totalAdmins={totalAdmins}
              totalEnrollments={totalEnrollments}
              totalCompletions={totalCompletions}
              loadingProfiles={loadingProfiles}
              loadingEnrollments={loadingEnrollments}
            />
            
            
            <Tabs defaultValue="users" className="w-full">
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      const { data, error } = await supabase.from('profiles').select('*');
                      console.log('DEBUG - All profiles (Direct):', data);
                      console.log('DEBUG - Profiles count:', data?.length || 0);
                      console.log('DEBUG - Current filtered profiles:', filteredProfiles);
                      toast.success(`Found ${data?.length || 0} profiles in database`);
                      
                      if (error) {
                        console.error('Error fetching profiles:', error);
                        toast.error('Error fetching profiles');
                      }
                    } catch (e) {
                      console.error('Debug button error:', e);
                      toast.error('Error in debug button');
                    }
                  }}
                >
                  Debug: Show All Profiles
                </Button>
              </div>
              <TabsList className="grid grid-cols-5 w-full mb-6 max-w-md">
                <TabsTrigger value="users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="courses">Course Stats</TabsTrigger>
                <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                <TabsTrigger value="assign">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Assign
                </TabsTrigger>
                <TabsTrigger value="scorm">SCORM Content</TabsTrigger>
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
                  adminType={adminType}
                  canManageUser={canManageUser}
                  onCreateUser={() => setIsCreateUserOpen(true)}
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
              
              {/* Course Assignment Tab */}
              <TabsContent value="assign">
                <CourseAssignment
                  profiles={profiles}
                  refetchEnrollments={() => queryClient.invalidateQueries({ queryKey: ['admin-enrollments'] })}
                  adminType={adminType as AdminRoleType}
                  canManageUser={canManageUser}
                />
              </TabsContent>
              
              {/* SCORM Content Tab */}
              <TabsContent value="scorm">
                <div className="space-y-6">
                  <ScormUploader />
                  <ScormManager />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </AdminRoute>
    
    {/* User creation form */}
    <CreateUserForm
      isOpen={isCreateUserOpen}
      onClose={() => setIsCreateUserOpen(false)}
      createUser={handleCreateUser}
      adminType={adminType as AdminRoleType}
      availableDomains={[]}
      managedDomains={Array.isArray(managedDomains) ? managedDomains : []}
    />
    </div>
  );
}
