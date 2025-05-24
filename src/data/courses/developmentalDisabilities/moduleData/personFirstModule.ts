
import { Module } from '../../../courseTypes';

export const personFirstModule: Module = {
  id: 'person-first-language',
  title: 'Person-First Language & Respectful Communication',
  description: 'Master respectful communication techniques and understand how language choices impact dignity and inclusion for people with developmental disabilities.',
  content: `
# Person-First Language & Respectful Communication

## The Power of Language in Disability Support

The words we choose shape perceptions, relationships, and even self-identity. In the field of developmental disability support, language has a profound impact on how individuals are viewed and treated by society.

### Historical Context

Language about disability has evolved significantly over time:
- **Medical model era**: Used dehumanizing terms that defined people by diagnoses
- **Institutional era**: Employed language that emphasized deficits and limitations
- **Service model transition**: Began shifting to "client/consumer" terminology
- **Current rights-based approach**: Emphasizes personhood, dignity, and capability

### Impact of Language

Our word choices have real consequences:
- **Identity formation**: How people see themselves is influenced by how others describe them
- **Public perception**: Language shapes societal attitudes toward disability
- **Service delivery**: Terminology reflects and reinforces service philosophy
- **Policy development**: Language in policies and laws affects rights and access

## Person-First Language: Core Principles

Person-first language is an approach that puts the person before their diagnosis or disability, recognizing that disability is just one aspect of a complex human being.

### Basic Framework

**Key Structure**: 
- Place the person before the disability ("person with autism" rather than "autistic person")
- Avoid defining people by their diagnoses ("individuals who have epilepsy" not "epileptics")
- Eliminate outdated or offensive terminology entirely

**Common Applications**:

| Instead of | Use |
|------------|-----|
| Autistic person | Person with autism |
| Disabled | Person with a disability |
| Wheelchair-bound | Person who uses a wheelchair |
| Mentally retarded | Person with an intellectual disability |
| Handicapped | Person with a disability |

### Identity-First Considerations

Importantly, some disability communities (particularly in autism, deaf culture, and blind communities) prefer identity-first language. This preference reflects:
- Pride in disability identity
- Disability as a fundamental aspect of self, not an add-on
- Cultural identity connected to disability experience

**Best Practice**: When uncertain about preferences, respectfully ask the individual how they prefer to be addressed.

## Beyond Person-First: Comprehensive Respectful Communication

Respectful communication extends beyond basic person-first structure to include many dimensions of interaction.

### Eliminating Problematic Language Patterns

**Avoid Inspiration Narratives**:
- "Overcoming" disability narratives that set unrealistic expectations
- "Despite their disability" framing that diminishes accomplishments
- "Inspirational" stories that objectify people with disabilities for non-disabled inspiration

**Eliminate Pity Language**:
- "Suffers from" or "afflicted with" phrasing
- "Unfortunate" or "tragic" descriptors
- "Special" as a euphemism for disability

**Replace Limiting Terminology**:
- Terms that imply helplessness or childishness
- Language suggesting burdens or problems
- Words that medicalize everyday experiences

### Strength-Based and Capability-Focused Language

**Emphasize Abilities**:
- Focus on what people can do rather than limitations
- Describe specific skills and capabilities
- Recognize potential and growth

**Highlight Autonomy**:
- Use language that respects decision-making capacity
- Acknowledge choices and preferences
- Recognize self-determination as a right

**Describe Support Needs Accurately**:
- "Needs support with" rather than "can't do"
- "Uses" rather than "requires" or "depends on"
- "Prefers" rather than "compliant with" or "non-compliant"

## Practical Communication Strategies

Effective communication involves more than word choice—it's about creating genuine connection through thoughtful interaction.

### Direct Communication Techniques

**Speaking Directly**:
- Address the person with disability directly, not their companion
- Maintain appropriate eye contact (or culturally respectful alternative)
- Position yourself at eye level when possible
- Speak to adults as adults, regardless of disability

**Clear Expression**:
- Use concrete, specific language
- Avoid abstract concepts, idioms, or sarcasm when not appropriate
- Check for understanding without being patronizing
- Adjust complexity based on individual needs, not assumptions

**Patience and Pacing**:
- Allow processing time for responses
- Resist finishing sentences or interrupting
- Offer to repeat or rephrase rather than assuming confusion
- Match the communication pace of the individual

### Supporting Various Communication Styles

**Nonverbal Communication Support**:
- Recognize and respond to nonverbal cues
- Accept alternative communication as equally valid
- Learn basic signs or symbols used by individuals you support
- Avoid making assumptions about cognitive ability based on communication method

**Written and Visual Communication**:
- Provide information in multiple formats when possible
- Use clear, simple fonts and layouts for written material
- Include visual supports where helpful
- Consider reading level and accessibility in all documents

**Digital and Remote Communication**:
- Ensure digital platforms are accessible
- Provide clear structure in virtual meetings
- Check that technology supports rather than hinders communication
- Be flexible about communication platforms based on individual preferences

## Implementing Respectful Language in Practice

Moving from theory to practice requires continuous awareness and specific strategies for different contexts.

### Professional Documentation

**Medical and Service Records**:
- Balance clinical accuracy with respectful language
- Focus on specific observations rather than generalizations
- Document strengths alongside support needs
- Avoid subjective or judgmental terminology

**Goals and Support Plans**:
- Frame goals in positive, achievement-oriented language
- Describe preferences clearly without judgment
- Use consistent, respectful terminology throughout documents
- Ensure plans reflect the individual's voice and priorities

### Team and Community Education

**Modeling Respectful Language**:
- Demonstrate appropriate language in all interactions
- Gently correct outdated terminology when you hear it
- Share resources about language evolution and importance
- Acknowledge that learning respectful language is an ongoing process

**Creating Supportive Environments**:
- Develop team agreements about language standards
- Include language expectations in orientation for new staff
- Review public materials for respectful language
- Engage in regular reflection about communication practices

### Self-Advocacy Support

**Empowering Communication Choices**:
- Support individuals to express language preferences
- Provide vocabulary for discussing disability when requested
- Honor all forms of communication as valid
- Facilitate opportunities for sharing personal perspectives
  `,
  questions: [
    {
      id: 'pfl-q1',
      question: 'Which of the following is an example of person-first language?',
      options: [
        'An autistic person',
        'A wheelchair-bound individual',
        'A person with autism',
        'A disabled person'
      ],
      correctAnswer: 2,
      explanation: 'Person-first language puts the person before the disability, as in "a person with autism" rather than "an autistic person."'
    },
    {
      id: 'pfl-q2',
      question: 'Why might some individuals prefer identity-first language over person-first language?',
      options: [
        'Because it\'s grammatically simpler',
        'Because they view their disability as a central part of their identity and culture',
        'Because it\'s the terminology medical professionals recommend',
        'Because it sounds more professional in documentation'
      ],
      correctAnswer: 1,
      explanation: 'Many people, particularly in the autism, Deaf, and blind communities, prefer identity-first language because they view their disability as an integral part of who they are—a source of identity, community, and pride rather than something separate from themselves.'
    },
    {
      id: 'pfl-q3',
      question: 'Which phrase should be avoided when writing or speaking about a person with a disability?',
      options: [
        'Uses a mobility device',
        'Has a support plan',
        'Lives with a roommate',
        'Suffers from epilepsy'
      ],
      correctAnswer: 3,
      explanation: 'The phrase "suffers from" implies pain, tragedy, or victimhood and should be avoided. Instead, neutral terms like "has epilepsy" or "lives with epilepsy" are more respectful and do not make assumptions about the person\'s experience.'
    },
    {
      id: 'pfl-q4',
      question: 'When communicating with someone who has an intellectual disability, you should:',
      options: [
        'Speak about them to their support person to avoid confusion',
        'Use a louder voice so they can understand you better',
        'Speak directly to the person using clear, adult language',
        'Use childlike terms to make concepts easier to understand'
      ],
      correctAnswer: 2,
      explanation: 'Always communicate directly with the person, not about them to others. Use respectful, age-appropriate language, speaking clearly but not loudly (unless the person has a hearing impairment). Avoid childlike language or talking down to the person, as this is disrespectful to adults regardless of disability.'
    }
  ],
  interactiveScenario: {
    title: 'Navigating a Team Meeting Discussion',
    description: 'Practice responding to problematic language in a professional setting',
    type: 'multiple-choice',
    content: 'You\'re attending a team meeting about supporting Eliza, a 28-year-old woman who has Down syndrome and lives in her own apartment with drop-in support. One of your newer colleagues says: "I\'ve been working with our Down\'s girl Eliza. She\'s so sweet and childlike. It\'s amazing that someone so mentally handicapped can live almost independently! She\'s really high-functioning for a Down\'s case." As a DSP committed to respectful language, how would you best respond?',
    options: [
      {
        id: 'opt1',
        text: "Say nothing during the meeting, but speak to your colleague privately afterward about using more respectful language.",
        isCorrect: false,
        feedback: 'While having a private conversation is better than embarrassing your colleague, this approach misses an important opportunity to model respectful language for the entire team. It also leaves inappropriate language uncorrected in a professional setting where documentation and service planning are occurring.'
      },
      {
        id: 'opt2',
        text: "Immediately correct each problematic term your colleague used: \"Actually, you should say 'person with Down syndrome,' not 'Down's girl,' and the terms 'mentally handicapped' and 'high-functioning' are outdated and offensive.\"",
        isCorrect: false,
        feedback: 'While this addresses the problematic language, the approach is confrontational and may embarrass your colleague, potentially making them defensive rather than receptive to learning. Correcting every term at once can also overwhelm someone who is still learning.'
      },
      {
        id: 'opt3',
        text: "Redirect the conversation by using respectful language yourself: \"I'd like to build on what you shared about Eliza. As a 28-year-old woman with Down syndrome, she's developed some great independent living skills. I'm curious about what specific supports she finds most helpful in her apartment.\"",
        isCorrect: true,
        feedback: 'This response skillfully models person-first and age-appropriate language without directly criticizing your colleague. It redirects the conversation toward Eliza\'s capabilities and specific supports while demonstrating respectful language naturally. This approach maintains team harmony while gently correcting the narrative.'
      },
      {
        id: 'opt4',
        text: "Say: \"We should focus on Eliza's problems and support needs rather than discussing what label to use. Can we talk about the challenges she's having?\"",
        isCorrect: false,
        feedback: 'This response falls into the deficit-based thinking that person-centered approaches aim to avoid by focusing only on "problems" and "challenges." It also dismisses the importance of respectful language by suggesting terminology doesn\'t matter, when in fact language significantly impacts how people are perceived and treated.'
      }
    ]
  },
  flashcards: [
    {
      id: 'pfl-fc1',
      term: 'Person-First Language',
      definition: 'A form of linguistic expression that puts a person before their diagnosis or disability (e.g., "person with autism" rather than "autistic person"). This approach emphasizes that the disability is just one aspect of the individual, not their defining characteristic.'
    },
    {
      id: 'pfl-fc2',
      term: 'Identity-First Language',
      definition: 'A form of expression that leads with the disability as an identity category (e.g., "autistic person" or "Deaf individual"). Preferred by many in certain disability communities who view their disability as an integral part of identity, similar to how one might say "Jewish person" or "Black woman."'
    },
    {
      id: 'pfl-fc3',
      term: 'Ableism',
      definition: 'Discrimination and social prejudice against people with disabilities based on the belief that typical abilities are superior. Manifests in language that devalues, stereotypes, or segregates people with disabilities.'
    },
    {
      id: 'pfl-fc4',
      term: 'Euphemism Treadmill',
      definition: 'The process by which words introduced as respectful replacements for offensive terms gradually take on the negative connotations of the original terms and are themselves replaced. Examples include "handicapped" → "disabled" → "differently abled" → "person with a disability."'
    }
  ],
  faqs: [
    {
      question: "If someone with a disability uses language to describe themselves that I've been taught not to use, how should I respond?",
      answer: "Respect their choice of self-identification. Many people with disabilities have strong preferences about how they describe themselves, which may include reclaiming terms others consider outdated or using identity-first rather than person-first language. When referring to that specific individual, you should generally mirror their preferred terminology. However, continue using respectful language when speaking about other individuals or about disability in general. If you're unsure, it's always appropriate to ask, 'I noticed you use [term] to describe yourself. Is that how you prefer I refer to your disability when we're talking?'"
    },
    {
      question: "How do I correct colleagues who consistently use outdated or disrespectful language without creating tension?",
      answer: "Change often happens gradually through modeling and education rather than correction. Try these approaches: 1) Model appropriate language consistently in your own communication; 2) Share resources like articles or videos about respectful language during team development time; 3) When inappropriate language is used, gently reframe with a statement like, 'I've learned that [current term] is now preferred because...'; 4) Acknowledge that language evolves and everyone is learning; 5) Focus on the impact of language rather than accusing someone of being insensitive. When correction is necessary, consider doing it privately rather than in front of others."
    },
    {
      question: "How can I explain the importance of respectful language to someone who thinks it's just 'political correctness'?",
      answer: "Focus on concrete impacts rather than abstract principles. Explain that language choices affect how people are perceived and treated in very real ways—influencing everything from the services they receive to how included they feel in communities. Share research on how terminology has historically been used to justify segregation and denial of rights. You might also draw parallels to how the person would feel if consistently described by their limitations rather than their strengths. Personal stories from individuals with disabilities about how language has affected them can be particularly powerful. Finally, frame respectful language as a matter of professional standards and best practices rather than politics."
    }
  ]
};
