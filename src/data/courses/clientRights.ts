
import { Course } from '../courseTypes';

export const clientRightsCourse: Course = {
  id: "client-rights",
  title: "Understanding and Supporting Client Rights",
  description: "Learn how to uphold and advocate for the rights of individuals with developmental disabilities in your care.",
  category: "Ethics & Rights",
  instructor: "Maya Williams, JD",
  thumbnail: "/Images/clientsRights.png",
  duration: "45 min",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Fundamental Rights of Clients",
      description: "Understanding the basic human and legal rights of individuals receiving support services.",
      videoUrl: "https://youtu.be/9hlFHQLS8C4",
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

## California-Specific Rights for People with Developmental Disabilities

People with developmental disabilities have the same basic rights and responsibilities as all other legal residents of the United States and the state of California. California law also gives people with developmental disabilities some additional special rights.

These rights include:

- A right to treatment and habilitation services and supports in the least restrictive environment. These services and supports should foster the developmental potential of the person and be directed toward the achievement of the most independent, productive, normal life possible. Such services shall protect the personal liberty of the individual, and shall be provided with the least restrictive conditions necessary.
- A right to dignity, privacy and humane care. To the maximum extent possible, treatment, services and supports shall be provided in natural community settings.
- A right to participate in an appropriate program of publicly supported education, regardless of degree of disability.
- A right to prompt medical care and treatment.
- A right to religious freedom and practice.
- A right to social interaction and participation in community activities.
- A right to physical exercise and recreational opportunities.
- A right to be free from harm, including unnecessary physical restraint or isolation, excessive medication, abuse or neglect.
- A right to be free from hazardous procedures.
- A right to make choices in their own lives, including, but not limited to: where and with whom they live; their relationships with people in their community; the way they spend their time, including education, employment and leisure; the pursuit of their personal future; and program planning and implementation.
- A right to have relationships, marry, be part of a family, and to parent if they so choose.

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
        },
        {
          id: "q4-mod1",
          question: "Which legislation provides broad protections against discrimination for people with disabilities?",
          options: [
            "Fair Housing Act only", 
            "Americans with Disabilities Act (ADA)", 
            "Family Medical Leave Act", 
            "Social Security Act"
          ],
          correctAnswer: 1,
          explanation: "The Americans with Disabilities Act (ADA) is comprehensive civil rights legislation that prohibits discrimination against individuals with disabilities in all areas of public life, including jobs, schools, transportation, and all public and private places that are open to the general public."
        },
        {
          id: "q5-mod1",
          question: "What is meant by the right to dignity and respect?",
          options: [
            "Being given expensive gifts", 
            "Having all requests granted immediately", 
            "Being treated as a valued individual with courtesy and having preferences acknowledged", 
            "Being left alone whenever requested"
          ],
          correctAnswer: 2,
          explanation: "The right to dignity and respect means being treated as a valued individual with courtesy, having personal preferences acknowledged, receiving privacy during personal care, and having cultural and religious practices honored."
        },
        {
          id: "q6-mod1",
          question: "Why is the right to privacy important for individuals with developmental disabilities?",
          options: [
            "It's not actually important since they need constant supervision", 
            "To hide information from their families", 
            "It acknowledges their personhood and preserves their dignity", 
            "Only to satisfy legal requirements"
          ],
          correctAnswer: 2,
          explanation: "The right to privacy is important because it acknowledges the individual's personhood, preserves their dignity, and shows respect for them as independent human beings with the same basic needs and rights as everyone else."
        },
        {
          id: "q7-mod1",
          question: "How can a DSP support an individual's right to community participation?",
          options: [
            "By keeping them in specialized settings for safety", 
            "By facilitating access to community resources and transportation", 
            "By deciding which community activities are appropriate for them", 
            "By limiting participation to disability-specific programs"
          ],
          correctAnswer: 1,
          explanation: "DSPs can support community participation by facilitating access to community resources, providing or arranging transportation options, helping develop social connections, and supporting inclusion in typical community activities."
        },
        {
          id: "q8-mod1",
          question: "Which statement about confidentiality is most accurate?",
          options: [
            "Information can be freely shared with anyone who asks", 
            "Personal information should only be shared with those who need to know for support purposes", 
            "All information must be kept secret even from the healthcare team", 
            "Confidentiality only applies to medical information"
          ],
          correctAnswer: 1,
          explanation: "Confidentiality means that personal information should only be shared with those who need to know for support purposes. This protects privacy while ensuring appropriate care coordination among necessary team members."
        },
        {
          id: "q9-mod1",
          question: "What is a supported decision-making approach?",
          options: [
            "When staff make all decisions for individuals", 
            "When individuals make all decisions completely independently", 
            "When individuals receive the support they need to understand options and make their own informed choices", 
            "When family members make decisions for their adult relatives"
          ],
          correctAnswer: 2,
          explanation: "Supported decision-making is an approach where individuals with disabilities receive the support they need to understand, evaluate, and communicate their choices, while maintaining their right to make decisions about their own lives."
        },
        {
          id: "q10-mod1",
          question: "What should a DSP consider when balancing an individual's right to take risks with safety concerns?",
          options: [
            "Always prioritize absolute safety over any risk", 
            "Allow any risk the person wants to take regardless of consequences", 
            "Consider the specific risk, the person's understanding, and whether there are ways to mitigate danger while respecting choice", 
            "Let supervisors make all decisions about risk"
          ],
          correctAnswer: 2,
          explanation: "DSPs should consider the specific risk involved, the person's understanding of consequences, and whether there are ways to mitigate danger while respecting choice. The goal is to support informed risk-taking rather than eliminating all risk or allowing dangerous situations."
        }
      ],
      audioUrl: "/Audio/Client Rights and Dignity of Risk.wav",
      transcript: "This audio lesson covers the fundamental rights of individuals with developmental disabilities and the legal protections in place to uphold these rights. We discuss how DSPs can effectively advocate for and support client rights in everyday practice."
    },
    {
      id: "mod-2",
      title: "Advocacy and Empowerment",
      description: "Learn how to effectively advocate for the individuals you support and empower them to self-advocate.",
      videoUrl: "https://youtu.be/DF_JG2PDSuE",
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
        },
        {
          id: "q4-mod2",
          question: "What is 'systems advocacy'?",
          options: [
            "Helping one person communicate with their doctor",
            "Working to change policies or practices that affect many people",
            "Upgrading computer systems in support organizations",
            "Creating better filing systems for client records"
          ],
          correctAnswer: 1,
          explanation: "Systems advocacy involves working to change policies, practices, or structures that affect many people. It addresses patterns of barriers or discrimination and aims to create broader systemic improvements."
        },
        {
          id: "q5-mod2",
          question: "What is a common barrier to effective advocacy for individuals with developmental disabilities?",
          options: [
            "Too many advocates available",
            "Excessive funding for advocacy programs",
            "Historical disempowerment and low expectations from others",
            "Too much emphasis on independence"
          ],
          correctAnswer: 2,
          explanation: "Historical disempowerment and low expectations from others are common barriers to effective advocacy. Many individuals with disabilities have experienced others making decisions for them and may not have had opportunities to develop advocacy skills."
        },
        {
          id: "q6-mod2",
          question: "In what situation might a DSP need to engage in individual advocacy?",
          options: [
            "When creating agency-wide policy changes",
            "When lobbying the government for increased funding",
            "When ensuring a person's accommodations are provided at a medical appointment",
            "When organizing a protest against discrimination"
          ],
          correctAnswer: 2,
          explanation: "Individual advocacy involves speaking up for the specific needs of one person, such as ensuring their accommodations are provided at a medical appointment, or that their voice is heard in a planning meeting."
        },
        {
          id: "q7-mod2",
          question: "Why is it important to celebrate successful advocacy?",
          options: [
            "To impress supervisors with your effectiveness",
            "To reinforce skills and build confidence for future advocacy",
            "To create competition between different individuals",
            "To demonstrate the superiority of staff advocacy over self-advocacy"
          ],
          correctAnswer: 1,
          explanation: "Celebrating successful advocacy reinforces skills and builds confidence for future advocacy efforts. Recognizing these successes helps individuals see that their voice matters and can have a positive impact."
        },
        {
          id: "q8-mod2",
          question: "What does informed consent mean in the context of advocacy?",
          options: [
            "Signing any form presented by professionals",
            "Understanding the purpose, potential risks, and benefits of advocacy actions before agreeing to them",
            "Getting permission from family members",
            "Having a formal legal document"
          ],
          correctAnswer: 1,
          explanation: "Informed consent means the individual understands the purpose, potential risks, and benefits of advocacy actions before agreeing to them. This requires providing information in an accessible way and ensuring genuine understanding."
        },
        {
          id: "q9-mod2",
          question: "What role do self-advocacy groups play?",
          options: [
            "They replace the need for individual decision-making",
            "They provide a space for individuals to learn from peers and practice advocacy skills collectively",
            "They only focus on political campaigns",
            "They are only appropriate for people with mild disabilities"
          ],
          correctAnswer: 1,
          explanation: "Self-advocacy groups provide a space for individuals to learn from peers, develop leadership skills, practice advocacy collectively, and gain confidence in speaking up about important issues that affect their lives."
        },
        {
          id: "q10-mod2",
          question: "What is the appropriate balance between protection and empowerment in advocacy?",
          options: [
            "Always prioritize protection over choice in all situations",
            "Always prioritize choice regardless of risk or harm",
            "Consider each situation individually, balancing genuine safety concerns with the right to make choices",
            "Let agency policies determine all decisions"
          ],
          correctAnswer: 2,
          explanation: "The appropriate balance involves considering each situation individually, weighing genuine safety concerns against the individual's right to make choices. This requires thoughtful assessment rather than blanket rules that either overprotect or abandon responsibility."
        }
      ],
      audioUrl: "/Audio/Empowerment & Advocacy_ A DSP's Guide.mp4",
      transcript: "In this audio segment, we discuss the different types of advocacy and how DSPs can effectively support the individuals they work with to develop self-advocacy skills. We explore ethical considerations and strategies for overcoming common barriers to successful advocacy."
    }
  ]
};
