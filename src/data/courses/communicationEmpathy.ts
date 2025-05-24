
import { Course } from '../courseTypes';

export const communicationEmpathyCourse: Course = {
  id: "communication-empathy",
  title: "Communication and Empathy in Support Roles",
  description: "Develop effective communication skills and empathy to better support individuals with developmental disabilities.",
  category: "Soft Skills",
  instructor: "Elena Ramirez, MS, CCC-SLP",
  thumbnail: "/Images/communicationEmpathy.png",
  duration: "1 hour",
  modules: [
    {
      id: "mod-1",
      title: "Foundations of Empathetic Communication",
      description: "Learn the basics of empathetic listening and effective communication techniques.",
      videoUrl: "https://youtu.be/rYrI0J14kkM", 
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
        },
        {
          id: "q4-mod1",
          question: "What is person-centered language?",
          options: [
            "Using technical medical terms to be precise",
            "Speaking about the person's disability before anything else",
            "Language that puts the person before their disability and uses respectful terminology",
            "Only using simple words regardless of the individual's comprehension level"
          ],
          correctAnswer: 2,
          explanation: "Person-centered language puts the person before their disability (e.g., 'person with autism' rather than 'autistic person'), uses respectful and age-appropriate terminology, and focuses on abilities alongside support needs."
        },
        {
          id: "q5-mod1",
          question: "Which of these is a common barrier to empathetic communication?",
          options: [
            "Taking too much time to listen to someone",
            "Having preconceptions about disabilities",
            "Using too much eye contact",
            "Being too focused on the person's feelings"
          ],
          correctAnswer: 1,
          explanation: "Having preconceptions about disabilities is a common barrier to empathetic communication. These preconceptions may cause us to make assumptions about someone's abilities or needs rather than truly listening to understand their unique experience."
        },
        {
          id: "q6-mod1",
          question: "What does it mean to validate someone's feelings?",
          options: [
            "Agreeing with everything they say",
            "Recognizing their emotions as understandable without judging them",
            "Trying to cheer them up immediately",
            "Telling them how they should feel instead"
          ],
          correctAnswer: 1,
          explanation: "Validating feelings means recognizing someone's emotions as understandable and acceptable, regardless of whether you agree with their perspective. It involves acknowledging their feelings without judgment rather than dismissing or trying to immediately change their emotions."
        },
        {
          id: "q7-mod1",
          question: "Why is it important to be aware of physical proximity in communication?",
          options: [
            "To ensure you can hear each other",
            "Because everyone prefers close physical contact during conversations",
            "Because personal space preferences vary among individuals and cultures",
            "Physical proximity doesn't matter in communication"
          ],
          correctAnswer: 2,
          explanation: "Personal space preferences vary widely among individuals and across different cultures. Being aware of and respecting physical proximity preferences is important for comfortable, respectful communication. Some individuals may be sensitive to being too close while communicating."
        },
        {
          id: "q8-mod1",
          question: "What does perspective-taking involve in empathetic communication?",
          options: [
            "Taking photographs of the conversation",
            "Making sure your opinion is understood",
            "Mentally putting yourself in another person's position to better understand their experience",
            "Insisting that others see your point of view"
          ],
          correctAnswer: 2,
          explanation: "Perspective-taking involves mentally putting yourself in another person's position to better understand their experience, feelings, and needs. This skill is essential for empathetic communication as it helps you respond in ways that acknowledge their unique situation."
        },
        {
          id: "q9-mod1",
          question: "Which of the following is NOT a component of active listening?",
          options: [
            "Giving undivided attention",
            "Formulating your response while the other person is speaking",
            "Using appropriate eye contact",
            "Providing verbal and non-verbal feedback"
          ],
          correctAnswer: 1,
          explanation: "Formulating your response while the other person is speaking is not a component of active listening. Active listening involves fully concentrating on what is being said rather than preparing what you will say next, which detracts from your ability to truly understand the speaker's message."
        },
        {
          id: "q10-mod1",
          question: "How can reflection improve your communication skills?",
          options: [
            "By helping you memorize pre-planned responses",
            "By allowing you to examine your patterns and adjust your approach",
            "By showing others you're a serious person",
            "By focusing only on your successes"
          ],
          correctAnswer: 1,
          explanation: "Reflection improves communication skills by allowing you to examine your patterns, recognize what works well and what doesn't, and thoughtfully adjust your approach. This ongoing process of self-awareness and growth is essential for developing empathetic communication skills."
        }
      ],
      audioUrl: "/Audio/Effective Communication in Support Roles.wav",
      transcript: "This audio segment explores the foundations of empathetic communication, including active listening, validation techniques, and the importance of non-verbal communication. We discuss how to recognize and overcome common barriers to effective communication in support settings."
    },
    {
      id: "mod-2",
      title: "Supporting Communication Across Different Abilities",
      description: "Learn strategies for effective communication with individuals who have diverse communication abilities and needs.",
      videoUrl: "https://youtu.be/BY2panhgfp4",
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
        },
        {
          id: "q5-mod2",
          question: "Why is it important to create communication-friendly environments?",
          options: [
            "To make the space look more professional",
            "To reduce barriers and facilitate successful communication",
            "To impress supervisors and families",
            "Only because it's required by regulations"
          ],
          correctAnswer: 1,
          explanation: "Communication-friendly environments reduce barriers and facilitate successful communication by addressing factors like noise, lighting, distractions, and access to communication supports, which can significantly impact someone's ability to understand and express themselves."
        },
        {
          id: "q6-mod2",
          question: "What approach should be taken when supporting someone with literal language interpretation?",
          options: [
            "Use plenty of idioms and figures of speech to expand their understanding",
            "Use clear, concrete language and avoid abstract expressions",
            "Speak very loudly to ensure comprehension",
            "Always use the most complex vocabulary possible"
          ],
          correctAnswer: 1,
          explanation: "For someone who interprets language literally, using clear, concrete language and avoiding idioms, abstract expressions, and figures of speech is most effective. Phrases like 'hold your horses' or 'it's raining cats and dogs' might be confusing when interpreted literally."
        },
        {
          id: "q7-mod2",
          question: "What is a key principle when modeling the use of an AAC system?",
          options: [
            "Only model the simplest words and concepts",
            "Model correct and complex use of the system during natural interactions",
            "Use the system only when the individual is present",
            "Focus on just a few symbols or buttons"
          ],
          correctAnswer: 1,
          explanation: "Modeling involves demonstrating correct and natural use of the AAC system during interactions. This shows how the system can be used effectively for communication, teaches new vocabulary and functions, and reduces stigma by normalizing its use."
        },
        {
          id: "q8-mod2",
          question: "How should you respond to unconventional communication attempts?",
          options: [
            "Ignore them until the person communicates in a more typical way",
            "Acknowledge them, respond appropriately, and reinforce all attempts at communication",
            "Always redirect to a more conventional communication method",
            "Point out that the communication attempt is unusual"
          ],
          correctAnswer: 1,
          explanation: "All communication attempts should be acknowledged, responded to appropriately, and reinforced, even if they seem unconventional. This validates the person's efforts, builds their confidence, and encourages continued communication."
        },
        {
          id: "q9-mod2",
          question: "When creating visual supports for communication, what is most important to consider?",
          options: [
            "Using the most colorful images possible",
            "Making them look professional and polished",
            "Ensuring they are meaningful and relevant to the specific individual",
            "Using as many visuals as possible on each page"
          ],
          correctAnswer: 2,
          explanation: "Visual supports should be meaningful and relevant to the specific individual, using symbols, photos, or text that they understand and that represent concepts important to them. The most effective visual supports are personalized rather than generic."
        },
        {
          id: "q10-mod2",
          question: "Why is consistency important when supporting communication?",
          options: [
            "It reduces the need for creativity in approaches",
            "It helps build predictability, reduces anxiety, and supports understanding",
            "It makes the DSP's job easier",
            "It's only important for children, not adults"
          ],
          correctAnswer: 1,
          explanation: "Consistency in communication approaches helps build predictability, reduces anxiety, and supports understanding. When communication methods, vocabulary, and responses are consistent, it creates a foundation of security that makes communication more successful."
        }
      ],
      audioUrl: "/Audio/Unlocking Communication for Direct Support Professionals.wav",
      transcript: "In this audio lesson, we explore strategies for supporting communication with individuals who have diverse communication abilities. We discuss various types of alternative and augmentative communication systems, how to create communication-friendly environments, and approaches for supporting individuals with different processing styles."
    }
  ]
};
