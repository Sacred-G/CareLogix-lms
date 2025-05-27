import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { AdminRoleType } from '@/types/admin';
import { toast } from 'sonner';

// Define the schema for the form
const userFormSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(['super_admin', 'domain_admin', 'admin', 'student'] as const),
  managed_domains: z.array(z.string()).optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface CreateUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  createUser: (data: UserFormValues) => Promise<void>;
  adminType: AdminRoleType | null;
  availableDomains: string[];
  managedDomains: string[];
}

export default function CreateUserForm({
  isOpen,
  onClose,
  createUser,
  adminType,
  availableDomains,
  managedDomains
}: CreateUserFormProps) {
  // Initialize the form
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      role: 'student',
      managed_domains: [],
      password: ''
    }
  });

  // Submit handler
  const onSubmit = async (data: UserFormValues) => {
    try {
      await createUser(data);
      form.reset();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Error creating user');
    }
  };

  // Generate a random password for the user
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    let password = "";
    
    // Ensure at least one of each required character type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    password += "0123456789"[Math.floor(Math.random() * 10)];
    password += "!@#$%^&*()-_=+"[Math.floor(Math.random() * 14)];
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    form.setValue('password', password);
  };

  // Determine available roles based on admin type
  const getAvailableRoles = () => {
    if (adminType === 'super_admin') {
      return [
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'domain_admin', label: 'Domain Admin' },
        { value: 'admin', label: 'Admin' },
        { value: 'student', label: 'Student' }
      ];
    } else if (adminType === 'domain_admin') {
      return [
        { value: 'admin', label: 'Admin' },
        { value: 'student', label: 'Student' }
      ];
    } else {
      return [
        { value: 'student', label: 'Student' }
      ];
    }
  };

  // Handle domain selection based on role
  const handleRoleChange = (role: string) => {
    if (role !== 'domain_admin') {
      form.setValue('managed_domains', []);
    }
  };

  // Get available domains based on admin type - ensure we always have arrays
  const domainOptions = adminType === 'super_admin'
    ? (Array.isArray(availableDomains) ? availableDomains : []).map(domain => ({ label: domain, value: domain }))
    : (Array.isArray(managedDomains) ? managedDomains : []).map(domain => ({ label: domain, value: domain }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to the system. They will receive an email to set their password.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The domain will determine which organization they belong to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRoleChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getAvailableRoles().map(role => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value === 'super_admin' ? 'Has access to everything in the system.' :
                     field.value === 'domain_admin' ? 'Can manage all users in selected domains.' :
                     field.value === 'admin' ? 'Can manage students within their domain.' :
                     'Regular user with access to courses.'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Managed Domains (only for domain admins) */}
            {form.watch('role') === 'domain_admin' && (
              <FormField
                control={form.control}
                name="managed_domains"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Managed Domains</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={domainOptions || []}
                        selected={Array.isArray(field.value) && field.value ? field.value.map(domain => ({ label: domain, value: domain })) : []}
                        onChange={(selected) => {
                          // Ensure selected is an array before mapping
                          const safeSelected = Array.isArray(selected) ? selected : [];
                          field.onChange(safeSelected.map(item => item.value));
                        }}
                        placeholder="Select domains to manage"
                      />
                    </FormControl>
                    <FormDescription>
                      The domains this admin will be able to manage.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" onClick={generatePassword}>
                      Generate
                    </Button>
                  </div>
                  <FormDescription>
                    Password must be at least 8 characters with uppercase, lowercase, and numbers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
