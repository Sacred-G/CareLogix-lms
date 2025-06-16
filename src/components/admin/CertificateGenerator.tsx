import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserIcon, BookOpen, Award, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface User {
  user_id: string;
  email: string;
  full_name: string;
  enrolled_courses: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
}

const CertificateGenerator = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  // Debug logging for component state
  useEffect(() => {
    console.log('CertificateGenerator mounted');
    console.log('Initial state:', { 
      loading, 
      users: users.length, 
      courses: courses.length, 
      selectedUser, 
      selectedCourse, 
      generating 
    });
  }, []);

  useEffect(() => {
    console.log('State changed:', { 
      loading, 
      users: users.length, 
      courses: courses.length, 
      selectedUser, 
      selectedCourse, 
      generating 
    });
  }, [loading, users, courses, selectedUser, selectedCourse, generating]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        console.log('Fetching users for certificates...');
        const { data: usersData, error: usersError } = await supabase
          .rpc('list_users_for_certificates');
        
        if (usersError) {
          console.error('Error fetching users:', usersError);
          throw usersError;
        }
        
        console.log('Users data:', usersData);
        
        // Fetch courses
        console.log('Fetching available courses...');
        const { data: coursesData, error: coursesError } = await supabase
          .rpc('list_available_courses');
        
        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
          throw coursesError;
        }

        console.log('Courses data:', coursesData);

        setUsers(usersData || []);
        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateCertificate = async () => {
    console.log('Generate certificate button clicked!');
    console.log('Selected user:', selectedUser);
    console.log('Selected course:', selectedCourse);
    
    if (!selectedUser || !selectedCourse) {
      console.log('Missing user or course selection');
      toast.warning('Please select both a user and a course');
      alert('Please select both a user and a course'); // Fallback alert
      return;
    }

    try {
      setGenerating(true);
      console.log('Starting certificate generation...');
      
      // selectedCourse is now the course title, so we can use it directly
      const courseTitle = selectedCourse;
      
      console.log('Generating certificate for:', { 
        user_email: selectedUser, 
        course_title: courseTitle 
      });

      // Call the RPC function to generate the certificate
      const { data, error } = await supabase
        .rpc('admin_generate_certificate', {
          user_email: selectedUser,
          course_title: courseTitle
        });

      console.log('Certificate generation response:', { data, error });

      if (error) throw error;
      if (!data) throw new Error('No data returned from certificate generation');

      console.log('Certificate generated successfully, navigating...');
      toast.success('Certificate generated successfully!');
      alert('Certificate generated successfully!'); // Fallback alert
      
      // Redirect to the certificate view
      navigate(`/certificates/${data.id}`);
      
    } catch (error: any) {
      console.error('Error generating certificate:', error);
      toast.error(`Failed to generate certificate: ${error.message}`);
      alert(`Failed to generate certificate: ${error.message}`); // Fallback alert
    } finally {
      setGenerating(false);
    }
  };

  const getSelectedUser = () => {
    return users.find(user => user.email === selectedUser);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lms-teal-400"></div>
          <p className="text-slate-400">Loading certificate generator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Certificate Generator Card */}
      <Card className="bg-slate-800 text-slate-100 border-slate-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Award className="h-6 w-6 text-lms-teal-400" />
            Certificate Generator
          </CardTitle>
          <CardDescription className="text-slate-300">
            Generate certificates for enrolled students who have completed their courses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Selection */}
          <div className="space-y-3">
            <Label className="text-slate-200 flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-lms-teal-400" />
              Select User
            </Label>
            <Select
              value={selectedUser || ''}
              onValueChange={(value) => {
                setSelectedUser(value);
                setSelectedCourse(null);
              }}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400">
                <SelectValue placeholder="Choose a user to generate certificate for" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {users.map((user) => (
                  <SelectItem 
                    key={user.email} 
                    value={user.email}
                    className="text-slate-100 focus:bg-slate-600 focus:text-slate-100"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{user.full_name || 'No name'}</span>
                      <span className="text-sm text-slate-400">{user.email}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Course Selection */}
          {selectedUser && (
            <div className="space-y-3">
              <Label className="text-slate-200 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-lms-teal-400" />
                Select Course
              </Label>
              <Select
                value={selectedCourse || ''}
                onValueChange={setSelectedCourse}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400">
                  <SelectValue placeholder="Choose a course the user has completed" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {getSelectedUser()?.enrolled_courses?.map((courseTitle) => {
                    const course = courses.find(c => c.title === courseTitle);
                    return course ? (
                      <SelectItem 
                        key={course.id} 
                        value={courseTitle}
                        className="text-slate-100 focus:bg-slate-600 focus:text-slate-100"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{course.title}</span>
                          <span className="text-sm text-slate-400">{course.description}</span>
                        </div>
                      </SelectItem>
                    ) : null;
                  })}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Generate Button */}
          <div className="pt-4 space-y-3">
            {/* Test button to verify clicks work */}
            <Button
              onClick={() => {
                console.log('Test button clicked!');
                alert('Test button works!');
              }}
              variant="outline"
              className="w-full"
            >
              Test Button (Click to verify buttons work)
            </Button>
            
            <Button
              onClick={handleGenerateCertificate}
              disabled={!selectedUser || !selectedCourse || generating}
              className="w-full bg-lms-teal-600 hover:bg-lms-teal-700 text-white font-medium py-3 text-lg"
              size="lg"
            >
              {generating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating Certificate...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Generate Certificate {!selectedUser || !selectedCourse ? '(Select user and course)' : ''}
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card className="bg-slate-800 text-slate-100 border-slate-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5 text-lms-teal-400" />
            How to Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="font-medium text-lms-teal-400 mt-0.5">1.</span>
              <span>Select a user from the dropdown menu above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-lms-teal-400 mt-0.5">2.</span>
              <span>Choose a course that the user is enrolled in and has completed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-lms-teal-400 mt-0.5">3.</span>
              <span>Click "Generate Certificate" to create the certificate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-lms-teal-400 mt-0.5">4.</span>
              <span>The certificate will open automatically for review and download</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateGenerator;
