
import { Course } from '../../courseTypes';
import { introModule } from './moduleData/introModule';
import { personFirstModule } from './moduleData/personFirstModule';
import { dspRoleModule } from './moduleData/dspRoleModule';
import { documentationModule } from './moduleData/documentationModule';
import { personCenteredModule } from './moduleData/personCenteredModule';
import { communicationModule } from './moduleData/communicationModule';
import { emergencyModule } from './moduleData/emergencyModule';
import { professionalGrowthModule } from './moduleData/professionalGrowthModule';

export const developmentalDisabilitiesCourse: Course = {
  id: 'developmental-disabilities',
  title: 'Understanding Developmental Disabilities',
  description: 'Learn about developmental disabilities, their causes, and effective support strategies.',
  category: 'Direct Support',
  instructor: 'Dr. Emily Chen',
  thumbnail: 'https://placehold.co/600x400/png',
  duration: '6 hours',
  domain: 'general', // Changed from 'healthcare' to 'general' to make it visible to all users
  modules: [
    introModule,
    personFirstModule,
    dspRoleModule,
    documentationModule,
    personCenteredModule,
    communicationModule,
    emergencyModule,
    professionalGrowthModule
  ],
  certificateAvailable: true
};
