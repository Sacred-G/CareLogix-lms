import { Course } from '../courseTypes';

export const conflictManagementDeEscalation: Course = {
  id: 'conflict-management-de-escalation',
  title: 'Conflict Management & De-Escalation in Supportive Living (California)',
  description: 'This course equips new and experienced supportive living staff with the skills to safely manage client conflict, emotional distress, and challenging behaviors. It emphasizes California standards (Regional Center/DDS) for person-centered care, least-restrictive interventions, and clear reporting procedures. Staff will learn proven de-escalation techniques, how to recognize when to call a supervisor, and strategies for handling upset or argumentative clients while maintaining professionalism. Interactive quizzes and scenarios reinforce learning.',
  category: 'Safety & Crisis Management',
  instructor: 'Steven Bouldin, SHRM-CP',
  thumbnail: '/Images/ConflictManage.png',
  duration: '45 min',
  modules: [
    {
      id: 'mod-1',
      title: 'Foundations of De-Escalation in Supportive Living',
      videoUrl: 'https://youtu.be/IOYhwKH6F-I',
      description: 'De-escalation is about safety and respect. Stay calm, listen, and validate. Use least-restrictive, person-centered approaches as mandated by DDS (e.g. Title 22). Always act calmly; your tone and attitude set the stage for resolution.',
      content: `
# Foundations of De-Escalation in Supportive Living

In supportive living, de-escalation aims to defuse tension and keep clients safe without coercion. California regulations (Title 22 and Title 17 CCR) require that staff use the least restrictive interventions first, emphasizing non-physical techniques. Staff must remain calm, speak in a soft tone, and show empathy. For example, training experts advise approaching with “patience and empathy,” actively listening to validate the person’s feelings. Use open body language, maintain personal space (2–3 arm lengths), and keep your voice low. This communicates respect and helps “humanize the care process,” recognizing the client’s needs and feelings.

## Techniques:

*   **Stay calm and present:** Take a deep breath; avoid showing alarm or anger. Speak slowly and clearly.
*   **Listen actively:** Allow the client to express concerns. Use phrases like “I hear you” or “I understand this is upsetting” to show empathy. Reflect or repeat back to confirm understanding.
*   **Validate and empathize:** Even if you disagree, acknowledge their feelings (“You seem frustrated” or “I can see this is important to you”). Validation can reduce defensiveness.
*   **Offer choices:** Give the client some control (e.g., “Would you like to sit down or walk outside?”). Choices (“tea or water?”, “now or in 10 minutes?”) help clients feel autonomy. This respects their rights (the Lanterman Act guarantees client choice).
*   **Remove triggers and provide space:** If possible, remove loud noises, bright lights, or other stimuli that may be aggravating. Encourage the client to move to a quieter area. Offer a calming activity (soft music, a quiet corner).
`,
      learningObjectives: [
        'Define de-escalation and its goals in a supportive living context.',
        'Explain why person-centered care and least-restrictive interventions are required by California regulations.',
        'Apply basic de-escalation strategies (calm demeanor, listening, choice offering) to real situations.',
      ],
      questions: [
        {
          id: 'mod1-q1',
          question: 'True or False: Keeping a safe distance (about 2 arm’s lengths) from an upset client can help de-escalate a situation.',
          options: ['True', 'False'],
          correctAnswer: 0, // True
          explanation: 'It prevents the client from feeling threatened or crowded.',
        },
        {
          id: 'mod1-q2',
          question: 'Which is not a recommended de-escalation approach?',
          options: [
            'A) Speaking softly and slowly',
            'B) Ignoring the client’s feelings',
            'C) Offering choices or alternatives',
            'D) Using calm, reassuring statements',
          ],
          correctAnswer: 1, // B
          explanation: 'Ignoring feelings is not recommended. Always acknowledge and address client concerns.',
        },
        {
          id: 'mod1-q3',
          question: 'What is the primary goal of de-escalation in supportive living?',
          options: [
            'A) To assert authority over the client',
            'B) To defuse tension and keep clients safe without coercion',
            'C) To quickly end the interaction',
            'D) To prove the client is wrong',
          ],
          correctAnswer: 1,
          explanation: 'The primary goal is to ensure safety and defuse tension using non-coercive methods.',
        },
        {
          id: 'mod1-q4',
          question: 'When a client is agitated, what kind of body language should staff use?',
          options: [
            'A) Closed-off, arms crossed',
            'B) Aggressive and confrontational',
            'C) Open and relaxed',
            'D) Pointing and gesturing wildly',
          ],
          correctAnswer: 2,
          explanation: 'Open body language communicates respect and helps calm the situation.',
        },
        {
          id: 'mod1-q5',
          question: 'Why is offering choices important in de-escalation?',
          options: [
            'A) It confuses the client',
            'B) It gives the client a sense of control and autonomy',
            'C) It speeds up the de-escalation process',
            'D) It allows staff to dictate the outcome',
          ],
          correctAnswer: 1,
          explanation: 'Offering choices empowers the client and can reduce defensiveness.',
        },
      ],
      audioUrl: '/Audio/De-escalation in Supportive Living_ California Standards.wav',
      transcript: 'This audio segment covers the foundations of de-escalation, including techniques like staying calm, active listening, validating feelings, offering choices, and removing triggers. It emphasizes person-centered care and least-restrictive interventions as per California regulations.',
    },
    {
      id: 'mod-2',
      title: 'When and How to Involve a Supervisor',
      description: 'When escalation or danger arises, staff must involve supervisors right away. This ensures client and staff safety and compliance with DDS/Regional Center rules. Always follow your agency’s chain-of-command and incident-reporting procedures after de-escalation or any crisis.',
      content: `
# When and How to Involve a Supervisor

Staff have a duty to report certain situations promptly. California law and agency policy (e.g. Title 17/22 incident rules and Supported Living contracts) generally require notifying a supervisor or on-call manager if a situation:

*   **Becomes unsafe or violent:** If the client threatens harm to self or others, or if any physical aggression occurs, call for help immediately. Do not attempt to restrain beyond your training.
*   **Is beyond your ability to resolve:** If repeated de-escalation attempts fail or the client is persistently upset, notify your supervisor to get advice or backup support.
*   **Results in injury or significant event:** Any fall, injury, medical emergency, or use of emergency interventions (e.g. restraint, 911 call) must be reported.
*   **Involves policy violations or rights issues:** If a client makes an allegation (abuse, neglect) or staff behavior is in question, inform the supervisor per protocol.

California’s Enhanced Behavioral Supports Homes guidelines explicitly instruct staff to “call for assistance if needed” and, once the immediate crisis is over, to document and report the incident to a supervisor. Even in non-emergency conflict, supervisors can help mediate or adjust service plans. Remember, supported living emphasizes individualized services and team-based support, so supervisors and care teams are part of the safety net.

## Case Scenario:

A client with a history of anxiety begins yelling and throwing objects at 10 PM. You tried all de-escalation steps but the client is still agitated.

**Question:** What should you do next?

## Decision Path:

*   If you feel unsafe or cannot calm the client, immediately call your supervisor or on-call manager for guidance.
*   Follow your agency’s crisis plan. You might also call 911 if there’s danger.
*   After the incident, document what happened and your response, then meet with the supervisor to debrief.
`,
      learningObjectives: [
        'Identify clear indicators that require notifying a supervisor (e.g., safety threats, repeated refusals, need for additional resources).',
        'Understand agency and regulatory requirements for incident reporting and escalation.',
        'Describe proper steps for escalating concerns after a conflict or crisis.',
      ],
      questions: [
        {
          id: 'mod2-q1',
          question: 'True or False: It’s acceptable to wait until morning to tell a supervisor about a client who was very upset last night but is calm now.',
          options: ['True', 'False'],
          correctAnswer: 1, // False
          explanation: 'If the situation was dangerous or severe, you should notify a supervisor immediately, not delay. DDS policy says report incidents promptly after control is regained.',
        },
        {
          id: 'mod2-q2',
          question: 'Which situation does NOT require immediate supervisor notification?',
          options: [
            'A) A resident falls and hurts themselves.',
            'B) A minor verbal disagreement over TV shows, resolved in 5 minutes.',
            'C) A client repeatedly threatens staff.',
            'D) A client asks staff to leave and becomes very upset.',
          ],
          correctAnswer: 1, // B
          explanation: 'A brief, minor disagreement may not need escalation if quickly resolved. The others (A, C, D) involve potential safety or need for guidance and should be reported.',
        },
        {
          id: 'mod2-q3',
          question: 'What is a key reason to involve a supervisor when a situation becomes unsafe?',
          options: [
            'A) To show the client who is in charge',
            'B) To ensure client and staff safety and compliance with rules',
            'C) To avoid personal responsibility',
            'D) To get the supervisor to handle all future interactions',
          ],
          correctAnswer: 1,
          explanation: 'Supervisor involvement is crucial for safety and adherence to agency and regulatory requirements.',
        },
        {
          id: 'mod2-q4',
          question: 'If de-escalation attempts repeatedly fail, what is the appropriate next step?',
          options: [
            'A) Continue trying the same de-escalation techniques indefinitely',
            'B) Ignore the client until they calm down on their own',
            'C) Notify your supervisor for advice or backup support',
            'D) Leave the client alone without supervision',
          ],
          correctAnswer: 2,
          explanation: 'When de-escalation attempts are unsuccessful, it is important to seek supervisor guidance or support.',
        },
        {
          id: 'mod2-q5',
          question: 'Which of the following is NOT a situation that typically requires supervisor notification?',
          options: [
            'A) A client makes an allegation of abuse',
            'B) A client has a minor preference about meal choices',
            'C) A client threatens harm to themselves or others',
            'D) A significant injury occurs to a client',
          ],
          correctAnswer: 1,
          explanation: 'Minor preferences that do not impact safety or policy typically do not require immediate supervisor notification.',
        },
      ],
    },
    {
      id: 'mod-3',
      title: 'Handling Unhappy Clients or “Please Leave” Requests',
      description: 'When a client is unhappy or asks staff to leave, respond with empathy and respect for their autonomy. Listen and validate feelings. Offer space if needed, but gently seek to resolve issues. Report the incident to a supervisor afterward and make sure the client’s care continues in a way they accept.',
      content: `
# Handling Unhappy Clients or “Please Leave” Requests

In supportive living, clients have the right to a respectful, home-like environment. If a client is unhappy or tells you to leave, stay calm. Speak softly and listen: “I hear that you’re upset. Can you tell me what’s wrong?” Use empathy: “It sounds like something I did/said is upsetting you.” Validating their feelings does not mean conceding, but it shows respect. Remember supportive living principles: each person “exercises meaningful choice and control in their daily lives” including who provides their support. If a client wants you to leave their home, acknowledge their right to privacy: “I understand you want some space. I’ll step outside for a moment.” You might offer to check back later, or ask if they’d like anyone else notified (family, supervisor) to assist. The aim is to de-escalate the situation, not to argue.

*   **Ask clarifying questions:** If a client is upset, gently ask what’s bothering them. “What can I do to help?”
*   **Offer solutions or choices:** Propose alternatives: “Would you like to continue this conversation with your case manager or a family member? I can call them if you want.” Giving options can turn “leave me alone” into “help me solve this problem.”
*   **Know boundaries:** If the client insists you leave, do so calmly. Say: “I’ll give you some space. I’ll check back in 30 minutes to see if you need anything.” Then step away and notify your supervisor of the event and any underlying issues (e.g. conflict with roommate, scheduling changes, etc.).
*   **Follow policy:** Consistent with resident rights, explain gently that you will still be available if needed, and document the refusal of services. Consult your supervisor on any ongoing refusal to ensure the client’s needs are still met safely.

## Role-Play Scenario (Unhappy Client):

**Situation:** You enter an adult client’s apartment to help with chores. They frown and say, “I don’t want you here. I want you to go!”

**Staff (You):** (Calm tone) “I hear you. It seems like you’d rather be alone right now. I respect that. I can step outside if you’d like, but I’m here to help. Is everything okay?”

**Client:** “No, just go away!”

**Staff:** “Okay, I’ll wait outside for a little bit. I just want to make sure you’re safe and everything is fine. If there’s anything you need or you want to talk later, please let me know.”

Staff steps out of the room/house.

**Debrief:** After the client calms down or the scheduled time has passed, staff can gently knock and re-engage: “Thanks for talking just now. I’m back. Would you like me to continue with the chores, or would you prefer I leave and come back later?”

If tension remains, staff should notify the supervisor to discuss the client’s concerns and ensure the client feels heard.

## Interactive Prompt:

Imagine a client is visibly upset and yelling at you to leave their home immediately. Using the steps above, write out what you would say and do. Compare with your peers or supervisor to check that your response was respectful and calm.
`,
      learningObjectives: [
        'Remain professional when a client expresses dissatisfaction or asks staff to leave.',
        'Use communication skills to understand the client’s concerns and seek resolution.',
        'Respect client autonomy while ensuring appropriate support is offered.',
      ],
      questions: [
        {
          id: 'mod3-q1',
          question: 'When a client is unhappy or asks staff to leave, what should be your initial response?',
          options: [
            'A) Argue with them until they change their mind',
            'B) Immediately leave without saying anything',
            'C) Respond with empathy and respect for their autonomy',
            'D) Call your supervisor without attempting to de-escalate',
          ],
          correctAnswer: 2,
          explanation: 'Responding with empathy and respect helps de-escalate the situation and acknowledges the client\'s feelings.',
        },
        {
          id: 'mod3-q2',
          question: 'Why is it important to offer choices to an unhappy client?',
          options: [
            'A) To confuse them further',
            'B) To give them a sense of control and turn "leave me alone" into "help me solve this problem"',
            'C) To assert your authority',
            'D) To end the conversation quickly',
          ],
          correctAnswer: 1,
          explanation: 'Offering choices empowers the client and can shift their focus from demanding staff leave to finding a solution.',
        },
        {
          id: 'mod3-q3',
          question: 'If a client insists you leave their home, what is the appropriate action?',
          options: [
            'A) Refuse to leave until they calm down',
            'B) Leave calmly, stating you will check back later, and notify your supervisor',
            'C) Threaten to call the police',
            'D) Ignore their request and continue with your tasks',
          ],
          correctAnswer: 1,
          explanation: 'Respecting their right to privacy while ensuring their safety and notifying a supervisor is key.',
        },
        {
          id: 'mod3-q4',
          question: 'What is the purpose of asking clarifying questions when a client is upset?',
          options: [
            'A) To challenge their feelings',
            'B) To prolong the argument',
            'C) To understand what is bothering them and what you can do to help',
            'D) To make them feel guilty',
          ],
          correctAnswer: 2,
          explanation: 'Clarifying questions help staff understand the root cause of the client\'s distress and find appropriate solutions.',
        },
        {
          id: 'mod3-q5',
          question: 'After a client expresses dissatisfaction, what should staff do to ensure continued care?',
          options: [
            'A) Avoid the client for the rest of the day',
            'B) Immediately terminate services',
            'C) Report the incident to a supervisor and ensure the client’s care continues in a way they accept',
            'D) Blame the client for their unhappiness',
          ],
          correctAnswer: 2,
          explanation: 'Reporting to a supervisor and ensuring care continuity in an acceptable manner is crucial for client well-being and compliance.',
        },
      ],
    },
    {
      id: 'mod-4',
      title: 'Managing Arguments and Maintaining Professionalism',
      description: 'Handling client arguments requires patience and professional composure. Use calm tone, reflective listening, and problem-solving. Maintain the person’s dignity and your boundaries. If needed, disengage politely and seek supervisor support.',
      content: `
# Managing Arguments and Maintaining Professionalism

Arguing with a client can escalate quickly if not handled well. The goal is to remain calm and not feed into the conflict. California care standards demand that even in disputes, staff treat clients with respect and avoid coercion ([dds.ca.gov](https://www.dds.ca.gov)). Techniques include:

*   **Stay calm and neutral:** Keep your voice even and body language open (uncrossed arms, relaxed posture). Avoid sarcasm or raising your voice. Remember you’re the professional in this moment.
*   **Use reflective statements:** If a client argues a point, try reflecting: “You feel strongly about this, and I respect your viewpoint.” This shows listening without necessarily agreeing.
*   **Find common ground:** Whenever possible, agree on facts: “Yes, it is frustrating when plans change,” or “It sounds like you value your routine.” Validating common concerns can soothe tension.
*   **De-personalize the conflict:** Focus on the issue, not personalities. For example: “I’m here to help. Let’s figure this out together.” Avoid saying “you’re wrong” or blaming.
*   **Set gentle limits:** If the argument becomes abusive, say firmly: “I want to resolve this, but I cannot continue if you use that language.” If necessary, step away and involve a supervisor.

## Role-Play Scenario (Argument with Client):

**Situation:** A client argues with you about missing a scheduled appointment:

**Client:** “Why didn’t you tell me about the clinic visit? You never listen to me!” (voice raised)

**Staff (You):** (Calm tone, open posture) “You’re upset because I missed telling you about the clinic appointment, right?” (reflect back)

**Client:** “Yes! You always do this!”

**Staff:** “I see you’re frustrated. I’m sorry that happened. Let me help fix this. I can call and see if we can reschedule the appointment at a time that works better for you.”

**Client:** “Fine.”

Staff follows through: calls clinic, keeps the client informed calmly.

In the exchange above, the staff used a calm voice and validated the client’s frustration before offering a solution. Notice the staff did not argue or blame, but redirected the conversation to problem-solving.

## Decision Path Activity:

If a client raises their voice or uses harsh language, staff should:

*   Pause and breathe. Do not respond in anger.
*   Use a calm and steady voice. For example, say “I want to understand what’s wrong. It’s hard to talk when people shout.”
*   Step back physically if needed (maintaining safe distance) but stay engaged.
*   If the client continues to argue: “I understand this is important. Let’s find a way to solve this together.”
*   If arguments persist with disrespectful tone, set boundaries: “I can’t continue this conversation if we’re not respectful. Let’s take a short break.”

**Escalation:** If the situation doesn’t improve, contact your supervisor as per Module 2 guidelines.
`,
      learningObjectives: [
        'Recognize escalation signs in an argumentative client.',
        'Use communication strategies to defuse arguments and preserve dignity for both parties.',
        'Maintain professional boundaries and emotional control during conflicts.',
      ],
      questions: [
        {
          id: 'mod4-q1',
          question: 'True or False: If a client uses rude language during an argument, staff should respond with equal firmness to assert authority.',
          options: ['True', 'False'],
          correctAnswer: 1, // False
          explanation: 'Responding with anger escalates the conflict. Instead, stay calm and use setting boundaries politely.',
        },
        {
          id: 'mod4-q2',
          question: 'What is the best immediate response when a client says “You’re wrong!” during a debate?',
          options: [
            'A) Yell back, “I’m not wrong, I’m trying to help!”',
            'B) Pause and reply, “I can see this is really upsetting. Let’s talk more slowly.”',
            'C) Walk out without explanation.',
            'D) Argue each point in detail.',
          ],
          correctAnswer: 1, // B
          explanation: 'Maintain calm and empathy. Yelling back or walking out inflames the situation.',
        },
        {
          id: 'mod4-q3',
          question: 'When managing an argument, what is meant by "de-personalize the conflict"?',
          options: [
            'A) Make it about the client\'s personality flaws',
            'B) Focus on the issue at hand, not personal attacks or blame',
            'C) Take everything the client says personally',
            'D) Avoid eye contact with the client',
          ],
          correctAnswer: 1,
          explanation: 'De-personalizing the conflict means focusing on the problem, not the individuals involved, to foster a more constructive discussion.',
        },
        {
          id: 'mod4-q4',
          question: 'What is a "reflective statement" and why is it useful in de-escalation?',
          options: [
            'A) A statement that blames the client for the conflict',
            'B) A statement that repeats exactly what the client said to mock them',
            'C) A statement that shows you understand the client\'s feelings without necessarily agreeing, e.g., "You feel strongly about this"',
            'D) A statement that changes the subject entirely',
          ],
          correctAnswer: 2,
          explanation: 'Reflective statements demonstrate active listening and validation, which can help calm an agitated client.',
        },
        {
          id: 'mod4-q5',
          question: 'If a client\'s argument becomes abusive, what is the appropriate professional boundary to set?',
          options: [
            'A) Continue to engage in the abusive conversation',
            'B) Respond with abusive language yourself',
            'C) Firmly state, "I want to resolve this, but I cannot continue if you use that language," and step away if necessary',
            'D) Immediately call 911 without warning',
          ],
          correctAnswer: 2,
          explanation: 'Setting clear, firm boundaries about unacceptable language is crucial for maintaining professionalism and personal safety.',
        },
      ],
    },
    {
      id: 'mod-5',
      title: 'Course Summary and Resources',
      description: 'This module summarizes the key takeaways from the course, emphasizing person-centered de-escalation, supervisor involvement, and professionalism in supportive living, and provides additional resources for continued learning.',
      content: `
# Course Summary and Resources

Throughout this course, we’ve emphasized person-centered de-escalation, supervisor involvement, and professionalism in supportive living. Key takeaways:

*   Always remain calm, empathetic, and respectful. This aligns with California’s focus on treating individuals with disabilities with dignity and least restrictive interventions.
*   Follow your agency’s crisis plan and reporting rules. Remember, DDS/Regional Center guidelines require prompt documentation and oversight of incidents.
*   After any challenging incident, complete any required paperwork and discuss with your supervisor and team to improve future responses. Debriefing reinforces learning and safety.

## Additional Resources:

Consult the DDS Supported Living Services Guide for service standards, and participate in ongoing DSPT training (e.g. behavior supports, communication skills). Familiarize yourself with Regional Center policies and Title 17/22 regulations (e.g. Title 22 §85322 on crisis plans). By using these strategies and working as a team, you help create a safer, more supportive environment for the individuals you serve. Proper de-escalation and clear communication preserve trust and uphold the California DDS commitment to person-centered, high-quality care.
`,
      learningObjectives: [],
      questions: [
        {
          id: 'mod5-q1',
          question: 'What is a key takeaway from this course regarding staff demeanor during de-escalation?',
          options: [
            'A) It is important to assert dominance over the client.',
            'B) Staff should always remain calm, empathetic, and respectful.',
            'C) Staff should avoid showing any emotion.',
            'D) Staff should only be empathetic if the client is calm.',
          ],
          correctAnswer: 1,
          explanation: 'Maintaining a calm, empathetic, and respectful demeanor is crucial for effective de-escalation and aligns with person-centered care principles.',
        },
        {
          id: 'mod5-q2',
          question: 'Why is it important to follow agency crisis plans and reporting rules?',
          options: [
            'A) To avoid extra paperwork.',
            'B) To ensure compliance with regulations and proper oversight of incidents.',
            'C) To shift responsibility to supervisors.',
            'D) To make the client feel more controlled.',
          ],
          correctAnswer: 1,
          explanation: 'Following crisis plans and reporting rules ensures regulatory compliance, proper documentation, and effective management of incidents.',
        },
        {
          id: 'mod5-q3',
          question: 'What is the benefit of debriefing with your supervisor and team after a challenging incident?',
          options: [
            'A) It allows you to complain about the client.',
            'B) It reinforces learning and improves future responses.',
            'C) It is a mandatory but unhelpful step.',
            'D) It is only necessary for severe incidents.',
          ],
          correctAnswer: 1,
          explanation: 'Debriefing helps staff learn from experiences, refine their de-escalation techniques, and enhance overall safety and response strategies.',
        },
        {
          id: 'mod5-q4',
          question: 'What does "person-centered care" emphasize in the context of supportive living?',
          options: [
            'A) Staff convenience and efficiency.',
            'B) Treating individuals with disabilities with dignity and using least restrictive interventions.',
            'C) Standardized approaches for all clients regardless of individual needs.',
            'D) Focusing solely on the client\'s challenging behaviors.',
          ],
          correctAnswer: 1,
          explanation: 'Person-centered care prioritizes the individual\'s dignity, choices, and the use of interventions that are least restrictive to their freedom and autonomy.',
        },
        {
          id: 'mod5-q5',
          question: 'Where can staff find additional resources for service standards and ongoing training?',
          options: [
            'A) Only from their direct supervisor.',
            'B) By guessing what to do in a crisis.',
            'C) The DDS Supported Living Services Guide and DSPT training.',
            'D) Online forums and social media.',
          ],
          correctAnswer: 2,
          explanation: 'The DDS Supported Living Services Guide and ongoing DSPT training are reliable sources for service standards and continued professional development.',
        },
      ],
    },
    {
      id: 'mod-6',
      title: 'Interactive De-Escalation Scenarios',
      description: 'Practice de-escalation techniques with these interactive scenarios.',
      content: `
        <p>This module provides interactive scenarios to practice de-escalation techniques. Choose the best response to de-escalate each situation and receive immediate feedback.</p>
      `,
      interactiveContent: {
        type: 'multiple-choice',
        title: 'De-Escalation Practice',
        description: 'Choose the best response to de-escalate the situation.',
        scenarios: [
          {
            id: 'scenario-1',
            title: 'Scenario 1: Medication Refusal',
            description: 'A client who usually takes their medication without issue is now refusing, becoming agitated and saying, "I don\'t need that poison!"',
            options: [
              { id: 'opt1', text: 'Force the client to take the medication, explaining it\'s for their own good.' },
              { id: 'opt2', text: 'Tell the client you understand their concern, ask what\'s bothering them, and offer to call their doctor or supervisor to discuss the medication.' },
              { id: 'opt3', text: 'Leave the medication and walk away, hoping they will take it later.' },
            ],
            correctAnswer: 'opt2',
            feedback: 'Forcing medication is never appropriate unless there is an immediate danger and a specific protocol for it. Leaving it can be neglectful. The best approach is to validate their feelings, understand the underlying issue, and involve appropriate professionals to find a solution that respects their autonomy while ensuring their well-being.',
          },
          {
            id: 'scenario-2',
            title: 'Scenario 2: Public Meltdown',
            description: 'While on a community outing, a client suddenly becomes overwhelmed, starts yelling, and attempts to run away from the group.',
            options: [
              { id: 'opt1', text: 'Yell back at the client to stop and physically restrain them.' },
              { id: 'opt2', text: 'Maintain a calm demeanor, gently guide the client to a quieter area if possible, and use a soothing voice to ask what they need.' },
              { id: 'opt3', text: 'Ignore the behavior and continue with the outing, hoping it will pass.' },
            ],
            correctAnswer: 'opt2',
            feedback: 'Yelling or ignoring the client will likely escalate the situation. Physical restraint should only be used as a last resort when there is immediate danger and only by trained personnel following strict protocols. The most effective strategy is to remove the client from the overstimulating environment and use calm, empathetic communication to understand and address their needs.',
          },
          {
            id: 'scenario-3',
            title: 'Scenario 3: Resource Dispute',
            description: 'Two clients are arguing loudly over who gets to use the common area television. One client is accusing the other of always hogging it.',
            options: [
              { id: 'opt1', text: 'Tell them both to stop arguing or you will turn off the TV for everyone.' },
              { id: 'opt2', text: 'Listen to both sides, acknowledge their frustration, and help them negotiate a fair schedule or alternative activity.' },
              { id: 'opt3', text: 'Side with the client who is usually more cooperative to end the argument quickly.' },
            ],
            correctAnswer: 'opt2',
            feedback: 'Threatening or showing favoritism can escalate tension and resentment. The best approach is to mediate the dispute, validate both perspectives, and facilitate a compromise or solution that empowers clients and resolves the conflict constructively.',
          },
        ],
      },
    },
  ],
  certificateAvailable: true,
  // Add scenarios for the interactive tab
  scenarioContent: `
## Interactive De-Escalation Scenarios

Practice these scenarios to apply your de-escalation skills in realistic situations.

### Scenario 1: Medication Refusal
**Situation:** A client who usually takes their medication without issue is now refusing, becoming agitated and saying, "I don't need that poison!"

**Options:**
1. Force the client to take the medication, explaining it's for their own good.
2. Tell the client you understand their concern, ask what's bothering them, and offer to call their doctor or supervisor to discuss the medication.
3. Leave the medication and walk away, hoping they will take it later.

**Best Response:** Option 2 - Forcing medication is never appropriate unless there is an immediate danger and a specific protocol for it. Leaving it can be neglectful. The best approach is to validate their feelings, understand the underlying issue, and involve appropriate professionals to find a solution that respects their autonomy while ensuring their well-being.

### Scenario 2: Public Meltdown
**Situation:** While on a community outing, a client suddenly becomes overwhelmed, starts yelling, and attempts to run away from the group.

**Options:**
1. Yell back at the client to stop and physically restrain them.
2. Maintain a calm demeanor, gently guide the client to a quieter area if possible, and use a soothing voice to ask what they need.
3. Ignore the behavior and continue with the outing, hoping it will pass.

**Best Response:** Option 2 - Yelling or ignoring the client will likely escalate the situation. Physical restraint should only be used as a last resort when there is immediate danger and only by trained personnel following strict protocols. The most effective strategy is to remove the client from the overstimulating environment and use calm, empathetic communication to understand and address their needs.

### Scenario 3: Resource Dispute
**Situation:** Two clients are arguing loudly over who gets to use the common area television. One client is accusing the other of always hogging it.

**Options:**
1. Tell them both to stop arguing or you will turn off the TV for everyone.
2. Listen to both sides, acknowledge their frustration, and help them negotiate a fair schedule or alternative activity.
3. Side with the client who is usually more cooperative to end the argument quickly.

**Best Response:** Option 2 - Threatening or showing favoritism can escalate tension and resentment. The best approach is to mediate the dispute, validate both perspectives, and facilitate a compromise or solution that empowers clients and resolves the conflict constructively.
`,
};
