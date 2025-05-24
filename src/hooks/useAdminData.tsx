
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from './useAuth';
import { AdminRoleType, UserProfile, DomainStats, UserCreateRequest, UserUpdateRequest } from '@/types/admin';

export function useAdminData() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Check admin type
  const { data: adminType, isLoading: loadingAdminType } = useQuery({
    queryKey: ['admin-type', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // For now, use the is_admin function which exists
      // When you implement the SQL functions, these can be uncommented
      /* 
      const { data: isSuperAdmin, error: superAdminError } = await supabase.rpc('is_super_admin');
      if (superAdminError) console.error('Error checking super admin status:', superAdminError);
      if (isSuperAdmin) return 'super_admin';
      
      const { data: isDomainAdmin, error: domainAdminError } = await supabase.rpc('is_domain_admin');
      if (domainAdminError) console.error('Error checking domain admin status:', domainAdminError);
      if (isDomainAdmin) return 'domain_admin';
      */
      
      // Temporary solution until the custom RPC functions are created
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
      if (adminError) console.error('Error checking admin status:', adminError);
      
      if (isAdmin) {
        // Super admin check based on email
        if (user.email === 'admin@example.com') {
          return 'super_admin';
        }
        
        // Check if the user is a domain admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (profile?.role === 'domain_admin') {
          return 'domain_admin';
        }
        
        return 'admin';
      }
      
      return null;
    },
    enabled: !!user
  });
  
  // Get managed domains for the current admin
  const { data: managedDomains, isLoading: loadingDomains } = useQuery({
    queryKey: ['managed-domains', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Temporary solution until the get_managed_domains RPC function is created
      if (adminType === 'super_admin') {
        // Super admin manages all domains
        const { data, error } = await supabase
          .from('profiles')
          .select('email_domain')
          .not('email_domain', 'is', null);
          
        if (error) {
          console.error('Error fetching domains:', error);
          return [];
        }
        
        // Extract unique domains
        return [...new Set(data.map(p => p.email_domain))].filter(Boolean);
      } else if (adminType === 'domain_admin') {
        // Get managed domains from profile
        const { data, error } = await supabase
          .from('profiles')
          .select('email_domain')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching managed domains:', error);
          return [];
        }
        
        // If managed_domains is set, use that, otherwise use their own domain
        // Handle the case where managed_domains might not exist yet in the database
        if (data && data.email_domain) {
          return [data.email_domain];
        }
        return [];
      } else if (adminType === 'admin') {
        // Regular admin only manages their own domain
        const { data, error } = await supabase
          .from('profiles')
          .select('email_domain')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching admin domain:', error);
          return [];
        }
        
        return data.email_domain ? [data.email_domain] : [];
      }
      
      return [];
    },
    enabled: !!user && !!adminType
  });

  // Fetch profiles based on admin level
  const { data: profiles, isLoading: loadingProfiles } = useQuery({
    queryKey: ['admin-profiles', adminType, managedDomains],
    queryFn: async () => {
      if (!adminType) return [];
      
      let query = supabase.from('profiles').select('*').order('full_name');
      
      // Super admin can see all profiles
      // Domain admin can only see profiles in their managed domains
      if (adminType === 'domain_admin' && managedDomains?.length) {
        query = query.in('email_domain', managedDomains);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!adminType && !loadingAdminType && !loadingDomains
  });

  // Check if current admin can manage a specific user
  const canManageUser = async (targetUserId: string): Promise<boolean> => {
    if (adminType === 'super_admin') return true;
    
    // Temporary implementation until the can_manage_user RPC function is created
    if (!managedDomains?.length) return false;
    
    // Get target user's domain
    const { data: targetUser, error } = await supabase
      .from('profiles')
      .select('email_domain, role')
      .eq('id', targetUserId)
      .single();
      
    if (error) {
      console.error('Error fetching target user:', error);
      return false;
    }
    
    // Domain admins can only manage users in their domains and only non-admin users
    if (adminType === 'domain_admin') {
      return targetUser.email_domain && 
             managedDomains.includes(targetUser.email_domain) &&
             targetUser.role !== 'super_admin' && 
             targetUser.role !== 'domain_admin';
    }
    
    // Regular admins can only manage students in their domain
    if (adminType === 'admin') {
      return targetUser.email_domain && 
             managedDomains.includes(targetUser.email_domain) &&
             targetUser.role === 'student';
    }
    
    return false;
  };
  
  // Create new user (admin only)
  const createUser = useMutation({
    mutationFn: async ({ email, full_name, role, managed_domains, password }: UserCreateRequest) => {
      // Extract email domain
      const email_domain = email.split('@')[1];
      
      // Check if the current admin can create users with this role
      if (adminType !== 'super_admin' && (role === 'super_admin' || role === 'domain_admin')) {
        throw new Error('You do not have permission to create this type of admin user');
      }
      
      // For domain admins, check if they can manage the domain of the new user
      if (adminType === 'domain_admin' && !managedDomains?.includes(email_domain)) {
        throw new Error('You can only create users in your managed domains');
      }
      
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name }
      });
      
      if (authError) {
        console.error('Error creating auth user:', authError);
        throw authError;
      }
      
      if (!authData.user) {
        throw new Error('Failed to create user');
      }
      
      // 2. Create profile with role and domain info
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name,
          email,
          role,
          email_domain,
          managed_domains: role === 'domain_admin' ? managed_domains : null,
          failed_attempts: 0,
          is_locked: false
        })
        .select('*')
        .single();
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
        throw profileError;
      }
      
      return profileData;
    },
    onSuccess: (data) => {
      toast.success(`User ${data.full_name} created successfully`);
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
    },
    onError: (error: any) => {
      console.error('User creation error:', error);
      toast.error(`Failed to create user: ${error.message}`);
    }
  });
  
  // Update user profile mutation
  const updateUserProfile = useMutation({
    mutationFn: async ({ id, full_name, email, role, managed_domains, is_locked }: UserUpdateRequest) => {
      // Check if the current admin can manage this user
      const canManage = await canManageUser(id);
      if (!canManage) {
        throw new Error('You do not have permission to update this user');
      }
      
      // Check if the current admin can assign this role
      if (adminType !== 'super_admin' && role && (role === 'super_admin' || role === 'domain_admin')) {
        throw new Error('You do not have permission to assign this role');
      }
      
      // Extract email domain if email is provided
      let email_domain;
      if (email) {
        email_domain = email.split('@')[1];
      }
      
      // Prepare update data
      const updateData: any = {};
      if (full_name !== undefined) updateData.full_name = full_name;
      if (email !== undefined) updateData.email = email;
      if (email_domain !== undefined) updateData.email_domain = email_domain;
      if (role !== undefined) updateData.role = role;
      if (managed_domains !== undefined && role === 'domain_admin') {
        updateData.managed_domains = managed_domains;
      }
      if (is_locked !== undefined) updateData.is_locked = is_locked;
      
      // Update the profile
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();
      
      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      toast.success(`User ${data.full_name} updated successfully`);
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
      toast.error(`Failed to update user: ${error.message}`);
    }
  });

  // Function to refetch profiles
  const refetchProfiles = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
  };
  
  // Get all domains in the system
  const { data: allDomains, isLoading: loadingAllDomains } = useQuery({
    queryKey: ['all-domains'],
    queryFn: async () => {
      if (adminType !== 'super_admin') return managedDomains || [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('email_domain')
        .not('email_domain', 'is', null)
        .order('email_domain');
      
      if (error) {
        console.error('Error fetching domains:', error);
        return [];
      }
      
      // Extract unique domains
      const domains = [...new Set(data.map(p => p.email_domain))].filter(Boolean);
      return domains;
    },
    enabled: !!adminType
  });
  
  // Get domain statistics
  const { data: domainStats, isLoading: loadingDomainStats } = useQuery({
    queryKey: ['domain-stats', adminType, managedDomains],
    queryFn: async () => {
      if (!adminType) return [];
      
      const domains = adminType === 'super_admin' ? allDomains : managedDomains;
      if (!domains || domains.length === 0) return [];
      
      const stats = await Promise.all(domains.map(async (domain) => {
        // Get user count for domain
        const { data: users, error: usersError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('email_domain', domain);
        
        if (usersError) {
          console.error(`Error fetching users for domain ${domain}:`, usersError);
          return null;
        }
        
        // Get enrollment count for domain
        const { count: enrollmentCount, error: enrollmentError } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact' })
          .in('user_id', users.map(u => u.id));
        
        if (enrollmentError) {
          console.error(`Error fetching enrollments for domain ${domain}:`, enrollmentError);
        }
        
        return {
          domain,
          userCount: users.length,
          adminCount: users.filter(u => u.role !== 'student').length,
          enrollmentCount: enrollmentCount || 0,
          completionRate: 0 // Would need more complex query to calculate this
        };
      }));
      
      return stats.filter(Boolean) as DomainStats[];
    },
    enabled: !!adminType && !!allDomains && !loadingAllDomains
  });

  // Fetch all enrollments with course info
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ['admin-enrollments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles:user_id(id, full_name, email),
          courses:course_id(id, title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching enrollments:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Fetch course completion statistics
  const { data: courseStats, isLoading: loadingStats } = useQuery({
    queryKey: ['admin-course-stats'],
    queryFn: async () => {
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('id, title');
      
      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
        throw coursesError;
      }
      
      const stats = await Promise.all(courses.map(async (course) => {
        const { count: enrollmentCount, error: countError } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', course.id);
        
        const { count: completedCount, error: completedError } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', course.id)
          .eq('completed', true);
        
        if (countError || completedError) {
          console.error('Error fetching course stats:', countError || completedError);
          return {
            id: course.id,
            title: course.title,
            totalEnrollments: 0,
            completedEnrollments: 0
          };
        }
        
        return {
          id: course.id,
          title: course.title,
          totalEnrollments: enrollmentCount || 0,
          completedEnrollments: completedCount || 0
        };
      }));
      
      return stats;
    }
  });
  
  // Course completion data for charts
  const { data: courseCompletionData, isLoading: loadingCourseCompletionData } = useQuery({
    queryKey: ['course-completion-data', courseStats],
    queryFn: async () => {
      // Simple implementation for now
      const stats = courseStats || [];
      
      return stats.map(course => ({
        name: course.title,
        completed: course.completedEnrollments,
        inProgress: course.totalEnrollments - course.completedEnrollments
      }));
    },
    enabled: !!courseStats
  });

  return {
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
    allDomains,
    loadingAllDomains,
    domainStats,
    loadingDomainStats,
    
    // Existing stats
    enrollments,
    loadingEnrollments,
    courseStats,
    loadingStats,
    courseCompletionData,
    loadingCourseCompletionData
  };
}
