import { Course } from '../courseTypes';

export const sexualHarassmentTrainingCourse: Course = {
  id: "sexual-harassment-training",
  title: "Sexual Harassment Prevention Training",
  description: "Mandatory training for all employees on preventing sexual harassment in the workplace. Please select your role to begin.",
  category: "Compliance & Ethics",
  instructor: "HR Department",
  thumbnail: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/Images/sexual.png", // Placeholder - ensure this image exists or update path
  duration: "1-2 hours (depending on role)",
  certificateAvailable: true, // Assuming completion can be tracked or self-attested
  modules: [
    {
      id: "mod-1-role-selection",
      title: "Select Your Role for Training",
      description: "Choose whether you are a supervisor or a non-supervisory employee to access the correct training module.",
      // Custom properties to handle the role selection and iframe URLs
      customModuleType: "roleBasedIframeSelection",
      supervisorIframeUrl: "https://sexual-harassment-prevention-training.calcivilrights.ca.gov/SupervisoryEnglish/story.html",
      nonSupervisorIframeUrl: "https://sexual-harassment-prevention-training.calcivilrights.ca.gov/NonSupervisoryEnglish/story.html",
      content: `
# Sexual Harassment Prevention Training\n\nWelcome to the Sexual Harassment Prevention Training.\n\nThis training is mandatory for all employees and is designed to help you understand, prevent, and address sexual harassment in the workplace.\n\n**Please select your role below to begin the appropriate training module:**\n`,
      // No questions or traditional interactiveScenario for this module type
    }
  ],
};
