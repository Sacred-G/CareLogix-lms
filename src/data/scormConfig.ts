// This file provides direct configuration for SCORM modules
// without requiring Supabase database entries

export interface DirectScormModule {
  id: string;
  title: string;
  description: string;
  path: string;  // Path to the SCORM content
  courseId: string;  // The course this SCORM module belongs to
  moduleId?: string;  // The module within the course this SCORM module should be displayed in
}

// Add your SCORM modules here with their paths
export const directScormModules: DirectScormModule[] = [
  {
    id: 'scorm-empathy',
    title: 'Foundations of Empathetic Communication',
    description: 'Interactive training on effective empathetic communication techniques',
    path: 'https://scorm-neon.vercel.app/Foundations%20of%20Empathetic%20Communication/training.htm',
    courseId: 'communication-empathy',
    moduleId: 'mod-1'  // First module in Communication and Empathy course
  },
  {
    id: 'scorm-medication',
    title: 'Medication Administration',
    description: 'Interactive training on safe medication administration practices',
    path: 'https://scorm-neon.vercel.app/Medication_Administration/training.htm',
    courseId: 'medication-admin',
    moduleId: 'mod-1'  // First module in Medication Administration course
  },
  {
    id: 'scorm-transport',
    title: 'Transportation Safety & Procedures',
    description: 'Interactive training on transportation safety for support professionals',
    path: 'https://scorm-neon.vercel.app/Transportation%20Safety%20&%20Procedures%202/training.htm',
    courseId: 'transportation',
    moduleId: 'mod-1'  // First module in Transportation course
  },
  {
    id: 'scorm-documentation',
    title: 'Documentation Training',
    description: 'Interactive training on effective documentation practices',
    path: 'https://scorm-neon.vercel.app/Documentation%20&%20Administrative%20Tasks%202/training.htm',
    courseId: 'documentation-visits',
    moduleId: 'mod-1'  // First module in Documentation course
  },
  {
    id: 'scorm-incident',
    title: 'Incident Reporting',
    description: 'Interactive training on proper incident reporting procedures',
    path: 'https://scorm-neon.vercel.app/Incident%20Reporting/training.htm',
    courseId: 'emergency-preparedness',
    moduleId: 'mod-1'  // First module in Emergency Preparedness course
  },
  {
    id: 'scorm-dev-disabilities',
    title: 'Introduction to Developmental Disabilities Interactive',
    description: 'Interactive learning module for understanding developmental disabilities',
    path: 'https://imtp.vercel.app/',
    courseId: 'intro-dev-disabilities',
    moduleId: 'mod-1'  // First module in Intro to Developmental Disabilities course
  },
  {
    id: 'scorm-risk',
    title: 'Risk Management for DSPs',
    description: 'Interactive training on risk management for Direct Support Professionals',
    path: 'https://scorm-neon.vercel.app/Risk%20Management%20for%20DSPs/training.htm',
    courseId: 'emergency-preparedness',
    moduleId: 'mod-1'  // Also in Emergency Preparedness as it's related to risk management
  },
  {
    id: 'scorm-core-skills',
    title: 'Core Support Skills',
    description: 'Interactive training on fundamental skills for support professionals',
    path: 'https://scorm-neon.vercel.app/Core%20Support%20Skills/training.htm',
    courseId: 'core-skills',
    moduleId: 'mod-1'  // Moved to its own course
  }
  // Additional modules can be added here if needed
];

// Create a map for easy lookup by courseId and moduleId
export const scormModulesByCourse: Record<string, DirectScormModule[]> = {};

// Populate the map
directScormModules.forEach(module => {
  // Create a combined key of courseId and moduleId if moduleId exists
  const courseKey = module.moduleId ? `${module.courseId}_${module.moduleId}` : module.courseId;
  
  if (!scormModulesByCourse[courseKey]) {
    scormModulesByCourse[courseKey] = [];
  }
  scormModulesByCourse[courseKey].push(module);
});
