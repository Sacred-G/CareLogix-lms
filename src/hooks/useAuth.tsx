
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null; // Added session property
  loading: boolean;
  error: string | null; // Added error property
  signIn: (email: string, password: string) => Promise<void>;
  // Microsoft login removed
  signUp: (email: string, password: string, fullName: string) => Promise<void>; // Fixed signUp parameters
  signOut: () => Promise<void>;
  updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        setSession(data.session);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setSession(session);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null); // Clear any previous errors
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setError(error.message);
        throw error;
      }

      if (data.user) {
        toast.success('Signed in successfully');
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Error signing in');
      toast.error(error.message || 'Error signing in');
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setError(null); // Clear any previous errors
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        setError(error.message);
        throw error;
      }

      if (data && data.user) {
        // Create a profile entry with the user's role
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            email: email,
            role: email.includes('admin') ? 'admin' : 'student',
            failed_attempts: 0,
            is_locked: false
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          toast.error('Account created but profile setup failed.');
        } else {
          toast.success('Account created successfully! Please check your email to confirm your account.');
        }
        navigate('/auth');
      }
    } catch (error: any) {
      setError(error.message || 'Error creating account');
      toast.error(error.message || 'Error creating account');
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };

  const updateProfile = async (data: { full_name?: string; avatar_url?: string }) => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Update auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: data.full_name,
          avatar_url: data.avatar_url
        }
      });

      if (updateError) {
        throw updateError;
      }

      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          avatar_url: data.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
    }
  };

  // Microsoft login functionality removed

  const value = {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
