import { Module } from '../../../courseTypes';

export const documentationModule: Module = {
  id: 'documentation',
  title: 'Daily Documentation and Reporting',
  description: 'Learn the importance of accurate documentation in providing quality care for individuals with developmental disabilities.',
  content: `
# Daily Documentation and Reporting

## The Critical Role of Documentation

Documentation is much more than paperwork—it's a communication tool that ensures quality care, protects individuals' rights, and creates a legal record of services provided.

**Why Documentation Matters:**
- Creates a record of services and supports provided
- Helps track progress and identify patterns
- Facilitates communication among team members
- Provides evidence for service funding and continuation
- Serves as legal protection for both individuals and service providers
- Demonstrates compliance with regulations and standards

## Writing Effective Daily Logs and Service Notes

### Principles of Quality Documentation

**Be Objective:**
- Focus on observable facts rather than your interpretations
- Use specific, concrete language
- Avoid judgmental terms or assumptions

**Examples:**
- Instead of: "John was in a bad mood today."
- Write: "John stated he was feeling frustrated and declined to participate in morning activities."

**Be Thorough:**
- Include all relevant information: who, what, when, where, how
- Document both routine activities and notable events
- Record both successes and challenges

**Be Timely:**
- Complete documentation as soon as possible after events occur
- Never backdate or pre-date documentation
- Follow required timeframes for different types of documentation

**Be Accurate:**
- Verify information before recording it
- Use correct spelling, grammar, and terminology
- Clearly indicate the source of information (direct observation, reported by individual, reported by staff, etc.)

## Special Incident Reporting (SIR)

### What Qualifies as a Reportable Incident

**Types of Incidents That Must Be Reported:**
- Suspected abuse or neglect
- Serious injury or illness
- Medication errors with adverse effects
- Missing person
- Property damage or theft
- Behavioral incidents requiring intervention
- Any event that threatens health or safety

### Reporting Procedures and Timelines

**Immediate Steps:**
1. Ensure the individual's immediate safety and well-being
2. Notify your supervisor without delay
3. Complete the required reporting forms
4. Follow agency-specific reporting chains

**Documentation Requirements:**
- Record the incident as soon as possible
- Include exact times, locations, and individuals involved
- Document what happened before, during, and after the incident
- Note any injuries, property damage, or other outcomes
- Record all notifications made and responses received
- Document follow-up actions and preventive measures

## Data Collection for Goals and Progress

### Tracking Progress on Individual Service Plans

**Target Behaviors and Skills:**
- Clearly identify which goal you're documenting
- Use the specific measurement criteria established in the plan
- Record both attempts and achievements

**Consistency in Data Collection:**
- Use standardized forms and methods
- Collect data at scheduled intervals
- Ensure all staff use the same criteria for measurement

**Analysis and Application:**
- Look for patterns and trends in the data
- Use data to make informed decisions about supports
- Share progress with the individual in an accessible way

### Connecting Documentation to Service Planning

**How Your Notes Impact Care:**
- Provides evidence for continuing, modifying, or discontinuing services
- Informs the development of new goals
- Helps identify needed resources or changes in approach
- Demonstrates the effectiveness of interventions

## Electronic Documentation Systems

### Best Practices for Digital Record-Keeping

- Protect confidentiality with proper login/logout procedures
- Never share passwords or access credentials
- Be aware of what information is visible on your screen in public
- Follow all agency policies for electronic documentation
- Know how to report technical issues or security concerns
  `,
  questions: [
    {
      id: 'doc-q1',
      question: 'When writing documentation, you should:',
      options: [
        'Use subjective opinions to describe behaviors',
        'Use objective, factual language',
        'Wait until the end of the week to complete all notes',
        'Only document unusual incidents'
      ],
      correctAnswer: 1,
      explanation: 'Documentation should use objective, factual language that describes what happened without personal opinions or judgments.'
    },
    {
      id: 'doc-q2',
      question: 'Which of the following is an example of objective documentation?',
      options: [
        'John was in a bad mood all day',
        'John seemed agitated by the schedule change',
        'John stated he was upset and declined breakfast at 8:15 AM',
        'John was difficult during the morning routine'
      ],
      correctAnswer: 2,
      explanation: 'Objective documentation includes specific observations and facts (what was said, actions taken, time) rather than interpretations or judgments about mood or behavior.'
    },
    {
      id: 'doc-q3',
      question: 'What should you do if you make an error in your documentation?',
      options: [
        'Erase the error completely so no one can see it',
        'Use correction fluid to cover the error, then write the correction',
        'Cross out with a single line, initial, date, and write the correct information',
        'Start a completely new document and destroy the one with errors'
      ],
      correctAnswer: 2,
      explanation: 'The proper way to correct documentation errors is to draw a single line through the error (so it remains legible), initial and date the correction, and then add the accurate information. This maintains the integrity of the record.'
    },
    {
      id: 'doc-q4',
      question: 'When documenting progress on goals, what is most important to include?',
      options: [
        'Only successful attempts at the goal',
        'Your personal assessment of whether the goal is appropriate',
        'Specific, measurable data about performance and progress',
        'Comparisons to how other individuals perform similar tasks'
      ],
      correctAnswer: 2,
      explanation: 'Effective goal documentation includes specific, measurable data about both attempts and achievements. This provides an accurate picture of progress and helps determine if strategies are working or need adjustment.'
    }
  ],
  interactiveScenario: {
    title: 'Documentation Dilemma',
    description: 'Practice making appropriate documentation decisions in a challenging situation',
    type: 'multiple-choice',
    content: 'You arrive for your shift and notice that the previous DSP did not complete their documentation for medication administration that occurred 2 hours ago. You know who received what medication because you observed it, but you weren\'t the one who administered it. What is the most appropriate action?',
    options: [
      {
        id: 'opt1',
        text: "Complete the documentation yourself since you observed what happened, and sign with your own name.",
        isCorrect: false,
        feedback: 'While you\'re trying to ensure documentation is complete, you cannot document actions you didn\'t perform. This could create legal and ethical issues, as documentation must be completed by the person who performed the action.'
      },
      {
        id: 'opt2',
        text: "Complete the documentation but sign it with the previous DSP's name since they did the task.",
        isCorrect: false,
        feedback: 'This is falsification of records and potentially fraud. Never sign documentation with someone else\'s name, regardless of the circumstances.'
      },
      {
        id: 'opt3',
        text: "Contact your supervisor immediately to report the missing documentation and ask for guidance.",
        isCorrect: true,
        feedback: 'This is the appropriate response. Missing medication documentation is a serious issue that should be addressed through proper channels. Your supervisor may have protocols for handling this situation, such as contacting the previous DSP or completing an incident report.'
      },
      {
        id: 'opt4',
        text: "Leave the documentation blank since it wasn't your responsibility.",
        isCorrect: false,
        feedback: 'While you shouldn\'t document actions you didn\'t perform, ignoring missing documentation, especially for medications, creates serious health and compliance risks. Always report documentation gaps to your supervisor.'
      }
    ]
  },
  flashcards: [
    {
      id: 'doc-fc1',
      term: 'Objective Documentation',
      definition: 'A style of recording that focuses on observable facts, specific behaviors, and direct quotes rather than interpretations or judgments. Example: "Sam completed 3 out of 5 steps independently" rather than "Sam did well."'
    },
    {
      id: 'doc-fc2',
      term: 'Special Incident Report (SIR)',
      definition: 'A formal document that records unusual events or occurrences that affect health, safety, or well-being. Must be completed within specific timeframes and include detailed information about what happened before, during, and after the incident.'
    },
    {
      id: 'doc-fc3',
      term: 'SOAP Notes',
      definition: 'A documentation method that includes Subjective information (what the person reports), Objective observations (what you observe), Assessment (analysis of the situation), and Plan (next steps). Provides a structured approach to comprehensive documentation.'
    },
    {
      id: 'doc-fc4',
      term: 'Progress Notes',
      definition: 'Ongoing documentation that tracks an individual\'s advancement toward specific goals outlined in their service plan. Should include measurable data, specific interventions used, and the person\'s response to supports provided.'
    }
  ],
  faqs: [
    {
      question: "How detailed should my daily documentation be?",
      answer: "Your documentation should be comprehensive enough to give someone who wasn't present a clear picture of what happened, but concise enough to be practical. Include the who, what, when, where, and how of significant interactions and supports provided. Focus on information that would be relevant for other team members to know or that demonstrates progress toward goals. Remember that your documentation may be read by the individual, family members, supervisors, auditors, and potentially legal authorities."
    },
    {
      question: "What should I do if I notice a pattern in behavior that isn't currently documented in someone's plan?",
      answer: "First, ensure you're documenting the observed pattern objectively with specific examples. Then, communicate your observations to your supervisor or during a team meeting. This information might indicate a need to reassess the person's plan or develop new strategies. Your careful documentation of patterns can lead to important adjustments in support approaches that better meet the individual's needs."
    },
    {
      question: "How do I document sensitive information or topics that might be uncomfortable for the individual if they read their file?",
      answer: "All information should be documented with dignity and respect, regardless of its sensitive nature. Use clinical, objective language rather than judgmental terms. Focus on describing behaviors and facts, not personal interpretations. Remember that individuals have the right to access their records, so write as if the person might read it. If you're concerned about a particularly sensitive issue, consult with your supervisor about proper documentation protocols, but never omit important information."
    }
  ]
};
