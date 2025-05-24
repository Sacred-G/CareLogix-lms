import { Course } from '../courseTypes';

export const resourcesCourse: Course = {
  id: "dsp-resources",
  title: "DSP Resources & Tools",
  description: "Essential resources, forms, and tools for Direct Support Professionals.",
  category: "Resources",
  instructor: "Centered Care",
  thumbnail: "/Images/resources.png", // If this image does not exist, please review and update accordingly.
  duration: "Reference",
  modules: [
    {
      id: "risk-management-tools",
      title: "Risk Management Tools",
      description: "Resources for preventing and reporting incidents.",
      content: `
# Risk Management Tools

Regional Center staff, Service Providers and families may find the documents listed below useful in both preventing and reporting Special Incident Reports (SIRs).

## Health Condition Checklists
- [Checklist: Aspiration/Aspiration Pneumonia](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_Aspiration.pdf)
- [Checklist: Impaction & Severe Constipation](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_BowelImpaction.pdf)
- [Checklist: Insulin Dependent Diabetes](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_Diabetes.pdf)
- [Checklist: Epilepsy](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_Epilepsy.pdf)
- [Checklist: Gastronomy Tube (G-Tube) Feeding](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_GTube.pdf)
- [Checklist: Osteoporosis](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_Osteoporosis.pdf)
- [Checklist: Staphylococcus "Staph" Infection](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_Staph.pdf)
- [Checklist: Weight Management](https://www.dds.ca.gov/wp-content/uploads/2019/10/Checklist_WeightManagement.pdf)

## Fall Prevention and Safety
- [Clinical Professionals – Medical Risks Factors and Prevention of Falls and Fractures](https://www.dds.ca.gov/wp-content/uploads/2019/10/FallsFracturesPreventionClinical.pdf)
- [Preventing Falls](https://www.dds.ca.gov/wp-content/uploads/2019/10/PreventingFalls.pdf)
- [Preventing Falls and Fractures – Information for Supporters and Providers](https://www.dds.ca.gov/wp-content/uploads/2019/10/FallFracturePrevention.pdf)

## Incident Response and Risk Assessment
- [Incident Response Card](http://www.westsiderc.org/wp-content/uploads/2014/06/Incident-Response-Card.pdf)
- [Incident Response Checklist](http://www.westsiderc.org/wp-content/uploads/2014/06/IncidentResponseChecklist.pdf)
- [Preventative Action Checklist](http://www.westsiderc.org/wp-content/uploads/2014/06/PreventativeActionChecklist.pdf)
- [Risk Assessment Evaluation & Planning](http://www.westsiderc.org/wp-content/uploads/2014/06/Risk-Assessment-Evaluation-Planning-Form.pdf)
- [Risk Assessment Evaluation & Planning Worksheet](http://www.westsiderc.org/wp-content/uploads/2014/06/Risk-Assessment-tool.pdf)
- [Risk Assessment Inventory: Major Depression](http://www.westsiderc.org/wp-content/uploads/2014/06/Risk-Assessment-Inventory-Depressive-Disorder.pdf)
- [Risk Management Training Manual](https://www.dds.ca.gov/wp-content/uploads/2020/01/rmTrainingManual.pdf)

## Clinical Risk Factors
- [Specific Clinical Risk Factors: Aspiration Pneumonia](http://www.westsiderc.org/wp-content/uploads/2014/06/SpecificRiskAspiration.pdf)
- [Specific Clinical Risk Factors: GI Problems in People with Developmental Disabilities](http://www.westsiderc.org/wp-content/uploads/2014/06/SpecificRiskGI.pdf)
`,
      questions: [
        {
          id: "q1-resources",
          question: "Why are risk management tools important for DSPs?",
          options: [
            "They're only important for medical professionals",
            "They help in both preventing and responding to incidents",
            "They replace the need for DSP judgment",
            "They're only useful after an incident has occurred"
          ],

          correctAnswer: 1,
          explanation: "Risk management tools are important because they help DSPs both prevent incidents from occurring and respond appropriately when they do happen. They provide structured guidance but don't replace professional judgment."
        }
      ],
      videoUrl: "",
      audioUrl: "",
      transcript: "This module provides access to various risk management tools and resources that can be useful in supporting individuals with developmental disabilities safely."
    },
    {
      id: "reporting-forms",
      title: "Reporting Forms & Templates",
      description: "Essential forms for incident reporting and documentation.",
      content: `
# Reporting Forms & Templates

Access and download the necessary forms for incident reporting, restraint documentation, and other required reporting.

## Special Incident Reports (SIR) Forms
- [Vendor Reporting Instructions SIR 5.6.21](https://westsiderc.org/wp-content/uploads/2021/05/Vendor-Reporting-Instructions-SIR-5.6.21.pdf)
- [SIR Vendor LTC Reporting Form Revised 7.2023 (fillable)](https://westsiderc.org/wp-content/uploads/2023/08/SIR-Vendor-LTC-Reporting-Form_Revised-7.2023-fillable.pdf)
- [SIR Tip sheet REVISED 9-12-24](https://westsiderc.org/wp-content/uploads/2024/09/SIR-Tip-sheet-REVISED-9-12-24.pdf)

## Specialized Reporting Forms
- [WRC Post Emergency Restraint Report PERR modified V8.12.20](https://westsiderc.org/wp-content/uploads/2020/08/WRCPost-Emergency-Restraint-Report-PERR-modified-V8.12.20.pdf)
- [Report of Suspected Dependent Adult/Elder Abuse – SOC 341](https://cdss.ca.gov/Portals/9/FMUForms/Q-T/SOC341.pdf)
- [WRC Rx Error Diagnostic Tool_2022](https://westsiderc.org/wp-content/uploads/2022/10/WRC-Rx-Error-Diagnostic-Tool_2022-1.pdf)
- [WRC COVID-19 Form For Vendor/Providers Employee/Staff](https://westsiderc.org/wp-content/uploads/2020/03/WRC-COVID019-Vendor-Employee-Staff-Form.docx)
`,
      questions: [
        {
          id: "q1-reporting",
          question: "What is the purpose of the SIR form?",
          options: [
            "To order medical supplies",
            "To report special incidents involving clients",
            "To request time off",
            "To apply for additional funding"
          ],
          correctAnswer: 1,
          explanation: "SIR (Special Incident Report) forms are used to report incidents involving clients such as injuries, medication errors, suspected abuse, or other reportable events. Proper reporting ensures appropriate follow-up and helps improve safety measures."
        }
      ],
      videoUrl: "",
      audioUrl: "",
      transcript: "This module provides access to essential reporting forms needed by Direct Support Professionals for incident documentation and reporting."
    }
  ],
  domain: "general",
  featured: true
};
