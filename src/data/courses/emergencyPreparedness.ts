
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
        },
        {
          id: "q4-mod1",
          question: "Why might social stories be helpful when preparing someone with a developmental disability for emergency situations?",
          options: [
            "They're entertaining and keep people occupied during emergencies", 
            "They help familiarize individuals with what to expect in a non-threatening way", 
            "They're only useful for children", 
            "They replace the need for actual emergency drills"
          ],
          correctAnswer: 1,
          explanation: "Social stories help familiarize individuals with what to expect during emergency situations in a non-threatening way. They can reduce anxiety by explaining procedures, sensory experiences, and expectations before they occur in a high-stress situation."
        },
        {
          id: "q5-mod1",
          question: "What is an important consideration regarding medication in an emergency plan?",
          options: [
            "Medications aren't important during emergencies", 
            "Having a 72-hour supply and storage plan for medications that require refrigeration", 
            "Substituting with over-the-counter alternatives", 
            "Discontinuing all medications during emergencies"
          ],
          correctAnswer: 1,
          explanation: "Emergency plans should include having a 72-hour supply of essential medications and a plan for storing medications that require refrigeration during power outages. Consistent access to necessary medications can be critical during emergencies."
        },
        {
          id: "q6-mod1",
          question: "Why should comfort items be included in an evacuation plan?",
          options: [
            "They're only included to meet regulations", 
            "They help reduce anxiety and provide emotional support during stressful situations", 
            "They're unnecessary luxuries during emergencies", 
            "They're only for children, not adults with developmental disabilities"
          ],
          correctAnswer: 1,
          explanation: "Comfort items (like familiar objects, sensory tools, or preferred items) help reduce anxiety and provide emotional support during stressful emergency situations. They can be particularly important for individuals who have difficulty with transitions or sensory sensitivities."
        },
        {
          id: "q7-mod1",
          question: "Who should have copies of an individual's emergency plan?",
          options: [
            "Only supervisors", 
            "All support staff, family members, and the individual when appropriate", 
            "Only medical professionals", 
            "Only the person who wrote the plan"
          ],
          correctAnswer: 1,
          explanation: "Emergency plans should be shared with all support staff, family members, and the individual (when appropriate). Everyone involved in supporting the person should understand the procedures to ensure consistent implementation during an emergency."
        },
        {
          id: "q8-mod1",
          question: "What information should be communicated to emergency responders about an individual with developmental disabilities?",
          options: [
            "Only their name", 
            "Their diagnosis label only", 
            "Specific needs, communication methods, and effective support strategies", 
            "Their complete medical history"
          ],
          correctAnswer: 2,
          explanation: "Emergency responders should be informed about specific needs, communication methods, and effective support strategies. This might include how the person communicates, what causes distress, calming techniques, and any critical medical information."
        },
        {
          id: "q9-mod1",
          question: "Why is it important to consider sensory sensitivities in emergency planning?",
          options: [
            "It's not important; emergencies override sensory concerns", 
            "Sensory overload can lead to increased anxiety, freezing behavior, or resistance that impedes evacuation", 
            "Only as a legal requirement", 
            "Only for individuals with autism"
          ],
          correctAnswer: 1,
          explanation: "Sensory sensitivities to alarms, lights, crowds, or other emergency stimuli can cause sensory overload leading to increased anxiety, freezing behavior, or resistance that impedes evacuation. Planning for these reactions can improve emergency response."
        },
        {
          id: "q10-mod1",
          question: "What is post-emergency emotional support?",
          options: [
            "Financial assistance after an emergency", 
            "Support provided to address trauma, anxiety, and disruption after an emergency situation", 
            "Only available through professional counselors", 
            "Only necessary after major disasters"
          ],
          correctAnswer: 1,
          explanation: "Post-emergency emotional support addresses trauma, anxiety, and disruption that may occur after an emergency situation. It recognizes that the impact of emergencies continues beyond the immediate event and may require ongoing support and processing."
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
        },
        {
          id: "q4-mod2",
          question: "Which fire safety practice is most important for prevention?",
          options: [
            "Painting all walls with fire-retardant paint", 
            "Keeping walkways and exits clear at all times", 
            "Installing marble flooring", 
            "Removing all electrical appliances"
          ],
          correctAnswer: 1,
          explanation: "Keeping walkways and exits clear at all times is crucial for fire safety prevention. This ensures that in case of an emergency, everyone can evacuate quickly without obstacles blocking escape routes."
        },
        {
          id: "q5-mod2",
          question: "When should you check the contents of emergency go-kits?",
          options: [
            "Only after using them", 
            "Regularly, at least every 6 months", 
            "Only when moving to a new residence", 
            "Only when there's a weather warning"
          ],
          correctAnswer: 1,
          explanation: "Emergency go-kits should be checked regularly, at least every 6 months. This ensures that medications haven't expired, food is still good, batteries work, documents are current, and any seasonal items are appropriate."
        },
        {
          id: "q6-mod2",
          question: "What should you do if there is smoke in a building during a fire?",
          options: [
            "Run as quickly as possible", 
            "Stand up tall to get above the smoke", 
            "Stay low where the air is clearer", 
            "Open windows to clear the smoke"
          ],
          correctAnswer: 2,
          explanation: "If there is smoke during a fire, stay low where the air is clearer. Smoke rises, so the air near the floor typically has less smoke and is cooler, making breathing easier and reducing exposure to toxic gases."
        },
        {
          id: "q7-mod2",
          question: "Why is it dangerous to walk or drive through flood waters?",
          options: [
            "It will get your clothes wet", 
            "It's only dangerous for children", 
            "Even shallow moving water can sweep people and vehicles away, and water may hide hazards", 
            "It's only dangerous during thunderstorms"
          ],
          correctAnswer: 2,
          explanation: "Even shallow moving water can be powerful enough to sweep people and vehicles away. Additionally, flood waters may hide hazards like submerged objects, open manholes, electrical hazards, or contamination. The CDC advises 'Turn Around, Don't Drown.'"
        },
        {
          id: "q8-mod2",
          question: "What adaptations might be needed for fire safety for someone with a hearing impairment?",
          options: [
            "No special adaptations are necessary", 
            "Visual alarm systems with flashing lights", 
            "Louder alarms only", 
            "Constant supervision"
          ],
          correctAnswer: 1,
          explanation: "Visual alarm systems with flashing lights are an important adaptation for individuals with hearing impairments. These systems provide a visual notification when smoke or fire alarms are activated, ensuring everyone receives emergency alerts."
        },
        {
          id: "q9-mod2",
          question: "Where is the safest place to be during a tornado?",
          options: [
            "Near windows to watch the storm", 
            "In a vehicle trying to outrun it", 
            "The lowest level in an interior room without windows", 
            "Under a highway overpass"
          ],
          correctAnswer: 2,
          explanation: "The safest place during a tornado is the lowest level of a building (basement or first floor) in an interior room without windows (e.g., bathroom, closet, hallway). This provides the most protection from flying debris, which is the greatest danger during tornados."
        },
        {
          id: "q10-mod2",
          question: "What special consideration for medical equipment should be included in power outage planning?",
          options: [
            "Plan to discontinue use of all electrical equipment", 
            "Have backup power sources for essential medical equipment", 
            "Always immediately evacuate to a hospital", 
            "Medical equipment is always automatically switched to emergency power"
          ],
          correctAnswer: 1,
          explanation: "Plans for power outages should include backup power sources (generators, battery backups, etc.) for essential medical equipment like oxygen concentrators, feeding pumps, or communication devices. This preparation can be life-saving for individuals dependent on powered medical equipment."
        }
      ],
      audioUrl: "https://example.com/audio/fire-and-disasters.mp3",
      transcript: "This audio lesson covers specific procedures for handling fires and natural disasters while supporting individuals with developmental disabilities. We discuss prevention strategies, appropriate responses, and how to adapt emergency procedures for different needs. We also detail what should be included in emergency go-kits."
    }
  ]
};
