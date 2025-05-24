
import { Module } from '../../../courseTypes';

export const dspRoleModule: Module = {
  id: 'dsp-role',
  title: 'Role of a Direct Support Professional',
  description: 'Understand your core responsibilities, ethical practices, and the vital impact you make as a DSP supporting individuals with developmental disabilities.',
  content: `
# The Essential Role of a Direct Support Professional (DSP)

## Core Responsibilities and Values

As a Direct Support Professional (DSP), you are the foundation of the support system for individuals with developmental disabilities. Your work requires a unique blend of technical skills, compassion, and ethical judgment.

### Your Mission as a DSP:
- Empower individuals to live self-directed lives
- Support full inclusion in communities
- Advocate for rights and dignity
- Facilitate learning and growth
- Ensure health and safety while respecting autonomy

### NADSP Code of Ethics Core Principles:
- Person-Centered Supports
- Promoting Physical and Emotional Well-being
- Integrity and Responsibility
- Confidentiality
- Justice, Fairness and Equity
- Respect
- Relationships
- Self-Determination
- Advocacy
- Collaboration

## Building Professional Relationships

The relationships you develop are powerful tools for supporting growth and independence. Professional boundaries ensure these relationships remain healthy and effective.

### Characteristics of Healthy Professional Relationships:
- Respectful and dignified interactions
- Clear expectations and boundaries
- Consistent and reliable presence
- Honest and transparent communication
- Appropriate emotional involvement

### Setting and Maintaining Boundaries:
- Distinguish between personal and professional relationships
- Recognize power imbalances and avoid exploitation
- Maintain confidentiality and privacy
- Be aware of personal triggers and biases
- Seek supervision when boundaries become unclear

### Common Boundary Challenges:
- Over-identification with individuals you support
- Taking behaviors or reactions personally
- Sharing excessive personal information
- Developing dual relationships (friendship and professional)
- Making promises beyond your role or authority

## Health and Safety Responsibilities

As a DSP, you're often the first line of protection for individuals who may face health vulnerabilities or safety risks.

### Key Health Support Activities:
- Medication administration and monitoring
- Personal care assistance with dignity
- Nutrition and hydration support
- Monitoring for health changes or concerns
- Supporting medical appointments and follow-up
- Implementing health-related plans and protocols

### Essential Safety Practices:
- Environmental safety checks and modifications
- Safe lifting and transfer techniques
- Emergency preparedness and response
- Injury and illness prevention
- Recognition and reporting of abuse/neglect
- Safe transportation practices

### Balancing Safety and Autonomy:
- Assess risks versus benefits of activities
- Support informed risk-taking when appropriate
- Implement the least restrictive safeguards
- Involve the individual in safety planning
- Document safety concerns and interventions

## Confidentiality and Information Management

Respecting privacy is both an ethical obligation and a legal requirement under HIPAA (Health Insurance Portability and Accountability Act).

### Protected Health Information (PHI) includes:
- Names and contact information
- Diagnoses and treatment information
- Medication lists and history
- Service plans and progress notes
- Financial and insurance information
- Any identifying details about the individual

### HIPAA Compliance Guidelines:
- Share information only with authorized persons
- Discuss sensitive information in private settings
- Secure physical documents in locked storage
- Password-protect electronic information
- Report any privacy breaches immediately
- Obtain appropriate consent before sharing information

### Documentation Best Practices:
- Record only relevant, factual information
- Use professional, respectful language
- Follow organization policies for record-keeping
- Ensure timely and accurate reporting
- Maintain the security of all records

## Supporting Independence and Self-Determination

One of your most important roles is to foster independence and empower individuals to direct their own lives to the greatest extent possible.

### Promoting Choice and Control:
- Offer meaningful options throughout the day
- Support decision-making at all levels
- Honor preferences, even when inconvenient
- Create opportunities for new experiences
- Respect the right to refuse activities or supports

### Teaching Independence Skills:
- Use systematic instruction techniques
- Break tasks into manageable steps
- Provide the least assistance necessary
- Fade supports as skills develop
- Celebrate progress and achievements

### Supporting Self-Advocacy:
- Encourage individuals to express their wants and needs
- Provide information in accessible formats
- Connect individuals with peer advocacy groups
- Respect and amplify the individual's voice
- Stand behind, not in front of, the people you support
  `,
  questions: [
    {
      id: 'dsp-q1',
      question: 'Which of the following is NOT a key responsibility of a DSP?',
      options: [
        'Supporting independence',
        'Maintaining confidentiality',
        'Making all decisions for the individual',
        'Following health and safety protocols'
      ],
      correctAnswer: 2,
      explanation: 'DSPs should support individuals to make their own decisions when possible, not make all decisions for them.'
    },
    {
      id: 'dsp-q2',
      question: 'Which of the following represents appropriate professional boundaries?',
      options: [
        'Lending money to an individual you support when they run short',
        'Accepting small gifts from individuals or families on special occasions',
        'Sharing details about your personal problems to build trust',
        'Connecting with individuals you support on your personal social media accounts'
      ],
      correctAnswer: 1,
      explanation: 'While maintaining professional boundaries is important, accepting small tokens of appreciation on special occasions (like holidays or birthdays) is generally acceptable in most organizations. The other options represent boundary crossings that could lead to dual relationships or ethical complications.'
    },
    {
      id: 'dsp-q3',
      question: 'Under HIPAA regulations, when is it appropriate to share protected health information (PHI)?',
      options: [
        'When another staff member asks about an individual\'s condition',
        'When you need advice from a friend who works in healthcare',
        'When authorized in the individual\'s record and necessary for their care',
        'When a family member of the individual requests updates'
      ],
      correctAnswer: 2,
      explanation: 'PHI can be shared when it\'s authorized in the individual\'s record and necessary for their care. Simply being a staff member, a healthcare worker, or a family member does not automatically grant access rights to this information without proper authorization.'
    },
    {
      id: 'dsp-q4',
      question: 'Which approach best supports self-determination?',
      options: [
        'Making choices for individuals when they seem indecisive',
        'Limiting options to those you feel are most appropriate',
        'Providing information and support to help individuals make their own choices',
        'Following the family\'s preferences when they differ from the individual\'s'
      ],
      correctAnswer: 2,
      explanation: 'Self-determination is best supported by providing individuals with accessible information and the support they need to make their own choices. This respects their autonomy while acknowledging that some individuals may need assistance with the decision-making process.'
    }
  ],
  interactiveScenario: {
    title: 'Professional Boundaries Challenge',
    description: 'Practice making ethical decisions related to professional boundaries',
    type: 'multiple-choice',
    content: 'You have been supporting Miguel for about six months. You\'ve developed a good professional relationship, and he seems to trust you. One day, Miguel shows you an invitation to his sister\'s wedding and asks if you would attend with him as his guest. He mentions he feels anxious in crowds and would feel more comfortable if you were there. The wedding is on your day off. What is the most appropriate response?',
    options: [
      {
        id: 'opt1',
        text: "Accept the invitation since it's on your day off and would clearly mean a lot to Miguel.",
        isCorrect: false,
        feedback: 'While your intention to support Miguel is good, attending a family event as a personal guest creates a dual relationship (professional and personal) that could complicate your professional role. This crosses an important boundary.'
      },
      {
        id: 'opt2',
        text: "Thank Miguel for the invitation but explain that you cannot attend personal events, and instead offer to help him prepare strategies for managing his anxiety at the wedding.",
        isCorrect: true,
        feedback: 'This response maintains professional boundaries while still acknowledging Miguel\'s concerns and offering appropriate support. By focusing on helping him develop coping strategies, you\'re supporting his independence rather than creating a dependency on your presence.'
      },
      {
        id: 'opt3',
        text: "Tell Miguel you'll check your agency's policies and get back to him, but you think it should be fine.",
        isCorrect: false,
        feedback: 'While checking policies is appropriate, suggesting it "should be fine" creates an expectation. Most agencies have clear policies against attending personal family events as this creates dual relationships that can complicate the professional support relationship.'
      },
      {
        id: 'opt4',
        text: "Suggest that Miguel ask his support coordinator to find additional staffing support for the wedding day instead.",
        isCorrect: false,
        feedback: 'This response misses an opportunity to help Miguel develop independent coping skills for social situations. While additional support might be appropriate in some cases, immediately suggesting this reinforces dependence rather than working toward greater independence.'
      }
    ]
  },
  flashcards: [
    {
      id: 'dsp-fc1',
      term: 'Professional Boundaries',
      definition: 'The limits and parameters that define appropriate behavior, roles, and responsibilities within the support relationship. These boundaries protect both the DSP and the individual being supported and help maintain effective, ethical relationships.'
    },
    {
      id: 'dsp-fc2',
      term: 'NADSP Code of Ethics',
      definition: 'A set of ethical principles developed by the National Alliance for Direct Support Professionals that guides DSPs in their daily work. Includes principles like person-centered supports, integrity, confidentiality, and promoting self-determination.'
    },
    {
      id: 'dsp-fc3',
      term: 'Self-Determination',
      definition: 'The right of individuals to have full power over their own lives. DSPs support self-determination by honoring choices, providing information in accessible ways, and stepping back to allow individuals to direct their own lives to the greatest extent possible.'
    },
    {
      id: 'dsp-fc4',
      term: 'Dignity of Risk',
      definition: 'The principle that each person with a disability should be allowed to experience life and take chances, even if these experiences include risk. Involves balancing safety with the right to make choices and learn from experiences.'
    }
  ],
  faqs: [
    {
      question: "How do I handle a situation where what the individual wants conflicts with what their family member wants?",
      answer: "This is a common challenge that requires thoughtful navigation. First, remember that the individual you support is your primary focus. If they are an adult with decision-making capacity, their preferences should generally take priority. However, it's also important to listen to family concerns as they often have valuable insights. Try to facilitate respectful dialogue between all parties. Document the different preferences and any resolution reached. If the conflict persists and impacts the person's services, involve your supervisor or the individual's support coordinator. Always maintain professional boundaries and avoid taking sides or making promises you can't keep."
    },
    {
      question: "What should I do if I witness another DSP treating an individual inappropriately?",
      answer: "If you observe inappropriate treatment, your responsibility is to act promptly. If the situation presents immediate danger, intervene to ensure the individual's safety. Report what you witnessed to your supervisor as soon as possible, following your organization's reporting procedures. Be factual in your description of the events without making assumptions about intent. If the behavior potentially constitutes abuse or neglect, you likely have a legal mandated reporting obligation. Remember that reporting is not about getting someone in trouble—it's about ensuring the safety and dignity of the people we support and maintaining the integrity of our profession."
    },
    {
      question: "How can I encourage independence without making the person I support feel abandoned or unsupported?",
      answer: "Finding this balance is a core skill for DSPs. Start by breaking tasks into manageable steps, providing support for just the parts the person finds challenging rather than taking over completely. Use 'graduated assistance'—begin with the least intrusive prompt and increase support only as needed. Provide positive reinforcement for attempts, not just successes. Explain why you're stepping back and ask how they feel about trying things independently. Be patient and allow extra time for completion. Remember that independence isn't all-or-nothing—it varies by task, day, and situation. When the person is experiencing frustration or having a difficult day, it's okay to provide more assistance temporarily without undermining their overall independence."
    }
  ]
};
