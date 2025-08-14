import { Course } from '../courseTypes';

export const specialIncidentReportingScenarios: Course = {
  id: 'special-incident-reporting-scenarios',
  title: 'Interactive Special Incident Reporting Scenarios',
  description: 'Hands-on learning exercises for staff development in identifying, documenting, and responding to various incident types through realistic scenarios.',
  category: 'Safety & Compliance',
  instructor: 'Steven Bouldin, SHRM-CP',
  thumbnail: '/Images/sir.png',
  duration: '60 min',
  certificateAvailable: true,
  modules: [
    {
      id: 'mod-1',
      title: 'Introduction to Incident Reporting Scenarios',
      description: 'Learn how to navigate these interactive scenarios and understand their importance in staff development.',
      content: `# Interactive Special Incident Reporting Scenarios

## How to Use These Interactive Scenarios

These scenarios are designed to help staff practice applying incident reporting knowledge in realistic situations. Each scenario includes multiple decision points where you'll need to think critically and choose appropriate responses.

### Learning Objectives:
- Practice identifying reportable incidents
- Develop critical thinking for incident response
- Understand the consequences of different approaches
- Learn proper documentation techniques
- Apply knowledge of regulations and best practices

### Navigation:
- Read each scenario carefully
- Select the response you think is most appropriate
- Review the feedback for each choice
- Consider how different approaches affect outcomes
- Take notes on key learning points

These scenarios provide a safe environment to make decisions and learn from the outcomes without real-world consequences.`,
      learningObjectives: [
        'Understand the purpose and structure of the interactive scenarios',
        'Navigate scenario-based learning effectively',
        'Apply critical thinking to incident reporting situations'
      ],
      questions: []
    },
    {
      id: 'mod-2',
      title: 'Scenario 1: The Unexpected Fall',
      description: 'Practice responding to and documenting a fall incident with someone with CP.',
      content: `# Scenario 1: The Unexpected Fall

## Setting the Scene

You are working the afternoon shift at a consumer's home. It's 3:30 PM on a Tuesday, and you're in the common area helping consumers with afternoon activities. Consumer Patricia, who is 67 years old and has mild intellectual disabilities, is sitting in her usual chair working on a puzzle. Patricia uses a walker for mobility but can stand and walk short distances independently.

You notice Patricia getting up from her chair, presumably to use the restroom as she often does around this time. As you're helping another consumer with their craft project, you hear a loud thud and someone crying out. When you turn around, you see Patricia on the floor next to her chair, holding her left wrist and saying "Ow, ow, it really hurts!"

### Decision Point 1: Immediate Response

**Question:** What should be your first priority in this situation?`,
      learningObjectives: [
        'Demonstrate appropriate first response to a fall incident',
        'Identify potential injuries and necessary medical responses',
        'Document incident details accurately',
        'Follow proper reporting procedures for falls'
      ],
      questions: [
        {
          id: 'q1-mod2',
          question: 'What should be your first priority when you see Patricia on the floor?',
          options: [
            'A) Immediately help Patricia get back into her chair so she\'ll be more comfortable.',
            'B) Stay where you are and call for the nurse to come assess Patricia.',
            'C) Approach Patricia calmly, tell her not to move, and quickly assess whether she appears to have any serious injuries.',
            'D) Document exactly what you observed before your memory fades.'
          ],
          correctAnswer: 2, // Index 2 is Option C
          explanation: 'Approaching Patricia calmly and assessing for injuries before moving her is the safest approach. Moving someone who has fallen without assessing for injuries first could potentially worsen any fractures or spinal injuries.'
        }
      ],
      interactiveScenario: {
        title: 'Responding to a Fall Incident',
        description: 'Practice making decisions in response to a consumer fall.',
        type: 'multiple-choice',
        content: {
          scenarios: [
            {
              id: 'fall-scenario-1',
              title: 'Initial Response to Fall',
              description: 'You see Patricia on the floor holding her wrist. What do you do first?',
              options: [
                { 
                  id: 'option-1',
                  text: 'Help her up immediately',
                  isCorrect: false,
                  feedback: 'This could be dangerous. Moving someone who has fallen before assessing for injuries might worsen potential fractures or spinal injuries.'
                },
                { 
                  id: 'option-2',
                  text: 'Call for the nurse while staying put',
                  isCorrect: false,
                  feedback: 'While getting medical help is important, you should first approach Patricia to ensure her immediate safety and provide reassurance.'
                },
                { 
                  id: 'option-3',
                  text: 'Approach calmly and assess for injuries',
                  isCorrect: true,
                  feedback: 'Correct! This is the safest approach. You can provide reassurance while checking for injuries before moving her.'
                },
                { 
                  id: 'option-4',
                  text: 'Start documenting what happened',
                  isCorrect: false,
                  feedback: 'Documentation is important, but Patricia\'s immediate safety and medical needs should be addressed first.'
                }
              ]
            },
            {
              id: 'fall-scenario-2',
              title: 'Assessing the Situation',
              description: 'You approach Patricia and notice her left leg is at an unusual angle. She says her wrist hurts and she feels dizzy. What should you do next?',
              options: [
                {
                  id: 'option-5',
                  text: 'Help her stand up to assess if she can walk',
                  isCorrect: false,
                  feedback: 'Moving her could worsen potential injuries. You should keep her still and call for medical assistance.'
                },
                {
                  id: 'option-6',
                  text: 'Call 911 immediately due to possible fractures and head injury',
                  isCorrect: false,
                  feedback: 'While this might be necessary, you should first notify your supervisor and follow facility protocols for medical emergencies.'
                },
                {
                  id: 'option-7',
                  text: 'Call for your supervisor and the facility nurse to assess the situation',
                  isCorrect: true,
                  feedback: 'Correct! Following your facility\'s protocol ensures proper assessment and documentation of the incident.'
                },
                {
                  id: 'option-8',
                  text: 'Ask other consumers what happened while you wait',
                  isCorrect: false,
                  feedback: 'Your priority should be Patricia\'s immediate medical needs and following proper reporting procedures.'
                }
              ]
            },
            {
              id: 'fall-scenario-3',
              title: 'Documenting the Incident',
              description: 'After ensuring Patricia receives medical attention, what information is most important to document?',
              options: [
                {
                  id: 'option-9',
                  text: 'Only the facts you personally observed',
                  isCorrect: false,
                  feedback: 'While objective facts are crucial, you should also document what Patricia and any witnesses reported.'
                },
                {
                  id: 'option-10',
                  text: 'Your opinion about why the fall occurred',
                  isCorrect: false,
                  feedback: 'Documentation should be factual, not speculative. Stick to observations and reports.'
                },
                {
                  id: 'option-11',
                  text: 'The time, location, what happened, and actions taken',
                  isCorrect: true,
                  feedback: 'Correct! Documentation should include the who, what, when, where, and actions taken.'
                },
                {
                  id: 'option-12',
                  text: 'Only information relevant to Patricia\'s medical condition',
                  isCorrect: false,
                  feedback: 'While medical information is important, you should document all aspects of the incident.'
                }
              ]
            },
            {
              id: 'financial-scenario-1',
              title: 'Suspected Financial Exploitation',
              description: 'Mrs. Chen reports that her son David has been asking for money frequently and mentions a new friend "Jake" who is "helping" with his finances. What should you do first?',
              options: [
                {
                  id: 'option-13',
                  text: 'Tell Mrs. Chen that David is an adult and can manage his own money',
                  isCorrect: false,
                  feedback: 'While David has rights, potential financial exploitation of someone with disabilities requires investigation.'
                },
                {
                  id: 'option-14',
                  text: 'Report your concerns to Adult Protective Services immediately',
                  isCorrect: false,
                  feedback: 'While reporting may be necessary, you should first gather more information through proper channels.'
                },
                {
                  id: 'option-15',
                  text: 'Document Mrs. Chen\'s concerns and begin an investigation',
                  isCorrect: true,
                  feedback: 'Correct! Documenting concerns and investigating through proper channels is the appropriate first step.'
                },
                {
                  id: 'option-16',
                  text: 'Confront David about the missing money',
                  isCorrect: false,
                  feedback: 'Direct confrontation could be counterproductive and might alert any potential exploiters.'
                }
              ]
            },
            {
              id: 'behavioral-scenario-1',
              title: 'Inappropriate Behavior Between Consumers',
              description: 'You overhear Tony, an adult consumer, making inappropriate comments to Marcus, a minor consumer with autism. What is your immediate priority?',
              options: [
                {
                  id: 'option-17',
                  text: 'Separate the individuals and document the incident',
                  isCorrect: true,
                  feedback: 'Correct! Ensuring immediate safety and proper documentation are top priorities.'
                },
                {
                  id: 'option-18',
                  text: 'Report the incident to Child Protective Services',
                  isCorrect: false,
                  feedback: 'While this may be necessary, your first action should be to ensure immediate safety and document the incident.'
                },
                {
                  id: 'option-19',
                  text: 'Ask other staff members if they\'ve noticed anything unusual',
                  isCorrect: false,
                  feedback: 'While gathering information is important, you should first address the immediate situation.'
                },
                {
                  id: 'option-20',
                  text: 'Ignore it since no physical contact occurred',
                  isCorrect: false,
                  feedback: 'Inappropriate comments can be a form of grooming behavior and should never be ignored.'
                }
              ]
            },
            {
              id: 'medication-scenario-1',
              title: 'Medication Discrepancy',
              description: 'While reviewing medication records, you notice that more insulin pens are present than should be if all doses were administered. What should you do?',
              options: [
                {
                  id: 'option-21',
                  text: 'Assume it\'s a documentation error and correct the records',
                  isCorrect: false,
                  feedback: 'Never assume the nature of a medication discrepancy. Always investigate thoroughly.'
                },
                {
                  id: 'option-22',
                  text: 'Report the discrepancy to your supervisor and document your findings',
                  isCorrect: true,
                  feedback: 'Correct! All medication discrepancies should be reported and documented following facility protocols.'
                },
                {
                  id: 'option-23',
                  text: 'Ask the consumer if they remember taking their medication',
                  isCorrect: false,
                  feedback: 'While this might provide some information, you should follow formal procedures for medication discrepancies.'
                },
                {
                  id: 'option-24',
                  text: 'Wait to see if the pattern continues before taking action',
                  isCorrect: false,
                  feedback: 'Medication errors can have serious consequences and should be addressed immediately.'
                }
              ]
            }
          ]
        }
      }
    },
    // Additional scenarios would be added as separate modules
    {
      id: 'mod-3',
      title: 'Scenario 2: The Missing Money Mystery',
      description: 'Investigate potential financial exploitation of a consumer.',
      content: `# Scenario 2: The Missing Money Mystery

## Setting the Scene

You work as a case manager at your agency, and you receive a concerning phone call from Mrs. Chen, whose adult son David receives services from your program. Mrs. Chen explains that David, who has mild intellectual disabilities, has been asking her for money more frequently over the past month.

David typically receives his SSI check and manages his money with support from staff. He usually has enough for his personal needs and some recreational activities. However, Mrs. Chen says David has called her three times in the past two weeks asking for money for "emergencies" - once for food, once because he said his wallet was stolen, and once because he needed to help a friend.

When Mrs. Chen asked David about his regular money, he became vague and said his new friend Jake was helping him learn about money. Mrs. Chen is worried that someone might be taking advantage of David's trusting nature and limited understanding of financial management.`,
      learningObjectives: [
        'Recognize signs of potential financial exploitation',
        'Follow proper procedures for investigating financial concerns',
        'Document and report suspected financial abuse',
        'Balance consumer rights with protective measures'
      ],
      questions: [
        {
          id: 'q1-mod3',
          question: 'How should you respond to Mrs. Chen\'s concerns?',
          options: [
            'A) Tell Mrs. Chen that David is an adult and has the right to make his own financial decisions, even if they seem unwise.',
            'B) Reassure Mrs. Chen that David\'s support staff monitor his finances and would notice if there were any problems.',
            'C) Take detailed notes about Mrs. Chen\'s concerns and explain that you\'ll investigate the situation to ensure David\'s financial safety.',
            'D) Suggest that Mrs. Chen talk directly to David about being more careful with his money.'
          ],
          correctAnswer: 2, // Index 2 is Option C
          explanation: 'Taking detailed notes and committing to investigate shows you take the concerns seriously while following proper procedures.'
        }
      ]
    },
    {
      id: 'mod-4',
      title: 'Scenario 3: The Playground Incident',
      description: 'Address potentially inappropriate behavior between consumers.',
      content: `# Scenario 3: The Playground Incident

## Setting the Scene

You work at a day program that serves both adults and adolescents with developmental disabilities. It's a beautiful Friday afternoon, and you're supervising outdoor activities at the adjacent playground. Several consumers are enjoying the playground equipment while you and another staff member, Jennifer, provide supervision.

Marcus, who is 16 years old and has autism, loves the swings and has been swinging happily for about 10 minutes. Tony, a 28-year-old consumer with mild intellectual disabilities, approaches Marcus and offers to push him higher on the swing. Marcus doesn't respond verbally but doesn't move away, which his family has told you often indicates consent for Marcus.

As Tony begins pushing Marcus on the swing, he starts making comments like "You're such a good-looking kid" and "I bet the girls really like you." Jennifer, who is closer to the swing set, overhears Tony say "You should come to my apartment sometime. I could teach you some things the staff here don't know about."`,
      learningObjectives: [
        'Identify potentially inappropriate interactions between consumers',
        'Respond appropriately to protect vulnerable individuals',
        'Document and report concerning behaviors',
        'Follow child protection protocols'
      ],
      questions: [
        {
          id: 'q1-mod4',
          question: 'What should be your immediate priority in this situation?',
          options: [
            'A) Continue observing Tony and Marcus discreetly to see if any other inappropriate interactions occur.',
            'B) Separate Tony and Marcus immediately and document the concerning statements you\'ve been told about.',
            'C) Talk to Tony directly about appropriate ways to interact with younger consumers.',
            'D) Ask Marcus if Tony said anything that made him uncomfortable.'
          ],
          correctAnswer: 1, // Index 1 is Option B
          explanation: 'Immediate separation is crucial when there are concerns about potential grooming behavior or inappropriate interactions involving a minor.'
        }
      ]
    },
    {
      id: 'mod-5',
      title: 'Scenario 4: The Medication Mix-Up Discovery',
      description: 'Address discrepancies in medication administration records.',
      content: `# Scenario 4: The Medication Mix-Up Discovery

## Setting the Scene

It's Monday morning at 9 AM, and you're the supervisor on duty at a consumer's home. Nurse Kelly approaches you with a concerning discovery she made during her morning medication review. While reconciling the weekend medication administration records, she noticed some discrepancies that don't make sense.

Consumer Janet, who has diabetes and takes insulin twice daily, has medication administration records showing she received her evening insulin on Friday and Saturday nights. However, when Kelly checked the insulin supply, there are more insulin pens remaining than there should be if Janet actually received her weekend doses.

Additionally, Consumer Robert, who takes seizure medication three times daily, has records showing he received all his weekend doses, but Kelly found his Saturday evening dose still in the medication packaging, untouched.`,
      learningObjectives: [
        'Identify medication administration discrepancies',
        'Follow proper procedures for investigating potential medication errors',
        'Document and report medication errors appropriately',
        'Implement corrective actions to prevent future errors'
      ],
      interactiveScenario: {
        title: 'Medication Safety Scenarios',
        description: 'Practice handling various medication-related situations that may arise in supportive care settings.',
        type: 'multiple-choice',
        content: {
          scenarios: [
            {
              id: 'med-scenario-1',
              title: 'Medication Discrepancy Discovery',
              description: 'While reviewing medication records, you notice that Janet\'s insulin supply doesn\'t match the administration records. The weekend staff report they followed all procedures correctly. Robert\'s seizure medication was also found untouched despite being signed as administered. The staff member involved is usually very reliable. How should you proceed?',
              options: [
                {
                  id: 'med-option-1',
                  text: 'Assume it\'s a documentation error and have the staff correct the records.',
                  isCorrect: false,
                  feedback: 'This could be a serious medication error. Never assume it\'s just a documentation issue without proper investigation.'
                },
                {
                  id: 'med-option-2',
                  text: 'Conduct a full medication audit, including checking security footage and interviewing all staff involved, while ensuring consumers receive proper medical evaluation.',
                  isCorrect: true,
                  feedback: 'Correct! A comprehensive approach is needed to address potential medication diversion while ensuring consumer safety.'
                },
                {
                  id: 'med-option-3',
                  text: 'Report the staff member to the state licensing board immediately.',
                  isCorrect: false,
                  feedback: 'While this might be necessary eventually, you need to complete a thorough investigation first to determine what actually happened.'
                },
                {
                  id: 'med-option-4',
                  text: 'Document the discrepancies and implement a new medication counting procedure starting tomorrow.',
                  isCorrect: false,
                  feedback: 'This doesn\'t address the immediate concern about potential medication errors or diversion that may have already occurred.'
                }
              ]
            },
            {
              id: 'med-scenario-2',
              title: 'Complex Medication Refusal',
              description: 'Michael, who has schizophrenia, has been refusing his antipsychotic medication for three days, saying it makes him feel like a \"zombie.\" His symptoms are worsening, and he\'s becoming increasingly paranoid, though not yet a danger to himself or others. His healthcare proxy documents indicate he has the right to refuse treatment, but his sister (his legal guardian) is adamant he must take the medication. How should you proceed?',
              options: [
                {
                  id: 'refusal-option-1',
                  text: 'Respect Michael\'s right to refuse while documenting the situation and consulting with the treatment team about alternative medications or approaches.',
                  isCorrect: true,
                  feedback: 'Correct! This approach respects Michael\'s autonomy while seeking solutions that address both his concerns and his treatment needs.'
                },
                {
                  id: 'refusal-option-2',
                  text: 'Follow the sister\'s instructions since she\'s the legal guardian, and find a way to administer the medication.',
                  isCorrect: false,
                  feedback: 'While the guardian\'s input is important, Michael\'s current capacity and rights must be considered. This could be a violation of his rights if he has the capacity to refuse.'
                },
                {
                  id: 'refusal-option-3',
                  text: 'Call for an emergency psychiatric evaluation since his condition is deteriorating.',
                  isCorrect: false,
                  feedback: 'This might be premature unless he meets criteria for emergency evaluation (imminent danger to self/others or gravely disabled). His current symptoms don\'t clearly indicate this yet.'
                },
                {
                  id: 'refusal-option-4',
                  text: 'Document the refusal and wait to see if he changes his mind in a few days.',
                  isCorrect: false,
                  feedback: 'While documentation is important, this passive approach doesn\'t address the deteriorating situation or seek solutions.'
                }
              ]
            },
            {
              id: 'med-scenario-3',
              title: 'Complex Adverse Reaction',
              description: 'Sarah, who has multiple chronic conditions, started a new blood pressure medication three days ago. This morning, she seems unusually drowsy and confused. Her blood pressure is 88/54 (her baseline is usually around 130/80), and her heart rate is 105 bpm. She takes 8 different medications in the morning, including the new one. What\'s your most appropriate first action?',
              options: [
                {
                  id: 'reaction-option-1',
                  text: 'Withhold her morning medications and contact the prescribing physician immediately with her vital signs and symptoms.',
                  isCorrect: true,
                  feedback: 'Correct! Her symptoms and vital signs suggest possible hypotension from the new medication. Withholding further doses and consulting the physician is the safest approach.'
                },
                {
                  id: 'reaction-option-2',
                  text: 'Give her a cup of coffee and have her sit up to see if her blood pressure improves.',
                  isCorrect: false,
                  feedback: 'While caffeine might slightly raise blood pressure, her symptoms warrant medical evaluation. This doesn\'t address the potential medication reaction.'
                },
                {
                  id: 'reaction-option-3',
                  text: 'Administer her other medications but hold the new blood pressure medication.',
                  isCorrect: false,
                  feedback: 'Some of her other medications might interact with or exacerbate the hypotensive effects. It\'s safer to hold all medications until consulting with a healthcare provider.'
                },
                {
                  id: 'reaction-option-4',
                  text: 'Document the symptoms and monitor her condition throughout your shift.',
                  isCorrect: false,
                  feedback: 'Her symptoms and vital signs indicate a potentially serious reaction that requires immediate medical attention, not just monitoring.'
                }
              ]
            },
            {
              id: 'med-scenario-4',
              title: 'Medication Security Breach',
              description: 'You discover that the controlled substance cabinet was left unlocked overnight. The last person to access it was a new staff member who left early yesterday due to illness. During your initial check, you notice that two oxycodone tablets are missing from the count. The staff member in question has worked for the agency for three weeks with no prior issues. What\'s your most appropriate course of action?',
              options: [
                {
                  id: 'storage-option-1',
                  text: 'Secure the cabinet, document the discrepancy, and follow agency protocol for controlled substance discrepancies, which includes notifying the supervisor and potentially law enforcement.',
                  isCorrect: true,
                  feedback: 'Correct! This follows proper protocol for controlled substance discrepancies, which typically requires reporting to both internal authorities and potentially external agencies.'
                },
                {
                  id: 'storage-option-2',
                  text: 'Confront the new staff member about the discrepancy when they return to work.',
                  isCorrect: false,
                  feedback: 'This could be seen as an accusation and may compromise any potential investigation. It\'s better to follow formal reporting procedures.'
                },
                {
                  id: 'storage-option-3',
                  text: 'Document the incident internally but don\'t report it to avoid getting the new staff member in trouble.',
                  isCorrect: false,
                  feedback: 'This is a serious violation of controlled substance regulations. Failing to properly report could have legal and licensing implications for the agency.'
                },
                {
                  id: 'storage-option-4',
                  text: 'Wait to see if the count is off again tomorrow before taking any action.',
                  isCorrect: false,
                  feedback: 'This delays necessary reporting and could allow a potential diversion to continue. Immediate action is required for controlled substance discrepancies.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'mod-6',
      title: 'Conclusion and Key Takeaways',
      description: 'Review key learning points and next steps for applying knowledge.',
      content: `# Conclusion and Key Takeaways

## What We've Covered

Throughout these interactive scenarios, you've had the opportunity to practice responding to various types of incidents that may occur in supportive living and care settings. Each scenario was designed to help you develop critical thinking skills and apply proper procedures in realistic situations.

### Key Learning Points:

1. **Immediate Response is Critical**
   - Always prioritize safety and well-being first
   - Follow established protocols for different types of incidents
   - Document thoroughly and accurately

2. **Recognizing Signs of Abuse and Exploitation**
   - Be alert to behavioral changes in consumers
   - Understand the different forms of abuse (physical, emotional, financial, etc.)
   - Know when and how to report concerns

3. **Medication Safety**
   - Double-check all medication administration
   - Report discrepancies immediately
   - Follow up to ensure proper medical care when needed

4. **Documentation Best Practices**
   - Be objective and factual
   - Include all relevant details
   - Complete reports in a timely manner

## Next Steps

1. Review your organization's specific policies and procedures related to incident reporting
2. Practice documentation using your facility's forms and systems
3. Participate in regular training updates to stay current with best practices
4. Share your knowledge with colleagues to promote a culture of safety and accountability

## Additional Resources

- [Your Organization's Incident Reporting Policy]
- [State-Specific Reporting Requirements]
- [Training on Recognizing and Reporting Abuse]
- [Medication Administration Guidelines]`,
      learningObjectives: [
        'Summarize key learning points from the scenarios',
        'Identify next steps for applying knowledge in practice',
        'Locate additional resources for ongoing learning',
        'Understand the importance of continuous improvement in incident reporting'
      ],
      questions: []
    }
  ]
};

// This course provides interactive scenarios for staff to practice incident reporting
// Each scenario includes decision points with feedback to reinforce learning
// The structure allows for easy addition of more scenarios in the future
