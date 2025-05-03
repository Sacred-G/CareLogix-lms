
import { Module } from '../../../courseTypes';

export const introModule: Module = {
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
};
