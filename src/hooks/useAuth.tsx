
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, meta?: { full_name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin account hardcoded credentials
const ADMIN_EMAIL = "steven@jfc-it.com";
const ADMIN_NAME = "Steven Bouldin";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // First set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Special handling for admin account if email is not confirmed
        if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && 
            error.message.includes('not confirmed')) {
          // Try to get the user and admin credentials
          const { data: { users } } = await supabase.auth.admin.listUsers();
          const adminUser = users?.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
          
          if (adminUser) {
            // Update the admin user email to confirmed
            const { error: updateError } = await supabase.auth.admin.updateUserById(
              adminUser.id,
              { email_confirm: true }
            );
            
            if (!updateError) {
              // Try signing in again
              const { error: retryError } = await supabase.auth.signInWithPassword({ 
                email, 
                password 
              });
              
              if (retryError) {
                setError(retryError.message);
              }
            } else {
              setError("Could not confirm admin email. Please check Supabase dashboard.");
            }
          } else {
            setError("Admin account not found. Please sign up first.");
          }
        } else {
          setError(error.message);
        }
      }
    } catch (err) {
      console.error('Error signing in:', err);
      setError('An unexpected error occurred');
    }
  };

  const signUp = async (email: string, password: string, meta?: { full_name?: string }) => {
    try {
      setError(null);
      
      // Check if this is our hardcoded admin account
      const isAdminSignup = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const fullName = isAdminSignup ? ADMIN_NAME : meta?.full_name;
      
      // For admin account, we'll try to do a special handling
      if (isAdminSignup) {
        // Check if admin user already exists but is not verified
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', email.toLowerCase())
          .single();
        
        if (existingUser) {
          // Admin exists but might not be verified - try signing in
          toast.info("Admin account exists. Attempting to sign in.");
          await signIn(email, password);
          return;
        }
      }
      
      // Normal signup flow
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { 
            full_name: fullName,
            is_admin_account: isAdminSignup
          }
        }
      });
      
      if (error) {
        setError(error.message);
        return;
      }
      
      // If this is the admin account, update their role directly
      if (isAdminSignup && data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', data.user.id);
          
        if (profileError) {
          console.error('Error setting admin role:', profileError);
        } else {
          toast.success("Admin account created. You will need to verify your email.");
          toast.info("For testing, you can disable email verification in the Supabase Dashboard.");
        }
      } else {
        toast.success('Account created! Please check your email for verification.');
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setError('An unexpected error occurred');
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) setError(error.message);
    } catch (err) {
      console.error('Error signing out:', err);
      setError('An unexpected error occurred');
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
