
import { Module } from '../../../courseTypes';

export const personFirstModule: Module = {
  id: 'person-first-language',
  title: 'Person-First Language & Respectful Communication',
  description: 'Learn about respectful communication and the importance of person-first language.',
  content: `
# Person-First Language & Respectful Communication

## What is Person-First Language?

Person-first language focuses on the individual, not the diagnosis (e.g., "a person with autism" vs. "an autistic person"). It demonstrates dignity and acknowledges that disability is only one part of a person's identity.

## Why It Matters

- Promotes respect and inclusion
- Reduces stigma and labels
- Builds stronger, more positive relationships

## Helpful Tips

- Always speak directly to the individual, not just to their caregiver
- Use calm, patient, and clear communication
- Respect nonverbal communication styles or alternative methods (e.g., communication boards, devices)
  `,
  videoUrl: 'https://example.com/person-first-language',
  questions: [
    {
      id: 'pfl-q1',
      question: 'Which of the following is an example of person-first language?',
      options: [
        'An autistic person',
        'A wheelchair-bound individual',
        'A person with autism',
        'A disabled person'
      ],
      correctAnswer: 2,
      explanation: 'Person-first language puts the person before the disability, as in "a person with autism" rather than "an autistic person."'
    }
  ],
  interactiveScenario: {
    title: 'Communication Scenario',
    description: 'Practice using person-first language in a support scenario',
    type: 'multiple-choice',
    content: 'You are meeting someone with a developmental disability for the first time. How would you best introduce yourself?',
    options: [
      {
        id: 'opt1',
        text: "Hello there! I will be working with you today. Do you need special help with anything?",
        isCorrect: false,
        feedback: 'This approach assumes the person needs "special" help which might not be the case.'
      },
      {
        id: 'opt2',
        text: "Hi, my name is [your name]. It is nice to meet you. What would you like me to call you?",
        isCorrect: true,
        feedback: 'This is a respectful introduction that treats the person as an equal and allows them to introduce themselves on their terms.'
      }
    ]
  }
};
