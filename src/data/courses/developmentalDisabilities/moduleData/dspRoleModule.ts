
import { Module } from '../../../courseTypes';

export const dspRoleModule: Module = {
  id: 'dsp-role',
  title: 'Role of a Direct Support Professional',
  description: 'Understand your responsibilities and best practices as a DSP.',
  content: `
# Role of a Direct Support Professional (DSP)

## Professional Boundaries and Relationships

Learn how to build respectful, supportive relationships without becoming overinvolved or crossing personal lines. Understand the importance of consistency, respect, and professionalism in daily interactions.

## Health and Safety Protocols

Review hygiene, medication assistance, nutrition, safe transfers, and environmental checks. DSPs are often the first line of defense in preventing injury and illness.

## Confidentiality and HIPAA Compliance

Understand the legal and ethical responsibility to protect personal health information and how to handle sensitive data appropriately.

## Supporting Independence and Self-Determination

Explore ways to encourage choice-making, risk-taking within reason, and helping individuals take charge of their own lives as much as possible.
  `,
  questions: [
    {
      id: 'dsp-q1',
      question: 'Which of the following is NOT a key responsibility of a DSP?',
      options: [
        'Supporting independence',
        'Maintaining confidentiality',
        'Making all decisions for the individual',
        'Following health and safety protocols'
      ],
      correctAnswer: 2,
      explanation: 'DSPs should support individuals to make their own decisions when possible, not make all decisions for them.'
    }
  ]
};
