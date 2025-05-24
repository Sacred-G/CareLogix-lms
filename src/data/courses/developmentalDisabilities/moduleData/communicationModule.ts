
import { Module } from '../../../courseTypes';

export const communicationModule: Module = {
  id: 'communication-strategies',
  title: 'Communication Strategies',
  description: 'Learn effective communication methods to support individuals with developmental disabilities.',
  content: `
# Communication Strategies for Supporting Diverse Needs

## Understanding Communication Differences

Individuals with developmental disabilities may communicate differently than what you're used to. These differences are not deficits, but simply variations in how people express themselves and understand others.

**Key Points to Remember:**
- Communication is more than just spoken words
- Each person has their own unique communication style and preferences
- Successful support requires adapting to the individual's communication needs, not expecting them to adapt to yours
- Patience and attention are essential skills for effective communication

## Verbal and Nonverbal Communication Techniques

### Verbal Communication
- **Use clear, concrete language**: Avoid abstract concepts, idioms, or sarcasm that might be misinterpreted
- **Offer processing time**: Pause after asking questions or giving information to allow the person time to process
- **Confirm understanding**: Ask clarifying questions and repeat important information
- **Match language complexity**: Adjust your vocabulary and sentence structure to match the person's comprehension level

### Nonverbal Communication
- **Body language**: Maintain an open, non-threatening posture
- **Facial expressions**: Be aware that your expressions convey meaning
- **Personal space**: Respect boundaries and be mindful of proximity preferences
- **Visual supports**: Use gestures, demonstrations, or visual cues when helpful

## Augmentative and Alternative Communication (AAC)

AAC includes all forms of communication other than oral speech that are used to express thoughts, needs, wants, and ideas.

### Types of AAC Systems:
- **No-tech solutions**: Sign language, gestures, facial expressions
- **Low-tech tools**: Picture boards, communication books, writing tools
- **High-tech devices**: Speech-generating devices, tablet apps, eye-tracking systems

### Supporting AAC Users:
- Learn how the person's specific AAC system works
- Give the person time to compose their message
- Acknowledge and respond to all communication attempts
- Never take away or restrict access to a person's communication device

## Recognizing Behavior as Communication

When traditional communication methods are challenging, behavior often becomes a form of expression.

### Common Communicative Functions of Behavior:
- Requesting something (attention, items, activities)
- Avoiding or escaping something uncomfortable
- Seeking sensory input or regulation
- Expressing emotions like frustration, excitement, or anxiety

### Response Strategies:
- Look beyond the behavior to identify the underlying message
- Address the person's needs rather than just the behavior
- Teach alternative communication methods for expressing the same need
- Create opportunities for successful communication

## Active Listening Techniques

Active listening is particularly important when supporting people with communication differences.

### Key Skills:
- Give your full attention without interrupting
- Observe nonverbal cues alongside verbal messages
- Validate feelings and experiences
- Reflect back what you've heard to confirm understanding
- Follow the person's lead in conversation topics and pace
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
    },
    {
      id: 'comm-q2',
      question: 'When communicating with someone who processes information more slowly, you should:',
      options: [
        'Speak louder to help them understand',
        'Repeat the same thing multiple times in rapid succession',
        'Provide information in smaller chunks and allow processing time',
        'Ask someone else to explain instead'
      ],
      correctAnswer: 2,
      explanation: 'Providing information in smaller, manageable chunks and allowing adequate time for the person to process what you\'ve said is a respectful communication approach that acknowledges different processing speeds.'
    },
    {
      id: 'comm-q3',
      question: 'Which of the following statements about behavior as communication is most accurate?',
      options: [
        'Behavior that challenges us is always intentionally disruptive',
        'Behavior that seems unusual is always meaningless',
        'Behavior often serves a communicative function when other methods aren\'t accessible or effective',
        'Behavior should always be ignored to avoid reinforcing it'
      ],
      correctAnswer: 2,
      explanation: 'Behavior often serves as a form of communication, especially when individuals don\'t have other effective ways to express needs, preferences, or feelings. Understanding the message behind the behavior is key to providing appropriate support.'
    }
  ],
  interactiveScenario: {
    title: 'Supporting Diverse Communication Needs',
    description: 'Practice adapting your communication approach in different situations',
    type: 'multiple-choice',
    content: 'You are supporting Alex, who uses a tablet-based speech-generating device to communicate. You\'ve asked Alex where they would like to go for a community outing. Alex is taking time to compose a message on their device. A coworker walks by and says, "Just give them some options to choose from - it\'ll be faster." What\'s the most appropriate response in this situation?',
    options: [
      {
        id: 'opt1',
        text: "Follow your coworker's advice and list some options for Alex to choose from to save time.",
        isCorrect: false,
        feedback: 'While offering choices can be appropriate in some situations, doing so because it\'s "faster" undermines Alex\'s autonomy and right to fully express their thoughts. This approach prioritizes efficiency over respect for their communication method.'
      },
      {
        id: 'opt2',
        text: "Tell your coworker, 'Alex is capable of telling us what they want. We need to respect their communication method and give them time.'",
        isCorrect: true,
        feedback: 'This response respects Alex\'s autonomy, acknowledges their capability, and recognizes that effective communication sometimes requires additional time. It also educates your coworker about respecting different communication methods.'
      },
      {
        id: 'opt3',
        text: "Say nothing to your coworker, but subtly shake your head to indicate disagreement while continuing to wait.",
        isCorrect: false,
        feedback: 'While you\'re showing patience with Alex, this missed opportunity to educate your coworker about respectful communication could lead to similar situations in the future. Advocacy is an important part of supporting communication rights.'
      },
      {
        id: 'opt4',
        text: "Ask Alex, 'Would you prefer if I gave you some options instead of typing out your answer?'",
        isCorrect: false,
        feedback: 'While this appears to give Alex a choice, the timing of the question (after they\'ve already begun composing a message) suggests impatience and may make them feel pressured to abandon their original communication attempt.'
      }
    ]
  },
  flashcards: [
    {
      id: 'comm-fc1',
      term: 'Augmentative and Alternative Communication (AAC)',
      definition: 'All forms of communication other than oral speech used to express thoughts, needs, wants, and ideas. Includes no-tech (gestures, sign language), low-tech (picture boards), and high-tech (speech-generating devices) solutions.'
    },
    {
      id: 'comm-fc2',
      term: 'Active Listening',
      definition: 'A communication technique that requires the listener to fully concentrate, understand, respond, and remember what is being said. Involves giving full attention, avoiding interruptions, and providing appropriate feedback.'
    },
    {
      id: 'comm-fc3',
      term: 'Communication Functions',
      definition: 'The purposes or reasons why people communicate, such as requesting, rejecting, commenting, asking questions, expressing feelings, or sharing information.'
    },
    {
      id: 'comm-fc4',
      term: 'Processing Time',
      definition: 'The period needed for a person to receive, interpret, and formulate a response to communication. Varies widely among individuals and can be affected by many factors including cognitive processing differences and anxiety.'
    }
  ],
  faqs: [
    {
      question: "What should I do if I don't understand what someone is trying to communicate?",
      answer: "It's always better to acknowledge when you don't understand rather than pretending you do. Say something like, 'I'm sorry, I'm having trouble understanding. Can we try a different way?' Be patient, ask clarifying questions when appropriate, and consider using multiple communication methods (speaking, writing, pictures). If needed, seek assistance from someone who may be more familiar with the person's communication style."
    },
    {
      question: "How do I know which AAC method might work best for someone?",
      answer: "AAC selection should be person-centered and typically involves assessment by a speech-language pathologist. Consider the person's physical abilities, cognitive skills, literacy level, sensory needs, and preferences. The best systems are often those that are easily accessible, portable, and adaptable as the person's needs change. Most importantly, involve the individual in the selection process whenever possible."
    },
    {
      question: "How can I communicate effectively with someone who seems to get overwhelmed by too much information?",
      answer: "Use clear, concise language and present one piece of information at a time. Allow processing time between statements or questions. Visual supports can help make verbal information more concrete and lasting. Pay attention to signs of overstimulation or confusion, and be prepared to pause, simplify, or try a different approach. Creating a calm, low-distraction environment can also help reduce information overwhelm."
    }
  ]
};
