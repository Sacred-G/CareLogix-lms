import { supabase } from '@/integrations/supabase/client';

export const verifyUserDomainAccess = async (currentUserId: string, targetUserId: string): Promise<boolean> => {
  try {
    // If checking the same user, allow access
    if (currentUserId === targetUserId) return true;

    // Get both users' profiles with their email domains
    const { data: users, error } = await supabase
      .from('profiles')
      .select('id, email')
      .in('id', [currentUserId, targetUserId]);

    if (error || !users || users.length !== 2) {
      console.error('Error verifying domain access:', error);
      return false;
    }

    const currentUser = users.find(u => u.id === currentUserId);
    const targetUser = users.find(u => u.id === targetUserId);

    // If either user doesn't exist, deny access
    if (!currentUser || !targetUser) {
      console.warn('One or both users not found');
      return false;
    }

    // Extract domains from emails
    const currentDomain = getUserDomain(currentUser.email);
    const targetDomain = getUserDomain(targetUser.email);

    // If domains match, allow access
    if (currentDomain && currentDomain === targetDomain) {
      return true;
    }

    console.warn(`Domain access denied: User ${currentUserId} (${currentDomain}) cannot access data for user ${targetUserId} (${targetDomain})`);
    return false;
  } catch (error) {
    console.error('Error in verifyUserDomainAccess:', error);
    return false;
  }
};

// Function to extract domain from email
export const getUserDomain = (email: string | undefined | null): string | null => {
  if (!email) return null;
  const parts = email.trim().toLowerCase().split('@');
  return parts.length === 2 ? parts[1] : null;
};

// Function to verify if a user can access a certificate based on domain
export const verifyCertificateAccess = async (currentUserId: string, certificateId: string): Promise<boolean> => {
  try {
    if (!currentUserId || !certificateId) return false;

    // Get the certificate with the organization_domain and user_id
    const { data: certificate, error } = await supabase
      .from('certificates')
      .select('user_id, organization_domain')
      .eq('id', certificateId)
      .single();

    if (error || !certificate) {
      console.error('Certificate not found:', error);
      return false;
    }

    // If user is the owner, allow access
    if (certificate.user_id === currentUserId) {
      return true;
    }

    // Get the current user's email
    const { data: currentUser, error: userError } = await supabase.auth.getUser();
    
    if (userError || !currentUser?.user?.email) {
      console.error('Error getting current user:', userError);
      return false;
    }

    // Get the certificate owner's email
    const { data: ownerUser } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', certificate.user_id)
      .single();

    if (!ownerUser?.email) {
      console.error('Certificate owner not found');
      return false;
    }

    const currentUserDomain = getUserDomain(currentUser.user.email);
    const ownerDomain = getUserDomain(ownerUser.email);
    
    // Allow access if domains match
    return currentUserDomain === ownerDomain;
  } catch (error) {
    console.error('Error in verifyCertificateAccess:', error);
    return false;
  }
};
