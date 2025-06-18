import { Course } from '../courseTypes';

export const trustRapportCourse: Course = {
  id: "trust-rapport",
  title: "Building Trust & Rapport in Support Work",
  description: "Learn effective strategies for building positive relationships and trust while maintaining professional boundaries in support work.",
  category: "Professional Skills",
  instructor: "Dr. Maya Williams, DSP-III",
  thumbnail: "/Images/b1c17745-26e5-4eba-bc1a-0d62a9716533.png",
  duration: "2 hours",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Foundations of Trust and Rapport",
      description: "Understand the importance of building positive relationships and developing empathy in support work.",
      videoUrl: "https://youtu.be/S7nAAgjQVIc",
      content: `
# Foundations of Trust and Rapport

Building positive relationships, trust, and rapport with individuals is the essential foundation of successful support work. These connections create a safe, understanding, and collaborative environment where people can thrive.

## The Importance of Trust

Trust is the cornerstone of any effective support relationship. It is:

- Earned through consistency, honesty, and genuine caring
- Built by being reliable and following through on promises
- Strengthened by maintaining routines important to the individual
- Essential for creating psychological safety
- The foundation that allows for meaningful support work

## Developing Empathy

Empathy allows support professionals to understand and share the feelings of those they support:

### 1. Validation Through Empathy
- Acknowledge feelings without judgment
- Show understanding of the individual's perspective
- Make them feel heard and respected
- Recognize the legitimacy of their experiences and emotions
- Practice active listening techniques

### 2. Understanding Perspective
- Put yourself in their position
- Appreciate their unique life experiences
- Recognize how disabilities or challenges affect daily life
- Acknowledge the validity of their feelings
- See situations from their point of view

## Creating Positive Interactions

Positive interactions build trust and strengthen your working relationship:

### 1. Shared Activities
- Find common ground or activities the person enjoys
- Participate genuinely in these activities together
- Create a sense of belonging and mutual respect
- Help the person see you as an ally, not just staff
- Build connections through shared experiences

### 2. Positive Reinforcement
- Acknowledge achievements and efforts
- Provide specific, genuine praise
- Boost self-esteem through positive feedback
- Foster motivation through encouragement
- Strengthen bonds through positive recognition

## A Friendly Demeanor

Creating a welcoming atmosphere helps establish rapport:

- A warm greeting sets a positive tone
- Appropriate humor lightens interactions
- Open body language signals approachability
- Consistent kindness builds comfort
- Genuine interest shows you value the person

Remember that building trust and rapport takes time. Be patient, consistent, and authentic in your interactions. The foundations you build will support all other aspects of your work together.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "What is one of the main ways trust is earned in support work?",
          options: [
            "By keeping personal information private from the individual",
            "Through consistency, honesty, and genuine caring",
            "By maintaining a strictly professional demeanor at all times",
            "By solving all the individual's problems for them"
          ],
          correctAnswer: 1,
          explanation: "Trust is earned primarily through consistency, honesty and genuine caring. Being reliable, showing up on time, following through on promises, and maintaining important routines all contribute to building trust."
        },
        {
          id: "q2-mod1",
          question: "Why is empathy important in building rapport?",
          options: [
            "It allows you to take on the individual's problems as your own",
            "It validates their experiences and makes them feel heard and respected",
            "It helps you convince them to follow your advice",
            "It speeds up the support process"
          ],
          correctAnswer: 1,
          explanation: "Empathy is important because it validates the individual's experiences and emotions, making them feel heard and respected. This validation is crucial for building a trusting relationship."
        },
        {
          id: "q3-mod1",
          question: "What is one of the best ways to build rapport according to the course material?",
          options: [
            "Maintaining strict professional distance",
            "Finding common ground or activities the person enjoys and participating with them",
            "Focusing solely on teaching new skills",
            "Keeping interactions brief and focused"
          ],
          correctAnswer: 1,
          explanation: "One of the best ways to build rapport is finding common ground or activities the person enjoys and participating with them. Shared activities create a sense of belonging and mutual respect."
        },
        {
          id: "q4-mod1",
          question: "How does positive reinforcement affect the support relationship?",
          options: [
            "It creates dependency on praise",
            "It boosts self-esteem, fosters motivation, and strengthens bonds",
            "It has minimal impact on the support relationship",
            "It should only be used with children, not adults"
          ],
          correctAnswer: 1,
          explanation: "Positive reinforcement boosts the individual's self-esteem, fosters motivation, and strengthens the bond between the support worker and the individual."
        },
        {
          id: "q5-mod1",
          question: "Why is understanding the individual's perspective important?",
          options: [
            "It helps you convince them to follow your advice",
            "It shows that you value their experiences and emotions",
            "It's not important as long as you follow the care plan",
            "It's only important for individuals with communication difficulties"
          ],
          correctAnswer: 1,
          explanation: "Understanding the individual's perspective is important because it shows that you value their experiences and emotions, which helps build trust and rapport."
        },
        {
          id: "q6-mod1",
          question: "Professional boundaries involve finding the line between being supportive versus becoming inappropriately involved. What is essential to respect regarding professional boundaries?",
          options: [
            "Only the staff member's needs",
            "The supervisor's preferences",
            "Personal space, avoiding overfamiliarity, and prioritizing the individual's needs",
            "Financial gain for the staff member"
          ],
          correctAnswer: 2,
          explanation: "Respecting personal space, avoiding overfamiliarity, and prioritizing the individual's needs are essential for maintaining professional boundaries."
        },
        {
          id: "q7-mod1",
          question: "When it comes to sharing personal information, what is considered inappropriate for a support professional?",
          options: [
            "Stating 'I have two kids in school' if asked about family",
            "Oversharing personal problems or building a dependency",
            "Briefly mentioning a weekend activity",
            "Discussing general weather conditions"
          ],
          correctAnswer: 1,
          explanation: "Oversharing personal problems or building a dependency on the support professional is inappropriate and blurs professional boundaries."
        },
        {
          id: "q8-mod1",
          question: "Why are professional boundaries considered important in support work?",
          options: [
            "To limit the individual's independence",
            "To make the staff member's job easier",
            "They protect both the individual and the support professional, ensuring the relationship remains healthy and ethical.",
            "To avoid any emotional connection whatsoever"
          ],
          correctAnswer: 2,
          explanation: "Professional boundaries are crucial as they protect both the individual and the support professional, ensuring the relationship remains healthy, ethical, and focused on the individual's well-being."
        },
        {
          id: "q9-mod1",
          question: "When working with families, especially if the family tends to speak over the individual, what gentle redirect is suggested to ensure the individual's voice is heard?",
          options: [
            "'You are not allowed to interrupt.'",
            "'I will only speak to the individual directly.'",
            "'I'd love to hear what Alex thinks first and then we can add on tips.'",
            "'Your input is not needed at this time.'"
          ],
          correctAnswer: 2,
          explanation: "A gentle redirect like, 'I'd love to hear what Alex thinks first and then we can add on tips,' respectfully ensures the individual's voice is prioritized."
        },
        {
          id: "q10-mod1",
          question: "Regarding gift-giving or financial boundaries, what is generally considered acceptable or advised?",
          options: [
            "Accepting expensive gifts as a sign of appreciation",
            "Asking for loans from the individual",
            "Giving or receiving small tokens like a handmade card or a $5 holiday gift, while checking agency policy.",
            "Allowing the individual to manage your personal finances"
          ],
          correctAnswer: 2,
          explanation: "Generally, small tokens may be acceptable, but it's crucial to always check and adhere to agency policy regarding gifts and financial interactions to maintain professional boundaries."
        }
      ],
      audioUrl: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media//Building%20Trust,%20Rapport,%20and%20Boundaries%20in%20Support%20Work.wav",
      transcript: "This audio segment explores the foundations of building trust and rapport in support work. We discuss the importance of consistency, empathy, and positive interactions in establishing strong, supportive relationships. We also examine how shared activities and genuine interest help individuals see support professionals as allies rather than just staff."
    }
    
    
  ]
};
