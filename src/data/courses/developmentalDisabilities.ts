
import { Module, Course } from "@/data/courseTypes";

// Module 1: Developmental Disabilities Overview
const developmentalDisabilitiesOverview: Module = {
  id: "dd-overview-1",
  title: "Understanding Developmental Disabilities",
  description: "Learn about developmental disabilities, their characteristics, and common diagnoses.",
  content: `# Understanding Developmental Disabilities

Developmental disabilities are a group of conditions that arise during the developmental period, usually before the age of 22, and result in lifelong physical, learning, language, or behavioral impairments. Each individual is unique, and while diagnoses may carry similarities, support strategies must always be person-centered.

## What Are Developmental Disabilities?

Developmental disabilities affect day-to-day functioning and typically include impairments in physical, learning, language, or behavior areas.

These conditions can impact:
- Communication
- Social interaction
- Mobility
- Independent living
- Self-care

They are lifelong but vary widely in severity and type.

Examples include:
- Congenital disabilities present at birth (e.g., Cerebral Palsy)
- Acquired developmental challenges due to early illness, injury, or genetics

## Common Diagnoses You May Encounter

### Autism Spectrum Disorder (ASD)
- Challenges in communication and social interaction
- May exhibit repetitive behaviors or intense interests
- Sensory sensitivities are common

### Down Syndrome
- Caused by a chromosomal difference (Trisomy 21)
- Physical traits may include low muscle tone and distinct facial features
- Usually associated with mild to moderate intellectual disability

### Intellectual Disability (ID)
- Characterized by limitations in intellectual functioning and adaptive behavior
- Affects reasoning, learning, problem-solving, and everyday social skills

### Cerebral Palsy (CP)
- A group of neurological disorders affecting movement and muscle coordination
- May involve speech, vision, or cognitive impairments depending on severity

> Note: Each individual presents differently, even within the same diagnosis.

## Person-First Language & Respectful Communication

### What is Person-First Language?
- Focuses on the individual, not the diagnosis (e.g., "a person with autism" vs. "an autistic person")
- Demonstrates dignity and acknowledges that disability is only one part of a person's identity

### Why It Matters
- Promotes respect and inclusion
- Reduces stigma and labels
- Builds stronger, more positive relationships

### Helpful Tips
- Always speak directly to the individual, not just to their caregiver
- Use calm, patient, and clear communication
- Respect nonverbal communication styles or alternative methods (e.g., communication boards, devices)
`,
  questions: [
    {
      id: "dd-q1",
      question: "Which of the following best describes developmental disabilities?",
      options: [
        "Conditions that can be cured with proper treatment",
        "Conditions arising during the developmental period that result in lifelong impairments",
        "Conditions that only affect physical abilities",
        "Temporary challenges that resolve by adulthood"
      ],
      correctAnswer: 1,
      explanation: "Developmental disabilities are conditions that arise during the developmental period (usually before age 22) and result in lifelong physical, learning, language, or behavioral impairments."
    },
    {
      id: "dd-q2",
      question: "What is person-first language?",
      options: [
        "Speaking primarily to individuals rather than their support staff",
        "Using technical medical terminology to describe disabilities",
        "Focusing on the individual rather than their disability (e.g., 'person with autism')",
        "Speaking as quickly as possible to maintain attention"
      ],
      correctAnswer: 2,
      explanation: "Person-first language focuses on the individual rather than their disability (e.g., 'person with autism' instead of 'autistic person'), acknowledging that disability is only one aspect of a person's identity."
    },
    {
      id: "dd-q3",
      question: "Which is NOT typically impacted by developmental disabilities?",
      options: [
        "Communication",
        "Social interaction",
        "Political views",
        "Independent living skills"
      ],
      correctAnswer: 2,
      explanation: "Developmental disabilities typically impact areas such as communication, social interaction, mobility, independent living, and self-care, but not personal beliefs like political views."
    }
  ]
};

