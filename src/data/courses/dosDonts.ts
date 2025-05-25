import { Course } from '../courseTypes';

export const dosDontsCourse: Course = {
  id: "dos-donts-dsp",
  title: "DSP Do's and Don'ts: Critical Protocols & Decision-Making",
  description: "Essential guidelines for handling common and critical scenarios, including when to contact supervisors and understanding key policies.",
  category: "Safety & Compliance",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/dos and donts.png", // Placeholder image, please update
  duration: "1 hours",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1-missing-client",
      title: "Responding to a Missing Client",
      description: "Protocols for when a client leaves unexpectedly or is not where they are supposed to be.",
      content: `
# Responding to a Missing Client

One of the most critical situations a DSP can face is when a client is missing or leaves a designated area without authorization. Prompt and correct action is vital for the client's safety.

## Scenario 1: Client Leaves During an Outing

**Situation:** You are with Sarah, an adult with autism, at a crowded park for a community outing. You turn to answer a quick question from another park-goer, and when you turn back, Sarah is no longer beside you.

### Do's:

*   **DO Stay Calm & Observe:** Immediately scan the immediate surroundings. Note what Sarah was wearing and her last known direction.
*   **DO Alert On-Site Staff (if any):** If there are park rangers or security, quickly provide them with Sarah's description.
*   **DO Conduct a Quick Search:** Systematically search the immediate area where Sarah was last seen. Call out her name.
*   **DO Notify Supervisor Immediately:** If Sarah is not found within a few minutes (e.g., 5-10 minutes, follow agency policy), contact your supervisor immediately. Provide all relevant details: last seen location, description, time missing, and actions taken so far.
*   **DO Follow Supervisor's Directions:** Your supervisor will guide you on next steps, which may include contacting law enforcement or family.
*   **DO Document Everything:** Once the situation is resolved or as directed, thoroughly document the incident, including times, actions taken, and communications.

### Don'ts:

*   **DON'T Panic:** Panicking can impair your judgment.
*   **DON'T Wait Too Long to Call for Help:** Time is critical. Don't delay notifying your supervisor hoping the client will reappear.
*   **DON'T Leave the Area (unless directed):** Stay in the general vicinity unless your supervisor or law enforcement directs otherwise, as the client may return to the last known location.
*   **DON'T Spread Unconfirmed Information:** Stick to facts when communicating with others.

## Scenario 2: Client Not Present at Scheduled Time

**Situation:** You arrive for your shift at David's apartment. David, who has a developmental disability and lives semi-independently, is supposed to be home. He is not there, and his phone goes to voicemail.

### Do's:

*   **DO Verify Schedule:** Double-check David's schedule and any recent communications to ensure there wasn't a planned change you missed.
*   **DO Check Usual Spots:** If David has known favorite spots nearby (e.g., a local coffee shop, library), and it's safe and appropriate to do so, quickly check those locations if agency policy allows.
*   **DO Attempt Contact:** Try calling David again. Check if there are other emergency contacts to try (as per agency protocol).
*   **DO Notify Supervisor Promptly:** If David cannot be located or contacted within a short timeframe (e.g., 15-30 minutes, follow agency policy), inform your supervisor. Explain the situation, steps taken, and any known risks associated with David.
*   **DO Secure the Premises (if applicable):** Ensure David's apartment is secure if you need to leave to search or as directed.
*   **DO Follow Agency Protocol for Missing Persons:** Your agency will have specific steps, including when to involve law enforcement.

### Don'ts:

*   **DON'T Assume:** Don't assume David is fine and will turn up eventually without taking action.
*   **DON'T Enter Private Areas Without Justification:** Respect privacy unless there's a clear indication of an emergency or as per agency policy for welfare checks.
*   **DON'T Delay Reporting:** If you have a genuine concern for David's wellbeing or safety, report it.
      `,
      questions: [
        {
          id: "q1-mod1-missing",
          question: "If a client disappears during a community outing, what is one of the FIRST things you should do?",
          options: [
            "Immediately call the client's family.",
            "Wait for 30 minutes to see if they return on their own.",
            "Stay calm, scan the immediate surroundings, and note their description.",
            "Leave the area to search the wider community."
          ],
          correctAnswer: 2,
          explanation: "Staying calm and observing the immediate area are crucial first steps. This helps you gather information and act methodically. Calling family or waiting too long can delay critical search efforts."
        },
        {
          id: "q2-mod1-missing",
          question: "When should you typically notify your supervisor if a client is missing from an outing?",
          options: [
            "After you have searched for at least one hour.",
            "Only if you believe the client is in immediate danger.",
            "If the client is not found within a few minutes (e.g., 5-10 minutes, per agency policy).",
            "At the end of your shift if the client hasn't returned."
          ],
          correctAnswer: 2,
          explanation: "Prompt notification of your supervisor is key. Agency policies usually define a short timeframe (e.g., 5-10 minutes) for this, as quick escalation can mobilize more resources."
        },
        {
          id: "q3-mod1-missing",
          question: "You arrive for a shift and the client is not home as expected. What should you AVOID doing?",
          options: [
            "Verifying the client's schedule for any changes.",
            "Assuming the client is fine and will return eventually, without taking further action.",
            "Contacting your supervisor if the client cannot be located promptly.",
            "Checking known safe spots nearby if agency policy allows."
          ],
          correctAnswer: 1,
          explanation: "Never assume a client is fine without taking appropriate steps. Always follow protocol, which includes verifying schedules, attempting contact, and notifying your supervisor if the client cannot be located."
        }
      ],
      interactiveScenario: {
        title: "Missing Client: Park Outing",
        description: "You are at a busy park with Sarah. She suddenly disappears. What do you do?",
        type: "multiple-choice",
        content: {
          scenario: "You're at a bustling city park with Sarah, an adult you support who can sometimes wander. You briefly look down at your phone to check a message from your supervisor. When you look up, Sarah is gone.",
          decisions: [
            {
              prompt: "What is your immediate first action?",
              options: [
                {
                  text: "Start running around the entire park calling her name loudly.",
                  outcome: "While calling her name is good, running around without a plan in a large park might be inefficient and cause you to miss her if she's nearby. A systematic scan of the immediate area is better first.",
                  correct: false
                },
                {
                  text: "Immediately call 911 to report a missing person.",
                  outcome: "While 911 may be necessary, it's usually a step taken after initial search efforts and consultation with your supervisor, as per agency policy. A few minutes of local searching is typically done first.",
                  correct: false
                },
                {
                  text: "Quickly scan your immediate surroundings, note what Sarah was wearing, and call out her name calmly.",
                  outcome: "Excellent first step! This allows you to quickly check if she's just stepped away and gather key information for a wider search if needed.",
                  correct: true,
                  next: "decision2_park"
                },
                {
                  text: "Sit on the bench and wait, assuming she'll come back to where she last saw you.",
                  outcome: "Waiting without taking any action is risky. Sarah might be disoriented or need help. Proactive steps are necessary.",
                  correct: false
                }
              ]
            },
            {
              id: "decision2_park",
              prompt: "You've scanned the area and don't see Sarah. It's been about 3-4 minutes. What's your next best step?",
              options: [
                {
                  text: "Continue searching on your own for another 15 minutes before calling your supervisor.",
                  outcome: "Waiting too long to inform your supervisor can delay critical support and resources. Most agency policies require quicker notification.",
                  correct: false
                },
                {
                  text: "Call Sarah's emergency contact directly.",
                  outcome: "While family will need to be informed, your supervisor should typically be the first point of contact within the agency to coordinate the response.",
                  correct: false
                },
                {
                  text: "Contact your supervisor, report Sarah is missing, provide her description, your location, and actions taken so far.",
                  outcome: "Correct. Your supervisor needs to be informed promptly to implement agency missing person protocols, which may include contacting family and law enforcement.",
                  correct: true,
                  next: "decision3_park"
                },
                {
                  text: "Ask other park visitors if they've seen her, but don't call your supervisor yet.",
                  outcome: "Asking others can be helpful, but it shouldn't delay notifying your supervisor who needs to be aware of the situation immediately.",
                  correct: false
                }
              ]
            },
            {
              id: "decision3_park",
              prompt: "Your supervisor instructs you to inform park security and then call 911 if security can't locate Sarah in 10 minutes. What should you prioritize?",
              options: [
                {
                  text: "Immediately call 911, disregarding the instruction to speak with park security first.",
                  outcome: "It's important to follow your supervisor's directions. They are coordinating based on agency policy. Park security might have resources or information that can help quickly.",
                  correct: false
                },
                {
                  text: "Locate park security, provide Sarah's information, and assist them as they direct. If Sarah isn't found in 10 minutes with their help, then call 911 as instructed.",
                  outcome: "This is the correct approach. You are following your supervisor's instructions and utilizing on-site resources effectively before escalating to law enforcement.",
                  correct: true
                },
                {
                  text: "Focus only on your own search and don't involve park security or 911 unless you feel it's absolutely necessary later.",
                  outcome: "Ignoring your supervisor's directions is not appropriate and could compromise Sarah's safety and the agency's response.",
                  correct: false
                }
              ]
            }
          ]
        }
      }
    },
    {
      id: "mod-2-supervisor-contact",
      title: "When to Contact Your Supervisor",
      description: "Guidelines on when it's necessary to escalate issues to a supervisor or manager.",
      content: `
# When to Contact Your Supervisor

Knowing when to contact your supervisor is crucial for ensuring client safety, maintaining compliance, and getting needed support. While you are expected to handle many situations independently, some always require escalation.

## Always Contact Supervisor For:

*   **Emergencies:**
    *   Client medical emergencies (e.g., seizure, fall with injury, allergic reaction, difficulty breathing).
    *   Client is missing (as per missing person protocol).
    *   Suspected abuse or neglect (you must also follow mandatory reporting laws).
    *   Environmental emergencies (e.g., fire, flood in client's home).
    *   Any situation where there is an immediate threat to client or staff safety.
*   **Medication Issues:**
    *   Medication errors (wrong dose, wrong client, missed dose).
    *   Client refusal of critical medication (after attempting prescribed interventions).
    *   Adverse reactions to medication.
    *   Running out of medication if you are responsible for refills and there's an issue.
*   **Significant Behavioral Incidents:**
    *   Behavior that poses a danger to self or others.
    *   Significant property destruction.
    *   Any incident requiring physical intervention or restraint (follow agency policy strictly).
    *   Unexpected, significant escalation in challenging behaviors.
*   **Client Injury or Illness:**
    *   Any injury requiring more than basic first aid.
    *   Sudden onset of illness with concerning symptoms.
*   **Policy Clarification in Urgent Situations:** If you are unsure how to proceed in a complex or urgent situation and agency policy is unclear.
*   **Staffing Issues:**
    *   If you are unable to make your shift (provide as much notice as possible).
    *   If your replacement does not arrive and you are at the end of your shift.
*   **Concerns about Client Rights Violations.**
*   **When Directed by Policy:** Many specific situations will be outlined in your agency's policies as requiring supervisor notification.

## Situations to Handle, Then Report/Document (May Not Require Immediate Call Unless Urgent):

*   Minor behavioral issues that are managed effectively with the client's behavior plan.
*   Minor client complaints that you can resolve.
*   Routine updates on client progress or minor changes in condition (can often be noted in communication logs or regular reporting).
*   Requests for routine supplies or household needs.

## Do's and Don'ts for Contacting Supervisors:

*   **DO Have Key Information Ready:** Before calling, gather relevant facts: client name, what happened, when, where, who was involved, what you've done so far.
*   **DO Be Clear and Concise:** Explain the situation directly.
*   **DO Follow Instructions:** Listen carefully to your supervisor's directions and follow them.
*   **DO Document the Call:** Note the time of the call, who you spoke to, and the instructions given.
*   **DON'T Hesitate in an Emergency:** If it's a true emergency or you're genuinely unsure and concerned for safety, it's better to call.
*   **DON'T Use Supervisor Contact for Non-Urgent Matters:** Respect their time. Use other communication channels (email, logs) for routine updates unless the issue is time-sensitive or meets criteria for an immediate call.
*   **DON'T Argue (unless it's a safety concern):** If you disagree with instructions but it's not a safety issue, follow them and discuss your concerns later through appropriate channels. If you believe instructions put someone at risk, professionally state your concern clearly.
      `,
      questions: [
        {
          id: "q1-mod2-supervisor",
          question: "Which of the following situations ALWAYS requires immediate contact with your supervisor?",
          options: [
            "A client has a minor disagreement with their housemate.",
            "You suspect a client is experiencing a medical emergency, like a seizure.",
            "A client wants to change their dinner menu for the evening.",
            "You need to request more cleaning supplies for the client's home."
          ],
          correctAnswer: 1,
          explanation: "Client medical emergencies always require immediate supervisor contact and adherence to emergency protocols. Other situations may be handled differently or reported through routine channels."
        },
        {
          id: "q2-mod2-supervisor",
          question: "If you make a medication error, what should you do?",
          options: [
            "Wait to see if the client has a bad reaction before reporting it.",
            "Only report it if it was a serious error.",
            "Immediately report it to your supervisor and follow agency protocol for medication errors.",
            "Try to correct the error yourself without telling anyone."
          ],
          correctAnswer: 2,
          explanation: "All medication errors, regardless of perceived severity, must be reported immediately to your supervisor and documented according to agency policy to ensure client safety and proper follow-up."
        },
        {
          id: "q3-mod2-supervisor",
          question: "When is it generally NOT necessary to call your supervisor immediately (though it may need to be documented)?",
          options: [
            "A client refuses a critical medication after all prescribed interventions have been tried.",
            "A fire starts in the client's kitchen.",
            "A minor behavioral issue is effectively managed using the client's existing behavior support plan.",
            "You witness another staff member neglecting a client's needs."
          ],
          correctAnswer: 2,
          explanation: "Effectively managing a minor behavior with an existing plan is part of your role. While it needs documentation, it usually doesn't require an immediate call unless it escalates or policy dictates. The other scenarios are urgent."
        }
      ]
    },
    {
      id: "mod-3-regional-center-policies",
      title: "Understanding Key Regional Center Policies",
      description: "Overview of common Regional Center policies DSPs should be aware of, such as incident reporting, client rights, health & safety, and confidentiality.",
      content: `
# Understanding Key Regional Center Policies

Direct Support Professionals often work with individuals who receive services coordinated through a Regional Center. Understanding key Regional Center policies is essential for compliance and providing quality support. *Note: Specific policies can vary by Regional Center and state. Always refer to your agency's training and the specific Regional Center's guidelines.*

## Common Policy Areas:

### 1. Incident Reporting (Special Incident Reports - SIRs)

*   **What it is:** A formal process for reporting unusual or serious events that affect a client's health, safety, or rights.
*   **Examples of Reportable Incidents (often include, but not limited to):
    *   Suspected abuse or neglect (physical, emotional, financial, sexual)
    *   Exploitation
    *   Client injury requiring medical attention beyond basic first aid
    *   Medication errors (especially those with adverse outcomes or potential for harm)
    *   Missing persons
    *   Death of a client
    *   Law enforcement involvement
    *   Client-to-client aggression resulting in injury
    *   Rights violations
*   **DSP Responsibility:**
    *   **Know what's reportable:** Be familiar with the list of incidents your agency and the Regional Center define as 'special incidents.'
    *   **Report Immediately:** Report to your supervisor as soon as you are aware of a potential SIR.
    *   **Document Accurately:** Provide factual, objective information for the report.
    *   **Timelines:** SIRs often have strict reporting timelines (e.g., within 24 hours to the Regional Center, with immediate verbal notification to your agency).
*   **Do:** Report any event you even *suspect* might be an SIR. It's better to over-report than under-report.
*   **Don't:** Try to determine on your own if an incident 'counts' as an SIR if it falls into a concerning category. Escalate to your supervisor.

### 2. Client Rights

*   **What it is:** Regional Centers champion the rights of individuals with developmental disabilities. These rights are often detailed in publications and must be upheld by all service providers.
*   **Key Rights Often Emphasized:**
    *   **Right to be treated with dignity and respect.**
        *   **DO:** Address clients by their preferred names and pronouns. Speak to them as adults, regardless of their disability. Actively listen to their concerns.
        *   **DON'T:** Use demeaning language, talk down to clients, or discuss their personal information in front of others without their consent.
    *   **Right to privacy and confidentiality.** (More detail in Confidentiality section)
        *   **DO:** Knock before entering a client's room. Ensure personal care is provided in private.
        *   **DON'T:** Share information about a client with individuals not directly involved in their care without consent.
    *   **Right to make choices and informed decisions (self-determination).**
        *   **DO:** Offer choices in daily activities, meals, clothing, etc. Explain options clearly and allow time for decision-making. Support them in understanding the potential consequences of their choices.
        *   **DON'T:** Make decisions for clients that they can make themselves, even if it's quicker. Don't pressure them into a choice you prefer.
    *   **Right to be free from abuse, neglect, and exploitation.**
        *   **DO:** Report any suspicion of abuse, neglect, or exploitation immediately according to SIR policy. Create a safe and supportive environment.
        *   **DON'T:** Engage in any behavior that could be construed as abusive, neglectful, or exploitative. Don't ignore signs of potential harm.
    *   **Right to services in the least restrictive environment.**
        *   **DO:** Support clients to live as independently as possible and participate in community life. Focus on abilities and provide support to overcome barriers.
        *   **DON'T:** Impose unnecessary restrictions on a client's freedom or activities. Don't assume a client cannot do something without trying to support them first.
    *   **Right to access advocates and complain about services without retaliation.**
        *   **DO:** Inform clients of their right to complain and how to access advocacy services. Support them in making a complaint if they wish.
        *   **DON'T:** Discourage a client from voicing a concern or complaint. Never retaliate against a client for making a complaint.
*   **DSP Responsibility:**
    *   Understand and respect client rights in all interactions.
    *   Support clients in exercising their rights.
    *   Report any suspected rights violations according to agency and Regional Center policy.
*   **Do:** Always presume competence and support clients in making their own choices to the greatest extent possible.
*   **Don't:** Impose your own values or preferences on clients, or restrict rights unnecessarily.

### 3. Health and Safety

*   **What it is:** Policies ensuring client health and safety are paramount. This includes medication management, emergency preparedness, environmental safety, infection control, and recognizing signs of illness.
*   **DSP Responsibility:**
    *   Follow all health and safety protocols (e.g., medication administration, infection control, emergency drills, proper lifting techniques).
    *   Report any health and safety concerns promptly (e.g., faulty equipment, signs of illness in a client, unsafe environmental conditions).
    *   Ensure the client's environment is safe, clean, and well-maintained.
    *   Be aware of individual client health needs and risk factors.
*   **Do:** Be proactive in identifying and mitigating potential safety risks. Regularly check equipment and the environment. Wash hands frequently.
*   **Don't:** Take shortcuts with safety procedures. Don't ignore potential hazards. Don't administer medication without proper training and authorization.

### 4. Confidentiality (HIPAA and other privacy rules)

*   **What it is:** Protecting client's Personal Identifiable Information (PII) and Protected Health Information (PHI). This is a legal and ethical obligation.
*   **Key Principles:**
    *   **Minimum Necessary:** Only access, use, or share the minimum amount of client information necessary to do your job.
    *   **Need-to-Know:** Information should only be shared with others who have a legitimate, job-related reason to know it.
*   **DSP Responsibility:**
    *   Share client information only on a 'need-to-know' basis for the purpose of providing support, coordinating care, or as required by law.
    *   Store client records (paper and electronic) securely.
    *   Do not discuss clients in public places (e.g., hallways, elevators, restaurants) or with unauthorized individuals (including family or friends).
    *   Be mindful of who can see your computer screen or papers when working with client information.
    *   Use secure methods for transmitting client information (e.g., encrypted email if required by agency).
*   **Do:**
    *   Always verify you are speaking to an authorized person (e.g., supervisor, specific family member as per release forms) before sharing PHI.
    *   Log out of computer systems when you step away.
    *   Dispose of documents with PHI securely (e.g., shredding).
    *   Report any suspected privacy breach to your supervisor immediately.
*   **Don't:**
    *   Leave client records visible or unsecured (e.g., on your desk, in your car).
    *   Share login credentials or passwords.
    *   Post any information or photos of clients on social media, even if your intentions are good.
    *   Take client records home unless specifically authorized and secured.
    *   Discuss client information with your own family or friends.

*It is critical to receive specific training from your agency on the policies of the Regional Center(s) they work with. This information is a general overview.*
      `,
      questions: [
        {
          id: "q1-mod3-rc",
          question: "What is a Special Incident Report (SIR) typically used for?",
          options: [
            "Documenting staff attendance and punctuality.",
            "Reporting unusual or serious events affecting a client's health, safety, or rights.",
            "Requesting changes to a client's daily activity schedule.",
            "Submitting staff grievances or complaints."
          ],
          correctAnswer: 1,
          explanation: "SIRs are formal reports for significant incidents such as suspected abuse, client injuries, medication errors with adverse outcomes, or rights violations, as defined by the Regional Center and agency."
        },
        {
          id: "q2-mod3-rc",
          question: "If you suspect a reportable incident (potential SIR) has occurred, what should you do?",
          options: [
            "Investigate thoroughly on your own before deciding if it's an SIR.",
            "Only report it if you are 100% certain it meets all SIR criteria.",
            "Immediately report your suspicion to your supervisor for guidance and formal reporting.",
            "Discuss it with coworkers to see if they agree it's reportable."
          ],
          correctAnswer: 2,
          explanation: "It's crucial to report any suspected SIR to your supervisor immediately. They will guide the formal reporting process. It's better to err on the side of caution and over-report than to fail to report a serious incident."
        },
        {
          id: "q3-mod3-rc",
          question: "Which of the following is a key aspect of upholding client rights according to Regional Center policies?",
          options: [
            "Making all decisions for clients to ensure their safety.",
            "Sharing client information freely with anyone interested in their well-being.",
            "Supporting clients in making their own choices and decisions (self-determination).",
            "Restricting client access to community activities to prevent potential risks."
          ],
          correctAnswer: 2,
          explanation: "Supporting self-determination and a client's right to make choices is a cornerstone of client rights. While safety is important, it should be balanced with respecting autonomy and providing support for informed decision-making."
        },
        {
          id: "q4-mod3-rc",
          question: "A client wants to wear mismatched socks and a bright orange hat to the grocery store. Upholding their 'Right to Make Choices' means you should:",
          options: [
            "Tell them it's not appropriate and pick out different clothes for them.",
            "Allow them to wear what they've chosen, as long as it's weather-appropriate and doesn't pose a safety risk.",
            "Explain that people might stare and try to convince them to change.",
            "Only let them wear it if you personally like the outfit."
          ],
          correctAnswer: 1,
          explanation: "Self-determination includes making choices about personal appearance, even if unconventional, as long as it's safe and not harmful. Your role is to support their choice."
        },
        {
          id: "q5-mod3-rc",
          question: "You are in the agency breakroom and a coworker starts discussing specific details about a client's challenging behaviors with another staff member who doesn't work with that client. This is:",
          options: [
            "Acceptable, as they are both agency staff.",
            "A potential breach of confidentiality because the other staff member doesn't have a 'need-to-know'.",
            "Fine, as long as they keep their voices down.",
            "Only a problem if the client's name is mentioned."
          ],
          correctAnswer: 1,
          explanation: "Client information should only be shared with those directly involved in their care or who have a legitimate job-related need to know. Discussing specific details with uninvolved staff is a breach of confidentiality."
        },
        {
          id: "q6-mod3-rc",
          question: "Which of the following is a 'DO' regarding health and safety?",
          options: [
            "Using a piece of equipment you suspect is faulty because you're in a hurry.",
            "Skipping handwashing between clients if you're wearing gloves.",
            "Proactively checking the client's environment for potential hazards like loose rugs or clutter.",
            "Storing cleaning supplies in an unlocked cabinet in a client's bathroom."
          ],
          correctAnswer: 2,
          explanation: "Proactively identifying and mitigating safety risks, such as checking for environmental hazards, is a key DSP responsibility. The other options represent unsafe practices."
        }
      ]
    }
  ],

};
