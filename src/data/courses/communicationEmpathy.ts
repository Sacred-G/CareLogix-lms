
import { Course } from '../courseTypes';

export const communicationEmpathyCourse: Course = {
  id: "communication-empathy",
  title: "Communication and Empathy in Support Roles",
  description: "Develop effective communication skills and empathy to better support individuals with developmental disabilities.",
  category: "Soft Skills",
  instructor: "Elena Ramirez, MS, CCC-SLP",
  thumbnail: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8",
  duration: "2.5 hours",
  modules: [
    {
      id: "mod-1",
      title: "Foundations of Empathetic Communication",
      description: "Learn the basics of empathetic listening and effective communication techniques.",
      videoUrl: "https://www.youtube.com/embed/KZbEm3bZ_Ps",
      content: `
# Foundations of Empathetic Communication

Empathetic communication is the cornerstone of effective support for individuals with developmental disabilities. It involves truly understanding another person's perspective and communicating in a way that demonstrates that understanding.

## Elements of Empathetic Communication

### 1. Active Listening
Active listening involves fully concentrating on what is being said rather than passively hearing the message. It includes:

- Giving undivided attention
- Using appropriate eye contact
- Being aware of non-verbal cues
- Avoiding interruptions
- Providing verbal and non-verbal feedback

### 2. Validation of Feelings
Validation communicates that a person's emotions are understandable and acceptable. This includes:

- Recognizing emotions without judgment
- Acknowledging the person's perspective
- Avoiding dismissive statements
- Separating validation from agreement

### 3. Person-Centered Language
How we speak reflects how we think about others:

- Put the person before the disability ("person with autism" vs. "autistic person")
- Use respectful, age-appropriate terminology
- Avoid medicalized language when unnecessary
- Focus on abilities alongside support needs

### 4. Non-Verbal Communication
Our bodies often communicate more than our words:

- Facial expressions
- Body positioning
- Physical proximity
- Gestures and movements
- Voice tone and volume

## Barriers to Empathetic Communication

Common barriers include:
- Preconceptions about disabilities
- Environmental distractions
- Time pressures
- Focusing on tasks rather than relationships
- Personal stress or burnout

## Applying Empathetic Communication

Practical applications include:
- Taking time to build rapport
- Recognizing each person's unique communication style
- Adjusting your approach based on feedback
- Practicing perspective-taking
- Reflecting on your own communication patterns

Remember that empathetic communication is a skill that improves with practice and reflection. It's not about perfect technique, but about authentic connection.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "What is active listening?",
          options: ["Waiting for your turn to speak", "Thinking about what to say next while someone is talking", "Fully concentrating on the speaker with verbal and non-verbal feedback", "Speaking loudly so everyone can hear"],
          correctAnswer: 2,
          explanation: "Active listening involves giving full attention to the speaker, providing feedback through verbal and non-verbal cues, and truly understanding their message."
        },
        {
          id: "q2-mod1",
          question: "Which statement best demonstrates validation of someone's feelings?",
          options: [
            "Don't worry about it, everything will be fine", 
            "I understand this is frustrating for you, and it makes sense that you'd feel upset", 
            "You shouldn't feel that way", 
            "Let's talk about something more positive instead"
          ],
          correctAnswer: 1,
          explanation: "Validation acknowledges and accepts another person's emotional experience without judgment. The statement 'I understand this is frustrating for you, and it makes sense that you'd feel upset' recognizes the emotion and communicates that it's understandable to feel that way."
        },
        {
          id: "q3-mod1",
          question: "What percentage of communication is estimated to be non-verbal?",
          options: ["Around 10%", "Around 30%", "Around 55-65%", "Around 90%"],
          correctAnswer: 2,
          explanation: "Research suggests that approximately 55-65% of communication is non-verbal, including body language, facial expressions, and tone of voice. This highlights the importance of paying attention to these aspects when communicating."
        }
      ],
      audioUrl: "https://example.com/audio/empathetic-communication.mp3",
      transcript: "This audio segment explores the foundations of empathetic communication, including active listening, validation techniques, and the importance of non-verbal communication. We discuss how to recognize and overcome common barriers to effective communication in support settings."
    },
    {
      id: "mod-2",
      title: "Supporting Communication Across Different Abilities",
      description: "Learn strategies for effective communication with individuals who have diverse communication abilities and needs.",
      videoUrl: "https://www.youtube.com/embed/oX1xXMJu6Rg",
      content: `
# Supporting Communication Across Different Abilities

Every individual communicates in their own unique way. As a Direct Support Professional, understanding and adapting to diverse communication needs is essential for providing effective support.

## Communication Variations and Support Strategies

### 1. Speech and Language Differences

**Common variations:**
- Limited or no verbal speech
- Speech that others find difficult to understand
- Echolalia (repeating words or phrases)
- Literal interpretation of language
- Word-finding difficulties

**Support strategies:**
- Allow extra time for processing and responding
- Use clear, concrete language
- Avoid idioms and abstract concepts
- Confirm understanding in a respectful way
- Support speech with visual cues when helpful

### 2. Alternative and Augmentative Communication (AAC)

**Types of AAC:**
- Picture communication systems
- Communication boards and books
- Speech-generating devices
- Sign language
- Written communication

**Support strategies:**
- Learn how the individual's AAC system works
- Treat AAC as the individual's voice (not a last resort)
- Ensure AAC is always accessible
- Model using the AAC system yourself
- Stay current with the vocabulary in their system

### 3. Processing Differences

**Common variations:**
- Need for additional processing time
- Sensitivity to sensory input during communication
- Difficulty with multiple-step instructions
- Challenges with abstract concepts
- Executive functioning differences

**Support strategies:**
- Provide information in multiple formats (verbal, visual)
- Break information into smaller chunks
- Check for understanding before moving on
- Minimize distractions during important communications
- Use clear beginning and end points in conversations

## Creating Communication-Friendly Environments

The environment plays a crucial role in supporting communication:

- Reduce background noise
- Ensure good lighting
- Create consistent routines and expectations
- Provide visual supports and schedules
- Establish communication-friendly spaces

## Building Communication Skills Together

Supporting communication is a two-way process:

1. Observe and learn the individual's unique communication style
2. Be consistent with your own communication approach
3. Celebrate all forms of communication attempts
4. Provide opportunities for meaningful interaction
5. Continuously assess what's working and adapt accordingly

Remember that supporting communication effectively requires patience, creativity, and a genuine desire to understand and be understood. There is no one-size-fits-all approach.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "What is AAC?",
          options: [
            "Advanced Autism Communication",
            "Alternative and Augmentative Communication",
            "Assisted Audio Communication",
            "Applied Adaptive Communication"
          ],
          correctAnswer: 1,
          explanation: "AAC stands for Alternative and Augmentative Communication. These are methods of communication that supplement or replace speech for individuals who have difficulty with verbal communication."
        },
        {
          id: "q2-mod2",
          question: "What should you do when supporting someone who uses a communication device?",
          options: [
            "Only let them use it when they can't express themselves verbally",
            "Treat the device as the person's voice and ensure it's always accessible",
            "Focus on teaching verbal speech instead",
            "Use the device only in structured teaching sessions"
          ],
          correctAnswer: 1,
          explanation: "Communication devices should be treated as the individual's voice and should always be accessible to them. Restricting access to AAC is equivalent to taking away someone's ability to communicate."
        },
        {
          id: "q3-mod2",
          question: "When communicating with someone who processes information more slowly, you should:",
          options: [
            "Speak louder to help them understand better",
            "Finish their sentences to speed up the conversation",
            "Allow extra time for processing and response",
            "Simplify all concepts to childlike explanations"
          ],
          correctAnswer: 2,
          explanation: "Providing adequate time for processing and formulating responses is crucial for effective communication with individuals who process information at a different pace. Rushing can increase anxiety and reduce comprehension."
        },
        {
          id: "q4-mod2",
          question: "What is echolalia?",
          options: [
            "A communication disorder that prevents all speech",
            "The repetition of words or phrases heard",
            "Speaking too loudly in social situations",
            "Using sign language instead of verbal speech"
          ],
          correctAnswer: 1,
          explanation: "Echolalia is the repetition of words or phrases that have been heard. It can be immediate (repeating something just heard) or delayed (repeating something heard in the past). It can be a meaningful form of communication for some individuals."
        }
      ],
      audioUrl: "https://example.com/audio/diverse-communication.mp3",
      transcript: "In this audio lesson, we explore strategies for supporting communication with individuals who have diverse communication abilities. We discuss various types of alternative and augmentative communication systems, how to create communication-friendly environments, and approaches for supporting individuals with different processing styles."
    }
  ]
};
