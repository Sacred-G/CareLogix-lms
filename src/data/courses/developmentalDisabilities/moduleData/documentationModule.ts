
import { Module } from '../../../courseTypes';

export const documentationModule: Module = {
  id: 'documentation',
  title: 'Daily Documentation and Reporting',
  description: 'Learn the importance of accurate documentation in providing quality care.',
  content: `
# Daily Documentation and Reporting

## Writing Daily Logs and Service Notes

Discover how to write clearly, using objective language that captures events and supports accountability. Includes do's and don'ts for documentation.

## Special Incident Reporting (SIR)

Understand what qualifies as a reportable incident, timelines, and how to report incidents with clarity and urgency.

## Data Collection for Goals and Progress

Learn how to track progress toward ISP/IPP goals with consistency, and how your notes contribute to care planning and service justification.
  `,
  questions: [
    {
      id: 'doc-q1',
      question: 'When writing documentation, you should:',
      options: [
        'Use subjective opinions to describe behaviors',
        'Use objective, factual language',
        'Wait until the end of the week to complete all notes',
        'Only document unusual incidents'
      ],
      correctAnswer: 1,
      explanation: 'Documentation should use objective, factual language that describes what happened without personal opinions or judgments.'
    }
  ]
};
