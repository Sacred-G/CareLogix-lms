
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from './useAuth';
import { AdminRoleType, UserProfile, DomainStats, UserCreateRequest, UserUpdateRequest } from '@/types/admin';

// Define the hook as a regular function for Fast Refresh compatibility
function useAdminData() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Check admin type
  const { data: adminType, isLoading: loadingAdminType } = useQuery({
    queryKey: ['admin-type', user?.id],
    queryFn: async () => {
      console.log('[DEBUG] Checking admin type for user:', user?.id);
      if (!user) {
        console.log('[DEBUG] No user, returning null');
        return null;
      }
      
      // Temporary solution until the custom RPC functions are created
      console.log('[DEBUG] Checking is_admin RPC');
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
      
      if (adminError) {
        console.error('[ERROR] Error checking admin status:', adminError);
      } else {
        console.log('[DEBUG] is_admin result:', isAdmin);
      }
      
      if (isAdmin) {
        console.log(`[DEBUG] User is an admin, checking type for email: ${user.email}`);
        
        console.log('[DEBUG] Fetching user profile to check role');
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, email_domain')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error('[ERROR] Error fetching profile:', profileError);
          return null;
        }
        
        console.log('[DEBUG] User profile:', { role: profile?.role, email: user.email });
          
        // Check role from profile first, then fall back to email check
        if (profile?.role === 'super_admin') {
          console.log('[DEBUG] User is super admin (from profile role)');
          return 'super_admin';
        }
        
        // Legacy super admin check (can be removed later)
        if (user.email === 'admin@example.com') {
          console.log('[DEBUG] User is super admin (from email)');
          return 'super_admin';
        }
        
        if (profile?.role === 'domain_admin') {
          console.log('[DEBUG] User is domain admin');
          return 'domain_admin';
        }
        
        // Default to regular admin if they have the admin role but no specific admin type
        console.log('[DEBUG] User is regular admin');
        return 'admin';
      }
      
      console.log('[DEBUG] User is not an admin');
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

  // Fetch profiles based on admin level with domain isolation
  const { data: profiles, isLoading: loadingProfiles, refetch: refreshProfiles } = useQuery({
    queryKey: ['admin-profiles', adminType, user?.id],
    queryFn: async () => {
      console.log('[DEBUG] Fetching profiles with adminType:', adminType);
      
      if (!adminType || !user?.id) {
        console.log('[DEBUG] Missing adminType or user ID');
        return [];
      }
      
      // Get the current admin's profile
      console.log('[DEBUG] Fetching admin profile for user ID:', user.id);
      
      // Get the profile with email_domain
      const { data: adminProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profileError || !adminProfile) {
        console.error('[ERROR] Error fetching admin profile:', profileError);
        return [];
      }
      
      // Extract domain from user's email
      const extractDomain = (email: string): string | null => {
        if (!email) return null;
        const parts = email.split('@');
        return parts.length === 2 ? parts[1].toLowerCase() : null;
      };
      
      const adminEmail = user.email || '';
      const adminDomain = extractDomain(adminEmail) || '';
      
      console.log('[DEBUG] Admin profile:', {
        id: adminProfile.id,
        email: adminEmail,
        email_domain: adminDomain,
        role: adminProfile.role,
        adminType
      });
      
      // Base query with required fields
      let query = supabase
        .from('profiles')
        .select('*')
        .order('full_name');
      
      // Apply domain filtering based on admin type
      if (adminType === 'super_admin') {
        console.log(`[DEBUG] Super admin - showing all profiles in domain: ${adminDomain}`);
        // Super admin can see all profiles in their domain
        query = query.eq('email_domain', adminDomain);
      } else if (adminType === 'domain_admin') {
        console.log(`[DEBUG] Domain admin - showing all non-admin users in domain: ${adminDomain}`);
        // Domain admin can see all non-admin users in their domain
        query = query
          .eq('email_domain', adminDomain)
          .or(`role.eq.student,role.eq.null`);
      } else if (adminType === 'admin') {
        console.log(`[DEBUG] Regular admin - showing students in domain: ${adminDomain}`);
        // Regular admin can only see students in their domain
        query = query
          .eq('email_domain', adminDomain)
          .eq('role', 'student');
      } else {
        // No access if none of the above conditions are met
        console.warn('[WARN] Insufficient permissions to view profiles', { adminType, adminDomain });
        return [];
      }
      
      console.log('[DEBUG] Executing profiles query...');
      const { data, error } = await query;
      
      if (error) {
        console.error('[ERROR] Error fetching profiles:', error);
        throw error;
      }
      
      console.log(`[DEBUG] Found ${data?.length || 0} profiles before filtering`);
      
      // Return the filtered results directly since we're doing filtering at the database level
      console.log(`[DEBUG] Returning ${data?.length || 0} profiles after filtering`);
      return data || [];
    },
    enabled: !!adminType && !!user?.id && !loadingAdminType
  });

  // Check if current admin can manage a specific user
  const canManageUser = async (targetUserId: string): Promise<boolean> => {
    try {
      if (!user?.id) return false;
      
      // Super admin can manage everyone
      if (adminType === 'super_admin') return true;
      
      // Get the current admin's profile
      const { data: adminProfile, error: adminError } = await supabase
        .from('profiles')
        .select('email_domain, role')
        .eq('id', user.id)
        .single();
        
      if (adminError || !adminProfile) {
        console.error('Error fetching admin profile:', adminError);
        return false;
      }
      
      // Get target user's profile
      const { data: targetUser, error: targetError } = await supabase
        .from('profiles')
        .select('email_domain, role')
        .eq('id', targetUserId)
        .single();
        
      if (targetError || !targetUser) {
        console.error('Error fetching target user:', targetError);
        return false;
      }
      
      // Domain admins can only manage users in their domain and only non-admin users
      if (adminType === 'domain_admin') {
        return targetUser.email_domain === adminProfile.email_domain &&
               targetUser.role !== 'super_admin' && 
               targetUser.role !== 'domain_admin';
      }
      
      // Regular admins can only manage students in their domain
      if (adminType === 'admin') {
        return targetUser.email_domain === adminProfile.email_domain &&
               targetUser.role === 'student';
      }
      
      return false;
    } catch (error) {
      console.error('Error in canManageUser:', error);
      return false;
    }
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
      
      // 1. Create auth user using regular signup (no need for admin privileges)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name }, // Add metadata with full name
          emailRedirectTo: window.location.origin // Redirect back to app after confirmation
        }
      });
      
      if (authError) {
        console.error('Error creating auth user:', authError);
        throw authError;
      }
      
      if (!authData.user) {
        throw new Error('Failed to create user');
      }
      
      // 2. The handle_new_user trigger might not run immediately since email confirmation is pending
      // Let's manually create a profile so it shows up in the admin panel right away
      
      // First check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', authData.user.id)
        .single();
      
      if (!existingProfile) {
        // Manually create profile since trigger might not have run yet
        const { error: profileCreateError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: full_name.split(' ')[0] || '',
              last_name: full_name.split(' ').slice(1).join(' ') || '',
              full_name: full_name,
              email_domain: email.split('@')[1],
              role: 'student' // Default role, will be updated below
            }
          ]);
        
        if (profileCreateError) {
          console.error('Error creating profile manually:', profileCreateError);
          // Continue anyway - the trigger might have created it already
        }
      }
      // Now, update it with the role, full_name from form, and managed_domains (if applicable).
      const profileUpdates: any = {
        full_name,
        role,
      };

      if (role === 'domain_admin' && managed_domains && managed_domains.length > 0) {
        profileUpdates.managed_domains = managed_domains;
      } else if (role !== 'domain_admin') {
        // Ensure managed_domains is explicitly nulled if user is not a domain admin
        // or if it was previously set and their role changes away from domain_admin.
        // This depends on whether your schema allows NULL for managed_domains or if it should be an empty array.
        // Assuming NULL is acceptable for non-domain-admins.
        profileUpdates.managed_domains = null;
      }

      const { data: updatedProfileData, error: profileUpdateError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', authData.user.id)
        .select('*')
        .single();

      if (profileUpdateError) {
        console.error('Error updating profile:', profileUpdateError);
        // It's possible the user was created in auth.users, but profile update failed.
        // Consider how to handle this inconsistency, e.g., by trying to delete the auth user.
        throw profileUpdateError;
      }

      if (!updatedProfileData) {
        throw new Error('Failed to update profile for the new user.');
      }

      return updatedProfileData;
    },
    onSuccess: (data) => {
      toast.success(`User ${data.full_name} created successfully`);
      
      // Force immediate refresh of profiles list
      refreshProfiles();
      
      // Also invalidate and refetch for good measure
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
      queryClient.refetchQueries({ queryKey: ['admin-profiles'] });
      
      // Add multiple refresh attempts with increasing delays
      setTimeout(() => refreshProfiles(), 500);
      setTimeout(() => refreshProfiles(), 1500);
      setTimeout(() => refreshProfiles(), 3000);
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
    queryKey: ['domain-stats', adminType, user?.id, allDomains, managedDomains],
    queryFn: async () => {
      console.log('[DEBUG] Fetching domain stats with:', {
        adminType,
        userEmail: user?.email,
        allDomains,
        managedDomains
      });
      
      if (!adminType || !user?.email) {
        console.log('[DEBUG] Missing adminType or user email');
        return [];
      }
      
      // Extract admin's domain from email
      const adminDomain = user.email.split('@')[1]?.toLowerCase();
      if (!adminDomain) {
        console.log('[DEBUG] Could not extract domain from email:', user.email);
        return [];
      }
      
      // Determine which domains this admin can see
      let domains: string[] = [];
      
      if (adminType === 'super_admin') {
        // Super admins see all domains from allDomains
        domains = allDomains || [];
        console.log('[DEBUG] Super admin - showing all domains:', domains);
      } else if (adminType === 'domain_admin') {
        // Domain admins see their own domain and any explicitly managed domains
        domains = [adminDomain, ...(managedDomains || [])].filter(Boolean);
        console.log('[DEBUG] Domain admin - showing domains:', domains, 'managedDomains:', managedDomains);
      } else {
        // Regular admins only see their own domain
        domains = [adminDomain];
        console.log('[DEBUG] Regular admin - showing only domain:', domains);
      }
      
      // Remove duplicates and filter out any empty/undefined domains
      domains = [...new Set(domains)].filter(Boolean);
      
      console.log('[DEBUG] Final domains to fetch stats for:', domains);
      if (domains.length === 0) {
        console.log('[DEBUG] No domains to fetch stats for');
        return [];
      }
      
      console.log('[DEBUG] Fetching stats for domains:', domains);
      
      const stats = await Promise.all(domains.map(async (domain) => {
        console.log(`[DEBUG] Processing domain: ${domain}`);
        try {
          // Get user count for domain with proper role filtering based on admin type
          let userQuery = supabase
            .from('profiles')
            .select('id, role, email_domain', { count: 'exact' })
            .eq('email_domain', domain);
          
          console.log(`[DEBUG] User query for domain ${domain}:`, userQuery);
          
          // Apply role filtering based on admin type
          if (adminType === 'domain_admin') {
            userQuery = userQuery.not('role', 'in', '("super_admin","domain_admin","admin")');
            console.log(`[DEBUG] Applied domain_admin filter to query`);
          } else if (adminType === 'admin') {
            userQuery = userQuery.eq('role', 'student');
            console.log(`[DEBUG] Applied regular admin filter to query`);
          }
          
          const { data: users, error: usersError, count: userCount } = await userQuery;
          
          console.log(`[DEBUG] Users for domain ${domain}:`, {
            count: userCount,
            error: usersError,
            users: users?.map(u => ({ id: u.id, role: u.role, email_domain: u.email_domain }))
          });
          
          if (usersError) {
            console.error(`Error fetching users for domain ${domain}:`, usersError);
            return null;
          }
          
          // Get enrollment count for domain with proper filtering
          let enrollmentQuery = supabase
            .from('enrollments')
            .select('id, user_id, profiles!inner(email_domain)', { count: 'exact' })
            .eq('profiles.email_domain', domain);
            
          console.log(`[DEBUG] Enrollment query for domain ${domain}:`, enrollmentQuery);
          
          // If we have users, filter enrollments by those users
          if (users && users.length > 0) {
            enrollmentQuery = enrollmentQuery.in('user_id', users.map(u => u.id));
            console.log(`[DEBUG] Filtering enrollments by ${users.length} users`);
          } else {
            console.log(`[DEBUG] No users found for domain ${domain}, checking for any users in domain`);
            // If no users, we'll need to get enrollments for the domain
            const { data: domainUsers } = await supabase
              .from('profiles')
              .select('id')
              .eq('email_domain', domain);
              
            console.log(`[DEBUG] Found ${domainUsers?.length || 0} users in domain ${domain}`);
            
            if (domainUsers && domainUsers.length > 0) {
              enrollmentQuery = enrollmentQuery.in('user_id', domainUsers.map(u => u.id));
              console.log(`[DEBUG] Filtering enrollments by ${domainUsers.length} domain users`);
            } else {
              // No users in domain, so no enrollments
              console.log(`[DEBUG] No users found in domain ${domain}, returning empty stats`);
              return {
                domain,
                userCount: 0,
                adminCount: 0,
                enrollmentCount: 0,
                completionRate: 0
              };
            }
          }
          
          const { count: enrollmentCount = 0, error: enrollmentError } = await enrollmentQuery;
          
          if (enrollmentError) {
            console.error(`Error fetching enrollments for domain ${domain}:`, enrollmentError);
          }
          
          // Calculate admin count based on admin type
          let adminCount = 0;
          if (users) {
            if (adminType === 'super_admin') {
              adminCount = users.filter(u => u.role === 'super_admin').length;
            } else if (adminType === 'domain_admin') {
              // Domain admins can see all non-admin users in their domain
              adminCount = users.filter(u => u.role === 'admin').length;
            } else {
              // Regular admins only see students, so no admins in their view
              adminCount = 0;
            }
          }
          
          return {
            domain,
            userCount: userCount || 0,
            adminCount,
            enrollmentCount: enrollmentCount || 0,
            completionRate: 0 // Would need more complex query to calculate this
          };
        } catch (error) {
          console.error(`Error processing domain ${domain}:`, error);
          return null;
        }
      }));
      
      return stats.filter(Boolean) as DomainStats[];
    },
    enabled: !!adminType && !!allDomains && !loadingAllDomains
  });

  // Fetch enrollments with domain filtering
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ['admin-enrollments', adminType, user?.id],
    queryFn: async () => {
      console.log('[DEBUG] Fetching enrollments with domain filtering');
      
      if (!user?.email) {
        console.log('[DEBUG] No user email found');
        return [];
      }
      
      // Extract domain from user's email
      const domain = user.email.split('@')[1]?.toLowerCase();
      if (!domain) {
        console.log('[DEBUG] Could not extract domain from email:', user.email);
        return [];
      }
      
      console.log(`[DEBUG] Fetching enrollments for domain: ${domain}`);
      
      // First, get users in this domain
      const { data: domainUsers, error: usersError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email_domain', domain);
      
      if (usersError) {
        console.error('Error fetching domain users:', usersError);
        return [];
      }
      
      if (!domainUsers || domainUsers.length === 0) {
        console.log(`[DEBUG] No users found in domain: ${domain}`);
        return [];
      }
      
      const userIds = domainUsers.map(user => user.id);
      console.log(`[DEBUG] Found ${userIds.length} users in domain`);
      
      // Then fetch enrollments for these users
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles:user_id(id, full_name, email_domain),
          courses:course_id(id, title)
        `)
        .in('user_id', userIds)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching enrollments:', error);
        return [];
      }
      
      console.log(`[DEBUG] Fetched ${data?.length || 0} enrollments for domain ${domain}`);
      
      // Log some sample data for verification
      if (data && data.length > 0) {
        console.log('[DEBUG] Sample enrollment:', {
          id: data[0].id,
          user_id: data[0].user_id,
          course_id: data[0].course_id,
          completed: data[0].completed,
          profile: data[0].profiles,
          course: data[0].courses
        });
      }
      
      return data || [];
    },
    enabled: adminType === 'super_admin' // Only fetch all enrollments for super admins
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
    // Admin information
    adminType,
    managedDomains,
    loadingAdminType,
    loadingDomains,
    
    // User profiles data
    profiles,
    loadingProfiles,
    refreshProfiles,
    canManageUser,
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

// Export the hook separately for Fast Refresh compatibility
export { useAdminData };
