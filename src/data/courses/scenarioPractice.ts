
import { Course } from '../courseTypes';

export const scenarioPracticeCourse: Course = {
  id: "scenario-practice",
  title: "Interactive Scenario Practice",
  description: "Apply your knowledge and skills by working through realistic interactive scenarios you may encounter as a Direct Support Professional.",
  category: "Professional Development",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/interactive scenario.png", // If this image does not exist, please review and update accordingly.
  duration: "35 min",
  modules: [
    {
      id: "mod-1",
      title: "Managing Challenging Behaviors",
      description: "Practice responding to challenging behaviors effectively and professionally.",
      videoUrl: "https://youtu.be/46HukmJNOFY",
      content: `
# Managing Challenging Behaviors

Direct Support Professionals often encounter situations where individuals display behaviors that are challenging to address. These scenarios require thoughtful, person-centered approaches that maintain dignity and safety while addressing the underlying causes of behavior.

## Understanding Behavior as Communication

All behavior serves a purpose and communicates something. Common functions include:

- **Obtaining desired items or activities**
- **Escaping or avoiding undesired situations**
- **Seeking attention or connection**
- **Meeting sensory needs**
- **Communicating pain, discomfort, or illness**
- **Expressing emotions like anxiety, frustration, or boredom**

Before responding to challenging behaviors, consider what the person might be trying to communicate.

## Proactive Strategies

The most effective approach is preventing challenging behaviors before they occur by:

1. **Knowing triggers and early warning signs**
2. **Creating supportive environments** (sensory-friendly, predictable)
3. **Teaching communication and coping skills**
4. **Providing choices and control**
5. **Building trusting relationships**
6. **Following consistent routines with visual supports**
7. **Ensuring physical needs are met** (rest, food, comfort)

## Crisis Response Strategies

When challenging behaviors do occur:

### 1. Ensure Safety
- Maintain calm, non-threatening body language
- Create space if needed
- Remove dangerous items
- Consider others in the environment
- Follow safety protocols

### 2. Use De-escalation Techniques
- Speak calmly and clearly
- Use simple language
- Offer choices when possible
- Acknowledge feelings
- Avoid power struggles
- Give time to process

### 3. Redirect and Support
- Offer alternative activities
- Remind of coping strategies
- Change environments if helpful
- Provide sensory supports if needed
- Use humor appropriately
- Return to routines when possible

### 4. Follow Up
- Document the incident objectively
- Reflect on triggers and effectiveness of responses
- Discuss with team members
- Update support plans if needed
- Restore relationships
- Teach skills to handle similar situations

## Legal and Ethical Considerations

When managing challenging behaviors:

- Use the least restrictive approach
- Follow behavior support plans exactly
- Know which interventions require special training
- Understand reporting requirements
- Maintain dignity throughout
- Consider trauma-informed approaches

## Caring for Yourself

Supporting individuals during challenging behaviors can be stressful. Practice self-care by:

- Debriefing with supervisors and colleagues
- Taking breaks when needed
- Using your own calm-down strategies
- Separating the behavior from the person
- Reflecting on what you're learning
- Accessing training and support

Remember that behavior change takes time and consistency. Focus on progress rather than perfection, and celebrate small successes along the way.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "What is the first step when responding to a behavioral crisis?",
          options: [
            "Call for assistance", 
            "Ensure safety for everyone involved", 
            "Ask the person why they're upset", 
            "Document the incident"
          ],
          correctAnswer: 1,
          explanation: "The first priority in any behavioral crisis is ensuring safety for the individual, yourself, and others in the environment. This includes maintaining calm body language, creating space if needed, removing dangerous items, and following safety protocols."
        },
        {
          id: "q2-mod1",
          question: "What is meant by 'behavior is communication'?",
          options: [
            "All challenging behaviors are a form of manipulation", 
            "Behaviors serve a purpose and may express needs, wants, or feelings the person cannot otherwise communicate", 
            "Behaviors are random and unpredictable", 
            "Behavior problems show a need for more structure"
          ],
          correctAnswer: 1,
          explanation: "The concept that 'behavior is communication' means that behaviors serve a purpose and may express needs, wants, or feelings that the person cannot otherwise communicate. Understanding the function or purpose of a behavior is key to addressing it effectively."
        },
        {
          id: "q3-mod1",
          question: "Which of these is an effective de-escalation technique?",
          options: [
            "Raising your voice to be heard over the person's distress", 
            "Telling the person to calm down immediately", 
            "Using simple language and offering choices when possible", 
            "Bringing in multiple staff members to show authority"
          ],
          correctAnswer: 2,
          explanation: "Effective de-escalation techniques include speaking calmly, using simple language, offering choices when possible, acknowledging feelings, avoiding power struggles, and giving time to process. These approaches help reduce tension rather than potentially increasing it."
        },
        {
          id: "q4-mod1",
          question: "What is an important consideration for documentation after a behavioral incident?",
          options: [
            "Include your personal feelings about the incident", 
            "Document only the most serious behaviors", 
            "Write objective descriptions of what happened without judgmental language", 
            "Focus primarily on what the person did wrong"
          ],
          correctAnswer: 2,
          explanation: "Documentation should include objective descriptions of what happened without judgmental language. It should factually record the antecedents (what happened before), the behavior itself, the response to the behavior, and the outcome. This objective record helps in understanding patterns and improving support plans."
        }
      ],
      audioUrl: "/Audio/Guiding Behavior for Developmental Disabilities.wav",
      transcript: "In this audio segment, we explore strategies for managing challenging behaviors effectively. We discuss understanding behavior as communication, proactive prevention strategies, crisis response techniques, legal and ethical considerations, and the importance of self-care for direct support professionals who work with challenging behaviors.",
      interactiveScenario: {
        title: "Managing an Aggressive Outburst",
        description: "In this scenario, you'll practice responding to a situation where a client is becoming increasingly agitated in a community setting.",
        type: "multiple-choice",
        content: {
          scenario: "You're supporting Alex at a busy shopping mall. The environment is loud and crowded. You notice Alex covering his ears, rocking, and starting to raise his voice, saying 'No, no, no!' A nearby shopper is staring, which seems to make Alex more upset. Alex then knocks a display over and shouts loudly.",
          decisions: [
            {
              prompt: "What's your first response?",
              options: [
                {
                  text: "Firmly tell Alex to stop and that this behavior is unacceptable in public.",
                  outcome: "Alex becomes more agitated and begins hitting himself. Your approach has escalated the situation.",
                  correct: false
                },
                {
                  text: "Apologize loudly to everyone watching and quickly try to remove Alex from the mall.",
                  outcome: "Alex resists leaving and becomes more upset as you try to physically guide him out. This creates a more difficult situation.",
                  correct: false
                },
                {
                  text: "Move between Alex and onlookers, speak calmly, and offer Alex noise-canceling headphones from his bag.",
                  outcome: "Alex accepts the headphones, which helps reduce the sensory overload. This gives you a chance to help him regulate.",
                  correct: true,
                  next: "nextStep"
                },
                {
                  text: "Call your supervisor immediately to report the incident and ask for advice.",
                  outcome: "While you're on the phone, Alex's behavior escalates because he's not receiving direct support during his distress.",
                  correct: false
                }
              ]
            },
            {
              id: "nextStep",
              prompt: "Now that Alex has the headphones on, what's your next best action?",
              options: [
                {
                  text: "Tell Alex it's time to leave the mall immediately as a consequence for his behavior.",
                  outcome: "Alex becomes upset again because he hasn't had time to regulate and doesn't understand why he's being 'punished.'",
                  correct: false
                },
                {
                  text: "Guide Alex to a quieter area, offer him a choice of staying in the calm space or leaving the mall, and provide his stress ball.",
                  outcome: "Alex is able to regulate in the quieter environment and eventually communicates he's ready to leave. This respects his dignity while ensuring safety.",
                  correct: true,
                  next: "finalStep"
                },
                {
                  text: "Talk to the store manager about the damage and have Alex apologize immediately.",
                  outcome: "Alex isn't emotionally regulated enough for this interaction, leading to another outburst.",
                  correct: false
                },
                {
                  text: "Give Alex your phone to play games as a distraction from his behavior.",
                  outcome: "While this distracts Alex temporarily, it doesn't address the underlying sensory overload or teach coping skills.",
                  correct: false
                }
              ]
            },
            {
              id: "finalStep",
              prompt: "After the incident is resolved and you've returned home, what's the most important follow-up action?",
              options: [
                {
                  text: "Restrict Alex's community outings for the next week as a consequence.",
                  outcome: "This punitive approach doesn't teach skills and may damage your supportive relationship with Alex.",
                  correct: false
                },
                {
                  text: "Document the incident objectively, including triggers, responses, and effective supports, and review with your team.",
                  outcome: "Your documentation helps the team understand patterns and improve proactive strategies for future outings. This is the most effective professional response.",
                  correct: true
                },
                {
                  text: "Tell Alex's family how difficult his behavior was and suggest they continue the consequence at home.",
                  outcome: "This undermines a collaborative approach and doesn't focus on understanding and addressing the causes of the behavior.",
                  correct: false
                },
                {
                  text: "Decide not to document the incident since it was resolved successfully.",
                  outcome: "Failing to document prevents the team from learning from the experience and identifying patterns that could help prevent future incidents.",
                  correct: false
                }
              ]
            }
          ]
        }
      }
    },
    {
      id: "mod-2",
      title: "Supporting Clients During Difficult Situations",
      description: "Practice providing appropriate support during emotionally challenging situations.",
      videoUrl: "https://youtu.be/46HukmJNOFY",
      content: `
# Supporting Clients During Difficult Situations

As a Direct Support Professional, you will encounter situations where the individuals you support face emotional challenges, disappointments, losses, or transitions. How you respond in these moments can significantly impact their ability to cope and grow through these experiences.

## Types of Difficult Situations

Individuals with developmental disabilities experience the same range of life challenges as everyone else, including:

- Disappointments and rejections
- Grief and loss
- Health concerns and medical procedures
- Major life transitions
- Conflict in relationships
- Traumatic experiences
- Discrimination and social barriers
- Sensory overload and shutdowns
- Unexpected changes in routines or expectations

However, they may have fewer coping resources, communication challenges that complicate expression of feelings, or past negative experiences that affect their trust and resilience.

## Principles for Providing Support

### 1. Validate Feelings
- Acknowledge emotions without judgment
- Use reflective listening
- Avoid minimizing or dismissing feelings
- Recognize non-verbal expressions of emotion
- Use emotion vocabulary appropriate to the person

### 2. Provide Clear, Honest Information
- Use concrete language appropriate to understanding
- Break down complex situations into simpler concepts
- Be truthful while remaining compassionate
- Clarify misconceptions
- Check for understanding

### 3. Offer Appropriate Choices
- Identify what aspects the person can control
- Provide realistic options
- Support decision-making
- Honor choices when possible
- Explain necessary limits compassionately

### 4. Balance Support and Space
- Recognize when presence is helpful vs. overwhelming
- Offer physical comfort when appropriate
- Allow private time for processing
- Remain available without hovering
- Follow the person's lead on engagement

### 5. Support Coping Strategies
- Remind of previously successful coping skills
- Offer sensory tools or activities
- Use visual supports or social stories
- Maintain routines when possible
- Model calm behavior

## Communication Techniques

### For Verbal Processing
- Ask open-ended questions
- Wait patiently for responses
- Mirror language at the person's level
- Use visual supports if helpful
- Avoid overwhelming with too many questions

### For Non-verbal or Limited Verbal Expression
- Pay attention to body language and behavior changes
- Offer communication tools (picture cards, devices)
- Present choices in accessible formats
- Use art, music, or movement as expression outlets
- Notice patterns in behavior that indicate specific feelings

## When Professional Help Is Needed

Know when to seek additional support:

- Prolonged changes in mood or behavior
- Self-injurious behavior
- Loss of previously mastered skills
- Significant sleep or appetite changes
- Expressions of hopelessness or suicidal thoughts
- Difficulty with daily functioning

## Taking Care of Yourself

Supporting others through difficult situations requires emotional energy. Practice self-care by:

- Processing your own feelings with appropriate people
- Maintaining professional boundaries
- Using your support system
- Recognizing compassion fatigue
- Accessing supervision and team support

Remember that by providing steady, compassionate support during difficult times, you're not only helping individuals manage current challenges but also building their resilience for future situations.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "What does it mean to validate someone's feelings?",
          options: [
            "Agreeing with their perspective on the situation", 
            "Fixing the problem that's causing the feelings", 
            "Acknowledging and accepting their emotions without judgment", 
            "Telling them when they should feel better"
          ],
          correctAnswer: 2,
          explanation: "Validating feelings means acknowledging and accepting emotions without judgment. It communicates that feelings are understandable given the person's perspective and experience, even if others might feel differently in the same situation. Validation doesn't necessarily mean agreeing with the person's interpretation of events."
        },
        {
          id: "q2-mod2",
          question: "When supporting someone through grief, which approach is most helpful?",
          options: [
            "Keeping them busy so they don't have time to feel sad", 
            "Providing honest information, validating feelings, and offering appropriate choices", 
            "Avoiding mentioning the loss to prevent upsetting them", 
            "Telling them how they should be feeling at each stage"
          ],
          correctAnswer: 1,
          explanation: "Supporting someone through grief involves providing honest, clear information about what happened, validating their emotional responses, and offering appropriate choices about how they wish to express and process their grief. This balanced approach recognizes the reality of loss while providing emotional support."
        },
        {
          id: "q3-mod2",
          question: "What should you do if someone with limited verbal skills appears upset but can't tell you why?",
          options: [
            "Ignore it since they can't explain the problem", 
            "Immediately call for medical help", 
            "Pay attention to body language, offer communication tools, and present visual choices", 
            "Assume it's just part of their disability"
          ],
          correctAnswer: 2,
          explanation: "When someone with limited verbal skills is upset, you should pay close attention to their body language and behavior changes, offer appropriate communication tools like picture cards or devices, and present choices in accessible formats. These approaches respect the person's feelings and help identify the source of distress."
        },
        {
          id: "q4-mod2",
          question: "What is an appropriate way to balance support and space when someone is upset?",
          options: [
            "Always give them complete privacy until they feel better", 
            "Stay with them constantly to ensure their safety", 
            "Follow their lead, recognize when presence helps vs. overwhelms, and remain available", 
            "Have another client provide peer support instead"
          ],
          correctAnswer: 2,
          explanation: "Balancing support and space involves following the person's lead, recognizing when your presence is helpful versus overwhelming, offering comfort when appropriate, allowing private time for processing when needed, and remaining available without hovering. This balanced approach respects autonomy while providing necessary support."
        }
      ],
      audioUrl: "/Audio/Supporting People Through Life's Difficult Moments.wav",
      transcript: "In this audio segment, we explore strategies for supporting individuals through emotionally challenging situations. We discuss different types of difficult circumstances people might face, key principles for providing effective support, specific communication techniques for both verbal and non-verbal individuals, when to seek professional help, and the importance of self-care when supporting others through difficult times.",
      interactiveScenario: {
        title: "Supporting Through Grief and Loss",
        description: "In this scenario, you'll practice supporting someone who has experienced the loss of a loved one.",
        type: "multiple-choice",
        content: {
          scenario: "Maria, who has an intellectual disability, has just learned that her beloved grandmother has died. Her grandmother visited every Sunday for years. Maria is sitting on her bed, rocking back and forth and holding a photo of her grandmother. She looks at you with tears in her eyes and asks, 'When is Grandma coming back?'",
          decisions: [
            {
              prompt: "How do you respond to Maria's question?",
              options: [
                {
                  text: "\"Grandma is in heaven now and she's watching over you. Don't worry, you'll see her again someday.\"",
                  outcome: "This response, while well-intentioned, uses abstract concepts that may confuse Maria and doesn't clearly address the permanence of death.",
                  correct: false
                },
                {
                  text: "\"I know you miss your grandma. She died, which means her body stopped working and she can't come back. It's very sad, and it's okay to feel upset.\"",
                  outcome: "This response provides clear, concrete information about death while validating Maria's feelings. This helps her begin to understand what has happened.",
                  correct: true,
                  next: "nextStep"
                },
                {
                  text: "\"Let's not talk about sad things. Why don't we go get some ice cream to cheer you up?\"",
                  outcome: "This response avoids addressing Maria's question and dismisses her feelings by immediately trying to distract her. This may prevent her from processing her grief.",
                  correct: false
                },
                {
                  text: "\"Your grandmother was very old and sick, so it's actually good that she died because now she's not suffering anymore.\"",
                  outcome: "While this may be meant to comfort, it doesn't answer Maria's question and may make her feel that her grief is unjustified. It also assumes Maria understands concepts like suffering and relief.",
                  correct: false
                }
              ]
            },
            {
              id: "nextStep",
              prompt: "Maria begins to cry harder and says, \"But I want to see her!\" What is your best response?",
              options: [
                {
                  text: "\"You need to be brave now. Your grandmother wouldn't want you to cry.\"",
                  outcome: "This invalidates Maria's natural grief response and may make her feel shame for expressing emotions.",
                  correct: false
                },
                {
                  text: "\"I'll sit here with you while you cry. It's really hard when someone we love dies. Would you like a hug or would you prefer I just sit with you?\"",
                  outcome: "This validates Maria's feelings, offers comfort on her terms, and demonstrates that you're there to support her through her grief.",
                  correct: true,
                  next: "finalStep"
                },
                {
                  text: "\"Let's call your mom right away so she can help you feel better.\"",
                  outcome: "While involving family can be helpful, immediately calling someone else may make Maria feel that you're uncomfortable with her emotions or unable to support her.",
                  correct: false
                },
                {
                  text: "\"Let's put the photo away for now so you don't feel so sad.\"",
                  outcome: "Removing the photo dismisses the importance of Maria's connection to her grandmother and may interrupt a healthy grief process.",
                  correct: false
                }
              ]
            },
            {
              id: "finalStep",
              prompt: "The next Sunday, which would normally be grandmother's visiting day, Maria seems agitated and keeps looking at the door. What would be the most supportive approach?",
              options: [
                {
                  text: "Don't mention her grandmother and try to keep her busy with other activities all day.",
                  outcome: "Avoiding the topic doesn't help Maria process her grief or understand the change in routine. This approach may increase her confusion and distress.",
                  correct: false
                },
                {
                  text: "Acknowledge that this is when her grandmother usually visited and create space to remember her, perhaps by looking at photos or sharing stories.",
                  outcome: "This acknowledges the significance of the day, helps Maria understand why she's feeling upset, and provides a healthy way to honor her grandmother's memory. This supports healthy grief processing.",
                  correct: true
                },
                {
                  text: "Tell Maria she needs to stop thinking about her grandmother now and get used to her not coming anymore.",
                  outcome: "This is insensitive to Maria's grief process and dismisses the significance of her relationship with her grandmother. It may damage your supportive relationship with Maria.",
                  correct: false
                },
                {
                  text: "Surprise Maria with a special outing to completely replace her grandmother's visit time.",
                  outcome: "While providing pleasant activities can be helpful, completely replacing the visit time without acknowledging its significance may confuse Maria and doesn't support her grief process.",
                  correct: false
                }
              ]
            }
          ]
        }
      }
    }
  ]
};
