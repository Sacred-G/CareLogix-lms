import { Course } from '../courseTypes';

export const empowermentAdvocacyCourse: Course = {
  id: "empowerment-advocacy",
  title: "Empowerment and Advocacy in Support Work",
  description: "Learn how to promote self-advocacy, empower individuals with developmental disabilities, and support their rights and choices in daily life.",
  category: "Professional Development",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/empowerment.png",
  duration: "1.5 hours",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Foundations of Empowerment and Advocacy",
      description: "Understand the core principles of empowerment and learn practical strategies to support self-advocacy in individuals with developmental disabilities.",
      videoUrl: "https://youtu.be/XqzsSfMMGGg",
      content: `
# Foundations of Empowerment and Advocacy

Empowerment in support work means helping individuals with developmental disabilities gain control over their lives, make their own choices, and advocate for their rights and needs.

## Key Principles of Empowerment

### Person-Centered Approach
- Focus on the individual's strengths, preferences, and goals
- Respect personal values and beliefs
- Support informed decision-making
- Encourage self-determination

### Building Self-Advocacy Skills
- Teach individuals to express their needs and preferences
- Provide opportunities for choice and control
- Support participation in decision-making
- Encourage problem-solving and self-expression

### Creating Supportive Environments
- Foster independence and self-reliance
- Provide accessible information and resources
- Create opportunities for community participation
- Build natural supports and social networks

## Practical Strategies for DSPs

### Communication Techniques
- Use plain, respectful language
- Provide information in accessible formats
- Listen actively and validate feelings
- Ask open-ended questions

### Supporting Decision-Making
- Present options clearly and simply
- Allow adequate time for decisions
- Respect the right to make "unwise" choices
- Provide support without taking over

### Advocacy in Action
- Help individuals understand their rights
- Support participation in planning meetings
- Assist with accessing community resources
- Stand beside, not in front of, the person you support

## Overcoming Barriers to Empowerment

### Common Challenges
- Overprotection and risk aversion
- Communication difficulties
- Limited opportunities for choice
- Systemic barriers and discrimination

### Strategies for Success
- Start small with meaningful choices
- Break tasks into manageable steps
- Use visual supports when helpful
- Celebrate successes and efforts

Empowerment is an ongoing process that requires patience, creativity, and a commitment to supporting each individual's right to direct their own life.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "What is the primary goal of empowerment in support work?",
          options: [
            "Making decisions for individuals",
            "Helping individuals gain control over their lives",
            "Ensuring compliance with rules",
            "Minimizing risks at all costs"
          ],
          correctAnswer: 1,
          explanation: "The primary goal of empowerment is to help individuals gain control over their lives, make their own choices, and advocate for their rights and needs."
        },
        {
          id: "q2-mod1",
          question: "Which of the following best describes a person-centered approach?",
          options: [
            "Focusing on the individual's diagnosis",
            "Following standard procedures for everyone",
            "Focusing on the individual's strengths and preferences",
            "Making decisions based on what's most efficient"
          ],
          correctAnswer: 2,
          explanation: "A person-centered approach focuses on the individual's unique strengths, preferences, and goals, rather than their diagnosis or standardized procedures."
        },
        {
          id: "q3-mod1",
          question: "When supporting decision-making, what should you do if an individual makes a choice you think is unwise?",
          options: [
            "Make the decision for them",
            "Respect their right to make the choice",
            "Tell them it's a bad idea",
            "Ask someone else to convince them otherwise"
          ],
          correctAnswer: 1,
          explanation: "While you can provide information and discuss potential consequences, it's important to respect an individual's right to make their own choices, even if you think they're unwise, as long as they understand the implications."
        },
        {
          id: "q4-mod1",
          question: "What is an example of building self-advocacy skills?",
          options: [
            "Speaking for the individual in meetings",
            "Teaching someone to express their own needs",
            "Making all the arrangements for them",
            "Telling them what to do in every situation"
          ],
          correctAnswer: 1,
          explanation: "Building self-advocacy skills involves teaching and supporting individuals to express their own needs, preferences, and opinions, rather than speaking for them."
        },
        {
          id: "q5-mod1",
          question: "What is a key strategy for creating a supportive environment?",
          options: [
            "Limiting choices to reduce confusion",
            "Doing everything for the individual",
            "Providing accessible information and resources",
            "Making all decisions for the individual"
          ],
          correctAnswer: 2,
          explanation: "Creating a supportive environment includes providing information and resources in accessible formats that enable individuals to make informed choices and participate fully."
        },
        {
          id: "q6-mod1",
          question: "What is the best way to support someone who has difficulty communicating their needs?",
          options: [
            "Make assumptions about what they want",
            "Use alternative communication methods like pictures or gestures",
            "Only offer limited choices to make it easier",
            "Ask their family members instead of asking them directly"
          ],
          correctAnswer: 1,
          explanation: "Using alternative communication methods like pictures, gestures, or assistive technology helps individuals express their needs in ways that work best for them, promoting their independence and self-advocacy."
        },
        {
          id: "q7-mod1",
          question: "Why is it important to involve individuals in planning their own support services?",
          options: [
            "It's required by law",
            "It increases their sense of control and ownership",
            "It makes the support worker's job easier",
            "It's quicker than making decisions for them"
          ],
          correctAnswer: 1,
          explanation: "Involving individuals in planning their support services increases their sense of control, ownership, and investment in their own goals, leading to better outcomes and greater satisfaction with services."
        },
        {
          id: "q8-mod1",
          question: "What should you do if an individual wants to take a risk that you're concerned about?",
          options: [
            "Forbid them from taking the risk",
            "Help them understand the risks and benefits, then support their decision",
            "Tell them it's not allowed",
            "Contact their guardian to override their decision"
          ],
          correctAnswer: 1,
          explanation: "The best approach is to help the individual understand the potential risks and benefits, discuss possible alternatives, and then support their informed decision while helping to minimize any potential negative consequences."
        },
        {
          id: "q9-mod1",
          question: "What is a key aspect of promoting empowerment in daily activities?",
          options: [
            "Completing tasks for the individual to ensure they're done correctly",
            "Providing opportunities for the individual to make choices, no matter how small",
            "Following the same routine every day",
            "Making all decisions to reduce stress for the individual"
          ],
          correctAnswer: 1,
          explanation: "Empowerment is built through daily opportunities to make choices and exercise control, even in small matters. These small decisions help build confidence and self-determination over time."
        },
        {
          id: "q10-mod1",
          question: "How can you help someone develop self-advocacy skills in a group setting?",
          options: [
            "Speak for them to ensure their needs are met",
            "Encourage them to speak for themselves and offer support if needed",
            "Only ask them simple yes/no questions",
            "Address the group leader instead of the individual"
          ],
          correctAnswer: 1,
          explanation: "In group settings, it's important to encourage individuals to speak for themselves while offering appropriate support. This might include giving them time to respond, helping them prepare what they want to say, or providing assistive communication tools if needed."
        }
      ],
      audioUrl: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media//Empowerment%20&%20Advocacy_%20A%20DSP's%20Guide.wav",
      transcript: "This audio segment explores the fundamental principles of empowerment and advocacy in support work. We discuss practical strategies for promoting self-advocacy, supporting decision-making, and creating environments that foster independence and self-determination for individuals with developmental disabilities."
    }
  ]
};