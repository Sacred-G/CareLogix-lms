
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
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
      
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { 
            full_name: fullName,
            is_admin_account: isAdminSignup // This will be used by the database trigger
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
          // Don't show this error to user, they'll still be able to login
        }
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
