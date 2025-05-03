
import { Module } from '../../../courseTypes';

export const professionalGrowthModule: Module = {
  id: 'professional-growth',
  title: 'Professional Growth & Teamwork',
  description: 'Focus on career development and effective team collaboration.',
  content: `
# Professional Growth & Teamwork

## Seeking Help and Using Supervision Effectively

Learn when and how to seek guidance. Supervision is a tool for growth, not a sign of failure.

## Continuing Education and Training

Understand the value of lifelong learning, certifications, and attending workshops to deepen your DSP expertise.

## Team Communication and Conflict Resolution

Practice respectful collaboration. Learn how to resolve disagreements, give/receive feedback, and contribute positively to team morale.
  `,
  questions: [
    {
      id: 'growth-q1',
      question: 'Asking for help from a supervisor is:',
      options: [
        'A sign of poor job performance',
        'Something to avoid whenever possible',
        'A professional way to ensure quality support',
        'Only necessary in emergency situations'
      ],
      correctAnswer: 2,
      explanation: 'Asking for help from supervisors is a professional approach to ensure quality support. It demonstrates commitment to doing the job correctly rather than indicating poor performance.'
    }
  ]
};
