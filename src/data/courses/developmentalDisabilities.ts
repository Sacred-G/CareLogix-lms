
import { Course } from '../courseTypes';

export const developmentalDisabilitiesCourse: Course = {
  id: 'developmental-disabilities',
  title: 'Understanding Developmental Disabilities',
  description: 'Learn about developmental disabilities, their causes, and effective support strategies.',
  category: 'Direct Support',
  instructor: 'Dr. Emily Chen',
  thumbnail: 'https://placehold.co/600x400/png',
  duration: '6 hours',
  domain: 'healthcare',
  modules: [
    {
      id: 'dev-disabilities-intro',
      title: 'What Are Developmental Disabilities?',
      description: 'An introduction to developmental disabilities and their impact on daily functioning.',
      content: `
# Understanding Developmental Disabilities

Developmental disabilities are a group of conditions that arise during the developmental period, usually before the age of 22, and result in lifelong physical, learning, language, or behavioral impairments. Each individual is unique, and while diagnoses may carry similarities, support strategies must always be person-centered. 

## Key Topics Covered 

### 1. What Are Developmental Disabilities? 

Developmental disabilities affect day-to-day functioning and typically include impairments in physical, learning, language, or behavior areas. 

These conditions can impact: 

- Communication 
- Social interaction 
- Mobility 
- Independent living 
- Self-care 

They are lifelong but vary widely in severity and type. 

Examples include: 

- Congenital disabilities present at birth (e.g., Cerebral Palsy) 
- Acquired developmental challenges due to early illness, injury, or genetics 

### 2. Common Diagnoses You May Encounter 

**Autism Spectrum Disorder (ASD):** 
- Challenges in communication and social interaction 
- May exhibit repetitive behaviors or intense interests 
- Sensory sensitivities are common 

**Down Syndrome:** 
- Caused by a chromosomal difference (Trisomy 21) 
- Physical traits may include low muscle tone and distinct facial features 
- Usually associated with mild to moderate intellectual disability 

**Intellectual Disability (ID):** 
- Characterized by limitations in intellectual functioning and adaptive behavior 
- Affects reasoning, learning, problem-solving, and everyday social skills 

**Cerebral Palsy (CP):** 
- A group of neurological disorders affecting movement and muscle coordination 
- May involve speech, vision, or cognitive impairments depending on severity 

Note: Each individual presents differently, even within the same diagnosis.
      `,
      videoUrl: 'https://example.com/dev-disabilities-intro',
      audioUrl: 'https://example.com/dev-disabilities-intro-audio',
      transcript: 'Transcript for developmental disabilities introduction',
      questions: [
        {
          id: 'dd-q1',
          question: 'Developmental disabilities typically arise before what age?',
          options: [
            '12 years',
            '18 years',
            '22 years',
            '30 years'
          ],
          correctAnswer: 2,
          explanation: 'Developmental disabilities are conditions that arise during the developmental period, typically before the age of 22.'
        },
        {
          id: 'dd-q2',
          question: 'Which of the following is NOT typically impacted by developmental disabilities?',
          options: [
            'Communication',
            'Social interaction',
            'Financial investments',
            'Self-care'
          ],
          correctAnswer: 2,
          explanation: 'Financial investments are not a typical area impacted by developmental disabilities. The main areas affected include communication, social interaction, mobility, independent living, and self-care.'
        }
      ],
      flashcards: [
        {
          id: 'dd-fc1',
          term: 'Developmental Disability',
          definition: 'A group of conditions that arise during the developmental period (before age 22) resulting in lifelong impairments affecting day-to-day functioning'
        },
        {
          id: 'dd-fc2',
          term: 'Autism Spectrum Disorder',
          definition: 'A developmental disability characterized by challenges in social interaction, communication, and possibly repetitive behaviors or intense interests'
        }
      ]
    },
    {
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
            text: 'Hello there! I'll be working with you today. Do you need special help with anything?',
            isCorrect: false,
            feedback: 'This approach assumes the person needs "special" help which might not be the case.'
          },
          {
            id: 'opt2',
            text: 'Hi, my name is [your name]. It's nice to meet you. What would you like me to call you?',
            isCorrect: true,
            feedback: 'This is a respectful introduction that treats the person as an equal and allows them to introduce themselves on their terms.'
          }
        ]
      }
    },
    {
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
    },
    {
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
    },
    {
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
            'Making decisions based on what's most efficient',
            'Focusing on the individual's preferences, strengths, and goals',
            'Delivering the same support to everyone with the same diagnosis'
          ],
          correctAnswer: 2,
          explanation: 'Person-centered support focuses on the individual's preferences, strengths, and goals rather than applying the same approach to everyone or focusing on efficiency alone.'
        }
      ]
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ],
  certificateAvailable: true
};
