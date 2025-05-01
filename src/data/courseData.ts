
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  content: string;
  audioUrl?: string;
  transcript?: string;
  questions: Question[];
  interactiveScenario?: {
    title: string;
    description: string;
    type: 'multiple-choice' | 'drag-drop' | 'dialogue';
    content: any; // This would be structured based on scenario type
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  modules: Module[];
}

// Demo courses data
export const courses: Course[] = [
  {
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
          }
        ],
        audioUrl: "https://example.com/audio/communication-strategies.mp3",
        transcript: "In this audio lesson, we explore key communication techniques for Direct Support Professionals, including active listening, using clear language, and understanding alternative communication methods. We discuss how to recognize communication barriers and adapt your approach accordingly."
      }
    ]
  },
  {
    id: "client-rights",
    title: "Understanding and Supporting Client Rights",
    description: "Learn how to uphold and advocate for the rights of individuals with developmental disabilities in your care.",
    category: "Ethics & Rights",
    instructor: "Maya Williams, JD",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    duration: "1.5 hours",
    modules: [
      {
        id: "mod-1",
        title: "Fundamental Rights of Clients",
        description: "Understanding the basic human and legal rights of individuals receiving support services.",
        videoUrl: "https://www.youtube.com/embed/meiU6TxysCg",
        content: `
# Fundamental Rights of Clients

All individuals with developmental disabilities have the same basic human rights as everyone else. As a Direct Support Professional, you play a crucial role in protecting and promoting these rights.

## Core Rights

### 1. Right to Dignity and Respect
- Being treated with courtesy and respect
- Having personal preferences acknowledged
- Privacy during personal care
- Having cultural and religious practices honored

### 2. Right to Self-Determination
- Making choices about daily activities
- Participating in decisions about support services
- Setting personal goals
- Taking reasonable risks

### 3. Right to Privacy and Confidentiality
- Private communications and visits
- Secure personal information
- Confidential health and support records
- Personal space and belongings

### 4. Right to Freedom from Abuse and Neglect
- Physical safety
- Emotional well-being
- Proper care and supervision
- Appropriate supports

### 5. Right to Participate in Community
- Access to community resources
- Opportunities for inclusion
- Transportation options
- Development of social connections

## Legal Protections

Several laws protect the rights of individuals with developmental disabilities:

- Americans with Disabilities Act (ADA)
- Developmental Disabilities Assistance and Bill of Rights Act
- Individuals with Disabilities Education Act (IDEA)
- Fair Housing Act
- State-specific disability rights laws

## Role of Direct Support Professionals

As a DSP, you should:
- Understand and respect all client rights
- Advocate when rights are at risk
- Support individuals to exercise their rights
- Report rights violations
- Help educate others about disability rights
`,
        questions: [
          {
            id: "q1-mod1",
            question: "Which of the following is NOT a fundamental right of clients?",
            options: ["Right to privacy", "Right to make all decisions without any guidance", "Right to be treated with dignity", "Right to appropriate services"],
            correctAnswer: 1,
            explanation: "While clients have the right to make many decisions, there are cases where guidance and support in decision-making is appropriate and necessary, especially when safety is concerned."
          },
          {
            id: "q2-mod1",
            question: "What should a DSP do if they witness a potential violation of a client's rights?",
            options: [
              "Ignore it if it seems minor", 
              "Report it through appropriate channels", 
              "Confront the person violating the rights aggressively", 
              "Wait to see if it happens again"
            ],
            correctAnswer: 1,
            explanation: "DSPs have a responsibility to report any potential rights violations through the proper reporting channels immediately. This is part of your role as an advocate for those you support."
          },
          {
            id: "q3-mod1",
            question: "What does 'self-determination' mean in the context of supporting individuals with developmental disabilities?",
            options: [
              "Individuals making their own choices and decisions about their lives", 
              "Staff determining what's best for each individual", 
              "Doctors prescribing the most appropriate treatments", 
              "Families making all decisions for their relatives"
            ],
            correctAnswer: 0,
            explanation: "Self-determination refers to individuals making their own choices and having control over decisions that affect their lives, with appropriate support when needed."
          }
        ],
        audioUrl: "https://example.com/audio/client-rights.mp3",
        transcript: "This audio lesson covers the fundamental rights of individuals with developmental disabilities and the legal protections in place to uphold these rights. We discuss how DSPs can effectively advocate for and support client rights in everyday practice."
      },
      {
        id: "mod-2",
        title: "Advocacy and Empowerment",
        description: "Learn how to effectively advocate for the individuals you support and empower them to self-advocate.",
        videoUrl: "https://www.youtube.com/embed/2fXPLp3apUo",
        content: `
# Advocacy and Empowerment

Advocacy is the act of supporting or recommending a particular cause or policy. As a Direct Support Professional, you play a crucial role in advocating for the individuals you support and helping them develop self-advocacy skills.

## Types of Advocacy

### 1. Individual Advocacy
- Speaking up for the specific needs of one person
- Ensuring their voice is heard in meetings and discussions
- Advocating for appropriate accommodations and services

### 2. Systems Advocacy
- Working to change policies or practices that affect many people
- Identifying patterns of barriers or discrimination
- Collaborating with organizations to improve service systems

### 3. Self-Advocacy
- Supporting individuals to speak for themselves
- Teaching skills to express needs and preferences
- Building confidence in decision-making

## Building Self-Advocacy Skills

To help individuals develop self-advocacy skills:

- Provide information in accessible formats
- Teach about rights and responsibilities
- Practice communication skills
- Support participation in self-advocacy groups
- Celebrate successful advocacy

## Overcoming Barriers to Advocacy

Common barriers include:

- Historical disempowerment
- Communication challenges
- Low expectations from others
- Lack of confidence
- Insufficient information or resources

## Ethical Considerations

As an advocate, always consider:
- The individual's preferences, not your personal views
- Potential conflicts of interest
- The balance between protection and empowerment
- The importance of informed consent
- Cultural and family contexts

Remember that effective advocacy is about amplifying the individual's voice, not replacing it with your own.
`,
        questions: [
          {
            id: "q1-mod2",
            question: "What is self-advocacy?",
            options: [
              "When family members speak up for their relatives",
              "When individuals with disabilities speak up for themselves",
              "When DSPs demand better working conditions",
              "When organizations lobby for policy changes"
            ],
            correctAnswer: 1,
            explanation: "Self-advocacy is when individuals with disabilities speak up and represent themselves, making their own choices, expressing their needs, and standing up for their rights."
          },
          {
            id: "q2-mod2",
            question: "As a DSP, how can you best support someone to develop self-advocacy skills?",
            options: [
              "Make all decisions for them to demonstrate good decision-making",
              "Provide accessible information and opportunities to practice making choices",
              "Protect them from ever experiencing the consequences of choices",
              "Speak for them in all meetings to ensure their needs are met"
            ],
            correctAnswer: 1,
            explanation: "Supporting self-advocacy involves providing accessible information, teaching about rights, and creating opportunities to practice making choices and experiencing appropriate consequences in a supportive environment."
          },
          {
            id: "q3-mod2",
            question: "What is a potential ethical concern when advocating for someone?",
            options: [
              "Being too effective at getting their needs met",
              "Spending too much time listening to their preferences",
              "Substituting your preferences for theirs",
              "Involving them too much in the advocacy process"
            ],
            correctAnswer: 2,
            explanation: "A major ethical concern in advocacy is imposing your own preferences or values instead of truly representing the individual's wishes. Effective advocacy amplifies their voice rather than replacing it with your own."
          }
        ],
        audioUrl: "https://example.com/audio/advocacy-empowerment.mp3",
        transcript: "In this audio segment, we discuss the different types of advocacy and how DSPs can effectively support the individuals they work with to develop self-advocacy skills. We explore ethical considerations and strategies for overcoming common barriers to successful advocacy."
      }
    ]
  },
  {
    id: "medication-admin",
    title: "Medication Administration Basics",
    description: "Essential knowledge and skills for safely administering medications to individuals with developmental disabilities.",
    category: "Healthcare",
    instructor: "Dr. Marcus Lee, PharmD",
    thumbnail: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de",
    duration: "3 hours",
    modules: [
      {
        id: "mod-1",
        title: "Medication Safety Principles",
        description: "Learn the core principles of medication safety and proper administration techniques.",
        videoUrl: "https://www.youtube.com/embed/e2gFKX-jjL8",
        content: `
# Medication Safety Principles

Medication administration is a critical responsibility for many Direct Support Professionals. Safe medication practices protect the health and well-being of the individuals you support.

## The Five Rights of Medication Administration

Always verify these five elements before administering any medication:

### 1. Right Person
- Check identification to ensure medication is given to correct individual
- Use at least two identifiers (name, photo, date of birth)
- Be familiar with the individual and their medication regimen

### 2. Right Medication
- Check the medication label three times:
  - When taking the medication from storage
  - Before preparing or pouring the medication
  - Before returning the container to storage
- Check expiration dates
- Know the purpose of each medication

### 3. Right Dose
- Verify the prescribed dose on the medication order
- Understand basic measurements (mg, ml, etc.)
- Use proper measuring devices
- Never guess about dosage

### 4. Right Time
- Administer medications at prescribed times
- Understand timing terminology (daily, BID, PRN, etc.)
- Document time of administration
- Know which medications must be given with food or on empty stomach

### 5. Right Route
- Confirm correct method of administration
  - Oral (by mouth)
  - Topical (applied to skin)
  - Sublingual (under tongue)
  - Rectal or vaginal
  - Other routes require specialized training

## Documentation Requirements

Always document:
- Medication given
- Dose administered
- Time of administration
- Any refusals or missed doses
- Observations of effects or side effects

## DSP Scope of Practice

As a DSP, you may:
- Administer medication according to orders
- Document properly
- Monitor for side effects
- Report concerns

You may NOT:
- Adjust dosages without orders
- Discontinue medications
- Provide medical advice
- Administer certain types of medications without special training

## Reporting Medication Errors

If a medication error occurs:
1. Ensure the individual's safety
2. Notify your supervisor immediately
3. Contact medical professionals as needed
4. Document the error
5. Participate in process improvement

Remember: Medication errors are serious but reporting them promptly is essential for individual safety and system improvement.
`,
        questions: [
          {
            id: "q1-mod1",
            question: "What is the most important step before administering any medication?",
            options: ["Recording the time", "Checking the 'five rights' of medication administration", "Washing your hands", "Asking the client if they want the medication"],
            correctAnswer: 1,
            explanation: "The 'five rights' (right patient, right medication, right dose, right time, right route) are essential safety checks before any medication administration."
          },
          {
            id: "q2-mod1",
            question: "What should a DSP do if they realize they've given the wrong medication to someone?",
            options: [
              "Wait to see if there are any negative effects before reporting", 
              "Immediately notify their supervisor and follow emergency protocols", 
              "Give the correct medication right away to make up for the error", 
              "Document the error but only tell the supervisor during regular hours"
            ],
            correctAnswer: 1,
            explanation: "Medication errors require immediate reporting to your supervisor and following emergency protocols as needed. The individual's safety is the priority, and prompt action is essential."
          },
          {
            id: "q3-mod1",
            question: "What does 'PRN' mean in medication administration?",
            options: [
              "Patient requires notification", 
              "Prescribe right now", 
              "As needed", 
              "Post regular nighttime"
            ],
            correctAnswer: 2,
            explanation: "PRN stands for 'pro re nata' in Latin, which means 'as needed.' PRN medications are given only when necessary according to specific conditions or symptoms described in the medication order."
          },
          {
            id: "q4-mod1",
            question: "When should you check the medication label when administering medications?",
            options: [
              "Once, when preparing the medication", 
              "Three times: when taking from storage, before preparing, and before returning to storage", 
              "Only when you're unfamiliar with the medication", 
              "Only when administering controlled substances"
            ],
            correctAnswer: 1,
            explanation: "Medication labels should be checked three times during the administration process: when taking the medication from storage, before preparing or pouring it, and before returning the container to storage. This triple-check helps prevent errors."
          }
        ],
        audioUrl: "https://example.com/audio/medication-safety.mp3",
        transcript: "This audio segment covers the essential principles of medication safety, including the five rights of medication administration, proper documentation requirements, and what to do if a medication error occurs. We emphasize the importance of following protocols and understanding your scope of practice."
      },
      {
        id: "mod-2",
        title: "Common Medications and Side Effects",
        description: "Overview of medications commonly prescribed for individuals with developmental disabilities and their potential side effects.",
        videoUrl: "https://www.youtube.com/embed/XN69dzX07_g",
        content: `
# Common Medications and Side Effects

Understanding common medications and their side effects helps Direct Support Professionals provide better care and monitor for potential concerns. This overview is informational—always refer to medical professionals for specific guidance.

## Categories of Common Medications

### 1. Antipsychotics
**Examples:** Risperidone, Aripiprazole, Quetiapine
**Used for:** Managing challenging behaviors, psychosis, severe anxiety
**Common side effects:**
- Drowsiness
- Weight gain
- Dry mouth
- Movement disorders (tremors, stiffness)
- Metabolic changes (blood sugar, cholesterol)

### 2. Mood Stabilizers
**Examples:** Valproate, Lamotrigine, Lithium
**Used for:** Mood swings, behavioral regulation, seizure control
**Common side effects:**
- Nausea
- Tremor
- Weight changes
- Coordination problems
- Liver effects (requires monitoring)

### 3. Anti-anxiety Medications
**Examples:** Lorazepam, Buspirone
**Used for:** Anxiety, agitation
**Common side effects:**
- Sedation
- Dizziness
- Balance problems
- Potential for dependence (benzodiazepines)
- Memory issues

### 4. Antidepressants
**Examples:** Fluoxetine, Sertraline, Escitalopram
**Used for:** Depression, anxiety, OCD behaviors
**Common side effects:**
- Nausea
- Headache
- Sleep changes
- Sexual dysfunction
- Initial increase in anxiety

### 5. Stimulants
**Examples:** Methylphenidate, Amphetamine compounds
**Used for:** ADHD, attention issues
**Common side effects:**
- Decreased appetite
- Sleep difficulties
- Increased heart rate and blood pressure
- Irritability
- Rebound effects when wearing off

### 6. Anti-seizure Medications
**Examples:** Levetiracetam, Carbamazepine, Phenytoin
**Used for:** Seizure disorders, sometimes mood stabilization
**Common side effects:**
- Dizziness
- Fatigue
- Vision changes
- Coordination problems
- Cognitive effects

## When to Be Concerned

Contact medical professionals immediately if you observe:
- Severe allergic reactions (rash, swelling, difficulty breathing)
- Extreme sedation or inability to wake
- Falls or significant confusion
- New or unusual behaviors
- Suicidal thoughts or statements
- Seizure activity
- Severe vomiting or diarrhea

## Monitoring Guidelines

For effective medication monitoring:
- Know baseline behaviors and functioning
- Document changes objectively
- Use consistent observation techniques
- Report patterns, not just isolated incidents
- Consider environmental factors that might influence medication effects

Remember: As a DSP, your role is to observe and report, not diagnose or adjust medications. Regular communication with healthcare providers is essential.
`,
        questions: [
          {
            id: "q1-mod2",
            question: "Which of these would require IMMEDIATE medical attention?",
            options: [
              "Slight drowsiness after taking a new medication", 
              "Mild dry mouth", 
              "Difficulty breathing and facial swelling after taking medication", 
              "Temporary loss of appetite"
            ],
            correctAnswer: 2,
            explanation: "Difficulty breathing and facial swelling suggest a potentially severe allergic reaction that requires immediate medical attention. This could be anaphylaxis, which is life-threatening."
          },
          {
            id: "q2-mod2",
            question: "What is a common side effect of antipsychotic medications?",
            options: [
              "Increased energy levels", 
              "Weight gain", 
              "Hair loss", 
              "Improved concentration"
            ],
            correctAnswer: 1,
            explanation: "Weight gain is a common side effect of many antipsychotic medications. Monitoring weight and metabolic changes is an important part of supporting someone taking these medications."
          },
          {
            id: "q3-mod2",
            question: "As a DSP, what is your responsibility regarding medication side effects?",
            options: [
              "Adjust medications to reduce side effects", 
              "Research alternative medications", 
              "Observe and document side effects and report them to appropriate medical staff", 
              "Discontinue medications that cause any side effects"
            ],
            correctAnswer: 2,
            explanation: "A DSP's role is to observe and document side effects and report them to appropriate medical staff. DSPs should never adjust, discontinue, or substitute medications, as these actions require medical authorization."
          }
        ],
        audioUrl: "https://example.com/audio/common-medications.mp3",
        transcript: "In this audio lesson, we discuss common medications prescribed for individuals with developmental disabilities, their uses, and potential side effects. We emphasize the importance of observation and reporting, and outline when side effects should prompt immediate medical attention."
      }
    ]
  },
  {
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
  }
];

