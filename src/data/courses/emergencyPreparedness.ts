
import { Course } from '../courseTypes';

export const emergencyPreparedness: Course = {
  id: "emergency-preparedness",
  title: "Emergency and Disaster Preparedness",
  description: "Learn essential skills for emergency response and disaster preparedness when supporting individuals with developmental disabilities.",
  category: "Safety",
  instructor: "Michael Torres, Emergency Response Specialist",
  thumbnail: "https://images.unsplash.com/photo-1503266980949-bd30d04d0b75",
  duration: "2 hours",
  modules: [
    {
      id: "mod-1",
      title: "Personal Safety and Emergency Response Plans",
      description: "Learn how to create and implement effective emergency response plans for individuals with developmental disabilities.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      content: `
# Personal Safety and Emergency Response Plans

As a Direct Support Professional, being prepared for emergencies is a critical responsibility. Proper planning can save lives and reduce trauma when emergencies occur.

## Understanding Individual Needs in Emergencies

People with developmental disabilities may face unique challenges during emergencies, including:

- Communication difficulties during high-stress situations
- Sensory sensitivities to alarms, lights, or crowding
- Mobility challenges affecting evacuation
- Difficulty understanding abstract concepts like danger
- Dependence on medication, equipment, or specific routines
- Heightened anxiety in unfamiliar or chaotic situations

## Creating Personalized Emergency Plans

Every individual should have a personalized emergency plan that addresses:

### 1. Evacuation Procedures
- Primary and secondary escape routes
- Meeting points outside the residence
- Transportation considerations
- Physical assistance requirements
- Comfort items to reduce anxiety

### 2. Medical Needs
- Medication requirements and storage
- Medical equipment needs and backup power
- Important medical information (conditions, allergies, etc.)
- Emergency contacts including physicians
- Communication with emergency responders about specific needs

### 3. Communication Strategies
- How to effectively communicate during an emergency
- Alternative communication methods if primary method is unavailable
- Visual supports for emergency procedures
- Simple, concrete instructions for each emergency type
- Regular practice and reinforcement

## Implementing Your Plan

For effective implementation:

1. Document the plan in writing with visual supports
2. Share the plan with all support staff, family members, and the individual
3. Store copies in accessible locations
4. Review and update regularly (at least every 6 months)
5. Practice different scenarios frequently
6. Coordinate with local emergency services when appropriate

## Building Resilience

Beyond physical safety, emergency planning should consider emotional wellbeing:

- Prepare individuals for what to expect during drills
- Create social stories about emergency situations
- Develop coping strategies for anxiety during emergencies
- Identify comfort items that can be quickly grabbed
- Plan for post-emergency emotional support

Remember that preparation reduces panic. Regular practice of emergency procedures helps build confidence and competence for both support professionals and individuals with disabilities.
`,
      questions: [
        {
          id: "q1-mod1",
          question: "How often should emergency plans be reviewed and updated?",
          options: ["Once a year", "At least every 6 months", "Only when the individual moves to a new residence", "Only after an emergency occurs"],
          correctAnswer: 1,
          explanation: "Emergency plans should be reviewed and updated at least every 6 months to ensure they remain current and effective. Changes in the individual's needs, medications, mobility, or environment may require updates to the plan."
        },
        {
          id: "q2-mod1",
          question: "What should be considered when creating evacuation procedures for someone with developmental disabilities?",
          options: [
            "Only the fastest route out of the building", 
            "Multiple escape routes, meeting points, transportation needs, and comfort items", 
            "Only the needs of the staff members assisting", 
            "Only the legal requirements for the facility"
          ],
          correctAnswer: 1,
          explanation: "Effective evacuation procedures should consider multiple factors, including primary and secondary escape routes, designated meeting points, transportation considerations, physical assistance needs, and comfort items that may help reduce anxiety during evacuation."
        },
        {
          id: "q3-mod1",
          question: "Why is it important to practice emergency procedures regularly?",
          options: [
            "It's required by law", 
            "It builds muscle memory and reduces panic when real emergencies occur", 
            "It's only important for new staff members", 
            "It's only necessary once a year"
          ],
          correctAnswer: 1,
          explanation: "Regular practice builds familiarity with emergency procedures, creating muscle memory that can reduce panic and confusion during actual emergencies. Practice helps both staff and individuals with disabilities respond more effectively under stress."
        }
      ],
      audioUrl: "https://example.com/audio/emergency-plans.mp3",
      transcript: "In this audio segment, we discuss the importance of personalized emergency planning for individuals with developmental disabilities. We cover how to assess individual needs, create comprehensive plans addressing evacuation, medical needs, and communication, and emphasize the importance of regular practice and updates."
    },
    {
      id: "mod-2",
      title: "Fire Safety and Natural Disaster Procedures",
      description: "Learn specific procedures for handling fire emergencies and natural disasters while supporting individuals with developmental disabilities.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      content: `
# Fire Safety and Natural Disaster Procedures

Different emergencies require different responses. This module covers specific procedures for various emergency situations that Direct Support Professionals should be prepared to handle.

## Fire Safety

### Prevention
- Keep walkways and exits clear at all times
- Store flammable items properly
- Check electrical equipment regularly
- Install and maintain smoke detectors
- Never leave cooking unattended
- Be cautious with space heaters and candles

### Response
1. **Activate the alarm** if not already sounding
2. **Assess the situation** quickly but thoroughly
3. **Evacuate** following established routes
   - Close doors behind you
   - Stay low if smoke is present
   - Use stairs, not elevators
4. **Account for everyone** at the designated meeting spot
5. **Call emergency services** (if not automatically notified)
6. **Provide critical information** about individuals with special needs

### Adaptations for Different Needs
- Visual alarms for those with hearing impairments
- Tactile evacuation maps
- Buddy systems for those needing assistance
- Evacuation chairs for those with mobility challenges
- Clear, simple instructions in accessible formats

## Natural Disaster Procedures

### Earthquake Safety
- **During shaking:** Drop, cover, and hold on
- **If in wheelchair:** Lock wheels and cover head
- **After shaking:** Check for injuries and hazards before moving
- Evacuate if necessary, watching for fallen debris
- Be prepared for aftershocks

### Tornado Safety
- Move to lowest level, interior room without windows
- Cover with blankets or mattresses if available
- Help individuals maintain calm during loud noises
- Keep emergency radio for updates
- Have comfort items accessible

### Flood Safety
- Move to higher ground immediately
- Never walk or drive through moving water
- Have waterproof emergency kits prepared
- Know evacuation routes that avoid flood-prone areas

### Power Outage Procedures
- Have battery-powered lighting accessible
- Maintain temperature safety (especially important for those with temperature regulation issues)
- Have backup power for essential medical equipment
- Keep refrigerated medications cold (have a plan)
- Have alternative communication methods ready

## Creating Go-Kits

Every residence should have emergency "go-kits" that include:

- 72-hour supply of medications
- Copies of important documents
- Emergency contact information
- Water and non-perishable food
- First aid supplies
- Comfort items and sensory supports
- Communication aids
- Backup power banks for devices
- Personal hygiene supplies
- Cash in small denominations

Remember to customize go-kits for each individual's specific needs, and check contents regularly to ensure nothing has expired.
`,
      questions: [
        {
          id: "q1-mod2",
          question: "What should you do if a fire alarm sounds?",
          options: [
            "Ignore it if you don't see fire immediately", 
            "Call the fire department first to confirm it's a real emergency", 
            "Evacuate following established routes and meet at the designated spot", 
            "Open windows to let smoke escape"
          ],
          correctAnswer: 2,
          explanation: "When a fire alarm sounds, you should evacuate immediately following established evacuation routes and proceed to the designated meeting spot. Don't waste time investigating the alarm or gathering belongings - safety is the priority."
        },
        {
          id: "q2-mod2",
          question: "What should be included in an emergency go-kit?",
          options: [
            "Only basic food and water", 
            "Medications, important documents, water, food, first aid supplies, and individual-specific items", 
            "Only essential clothing", 
            "Only communication devices"
          ],
          correctAnswer: 1,
          explanation: "Emergency go-kits should be comprehensive and include medications, copies of important documents, emergency contacts, water, food, first aid supplies, comfort items, communication aids, backup power sources, and personal care items tailored to each individual's specific needs."
        },
        {
          id: "q3-mod2",
          question: "What is the appropriate action during an earthquake for someone who uses a wheelchair?",
          options: [
            "Immediately try to exit the building", 
            "Transfer to a table or desk if possible", 
            "Lock wheels and protect head and neck", 
            "Unlock wheels to move to safety"
          ],
          correctAnswer: 2,
          explanation: "During an earthquake, a person using a wheelchair should lock the wheels to prevent movement and protect their head and neck from falling objects. Attempting to exit during shaking is dangerous due to falling hazards."
        }
      ],
      audioUrl: "https://example.com/audio/fire-and-disasters.mp3",
      transcript: "This audio lesson covers specific procedures for handling fires and natural disasters while supporting individuals with developmental disabilities. We discuss prevention strategies, appropriate responses, and how to adapt emergency procedures for different needs. We also detail what should be included in emergency go-kits."
    }
  ]
};
