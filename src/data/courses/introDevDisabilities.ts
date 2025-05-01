
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
        },
        {
          id: "q4-mod1",
          question: "When does the onset of developmental disabilities typically occur?",
          options: [
            "During adulthood",
            "During the developmental period (childhood)",
            "After a traumatic event",
            "Only after age 21"
          ],
          correctAnswer: 1,
          explanation: "Developmental disabilities, by definition, originate during the developmental period of childhood. They are present early in life, though they may not be diagnosed until later."
        },
        {
          id: "q5-mod1",
          question: "Which statement best describes intellectual disability?",
          options: [
            "An inability to learn any new skills",
            "A physical condition affecting mobility",
            "Significant limitations in intellectual functioning and adaptive behavior",
            "A short-term condition that improves with medication"
          ],
          correctAnswer: 2,
          explanation: "Intellectual disability involves significant limitations in both intellectual functioning (reasoning, learning, problem-solving) and in adaptive behavior, which covers a range of everyday social and practical skills."
        },
        {
          id: "q6-mod1",
          question: "What is a key characteristic of Autism Spectrum Disorder?",
          options: [
            "Progressive loss of physical abilities",
            "Challenges with social interaction and communication",
            "Advanced mathematical abilities in all cases",
            "Complete inability to speak in all cases"
          ],
          correctAnswer: 1,
          explanation: "A key characteristic of Autism Spectrum Disorder involves challenges with social interaction and communication, along with restricted or repetitive behaviors. The presentation and severity vary widely among individuals."
        },
        {
          id: "q7-mod1",
          question: "As a Direct Support Professional, what should be your primary focus when working with individuals with developmental disabilities?",
          options: [
            "Focusing on their limitations",
            "Supporting their independence and enhancing quality of life",
            "Making decisions for them to ensure safety",
            "Treating all individuals with the same approach regardless of needs"
          ],
          correctAnswer: 1,
          explanation: "A DSP's primary focus should be supporting independence and enhancing quality of life for the individuals they support, recognizing both abilities and challenges while promoting as much autonomy as possible."
        },
        {
          id: "q8-mod1",
          question: "Which of these is NOT an example of respecting a person's dignity?",
          options: [
            "Knocking before entering their room",
            "Referring to an adult by their first name without permission",
            "Providing privacy during personal care",
            "Speaking directly to the person rather than about them"
          ],
          correctAnswer: 1,
          explanation: "Referring to an adult by their first name without permission can be disrespectful and infantilizing. Adults with developmental disabilities deserve the same courtesy of being asked how they prefer to be addressed."
        },
        {
          id: "q9-mod1",
          question: "Cerebral palsy primarily affects which of the following?",
          options: [
            "Cognitive development only",
            "Social skills only",
            "Movement, muscle tone, and posture",
            "Ability to process sensory information"
          ],
          correctAnswer: 2,
          explanation: "Cerebral palsy primarily affects movement, muscle tone, and posture due to damage to the developing brain. While some individuals with cerebral palsy may have additional disabilities, the defining characteristic is related to motor function."
        },
        {
          id: "q10-mod1",
          question: "What is the best approach when communicating with a person with a developmental disability?",
          options: [
            "Always use simple language regardless of the individual's comprehension level",
            "Speak loudly to ensure they understand",
            "Adapt your communication style to meet the individual's needs and abilities",
            "Always communicate through a family member or caregiver"
          ],
          correctAnswer: 2,
          explanation: "The best approach is to adapt your communication style to meet the individual's specific needs and abilities. This might mean using simple language for some, visual supports for others, or typical adult communication for many individuals with developmental disabilities."
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
        },
        {
          id: "q4-mod2",
          question: "Which aspect of communication often carries the most meaning?",
          options: [
            "The specific words chosen",
            "Non-verbal cues like facial expressions and body language",
            "The volume of speech",
            "The complexity of vocabulary"
          ],
          correctAnswer: 1,
          explanation: "Non-verbal communication, including facial expressions, body language, tone, and gestures, often carries more meaning than the words themselves. This is why being attentive to non-verbal cues is crucial for effective communication."
        },
        {
          id: "q5-mod2",
          question: "When using visual supports for communication, what is important to remember?",
          options: [
            "They should completely replace verbal communication",
            "They should be complex to cover all possible scenarios",
            "They should be consistent and meaningful to the individual",
            "They are only useful for children, not adults"
          ],
          correctAnswer: 2,
          explanation: "Visual supports should be consistent and meaningful to the individual. They should be personalized to their understanding and needs, and used consistently across environments for maximum effectiveness."
        },
        {
          id: "q6-mod2",
          question: "What is an environmental barrier that might affect communication?",
          options: [
            "Using simple language",
            "Providing visual supports",
            "Background noise or distractions",
            "Speaking directly to the person"
          ],
          correctAnswer: 2,
          explanation: "Environmental barriers include background noise, visual distractions, poor lighting, or crowded spaces. These can significantly impact communication, especially for individuals with sensory processing differences or attention challenges."
        },
        {
          id: "q7-mod2",
          question: "What does 'processing time' refer to in communication?",
          options: [
            "The time it takes to prepare communication materials",
            "The time needed to document a conversation",
            "The time an individual needs to understand information and formulate a response",
            "The time spent in therapy sessions"
          ],
          correctAnswer: 2,
          explanation: "Processing time refers to the time an individual needs to understand the information they've received and formulate a response. Many individuals with developmental disabilities need additional processing time, and rushing can lead to communication breakdown."
        },
        {
          id: "q8-mod2",
          question: "Which is the best approach when an individual uses a communication device?",
          options: [
            "Speak to their caregiver instead",
            "Wait patiently for them to compose messages and respond directly to them",
            "Finish their sentences to speed up the conversation",
            "Ask only yes/no questions to make it easier"
          ],
          correctAnswer: 1,
          explanation: "When someone uses a communication device, it's important to wait patiently as they compose their message and then respond directly to them, not to others who may be present. This shows respect for their communication method and personhood."
        },
        {
          id: "q9-mod2",
          question: "Which statement about jargon in communication is most accurate?",
          options: [
            "Using professional jargon demonstrates expertise and should be encouraged",
            "Jargon should be avoided as it can create barriers to understanding",
            "All individuals with developmental disabilities understand medical terminology",
            "Using technical terms is the most precise way to communicate with anyone"
          ],
          correctAnswer: 1,
          explanation: "Jargon, including professional terminology, acronyms, and specialized language, should generally be avoided as it creates barriers to understanding. Clear, plain language is usually more effective for communication."
        },
        {
          id: "q10-mod2",
          question: "When communicating with someone who has a developmental disability, why is it important to verify understanding?",
          options: [
            "To test their intelligence",
            "Because they always pretend to understand",
            "To ensure effective two-way communication and prevent misunderstandings",
            "It's not important as long as you've said what you needed to say"
          ],
          correctAnswer: 2,
          explanation: "Verifying understanding is important to ensure effective two-way communication and prevent misunderstandings. This can be done respectfully by asking open-ended questions or requesting that the person explain information in their own words."
        }
      ],
      audioUrl: "https://example.com/audio/communication-strategies.mp3",
      transcript: "In this audio lesson, we explore key communication techniques for Direct Support Professionals, including active listening, using clear language, and understanding alternative communication methods. We discuss how to recognize communication barriers and adapt your approach accordingly."
    }
  ]
};
