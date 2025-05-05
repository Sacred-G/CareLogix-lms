
import { Course } from '../courseTypes';
import { 
  introModule, 
  dspRoleModule, 
  personFirstModule, 
  communicationModule,
  documentationModule,
  emergencyModule,
  personCenteredModule,
  professionalGrowthModule
} from './developmentalDisabilities/moduleData';

export const developmentalDisabilitiesCourse: Course = {
  id: "developmental-disabilities-micro",
  title: "Understanding Developmental Disabilities (Micro Course)",
  description: "A micro-learning course with practical knowledge about working with individuals with developmental disabilities.",
  category: "Direct Support",
  instructor: "Lisa Chen, M.Ed., Special Education Specialist",
  thumbnail: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=1200",
  duration: "1 hour",
  modules: [
    introModule,
    dspRoleModule,
    personFirstModule,
    communicationModule,
    documentationModule,
    emergencyModule,
    personCenteredModule,
    professionalGrowthModule
  ],
  certificateAvailable: true,
  domain: 'general'
};
