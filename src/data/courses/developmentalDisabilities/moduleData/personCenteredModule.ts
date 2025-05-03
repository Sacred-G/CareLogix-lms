
import { Module } from '../../../courseTypes';

export const personCenteredModule: Module = {
  id: 'person-centered',
  title: 'Person-Centered Support',
  description: 'Deliver support that respects individual preferences and cultural background.',
  content: `
# Person-Centered Support

## Person-Centered Planning

Learn the core principles of tailoring services to the person's vision for their life—not just what others think they need.

## Cultural Competency

Respect diverse backgrounds, identities, family values, and belief systems. Learn how culture influences behavior, communication, and routines.

## Creating Individualized Routines

Collaborate to build daily and weekly structures that reflect each person's preferences, needs, and goals.
  `,
  questions: [
    {
      id: 'pcs-q1',
      question: 'Person-centered support means:',
      options: [
        'Following the support plan exactly as written',
        'Making decisions based on what\'s most efficient',
        'Focusing on the individual\'s preferences, strengths, and goals',
        'Delivering the same support to everyone with the same diagnosis'
      ],
      correctAnswer: 2,
      explanation: 'Person-centered support focuses on the individual\'s preferences, strengths, and goals rather than applying the same approach to everyone or focusing on efficiency alone.'
    }
  ]
};
