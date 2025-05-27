import { Course } from '../courseTypes';

export const empowermentAdvocacyCourse: Course = {
  id: "infection-control",
  title: "Infection Control and Prevention",
  description: "Learn essential infection control practices to maintain a safe environment for individuals with developmental disabilities and prevent the spread of infectious diseases.",
  category: "Health & Safety",
  instructor: "Dr. Maria Sanchez, MPH, CIC",
  thumbnail: "/Images/infectionControl.png", // Please add this image to public/Images or update the filename if needed.
  duration: "1 hour",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1",
      title: "Principles of Infection Control",
      description: "Understand the core principles of infection control and how to implement them in support settings.",
      videoUrl: "https://youtu.be/JG70KaJX3UA",
      content: `
# Principles of Infection Control

Infection control is a set of practices designed to prevent the spread of infectious diseases. As a Direct Support Professional, you play a crucial role in maintaining a safe environment by:

- Following proper hand hygiene protocols
- Using personal protective equipment (PPE) correctly
- Implementing standard precautions consistently
- Recognizing signs and symptoms of infection
- Maintaining clean and sanitary environments

## Key Infection Control Practices

### Hand Hygiene
- Wash hands with soap and water for at least 20 seconds
- Use alcohol-based hand sanitizer when soap and water aren't available
- Clean hands before and after every client interaction
- Perform hand hygiene before putting on and after removing gloves

### Personal Protective Equipment (PPE)
- Gloves: Wear when contact with blood or body fluids is possible
- Masks: Use when respiratory protection is needed
- Gowns: Wear to protect skin and clothing during procedures
- Eye Protection: Use when splashes or sprays are anticipated

### Environmental Cleaning
- Clean and disinfect high-touch surfaces regularly
- Use EPA-approved disinfectants
- Follow proper waste disposal procedures
- Launder contaminated linens separately

Effective infection control requires consistent application of these principles. Your diligence can prevent the spread of infection and protect both yourself and those you support.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "What is the most effective way to prevent the spread of infections?",
          options: [
            "Using antibiotics preventively",
            "Proper hand hygiene",
            "Wearing gloves all day",
            "Isolating all individuals with symptoms"
          ],
          correctAnswer: 1,
          explanation: "Proper hand hygiene (washing hands with soap and water or using alcohol-based hand sanitizer) is considered the single most effective way to prevent the spread of infections in healthcare settings."
        },
        {
          id: "q2-mod1",
          question: "When should you perform hand hygiene in a support setting?",
          options: [
            "Only after direct contact with an individual",
            "Only when hands are visibly soiled",
            "Before and after every client interaction",
            "Once at the beginning of your shift"
          ],
          correctAnswer: 2,
          explanation: "Hand hygiene should be performed before and after every client interaction to prevent the transmission of pathogens between individuals."
        },
        {
          id: "q3-mod1",
          question: "Which of the following is an example of a standard precaution?",
          options: [
            "Using PPE only with clients who have a known infection",
            "Assuming all blood and body fluids are potentially infectious",
            "Administering antibiotics to all clients",
            "Restricting visitors in all situations"
          ],
          correctAnswer: 1,
          explanation: "Standard precautions include assuming that all blood and body fluids are potentially infectious, regardless of a client's known infection status. This approach ensures consistent safety practices."
        }
      ],
      audioUrl: "/Audio/Direct Support Infection Control Training.wav",
      transcript: "This audio segment covers the fundamental principles of infection control, including hand hygiene, proper use of personal protective equipment, and environmental cleaning strategies to prevent the spread of infectious diseases in support settings."
    }
  ],
  domain: ''
};