// Module 2: Role of a DSP
const dspRoleModule: Module = {
  id: "dsp-role-1",
  title: "Role of a Direct Support Professional (DSP)",
  description: "Understand your responsibilities as a DSP and best practices for supporting individuals with developmental disabilities.",
  content: `# Role of a Direct Support Professional (DSP)

As a Direct Support Professional, you play a crucial role in helping individuals with developmental disabilities live fulfilling, self-directed lives. This module will help you understand your responsibilities and adopt best practices.

## Professional Boundaries and Relationships

Building supportive relationships is essential, but maintaining professional boundaries is equally important:

- **Be friendly without becoming a friend** - Maintain clarity about your professional role
- **Consistency matters** - Be reliable and follow through on commitments
- **Respect privacy** - Knock before entering spaces, avoid personal questions
- **Avoid dual relationships** - Don't mix professional and personal relationships
- **Maintain confidentiality** - Don't share personal information about people you support

## Health and Safety Protocols

As a DSP, you are often the first line of defense in preventing injury and illness:

### Daily Health Support
- Assist with medication according to your training and scope
- Support proper nutrition and hydration
- Help maintain personal hygiene when needed
- Use proper body mechanics for safe transfers
- Conduct regular environmental safety checks

### Documentation
- Record medication administration accurately
- Document any health concerns promptly
- Track symptoms or changes in condition
- Report emergencies according to protocol

## Confidentiality and HIPAA Compliance

Protecting privacy is both an ethical responsibility and a legal requirement:

- **What is HIPAA?** The Health Insurance Portability and Accountability Act protects sensitive patient health information
- **Protected Information includes:** diagnoses, treatment plans, medication lists, personal identifiers, and support needs
- **Key practices:**
  - Never discuss individuals you support in public places
  - Keep all documentation secure
  - Use secure methods to transmit information
  - Only share information with those who need to know and have proper authorization

## Supporting Independence and Self-Determination

Your role is to empower, not to control:

- Support individuals in making their own choices whenever possible
- Provide information in accessible formats to enable informed decisions
- Allow for dignity of risk - the right to make mistakes and learn
- Teach skills rather than doing tasks for individuals
- Celebrate steps toward independence, no matter how small
`,
  questions: [
    {
      id: "dsp-role-q1",
      question: "Which of the following is an appropriate professional boundary for a DSP?",
      options: [
        "Becoming close friends with the individuals you support",
        "Sharing detailed personal problems with individuals you support",
        "Maintaining a supportive but professional relationship",
        "Borrowing money from individuals you support during emergencies"
      ],
      correctAnswer: 2,
      explanation: "DSPs should maintain supportive but professional relationships, which means being friendly without becoming personal friends, maintaining appropriate boundaries while still being caring and supportive."
    },
    {
      id: "dsp-role-q2",
      question: "Under HIPAA regulations, which of the following is acceptable?",
      options: [
        "Discussing an individual's health condition with your spouse",
        "Sharing information with team members who are directly involved in the person's care",
        "Posting about your workday with anonymous client stories on social media",
        "Keeping medication records at your home for convenience"
      ],
      correctAnswer: 1,
      explanation: "HIPAA allows sharing protected health information with other team members who are directly involved in the person's care as this falls under the 'need to know' principle for providing appropriate care."
    }
  ]
};

