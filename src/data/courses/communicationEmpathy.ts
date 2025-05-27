
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
      videoUrl: "https://www.youtube.com/watch?v=bSQ53FXO-cU&t=41s", 
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
      audioUrl: "/Audio/Mastering Effective Support Communication.wa",
      transcript: "This audio segment explores the foundations of empathetic communication, including active listening, validation techniques, and the importance of non-verbal communication. We discuss how to recognize and overcome common barriers to effective communication in support settings."
    }
  ],
  certificateAvailable: true,
  domain: ''
};