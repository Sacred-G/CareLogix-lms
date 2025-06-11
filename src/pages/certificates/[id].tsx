import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Spin, Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

interface Certificate {
  id: string;
  user_name: string;
  course_title: string;
  issue_date: string;
  certificate_number: string;
  valid_until?: string;
  organization_name?: string;
  organization_logo?: string;
}

const CertificateViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Certificate not found');

        setCertificate(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching certificate:', err);
        setError(err.message || 'Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Result
          status="error"
          title="Certificate Not Found"
          subTitle={error || 'The requested certificate could not be found.'}
          extra={
            <Button 
              type="primary" 
              icon={<HomeOutlined />} 
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
          <p className="text-gray-600">This certificate is awarded to</p>
          <h2 className="text-4xl font-bold my-4">{certificate.user_name}</h2>
          <p className="text-lg">for successfully completing the course</p>
          <h3 className="text-2xl font-semibold my-2">{certificate.course_title}</h3>
          
          <div className="mt-8 flex justify-between">
            <div className="text-left">
              <p className="font-semibold">Issued on:</p>
              <p>{new Date(certificate.issue_date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Certificate ID:</p>
              <p>{certificate.certificate_number}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-gray-200 text-center">
          <Button 
            type="primary" 
            onClick={() => window.print()}
            className="print:hidden"
          >
            Print Certificate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;
