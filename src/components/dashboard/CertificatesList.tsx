
import React from 'react';
import { Link } from 'react-router-dom';
import { FileBadge2, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Certificate } from '@/data/courseTypes';

interface CertificatesListProps {
  certificates: Certificate[];
  loading?: boolean;
}

const CertificatesList = ({ certificates, loading = false }: CertificatesListProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (certificates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground mb-6">
              Complete a course to earn your first certificate!
            </p>
            <Button asChild variant="outline">
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Certificates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <div 
              key={certificate.id} 
              className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <FileBadge2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{certificate.courseTitle}</h4>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> 
                    Issued on {format(new Date(certificate.issueDate), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="ghost" asChild>
                <Link to={`/certificates/${certificate.id}`}>View</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatesList;
