import { Course } from '../courseTypes';

export const personCenteredPlanningCourse: Course = {
  id: "person-centered-planning",
  title: "Person-Centered Planning",
  description: "Learn to develop and implement effective person-centered plans that focus on individual strengths, preferences, and goals.",
  category: "Core Skills",
  instructor: "Steven Bouldi, SHRN-CP",
  thumbnail: "/Images/personCenteredPlanning.png",
  duration: "30 minutes",
  modules: [
    {
      id: "mod-1",
      title: "Introduction to Person-Centered Planning",
      description: "Understand the fundamental principles and benefits of person-centered planning in support roles.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ", // Replace with actual video URL
      content: `
# Introduction to Person-Centered Planning

Person-centered planning is an approach that places the individual at the heart of all decisions about their life and the support they receive. This module introduces the core concepts and benefits of this approach.

## What is Person-Centered Planning?

Person-centered planning is a process that focuses on:
- The individual's strengths and abilities
- Their personal goals and aspirations
- Building on existing relationships and community connections
- Creating a vision for a meaningful life

## Why is it Important?

- Promotes dignity and self-determination
- Leads to more effective and meaningful support
- Encourages community inclusion
- Builds on individual strengths rather than focusing on limitations
- Empowers individuals to take control of their lives

## Core Principles

1. **Individual Focus**: Every plan is unique to the person
2. **Choice and Control**: The individual directs their own planning process
3. **Strengths-Based**: Builds on abilities and existing supports
4. **Community Inclusion**: Promotes participation in community life
5. **Flexibility**: Adapts as the person's needs and goals evolve

## The Planning Process

1. **Discovery**: Learning about the person's history, preferences, and dreams
2. **Visioning**: Creating a picture of a good life
3. **Goal Setting**: Identifying specific, achievable objectives
4. **Action Planning**: Determining steps to achieve goals
5. **Implementation**: Putting the plan into action
6. **Review and Update**: Regularly assessing and adjusting the plan
`,
      pdfPath: '/pdfs/person-centered-planning-guide.pdf',
      questions: [
        {
          id: "q1-mod1",
          question: "What is the primary focus of person-centered planning?",
          options: [
            "Following organizational guidelines",
            "The individual's strengths and goals",
            "Standardized support approaches",
            "Minimizing support costs"
          ],
          correctAnswer: 1,
          explanation: "Person-centered planning focuses on the individual's unique strengths, goals, and preferences rather than applying standardized approaches."
        },
        {
          id: "q2-mod1",
          question: "Which of the following is NOT a core principle of person-centered planning?",
          options: [
            "Individual focus",
            "Standardized approaches",
            "Choice and control",
            "Community inclusion"
          ],
          correctAnswer: 1,
          explanation: "Standardized approaches go against the principles of person-centered planning, which emphasizes individualization and flexibility."
        },
        {
          id: "q3-mod1",
          question: "What is the first step in the person-centered planning process?",
          options: [
            "Goal setting",
            "Discovery",
            "Implementation",
            "Review and update"
          ],
          correctAnswer: 1,
          explanation: "The discovery phase is the first step, where you learn about the person's history, preferences, and dreams."
        },
        {
          id: "q4-mod1",
          question: "Why is community inclusion important in person-centered planning?",
          options: [
            "It reduces the need for professional support",
            "It's required by most funding sources",
            "It promotes meaningful relationships and opportunities",
            "It's easier to implement than other approaches"
          ],
          correctAnswer: 2,
          explanation: "Community inclusion is important because it helps individuals build meaningful relationships and access opportunities that enrich their lives."
        },
        {
          id: "q5-mod1",
          question: "How often should person-centered plans be reviewed?",
          options: [
            "Only when there's a problem",
            "Annually, at minimum",
            "Regularly and as needed",
            "Never, once they're created"
          ],
          correctAnswer: 2,
          explanation: "Person-centered plans should be living documents that are reviewed regularly and adjusted as the person's needs, goals, or circumstances change."
        }
      ],
      audioUrl: "/Audio/person-centered-intro.wav",
      transcript: "This audio segment introduces the fundamentals of person-centered planning, including its core principles and benefits. We'll explore how this approach differs from traditional planning methods and why it's so effective in supporting individuals to live meaningful lives."
    },
    {
      id: "mod-2",
      title: "Implementing Person-Centered Plans",
      description: "Learn practical strategies for developing and implementing effective person-centered plans.",
      videoUrl: "https://youtu.be/example2", // Replace with actual video URL
      content: `
# Implementing Person-Centered Plans

This module focuses on the practical aspects of creating and implementing person-centered plans that truly reflect the individual's goals and preferences.

## The Discovery Process

### Key Components:
- Life history and experiences
- Personal preferences and interests
- Strengths and abilities
- Relationships and support networks
- Hopes and dreams for the future

### Discovery Methods:
- One-on-one conversations
- Life mapping
- Relationship mapping
- Personal profile development
- Observing in different settings

## Creating the Plan

### Essential Elements:
1. **Personal Profile**
   - Who is this person?
   - What's important to them?
   - How do they communicate?
   - What are their strengths?

2. **Vision Statement**
   - What does a good life look like for this person?
   - Short-term and long-term goals

3. **Action Plan**
   - Specific, measurable steps
   - Person responsible for each step
   - Timeline for completion
   - Resources needed

## Implementation Strategies

- Start small with achievable goals
- Build on existing strengths and relationships
- Be flexible and adapt as needed
- Celebrate successes along the way
- Document progress and adjust the plan as needed

## Common Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Resistance to change | Start with small, meaningful changes |
| Limited resources | Identify natural supports in the community |
| Conflicting opinions | Focus on the individual's preferences |
| Lack of follow-through | Assign clear responsibilities and timelines |
`,
      pdfPath: '/pdfs/implementing-person-centered-plans.pdf',
      questions: [
        {
          id: "q1-mod2",
          question: "What is the purpose of the discovery process?",
          options: [
            "To identify the person's limitations",
            "To learn about the person's history, preferences, and dreams",
            "To determine cost-saving measures",
            "To assign support staff"
          ],
          correctAnswer: 1,
          explanation: "The discovery process is about understanding the whole person - their history, preferences, dreams, and what matters most to them."
        },
        {
          id: "q2-mod2",
          question: "Which of the following is NOT typically included in a personal profile?",
          options: [
            "Medical history",
            "Personal preferences",
            "Communication style",
            "Budget details"
          ],
          correctAnswer: 3,
          explanation: "While financial considerations might be part of the overall plan, budget details are not typically included in the personal profile, which focuses on the individual's identity, preferences, and communication."
        },
        {
          id: "q3-mod2",
          question: "What is the benefit of starting with small, achievable goals?",
          options: [
            "It requires less documentation",
            "It builds confidence and momentum",
            "It's easier to get funding for small goals",
            "Small goals don't need to be reviewed"
          ],
          correctAnswer: 1,
          explanation: "Starting with small, achievable goals helps build confidence and momentum, making it more likely that the individual will stay engaged in the planning process."
        },
        {
          id: "q4-mod2",
          question: "Why is it important to identify natural supports in the community?",
          options: [
            "It reduces the need for professional staff",
            "It helps create sustainable, meaningful relationships",
            "It's required by most funding sources",
            "It's easier than developing formal support systems"
          ],
          correctAnswer: 1,
          explanation: "Natural supports help create sustainable, meaningful relationships that aren't dependent on paid staff, leading to more authentic community inclusion."
        },
        {
          id: "q5-mod2",
          question: "What should you do if there are conflicting opinions about the plan?",
          options: [
            "Let the highest-ranking professional decide",
            "Focus on the individual's preferences",
            "Create a compromise that pleases everyone",
            "Put the plan on hold until there's agreement"
          ],
          correctAnswer: 1,
          explanation: "When there are conflicting opinions, the focus should always return to the individual's preferences and what matters most to them."
        }
      ],
      audioUrl: "/Audio/implementing-plans.wav",
      transcript: "In this segment, we'll explore practical strategies for implementing person-centered plans. We'll discuss the discovery process, creating effective action plans, and overcoming common challenges in the implementation phase."
    }
  ]
};