// Module 3: Daily Documentation and Reporting
const documentationModule: Module = {
  id: "documentation-1",
  title: "Daily Documentation and Reporting",
  description: "Learn the importance of accurate, timely, and objective documentation in delivering quality services.",
  content: `# Daily Documentation and Reporting

Proper documentation is essential for providing quality care, ensuring accountability, and supporting each individual's progress toward their goals.

## Writing Daily Logs and Service Notes

Good documentation helps ensure continuity of care and serves as a legal record of services provided:

### Best Practices for Documentation:

#### DO:
- Be objective and factual: "John ate 75% of his lunch and took all medications as scheduled"
- Be specific: "Sarah participated in community outing for 45 minutes and interacted with 3 store employees"
- Document in a timely manner while details are fresh
- Use clear, professional language
- Include time, date, and your signature/credentials

#### DON'T:
- Use subjective language: "John was in a bad mood today"
- Make assumptions: "Sarah probably didn't want to participate"
- Use slang or unprofessional terminology
- Document late or backdate notes
- Include irrelevant personal opinions

## Special Incident Reporting (SIR)

Incident reports document unusual occurrences that affect individuals' health, safety, or well-being:

### What to Report:
- Injuries requiring more than basic first aid
- Medication errors
- Suspected abuse or neglect
- Behavioral incidents and interventions
- Property damage
- Missing persons
- Hospitalizations

### Reporting Process:
1. Ensure immediate safety needs are addressed
2. Document the incident completely and objectively
3. Include date, time, location, individuals involved, and actions taken
4. Report within required timeframes (often 24-48 hours)
5. Follow up as required by your organization

## Data Collection for Goals and Progress

Your documentation directly contributes to measuring progress toward individual goals:

### Tips for Goal-Related Documentation:
- Know the specific goals in each individual's plan
- Document exactly what you observed (frequency, duration, level of support needed)
- Note progress or barriers objectively
- Use the specific measurement systems defined in the goals
- Include both successes and challenges
`,
  questions: [
    {
      id: "doc-q1",
      question: "Which of these is an example of objective documentation?",
      options: [
        "Michael was difficult and refused to cooperate with morning routine",
        "Michael stated 'I don't want to get up' and required 3 verbal prompts to complete morning hygiene routine",
        "Michael was in a bad mood this morning as usual",
        "Michael needs to work harder on following his routine independently"
      ],
      correctAnswer: 1,
      explanation: "Objective documentation includes specific, observable facts rather than opinions or interpretations. The statement 'Michael stated 'I don't want to get up' and required 3 verbal prompts to complete morning hygiene routine' provides factual information without subjective judgment."
    },
    {
      id: "doc-q2",
      question: "When should an incident report be completed?",
      options: [
        "At the end of your shift if you have time",
        "Within 30 days of the incident",
        "As soon as possible after ensuring immediate safety needs are addressed",
        "Only if a supervisor instructs you to do so"
      ],
      correctAnswer: 2,
      explanation: "Incident reports should be completed as soon as possible after ensuring immediate safety needs are addressed, while details are fresh and accurate, and to ensure timely reporting of important events."
    }
  ]
};

// Module 4: Person-Centered Support
const personCenteredModule: Module = {
  id: "person-centered-1",
  title: "Person-Centered Support",
  description: "Deliver support that respects the individual's history, goals, preferences, and cultural background.",
  content: `# Person-Centered Support

Person-centered support puts the individual at the center of all planning and daily support activities, ensuring services are tailored to their unique preferences, needs, and aspirations.

## Person-Centered Planning

Person-centered planning is a collaborative approach that empowers individuals to direct their own lives:

### Core Principles:
- The individual is the primary decision-maker
- Planning focuses on strengths and capabilities, not just needs
- Support networks (family, friends) are essential partners
- Goals reflect what's important TO the person, not just FOR them
- Plans are living documents that change as people's lives and preferences evolve

### Key Elements of Person-Centered Plans:
- Personal preferences for daily routines
- Long and short-term goals based on the person's dreams
- Natural supports and community connections
- Cultural considerations
- Individualized strategies that work for the person

## Cultural Competency

Cultural awareness is essential for providing respectful, effective support:

### Cultural Considerations:
- Family structures and decision-making processes
- Religious/spiritual practices
- Food preferences and restrictions
- Communication styles
- Views on disability, health, and wellness
- Expectations about privacy
- Celebrations and traditions

### Developing Cultural Competence:
- Acknowledge your own cultural lens and biases
- Ask respectful questions and avoid assumptions
- Recognize that culture influences behavior and choices
- Adapt support to honor cultural preferences when possible
- Involve cultural brokers or interpreters when needed

## Creating Individualized Routines

Routines provide structure while honoring preferences and supporting goals:

### Collaborative Routine Development:
- Observe current patterns and preferences
- Ask about preferred times for activities
- Identify areas where choice is most important
- Balance structure with flexibility
- Consider energy levels throughout the day
- Incorporate meaningful activities and community integration
- Include strategies for success during transitions

### Supporting Choice Within Routines:
- Offer realistic options (e.g., "Would you prefer to shower in the morning or evening?")
- Use visual schedules when helpful
- Build in time for preferred activities
- Allow for adjustments based on how the person is feeling
- Respect when someone wants to change their routine
`,
  questions: [
    {
      id: "pcp-q1",
      question: "Which statement best reflects the person-centered approach?",
      options: [
        "The support team determines what's best for the individual",
        "The individual is the primary decision-maker about their own life",
        "Family members should make all important decisions",
        "Professionals know best about appropriate services and supports"
      ],
      correctAnswer: 1,
      explanation: "Person-centered support places the individual at the center of planning and decision-making. While team input is valuable, the individual should be the primary decision-maker about their own life whenever possible."
    },
    {
      id: "pcp-q2",
      question: "When creating individualized routines, what is most important?",
      options: [
        "Following the agency's standard schedule",
        "Ensuring all tasks are completed as efficiently as possible",
        "Balancing structure with flexibility and individual preferences",
        "Making sure the routine works well for staff schedules"
      ],
      correctAnswer: 2,
      explanation: "Effective individualized routines balance necessary structure with flexibility and individual preferences. This approach honors the person's choices while providing helpful structure for their day."
    }
  ]
};

