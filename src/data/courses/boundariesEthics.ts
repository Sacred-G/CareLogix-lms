
import { Course } from '../courseTypes';

export const boundariesEthicsCourse: Course = {
  id: "boundaries-ethics",
  title: "Professional Boundaries and Ethics",
  description: "Learn to maintain appropriate professional boundaries and navigate ethical dilemmas in direct support work.",
  category: "Ethics & Rights",
  instructor: "Dr. James Wilson, PhD",
  thumbnail: "/Images/boundariesEthics.png",
  duration: "2 hours",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Understanding Professional Boundaries",
      description: "Learn the importance of professional boundaries and how to maintain them in support relationships.",
      videoUrl: "https://youtu.be/gR4JvqIoSuA",
      content: `
# Understanding Professional Boundaries

Professional boundaries are the physical and emotional limits that define appropriate relationships between Direct Support Professionals and the individuals they support. Good boundaries protect both parties and ensure that relationships remain supportive and ethical.

## The Support Relationship

The relationship between a DSP and the person they support is unique:

- **Purpose:** To provide support that enhances quality of life and promotes independence
- **Paid Position:** You are compensated for your role and have specific job responsibilities
- **Power Differential:** You have access to personal information and may assist with intimate tasks
- **Professional:** While warm and caring, the relationship is fundamentally professional
- **Time-Limited:** Contact typically occurs during specified work hours

Understanding these characteristics helps distinguish the support relationship from friendships, family relationships, or romantic relationships.

## Types of Boundaries

### Physical Boundaries
- Appropriate touch and personal space
- Privacy during personal care
- Respecting living spaces
- Physical safety considerations

### Emotional Boundaries
- Maintaining professional caring without becoming overly attached
- Supporting without rescuing or enabling
- Recognizing the difference between empathy and taking on others' emotions
- Keeping personal problems separate from work relationships

### Financial Boundaries
- No lending or borrowing money
- No buying or selling items
- Avoiding gift-giving or only within agency guidelines
- Transparency in handling client finances

### Social Boundaries
- Limited contact outside work hours
- Appropriate use of social media
- Not sharing personal contact information
- Maintaining professional roles in community settings

## Warning Signs of Boundary Crossing

Be alert to these signs that boundaries may be blurring:

- Keeping secrets from your supervisor or team
- Feeling you're the only one who understands the individual
- Bending rules "just this once" or making exceptions
- Thinking about the person during your off hours
- Finding excuses to spend extra time with the person
- Sharing extensive personal details about your life
- Receiving or giving gifts outside of agency policy
- Feeling defensive about your relationship with the person

## Maintaining Healthy Boundaries

To maintain appropriate boundaries:

1. Know your agency's policies on boundaries
2. Regularly reflect on your relationships and interactions
3. Seek supervision when you're unsure
4. Be clear and consistent in your boundaries
5. Explain the reason for boundaries when necessary
6. Remember that good boundaries are part of good support

Remember that maintaining boundaries is not about being cold or distant—it's about ensuring your relationship remains professional, ethical, and focused on the individual's needs rather than your own.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "Why are professional boundaries important in direct support work?",
          options: [
            "They keep relationships cold and impersonal", 
            "They protect both the DSP and the individual and maintain ethical relationships", 
            "They prevent any emotional connection from forming", 
            "They are only important in residential settings"
          ],
          correctAnswer: 1,
          explanation: "Professional boundaries protect both parties from harm, maintain ethical standards, and ensure that the relationship remains focused on the individual's needs and goals rather than the DSP's personal needs."
        },
        {
          id: "q2-mod1",
          question: "Which of these is a warning sign that boundaries may be crossing?",
          options: [
            "Discussing boundary concerns with your supervisor", 
            "Following agency policies about gift-giving", 
            "Keeping secrets from your team about your relationship with an individual", 
            "Maintaining consistent work hours"
          ],
          correctAnswer: 2,
          explanation: "Keeping secrets from your team or supervisor about your relationship with an individual is a significant warning sign that boundaries may be inappropriate. Transparent communication with your team is essential for maintaining professional boundaries."
        },
        {
          id: "q3-mod1",
          question: "What is the best approach to maintaining professional boundaries?",
          options: [
            "Being cold and distant to avoid any emotional attachment", 
            "Being clear and consistent while still showing care and empathy", 
            "Treating the support relationship like a friendship", 
            "Avoiding all personal conversations"
          ],
          correctAnswer: 1,
          explanation: "Good boundaries don't mean being cold or distant. The best approach is being clear and consistent with boundaries while still showing care and empathy, maintaining a professional relationship that is warm but has appropriate limits."
        },
        {
          id: "q4-mod1",
          question: "What characterizes the relationship between a DSP and the person they support?",
          options: [
            "It's identical to a friendship or family relationship",
            "It's a paid position with specific responsibilities and a professional purpose",
            "It should develop into a personal relationship over time",
            "It's primarily focused on the DSP's needs and interests"
          ],
          correctAnswer: 1,
          explanation: "The DSP relationship is characterized as a paid position with specific responsibilities and a professional purpose. While warm and caring, it differs from personal relationships in its purpose, power dynamics, professional nature, and time limitations."
        },
        {
          id: "q5-mod1",
          question: "Which of these is an example of appropriate financial boundaries?",
          options: [
            "Borrowing money from a client during a personal emergency",
            "Buying items from a client's personal collection",
            "Transparency and following agency guidelines when handling client finances",
            "Giving small gifts to favorite clients"
          ],
          correctAnswer: 2,
          explanation: "Appropriate financial boundaries include maintaining transparency when handling client finances and following agency guidelines. DSPs should not engage in personal financial transactions with clients such as lending, borrowing, buying, or selling items."
        },
        {
          id: "q6-mod1",
          question: "When might it be appropriate to share personal information about yourself with someone you support?",
          options: [
            "Whenever you want to build rapport",
            "When you need emotional support from them",
            "Limited sharing that serves a purpose for the individual's support",
            "Extensive sharing to build a deeper friendship"
          ],
          correctAnswer: 2,
          explanation: "Limited personal sharing that serves a purpose for the individual's support may be appropriate. This might include brief, relevant information that normalizes experiences or builds connection, but should not burden the individual with the DSP's personal problems or shift focus from their needs."
        },
        {
          id: "q7-mod1",
          question: "Why does a power differential exist in the DSP-client relationship?",
          options: [
            "Because DSPs should control their clients",
            "Because DSPs have access to personal information and may assist with intimate tasks",
            "Because clients are always less capable",
            "Because DSPs earn more money than clients"
          ],
          correctAnswer: 1,
          explanation: "A power differential exists because DSPs have access to personal information, may assist with intimate tasks, often have control over resources and supports, and are in a position of trust and authority. Recognizing this differential is important for maintaining appropriate boundaries."
        },
        {
          id: "q8-mod1",
          question: "What should a DSP do if they realize a boundary has been crossed?",
          options: [
            "Hide it to avoid getting in trouble",
            "Discuss it with the individual but no one else",
            "Discuss it with their supervisor and take steps to reestablish appropriate boundaries",
            "Immediately terminate the support relationship"
          ],
          correctAnswer: 2,
          explanation: "If a boundary has been crossed, the DSP should discuss it with their supervisor and take steps to reestablish appropriate boundaries. Being honest about boundary crossings allows for proper supervision and correction before more serious boundary violations occur."
        },
        {
          id: "q9-mod1",
          question: "Which statement about social media boundaries is most accurate?",
          options: [
            "DSPs should connect with all clients on social media to stay in touch",
            "Agency policies about social media connections should be followed, which often restrict personal connections",
            "Social media boundaries only matter for teenage clients",
            "Connecting with clients on social media is fine as long as you don't comment on their posts"
          ],
          correctAnswer: 1,
          explanation: "DSPs should follow their agency's policies regarding social media, which often restrict personal connections with clients. Social media can blur professional boundaries and potentially expose personal information that might change the professional nature of the relationship."
        },
        {
          id: "q10-mod1",
          question: "Which of these is NOT typically considered a physical boundary consideration in direct support work?",
          options: [
            "Providing privacy during personal care",
            "Respecting personal space preferences",
            "Insisting on physical contact to show caring",
            "Knocking before entering living spaces"
          ],
          correctAnswer: 2,
          explanation: "Insisting on physical contact is not an appropriate boundary consideration. Physical boundaries include respecting personal space, providing privacy during personal care, using appropriate touch only when necessary and welcomed, and respecting living spaces."
        }
      ],
      audioUrl: "/Audio/Drawing the Line_ Mastering Professional Boundaries.wav",
      transcript: "This audio segment explores the concept of professional boundaries in direct support work. We discuss the unique nature of the support relationship, different types of boundaries (physical, emotional, financial, and social), warning signs of boundary crossing, and strategies for maintaining healthy professional boundaries while still providing compassionate support."
    },
    {
      id: "mod-2",
      title: "Navigating Ethical Dilemmas",
      description: "Learn a framework for identifying and resolving ethical dilemmas in direct support work.",
      videoUrl: "https://youtu.be/4YiDwE_lHzU",
      content: `
# Navigating Ethical Dilemmas

Direct Support Professionals often face situations where different values, responsibilities, or principles conflict. These ethical dilemmas require thoughtful consideration to resolve in a way that upholds professional standards and respects the rights of individuals receiving support.

## Common Ethical Principles

Several core principles guide ethical decision-making in direct support:

### 1. Autonomy
- Respecting individual choice and self-determination
- Supporting informed decision-making
- Honoring preferences even when they differ from your own

### 2. Beneficence
- Acting in ways that benefit the individual
- Promoting well-being and quality of life
- Supporting growth and development

### 3. Non-maleficence
- Avoiding actions that cause harm
- Protecting from abuse, neglect, and exploitation
- Considering unintended consequences of actions

### 4. Justice
- Treating people fairly and equitably
- Advocating for access to resources
- Challenging discrimination and bias

### 5. Fidelity
- Being faithful to professional commitments
- Maintaining confidentiality
- Following through on responsibilities

## Common Ethical Dilemmas

DSPs may encounter various ethical challenges, such as:

- Balancing safety concerns with an individual's right to take risks
- Respecting choices that conflict with health recommendations
- Maintaining confidentiality while sharing necessary information
- Addressing suspected abuse or neglect
- Allocating limited time and resources fairly
- Supporting choices that conflict with family preferences
- Managing personal values that differ from an individual's choices

## An Ethical Decision-Making Framework

When facing an ethical dilemma, follow these steps:

### 1. Identify the Problem
- What is the specific issue or decision?
- Who is involved or affected?
- What are the facts of the situation?

### 2. Consider All Options
- Brainstorm possible courses of action
- Consider short and long-term consequences
- Identify who benefits and who might be harmed by each option

### 3. Analyze Using Ethical Principles
- How does each option align with core ethical principles?
- Are any laws, regulations, or policies relevant?
- What would happen if everyone took this action?

### 4. Seek Additional Perspectives
- Consult with supervisors and colleagues
- Consider what experts in the field would advise
- Review professional codes of ethics

### 5. Make and Implement a Decision
- Choose the option that best upholds ethical principles
- Document your decision-making process
- Communicate with everyone involved as appropriate

### 6. Reflect and Evaluate
- Monitor outcomes of your decision
- Consider what you've learned from the situation
- Apply these insights to future dilemmas

Remember that many ethical dilemmas don't have perfect solutions. Your goal is to make the most ethically sound decision possible given the circumstances, always keeping the individual's rights and well-being at the center of your considerations.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "What is the ethical principle of autonomy?",
          options: [
            "Treating everyone exactly the same way", 
            "Respecting individual choice and self-determination", 
            "Always doing what is medically recommended", 
            "Following agency policies without question"
          ],
          correctAnswer: 1,
          explanation: "Autonomy refers to respecting an individual's right to make their own choices and decisions about their life. It involves supporting self-determination and honoring preferences, even when they differ from what others might choose."
        },
        {
          id: "q2-mod2",
          question: "In an ethical decision-making framework, why is it important to seek additional perspectives?",
          options: [
            "To avoid taking responsibility for the decision", 
            "To gain insights you might have missed and ensure a more thorough analysis", 
            "To find someone who agrees with what you already want to do", 
            "Because it's required by law"
          ],
          correctAnswer: 1,
          explanation: "Seeking additional perspectives helps you gain insights you might have missed, challenges your assumptions, and ensures you've considered the situation from multiple angles. This leads to more ethical and thorough decision-making."
        },
        {
          id: "q3-mod2",
          question: "What should you do when an individual's choice conflicts with safety recommendations?",
          options: [
            "Always prioritize safety over choice in all circumstances", 
            "Always allow the choice regardless of risk", 
            "Carefully weigh the specific risks, consider alternatives, and try to find a balance that respects autonomy while minimizing harm", 
            "Let family members make the final decision"
          ],
          correctAnswer: 2,
          explanation: "When safety and autonomy conflict, DSPs should carefully assess the specific situation, including the nature and degree of risk, the individual's capacity to understand consequences, and possible alternatives or compromises that might respect choice while reducing risk."
        },
        {
          id: "q4-mod2",
          question: "What is the final step in the ethical decision-making framework presented in the module?",
          options: [
            "Implement the decision", 
            "Document your choice", 
            "Reflect and evaluate", 
            "Inform your supervisor"
          ],
          correctAnswer: 2,
          explanation: "The final step is to reflect and evaluate the outcomes of your decision. This reflection helps you learn from the experience and apply those insights to future ethical dilemmas, creating a continuous improvement process."
        },
        {
          id: "q5-mod2",
          question: "What does the ethical principle of beneficence mean?",
          options: [
            "Avoiding harm",
            "Acting in ways that benefit the individual and promote well-being",
            "Treating everyone equally",
            "Following the law"
          ],
          correctAnswer: 1,
          explanation: "Beneficence means acting in ways that benefit the individual, promote well-being and quality of life, and support growth and development. It's about actively doing good, not just avoiding harm."
        },
        {
          id: "q6-mod2",
          question: "When identifying an ethical problem, what should you focus on first?",
          options: [
            "Finding someone to blame for the situation",
            "Determining if agency policies were violated",
            "Clarifying the specific issue, who is involved, and the facts of the situation",
            "Deciding what your supervisor would want you to do"
          ],
          correctAnswer: 2,
          explanation: "When identifying an ethical problem, you should first clarify the specific issue or decision at hand, identify who is involved or affected, and gather the facts of the situation. This creates a clear foundation for addressing the dilemma."
        },
        {
          id: "q7-mod2",
          question: "What does the principle of non-maleficence require?",
          options: [
            "Doing whatever the individual wants",
            "Avoiding actions that cause harm and protecting from abuse or neglect",
            "Making all decisions for the individual",
            "Reporting all issues to management"
          ],
          correctAnswer: 1,
          explanation: "Non-maleficence requires avoiding actions that cause harm, protecting individuals from abuse, neglect, and exploitation, and considering the potential unintended consequences of actions. It's often summarized as 'first, do no harm.'"
        },
        {
          id: "q8-mod2",
          question: "Which of these is an example of the ethical principle of justice?",
          options: [
            "Giving your favorite client extra time and attention",
            "Only helping clients who are cooperative",
            "Advocating for fair distribution of resources and challenging discrimination",
            "Following your personal values in all situations"
          ],
          correctAnswer: 2,
          explanation: "Justice involves treating people fairly and equitably, advocating for access to resources, and challenging discrimination and bias. Advocating for fair distribution of resources and challenging discrimination exemplifies this principle."
        },
        {
          id: "q9-mod2",
          question: "What is meant by 'fidelity' in ethical practice?",
          options: [
            "Always agreeing with your supervisor",
            "Being faithful to professional commitments, maintaining confidentiality, and following through on responsibilities",
            "Never making mistakes",
            "Always following the exact letter of every policy"
          ],
          correctAnswer: 1,
          explanation: "Fidelity means being faithful to professional commitments, maintaining confidentiality as appropriate, and following through on responsibilities. It involves loyalty, honesty, and keeping promises made in a professional context."
        },
        {
          id: "q10-mod2",
          question: "Why is documentation important when resolving an ethical dilemma?",
          options: [
            "It creates extra paperwork that proves you're busy",
            "It's only important for legal protection",
            "It records your decision-making process, reasoning, and actions for accountability and learning",
            "It's only necessary when something goes wrong"
          ],
          correctAnswer: 2,
          explanation: "Documentation of ethical decision-making records your process, reasoning, and actions, which provides accountability, helps others understand your decisions, creates a record for future reference, and supports learning from the experience."
        }
      ],
      audioUrl: "/Audio/Navigating Ethical Dilemmas for Direct Support Professionals.wav",
      transcript: "In this audio segment, we explore how to navigate ethical dilemmas in direct support work. We discuss core ethical principles including autonomy, beneficence, non-maleficence, justice, and fidelity. We examine common ethical challenges DSPs face and provide a six-step framework for ethical decision-making to help you resolve complex situations while upholding professional standards."
    }
  ]
};
