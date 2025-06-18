import { Course } from '../courseTypes';

export const riskManagementIncidentReportingCourse: Course = {
  id: "risk-management-incident-reporting",
  title: "Risk Management and Incident Reporting",
  description: "Understanding principles of risk management, identifying potential hazards, and proper procedures for reporting incidents.",
  category: "Safety & Compliance",
  instructor: "Steven Bouldin, SHRM-CP",
  thumbnail: "/Images/risk.png", // Reminder: Add this image to your public/Images folder
  duration: "45 min",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1-intro-risk-incident",
      title: "Introduction to Risk Management and Incident Reporting",
      description: "Overview of key concepts, importance of proactive risk assessment, and the incident reporting process.",
      content: "### Understanding Risk Management\n- Identifying potential risks in a care setting.\n- Strategies for risk mitigation.\n- The role of staff in maintaining a safe environment.\n\n### Incident Reporting Procedures\n- What constitutes a reportable incident?\n- Step-by-step guide to filling out an incident report.\n- Importance of timely and accurate reporting.\n\n### Additional Q&A on Risk Management\n\n#### What is risk management in the context of supporting individuals with intellectual/developmental disabilities?\nRisk management is the ongoing process of identifying, evaluating, and reducing potential harm to the individuals being supported. It involves looking for and thinking about potential risks and then taking steps to lessen their effects. For Daily Support Professionals (DSPs), this is a crucial part of their daily work, as they are in a unique position to identify risks early and prevent accidents or injuries. Prevention is considered the number one priority in risk management.\n\n#### What are some different types of risks that individuals with intellectual/developmental disabilities may face?\nIndividuals with intellectual/developmental disabilities can face various types of risks. These include health risks, such as managing conditions like diabetes or having difficulty with swallowing or mobility. Behavioral challenges, where aggressive actions could lead to harm, also pose risks. Environmental risks relate to unsafe conditions in their living or working spaces, like faulty wiring or icy walkways. Finally, lifestyle choices, such as engaging in unsafe sex, alcohol, or drug abuse, can significantly increase an individual's risk.\n\n#### How does risk management balance with supporting an individual's independence and choices?\nBalancing risk management with supporting an individual's independence and choices can be challenging. While prevention is the priority, individuals have the right to make decisions about their lives. When an individual's choices might create risks, the planning team, including the individual, should meet to develop a plan. The DSP's role is to provide information about risks and work with the individual and their team to mitigate the risks while respecting their choices. For example, if an individual chooses to smoke, the DSP can help them understand the risks and work with the team to develop strategies to reduce harm, such as smoking in designated areas to prevent fires and avoid exposing others to second-hand smoke.\n\n#### What is the process of risk assessment and planning?\nRisk assessment and planning follow the identification of a potential risk. It involves gathering more information about the risk and developing a plan to mitigate it. This process includes thinking about and listing potential risks, deciding who needs to be involved (often the planning team), gathering more information about the risks, and planning interventions to lessen the risks. Interventions are actions taken to improve a situation and should be discussed, documented, and can be immediate or implemented over time. DSPs should consider changes in the individual's health or behavior, existing health conditions, behaviors that have caused injury, changes in weight or eating habits, and changes in the environment when assessing risk.\n\n#### What is a Mandated Reporter, and why are DSPs considered mandated reporters?\nA Mandated Reporter is any person, paid or unpaid, who has assumed responsibility for the care or custody of a child, an elder, or a dependent adult. DSPs are legally mandated reporters because they provide care and support to individuals who fall under these categories. This status means they are required by law to report any observed, suspected, or reported abuse, abandonment, abduction, isolation, or neglect to the police and/or the protective services agency.\n\n#### What is the \"Zero Tolerance\" policy regarding abuse and neglect?\nThe \"Zero Tolerance\" policy requires all regional center vendors to have a policy for reporting ALL instances of abuse and neglect. This means that even if there is only a suspicion of abuse or neglect, it must be reported according to the required procedures and timelines. Failure to report can result in significant penalties, including fines and imprisonment.\n\n#### What types of incidents are DSPs required to report, and to whom do they report them?\nDSPs are required to report various incidents, even if risk management practices are followed. These include missing individuals, suspected abuse (physical, sexual, financial, emotional/mental, isolation, neglect, abandonment, and exploitation), hospitalization due to specific health issues, the death of an individual, and an individual being a crime victim. The reporting requirements vary depending on the type of incident and where it occurred. DSPs may need to report to regional centers, Community Care Licensing, local law enforcement, Adult and Child Protective Services, and the Ombudsman. The timelines for reporting also vary, with immediate reporting required for serious incidents and written reports following within a specified timeframe.\n\n#### What are some signs that may indicate abuse or neglect?\nSigns of abuse and neglect can be physical, behavioral, or psychological. Physical signs of abuse can include unexplained bruises, skin tears, welts, burns, fractures, or injuries that don't match the explanation. Behavioral indicators might be intense fear, changes in reaction to certain people, withdrawal, or self-destructive behavior. Psychological symptoms can include sleep disturbances, eating disorders, unusual attachments, avoidance of places or people, excessive crying, or regression. Neglect can be harder to recognize but involves failing to provide a reasonable standard of care, such as not assisting with hygiene, food, clothing, shelter, medical care, protection from hazards, proper nutrition, or self-care. Abandonment involves deserting someone in a dependent situation without the required care. Financial abuse signs can include disappearance of documents, unusual bank account activity, or denial of necessary services despite available funds. Isolation can involve preventing contact with family or friends, false imprisonment, or physical restraint not for medical or safety reasons. Sexual abuse signs can include unexplained pregnancy, STDs, bruising around the genital area, torn clothing, physiological symptoms like headaches or seizures, and psychological symptoms like substance abuse or sexually inappropriate behavior.",
      videoUrl: "https://youtu.be/I39FeqFFNAI",
      pdfPath: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/pdfs/riskmanagement.pdf",
      questions: [
        {
          id: "q1-incident-reporting",
          question: "What is the primary purpose of an incident report?",
          options: [
            "To assign blame to staff members involved.",
            "To document events for learning and prevention of future incidents.",
            "To fulfill a bureaucratic requirement only.",
            "To share details of incidents with all staff publicly."
          ],
          correctAnswer: 1,
          explanation: "Incident reports are crucial for understanding what happened, identifying root causes, and implementing measures to prevent similar incidents from occurring in the future. They are a tool for learning and improving safety."
        },
        {
          id: "q2-mandated-reporting",
          question: "As a DSP, you are considered a mandated reporter. What does this mean?",
          options: [
            "You must report only incidents that result in serious injury.",
            "You are legally required to report any observed, suspected, or reported abuse, neglect, or exploitation.",
            "You should report incidents only if you have concrete proof of wrongdoing.",
            "You should first discuss any concerns with the individual before reporting."
          ],
          correctAnswer: 1,
          explanation: "DSPs are legally mandated reporters, which means they are required by law to report any observed, suspected, or reported abuse, abandonment, abduction, isolation, or neglect to the appropriate authorities. This is not optional, and failure to report can result in penalties."
        },
        {
          id: "q3-risk-management",
          question: "What is the number one priority in risk management for individuals with intellectual/developmental disabilities?",
          options: [
            "Documentation",
            "Prevention",
            "Treatment",
            "Investigation"
          ],
          correctAnswer: 1,
          explanation: "Prevention is considered the number one priority in risk management. The goal is to identify potential risks early and take steps to prevent accidents or injuries before they occur."
        },
        {
          id: "q4-zero-tolerance",
          question: "What does the 'Zero Tolerance' policy regarding abuse and neglect require?",
          options: [
            "Only reporting incidents that have concrete evidence",
            "Reporting only the most serious incidents of abuse",
            "Having a policy for reporting ALL instances of abuse and neglect, even if only suspected",
            "Waiting to see if a pattern develops before reporting"
          ],
          correctAnswer: 2,
          explanation: "The 'Zero Tolerance' policy requires all regional center vendors to have a policy for reporting ALL instances of abuse and neglect. This means that even if there is only a suspicion of abuse or neglect, it must be reported according to the required procedures and timelines."
        },
        {
          id: "q5-risk-balance",
          question: "How should DSPs balance risk management with supporting an individual's independence and choices?",
          options: [
            "Always prioritize safety over individual choices",
            "Allow individuals to make any choice regardless of risk",
            "Provide information about risks and work with the individual and their team to mitigate risks while respecting choices",
            "Refer all decisions about risk to supervisors"
          ],
          correctAnswer: 2,
          explanation: "While prevention is a priority, individuals have the right to make decisions about their lives. The DSP's role is to provide information about risks and work with the individual and their team to mitigate the risks while respecting their choices."
        }
      ],
      audioUrl: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media//Support%20Staff%20Risk%20Management%20and%20Incident%20Reporting.wav"
    },
    {
      id: "mod-2-practical-assessment",
      title: "Practical Assessment: Incident Report Documentation",
      description: "Apply your knowledge by completing sample incident reports based on realistic scenarios.",
      content: "# Practical Assessment: Incident Report Documentation\n\nIn this module, you will apply what you've learned by completing sample incident reports for different scenarios. This practical exercise will help you develop the critical skills needed to document incidents accurately and thoroughly.\n\n## Interactive PDF Form\n\nBelow you'll find an interactive PDF form that you can use to practice documenting incidents. Most fields in this form are fillable, allowing you to type directly into the document.\n\n**Note About the Report Section:** While most of the PDF is interactive, the actual incident report section itself is not fillable. This is because we want you to practice documenting incidents in your agency's official reporting system.\n\n**How to Use This PDF:**\n1. Fill out the interactive fields at the top of the form\n2. For the incident report section (which isn't fillable), you can either:\n   - Print the form and write by hand\n   - Type your report in a separate document\n   - Use your agency's official reporting system\n3. Use the download button to save your progress\n\n**Key Interactive Sections:**\n- Personal information\n- Date and time stamps\n- Basic incident details\n- Digital signature fields\n\n**Note on the Report Section:** The main incident report area is provided as a reference for the level of detail and format required in your official documentation.\n\n## Why Proper Documentation Matters\n\nAccurate and thorough incident reporting is essential for:\n- Ensuring client safety and well-being\n- Meeting regulatory requirements\n- Identifying patterns that may require systemic changes\n- Protecting both clients and staff through proper documentation\n- Creating a record that can be referenced if questions arise later\n\n## Practice Scenario 1: Client Fall\n\n**Scenario:** At 2:15 PM on Tuesday, Maria, a client with mobility challenges, tripped on an uneven sidewalk during a community outing to the local park. She sustained a scrape on her right knee but remained conscious and alert. You helped her to a bench, cleaned the wound with your first aid kit, and applied a bandage. Maria was able to walk back to the van without assistance after resting for 10 minutes.\n\n**Your Task:** Complete the incident report form for this scenario, including all relevant details.\n\n## Practice Scenario 2: Medication Error\n\n**Scenario:** While assisting James with his evening medications, you realize that you accidentally gave him his morning dose of blood pressure medication instead of his evening dose of anxiety medication. You notice the error immediately after James has swallowed the pill. James has no immediate adverse reaction.\n\n**Your Task:** Fill out the incident report form for this medication error, including all necessary information and notifications.\n\n## Practice Scenario 3: Behavioral Incident\n\n**Scenario:** During a group activity, Thomas became agitated when another client, Robert, accidentally knocked over Thomas's art project. Thomas yelled and pushed Robert, causing Robert to stumble but not fall. You intervened immediately, separating the clients and helping Thomas calm down using techniques from his behavior support plan. No injuries occurred.\n\n**Your Task:** Complete the incident report form for this behavioral incident, documenting the antecedent, behavior, and consequences.\n\n## Key Documentation Principles\n\nRemember these principles when completing any incident report:\n\n1. **Be objective and factual** - Report what you observed, not opinions or judgments\n2. **Be thorough** - Include all relevant details\n3. **Be timely** - Complete reports as soon as possible after the incident\n4. **Be specific** - Use clear, concrete language (e.g., \"Client fell and scraped right knee\" not \"Client got hurt\")\n5. **Follow up** - Document any follow-up actions or observations\n\n## Documentation Pitfalls to Avoid\n\n- Using vague language\n- Including personal opinions or blame\n- Omitting important details\n- Delaying completion of the report\n- Using abbreviations that aren't universally understood\n- Failing to notify appropriate parties\n\nPractice applying these principles to the scenarios above to strengthen your incident reporting skills.",
      questions: [
        {
          id: "q1-mod2-assessment",
          question: "In the client fall scenario, which of the following would be most appropriate to include in your incident report?",
          options: [
            "Maria is very clumsy and should have been more careful on the sidewalk.",
            "At approximately 2:15 PM, Maria tripped on an uneven section of sidewalk, resulting in a scrape to her right knee that was cleaned and bandaged.",
            "Maria had a minor fall but it wasn't serious enough to worry about.",
            "Maria fell down and hurt herself during our outing."
          ],
          correctAnswer: 1,
          explanation: "The second option provides specific, objective details about what happened, including the time, the specific injury, and the immediate care provided. It avoids opinions or vague descriptions."
        },
        {
          id: "q2-mod2-assessment",
          question: "For the medication error scenario, what is the FIRST action you should take?",
          options: [
            "Hide the error to avoid getting in trouble.",
            "Wait to see if James develops any symptoms before reporting.",
            "Immediately notify your supervisor and follow agency protocols for medication errors.",
            "Give James the correct medication right away to make up for the error."
          ],
          correctAnswer: 2,
          explanation: "Medication errors must be reported immediately to your supervisor, regardless of whether there are immediate adverse effects. This allows for proper monitoring and medical consultation if needed. Never try to hide an error or administer additional medication without proper authorization."
        },
        {
          id: "q3-mod2-assessment",
          question: "When documenting the behavioral incident between Thomas and Robert, which approach is most appropriate?",
          options: [
            "Focus mainly on Thomas's inappropriate behavior since he was the aggressor.",
            "Document the sequence of events objectively, including the trigger (antecedent), the behaviors of both clients, your intervention, and the outcome.",
            "Keep the report brief since no one was injured.",
            "Emphasize that Robert provoked Thomas by knocking over his project."
          ],
          correctAnswer: 1,
          explanation: "Proper documentation of behavioral incidents should objectively describe the entire sequence of events, including what happened before (antecedent), during (behavior), and after (consequences) the incident. This helps identify patterns and develop effective interventions. Avoid assigning blame or making subjective judgments."
        },
        {
          id: "q4-mod2-assessment",
          question: "Which of the following is NOT a key principle of good incident documentation?",
          options: [
            "Being objective and factual",
            "Including your personal assessment of who was at fault",
            "Being thorough and specific",
            "Completing the documentation promptly"
          ],
          correctAnswer: 1,
          explanation: "Good incident documentation should avoid personal judgments about fault or blame. Reports should stick to observable facts and objective information. Assigning fault is not the purpose of an incident report and could create bias in how the incident is addressed."
        }
      ],
      pdfPath: "https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/course_media/pdfs/riskmanagementpdf.pdf",

      
    }
  ]
};
