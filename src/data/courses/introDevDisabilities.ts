
import { Course } from '../courseTypes';

export const introDevDisabilitiesCourse: Course = {
  id: "intro-dev-disabilities",
  title: "Introduction to Developmental Disabilities for Support Staff",
  description: "Learn the fundamentals of supporting individuals with developmental disabilities in a compassionate and effective way.",
  category: "Fundamentals",
  instructor: "Dr. Sarah Johnson",
  thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  duration: "2 hours",
  modules: [
    {
      id: "mod-1",
      title: "Understanding Developmental Disabilities",
      description: "An overview of different types of developmental disabilities and their characteristics.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      content: `
# Understanding Developmental Disabilities

Developmental disabilities are a group of conditions that arise from impairments in physical, learning, language, or behavior areas. These conditions begin during the developmental period, may impact day-to-day functioning, and usually last throughout a person's lifetime.

## Key Categories of Developmental Disabilities

- **Intellectual Disabilities**: Characterized by significant limitations in intellectual functioning and adaptive behavior
- **Autism Spectrum Disorder**: Impacts social interaction, communication, and may include restricted or repetitive behaviors
- **Cerebral Palsy**: Affects movement, muscle tone, and posture
- **Down Syndrome**: Caused by an extra copy of chromosome 21, leading to developmental changes and physical features
- **Fetal Alcohol Spectrum Disorders**: Caused by maternal alcohol consumption during pregnancy
- **Other Developmental Delays**: Including speech and language impairments

## Person-First Approach

As Direct Support Professionals, it's crucial to:
1. **See the person first**, not their disability
2. **Understand individual needs** rather than making assumptions
3. **Support independence** while providing necessary assistance
4. **Communicate respectfully** and at an appropriate level
5. **Recognize abilities** alongside challenges

Remember that each person is unique, regardless of disability. Your role is to provide support that enhances quality of life and promotes as much independence as possible.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "Which of the following is NOT typically considered a developmental disability?",
          options: ["Autism Spectrum Disorder", "Depression", "Down Syndrome", "Cerebral Palsy"],
          correctAnswer: 1,
          explanation: "Depression is a mental health condition, not a developmental disability. Developmental disabilities originate during the developmental period and typically last throughout a person's lifetime."
        },
        {
          id: "q2-mod1",
          question: "What is a 'person-first' approach to supporting individuals with developmental disabilities?",
          options: [
            "Focusing primarily on treating the disability", 
            "Seeing the person as an individual first, not defined by their disability", 
            "Prioritizing the fastest intervention possible", 
            "Ensuring the person is first in line for services"
          ],
          correctAnswer: 1,
          explanation: "A person-first approach emphasizes seeing the individual as a person first, rather than defining them by their disability. This approach promotes dignity, respect, and individuality."
        },
        {
          id: "q3-mod1",
          question: "True or False: Most developmental disabilities can be completely cured with proper intervention.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation: "False. While interventions and supports can greatly improve quality of life and functioning, most developmental disabilities are lifelong conditions that cannot be 'cured' in the traditional sense."
        }
      ],
      audioUrl: "https://example.com/audio/understanding-disabilities.mp3",
      transcript: "In this audio segment, we discuss the various types of developmental disabilities and the importance of understanding each individual's unique needs and abilities. We emphasize the person-first approach and how to recognize strengths alongside support needs."
    },
    {
      id: "mod-2",
      title: "Communication Strategies for Effective Support",
      description: "Learn effective communication techniques when working with individuals with developmental disabilities.",
      videoUrl: "https://www.youtube.com/embed/6c_dUUVgcxM",
      content: `
# Effective Communication Strategies

Communication is a fundamental skill for Direct Support Professionals. Effective communication creates trust, reduces anxiety, and empowers individuals with developmental disabilities.

## Key Communication Techniques

### 1. Active Listening
- Give your full attention
- Use appropriate eye contact
- Avoid interrupting
- Show that you're listening with verbal and non-verbal cues

### 2. Clear and Concise Language
- Use simple, direct language
- Avoid jargon or complex terminology
- Speak at an appropriate pace and volume
- Ask one question at a time

### 3. Alternative Communication Methods
- Picture communication systems
- Communication boards
- Digital communication devices
- Sign language
- Visual schedules

### 4. Non-verbal Communication
- Pay attention to your body language
- Notice the individual's non-verbal cues
- Be aware of personal space preferences
- Use natural gestures to enhance understanding

## Communication Barriers

Common barriers that may impact communication include:
- Sensory processing differences
- Anxiety or stress
- Environmental distractions
- Previous negative experiences
- Medication side effects

Remember that building effective communication is a process that takes time and patience. Always adapt your approach based on the individual's preferences and needs.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "Why is active listening important when supporting someone with a developmental disability?",
          options: [
            "It's required by law",
            "It helps build trust and understanding",
            "It's faster than other communication methods",
            "It reduces the need for documentation"
          ],
          correctAnswer: 1,
          explanation: "Active listening helps build trust and understanding between the DSP and the individual. It demonstrates respect and helps ensure the individual's needs and preferences are understood correctly."
        },
        {
          id: "q2-mod2",
          question: "Which of these is NOT an example of an alternative communication method?",
          options: [
            "Picture communication systems",
            "Sign language",
            "Using complex technical terminology",
            "Communication devices"
          ],
          correctAnswer: 2,
          explanation: "Using complex technical terminology is actually a barrier to communication, not an alternative method. Good communication with individuals with developmental disabilities involves clear, simple language."
        },
        {
          id: "q3-mod2",
          question: "What should you do if an individual seems to be having difficulty understanding what you're saying?",
          options: [
            "Speak much louder",
            "Give up and ask someone else to explain",
            "Simplify your language and try alternative communication methods",
            "Continue repeating the same information"
          ],
          correctAnswer: 2,
          explanation: "When someone is having difficulty understanding, it's best to adapt your approach by simplifying language, using visual supports, or trying alternative communication methods that might better suit their needs."
        }
      ],
      audioUrl: "https://example.com/audio/communication-strategies.mp3",
      transcript: "In this audio lesson, we explore key communication techniques for Direct Support Professionals, including active listening, using clear language, and understanding alternative communication methods. We discuss how to recognize communication barriers and adapt your approach accordingly."
    }
  ]
};
