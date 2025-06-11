
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
import ScormManager from '@/components/admin/ScormManager';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, UserPlus, Users, GraduationCap, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { createCertificate, saveCertificate } from '@/services/certificateService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courses } from '@/data/courseData'; // Import all courses

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [certificateForm, setCertificateForm] = useState({ selectedUserId: '', selectedCourseId: '' });
  const [isIssuingCertificate, setIsIssuingCertificate] = useState(false);
  
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
              <TabsList className="grid grid-cols-6 w-full mb-6 max-w-2xl">
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
                <TabsTrigger value="certificates">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Issue Certificate
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
                  refetchEnrollments={() => queryClient.invalidateQueries({ queryKey: ['admin-enrollments'] })}
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
              
              {/* Manual Certificate Issuer Tab */}
              <TabsContent value="certificates" className="space-y-6 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Issue Certificate</h2>
                <p className="text-gray-600 mb-6">Manually issue a certificate to a user who has completed a course.</p>
                
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!certificateForm.selectedUserId || !certificateForm.selectedCourseId) {
                    toast.error('Please select a user and a completed course.');
                    return;
                  }
                  
                  setIsIssuingCertificate(true);
                  try {
                    const selectedProfile = profiles?.find(p => p.id === certificateForm.selectedUserId);
                    const selectedCourse = courses.find(c => c.id === certificateForm.selectedCourseId);

                    if (!selectedProfile || !selectedCourse) {
                      toast.error('Selected user or course not found.');
                      setIsIssuingCertificate(false);
                      return;
                    }

                    const certificate = createCertificate(
                      selectedProfile.id,
                      selectedProfile.full_name || selectedProfile.email || 'N/A',
                      selectedCourse,
                      selectedProfile.email || 'N/A'
                    );
                    
                    const result = await saveCertificate(certificate);
                    if (result.success) {
                      toast.success(`Certificate issued to ${selectedProfile.full_name || selectedProfile.email} for ${selectedCourse.title}`);
                      setCertificateForm({ selectedUserId: '', selectedCourseId: '' });
                    } else {
                      throw new Error('Failed to save certificate');
                    }
                  } catch (error) {
                    console.error('Error issuing certificate:', error);
                    toast.error('Failed to issue certificate');
                  } finally {
                    setIsIssuingCertificate(false);
                  }
                }} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
                      Select Recipient
                    </label>
                    <Select
                      value={certificateForm.selectedUserId}
                      onValueChange={(value) => setCertificateForm(prev => ({ ...prev, selectedUserId: value, selectedCourseId: '' }))}
                      disabled={loadingProfiles}
                    >
                      <SelectTrigger id="user-select" className="w-full">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles?.filter(p => p.role === 'student').map(profile => (
                          <SelectItem key={profile.id} value={profile.id}>
                            {profile.full_name} ({profile.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">
                      Select Completed Course
                    </label>
                    <Select
                      value={certificateForm.selectedCourseId}
                      onValueChange={(value) => setCertificateForm(prev => ({ ...prev, selectedCourseId: value }))}
                      disabled={!certificateForm.selectedUserId || loadingEnrollments}
                    >
                      <SelectTrigger id="course-select" className="w-full">
                        <SelectValue placeholder="Select a completed course" />
                      </SelectTrigger>
                      <SelectContent>
                        {enrollments
                          ?.filter(e => e.user_id === certificateForm.selectedUserId && e.completed)
                          .map(enrollment => {
                            const course = courses.find(c => c.id === enrollment.course_id);
                            return course ? (
                              <SelectItem key={enrollment.course_id} value={enrollment.course_id}>
                                {course.title}
                              </SelectItem>
                            ) : null;
                          })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isIssuingCertificate || !certificateForm.selectedUserId || !certificateForm.selectedCourseId}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isIssuingCertificate ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Issuing...
                        </>
                      ) : 'Issue Certificate'}
                    </button>
                  </div>
                </form>
              </TabsContent>
              
              {/* SCORM Content Tab */}
              <TabsContent value="scorm">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">SCORM Content Management</h2>
                  </div>
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
