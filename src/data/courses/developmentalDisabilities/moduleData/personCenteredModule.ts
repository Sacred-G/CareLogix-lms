
import { Module } from '../../../courseTypes';

export const personCenteredModule: Module = {
  id: 'person-centered',
  title: 'Person-Centered Planning',
  description: 'Learn how to implement person-centered approaches that place individuals with developmental disabilities at the center of their support plans.',
  content: `
# Person-Centered Planning: Putting People First

## The Philosophy Behind Person-Centered Planning

Person-centered planning represents a fundamental shift from traditional service models. Rather than fitting people into existing services, this approach designs supports around each person's unique strengths, preferences, and aspirations.

### Core Values and Principles:
- **Self-determination**: The individual directs their own life and services
- **Capabilities focus**: Emphasizes abilities and possibilities, not limitations
- **Community inclusion**: Seeks opportunities for meaningful participation in typical community settings
- **Natural relationships**: Values and strengthens connections with family and friends
- **Individualization**: Rejects one-size-fits-all approaches in favor of customized supports
- **Continuous listening**: Remains responsive to changing needs and preferences

### Historical Context:
 Person-centered planning emerged in the 1980s as a response to institutional models of care. Pioneers like Beth Mount, John O'Brien, and Michael Smull developed various approaches (PATH, MAPS, Essential Lifestyle Planning) that share the common goal of returning power and voice to individuals with disabilities.

## Person-Centered Planning Methods

Multiple person-centered planning approaches exist, each with unique features but sharing common elements.

### Common Planning Frameworks:

**PATH (Planning Alternative Tomorrows with Hope):**
- Visually oriented process that begins with the "North Star" (dream)
- Works backward to identify steps toward the vision
- Emphasizes identifying allies and overcoming obstacles

**MAPS (Making Action Plans):**
- Uses 8 key questions to create a personal profile
- Explores history, relationships, strengths, and dreams
- Particularly effective for educational planning

**Essential Lifestyle Planning (ELP):**
- Focuses on daily life and what matters to the person
- Distinguishes between what's "important to" vs "important for" the person
- Emphasizes positive rituals and routines

**Personal Futures Planning:**
- Maps personal relationships and community connections
- Identifies capacities and gifts the person can contribute
- Develops creative strategies for community inclusion

## Elements of Effective Person-Centered Planning

Regardless of the specific method used, effective person-centered planning incorporates several key components.

### Key Components:

**Facilitation:**
- Skilled facilitator who remains neutral
- Creates inclusive atmosphere where all voices are heard
- Ensures the individual remains the focus of the conversation

**The Planning Team:**
- Chosen by the individual, not assigned by the system
- Includes both paid supporters and personal relationships
- Values diverse perspectives and complementary strengths

**Meeting Structure:**
- Accessible location and format for the individual
- Sufficient time for meaningful discussion
- Creative, engaging, and positive atmosphere
- Regular follow-up and revision

**Documentation:**
- Clear, accessible record of decisions and plans
- Visual elements when helpful (photos, drawings, symbols)
- Specific actions, responsibilities, and timelines
- Reflects the individual's voice and priorities

## Implementing Person-Centered Approaches in Daily Support

Person-centered planning is not just a document—it's a continuous process that guides everyday interactions and decisions.

### From Planning to Action:

**Daily Choice Making:**
- Offer meaningful options throughout each day
- Honor preferences even when they create inconvenience
- Create opportunities for new experiences and expanded choices

**Environmental Adaptations:**
- Modify environments to support success and independence
- Arrange spaces to reflect personal preferences
- Ensure access to personally meaningful items and activities

**Communication Accommodations:**
- Use the individual's preferred communication methods
- Allow sufficient time for processing and responding
- Check for understanding rather than assuming

**Relationship Development:**
- Facilitate connections based on shared interests
- Support maintenance of existing relationships
- Create opportunities for valued social roles

## Person-Centered Language and Communication

The words we use shape perceptions and experiences. Person-centered language supports dignity and respect.

### Language Guidelines:

**Person-First Phrasing:**
- "Person with autism" rather than "autistic person"
- "Individual who uses a wheelchair" rather than "wheelchair-bound"
- "Person with support needs" rather than "low functioning"

**Strength-Based Descriptions:**
- "Communicates through pictures" vs. "Non-verbal"
- "Benefits from structure" vs. "Has behavior problems"
- "Learning to..." vs. "Failing at..."

**Respectful Interactions:**
- Speak directly to the person, not about them when present
- Use age-appropriate tone and vocabulary
- Listen fully without interrupting or finishing sentences
- Honor communication style and pace preferences

## Overcoming Challenges in Person-Centered Implementation

Implementing truly person-centered approaches often requires creativity and persistence in navigating system constraints.

### Common Challenges and Solutions:

**System Limitations:**
- Identify what's possible within existing structures
- Advocate for policy changes and flexibility
- Seek creative funding and resource solutions

**Time Constraints:**
- Build person-centered thinking into everyday interactions
- Use small team check-ins rather than only large meetings
- Prioritize quality of engagement over quantity of documentation

**Balancing Risk and Choice:**
- Distinguish between dignity of risk and negligence
- Implement the least restrictive safeguards possible
- Document thoughtful risk assessment and mitigation

**Staff Turnover:**
- Create accessible, engaging plans that new staff can easily understand
- Build knowledge across team members, not only with specific individuals
- Regularly review and update plans to maintain relevance
  `,
  questions: [
    {
      id: 'person-q1',
      question: 'Person-centered planning is primarily about:',
      options: [
        'Following the support plan exactly as written',
        'Making decisions based on what\'s most efficient',
        'Focusing on the individual\'s preferences, strengths, and goals',
        'Delivering the same support to everyone with the same diagnosis'
      ],
      correctAnswer: 2,
      explanation: 'Person-centered planning is about focusing on the individual\'s preferences, strengths, and goals. It recognizes each person as unique with their own desires and capabilities rather than taking a one-size-fits-all approach.'
    },
    {
      id: 'person-q2',
      question: 'Which of the following is NOT a core value of person-centered planning?',
      options: [
        'Self-determination',
        'Community inclusion',
        'Professional control',
        'Natural relationships'
      ],
      correctAnswer: 2,
      explanation: 'Professional control is counter to person-centered planning. While professionals provide expertise and support, the individual should maintain control over their own life decisions to the greatest extent possible.'
    },
    {
      id: 'person-q3',
      question: 'What is the difference between what is "important to" versus "important for" a person?',
      options: [
        '"Important to" relates to personal preferences while "important for" relates to health and safety needs',
        '"Important to" means family priorities while "important for" means staff priorities',
        '"Important to" means short-term goals while "important for" means long-term goals',
        'There is no meaningful difference between these concepts'
      ],
      correctAnswer: 0,
      explanation: '"Important to" refers to what matters to the person from their perspective - their preferences, relationships, and choices. "Important for" refers to what needs to happen to keep the person healthy, safe, and a valued member of their community.'
    }
  ],
  interactiveScenario: {
    title: 'Managing Competing Priorities',
    description: 'Practice applying person-centered thinking when faced with competing priorities',
    type: 'multiple-choice',
    content: 'You support Maria, who has expressed that she wants to attend a community concert this weekend. The concert starts at 8pm and would end around 11pm. Maria typically goes to bed at 9pm and becomes anxious when her routine changes. She has also been talking excitedly about the concert for weeks. What would be the most person-centered approach?',
    options: [
      {
        id: 'opt1',
        text: "Tell Maria she can't go because it would disrupt her routine, which is important for her well-being.",
        isCorrect: false,
        feedback: 'This approach prioritizes routine over Maria\'s expressed desire without exploring potential solutions or involving Maria in problem-solving.'
      },
      {
        id: 'opt2',
        text: "Take Maria to the concert but leave early at 9pm sharp regardless of how she's feeling at the time.",
        isCorrect: false,
        feedback: 'This is a compromise but still prioritizes the routine over flexibility and doesn\'t fully address potential anxiety.'
      },
      {
        id: 'opt3',
        text: "Discuss the situation with Maria, explaining the potential disruption to her routine, and work together on a plan that might include preparation activities, bringing comfort items, and having a flexible return time.",
        isCorrect: true,
        feedback: 'This person-centered approach honors both Maria\'s desire to attend the concert and acknowledges the importance of her routine. It involves her in problem-solving and preparation while remaining flexible.'
      },
      {
        id: 'opt4',
        text: "Suggest that Maria attend a different event during the daytime instead, since that would fit better with her routine.",
        isCorrect: false,
        feedback: 'While well-intentioned, this doesn\'t honor Maria\'s specific interest in this concert and assumes she cannot handle any deviation from routine with proper support.'
      }
    ]
  },
  flashcards: [
    {
      id: 'pcp-fc1',
      term: 'Person-Centered Planning',
      definition: 'An approach to support planning that focuses on the individual\'s preferences, strengths, and goals rather than fitting them into existing service systems.'
    },
    {
      id: 'pcp-fc2',
      term: 'PATH',
      definition: 'Planning Alternative Tomorrows with Hope - a visually oriented person-centered planning method that starts with a dream or "North Star" and works backward to create action steps.'
    },
    {
      id: 'pcp-fc3',
      term: 'Important To vs Important For',
      definition: 'A key distinction in person-centered thinking: "Important to" refers to what matters to the person (preferences, relationships, choices) while "Important for" refers to health, safety, and being valued by others.'
    },
    {
      id: 'pcp-fc4',
      term: 'Dignity of Risk',
      definition: 'The concept that all people have the right to make choices that involve some risk, and that denying this right can diminish their dignity and growth opportunities.'
    }
  ],
  faqs: [
    {
      question: "What if the person I support can't communicate their preferences clearly?",
      answer: "When direct communication is limited, use observation, input from those who know the person well, and try different options while carefully noting responses. Look for non-verbal cues of preference, and always presume competence."
    },
    {
      question: "How do I balance person-centered choices with health and safety concerns?",
      answer: "This is often challenging but start by clearly identifying the actual risks versus perceived risks. Then explore creative solutions that address legitimate safety concerns while still honoring preferences. The goal is maximum choice with minimum risk, not elimination of all risk."
    },
    {
      question: "How often should person-centered plans be updated?",
      answer: "Formal reviews typically happen annually, but person-centered planning should be a continuous process. Plans should be living documents that adapt whenever preferences change, new opportunities arise, or strategies aren't working as intended."
    }
  ]
};
