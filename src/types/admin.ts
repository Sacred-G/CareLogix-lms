// Admin role types that match our database enum
export type AdminRoleType = 'super_admin' | 'domain_admin' | 'admin' | 'student';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: AdminRoleType;
  email_domain?: string;
  managed_domains?: string[];
  created_at?: string;
  updated_at?: string;
  avatar_url?: string;
  is_locked?: boolean;
  failed_attempts?: number;
}

export interface DomainStats {
  domain: string;
  userCount: number;
  adminCount: number;
  enrollmentCount: number;
  completionRate: number;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalDomains: number;
  totalEnrollments: number;
  domainsStats: DomainStats[];
}

export interface UserCreateRequest {
  email: string;
  full_name: string;
  role: AdminRoleType;
  managed_domains?: string[];
  password: string;
}

export interface UserUpdateRequest {
  id: string;
  full_name?: string;
  email?: string;
  role?: AdminRoleType;
  managed_domains?: string[];
  is_locked?: boolean;
}