// Module 5: Communication Strategies
const communicationModule: Module = {
  id: "communication-1",
  title: "Communication Strategies",
  description: "Strengthen communication with individuals who have a variety of communication styles and support needs.",
  content: `# Communication Strategies

Effective communication is the foundation of quality support. This module explores strategies for communicating with individuals who have diverse communication styles and needs.

## Verbal and Nonverbal Communication

Communication involves much more than words:

### Verbal Communication Tips:
- Use clear, concise language
- Adjust your pace - speak slowly if needed
- Give one instruction at a time
- Ask specific questions rather than open-ended ones if needed
- Allow extra time for processing information
- Check for understanding
- Avoid jargon or complex language

### Nonverbal Communication:
- Body language conveys as much as 55% of your message
- Maintain appropriate eye contact (consider cultural differences)
- Use a calm, open posture
- Be aware of personal space preferences
- Match facial expressions to your message
- Consider the emotional tone of your voice
- Use gestures to reinforce verbal messages when helpful

## Augmentative and Alternative Communication (AAC)

AAC includes methods and tools that support or replace spoken communication:

### Types of AAC:
- **No-tech:** Sign language, gestures, facial expressions
- **Low-tech:** Picture boards, communication books, visual schedules
- **High-tech:** Speech-generating devices, communication apps, eye-gaze systems

### Supporting AAC Users:
- Learn how to use the individual's specific communication system
- Give full attention when someone is communicating
- Be patient - AAC often takes more time than speech
- Position AAC tools within reach at all times
- Respond to all communication attempts
- Model use of the AAC system yourself when appropriate

## Listening for Understanding & Behavior as Communication

Effective communication requires active listening and recognizing that all behavior communicates:

### Active Listening:
- Give your full attention
- Avoid interrupting
- Confirm understanding by paraphrasing
- Notice nonverbal cues
- Be patient during pauses
- Ask clarifying questions

### Behavior as Communication:
- All behavior serves a purpose and communicates a message
- Common functions include:
  - Requesting attention or items
  - Escaping uncomfortable situations
  - Seeking sensory input or regulation
  - Communicating pain, discomfort, or emotions
- Look for patterns to understand the message
- Help develop more effective ways to communicate the same message
- Respond to the communication need, not just the behavior
`,
  questions: [
    {
      id: "comm-q1",
      question: "When supporting someone who uses a communication device, which approach is most appropriate?",
      options: [
        "Speak to their support staff instead to save time",
        "Give them limited choices to make communication faster",
        "Be patient and give them time to formulate their message",
        "Guess what they want to say to help them communicate"
      ],
      correctAnswer: 2,
      explanation: "Being patient and giving the person time to formulate their message shows respect for their communication style. AAC methods often take more time than verbal speech, and rushing can cause frustration and miscommunication."
    },
    {
      id: "comm-q2",
      question: "Which statement about behavior as communication is most accurate?",
      options: [
        "Challenging behaviors should be ignored to avoid reinforcing them",
        "All behavior serves a purpose and communicates a message",
        "Behavior issues indicate a person needs more structure and rules",
        "Behaviors unrelated to communication should be addressed with consequences"
      ],
      correctAnswer: 1,
      explanation: "All behavior serves a purpose and communicates a message. Understanding the function or purpose behind behavior is essential for responding appropriately and helping individuals develop more effective ways to communicate their needs."
    }
  ]
};

