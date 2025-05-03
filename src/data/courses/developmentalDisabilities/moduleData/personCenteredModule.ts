
import { Module } from '../../../courseTypes';

export const personCenteredModule: Module = {
  id: 'person-centered',
  title: 'Person-Centered Planning',
  description: 'Apply person-centered approaches to support planning.',
  content: `
# Person-Centered Planning

## What is Person-Centered Planning?

An approach that places the individual at the center of their support plan. It focuses on strengths, preferences, and goals rather than deficits and diagnoses.

## Elements of Person-Centered Planning

Includes the individual as an active participant in planning, utilizes natural supports (friends, family, community), documents preferences, sets measurable goals, and regularly reviews progress.

## Using Person-Centered Language

Replace deficit-focused language with strength-based words. Examples: "Challenges with" vs. "Unable to", "Needs support with" vs. "Can't do", "Prefers" vs. "Non-compliant"
  `,
  questions: [
    {
      id: 'person-q1',
      question: 'Person-centered planning is primarily about:',
      options: [
        'Following the support plan exactly as written',
        'Making decisions based on what\'s most efficient',
        'Focusing on the individual\'s preferences, strengths, and goals',
        'Delivering the same support to everyone with the same diagnosis'
      ],
      correctAnswer: 2,
      explanation: 'Person-centered planning is about focusing on the individual\'s preferences, strengths, and goals. It recognizes each person as unique with their own desires and capabilities rather than taking a one-size-fits-all approach.'
    }
  ]
};
