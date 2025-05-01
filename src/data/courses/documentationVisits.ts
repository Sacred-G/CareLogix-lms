
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
        },
        {
          id: "q4-mod1",
          question: "How does documentation contribute to quality improvement?",
          options: [
            "It doesn't affect quality improvement efforts", 
            "It helps identify patterns, track goal progress, and support data-based decision making", 
            "It only matters for billing purposes", 
            "It only helps with staff performance evaluations"
          ],
          correctAnswer: 1,
          explanation: "Good documentation helps identify patterns and areas needing improvement, allows tracking of goal progress over time, supports data-based decision making, and contributes to overall program evaluation and improvement efforts."
        },
        {
          id: "q5-mod1",
          question: "What aspect of documentation helps with legal protection?",
          options: [
            "Using technical terminology", 
            "Creating a record of services provided and procedures followed", 
            "Writing lengthy narratives", 
            "Including personal opinions about client behavior"
          ],
          correctAnswer: 1,
          explanation: "Documentation provides legal protection by creating a record of services provided, documenting that proper procedures were followed, providing evidence in case of investigations, and demonstrating compliance with regulations and standards."
        },
        {
          id: "q6-mod1",
          question: "Which of the following is NOT a core principle of effective documentation?",
          options: [
            "Be objective", 
            "Be detailed about your personal feelings", 
            "Be accurate", 
            "Be concise"
          ],
          correctAnswer: 1,
          explanation: "Documenting personal feelings is not a core principle of effective documentation. Instead, documentation should be objective, accurate, complete, concise, and confidential, focusing on observable facts rather than subjective impressions."
        },
        {
          id: "q7-mod1",
          question: "How does documentation support client advocacy?",
          options: [
            "It doesn't relate to advocacy", 
            "By documenting unmet needs, preferences, and choices that support client-centered planning", 
            "By focusing only on client problems", 
            "By emphasizing staff perspectives over client perspectives"
          ],
          correctAnswer: 1,
          explanation: "Documentation supports client advocacy by recording unmet needs and necessary resources, documenting client preferences and choices, demonstrating respect for client rights, and supporting client-centered planning approaches."
        },
        {
          id: "q8-mod1",
          question: "What does it mean to be 'complete' in documentation?",
          options: [
            "Including every detail of your shift no matter how small", 
            "Writing at least three pages per day", 
            "Answering the what, when, where, who, and how of relevant situations", 
            "Using complex medical terminology"
          ],
          correctAnswer: 2,
          explanation: "Complete documentation answers the what, when, where, who, and how of relevant situations. It includes both routine and unusual occurrences, documents follow-up actions taken, notes any missing information and why, and records both successes and challenges."
        },
        {
          id: "q9-mod1",
          question: "Why is confidentiality important in documentation?",
          options: [
            "It only matters for famous clients", 
            "To protect sensitive information and respect privacy rights", 
            "It's only important for medical records", 
            "It's mostly about preventing other staff from reading notes"
          ],
          correctAnswer: 1,
          explanation: "Confidentiality in documentation protects sensitive information, respects privacy rights, maintains trust, complies with legal requirements like HIPAA, and recognizes that personal information belongs to the individual and should only be shared with those who need to know for support purposes."
        },
        {
          id: "q10-mod1",
          question: "How does documentation support continuity of care?",
          options: [
            "By ensuring all team members have updated information about clients", 
            "By keeping information private from other staff", 
            "By focusing only on unusual incidents", 
            "By emphasizing staff concerns over client needs"
          ],
          correctAnswer: 0,
          explanation: "Documentation supports continuity of care by ensuring all team members have updated information, providing a history of interventions and their effectiveness, helping track patterns and changes over time, and facilitating coordination between different providers."
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
        },
        {
          id: "q5-mod2",
          question: "What should be included in the 'Plan' section of a SOAP note?",
          options: [
            "Only medical instructions from doctors",
            "Next steps, follow-up actions, referrals made, and upcoming appointments",
            "A complete history of all previous interventions",
            "Only information about medication changes"
          ],
          correctAnswer: 1,
          explanation: "The Plan section should include next steps and follow-up actions, referrals made, resources provided, and upcoming appointments. This section outlines what will happen next in the individual's support or treatment process."
        },
        {
          id: "q6-mod2",
          question: "What is the purpose of the 'Assessment' section in a SOAP note?",
          options: [
            "To list all medications the person takes",
            "To document only what the individual says",
            "To provide your professional analysis and identify patterns or progress",
            "To schedule future appointments"
          ],
          correctAnswer: 2,
          explanation: "The Assessment section provides your professional analysis of the situation, including patterns you've noticed, progress toward goals, and barriers identified. It goes beyond just reporting facts to drawing professional conclusions based on your observations and expertise."
        },
        {
          id: "q7-mod2",
          question: "Which statement demonstrates the most objective documentation?",
          options: [
            "Client was happy during the outing",
            "Client smiled and stated 'I really enjoyed going to the park today'",
            "Client had a great attitude about community participation",
            "Client seems to prefer outdoor activities over indoor ones"
          ],
          correctAnswer: 1,
          explanation: "The statement 'Client smiled and stated 'I really enjoyed going to the park today'' is the most objective because it describes observable behavior (smiling) and provides a direct quote, rather than interpreting or making assumptions about the client's feelings."
        },
        {
          id: "q8-mod2",
          question: "Why is it important to document both challenges and successes?",
          options: [
            "It's not important; only document problems",
            "To provide a balanced and accurate picture of the person's situation and progress",
            "Only successes matter for documentation",
            "Only to satisfy audit requirements"
          ],
          correctAnswer: 1,
          explanation: "Documenting both challenges and successes provides a balanced and accurate picture of the person's situation and progress. This comprehensive approach helps identify patterns, track real progress, and develop appropriate support strategies that address difficulties while building on strengths."
        },
        {
          id: "q9-mod2",
          question: "Why should you avoid backdating documentation?",
          options: [
            "It's too time-consuming",
            "It creates legal and ethical issues related to accuracy and honesty in records",
            "It makes the notes too lengthy",
            "It's acceptable as long as you remember the details"
          ],
          correctAnswer: 1,
          explanation: "Backdating documentation (writing notes with an earlier date than when they were actually written) creates legal and ethical issues related to accuracy and honesty in records. It can raise questions about credibility and may violate professional standards and policies."
        },
        {
          id: "q10-mod2",
          question: "Which information is appropriate to include in the 'Subjective' section of a SOAP note?",
          options: [
            "Your interpretation of why the client behaved a certain way",
            "The exact time medications were administered",
            "Measurements of vital signs",
            "The client's statement about how they're feeling today"
          ],
          correctAnswer: 3,
          explanation: "The Subjective section should include information provided by the client, such as their statements about how they feel, their perception of their situation, and their reported experiences. The client's statement about how they're feeling today belongs in this section."
        }
      ],
      audioUrl: "https://example.com/audio/writing-notes.mp3",
      transcript: "In this audio segment, we discuss effective techniques for writing visit notes. We explore the SOAP format for organizing information, common documentation mistakes to avoid, and practical tips for creating excellent documentation. We emphasize the importance of clear, objective, and respectful language throughout all documentation."
    }
  ]
};