// Module 6: Emergency Response and Crisis Management
const emergencyResponseModule: Module = {
  id: "emergency-response-1",
  title: "Emergency Response and Crisis Management",
  description: "Be ready to act with confidence and calm during emergencies.",
  content: `# Emergency Response and Crisis Management

Being prepared for emergencies and crises is a critical responsibility for Direct Support Professionals. This module will help you respond effectively to various emergency situations.

## De-Escalation Techniques

De-escalation skills can prevent minor issues from becoming major incidents:

### Prevention:
- Know each individual's triggers and early warning signs
- Create supportive environments that reduce stress
- Recognize signs of escalating emotions
- Address needs before behaviors escalate

### When Tension Rises:
- Stay calm - manage your own emotions and body language
- Use a quiet, neutral tone of voice
- Maintain a safe distance
- Minimize environmental stimulation (reduce noise, people, etc.)
- Use simple, clear language
- Offer choices and solutions
- Avoid power struggles or threats
- Acknowledge feelings: "I can see you're feeling frustrated"
- Redirect to calming activities when possible

## Responding to Medical Emergencies

Quick, appropriate responses to medical emergencies can save lives:

### General Emergency Response:
1. Assess the situation - is it safe to approach?
2. Call for help following your agency protocol
3. Call 911 if indicated
4. Provide necessary first aid if trained
5. Stay with the individual
6. Document the incident thoroughly

### Specific Emergency Responses:

#### Seizures:
- Time the seizure
- Move hazards away (don't restrain the person)
- Turn them on their side if possible
- Never put anything in their mouth
- Call 911 if seizure lasts >5 minutes or is unusual for the person

#### Choking:
- Ask "Are you choking?" - if they can speak/cough forcefully, encourage coughing
- If they cannot speak/make sounds, perform appropriate abdominal thrusts
- Call 911 if the obstruction doesn't clear

## Abuse/Neglect Identification and Mandated Reporting

As a DSP, you are legally mandated to report suspected abuse or neglect:

### Signs of Potential Abuse or Neglect:
- Unexplained injuries or bruising
- Fearful behavior around specific people
- Withdrawal or behavior changes
- Torn, stained, or bloody clothing
- Poor hygiene
- Untreated medical needs
- Malnourishment
- Missing personal items or money

### Mandated Reporting Process:
1. Ensure immediate safety
2. Report suspicions - you don't need proof
3. Follow your agency's reporting protocol
4. Contact appropriate authorities (varies by state)
5. Document your observations objectively
6. Maintain confidentiality
7. Cooperate with investigators

> Remember: Failing to report suspected abuse or neglect is a legal violation that can result in penalties.
`,
  questions: [
    {
      id: "emg-q1",
      question: "When someone is having a seizure, what should you do?",
      options: [
        "Hold them down to prevent injury",
        "Put something in their mouth to prevent them from biting their tongue",
        "Time the seizure and move hazards away",
        "Immediately place them in a cold shower"
      ],
      correctAnswer: 2,
      explanation: "During a seizure, you should time the seizure, move hazards away to prevent injury, and never restrain the person or put anything in their mouth. Timing the seizure provides important medical information, and moving hazards helps prevent injuries."
    },
    {
      id: "emg-q2",
      question: "As a mandated reporter, when must you report suspected abuse?",
      options: [
        "Only when you have definitive proof abuse occurred",
        "When you have a reasonable suspicion of abuse or neglect",
        "Only after consulting with your supervisor",
        "Only for severe cases of physical abuse"
      ],
      correctAnswer: 1,
      explanation: "Mandated reporters must report when they have a reasonable suspicion of abuse or neglect. You do not need definitive proof, and failure to report suspicions is a legal violation that can result in penalties."
    }
  ]
};

