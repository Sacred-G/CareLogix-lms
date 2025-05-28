import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Profile() {
  const navigate = useNavigate();
  const { user, session, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  
  // Progress data
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!session) {
      navigate('/auth');
    }
  }, [session, navigate]);
  
  // Fetch user profile data
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
      fetchUserEnrollments(user.id);
      fetchUserAchievements(user.id);
    }
    // Set email from user object directly as it's not in profiles table
    if (user?.email) {
      // No need to set email state, as it's disabled and comes from auth.user
    }
  }, [user]);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setFullName(data.full_name || '');
        setAvatar(data.avatar_url);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setError(error.message);
    }
  };
  
  const fetchUserEnrollments = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses:course_id(id, title, thumbnail)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      
      if (data) {
        setEnrollments(data);
      }
    } catch (error: any) {
      console.error('Error fetching enrollments:', error);
    }
  };
  
  const fetchUserAchievements = async (userId: string) => {
    // Mock achievements for now - in a real app we'd fetch from a database table
    setAchievements([
      { id: 1, title: 'First Login', description: 'Logged in for the first time', date: '2023-05-01' },
      { id: 2, title: 'Course Started', description: 'Started your first course', date: '2023-05-02' }
    ]);
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          // avatar_url will be updated separately when handling file uploads
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-include-glow text-foreground">
      <Header />
      
      <main className="flex-1 bg-muted/30 py-10">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="w-24 h-24 mb-4">
                      {avatar ? (
                        <AvatarImage src={avatar} alt={fullName} />
                      ) : (
                        <AvatarFallback>{fullName ? getInitials(fullName) : 'U'}</AvatarFallback>
                      )}
                    </Avatar>
                    <h2 className="text-xl font-semibold">{fullName}</h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <div className="mt-2">
                      <Badge>Student</Badge>
                    </div>
                  </div>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-6">
                  <TabsTrigger value="progress">Course Progress</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="progress">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Courses</CardTitle>
                      <CardDescription>Track your progress across all courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {enrollments.length > 0 ? (
                        <div className="space-y-6">
                          {enrollments.map((enrollment) => (
                            <div key={enrollment.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">{enrollment.courses?.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {enrollment.progress}% complete
                                  </p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/courses/${enrollment.course_id}`)}
                                >
                                  Continue
                                </Button>
                              </div>
                              <Progress value={enrollment.progress} className="h-2" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Achievements</CardTitle>
                      <CardDescription>Celebrate your learning milestones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {achievements.length > 0 ? (
                        <ul className="space-y-4">
                          {achievements.map((achievement) => (
                            <li key={achievement.id} className="flex items-center space-x-4">
                              <span className="text-2xl">🏆</span>
                              <div>
                                <div className="font-semibold">{achievement.title}</div>
                                <div className="text-sm text-muted-foreground">{achievement.description}</div>
                                <div className="text-xs text-muted-foreground">{achievement.date}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No achievements yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
