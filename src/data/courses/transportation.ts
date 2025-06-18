import { Course } from '../courseTypes';

export const transportationCourse: Course = {
  id: 'transportation',
  title: 'Safe and Effective Transportation',
  description: 'Learn best practices for providing safe, respectful, and effective transportation for individuals receiving support services.',
  category: 'Health & Safety',
  instructor: 'Steven Bouldin, SHRM-CP',
  thumbnail: '/Images/transport.png',
  duration: '45 min',
  certificateAvailable: true,
  modules: [
    {
      id: 'mod-1',
      title: 'Introduction to Transportation Safety',
      description: 'Understand the importance of safe transportation and your responsibilities as a support professional.',
      videoUrl: 'https://youtu.be/Zp-ZldX0Kl8',
      content: `
# Introduction to Transportation Safety

Providing transportation is a key part of supporting individuals in the community. Safe and respectful transportation ensures access to opportunities and enhances quality of life.

## Key Responsibilities
- Ensuring vehicle safety and maintenance
- Adhering to seat belt and restraint laws
- Respecting individual preferences and needs
- Practicing defensive driving
- Responding to emergencies

## Vehicle Checks
- Inspect tires, brakes, lights, and fluids before each trip
- Clean and clutter-free interior
- Ensure accessibility equipment is functioning (ramps, lifts, tie-downs)

## Communication
- Explain the trip plan to individuals
- Check for comfort and address concerns
- Use person-first language and respect autonomy

## Emergencies
- Know the emergency procedures for accidents or breakdowns
- Keep emergency contact info and medical needs accessible

      `,
      questions: [
        {
          id: 'q1-mod1',
          question: 'What is a key responsibility when providing transportation?',
          options: [
            'Ensuring vehicle safety and maintenance',
            'Driving as fast as possible',
            'Ignoring individual preferences',
            'Skipping vehicle checks'
          ],
          correctAnswer: 0,
          explanation: 'Support professionals must ensure the vehicle is safe before transporting individuals.'
        },
        {
          id: 'q2-mod1',
          question: 'Why is it important to check accessibility equipment before a trip?',
          options: [
            'To make sure it looks clean',
            'To ensure it functions for those who need it',
            'Because it is required by law only',
            'It is not important'
          ],
          correctAnswer: 1,
          explanation: 'Accessibility equipment must be operational for the safety and inclusion of all riders.'
        },
        {
          id: 'q3-mod1',
          question: 'What should you do if an individual expresses discomfort during a trip?',
          options: [
            'Ignore them',
            'Tell them to be quiet',
            'Check for the cause and address their concerns',
            'Stop the vehicle and end the trip immediately'
          ],
          correctAnswer: 2,
          explanation: 'Listening and responding to concerns ensures respectful and safe transportation.'
        },
        {
          id: 'q4-mod1',
          question: 'Which of the following is NOT a recommended vehicle check before a trip?',
          options: [
            'Inspecting tires',
            'Checking brakes',
            'Ignoring lights',
            'Checking fluids'
          ],
          correctAnswer: 2,
          explanation: 'All vehicle lights should be checked to ensure safe operation.'
        },
        {
          id: 'q5-mod1',
          question: 'What should you do in case of a vehicle emergency?',
          options: [
            'Panic and leave the vehicle',
            'Know and follow emergency procedures',
            'Ignore the situation',
            'Wait for someone else to handle it'
          ],
          correctAnswer: 1,
          explanation: 'Being prepared for emergencies helps keep everyone safe.'
        },
        {
          id: 'q6-mod1',
          question: 'Why is person-first language important during transportation?',
          options: [
            'It is not important',
            'It shows respect for the individual',
            'It is only for documentation',
            'It is required by insurance'
          ],
          correctAnswer: 1,
          explanation: 'Person-first language honors the dignity and preferences of those you support.'
        },
        {
          id: 'q7-mod1',
          question: 'When should you explain the trip plan to individuals?',
          options: [
            'Only if they ask',
            'Before starting the trip',
            'After the trip is finished',
            'Never'
          ],
          correctAnswer: 1,
          explanation: 'Explaining the plan helps individuals feel comfortable and informed.'
        },
        {
          id: 'q8-mod1',
          question: 'What is defensive driving?',
          options: [
            'Driving aggressively',
            'Anticipating hazards and driving safely',
            'Driving slowly at all times',
            'Letting others make decisions'
          ],
          correctAnswer: 1,
          explanation: 'Defensive driving is about being alert and prepared for unexpected situations.'
        },
        {
          id: 'q9-mod1',
          question: 'What should you do if the vehicle breaks down during a trip?',
          options: [
            'Panic',
            'Follow emergency procedures and keep individuals safe',
            'Leave the individuals in the vehicle',
            'Ignore the breakdown'
          ],
          correctAnswer: 1,
          explanation: 'Safety is the priority in any emergency situation.'
        },
        {
          id: 'q10-mod1',
          question: 'Why is it important to keep emergency contact info accessible?',
          options: [
            'It is not important',
            'So you can quickly get help if needed',
            'For decoration',
            'Because the vehicle manual requires it'
          ],
          correctAnswer: 1,
          explanation: 'Having emergency contacts handy ensures prompt response in case of an emergency.'
        }
      ],
      audioUrl: 'https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/audio2/Mastering%20Safe%20Driving%20for%20Support%20Staff.wav',
      transcript: 'This safety training video excerpt focuses on the importance of safe driving practices for employees operating company vehicles. It emphasizes that company drivers are representatives of their employer and must adhere to a higher standard of safety for both personal protection and the companys reputation. Key areas covered include operational and maintenance checks, defensive driving techniques to avoid accidents, evaluating and identifying at-risk drivers, and maintaining pedestrian safety. The overarching message is that safe driving is a shared responsibility between the driver and the organization'
    },
    {
      id: 'mod-2',
      title: 'Safe Loading and Unloading Practices',
      description: 'Learn best practices for safely assisting individuals during vehicle entry and exit.',
      videoUrl: 'https://youtu.be/3tqYxIT1FTU',
      content: `
# Safe Loading and Unloading Practices

Loading and unloading are critical moments for safety in transportation. Proper technique and attention help prevent injuries and ensure dignity for those you support. Most transportation-related incidents occur during these transition periods, making it essential to follow established protocols carefully.

## Pre-Trip Preparation

### Vehicle Positioning
- Park on level ground away from traffic when possible
- Position the vehicle close to curbs or designated loading areas
- Set the parking brake and keep the engine running in extreme weather
- Use hazard lights to alert other drivers during loading/unloading
- If possible, position the vehicle so individuals exit onto sidewalks, not streets

### Environmental Assessment
- Scan the area for potential hazards (ice, uneven surfaces, debris)
- Consider weather conditions that may affect loading/unloading safety
- Identify safe waiting areas if immediate loading isn't possible
- Ensure adequate lighting for early morning or evening transportation
- Check that pathways are clear and accessible

## Communication and Dignity

### Clear Instructions
- Announce steps before they happen: "We're going to unbuckle now"
- Use simple, direct language appropriate to understanding levels
- Confirm understanding before proceeding to each step
- Explain any unexpected changes to routine procedures

### Preserving Dignity
- Provide assistance only as needed to promote independence
- Ask before touching or helping an individual
- Offer choices when possible: "Would you like to hold the handrail or my arm?"
- Ensure privacy needs are respected during transfers
- Never rush individuals, which can lead to anxiety and falls

## Wheelchair and Mobility Device Safety

### Lift Operation
- Inspect the lift before each use for proper functioning
- Never exceed the lift's weight capacity
- Always face the individual outward when using a lift (facing away from vehicle)
- Keep the wheelchair brakes locked while on the lift
- Stand on solid ground, never on the lift with the individual

### Securement Systems
- Use all four tie-down straps for wheelchairs (45-degree angle recommended)
- Secure straps to the wheelchair frame, not removable parts
- Ensure lap and shoulder belts are properly positioned
- Check that securement straps are tight with minimal slack
- Recheck securements after traveling on rough roads

## Special Considerations

### Assisting Ambulatory Individuals
- Offer your arm rather than taking theirs when providing balance support
- Stand slightly behind and to the side when helping on stairs
- Use proper body mechanics to prevent injury to yourself and others
- Be aware of individuals who may have seizures or balance issues
- Ensure proper footwear is worn before walking on slippery surfaces

### Children and Small Individuals
- Use appropriate child restraint systems based on weight/height
- Adjust seat belts to fit properly across hips and shoulders
- Never allow seat belts to cross the neck or face
- Ensure booster seats are properly secured to the vehicle
- Check that car seats are installed according to manufacturer guidelines

## During Unloading

### Systematic Approach
- Exit individuals on the curb side when possible
- Assist one person at a time, never leave others unattended
- Maintain visual contact with all individuals during the process
- Use a consistent unloading order to establish routine
- For group transportation, designate waiting areas away from the vehicle

### Safety Checks
- Account for all personal belongings before departure
- Scan vehicle seats and floor for forgotten items
- Conduct a final walk-through of the vehicle before leaving
- Confirm all individuals have safely reached their destination
- Document any unusual occurrences during loading/unloading

## Emergency Procedures

### Vehicle Evacuation
- Know how to operate emergency exits, including roof hatches
- Practice evacuation procedures regularly
- Have evacuation routes planned for different scenarios
- Keep emergency tools (seatbelt cutters, window breakers) accessible
- Designate meeting points away from the vehicle

### Crisis Response
- Remain calm and speak in a reassuring tone
- Prioritize individuals with limited mobility during evacuations
- Know the quickest method to release wheelchair securements
- Have emergency contact information readily available
- Be familiar with individual-specific emergency protocols

      `,
      questions: [
        {
          id: 'q1-mod2',
          question: 'Why should you park on level ground when loading or unloading?',
          options: [
            'It makes it easier to drive away',
            'It helps prevent the vehicle from rolling and ensures stability',
            'It is required by law in all states',
            'It is more comfortable for the driver'
          ],
          correctAnswer: 1,
          explanation: 'Parking on level ground and using the parking brake prevents accidental rolling and keeps everyone safe.'
        },
        {
          id: 'q2-mod2',
          question: 'What is the best way to support someone using a wheelchair during loading?',
          options: [
            'Lift them out of the chair',
            'Use ramps or lifts and secure the wheelchair properly',
            'Let them manage alone',
            'Only secure the chair if they ask'
          ],
          correctAnswer: 1,
          explanation: 'Always use ramps or lifts for wheelchairs and secure them properly to prevent movement during transport.'
        },
        {
          id: 'q3-mod2',
          question: 'What should you do if you must unload on the street side?',
          options: [
            'Rush to get it done',
            'Remain attentive to traffic and keep the individual safe',
            'Ignore traffic',
            'Unload as quickly as possible without looking'
          ],
          correctAnswer: 1,
          explanation: 'If unloading on the street side is unavoidable, always watch for traffic and ensure the individual’s safety.'
        }
      ],
      audioUrl: '/Audio/Safe Loading and Unloading Procedures.wav',
      transcript: 'The source emphasizes that loading and unloading are the times when accidents are most likely to occur during transportation, stressing that complacency increases risk while extra care significantly reduces it. It details preventative measures to avoid common injuries like falls, strains, and back problems, highlighting that safety is a shared responsibility, not solely that of the driver or company. The text also provides specific guidance on assessing the loading area before beginning, ensuring a safe environment, and underscores the importance of clear communication, treating everyone with respect, and offering assistance, especially to those with mobility challenges or medical conditions. Furthermore, it includes advice on safely transporting children using appropriate restraints and emphasizes staying calm and prepared for emergencies, knowing that proactive steps contribute to a safe, comfortable, and injury-free experience for all.'
    }
  ],
  domain: 'imtp'
};
