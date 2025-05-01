
import { Course } from '../courseTypes';

export const documentationVisitsCourse: Course = {
  id: "documentation-visits",
  title: "Documentation and Visit Notes",
  description: "Learn effective documentation techniques and best practices for writing accurate, objective visit notes.",
  category: "Professional Skills",
  instructor: "Patricia Garcia, MSW",
  thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db",
  duration: "1.5 hours",
  modules: [
    {
      id: "mod-1",
      title: "Principles of Effective Documentation",
      description: "Learn why documentation matters and the core principles of writing effective notes.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      content: `
# Principles of Effective Documentation

Proper documentation is a critical responsibility for Direct Support Professionals. It ensures continuity of care, protects both clients and staff, and creates a legal record of services provided.

## Why Documentation Matters

### 1. Continuity of Care
- Ensures all team members have updated information
- Provides history of interventions and their effectiveness
- Helps track patterns and changes over time
- Facilitates coordination between different providers

### 2. Legal Protection
- Creates a record of services provided
- Documents that proper procedures were followed
- Provides evidence in case of investigations
- Demonstrates compliance with regulations and standards

### 3. Quality Improvement
- Helps identify areas needing improvement
- Allows tracking of goal progress
- Supports data-based decision making
- Contributes to program evaluation

### 4. Client Advocacy
- Documents unmet needs and necessary resources
- Records client preferences and choices
- Demonstrates respect for client rights
- Supports client-centered planning

## Core Principles of Documentation

### 1. Be Objective
- Record observable facts, not opinions
- Use specific, concrete language
- Avoid judgmental terms or assumptions
- Include direct quotes when relevant
- Distinguish between observation and interpretation

### 2. Be Accurate
- Use precise language
- Document in a timely manner (ideally same day)
- Verify information before recording
- Include relevant details
- Ensure spelling and grammar are correct

### 3. Be Complete
- Answer the what, when, where, who, and how
- Include both routine and unusual occurrences
- Document follow-up actions taken
- Note any missing information and why
- Record both successes and challenges

### 4. Be Concise
- Keep to relevant information
- Use clear, direct language
- Avoid redundancy and unnecessary details
- Use approved abbreviations only
- Organize information logically

### 5. Be Confidential
- Only share information with authorized individuals
- Store documentation securely
- Follow all privacy regulations and policies
- Be mindful of what is documented in shared spaces
- Know when information must be reported

Remember that your documentation may be read by many people, including other staff, managers, auditors, and potentially even courts. Write with this audience in mind, and always consider how your documentation reflects on the quality of support provided.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "Why is objective documentation important?",
          options: [
            "It's faster to write", 
            "It prevents factual information from being mixed with personal opinions", 
            "It uses more professional language", 
            "It requires less detail"
          ],
          correctAnswer: 1,
          explanation: "Objective documentation separates observed facts from personal opinions or interpretations. This ensures that other team members receive accurate information and can form their own professional judgments based on facts rather than another person's conclusions."
        },
        {
          id: "q2-mod1",
          question: "Which of the following is an example of objective documentation?",
          options: [
            "John was in a bad mood today", 
            "John seemed uncooperative during morning activities", 
            "John stated 'I don't want to participate' and left the activity room at 10:15 AM", 
            "John was being difficult again"
          ],
          correctAnswer: 2,
          explanation: "The statement 'John stated 'I don't want to participate' and left the activity room at 10:15 AM' is objective because it reports observable facts and direct quotes without interpretation or judgment."
        },
        {
          id: "q3-mod1",
          question: "What does 'timely documentation' generally mean?",
          options: [
            "Documentation completed at the end of the week", 
            "Documentation completed before leaving a shift", 
            "Documentation completed whenever you have free time", 
            "Documentation completed only when required by supervisors"
          ],
          correctAnswer: 1,
          explanation: "Timely documentation means completing your notes before ending your shift or work period. This ensures the information is fresh in your mind and available to the next staff person, supporting continuity of care."
        }
      ],
      audioUrl: "https://example.com/audio/documentation-principles.mp3",
      transcript: "This audio segment explores why proper documentation is crucial for Direct Support Professionals. We discuss how documentation supports continuity of care, provides legal protection, facilitates quality improvement, and enables client advocacy. We also cover the five core principles of effective documentation: objectivity, accuracy, completeness, conciseness, and confidentiality."
    },
    {
      id: "mod-2",
      title: "Writing Effective Visit Notes",
      description: "Learn specific techniques for writing clear, informative, and compliant visit notes.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      content: `
# Writing Effective Visit Notes

Visit notes document the services provided during a specific interaction with an individual. Learning to write clear, informative notes is an essential skill for Direct Support Professionals.

## The SOAP Format

Many organizations use the SOAP format for structuring notes:

### Subjective (S)
- Information provided by the client
- Client's statements about how they feel
- Client's perception of their situation
- Direct quotes when possible
- Example: "Samuel stated, 'I didn't sleep well last night' and reported feeling tired."

### Objective (O)
- Observable facts and measurements
- Behaviors you witnessed
- Activities completed
- Physical observations
- Example: "Samuel participated in morning hygiene routine with verbal prompting only. He ate 50% of breakfast and took medications as scheduled."

### Assessment (A)
- Your professional analysis
- Patterns you've noticed
- Progress toward goals
- Barriers identified
- Example: "Samuel appears to be making progress with independent morning routine but continues to need prompts for thorough hygiene tasks."

### Plan (P)
- Next steps and follow-up actions
- Referrals made
- Resources provided
- Upcoming appointments
- Example: "Will continue using visual schedule for morning routine. Contacted supervisor about sleep concerns. Samuel has doctor appointment scheduled for 5/15."

## Common Documentation Mistakes

### 1. Vague Language
* Avoid: "Had a good day"
* Better: "Participated in all scheduled activities, smiled frequently during music therapy, and verbally expressed enjoyment."

### 2. Subjective Judgments
* Avoid: "Was uncooperative and difficult"
* Better: "Declined participation in group activity and preferred to sit alone during lunch."

### 3. Incomplete Information
* Avoid: "Took medication"
* Better: "Took all morning medications (listed in MAR) at 8:00 AM with water, no difficulty swallowing observed."

### 4. Inconsistent Terminology
* Avoid using different terms for the same behavior
* Use agreed-upon terminology from the support plan

### 5. Late Documentation
* Document as soon as possible after events occur
* Never backdate documentation

## Tips for Excellent Documentation

1. Use person-first, respectful language
2. Focus on facts and observations
3. Include both challenges and successes
4. Document according to individual goals and care plan
5. Be specific about supports provided
6. Note any unusual circumstances or changes
7. Document follow-up needed
8. Proofread before submitting

Remember that your notes are part of a permanent record and may be read by the individual you support, their family members, other professionals, auditors, and potentially courts. Always write with clarity, respect, and professionalism.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "What does the 'O' in the SOAP documentation format stand for?",
          options: ["Outcomes", "Objective", "Observations", "Outlines"],
          correctAnswer: 1,
          explanation: "The 'O' in SOAP stands for Objective, which includes observable facts, behaviors witnessed, activities completed, and physical observations - information that can be seen or measured rather than interpreted."
        },
        {
          id: "q2-mod2",
          question: "Which of the following is an example of vague documentation?",
          options: [
            "Client ate 75% of their lunch meal", 
            "Client had a bad morning", 
            "Client stated they felt anxious about the upcoming doctor appointment", 
            "Client required physical assistance to transfer from bed to wheelchair"
          ],
          correctAnswer: 1,
          explanation: "The statement 'Client had a bad morning' is vague because it provides no specific, observable information about what happened or why the morning was considered 'bad'. It's a subjective judgment without supporting details."
        },
        {
          id: "q3-mod2",
          question: "When is the best time to document your visit notes?",
          options: [
            "At the end of the week", 
            "When you remember to do it", 
            "As soon as possible after the visit", 
            "Only when something unusual happens"
          ],
          correctAnswer: 2,
          explanation: "The best practice is to document as soon as possible after the visit while the information is fresh in your mind. This leads to more accurate and detailed notes and ensures the information is available to other team members quickly."
        },
        {
          id: "q4-mod2",
          question: "Which of these statements uses person-first language?",
          options: [
            "The autistic client attended the group session", 
            "The wheelchair-bound client needs assistance", 
            "The client with Down syndrome participated in all activities", 
            "The disabled client requires extra help"
          ],
          correctAnswer: 2,
          explanation: "Person-first language puts the person before the disability, as in 'the client with Down syndrome' rather than defining them by their disability. This approach acknowledges the person's individuality first and the disability as just one aspect of who they are."
        }
      ],
      audioUrl: "https://example.com/audio/writing-notes.mp3",
      transcript: "In this audio segment, we discuss effective techniques for writing visit notes. We explore the SOAP format for organizing information, common documentation mistakes to avoid, and practical tips for creating excellent documentation. We emphasize the importance of clear, objective, and respectful language throughout all documentation."
    }
  ]
};