// Module 7: Professional Growth & Teamwork
const professionalGrowthModule: Module = {
  id: "professional-growth-1",
  title: "Professional Growth & Teamwork",
  description: "Encourage career development, healthy workplace communication, and collaborative team dynamics.",
  content: `# Professional Growth & Teamwork

Developing as a professional and working effectively with others are essential aspects of being a successful Direct Support Professional.

## Seeking Help and Using Supervision Effectively

Asking for help shows professionalism and commitment to quality support:

### When to Seek Help:
- When you're unsure about how to support someone
- When you notice changes in someone's behavior or health
- When you face a situation outside your training
- When you're struggling with burnout or compassion fatigue
- When you need guidance on professional boundaries

### Making the Most of Supervision:
- Come prepared with specific questions or situations
- Be open to feedback and suggestions
- Take notes on guidance provided
- Follow through on agreed-upon action steps
- Share both successes and challenges
- Use supervision to reflect on your practice and growth

## Continuing Education and Training

Ongoing learning is essential in the rapidly evolving field of disability services:

### Professional Development Opportunities:
- Formal certifications (e.g., DSP-C, CNA, medication administration)
- Specialized training (behavior support, mental health, specific disabilities)
- Conferences and workshops
- Online courses and webinars
- Peer learning and mentoring
- Reading journals and research

### Creating a Learning Plan:
- Identify your strengths and areas for growth
- Set specific learning goals
- Look for trainings related to individuals you support
- Keep records of all completed training
- Apply new knowledge in your daily practice
- Share what you've learned with your team

## Team Communication and Conflict Resolution

Effective teamwork creates consistent, quality support for individuals:

### Team Communication Strategies:
- Use multiple methods (shift reports, communication logs, meetings)
- Document important information clearly
- Listen actively to others' perspectives
- Share relevant observations about individuals you support
- Acknowledge others' contributions
- Be reliable with follow-through on commitments

### Resolving Conflicts Professionally:
- Address issues directly with the person involved first
- Focus on the issue, not personal criticism
- Use "I" statements to express concerns
- Listen to understand the other perspective
- Look for mutually acceptable solutions
- Know when to involve a supervisor
- Maintain confidentiality about team conflicts
- Remember the shared goal: quality support for individuals
`,
  questions: [
    {
      id: "prof-q1",
      question: "Which approach demonstrates effective use of supervision?",
      options: [
        "Waiting until your supervisor notices you need help",
        "Coming prepared with specific questions and being open to feedback",
        "Focusing only on your successes to make a good impression",
        "Getting advice but using your own judgment about whether to follow it"
      ],
      correctAnswer: 1,
      explanation: "Effective use of supervision involves coming prepared with specific questions and being open to feedback. This approach demonstrates professionalism and a commitment to growth and improvement in your role."
    },
    {
      id: "prof-q2",
      question: "What is the most professional approach to resolving a conflict with a coworker?",
      options: [
        "Discussing the issue with other team members to get their support",
        "Reporting the problem to a supervisor immediately",
        "Addressing the issue directly with the person involved first",
        "Documenting the problem in case it continues"
      ],
      correctAnswer: 2,
      explanation: "The most professional approach to conflict resolution is addressing the issue directly with the person involved first. This demonstrates respect, promotes open communication, and often resolves issues more effectively than involving others initially."
    }
  ]
};

