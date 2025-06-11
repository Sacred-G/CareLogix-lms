import { Course } from '../courseTypes';

export const dspSupportCourse: Course = {
  id: "dsp-support",
  title: "DSP Support: Empathy, Empowerment, and Communication",
  description: "Master essential skills in empathetic listening, clear communication, and empowerment strategies to effectively support individuals with developmental disabilities.",
  category: "Professional Development",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/dsp-support-thumbnail.png",
  duration: "45 min",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Supporting Clients in Difficult Situations",
      description: "Learn essential strategies for building trust, effective communication, and promoting independence in your support work.",
      videoUrl: "https://youtu.be/rXqabIZcL-I",
      content: `
# Empathy, Communication, and Empowerment in DSP Work

## Section 1: Building Trust Through Empathetic Listening

### Active Listening Techniques
- Reflect back what you hear without judgment
- Maintain appropriate eye contact and open body language
- Avoid interrupting or finishing sentences
- Show empathy through facial expressions and verbal affirmations

### Validating Feelings
- Acknowledge emotions without minimizing them
- Use phrases like "I can see this is important to you"
- Avoid dismissive responses like "Don't worry about it"
- Recognize that all feelings are valid, even if the situation seems minor

## Section 2: Clear Communication Strategies

### Simplifying Complex Information
- Break down instructions into small, manageable steps
- Use concrete examples and visual aids when possible
- Check for understanding by asking the person to explain in their own words
- Avoid professional jargon and technical terms

### Practical Communication Tips
- Speak clearly and at a comfortable pace
- Allow extra time for processing
- Use positive, person-first language
- Be mindful of non-verbal communication

## Section 3: Promoting Independence and Choice

### Offering Meaningful Choices
- Present options in a clear, accessible way
- Start with limited choices (2-3 options)
- Respect the individual's right to say no
- Use choice-making as a learning opportunity

### Handling Challenging Situations
- Stay calm and patient
- Acknowledge the person's feelings
- Offer alternatives when possible
- Maintain professional boundaries while showing care

## Section 4: Professional Boundaries and Self-Care

### Maintaining Professionalism
- Keep personal and professional relationships separate
- Be consistent in your approach
- Document interactions appropriately
- Know when to seek supervision or additional support

### Preventing Burnout
- Practice regular self-care
- Set healthy boundaries
- Seek support from colleagues and supervisors
- Recognize signs of compassion fatigue
`,
      questions: [
        {
          id: "q1",
          question: "What is the first step in reflective listening?",
          options: [
            "Offering immediate solutions",
            "Repeating back what you hear without judgment",
            "Asking many questions",
            "Changing the subject"
          ],
          correctAnswer: 1,
          explanation: "Reflective listening begins with calmly repeating back what you hear, which helps validate the person's feelings and encourages further communication."
        },
        {
          id: "q2",
          question: "Why is it important to validate someone's feelings even if they seem minor?",
          options: [
            "It's required by policy",
            "What seems minor to you might be significant to them",
            "It makes your job easier",
            "It prevents complaints"
          ],
          correctAnswer: 1,
          explanation: "Validating all feelings shows respect for the individual's experience and helps build trust in the relationship."
        },
        {
          id: "q3",
          question: "What is a key principle when simplifying complex information?",
          options: [
            "Using professional terminology",
            "Breaking information into clear, everyday language",
            "Providing as much detail as possible",
            "Using the same explanation for everyone"
          ],
          correctAnswer: 1,
          explanation: "Breaking down information into clear, simple language helps ensure understanding and accessibility."
        },
        {
          id: "q4",
          question: "What is one way to promote independence when supporting someone?",
          options: [
            "Doing tasks for them to save time",
            "Offering limited, meaningful choices",
            "Making all decisions for them",
            "Avoiding new activities"
          ],
          correctAnswer: 1,
          explanation: "Offering meaningful choices empowers individuals and supports their independence."
        },
        {
          id: "q5",
          question: "What should you do when you need to say 'no' to a request?",
          options: [
            "Just say no without explanation",
            "Acknowledge their feelings and explain the reason",
            "Ignore the request",
            "Tell them to ask someone else"
          ],
          correctAnswer: 1,
          explanation: "Acknowledging feelings and explaining the reason helps maintain trust and respect in the relationship."
        },
        {
          id: "q6",
          question: "What is a sign that you might need to involve additional support?",
          options: [
            "A temporary frustration",
            "A preference for being alone sometimes",
            "Prolonged mood changes lasting weeks",
            "Occasional difficulty sleeping"
          ],
          correctAnswer: 2,
          explanation: "Prolonged mood changes may indicate a need for professional intervention."
        },
        {
          id: "q7",
          question: "Why is maintaining professional boundaries important?",
          options: [
            "It makes the job easier",
            "It ensures appropriate, ethical support",
            "It prevents friendships",
            "It's required by law"
          ],
          correctAnswer: 1,
          explanation: "Professional boundaries ensure support remains appropriate and ethical for both the DSP and the individual."
        },
        {
          id: "q8",
          question: "What is a strategy for preventing burnout?",
          options: [
            "Working longer hours",
            "Practicing regular self-care",
            "Avoiding breaks",
            "Taking on more responsibilities"
          ],
          correctAnswer: 1,
          explanation: "Regular self-care is essential for preventing burnout and maintaining quality support."
        },
        {
          id: "q9",
          question: "What is an example of validating someone's feelings?",
          options: [
            "You shouldn't feel that way",
            "That doesn't make sense",
            "I can see this is important to you",
            "Don't worry about it"
          ],
          correctAnswer: 2,
          explanation: "Acknowledging the importance of someone's feelings is a key aspect of validation."
        },
        {
          id: "q10",
          question: "What should you do if you're unsure how to handle a situation?",
          options: [
            "Make your best guess",
            "Seek supervision or additional support",
            "Ignore the situation",
            "Ask the individual to figure it out"
          ],
          correctAnswer: 1,
          explanation: "Seeking appropriate support when needed is a sign of professional responsibility."
        }
      ],
      audioUrl: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/audio2/Navigating%20Challenges%20with%20Compassion%20and%20Empowerment.wav",
      transcript: "This comprehensive audio segment covers essential DSP support strategies, including empathetic listening techniques, clear communication methods, and empowerment approaches. We discuss practical ways to build trust, simplify complex information, promote independence, and maintain professional boundaries while providing compassionate support. The module also addresses self-care strategies to prevent burnout and ensure sustainable, high-quality support."
    }
  ]
};
