
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
      videoUrl: "https://www.youtube.com/embed/e2gFKX-jjL8",
      content: `
# Medication Safety Principles

Medication administration is a critical responsibility for many Direct Support Professionals. Safe medication practices protect the health and well-being of the individuals you support.

## The Five Rights of Medication Administration

Always verify these five elements before administering any medication:

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
          question: "What is the most important step before administering any medication?",
          options: ["Recording the time", "Checking the 'five rights' of medication administration", "Washing your hands", "Asking the client if they want the medication"],
          correctAnswer: 1,
          explanation: "The 'five rights' (right patient, right medication, right dose, right time, right route) are essential safety checks before any medication administration."
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
          question: "When should you check the medication label when administering medications?",
          options: [
            "Once, when preparing the medication", 
            "Three times: when taking from storage, before preparing, and before returning to storage", 
            "Only when you're unfamiliar with the medication", 
            "Only when administering controlled substances"
          ],
          correctAnswer: 1,
          explanation: "Medication labels should be checked three times during the administration process: when taking the medication from storage, before preparing or pouring it, and before returning the container to storage. This triple-check helps prevent errors."
        }
      ],
      audioUrl: "https://example.com/audio/medication-safety.mp3",
      transcript: "This audio segment covers the essential principles of medication safety, including the five rights of medication administration, proper documentation requirements, and what to do if a medication error occurs. We emphasize the importance of following protocols and understanding your scope of practice."
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
        }
      ],
      audioUrl: "https://example.com/audio/common-medications.mp3",
      transcript: "In this audio lesson, we discuss common medications prescribed for individuals with developmental disabilities, their uses, and potential side effects. We emphasize the importance of observation and reporting, and outline when side effects should prompt immediate medical attention."
    }
  ]
};
