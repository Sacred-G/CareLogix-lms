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
       pdfPath: '/pdfs/pbspdf.pdf',
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
      audioUrl: "/Audio/Guiding Behavior for Developmental Disabilities.wav",
      transcript: "This audio segment explores the concept of understanding behavior as communication. We discuss how behaviors serve specific functions for individuals, the importance of identifying triggers and patterns through ABC analysis, and how taking a person-centered approach helps us address underlying needs rather than just focusing on eliminating unwanted behaviors."
    },
    {
      id: "mod-2",
      title: "Implementing Positive Behavior Support Strategies",
      description: "Learn practical strategies for prevention, teaching alternatives, and responding effectively to challenging behaviors.",
      pdfPath: '/pdfs/pbspdf1.pdf',
      videoUrl: "https://youtu.be/46HukmJNOFY",
      content: `
# Implementing Positive Behavior Support Strategies

Positive Behavior Support (PBS) is an evidence-based approach that focuses on understanding behaviors and implementing strategies that improve quality of life while decreasing challenging behaviors. This approach emphasizes prevention, teaching new skills, and making environmental modifications rather than simply reacting to behaviors.

## Prevention Strategies

The most effective behavior support involves preventing challenging behaviors before they occur. Prevention strategies include:

### 1. Environmental Modifications

- **Sensory Considerations:**
  - Adjust lighting to reduce glare or intensity
  - Provide noise-canceling headphones in loud environments
  - Create quiet spaces for breaks from stimulation
  - Offer sensory items that meet needs (fidgets, weighted items)
  - Minimize visual clutter in living and working spaces

- **Physical Arrangement:**
  - Organize spaces for clear navigation and purpose
  - Ensure comfortable seating and positioning
  - Create areas for different types of activities
  - Provide visual boundaries between spaces
  - Consider proximity to others and personal space needs

### 2. Schedule and Routine Support

- **Predictable Routines:**
  - Maintain consistent daily schedules when possible
  - Prepare for transitions with warnings and supports
  - Create visual schedules showing the sequence of activities
  - Build in preferred activities throughout the day
  - Ensure adequate downtime for processing and rest

- **Balancing Activities:**
  - Alternate demanding tasks with preferred activities
  - Schedule challenging activities during optimal times of day
  - Build in regular movement breaks
  - Ensure activities match skill level and interest
  - Provide choices within the schedule

### 3. Relationship Building

- **Positive Interactions:**
  - Maintain a 4:1 ratio of positive to corrective interactions
  - Engage in preferred activities together
  - Show genuine interest in the person's perspective
  - Respond to communication attempts promptly
  - Take time to build rapport and trust

- **Communication Support:**
  - Use the person's preferred communication method
  - Simplify language during stress or transitions
  - Check for understanding before continuing
  - Offer visual supports to supplement verbal information
  - Honor all forms of communication (not just verbal)

## Teaching Alternative Skills

When challenging behaviors serve a communication purpose, teaching alternative skills is essential. Focus on:

### 1. Functional Communication Training

- Teach direct ways to communicate the same message as the challenging behavior
- For attention-seeking behaviors, teach appropriate ways to request attention
- For escape behaviors, teach ways to request breaks or help
- For access behaviors, teach ways to request desired items or activities
- Start with the simplest, most efficient communication method and build complexity gradually

### 2. Coping and Self-Regulation Skills

- Teach identification of emotional states (emotion vocabulary or visual scales)
- Develop personalized calming strategies (deep breathing, counting, movement)
- Create visual supports for self-regulation steps
- Practice coping skills regularly, not just during distress
- Develop self-advocacy skills for managing difficult situations

### 3. Independence and Choice-Making

- Teach skills that increase autonomy and reduce dependence
- Break tasks into manageable steps with visual supports
- Provide opportunities for meaningful choices throughout the day
- Teach problem-solving strategies for common challenges
- Build in opportunities for success and recognition

## Responding to Challenging Behaviors

When prevention isn't enough and behaviors do occur:

### 1. In-the-Moment Strategies

- **Stay Calm:**
  - Maintain a neutral tone and expression
  - Use minimal, clear language
  - Focus on safety first
  - Model the calm you wish to see
  - Avoid power struggles or emotional reactions

- **Redirect When Possible:**
  - Offer alternatives that serve the same function
  - Present high-interest activities or items
  - Change environments if helpful
  - Remind about available communication tools
  - Use visual supports to redirect attention

### 2. Consistent Responses

- Ensure all team members respond similarly to behaviors
- Focus responses on the function the behavior serves
- Avoid inadvertently reinforcing challenging behaviors
- Teach and reinforce alternative behaviors consistently
- Document what works and what doesn't

### 3. Post-Incident Support

- Return to normal routines as soon as possible
- Process what happened when everyone is calm (if appropriate)
- Look for learning opportunities to prevent future incidents
- Adjust support strategies based on new information
- Emphasize moving forward, not dwelling on the incident

## Creating Effective Behavior Support Plans

A comprehensive PBS plan typically includes:

1. **Clear description of the behavior** and its function based on assessment
2. **Prevention strategies** tailored to the individual and environment
3. **Teaching strategies** for alternative skills and coping mechanisms
4. **Response strategies** for when behaviors do occur
5. **Data collection methods** to monitor progress
6. **Regular review and revision** based on outcomes

Remember that PBS is not about controlling people but about understanding needs, teaching skills, and creating supportive environments that make challenging behaviors unnecessary.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "What is a key principle of Positive Behavior Support?",
          options: [
            "Using punishment to decrease unwanted behaviors", 
            "Focusing primarily on the consequences after behaviors occur", 
            "Emphasizing prevention, teaching new skills, and environmental modifications", 
            "Separating individuals from others when they display challenging behaviors"
          ],
          correctAnswer: 2,
          explanation: "A key principle of Positive Behavior Support is emphasizing prevention, teaching new skills, and making environmental modifications rather than simply reacting to behaviors after they occur. PBS is a proactive approach focused on understanding behavior and addressing underlying needs."
        },
        {
          id: "q2-mod2",
          question: "What is Functional Communication Training?",
          options: [
            "Teaching individuals to speak clearly and correctly", 
            "Teaching appropriate ways to communicate the same message that a challenging behavior was communicating", 
            "Training staff to understand what the person is saying", 
            "A method to correct grammatical errors in speech"
          ],
          correctAnswer: 1,
          explanation: "Functional Communication Training involves teaching appropriate ways to communicate the same message that a challenging behavior was communicating. For example, if hitting is used to communicate 'I need a break,' FCT would involve teaching the person to use words, pictures, or gestures to request a break instead."
        },
        {
          id: "q3-mod2",
          question: "Which of the following is an effective environmental modification that might prevent challenging behaviors?",
          options: [
            "Keeping the environment unpredictable to increase adaptability", 
            "Ensuring all activities are challenging to promote growth", 
            "Creating visual schedules and providing sensory supports based on individual needs", 
            "Limiting choices to avoid overwhelming the person"
          ],
          correctAnswer: 2,
          explanation: "Creating visual schedules and providing sensory supports based on individual needs are effective environmental modifications. These strategies help create predictability and address sensory needs that might otherwise lead to challenging behaviors."
        },
        {
          id: "q4-mod2",
          question: "What is an appropriate way to respond when a challenging behavior occurs?",
          options: [
            "Immediately provide a detailed lecture about why the behavior is inappropriate", 
            "Stay calm, ensure safety, use minimal clear language, and redirect when possible", 
            "Show your disappointment to help the person understand the impact of their behavior", 
            "Immediately remove all privileges to discourage future occurrences"
          ],
          correctAnswer: 1,
          explanation: "Staying calm, ensuring safety, using minimal clear language, and redirecting when possible is an appropriate response strategy. During moments of escalation, keeping communication simple and maintaining a calm presence helps de-escalate the situation rather than potentially intensifying it."
        },
        {
          id: "q5-mod2",
          question: "What is meant by a '4:1 ratio' in relationship building?",
          options: [
            "There should be 4 staff members for every 1 person supported", 
            "For every corrective interaction, there should be at least 4 positive interactions", 
            "Activities should be 4 parts work and 1 part leisure", 
            "Communication should be 4 parts listening and 1 part speaking"
          ],
          correctAnswer: 1,
          explanation: "A 4:1 ratio in relationship building means that for every corrective or directive interaction, there should be at least 4 positive interactions. This ratio helps maintain positive relationships and creates an environment where feedback is more likely to be well-received when needed."
        }
      ],
      audioUrl: "/Audio/Positive Behavior Support Strategies.wav",
      transcript: "This audio segment explores practical positive behavior support strategies, including preventative approaches, teaching alternative skills, and appropriate responses to challenging behaviors. We emphasize the importance of environmental modifications, consistent routines, relationship building, and teaching functional communication alternatives to challenging behaviors."
    }
  ],
  domain: 'general'
};
