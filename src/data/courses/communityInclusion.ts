
import { Course } from '../courseTypes';

export const communityInclusionCourse: Course = {
  id: "community-inclusion",
  title: "Community Inclusion and Social Skills",
  description: "Learn strategies to support meaningful community participation and social connection for individuals with developmental disabilities.",
  category: "Community Living",
  instructor: "Robert Jackson, MSW",
  thumbnail: "/Images/CommunityInclusion.png",
  duration: "45 minutes",
  certificateAvailable:true,
  modules: [
    {
      id: "mod-1",
      title: "Principles of Community Inclusion",
      description: "Understand the importance of community inclusion and strategies to promote meaningful participation.",
      videoUrl: "https://youtu.be/yscFkWh9_8U",
      content: `
# Principles of Community Inclusion

Community inclusion means ensuring that individuals with developmental disabilities have the same opportunities as everyone else to participate fully in their communities, develop relationships, and contribute their talents and interests to community life.

## The Importance of Community Inclusion

Research shows that meaningful community inclusion:

- Improves quality of life and overall happiness
- Develops social skills and communication
- Builds confidence and self-esteem
- Reduces isolation and depression
- Creates natural support networks
- Challenges stigma and promotes acceptance
- Provides opportunities for skill development
- Enhances sense of purpose and belonging

## Core Principles of Inclusion

### 1. Person-Centered Planning
- Start with individual interests, strengths, and preferences
- Build on existing connections and relationships
- Set goals based on what matters to the person
- Review and adjust plans regularly

### 2. Natural Supports
- Identify and nurture connections with neighbors, coworkers, and community members
- Focus on reciprocal relationships, not just "helping"
- Facilitate introductions and connections
- Gradually fade paid support when natural supports develop

### 3. Typical Community Settings
- Focus on generic community settings used by everyone
- Move beyond "special" programs whenever possible
- Consider locations where the person can regularly see the same people
- Look for opportunities to contribute, not just participate

### 4. Valued Social Roles
- Support roles that are respected in the community
- Consider volunteer positions, clubs, civic groups
- Develop work opportunities in integrated settings
- Facilitate participation in community governance

## Barriers to Inclusion and Solutions

### Transportation Challenges
- Explore public transportation options
- Develop transportation training programs
- Consider ride-sharing services
- Create carpooling networks
- Advocate for accessible transportation

### Attitudinal Barriers
- Model respectful interactions
- Provide education and awareness
- Create opportunities for positive interactions
- Focus on abilities and contributions
- Address misconceptions directly

### Communication Differences
- Provide appropriate communication supports
- Educate community members on alternative communication
- Allow extra time for communication
- Create visual supports when helpful
- Consider technology solutions

### Physical Accessibility
- Scout locations in advance
- Contact venues about accommodations
- Advocate for improvement of access issues
- Develop creative solutions to barriers
- Share information about accessible locations

## The Role of Direct Support Professionals

As a DSP, you can support community inclusion by:

1. Building your own community connections and knowledge
2. Being curious about community resources and opportunities
3. Providing just enough support—no more, no less
4. Focusing on the person's interests and strengths
5. Being willing to try new approaches
6. Respecting the dignity of risk
7. Fading into the background when appropriate
8. Addressing barriers creatively and persistently

Remember that meaningful inclusion takes time and intentional effort. Small steps toward greater community connection are valuable and build toward larger goals of belonging and contribution.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "What is a key benefit of community inclusion for individuals with developmental disabilities?",
          options: [
            "It keeps them busy during the day", 
            "It reduces the need for paid staff", 
            "It improves quality of life and reduces isolation", 
            "It simplifies support planning"
          ],

          correctAnswer: 2,
          explanation: "Research consistently shows that meaningful community inclusion improves quality of life, reduces isolation and depression, builds social skills and confidence, and creates natural support networks that enhance overall wellbeing."
        },
        {
          id: "q2-mod1",
          question: "What does 'person-centered planning' mean in the context of community inclusion?",
          options: [
            "Creating a plan that works with the agency's schedule", 
            "Starting with the individual's interests, strengths, and preferences", 
            "Developing a plan that family members approve", 
            "Focusing on community activities that are therapeutic"
          ],
          correctAnswer: 1,
          explanation: "Person-centered planning starts with the individual's unique interests, strengths, and preferences rather than available programs or services. It builds on existing connections and sets goals based on what matters to the person, not what others think is best for them."
        },
        {
          id: "q3-mod1",
          question: "What is a 'natural support' in community inclusion?",
          options: [
            "Support from family members only", 
            "Connections with neighbors, coworkers, and community members that develop naturally", 
            "Support provided outdoors in natural settings", 
            "Unpaid staff volunteers"
          ],
          correctAnswer: 1,
          explanation: "Natural supports are the connections with neighbors, coworkers, community members, and others that develop organically through shared experiences and interests. These relationships are reciprocal rather than one-sided 'helping' relationships."
        },
        {
          id: "q4-mod1",
          question: "As a DSP, how can you best support community inclusion?",
          options: [
            "Create special activities only for people with disabilities", 
            "Do everything for the person to ensure success", 
            "Provide just enough support—no more, no less—based on individual needs", 
            "Focus primarily on group activities with other clients"
          ],
          correctAnswer: 2,
          explanation: "DSPs should provide just enough support to ensure success—no more, no less. This means careful assessment of what support is actually needed, stepping back when appropriate, and avoiding over-supporting, which can interfere with natural relationship development."
        }
      ],
      audioUrl: "/Audio/Unlocking Community Inclusion.wav",
      transcript: "This audio lesson explores the principles of community inclusion for individuals with developmental disabilities. We discuss the benefits of meaningful inclusion, core principles including person-centered planning and natural supports, common barriers and solutions, and the specific role DSPs play in facilitating community connections."
    },
    {
      id: "mod-2",
      title: "Person-Centered Planning and Glossary of Terms for Support Professionals",
      description: "Learn the principles and practices of person-centered planning for effective community inclusion.",
      videoUrl: "https://youtu.be/PFDKE6VnUNw",
      content: `
# Person-Centered Planning

Person-centered planning is a foundational approach to supporting individuals with disabilities in achieving meaningful community inclusion. This approach puts the individual at the center of all planning and decision-making processes.

## Core Principles of Person-Centered Planning

Person-centered planning is guided by these key principles:

- The person is the primary decision-maker in their life
- Planning focuses on capacities, strengths, and preferences, not deficits
- The individual's dreams and goals drive the planning process
- Natural supports and community connections are prioritized
- Planning is ongoing, flexible, and responsive to changing needs
- Success is defined by the person, not predetermined program outcomes
- Cultural values and preferences are respected and incorporated

## Key Elements of Effective Person-Centered Planning

### 1. Getting to Know the Person
- Understanding their history, culture, and background
- Identifying interests, talents, and passions
- Learning about relationships and existing supports
- Discovering what works/doesn't work in their life
- Understanding their preferred communication style

### 2. Building a Circle of Support
- Identifying people who care about the person
- Including both paid and unpaid supports
- Ensuring diversity of perspectives and skills
- Involving community members when appropriate
- Respecting the person's preferences about who participates

### 3. Creating a Positive Vision for the Future
- Exploring dreams and aspirations without limitations
- Identifying what a good life means to the person
- Focusing on strengths and possibilities
- Creating concrete, visual representations
- Thinking beyond traditional service options

### 4. Developing Action Steps
- Breaking large goals into manageable steps
- Assigning specific responsibilities
- Creating timelines that make sense
- Building on existing resources and relationships
- Identifying needed supports and resources

## Person-Centered Planning Methods

Several structured approaches exist for person-centered planning:

### MAPS (Making Action Plans)
- Explores the person's history, dreams, fears, needs, and talents
- Identifies who the person is and what they need to be successful
- Creates a concrete action plan for moving forward

### PATH (Planning Alternative Tomorrows with Hope)
- Begins with the "North Star" vision of an ideal future
- Works backward to identify immediate next steps
- Creates a visual roadmap toward goals

### Essential Lifestyle Planning
- Focuses on day-to-day preferences and requirements
- Distinguishes between "non-negotiables" and preferences
- Emphasizes detailed documentation of what works

### Personal Futures Planning
- Maps the person's relationships, places, interests, and choices
- Identifies opportunities and obstacles in the community
- Develops strategies to increase community participation

## Supporting Community Inclusion Through Person-Centered Planning

Person-centered planning directly supports community inclusion by:

### Identifying Natural Community Connections
- Mapping existing relationships and community places
- Finding opportunities based on interests and strengths
- Discovering untapped resources and connections

### Addressing Barriers Creatively
- Problem-solving transportation issues
- Developing strategies for support needs
- Addressing accessibility challenges
- Building confidence through graduated steps

### Building Reciprocal Relationships
- Identifying ways the person can contribute to their community
- Finding roles that highlight strengths and talents
- Creating opportunities for giving as well as receiving support

## The DSP's Role in Person-Centered Planning

As a Direct Support Professional, you play a critical role in person-centered planning by:

1. Being a skilled observer of preferences and interests
2. Advocating for the person's voice in all decisions
3. Implementing support strategies consistent with the plan
4. Documenting what works and what doesn't
5. Identifying new opportunities aligned with goals
6. Supporting relationships with planning team members
7. Helping evaluate progress and suggest adjustments

Remember that person-centered planning is not a one-time event but an ongoing process of discovery, action, reflection, and adjustment. Your attentiveness to the person's changing interests and goals is essential to maintaining a truly person-centered approach to community inclusion.
`,
      questions: [
        {
          id: "q1-mod2-pcp",
          question: "What is a core principle of person-centered planning?",
          options: [
            "Planning should be completed quickly to maximize efficiency",
            "Professional opinions should guide all decision-making",
            "The person is the primary decision-maker in their life",
            "Goals should focus on addressing deficits and challenges"
          ],
          correctAnswer: 2,
          explanation: "A fundamental principle of person-centered planning is that the person is the primary decision-maker in their own life. The planning process centers their voice, preferences, and choices rather than being driven primarily by professional opinions or program requirements."
        },
        {
          id: "q2-mod2-pcp",
          question: "How does person-centered planning support community inclusion?",
          options: [
            "By creating standardized inclusion plans that work for everyone",
            "By identifying natural community connections based on the person's interests and strengths",
            "By limiting community exposure to prevent overwhelming experiences",
            "By focusing primarily on specialized disability programs"
          ],
          correctAnswer: 1,
          explanation: "Person-centered planning supports community inclusion by identifying natural community connections based on the individual's unique interests and strengths. This approach helps discover opportunities for meaningful participation that align with what matters to the person."
        },
        {
          id: "q3-mod2-pcp",
          question: "What is the purpose of building a 'circle of support' in person-centered planning?",
          options: [
            "To create a group that will make decisions for the person",
            "To ensure professionals maintain control of the planning process",
            "To identify people who care about the person and can help implement the plan",
            "To replace natural supports with paid staff"
          ],
          correctAnswer: 2,
          explanation: "Building a circle of support involves identifying people who genuinely care about the person and can contribute to implementing their plan. This includes both paid and unpaid supports and creates a network of people committed to helping the person achieve their goals."
        },
        {
          id: "q4-mod2-pcp",
          question: "As a DSP, what is your role in person-centered planning?",
          options: [
            "Taking control of the planning process since you know the person best",
            "Limiting options to those you believe are realistic",
            "Being a skilled observer of preferences and advocating for the person's voice",
            "Creating plans that fit within existing program structures"
          ],
          correctAnswer: 2,
          explanation: "As a DSP, your role includes being a skilled observer of the person's preferences and interests, advocating for their voice in all decisions, implementing support strategies consistent with their plan, and helping identify new opportunities aligned with their goals."
        }
      ],
      audioUrl: "/Audio/Improving Social Skills_ A Practical Guide (1).wav",
      transcript: "In this audio lesson, we explore the principles and practices of person-centered planning for effective community inclusion. We discuss the core elements of the person-centered approach, various planning methods like MAPS and PATH, strategies for identifying natural community connections, and the essential role DSPs play in implementing person-centered plans that support meaningful community participation."
    }
  ]
};
