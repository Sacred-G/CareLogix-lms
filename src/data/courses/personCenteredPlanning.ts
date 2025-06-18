import { Course } from '../courseTypes';

export const sirIncidentReportingCourse: Course = {
  id: "sir-incident-reporting",
  title: "SIR: Incident Reporting",
  description: "Learn the essential procedures and best practices for documenting and reporting significant incidents in support settings.",
  category: "Compliance & Safety",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/incidentReporting.png",
  duration: "45 minutes",
  modules: [
    {
      id: "mod-1",
      title: "Introduction to Incident Reporting",
      description: "Understand the importance of proper incident reporting and the types of incidents that require documentation.",
      videoUrl: "https://youtu.be/xiAQGNMf2MI",
      content: `
# Introduction to Incident Reporting

Incident reporting is a critical component of providing quality support and ensuring the safety and well-being of individuals receiving services. This module covers the fundamentals of significant incident reporting (SIR) in support settings.

## What is a Significant Incident?

A significant incident is any event that:
- Results in or has the potential to result in harm
- Requires intervention or follow-up
- Impacts the health, safety, or well-being of an individual
- May require notification to external agencies

## Why is Incident Reporting Important?

- Ensures the safety and well-being of individuals
- Helps identify patterns or trends in incidents
- Supports continuous quality improvement
- Meets regulatory and accreditation requirements
- Documents important information for future reference

## Types of Reportable Incidents

1. **Abuse/Neglect**: Physical, emotional, sexual, or financial
2. **Medical Emergencies**: Hospitalizations, serious injuries
3. **Behavioral Incidents**: Aggression, self-injury, elopement
4. **Medication Errors**: Incorrect dosage, wrong medication
5. **Property Damage**: Significant damage to property
6. **Law Enforcement Involvement**: Arrests, citations, or investigations
7. **Death**: Any death, regardless of cause

## The Incident Reporting Process

1. **Immediate Response**: Ensure safety and provide necessary care
2. **Documentation**: Complete the incident report form
3. **Notification**: Inform appropriate personnel and agencies
4. **Follow-up**: Conduct any necessary investigations
5. **Prevention**: Implement strategies to prevent recurrence
`,
      pdfPath: 'https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/pdfs/riskmanagement.pdf',
      questions: [
        {
          id: "q1-mod1",
          question: "What is the primary purpose of incident reporting?",
          options: [
            "To assign blame for incidents",
            "To ensure safety and improve quality of care",
            "To create more paperwork",
            "To avoid legal consequences"
          ],
          correctAnswer: 1,
          explanation: "The primary purpose of incident reporting is to ensure the safety of individuals and improve the quality of care by identifying and addressing potential issues."
        },
        {
          id: "q2-mod1",
          question: "Which of the following would NOT be considered a significant incident?",
          options: [
            "A minor bruise from a known medical condition",
            "Physical altercation between individuals",
            "Medication error requiring medical attention",
            "Unexpected hospitalization"
          ],
          correctAnswer: 0,
          explanation: "A minor bruise from a known medical condition with no change in status would typically not be considered a significant incident unless it indicates a change in condition."
        },
        {
          id: "q3-mod1",
          question: "What is the first step when an incident occurs?",
          options: [
            "Complete the paperwork",
            "Ensure safety and provide care",
            "Notify your supervisor",
            "Document what happened"
          ],
          correctAnswer: 1,
          explanation: "The first priority is always to ensure safety and provide any necessary care to those involved in the incident."
        },
        {
          id: "q4-mod1",
          question: "Why is it important to report near-miss incidents?",
          options: [
            "They help identify potential risks before harm occurs",
            "They are required by law",
            "They help justify staffing levels",
            "They are easier to document than actual incidents"
          ],
          correctAnswer: 0,
          explanation: "Reporting near-miss incidents helps identify potential risks and implement preventive measures before actual harm occurs."
        },
        {
          id: "q5-mod1",
          question: "What information should be included in an incident report?",
          options: [
            "Only the facts of what happened",
            "Only the staff member's opinion of what occurred",
            "A detailed account including who, what, when, where, and how",
            "Only information that makes the organization look good"
          ],
          correctAnswer: 2,
          explanation: "An incident report should include a detailed, factual account of the incident, including who was involved, what happened, when and where it occurred, and how it happened."
        }
      ],
      audioUrl: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/incident-reporting-intro.wav",
      transcript: "This audio segment introduces the fundamentals of incident reporting, including what constitutes a reportable incident, why reporting is crucial, and the different types of incidents that require documentation. We'll also cover the basic steps in the incident reporting process."
    },
  ]
};
