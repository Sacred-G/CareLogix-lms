
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileBadge2, Download, Share2 } from 'lucide-react';
import Certificate from './Certificate';
import { Certificate as CertificateType } from '@/data/courseTypes';

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: CertificateType;
}

const CertificateModal = ({ open, onOpenChange, certificate }: CertificateModalProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `${certificate.courseTitle} Certificate - ${certificate.userName}`,
    onAfterPrint: () => {
      toast.success('Certificate downloaded successfully');
    },
    onPrintError: () => {
      toast.error('Failed to download certificate');
    }
  });

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${certificate.courseTitle} Certificate`,
          text: `Check out my certificate for completing ${certificate.courseTitle}!`,
          // In a real app, you'd have a URL to the certificate
          url: window.location.href,
        });
      } else {
        toast('Sharing is not supported on this device');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileBadge2 className="h-5 w-5 text-lms-teal-600" />
            Your Course Certificate
          </DialogTitle>
        </DialogHeader>
        
        <div ref={certificateRef} className="py-2">
          <Certificate certificate={certificate} preview={true} />
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              onClick={handlePrint}
              className="flex-1 sm:flex-none"
              variant="default"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              onClick={handleShare}
              className="flex-1 sm:flex-none"
              variant="outline"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
