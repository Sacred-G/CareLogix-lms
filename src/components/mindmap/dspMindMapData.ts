// Define the interface here to avoid circular dependency issues
export interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  color?: string;
  children?: MindMapNode[];
}

export const dspRoleMindMapData: MindMapNode = {
  id: "root",
  label: "Direct Support Professional (DSP)",
  description: "A DSP is far more than a caregiver. Their fundamental role is to empower individuals with developmental disabilities to live fulfilling lives and achieve their dreams.",
  color: "#3b82f6", // Blue
  children: [
    {
      id: "core-roles",
      label: "Core Roles of a DSP",
      description: "DSPs fulfill multiple roles in supporting individuals with developmental disabilities, including being a supporter, teacher, advocate, and mentor.",
      color: "#10b981", // Green
      children: [
        {
          id: "supporter-teacher",
          label: "Supporter & Teacher",
          description: "Providing practical assistance and teaching new skills, focusing on promoting independence and self-sufficiency. Adapting to each person's learning style and pace.",
          color: "#10b981",
          children: [
            {
              id: "daily-tasks",
              label: "Daily Living Tasks",
              description: "Breaking down tasks, offering prompts and visual aids, and providing emotional support to help individuals develop independence.",
              color: "#10b981"
            },
            {
              id: "skill-development",
              label: "Skill Development",
              description: "Teaching life skills, social skills, and vocational skills with patience and positive reinforcement.",
              color: "#10b981"
            }
          ]
        },
        {
          id: "advocate-mentor",
          label: "Advocate & Mentor",
          description: "Being a voice for individuals and building meaningful relationships based on trust and respect to empower them to thrive.",
          color: "#10b981",
          children: [
            {
              id: "rights-advocacy",
              label: "Rights & Inclusion",
              description: "Ensuring individuals' rights are respected, needs are met, and voices are heard. Advocating for inclusion in community activities.",
              color: "#10b981"
            },
            {
              id: "relationship-building",
              label: "Relationship Building",
              description: "Understanding individuals' interests, passions, and dreams to support meaningful connections and personal growth.",
              color: "#10b981"
            }
          ]
        }
      ]
    },
    {
      id: "dev-disabilities",
      label: "Understanding Disabilities",
      description: "Developmental disabilities are lifelong conditions that appear in childhood and affect learning, behavior, or physical development.",
      color: "#8b5cf6", // Purple
      children: [
        {
          id: "common-types",
          label: "Common Types",
          description: "Different types of developmental disabilities including Intellectual Disability, Autism, Cerebral Palsy, and Down Syndrome.",
          color: "#8b5cf6",
          children: [
            {
              id: "intellectual-asd",
              label: "Intellectual & ASD",
              description: "Intellectual Disability involves limitations in cognitive functioning. ASD impacts social interaction and communication with unique presentation.",
              color: "#8b5cf6"
            },
            {
              id: "physical-genetic",
              label: "Physical & Genetic",
              description: "Cerebral Palsy affects movement and posture. Down Syndrome is genetic with distinct physical features and strengths.",
              color: "#8b5cf6"
            }
          ]
        },
        {
          id: "person-first",
          label: "Person-First Approach",
          description: "Seeing the person first, not their disability. Understanding individual needs rather than making assumptions.",
          color: "#8b5cf6"
        }
      ]
    },
    {
      id: "guiding-principles",
      label: "Guiding Principles",
      description: "Effective support for individuals with developmental disabilities is built upon three core principles: person-centeredness, inclusion, and self-determination.",
      color: "#ec4899", // Pink
      children: [
        {
          id: "person-centered",
          label: "Person-Centeredness",
          description: "The heart of quality support. It means truly understanding and valuing each individual as a whole person, listening, respecting choices, and empowering individuals to participate in decisions.",
          color: "#ec4899"
        },
        {
          id: "inclusion-self-det",
          label: "Inclusion & Self-Determination",
          description: "Inclusion means participating fully in community life. Self-determination is the right to make choices about one's own life.",
          color: "#ec4899",
          children: [
            {
              id: "inclusion-details",
              label: "Inclusion",
              description: "Breaking down barriers to education, employment, and social activities. It's about celebrating diversity and recognizing everyone's valuable contributions.",
              color: "#ec4899"
            },
            {
              id: "self-det-details",
              label: "Self-Determination",
              description: "The inherent right of every individual to make choices about their own life and have control over decisions that affect them.",
              color: "#ec4899"
            }
          ]
        }
      ]
    }


  ]
};

export const communicationMindMapData: MindMapNode = {
  id: "root",
  label: "Communication Strategies",
  description: "Effective communication creates trust, reduces anxiety, and empowers individuals with developmental disabilities.",
  color: "#f59e0b", // Amber
  children: [
    // This is a placeholder for future expansion
  ]
};
