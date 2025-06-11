import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { createCertificate, saveCertificate } from '@/services/certificateService';

export default function ManualCertificateIssuer() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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

    try {
      const certificate = createCertificate(
        'manual-issuance', // Special user ID for manual issuance
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

      const result = await saveCertificate(certificate);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: `Certificate issued to ${formData.userName} for ${formData.courseTitle}`,
          variant: 'default'
        });
        
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
        throw new Error('Failed to save certificate');
      }
    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast({
        title: 'Error',
        description: 'Failed to issue certificate. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Certificate Manually</CardTitle>
        <CardDescription>
          Use this form to issue a certificate directly to a user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Recipient Name *</Label>
              <Input
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">Recipient Email *</Label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="user@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseTitle">Course Title *</Label>
            <Input
              id="courseTitle"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              placeholder="e.g., Conflict Management & De-Escalation"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseId">Course ID (optional)</Label>
              <Input
                id="courseId"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                placeholder="e.g., conflict-management"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseDuration">Course Duration</Label>
              <Input
                id="courseDuration"
                name="courseDuration"
                value={formData.courseDuration}
                onChange={handleChange}
                placeholder="e.g., 1 hour"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseInstructor">Instructor</Label>
            <Input
              id="courseInstructor"
              name="courseInstructor"
              value={formData.courseInstructor}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Issuing...
                </>
              ) : (
                'Issue Certificate'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
