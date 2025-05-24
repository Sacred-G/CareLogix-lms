import { Course } from '../courseTypes';

export const empowermentAdvocacyCourse: Course = {
  id: "empowerment-advocacy",
  title: "Empowerment and Advocacy",
  description: "Learn how to empower individuals with developmental disabilities and effectively advocate for their rights and needs.",
  category: "Advocacy & Empowerment",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/empowermentAdvocacy.png", // Please add this image to public/Images or update the filename if needed.
  duration: "1 hour",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Principles of Empowerment",
      description: "Understand the core principles of empowerment and how to apply them in support roles.",
      content: `
# Principles of Empowerment

Empowerment means enabling individuals to have control over their lives, make choices, and access opportunities. As a Direct Support Professional, you play a key role in fostering empowerment by:

- Encouraging self-advocacy and independence
- Supporting informed decision-making
- Providing resources and information
- Respecting personal preferences and goals
- Building confidence and self-esteem

## Practical Strategies
- Offer choices whenever possible
- Use person-centered language
- Involve individuals in planning and goal-setting
- Celebrate achievements, big and small

Empowerment is a continuous process. Your support can make a meaningful difference in someone’s life.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "What is empowerment in the context of support services?",
          options: [
            "Making decisions for others",
            "Enabling individuals to have control and make choices",
            "Limiting options to avoid mistakes",
            "Focusing only on physical needs"
          ],
          correctAnswer: 1,
          explanation: "Empowerment is about enabling choice and control."
        },
        {
          id: "q2-mod1",
          question: "Which of the following is a strategy for fostering empowerment?",
          options: [
            "Discouraging risk-taking",
            "Offering choices whenever possible",
            "Making all plans for the individual",
            "Ignoring personal preferences"
          ],
          correctAnswer: 1,
          explanation: "Offering choices is a key empowerment strategy."
        }
      ],
      audioUrl: "/Audio/Empowerment & Advocacy_ A DSP's Guide.mp4",
      transcript: "This audio segment explores the principles of empowerment, practical strategies for promoting independence, and the importance of self-advocacy."
    },
    {
      id: "mod-2",
      title: "Advocacy in Action",
      description: "Learn how to advocate for and with individuals with developmental disabilities.",
      content: `
# Advocacy in Action

Advocacy involves supporting individuals to express their needs, protect their rights, and access resources. There are different types of advocacy, including:

- **Self-Advocacy**: Empowering individuals to speak up for themselves
- **Peer Advocacy**: Support from others with similar experiences
- **Professional Advocacy**: Assistance from trained advocates or organizations

## Key Skills for Advocacy
- Listening actively and respectfully
- Understanding rights and relevant laws
- Communicating clearly and assertively
- Collaborating with families and professionals
- Navigating systems and resources

## Example Scenario
Maria wants to attend a community event but needs transportation. As a DSP, you can advocate by helping Maria explore options, communicate her needs, and connect with resources.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "Which of the following is NOT a type of advocacy?",
          options: [
            "Self-Advocacy",
            "Peer Advocacy",
            "Professional Advocacy",
            "Passive Advocacy"
          ],
          correctAnswer: 3,
          explanation: "Passive Advocacy is not a recognized advocacy type."
        },
        {
          id: "q2-mod2",
          question: "What is a key skill for effective advocacy?",
          options: [
            "Ignoring the individual's wishes",
            "Listening actively and respectfully",
            "Avoiding collaboration",
            "Focusing only on paperwork"
          ],
          correctAnswer: 1,
          explanation: "Listening actively is essential for advocacy."
        },
        {
          id: "q3-mod2",
          question: "Which of the following best describes self-advocacy?",
          options: [
            "A professional speaking on someone's behalf",
            "An individual expressing their own needs and preferences",
            "A group of peers supporting each other",
            "A family member making all decisions"
          ],
          correctAnswer: 1,
          explanation: "Self-advocacy is when an individual speaks up for themselves."
        },
        {
          id: "q4-mod2",
          question: "Which is an example of professional advocacy?",
          options: [
            "A DSP helping a person fill out a service request form",
            "A person with a disability asking for an accommodation",
            "A friend giving advice based on their own experience",
            "A family member arranging transportation for a relative"
          ],
          correctAnswer: 0,
          explanation: "Professional advocacy is provided by someone trained or in a professional role, such as a DSP assisting with forms."
        },
        {
          id: "q5-mod2",
          question: "Why is it important to understand relevant laws and rights as an advocate?",
          options: [
            "To ensure individuals receive all entitled supports and protections",
            "To create more paperwork",
            "To avoid talking to families",
            "To discourage self-advocacy"
          ],
          correctAnswer: 0,
          explanation: "Knowing the law helps advocates protect rights and access resources."
        }
      ],
      audioUrl: "/Audio/Empowerment & Advocacy_ A DSP's Guide.mp4",
      transcript: "This audio lesson covers types of advocacy, essential skills, and practical examples of advocating for and with individuals with developmental disabilities."
    }
  ]
};
