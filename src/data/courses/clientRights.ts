
import { Course } from '../courseTypes';

export const clientRightsCourse: Course = {
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
};