// Module 8: Interactive Scenario Practice
const scenarioModule: Module = {
  id: "scenario-practice-1",
  title: "Scenario Practice",
  description: "Apply your knowledge in realistic scenarios to build practical skills.",
  content: `# Interactive Scenario Practice

This module presents realistic scenarios you might encounter as a DSP. Each scenario offers the opportunity to apply what you've learned about supporting individuals with developmental disabilities.

Choose the approach you would take in each situation, then review the feedback to understand the reasoning behind the best practice response.

## Scenario 1: Supporting Self-Determination

**Situation:** David, who has an intellectual disability, wants to cook his own meals but has limited experience in the kitchen. His parents and some team members are concerned about safety risks.

**Your Role:** Consider how you would balance David's right to make his own choices with safety considerations.

## Scenario 2: Communication Support

**Situation:** Maya, who has autism, becomes visibly upset at a community festival. She doesn't use verbal speech and doesn't have her communication device with her.

**Your Role:** Think about how you would recognize what Maya is communicating and how to support her effectively.

## Scenario 3: Documentation Dilemma

**Situation:** You notice a significant bruise on Cameron's arm that wasn't there yesterday. He tells you he fell out of bed, but you're not sure if that explains the location and size of the bruise.

**Your Role:** Consider how you would document this observation and what actions you should take.

## Scenario 4: Professional Boundaries

**Situation:** Eliza, whom you support, asks you to be her friend on social media and to come to her birthday party on your day off.

**Your Role:** Think about how you would maintain appropriate professional boundaries while preserving a positive supportive relationship.

> For each scenario, consider the principles of person-centered support, dignity of risk, professional responsibility, and best practices in developmental disability services.
`,
  interactiveScenario: {
    title: "Supporting Self-Determination Scenario",
    description: "David, who has an intellectual disability, wants to cook his own meals but has limited experience in the kitchen. His parents and some team members are concerned about safety risks. How would you approach this situation?",
    type: "multiple-choice",
    options: [
      {
        id: "1",
        text: "Tell David that cooking is too dangerous and offer to cook for him instead",
        isCorrect: false,
        feedback: "This approach doesn't respect David's self-determination and desire to increase his independence. It assumes he can't learn kitchen safety skills."
      },
      {
        id: "2",
        text: "Support David to cook whatever he wants without any safety precautions",
        isCorrect: false,
        feedback: "This approach values autonomy but neglects the very real safety considerations. A balanced approach that teaches safety while supporting independence would be better."
      },
      {
        id: "3",
        text: "Work with David to develop cooking skills gradually, starting with safer options and providing appropriate support",
        isCorrect: true,
        feedback: "This is the best approach because it respects David's desire for independence while acknowledging safety concerns. It provides a supported learning opportunity that can build skills over time."
      },
      {
        id: "4",
        text: "Ask David's parents to make the decision since they know him best",
        isCorrect: false,
        feedback: "While family input is valuable, deferring entirely to parents doesn't respect David's adult status and right to make his own choices with appropriate support."
      }
    ]
  },
  questions: [
    {
      id: "scen-q1",
      question: "In the Documentation Dilemma scenario, what is the most appropriate action?",
      options: [
        "Ask other staff if they know how Cameron got the bruise",
        "Document your observation objectively and report according to your agency's protocol",
        "Wait to see if more bruises appear before reporting",
        "Ask Cameron repeatedly until you get a better explanation"
      ],
      correctAnswer: 1,
      explanation: "The most appropriate action is to document your observation objectively and follow your agency's reporting protocol. This fulfills your responsibility as a mandated reporter while maintaining professional standards for documentation."
    }
  ]
};

// Full Developmental Disabilities Course 
export const developmentalDisabilitiesCourse: Course = {
  id: "dd-course-1",
  title: "Understanding Developmental Disabilities",
  description: "A comprehensive course for Direct Support Professionals working with young adults with developmental disabilities. Learn about different types of disabilities, communication strategies, person-centered support, and professional responsibilities.",
  category: "Direct Support",
  instructor: "DSP Training Team",
  thumbnail: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  duration: "8-10 hours",
  modules: [
    developmentalDisabilitiesOverview,
    dspRoleModule,
    documentationModule,
    personCenteredModule,
    communicationModule,
    emergencyResponseModule,
    professionalGrowthModule,
    scenarioModule
  ],
  certificateAvailable: true,
  domain: "supportive-living"
};
