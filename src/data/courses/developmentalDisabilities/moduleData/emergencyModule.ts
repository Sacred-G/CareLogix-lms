
import { Module } from '../../../courseTypes';

export const emergencyModule: Module = {
  id: 'emergency-response',
  title: 'Emergency Response and Crisis Management',
  description: 'Be prepared to respond effectively in emergency situations.',
  content: `
# Emergency Response and Crisis Management

## De-Escalation Techniques

Identify triggers, practice calm responses, and use non-threatening body language to help individuals regulate their emotions.

## Responding to Medical Emergencies

Basics of seizure response, choking protocol, falls, and when to call 911. Know your role until first responders arrive.

## Abuse/Neglect Identification and Mandated Reporting

Learn how to identify signs of physical, emotional, or financial abuse and neglect. Know your duty and reporting process under the law.
  `,
  questions: [
    {
      id: 'emerg-q1',
      question: 'During a de-escalation situation, you should:',
      options: [
        'Raise your voice to establish control',
        'Keep your body language calm and non-threatening',
        'Bring in as many staff as possible to help',
        'Tell the person to calm down immediately'
      ],
      correctAnswer: 1,
      explanation: 'During de-escalation, keeping your body language calm and non-threatening is important to avoid further agitating the person.'
    }
  ]
};
