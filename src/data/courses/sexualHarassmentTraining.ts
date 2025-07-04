import { Course, Module } from '../courseTypes';

const SEXUAL_HARASSMENT_MODULE_ID = 'mod-1-role-selection';

export const sexualHarassmentTrainingCourse: Course = {
  id: "sexual-harassment-training",
  title: "Sexual Harassment Prevention Training",
  description: "Mandatory training for all employees on preventing sexual harassment in the workplace. Please select your role to begin.",
  category: "Compliance & Ethics",
  instructor: "HR Department",
  thumbnail: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/Images/sexual.png",
  duration: "1-2 hours (depending on role)",
  certificateAvailable: true,
  modules: [
    {
      id: SEXUAL_HARASSMENT_MODULE_ID,
      title: "Sexual Harassment Prevention Training",
      description: "Complete the training and mark as completed when finished.",
      customModuleType: "roleBasedIframeSelection",
      supervisorIframeUrl: "https://sexual-harassment-prevention-training.calcivilrights.ca.gov/SupervisoryEnglish/story.html",
      nonSupervisorIframeUrl: "https://sexual-harassment-prevention-training.calcivilrights.ca.gov/NonSupervisoryEnglish/story.html",
      content: `
# Sexual Harassment Prevention Training\n\nThis training is mandatory for all employees and is designed to help you understand, prevent, and address sexual harassment in the workplace.\n\n**Please select your role below to begin the appropriate training module:**\n`,
      // Add instructions for completion
      completionInstructions: `
## Completing Your Training

After you have finished the training in the window above, please click the button below to mark this training as complete.\n\n**Note:** You may be asked to provide a completion certificate or other proof of completion to your supervisor.`
    } as Module & { 
      customModuleType: string;
      supervisorIframeUrl: string;
      nonSupervisorIframeUrl: string;
      completionInstructions?: string;
    },
  ],
};
