
import { Course } from '../courseTypes';

export const medicationAdminCourse: Course = {
  id: "medication-admin",
  title: "Medication Administration Basics",
  description: "Essential knowledge and skills for safely administering medications to individuals with developmental disabilities.",
  category: "Healthcare",
  instructor: "Dr. Marcus Lee, PharmD",
  thumbnail: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de",
  duration: "3 hours",
  modules: [
    {
      id: "mod-1",
      title: "Medication Safety Principles",
      description: "Learn the core principles of medication safety and proper administration techniques.",
      videoUrl: "https://www.youtube.com/watch?v=H9t-Hy69ZEY",
      content: `
# Medication Safety Principles

Medication administration is a critical responsibility for many Direct Support Professionals. Safe medication practices protect the health and well-being of the individuals you support.

## The Seven Rights of Medication Administration

Always verify these seven elements before administering any medication:

### 1. Right Person
- Check identification to ensure medication is given to correct individual
- Use at least two identifiers (name, photo, date of birth)
- Be familiar with the individual and their medication regimen

### 2. Right Medication
- Check the medication label three times:
  - When taking the medication from storage
  - Before preparing or pouring the medication
  - Before returning the container to storage
- Check expiration dates
- Know the purpose of each medication

### 3. Right Dose
- Verify the prescribed dose on the medication order
- Understand basic measurements (mg, ml, etc.)
- Use proper measuring devices
- Never guess about dosage

### 4. Right Time
- Administer medications at prescribed times
- Understand timing terminology (daily, BID, PRN, etc.)
- Document time of administration
- Know which medications must be given with food or on empty stomach

### 5. Right Route
- Confirm correct method of administration
  - Oral (by mouth)
  - Topical (applied to skin)
  - Sublingual (under tongue)
  - Rectal or vaginal
  - Other routes require specialized training

### 6. Right Documentation
- Document immediately after administration
- Include all required information: medication, dose, time, initials
- Document any refusals, missed doses, or PRN effectiveness
- Follow your organization's specific documentation requirements

### 7. Right Reason
- Know why the person is taking each medication
- Understand what symptoms the medication treats
- Be alert to whether the medication is working as intended
- Report if the medication doesn't seem to be addressing the condition

## Documentation Requirements

Always document:
- Medication given
- Dose administered
- Time of administration
- Any refusals or missed doses
- Observations of effects or side effects

## DSP Scope of Practice

As a DSP, you may:
- Administer medication according to orders
- Document properly
- Monitor for side effects
- Report concerns

You may NOT:
- Adjust dosages without orders
- Discontinue medications
- Provide medical advice
- Administer certain types of medications without special training

## Reporting Medication Errors

If a medication error occurs:
1. Ensure the individual's safety
2. Notify your supervisor immediately
3. Contact medical professionals as needed
4. Document the error
5. Participate in process improvement

Remember: Medication errors are serious but reporting them promptly is essential for individual safety and system improvement.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "How many 'rights' are there in the current best practice of medication administration?",
          options: ["Five", "Seven", "Nine", "Three"],
          correctAnswer: 1,
          explanation: "Current best practice identifies seven rights of medication administration: right person, right medication, right dose, right time, right route, right documentation, and right reason."
        },
        {
          id: "q2-mod1",
          question: "What should a DSP do if they realize they've given the wrong medication to someone?",
          options: [
            "Wait to see if there are any negative effects before reporting", 
            "Immediately notify their supervisor and follow emergency protocols", 
            "Give the correct medication right away to make up for the error", 
            "Document the error but only tell the supervisor during regular hours"
          ],
          correctAnswer: 1,
          explanation: "Medication errors require immediate reporting to your supervisor and following emergency protocols as needed. The individual's safety is the priority, and prompt action is essential."
        },
        {
          id: "q3-mod1",
          question: "What does 'PRN' mean in medication administration?",
          options: [
            "Patient requires notification", 
            "Prescribe right now", 
            "As needed", 
            "Post regular nighttime"
          ],
          correctAnswer: 2,
          explanation: "PRN stands for 'pro re nata' in Latin, which means 'as needed.' PRN medications are given only when necessary according to specific conditions or symptoms described in the medication order."
        },
        {
          id: "q4-mod1",
          question: "Which of the following is one of the seven rights of medication administration?",
          options: [
            "Right cabinet", 
            "Right documentation", 
            "Right facility", 
            "Right temperature"
          ],
          correctAnswer: 1,
          explanation: "Right documentation is one of the seven rights of medication administration, emphasizing the importance of properly recording all medication-related activities."
        },
        {
          id: "q5-mod1",
          question: "What does 'BID' mean on a medication order?",
          options: [
            "Before initial dose",
            "Bring in doctor",
            "Twice daily",
            "Before important decisions"
          ],
          correctAnswer: 2,
          explanation: "BID is a Latin abbreviation for 'bis in die' which means twice daily. This indicates the medication should be administered two times per day, typically with about 12 hours between doses."
        },
        {
          id: "q6-mod1",
          question: "Why is 'right reason' important in medication administration?",
          options: [
            "It ensures medications are only given for approved diagnoses",
            "It helps DSPs determine if a medication is working as intended",
            "It allows DSPs to change medications when needed",
            "It's required by federal regulations"
          ],
          correctAnswer: 1,
          explanation: "The 'right reason' principle ensures that DSPs understand why a medication is being given and can monitor whether it is effectively addressing the intended condition or symptoms."
        },
        {
          id: "q7-mod1",
          question: "As a DSP, which of the following is within your scope of practice regarding medications?",
          options: [
            "Adjusting dosages when you think it's appropriate",
            "Administering medication according to orders and documenting properly",
            "Discontinuing medications that seem to cause side effects",
            "Recommending over-the-counter alternatives"
          ],
          correctAnswer: 1,
          explanation: "DSPs may administer medication according to orders, document properly, monitor for side effects, and report concerns. They may NOT adjust dosages, discontinue medications, provide medical advice, or administer certain types of medications without special training."
        },
        {
          id: "q8-mod1",
          question: "What are 'identifiers' used for in medication administration?",
          options: [
            "To label medication bottles",
            "To verify you're giving medication to the correct person",
            "To determine the dose of medication",
            "To decide what time to give medication"
          ],
          correctAnswer: 1,
          explanation: "Identifiers are used to verify you're giving medication to the correct person. Using at least two identifiers (such as name, photo, date of birth) helps ensure medication is administered to the right individual, preventing medication errors."
        },
        {
          id: "q9-mod1",
          question: "If someone refuses their medication, what should a DSP do?",
          options: [
            "Force them to take it since it's prescribed",
            "Crush the medication and hide it in their food",
            "Document the refusal and notify appropriate staff according to policy",
            "Simply skip the dose and say nothing"
          ],
          correctAnswer: 2,
          explanation: "If someone refuses medication, the DSP should document the refusal and notify appropriate staff according to agency policy. Forcing medication or hiding it in food violates rights and is unethical. Simply skipping without documentation creates a dangerous gap in information."
        },
        {
          id: "q10-mod1",
          question: "What is the purpose of the 'right route' principle in medication administration?",
          options: [
            "To ensure medications are delivered via the correct method of administration",
            "To determine the fastest way to give medication",
            "To plan the best driving route to deliver medications",
            "To determine which staff member should administer medication"
          ],
          correctAnswer: 0,
          explanation: "The 'right route' principle ensures that medications are delivered via the correct method of administration (e.g., oral, topical, sublingual). Using the wrong route can cause harm or reduce effectiveness of the medication."
        }
      ],
      audioUrl: "https://example.com/audio/medication-safety.mp3",
      transcript: "This audio segment covers the essential principles of medication safety, including the seven rights of medication administration, proper documentation requirements, and what to do if a medication error occurs. We emphasize the importance of following protocols and understanding your scope of practice."
    },
    {
      id: "mod-2",
      title: "Common Medications and Side Effects",
      description: "Overview of medications commonly prescribed for individuals with developmental disabilities and their potential side effects.",
      videoUrl: "https://www.youtube.com/embed/XN69dzX07_g",
      content: `
# Common Medications and Side Effects

Understanding common medications and their side effects helps Direct Support Professionals provide better care and monitor for potential concerns. This overview is informational—always refer to medical professionals for specific guidance.

## Categories of Common Medications

### 1. Antipsychotics
**Examples:** Risperidone, Aripiprazole, Quetiapine
**Used for:** Managing challenging behaviors, psychosis, severe anxiety
**Common side effects:**
- Drowsiness
- Weight gain
- Dry mouth
- Movement disorders (tremors, stiffness)
- Metabolic changes (blood sugar, cholesterol)

### 2. Mood Stabilizers
**Examples:** Valproate, Lamotrigine, Lithium
**Used for:** Mood swings, behavioral regulation, seizure control
**Common side effects:**
- Nausea
- Tremor
- Weight changes
- Coordination problems
- Liver effects (requires monitoring)

### 3. Anti-anxiety Medications
**Examples:** Lorazepam, Buspirone
**Used for:** Anxiety, agitation
**Common side effects:**
- Sedation
- Dizziness
- Balance problems
- Potential for dependence (benzodiazepines)
- Memory issues

### 4. Antidepressants
**Examples:** Fluoxetine, Sertraline, Escitalopram
**Used for:** Depression, anxiety, OCD behaviors
**Common side effects:**
- Nausea
- Headache
- Sleep changes
- Sexual dysfunction
- Initial increase in anxiety

### 5. Stimulants
**Examples:** Methylphenidate, Amphetamine compounds
**Used for:** ADHD, attention issues
**Common side effects:**
- Decreased appetite
- Sleep difficulties
- Increased heart rate and blood pressure
- Irritability
- Rebound effects when wearing off

### 6. Anti-seizure Medications
**Examples:** Levetiracetam, Carbamazepine, Phenytoin
**Used for:** Seizure disorders, sometimes mood stabilization
**Common side effects:**
- Dizziness
- Fatigue
- Vision changes
- Coordination problems
- Cognitive effects

## When to Be Concerned

Contact medical professionals immediately if you observe:
- Severe allergic reactions (rash, swelling, difficulty breathing)
- Extreme sedation or inability to wake
- Falls or significant confusion
- New or unusual behaviors
- Suicidal thoughts or statements
- Seizure activity
- Severe vomiting or diarrhea

## Monitoring Guidelines

For effective medication monitoring:
- Know baseline behaviors and functioning
- Document changes objectively
- Use consistent observation techniques
- Report patterns, not just isolated incidents
- Consider environmental factors that might influence medication effects

Remember: As a DSP, your role is to observe and report, not diagnose or adjust medications. Regular communication with healthcare providers is essential.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "Which of these would require IMMEDIATE medical attention?",
          options: [
            "Slight drowsiness after taking a new medication", 
            "Mild dry mouth", 
            "Difficulty breathing and facial swelling after taking medication", 
            "Temporary loss of appetite"
          ],
          correctAnswer: 2,
          explanation: "Difficulty breathing and facial swelling suggest a potentially severe allergic reaction that requires immediate medical attention. This could be anaphylaxis, which is life-threatening."
        },
        {
          id: "q2-mod2",
          question: "What is a common side effect of antipsychotic medications?",
          options: [
            "Increased energy levels", 
            "Weight gain", 
            "Hair loss", 
            "Improved concentration"
          ],
          correctAnswer: 1,
          explanation: "Weight gain is a common side effect of many antipsychotic medications. Monitoring weight and metabolic changes is an important part of supporting someone taking these medications."
        },
        {
          id: "q3-mod2",
          question: "As a DSP, what is your responsibility regarding medication side effects?",
          options: [
            "Adjust medications to reduce side effects", 
            "Research alternative medications", 
            "Observe and document side effects and report them to appropriate medical staff", 
            "Discontinue medications that cause any side effects"
          ],
          correctAnswer: 2,
          explanation: "A DSP's role is to observe and document side effects and report them to appropriate medical staff. DSPs should never adjust, discontinue, or substitute medications, as these actions require medical authorization."
        },
        {
          id: "q4-mod2",
          question: "Why is it important to know an individual's baseline behaviors when monitoring medication effects?",
          options: [
            "To report to law enforcement",
            "To determine medication dosages",
            "To compare current behaviors to typical behaviors and identify meaningful changes",
            "To decide which medications to give"
          ],
          correctAnswer: 2,
          explanation: "Knowing baseline behaviors provides a point of comparison to identify meaningful changes that might be related to medication effects or side effects. Without this baseline knowledge, it's difficult to determine what changes are significant."
        },
        {
          id: "q5-mod2",
          question: "Which medication category is most often associated with a risk of physical dependence?",
          options: [
            "Antidepressants",
            "Benzodiazepines (anti-anxiety medications)",
            "Anticonvulsants",
            "Vitamins"
          ],
          correctAnswer: 1,
          explanation: "Benzodiazepines, which are often prescribed for anxiety, carry a risk of physical dependence with long-term use. This class includes medications like lorazepam, diazepam, and alprazolam."
        },
        {
          id: "q6-mod2",
          question: "What might be a sign that a mood stabilizer is causing a serious side effect?",
          options: [
            "Slightly improved mood",
            "Mild thirst",
            "Unusual bruising or bleeding",
            "Occasional headache"
          ],
          correctAnswer: 2,
          explanation: "Unusual bruising or bleeding can indicate serious blood disorders that are rare but serious side effects of some mood stabilizers. This symptom should be reported to medical professionals immediately."
        },
        {
          id: "q7-mod2",
          question: "Why are stimulant medications often taken early in the day rather than evening?",
          options: [
            "They're more effective in the morning",
            "They're less expensive when taken in the morning",
            "They can cause sleep difficulties if taken later",
            "There's no reason; timing doesn't matter"
          ],
          correctAnswer: 2,
          explanation: "Stimulant medications are typically taken early in the day because they can cause sleep difficulties if taken later. Their stimulating effects can interfere with falling asleep or staying asleep if present in the system at bedtime."
        },
        {
          id: "q8-mod2",
          question: "What environmental factor might affect how a medication works?",
          options: [
            "The color of the pill",
            "The weather outside",
            "The material of the furniture",
            "Stress levels and activity patterns"
          ],
          correctAnswer: 3,
          explanation: "Environmental factors like stress levels, activity patterns, diet, sleep quality, and other aspects of the person's life may influence how medications work or how side effects are experienced. These factors should be considered when monitoring medication effects."
        },
        {
          id: "q9-mod2",
          question: "When documenting medication effects, what approach is most helpful?",
          options: [
            "Using general terms like 'good day' or 'bad day'",
            "Writing detailed personal opinions about the medication",
            "Recording specific, objective observations about behaviors and symptoms",
            "Only documenting when there are problems"
          ],
          correctAnswer: 2,
          explanation: "Recording specific, objective observations about behaviors and symptoms provides the most useful information for healthcare providers. This might include frequency, duration, and intensity of symptoms or behaviors rather than subjective judgments."
        },
        {
          id: "q10-mod2",
          question: "Which statement about anti-seizure medications is accurate?",
          options: [
            "They can be safely stopped abruptly if seizures seem controlled",
            "They should never be taken with food",
            "They may affect coordination and alertness, requiring safety precautions",
            "They only need to be taken when seizure activity is observed"
          ],
          correctAnswer: 2,
          explanation: "Anti-seizure medications may affect coordination, balance, alertness, or vision, which may require additional safety precautions to prevent falls or injuries. Never stopping these medications abruptly is also critically important, as this can trigger severe seizures."
        }
      ],
      audioUrl: "https://example.com/audio/common-medications.mp3",
      transcript: "In this audio lesson, we discuss common medications prescribed for individuals with developmental disabilities, their uses, and potential side effects. We emphasize the importance of observation and reporting, and outline when side effects should prompt immediate medical attention."
    }
  ]
};
