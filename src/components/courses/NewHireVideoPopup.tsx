import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Calendar, Info } from 'lucide-react';
import { newHireOrientationCourse } from '@/data/courses/completeDataIndex';

interface NewHireVideoPopupProps {
  // Optional delay before showing the popup (in milliseconds)
  delay?: number;
}

const NewHireVideoPopup: React.FC<NewHireVideoPopupProps> = ({ delay = 1500 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Show the popup after a delay when the component mounts, but only on the Include Me Too domain
  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenNewHirePopup');
    
    // Check if the current domain is "include me too please"
    const currentDomain = window.location.hostname.toLowerCase();
    const isIncludeMeToo = currentDomain.includes('includemetoo') || 
                           currentDomain.includes('include-me-too') || 
                           currentDomain.includes('include me too');
    
    if (!hasSeenPopup && isIncludeMeToo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);

  // Handle closing the popup and remembering the user's choice
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewHirePopup', 'true');
  };

  // Open the video directly instead of navigating to the course page
  const handleViewCourse = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewHirePopup', 'true');
    
    // Open the video directly in a new tab
    window.open('/Videos/Include Me Too Please - New Hire Orientation (1).mp4', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden bg-gradient-to-br from-background to-muted">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Video thumbnail side */}
          <div className="relative group overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${newHireOrientationCourse.thumbnail})`,
                minHeight: '300px'
              }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-all">
                <div className="rounded-full bg-primary/80 p-3 transform group-hover:scale-110 transition-all">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content side */}
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gradient-primary">
                New Hire Orientation
              </DialogTitle>
              <DialogDescription className="text-base font-medium">
                Essential video for all team members
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-4 space-y-4">
              <p className="text-sm">
                This orientation video introduces you to our organization's values, mission, and inclusive approach.
              </p>
              
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="h-4 w-4" />
                <span>{newHireOrientationCourse.duration}</span>
              </div>
              
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-sm">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>
                    All team members are required to watch this orientation video as part of their onboarding process.
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="sm:mr-auto"
              >
                Maybe Later
              </Button>
              
              <Button 
                onClick={handleViewCourse}
                className="gap-2 sm:w-auto w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary"
              >
                <Play className="h-4 w-4" />
                Watch Now
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewHireVideoPopup;
