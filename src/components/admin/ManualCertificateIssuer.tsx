import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Award } from 'lucide-react';
import { createCertificate, saveCertificate } from '@/services/certificateService';
import { toast } from 'sonner'; // Import sonner toast for more visible notifications
import { supabase } from '@/integrations/supabase/client'; // Import Supabase client to check permissions
import { useAuth } from '@/hooks/useAuth';

export default function ManualCertificateIssuer() {
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    courseId: '',
    courseTitle: '',
    courseInstructor: 'Steven Bouldin, SHRM-CP',
    courseDuration: '1 hour',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setDebugInfo('Starting certificate generation...');

    try {
      if (!user || !user.id) {
        throw new Error('You need to be logged in to issue certificates');
      }
      
      console.log('Creating certificate with data:', {
        userId: user.id, // Use the admin's own UUID
        userName: formData.userName,
        courseId: formData.courseId || 'custom-course',
        courseTitle: formData.courseTitle,
        email: formData.userEmail
      });

      // First test if we can write to certificates table
      const testPermission = await supabase
        .from('certificates')
        .select('count()')
        .limit(1);

      if (testPermission.error) {
        console.error('Permission test error:', testPermission.error);
        setDebugInfo(`Database permission error: ${testPermission.error.message}`);
        throw new Error(`Database permission error: ${testPermission.error.message}`);
      }

      // Create the certificate object
      const certificate = createCertificate(
        user.id, // Use the admin's own UUID
        formData.userName,
        {
          id: formData.courseId || 'custom-course',
          title: formData.courseTitle,
          description: 'Custom course completion',
          category: 'Professional Development',
          instructor: formData.courseInstructor,
          thumbnail: '/Images/placeholder-course.png',
          duration: formData.courseDuration,
          modules: [],
          certificateAvailable: true
        },
        formData.userEmail
      );

      console.log('Certificate object created:', certificate);
      setDebugInfo('Certificate object created, saving to database...');
      
      // Try saving the certificate
      const result = await saveCertificate(certificate);
      console.log('Save certificate result:', result);
      
      if (result.success) {
        setDebugInfo(`Success! Certificate ID: ${result.certificateId}`);
        uiToast({
          title: 'Success',
          description: `Certificate issued to ${formData.userName} for ${formData.courseTitle}`,
          variant: 'default'
        });
        
        // Also show a more visible toast
        toast.success(`Certificate issued to ${formData.userName}!`);
        
        // Reset form
        setFormData({
          userName: '',
          userEmail: '',
          courseId: '',
          courseTitle: '',
          courseInstructor: 'Steven Bouldin, SHRM-CP',
          courseDuration: '1 hour',
        });
      } else {
        setDebugInfo('Failed to save certificate, no error details available');
        throw new Error('Failed to save certificate');
      }
    } catch (error: any) {
      console.error('Error issuing certificate:', error);
      setDebugInfo(`Error: ${error.message || 'Unknown error'}`);
      
      uiToast({
        title: 'Error',
        description: `Failed to issue certificate: ${error.message}`,
        variant: 'destructive'
      });
      
      // Also show a more visible toast
      toast.error(`Certificate generation failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 text-slate-100">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Award className="h-5 w-5 text-lms-teal-400" />
          Issue Certificate Manually
        </CardTitle>
        <CardDescription className="text-slate-300">
          Use this form to issue a certificate directly to a user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-slate-200">Recipient Name *</Label>
              <Input
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail" className="text-slate-200">Recipient Email *</Label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="user@example.com"
                required
                className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseTitle" className="text-slate-200">Course Title *</Label>
            <Input
              id="courseTitle"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              placeholder="e.g., Conflict Management & De-Escalation"
              required
              className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseId" className="text-slate-200">Course ID (optional)</Label>
              <Input
                id="courseId"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                placeholder="e.g., conflict-management"
                className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseDuration" className="text-slate-200">Course Duration</Label>
              <Input
                id="courseDuration"
                name="courseDuration"
                value={formData.courseDuration}
                onChange={handleChange}
                placeholder="e.g., 1 hour"
                className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseInstructor" className="text-slate-200">Instructor</Label>
            <Input
              id="courseInstructor"
              name="courseInstructor"
              value={formData.courseInstructor}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-slate-100 focus:border-lms-teal-400"
            />
          </div>

          {debugInfo && (
            <div className="p-3 bg-slate-700 border border-slate-600 rounded text-sm font-mono text-slate-100 overflow-auto max-h-48">
              <div className="font-semibold text-lms-teal-400 mb-1">Debug Info:</div>
              {debugInfo}
            </div>
          )}

          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-lms-teal-600 hover:bg-lms-teal-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Issuing...
                </>
              ) : (
                <>
                  <Award className="mr-2 h-4 w-4" />
                  Issue Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
