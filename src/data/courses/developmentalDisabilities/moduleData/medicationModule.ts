
import { Module } from '@/data/courseTypes';

export const medicationModule: Module = {
  id: "medication-administration",
  title: "Medication Administration",
  description: "Learn safe medication administration practices for DSPs working with individuals with developmental disabilities.",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  content: `
# Medication Administration for DSPs

## Understanding Medication Responsibilities

As a Direct Support Professional, you play a critical role in medication administration. Your responsibilities include:

- **Assistance, not prescribing**: DSPs help clients take their prescribed medications but never prescribe medications
- **Following care plans**: Always adhere to detailed medication plans created by healthcare professionals
- **Documentation**: Maintain accurate records of all medications administered
- **Observation**: Monitor for side effects and report concerns immediately

## The 5 Rights of Medication Administration

Every time you assist with medication, remember the 5 Rights:

1. **Right Person** - Verify you're giving medication to the correct individual
2. **Right Medication** - Check that you have the correct medication
3. **Right Dose** - Ensure you're administering the correct amount
4. **Right Time** - Administer medication at the prescribed time
5. **Right Method** - Use the correct route of administration

## Proper Documentation Practices

Documentation protects both you and the individuals you support. Always:

- Record immediately after administration
- Note the exact time of administration
- Document any refusals or missed doses
- Use clear, objective language
- Never document medications before administering them

## Recognizing Side Effects

Be vigilant for potential medication side effects such as:

- Drowsiness or confusion
- Skin rashes or hives
- Gastrointestinal issues
- Behavioral changes
- Vital sign changes (blood pressure, pulse)

If you observe any concerning symptoms, contact your supervisor immediately.
  `,
  audioUrl: "https://example.com/audio-file.mp3",
  transcript: "This is a transcript of the medication administration audio lesson covering the 5 Rights of medication administration and proper documentation practices.",
  questions: [
    {
      id: "med-q1",
      question: "What are the 5 Rights of medication administration?",
      options: [
        "Right person, right medication, right dose, right time, right method",
        "Right prescription, right pharmacy, right doctor, right time, right person",
        "Right form, right color, right size, right smell, right taste", 
        "Right container, right label, right expiration, right storage, right disposal"
      ],
      correctAnswer: 0,
      explanation: "The 5 Rights are: right person, right medication, right dose, right time, and right method. These five checks help ensure safe medication administration."
    },
    {
      id: "med-q2",
      question: "As a DSP, you are allowed to prescribe medications when needed.",
      options: [
        "True", 
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. DSPs are never allowed to prescribe medications. This is only done by qualified medical professionals like doctors or nurse practitioners."
    },
    {
      id: "med-q3",
      question: "When should you document medication administration?",
      options: [
        "At the beginning of your shift for all medications you plan to give",
        "Immediately after the medication is administered",
        "At the end of your shift for all medications given that day",
        "Only when there's a problem or side effect"
      ],
      correctAnswer: 1,
      explanation: "Medication should be documented immediately after administration to ensure accuracy and prevent errors."
    }
  ],
  flashcards: [
    { 
      id: "med-fc1", 
      term: "5 Rights", 
      definition: "Right person, right medication, right dose, right time, and right method - essential checks to ensure safe medication administration."
    },
    { 
      id: "med-fc2", 
      term: "PRN Medication", 
      definition: "Medication given 'as needed' rather than on a fixed schedule. Requires documentation of both administration and effectiveness."
    },
    { 
      id: "med-fc3", 
      term: "Side Effect", 
      definition: "An unintended reaction to medication that may require monitoring or intervention."
    }
  ],
  faqs: [
    {
      question: "Can I crush medications if the person has trouble swallowing pills?",
      answer: "Not all medications can be crushed safely. Some medications have special coatings or time-release properties that would be compromised by crushing. Always check with a pharmacist or the prescribing doctor before altering any medication."
    },
    {
      question: "What should I do if I make a medication error?",
      answer: "Immediately report the error to your supervisor and follow your organization's protocol. Document the error and what actions were taken. Depending on the medication and error, medical intervention may be required."
    },
    {
      question: "How should I handle medication refusals?",
      answer: "Respect the individual's right to refuse medication, but document the refusal. Try to understand why they are refusing, and report this to your supervisor. Never force someone to take medication or hide medication in food without proper authorization."
    }
  ]
};
