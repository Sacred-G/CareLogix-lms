import { Course } from '../courseTypes';

export const positiveBehaviorSupportCourse: Course = {
  id: "positive-behavior-support",
  title: "Positive Behavior Support Strategies",
  description: "Learn effective, person-centered approaches to support positive behavior and reduce challenging behaviors through understanding, prevention, and respectful intervention.",
  category: "Direct Support",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/Positive Connections in the Park.png",
  duration: "1 hour",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Understanding Behavior as Communication",
      description: "Learn how behavior serves as communication and how to identify underlying needs and triggers.",
      videoUrl: "https://youtu.be/6VjF3c47DRQ",
      interactiveScenario: {
        title: "Behavior Analysis Scenarios",
        description: "Practice identifying the function of behavior in different scenarios.",
        type: "behavior-analysis",
        options: [
          {
            id: "scenario-1",
            text: "The Lunch Room - Jamie starts throwing food when asked to eat vegetables",
            isCorrect: true,
            feedback: "Great job! In this scenario, Jamie is likely trying to avoid eating vegetables. This is a classic example of escape/avoidance behavior."
          },
          {
            id: "scenario-2",
            text: "Group Activity - Maria makes loud noises during challenging activities",
            isCorrect: true,
            feedback: "Excellent! Modifying the activity to match Maria's skill level helps prevent frustration and teaches her that she can be successful with appropriate support."
          },
          {
            id: "scenario-3",
            text: "Playground - Alex takes toys from others during recess",
            isCorrect: false,
            feedback: "This scenario demonstrates attention-seeking behavior. Let's think about how we can address this."
          },
          {
            id: "scenario-4",
            text: "Classroom - Taylor rocks back and forth during transitions",
            isCorrect: false,
            feedback: "This is an example of self-stimulatory behavior, often used for self-regulation."
          }
        ]
      },
      content: `
# Understanding Behavior as Communication

All behavior has meaning. When supporting individuals with developmental disabilities, understanding that behavior is a form of communication is fundamental to providing effective, respectful support.

## The Communication Model of Behavior

Behavior often represents an attempt to communicate when other methods aren't available or effective. People may use behavior to:

- Express needs or wants
- Escape from uncomfortable situations
- Gain attention or connection
- Self-regulate when overwhelmed
- Communicate pain or discomfort
- Express preferences or choices

Understanding behavior as communication shifts our perspective from seeing "challenging behaviors" as problems to viewing them as valuable information about what a person is experiencing.

## Common Functions of Behavior

### 1. Obtaining Something Desired
- Gaining attention from others
- Accessing preferred activities or items
- Getting sensory stimulation
- Seeking control over environment

### 2. Escaping or Avoiding Something Undesired
- Avoiding difficult tasks
- Escaping uncomfortable sensory experiences
- Avoiding social situations
- Escaping demanding environments

### 3. Self-Regulation
- Managing anxiety or stress
- Coping with sensory overload
- Structuring unpredictable environments
- Processing transitions or changes

## The ABC Analysis Approach

A systematic way to understand behavior is through the ABC analysis:

### Antecedents
- What happened immediately before the behavior?
- What was going on in the environment?
- Who was present?
- What demands or requests were made?
- What changes occurred?

### Behavior
- What exactly did the person do?
- How long did it last?
- How intense was it?
- What did it look like objectively?

### Consequences
- What happened immediately after the behavior?
- How did others respond?
- Did the person get or avoid something?
- How did the environment change?

By collecting and analyzing this information, patterns emerge that help us understand what the person is trying to communicate.

## Common Triggers for Challenging Behaviors

### Environmental Triggers
- Noise, crowds, or visual stimulation
- Temperature extremes
- Uncomfortable seating or positioning
- Lighting (too bright, fluorescent lighting)
- Strong smells

### Physical Triggers
- Pain or discomfort
- Hunger or thirst
- Fatigue
- Illness
- Medication effects or side effects

### Social Triggers
- Changes in routine
- Unfamiliar people
- Complex social demands
- Misunderstandings
- Loss of control or choice

### Task-Related Triggers
- Difficult or unclear instructions
- Tasks that are too challenging
- Lack of needed support
- Boredom or lack of engagement
- Transitions between activities

## Identifying Communication Intent

To understand what a behavior might be communicating, ask yourself:

1. When and where does the behavior occur most often?
2. What typically happens right before the behavior?
3. What does the person usually get or avoid through the behavior?
4. How does the behavior change in different environments or with different people?
5. Are there patterns related to time of day, activities, or physical states?

## Person-Centered Approach to Behavior

Remember that behavior occurs within a context. A person-centered approach considers:

- The person's unique history and experiences
- Their communication abilities and preferences
- Their sensory profile and processing style
- Their values, interests, and goals
- Environmental factors that support or challenge them

By understanding behavior as communication, we can respond in ways that address underlying needs, teach new skills, and create supportive environments that reduce the need for challenging behaviors.
`,
       pdfPath: 'https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/pdfs/pbspdf.pdf',
       questions: [
        {
          id: "q1-mod1",
          question: "Why is it important to view behavior as a form of communication?",
          options: [
            "It's not important; behavior should be viewed as compliance or non-compliance", 
            "It helps us identify what needs might be going unmet and how to better support the person", 
            "It's only relevant for individuals who don't use verbal communication", 
            "It helps justify consequences for challenging behaviors"
          ],
          correctAnswer: 1,
          explanation: "Viewing behavior as communication helps us understand what needs might be going unmet and how to better support the person. This perspective shifts the focus from simply stopping unwanted behaviors to addressing underlying causes and teaching more effective communication strategies."
        },
        {
          id: "q2-mod1",
          question: "What is the purpose of conducting an ABC analysis?",
          options: [
            "To document behaviors for punishment purposes", 
            "To create a behavior plan focused on consequences", 
            "To identify patterns and understand what factors influence the behavior", 
            "To label behaviors as good or bad"
          ],
          correctAnswer: 2,
          explanation: "The purpose of ABC (Antecedent-Behavior-Consequence) analysis is to identify patterns and understand what factors influence behavior. By systematically documenting what happens before (antecedents) and after (consequences) a behavior, we can better understand its function and develop effective support strategies."
        },
        {
          id: "q3-mod1",
          question: "Which of the following is a common function of behavior?",
          options: [
            "To deliberately frustrate support staff", 
            "To get attention, obtain something desired, or escape something undesired", 
            "To demonstrate non-compliance with rules", 
            "To show that the person needs more medication"
          ],
          correctAnswer: 1,
          explanation: "Common functions of behavior include getting attention, obtaining something desired, or escaping/avoiding something undesired. Behaviors serve a purpose for the individual, often related to having needs met or avoiding discomfort."
        },
        {
          id: "q4-mod1",
          question: "Which of the following is an example of an environmental trigger for challenging behavior?",
          options: [
            "A person's genetic makeup", 
            "Bright fluorescent lighting or loud noises", 
            "The person's diagnosis", 
            "Staff attitude"
          ],
          correctAnswer: 1,
          explanation: "Environmental triggers include sensory elements like bright fluorescent lighting or loud noises. Other environmental triggers might include crowded spaces, uncomfortable temperatures, or strong smells. These factors can cause discomfort or distress that may lead to challenging behaviors."
        },
        {
          id: "q5-mod1",
          question: "What information should you consider when taking a person-centered approach to understanding behavior?",
          options: [
            "Only the frequency and intensity of the behavior", 
            "Only the consequences that have been effective in the past", 
            "The person's unique history, communication abilities, sensory needs, and environmental factors", 
            "Only the diagnosis and prescribed medication"
          ],
          correctAnswer: 2,
          explanation: "A person-centered approach considers the whole person, including their unique history, communication abilities, sensory needs, and environmental factors. This comprehensive view recognizes that behavior occurs within a complex context and is influenced by many factors specific to the individual."
        }
      ],
      audioUrl: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/audio2/Guiding%20Behavior%20for%20Developmental%20Disabilities.wav",
      transcript: "This audio segment explores the concept of understanding behavior as communication. We discuss how behaviors serve specific functions for individuals, the importance of identifying triggers and patterns through ABC analysis, and how taking a person-centered approach helps us address underlying needs rather than just focusing on eliminating unwanted behaviors."
    },
  ],

}
  