
import { Module } from '../../../courseTypes';

export const communicationModule: Module = {
  id: 'communication-strategies',
  title: 'Communication Strategies',
  description: 'Learn effective communication methods for diverse needs.',
  content: `
# Communication Strategies

## Verbal and Nonverbal Communication

Understand tone, body language, and pacing. Learn how to create an inviting, respectful communication style.

## Augmentative and Alternative Communication (AAC)

Explore tools like picture boards, communication apps, and sign language to support individuals who don't use verbal speech.

## Listening for Understanding & Behavior as Communication

Decode the message behind behaviors. Learn to validate, listen actively, and support emotional expression.
  `,
  questions: [
    {
      id: 'comm-q1',
      question: 'An example of augmentative and alternative communication (AAC) is:',
      options: [
        'Speaking loudly so someone can hear you',
        'Using a communication board with pictures',
        'Writing a detailed incident report',
        'Calling a supervisor for advice'
      ],
      correctAnswer: 1,
      explanation: 'AAC includes methods like communication boards with pictures, which help individuals who may not communicate verbally to express their needs and preferences.'
    }
  ]
};
