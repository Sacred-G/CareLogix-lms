import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button, Card, Select, Spin, message, Typography } from 'antd';
import type { SelectProps } from 'antd';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const { data: usersData, error: usersError } = await supabase
          .rpc('list_users_for_certificates');
        
        if (usersError) throw usersError;
        
        // Fetch courses
        const { data: coursesData, error: coursesError } = await supabase
          .rpc('list_available_courses');
        
        if (coursesError) throw coursesError;

        setUsers(usersData || []);
        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateCertificate = async () => {
    if (!selectedUser || !selectedCourse) {
      message.warning('Please select both a user and a course');
      return;
    }

    try {
      setGenerating(true);
      
      // Find the course title
      const course = courses.find(c => c.id === selectedCourse);
      if (!course) {
        throw new Error('Selected course not found');
      }

      // Call the RPC function to generate the certificate
      const { data, error } = await supabase
        .rpc('admin_generate_certificate', {
          user_email: selectedUser,
          course_title: course.title
        });

      if (error) throw error;
      if (!data) throw new Error('No data returned from certificate generation');

      message.success('Certificate generated successfully!');
      
      // Redirect to the certificate view
      navigate(`/certificates/${data.id}`);
      
    } catch (error: any) {
      console.error('Error generating certificate:', error);
      message.error(`Failed to generate certificate: ${error.message}`);
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
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Title level={2} className="mb-6">Certificate Generator</Title>
      
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <Text strong className="block mb-2">
              <UserOutlined className="mr-2" />
              Select User
            </Text>
            <Select
              showSearch
              placeholder="Select a user"
              optionFilterProp="children"
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                String(option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                setSelectedUser(value);
                setSelectedCourse(null);
              }}
            >
              {users.map((user) => (
                <Option key={user.email} value={user.email}>
                  {user.full_name || 'No name'} - {user.email}
                </Option>
              ))}
            </Select>
          </div>

          {selectedUser && (
            <div>
              <Text strong className="block mb-2">
                <BookOutlined className="mr-2" />
                Select Course
              </Text>
              <Select
                showSearch
                placeholder="Select a course"
                optionFilterProp="children"
                style={{ width: '100%' }}
                disabled={!selectedUser}
                filterOption={(input, option) =>
                  String(option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => setSelectedCourse(value)}
              >
                {getSelectedUser()?.enrolled_courses?.map((courseTitle) => {
                  const course = courses.find(c => c.title === courseTitle);
                  return course ? (
                    <Option key={course.id} value={course.title}>
                      {course.title}
                    </Option>
                  ) : null;
                })}
              </Select>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Button
            type="primary"
            size="large"
            onClick={handleGenerateCertificate}
            loading={generating}
            disabled={!selectedUser || !selectedCourse}
            block
          >
            {generating ? 'Generating...' : 'Generate Certificate'}
          </Button>
        </div>
      </Card>

      <div className="bg-blue-50 p-4 rounded-md">
        <Title level={4} className="mt-0">How to use:</Title>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select a user from the dropdown menu</li>
          <li>Choose a course that the user is enrolled in</li>
          <li>Click "Generate Certificate"</li>
          <li>The certificate will open in a new tab</li>
        </ol>
      </div>
    </div>
  );
};

export default CertificateGenerator;
