
import { Module } from '../../../courseTypes';

export const emergencyModule: Module = {
  id: 'emergency-response',
  title: 'Emergency Response and Crisis Management',
  description: 'Learn how to effectively prepare for and respond to emergencies when supporting individuals with developmental disabilities.',
  content: `
# Emergency Response and Crisis Management

## Prevention and Preparedness

Prevention is always preferable to emergency response. As a DSP, you play a critical role in identifying potential hazards and taking steps to prevent emergencies before they occur.

### Environmental Safety Assessment:
- **Regular safety checks**: Monitor for tripping hazards, unsafe equipment, or potential fire risks
- **Accessibility considerations**: Ensure emergency exits are accessible for all individuals
- **Emergency supplies**: Know the location of first aid kits, emergency medications, AEDs, and other emergency equipment
- **Emergency contact information**: Keep updated contact information readily available

### Personal Emergency Preparedness:
- **Know each individual's needs**: Understand specific vulnerabilities, mobility issues, or communication challenges that may affect emergency response
- **Individual emergency plans**: Be familiar with person-specific protocols for various emergency situations
- **Communication systems**: Have backup communication methods for individuals who use AAC or require communication support
- **Medication management**: Ensure emergency medications are accessible and properly stored

### Practice and Training:
- Participate regularly in emergency drills
- Keep certifications current (CPR, First Aid, etc.)
- Know your agency's emergency procedures
- Review emergency plans after any incidents to identify improvements

## De-Escalation Techniques

Behavioral crises can arise suddenly and require immediate, skilled intervention to prevent harm and restore calm.

### Understanding Escalation:
- **Common triggers**: Sensory overload, changes in routine, frustration, medical issues, anxiety
- **Warning signs**: Increased pacing, vocal volume changes, physical tension, withdrawal, property disruption
- **Escalation cycle**: Recognize the stages from calm to crisis and recovery

### Proactive De-Escalation Strategies:
- **Environmental management**: Reduce stimulation, provide space, remove potential hazards
- **Communication techniques**: Use clear, calm, and simple language
- **Body language**: Maintain a non-threatening stance, appropriate distance, and calm demeanor
- **Offering choices**: Provide options that give the person some control over the situation
- **Redirection**: Shift focus to preferred activities or topics when appropriate

### During a Crisis:
- **Safety first**: Protect the individual and others from harm
- **Stay calm**: Model regulated behavior through your own responses
- **Avoid power struggles**: Focus on de-escalation rather than control
- **Use approved interventions**: Follow behavior support plans and agency protocols
- **Get help when needed**: Know when to call for additional support

### After a Crisis:
- **Debriefing**: Review what happened with appropriate team members
- **Documentation**: Record the incident according to agency requirements
- **Support**: Offer emotional support to the individual and process the experience
- **Prevention planning**: Identify strategies to prevent similar situations in the future

## Responding to Medical Emergencies

Individuals with developmental disabilities may be at higher risk for certain medical emergencies. Your prompt, appropriate response can save lives.

### Seizure Response:
- **Types of seizures**: Recognize different seizure presentations
- **Seizure first aid**: Ensure safety, time the seizure, position the person safely, don't restrict movement
- **When to call 911**: For first-time seizures, seizures lasting over 5 minutes, repeated seizures, or injury during seizure
- **Documentation**: Record seizure activity, duration, and recovery observations

### Choking Response:
- **Prevention**: Proper food preparation, supervision during meals when needed
- **Recognition**: Understand the difference between choking and coughing
- **Intervention**: Know how to perform the Heimlich maneuver or appropriate alternative
- **Adaptations**: Be aware of modifications needed for individuals with physical differences

### Fall Prevention and Response:
- **Prevention strategies**: Environmental modifications, proper transfer techniques
- **Assessment after falls**: Check for injuries, note any loss of consciousness
- **Documentation**: Record circumstances, injuries, and response
- **Follow-up**: Communicate with healthcare providers about falls

### Medical Emergency Protocol:
1. Assess the situation quickly
2. Call for help (911) when appropriate
3. Provide necessary first aid until help arrives
4. Stay with the person and keep them comfortable
5. Have medical information ready for emergency responders
6. Notify appropriate supervisors and family members
7. Document the incident thoroughly

## Abuse/Neglect Identification and Mandated Reporting

As a DSP, you are a mandated reporter with a legal and ethical obligation to protect vulnerable individuals from harm.

### Types of Abuse and Neglect:
- **Physical abuse**: Unexplained injuries, burns, bruises in unusual places
- **Sexual abuse**: Unexplained genital injuries, inappropriate sexual behavior, fear of specific people
- **Emotional abuse**: Withdrawal, fear, anxiety, unusual behavioral changes
- **Financial exploitation**: Missing money or belongings, unexpected changes to financial documents
- **Neglect**: Poor hygiene, malnutrition, untreated medical conditions, unsafe living conditions
- **Self-neglect**: Inability or unwillingness to meet basic needs when capable of self-care

### Warning Signs:
- **Physical indicators**: Injuries in various stages of healing, unexplained weight loss, poor hygiene
- **Behavioral indicators**: Fear, withdrawal, aggression, sleep disturbances, regression
- **Environmental indicators**: Unsafe or unsanitary living conditions, lack of necessary adaptive equipment
- **Caregiver indicators**: Preventing access to the individual, providing inconsistent explanations, showing indifference

### Reporting Process:
1. **When to report**: Immediately upon suspicion (you don't need proof)
2. **How to report**: Follow your state and agency-specific reporting procedures
3. **What to report**: All relevant details about your observations and concerns
4. **Confidentiality**: Understand your protections as a reporter
5. **Follow-up**: Continue to monitor and report new concerns

### Your Role After Reporting:
- Continue to provide support to the individual
- Maintain confidentiality about the report
- Cooperate with investigations
- Document ongoing observations
- Implement any protective measures required
  `,
  questions: [
    {
      id: 'emerg-q1',
      question: 'During a de-escalation situation, you should:',
      options: [
        'Raise your voice to establish control',
        'Keep your body language calm and non-threatening',
        'Bring in as many staff as possible to help',
        'Tell the person to calm down immediately'
      ],
      correctAnswer: 1,
      explanation: 'During de-escalation, keeping your body language calm and non-threatening is important to avoid further agitating the person.'
    },
    {
      id: 'emerg-q2',
      question: 'Which of the following is NOT an appropriate first step when responding to a seizure?',
      options: [
        'Moving hazardous objects away from the person',
        'Timing how long the seizure lasts',
        'Placing something soft under the person\'s head',
        'Trying to hold the person still to prevent injury'
      ],
      correctAnswer: 3,
      explanation: 'You should never try to restrain someone or hold them still during a seizure, as this could cause injury. Instead, focus on making the environment safe by removing hazardous objects, timing the seizure, and placing something soft under their head if possible.'
    },
    {
      id: 'emerg-q3',
      question: 'As a mandated reporter, you must report suspected abuse or neglect:',
      options: [
        'Only if you have definitive proof',
        'After discussing your concerns with the suspected abuser',
        'Immediately upon reasonable suspicion',
        'Within one week of observation'
      ],
      correctAnswer: 2,
      explanation: 'Mandated reporters must report suspected abuse or neglect immediately upon having reasonable suspicion. You do not need to have proof, and waiting to report or discussing concerns with a suspected abuser could put the individual at further risk.'
    },
    {
      id: 'emerg-q4',
      question: 'Which of the following is most important to have readily available during a medical emergency?',
      options: [
        'The individual\'s behavior support plan',
        'The agency\'s employee handbook',
        'The individual\'s medical information and emergency contacts',
        'Your supervisor\'s personal cell phone number'
      ],
      correctAnswer: 2,
      explanation: 'During a medical emergency, having the individual\'s medical information (including conditions, medications, allergies) and emergency contacts readily available is critical for ensuring proper medical care and prompt notification of appropriate parties.'
    }
  ],
  interactiveScenario: {
    title: 'Crisis Response Decision Making',
    description: 'Practice making appropriate decisions during a behavioral crisis',
    type: 'multiple-choice',
    content: 'You are supporting Chris, who has autism and sometimes experiences sensory overload in crowded environments. You\'re at a community event when you notice Chris beginning to show signs of distress: covering his ears, rocking back and forth, and breathing rapidly. The signs are escalating and Chris is starting to make loud vocalizations that are drawing attention from others. What is your best first response?',
    options: [
      {
        id: 'opt1',
        text: "Firmly tell Chris to quiet down because people are starting to stare.",
        isCorrect: false,
        feedback: "This approach fails to recognize that Chris is experiencing genuine distress due to sensory overload, not deliberately misbehaving. Drawing attention to others' reactions may increase Chris's anxiety and escalate the situation further."
      },
      {
        id: 'opt2',
        text: "Ask Chris if he wants to move to a quieter area, using simple, direct language while maintaining a calm demeanor.",
        isCorrect: true,
        feedback: "This is the best initial response because it addresses Chris's sensory needs while respecting his autonomy. Using simple language acknowledges his current processing difficulties, and staying calm helps prevent further escalation. Moving to a quieter area can reduce the sensory input that's causing distress."
      },
      {
        id: 'opt3',
        text: "Immediately take Chris's arm and lead him outside without explanation to remove him from the situation.",
        isCorrect: false,
        feedback: "While removing Chris from the overwhelming environment could help, doing so without communication or consent ignores his autonomy and might increase his anxiety or trigger a more significant response. Physical guidance without permission should only be used when safety is at immediate risk."
      },
      {
        id: 'opt4',
        text: "Call for additional staff support immediately before the situation gets worse.",
        isCorrect: false,
        feedback: 'Calling for additional support might eventually be necessary, but it shouldn\'t be the first response when there are no immediate safety concerns. Bringing more people into the situation could actually increase Chris\'s sensory overload and escalate the situation.'
      }
    ]
  },
  flashcards: [
    {
      id: 'emerg-fc1',
      term: 'ABC Approach to Behavior',
      definition: 'A method for understanding behavior that examines: Antecedent (what happened before), Behavior (what the person did), and Consequence (what happened after). This approach helps identify patterns and potential triggers for crisis situations.'
    },
    {
      id: 'emerg-fc2',
      term: 'Status Epilepticus',
      definition: 'A seizure that lasts longer than 5 minutes or when seizures occur close together without recovery between them. This is a medical emergency that requires immediate 911 response, as prolonged seizures can cause brain damage.'
    },
    {
      id: 'emerg-fc3',
      term: 'Universal Precautions',
      definition: 'Safety measures taken to prevent contact with bodily fluids and reduce disease transmission. Includes wearing gloves, proper handwashing, and appropriate disposal of contaminated materials. Critical during medical emergencies or when providing personal care.'
    },
    {
      id: 'emerg-fc4',
      term: 'Positional Asphyxia',
      definition: 'A form of suffocation that occurs when someone\'s position prevents them from breathing adequately. Can happen during improper restraint or when someone is unable to change positions. This is why proper positioning during emergencies is critical.'
    }
  ],
  faqs: [
    {
      question: "How do I know when to call 911 versus handling a situation myself?",
      answer: "Call 911 immediately for: unconsciousness or altered consciousness, difficulty breathing or respiratory distress, chest pain, severe bleeding, seizures lasting over 5 minutes or repeated seizures, severe allergic reactions, head injuries with confusion or vomiting, serious falls, or any situation where you're unsure but concerned about immediate danger to health or life. When in doubt, it's better to call and let emergency professionals assess the situation. While waiting for help to arrive, stay with the person, provide appropriate first aid if you're trained, and gather their medical information for the emergency responders."
    },
    {
      question: "What should I do if someone is having a behavioral crisis in a public place?",
      answer: "First, prioritize safety—move the person away from hazards and create space from onlookers if possible. Use a calm, reassuring voice and simple language. Reduce environmental stimulation by turning down music, dimming lights, or moving to a quieter area if you can. Don't rush the person or make demands. If needed, calmly explain to bystanders that the person needs space. Use the person's behavior support strategies if they have them. If the situation escalates to where there's risk of harm, call for appropriate help. Afterward, document what happened and what seemed to help or worsen the situation."
    },
    {
      question: "If I suspect abuse but I'm not absolutely certain, should I still make a report?",
      answer: "Yes, absolutely. As a mandated reporter, you're required to report suspected abuse or neglect when you have reasonable cause to believe it may have occurred—not only when you have proof. Reports are investigated by trained professionals who determine if abuse has occurred. Your role is to report your observations and concerns, not to investigate or confirm the abuse yourself. Reports can be made confidentially, and mandated reporters generally have legal protections against liability for good-faith reports. Remember that failing to report suspected abuse is a serious violation of your professional responsibility and could result in continued harm to the individual."
    }
  ]
};
