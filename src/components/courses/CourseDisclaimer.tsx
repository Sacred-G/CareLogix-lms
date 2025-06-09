import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface CourseDisclaimerProps {
  onDismiss: () => void;
}

export function CourseDisclaimer({ onDismiss }: CourseDisclaimerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
      <Card className="w-full max-w-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
          onClick={onDismiss}
          aria-label="Close disclaimer"
        >
          <X className="h-5 w-5" />
        </Button>
        <CardContent className="p-6 pt-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Important Note</h3>
            <div className="prose prose-sm text-muted-foreground">
              <p>
                Throughout this training, the terms <strong>Support Staff</strong> and <strong>Direct Support Professional (DSP)</strong> are used interchangeably.
              </p>
              <p className="mt-2">
                While California regulations draw formal distinctions between job classifications, every concept, skill, and policy covered here applies to anyone providing direct or indirect support in a supportive-living setting.
              </p>
            </div>
            <div className="pt-2">
              <Button onClick={onDismiss} className="w-full sm:w-auto">
                I Understand
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
