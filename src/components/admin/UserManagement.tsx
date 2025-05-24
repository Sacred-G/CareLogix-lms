import React, { useState } from 'react';
import { Search, Edit, Save, X, LockOpen, Lock, AlertCircle, UserPlus, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  email_domain?: string | null;
  managed_domains?: string[] | null;
  avatar_url: string | null;
  failed_attempts: number;
  is_locked: boolean;
}

interface Enrollment {
  user_id: string;
  [key: string]: any;
}

interface UserManagementProps {
  profiles: Profile[] | null;
  filteredProfiles: Profile[] | null;
  enrollments: Enrollment[] | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loadingProfiles: boolean;
  refetchProfiles: () => void;
  updateUserProfile: any;
  adminType: string | null;
  canManageUser: (userId: string) => Promise<boolean>;
  onCreateUser: () => void;
}

export default function UserManagement({
  profiles,
  filteredProfiles,
  enrollments,
  searchQuery,
  setSearchQuery,
  loadingProfiles,
  refetchProfiles,
  updateUserProfile,
  adminType,
  canManageUser,
  onCreateUser
}: UserManagementProps) {
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      role: 'student',
    }
  });

  // Get badge variant based on role
  const getRoleBadgeVariant = (role: string | null) => {
    switch(role) {
      case 'super_admin': return "destructive";
      case 'domain_admin': return "secondary";
      case 'admin': return "default";
      default: return "outline";
    }
  };
  
  // Format role display name
  const formatRoleName = (role: string | null) => {
    switch(role) {
      case 'super_admin': return "Super Admin";
      case 'domain_admin': return "Domain Admin";
      case 'admin': return "Admin";
      default: return "Student";
    }
  };

  const handleEditClick = (profile: Profile) => {
    setEditingUser(profile);
    form.reset({
      full_name: profile.full_name || '',
      email: profile.email || '',
      role: profile.role || 'student',
    });
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleUnlockAccount = async (userId: string) => {
    try {
      // Use mutation to unlock user account
      await updateUserProfile.mutateAsync({
        id: userId,
        failed_attempts: 0,
        is_locked: false,
      });
      
      toast.success('Account unlocked successfully');
      refetchProfiles();
    } catch (error) {
      console.error('Error unlocking account:', error);
      toast.error('Failed to unlock account');
    }
  };

  const handleSave = async (data: { full_name: string; email: string; role: string }) => {
    if (!editingUser) return;

    try {
      // Use mutation to update user profile
      await updateUserProfile.mutateAsync({
        id: editingUser.id,
        full_name: data.full_name,
        email: data.email,
        role: data.role,
      });
      
      setIsDialogOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error in handleSave:', error);
      // Toast is handled by the mutation
    }
  };
  
  // Check if current admin can manage a user
  const canManageThisUser = (profile: Profile) => {
    if (adminType === 'super_admin') return true;
    if (adminType === 'domain_admin') {
      return profile.role !== 'super_admin' && profile.role !== 'domain_admin';
    }
    if (adminType === 'admin') {
      return profile.role === 'student';
    }
    return false;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all users and their roles</CardDescription>
          </div>
          <Button onClick={onCreateUser} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
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
                  <TableHead>Domain</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles && filteredProfiles.length > 0 ? (
                  filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">{profile.full_name || 'N/A'}</TableCell>
                      <TableCell>{profile.email || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(profile.role)}>
                          {formatRoleName(profile.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>{profile.email_domain || 'N/A'}</TableCell>
                      <TableCell>
                        {enrollments ? 
                          enrollments.filter(e => e.user_id === profile.id).length : 
                          'Loading...'}
                      </TableCell>
                      <TableCell>
                        {profile.is_locked ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Locked
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-500 bg-green-50 border-green-200">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {canManageThisUser(profile) && (
                            <Button
                              onClick={() => handleEditClick(profile)}
                              size="sm"
                              variant="outline"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          )}
                          
                          {profile.is_locked && canManageThisUser(profile) && (
                            <Button
                              onClick={() => handleUnlockAccount(profile.id)}
                              size="sm"
                              variant="outline"
                              className="border-amber-500 text-amber-500 hover:bg-amber-50"
                            >
                              <LockOpen className="h-3 w-3 mr-1" />
                              Unlock
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mb-2" />
                        <p>No users found matching your search criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and role
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Super admin can assign any role */}
                          {adminType === 'super_admin' && (
                            <>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                              <SelectItem value="domain_admin">Domain Admin</SelectItem>
                            </>
                          )}
                          {/* Domain admin can only assign admin or student roles */}
                          {(adminType === 'super_admin' || adminType === 'domain_admin') && (
                            <SelectItem value="admin">Admin</SelectItem>
                          )}
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      {field.value === 'super_admin' ? 'Has access to everything in the system.' :
                       field.value === 'domain_admin' ? 'Can manage all users in their domains.' :
                       field.value === 'admin' ? 'Can manage students within their domain.' :
                       'Regular user with access to courses.'}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
