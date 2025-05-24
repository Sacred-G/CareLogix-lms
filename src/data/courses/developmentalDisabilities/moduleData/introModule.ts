
import { Module } from '../../../courseTypes';

export const introModule: Module = {
  id: 'dev-disabilities-intro',
  title: 'What Are Developmental Disabilities?',
  description: 'An introduction to developmental disabilities and their impact on daily functioning.',
  videoUrl: 'https://youtu.be/wZ8xYYJvl4k',  // Main course overview video
  content: `
# Understanding Developmental Disabilities

Developmental disabilities are a group of conditions that arise during the developmental period, usually before the age of 22, and result in lifelong physical, learning, language, or behavioral impairments. Each individual is unique, and while diagnoses may carry similarities, support strategies must always be person-centered.

## What Are Developmental Disabilities?

Developmental disabilities are lifelong conditions that emerge in childhood and impact learning, behavior, or physical development. They are not considered illnesses to be cured but rather differences to be understood and supported. These disabilities can affect various areas such as:

- Communication
- Social interaction
- Mobility
- Independent living
- Self-care

These conditions usually appear before age 22 during crucial years of growth, and early intervention can significantly impact a person's potential. They vary widely in severity and type, with some individuals requiring minimal support and others needing more comprehensive assistance.

Examples include:
- Congenital disabilities present at birth (e.g., Cerebral Palsy)
- Acquired developmental challenges due to early illness, injury, or genetics

## Common Types of Developmental Disabilities

**Autism Spectrum Disorder (ASD):**
- Uniquely affects communication and social interaction
- May exhibit repetitive behaviors or intense interests
- Sensory sensitivities are common

**Down Syndrome:**
- Caused by a chromosomal difference (Trisomy 21)
- Physical traits may include low muscle tone and distinct facial features
- Usually associated with mild to moderate intellectual disability
- Individuals often have unique strengths in social interaction

**Intellectual Disability (ID):**
- Characterized by limitations in intellectual functioning and adaptive behavior
- Affects reasoning, learning, problem-solving, and everyday social skills
- Involves a range of cognitive challenges affecting learning, communication, or daily living

**Cerebral Palsy (CP):**
- A group of neurological disorders affecting movement and muscle coordination
- May involve speech, vision, or cognitive impairments depending on severity
- Impacts muscle movement and coordination

Note: A diagnosis does not define a person. Each individual has unique strengths and potential, and presents differently even within the same diagnosis.

## The Role of Direct Support Professionals (DSPs)

A Direct Support Professional (DSP) plays a multifaceted role in the lives of individuals with developmental disabilities. DSPs are:

- **Supporters** providing practical assistance with daily living tasks such as personal care, meal preparation, medication management, and household chores
- **Teachers** helping individuals learn new skills and navigate their environments
- **Advocates** ensuring individuals' rights are respected and their voices are heard
- **Mentors** guiding individuals in developing social skills and community connections

The DSP role extends significantly beyond basic care, encompassing:
- Fostering independence
- Promoting social inclusion
- Teaching new skills
- Advocating for the individual's rights and well-being
- Building meaningful relationships based on trust and respect

DSPs are integral in empowering individuals to achieve their dreams and live fulfilling lives.

## Guiding Principles of Quality Support

### Person-Centeredness
Person-centeredness moves away from a one-size-fits-all approach and recognizes the unique strengths, interests, and dreams of each individual. It involves:
- Truly understanding and valuing each person
- Actively listening to their needs
- Respecting their choices
- Empowering them to participate in decisions about their lives

### Inclusion
Inclusion is a fundamental human right that ensures individuals have the opportunity to participate fully in all aspects of community life, including:
- Education
- Employment
- Recreation
- Civic engagement
- Social relationships

### Self-Determination
Self-determination is the inherent right of every individual to make choices and have control over the decisions that affect them. Supporting self-determination means providing:
- Necessary support and resources
- Opportunities to make choices
- Respect for preferences
- Development of decision-making skills

## Historical Evolution of Support

Historically, individuals with developmental disabilities were often placed in large institutions focused on custodial care, leading to isolation and a lack of autonomy. Advocacy and increased awareness in the 1960s and 70s led to a shift towards:

- Community-based support
- Deinstitutionalization
- Recognition of the rights of individuals with disabilities to live in their communities
- Promotion of independence and belonging

Laws like the Americans with Disabilities Act further advanced inclusion and equal rights, emphasizing person-centered care and challenging the segregation of the past.

## Challenging Myths and Stereotypes

Common myths and stereotypes about people with developmental disabilities include the belief that they:
- Cannot learn or grow
- Cannot live independently
- Cannot work or contribute to society
- Cannot achieve significant life milestones

These misconceptions are untrue. With appropriate support, individuals with developmental disabilities can:
- Learn throughout life
- Live independently
- Contribute to the workforce
- Achieve significant personal milestones

As a DSP, it's important to challenge these stereotypes, advocate for inclusion, promote accurate information, and focus on abilities rather than limitations.

## The Importance of Teamwork and Communication

Supporting individuals with developmental disabilities is a collaborative effort involving:
- Family members
- Healthcare professionals
- Educators
- Direct Support Professionals
- Other support team members

Effective teamwork relies on open, honest, and consistent communication to ensure everyone is working towards the same goals and responding to the individual\'s evolving needs. Regular team meetings, daily logs, phone calls, and technology facilitate information sharing and allow each team member to contribute their unique perspectives.

This collaborative approach weaves a strong, supportive network that helps individuals thrive by fostering a holistic understanding of their strengths and needs.
  `,
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
    },
    {
      id: 'dd-q3',
      question: 'What is the role of a Direct Support Professional (DSP)?',
      options: [
        'Solely providing medical treatment',
        'Only assisting with basic personal care',
        'Multifaceted: supporter, teacher, advocate, and mentor',
        'Primarily administrative documentation'
      ],
      correctAnswer: 2,
      explanation: 'A DSP plays a multifaceted role as a supporter, teacher, advocate, and mentor, extending significantly beyond basic care to include fostering independence, promoting inclusion, teaching skills, and building meaningful relationships.'
    },
    {
      id: 'dd-q4',
      question: 'Which of the following is a guiding principle of quality support for individuals with developmental disabilities?',
      options: [
        'Institutional care',
        'Person-centeredness',
        'One-size-fits-all approach',
        'Professional-centered decision making'
      ],
      correctAnswer: 1,
      explanation: 'Person-centeredness is a core guiding principle that recognizes each individual\'s unique strengths and needs, respects their choices, and empowers them to participate in decisions about their lives.'
    },
    {
      id: 'dd-q5',
      question: 'How has the approach to supporting individuals with developmental disabilities evolved?',
      options: [
        'From community-based to institutional care',
        'From custodial institutional care to community-based support',
        'There has been no significant change in approach',
        'From independent living to more supervised settings'
      ],
      correctAnswer: 1,
      explanation: 'Historically, support evolved from large institutions focused on custodial care to community-based support promoting independence and inclusion, driven by advocacy in the 1960s and 70s and legislation like the Americans with Disabilities Act.'
    },
    {
      id: 'dd-q6',
      question: 'What is a common myth about individuals with developmental disabilities that DSPs should challenge?',
      options: [
        'That they can learn throughout life',
        'That they have unique strengths',
        'That they cannot work or contribute to society',
        'That they need individualized support'
      ],
      correctAnswer: 2,
      explanation: 'A common myth is that people with developmental disabilities cannot work or contribute to society. This is untrue - with appropriate support, individuals can learn, live independently, work, and achieve significant personal milestones.'
    },
    {
      id: 'dd-q7',
      question: 'Why is effective teamwork and communication essential when supporting individuals with developmental disabilities?',
      options: [
        'To reduce the workload of any single professional',
        'To create a coordinated approach based on the individual\'s needs',
        'To fulfill administrative requirements',
        'To minimize contact with the individual'
      ],
      correctAnswer: 1,
      explanation: 'Effective teamwork and communication ensure everyone is coordinated and working toward the same goals, sharing perspectives and responding to the individual\'s evolving needs, creating a strong supportive network.'
    },
    {
      id: 'dd-q8',
      question: 'What does it mean that developmental disabilities are "not illnesses to be cured"?',
      options: [
        'Medical treatment is never needed',
        'They represent differences to be understood and supported',
        'Therapy is not helpful',
        'Symptoms cannot be improved'
      ],
      correctAnswer: 1,
      explanation: 'Developmental disabilities are viewed not as illnesses to be cured but as differences to be understood and supported, focusing on the individual\'s unique abilities and potential rather than just their challenges.'
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
