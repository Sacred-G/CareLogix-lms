import { Course } from '../courseTypes';

export const developmentalDisabilitiesInteractive: Course = {
  id: "dev-disabilities-interactive",
  title: "The Role of Support Staff: Interactive Training",
  description: "An interactive micro-learning experience for support staff working with individuals with developmental disabilities. Learn essential strategies and approaches to provide effective, person-centered support.",
  category: "Support Staff Training",
  instructor: "JFC Training Team",
  thumbnail: "/Images/DD2.png",
  duration: "20 min",
  modules: [
    {
      id: "interactive-module",
      title: "Interactive Learning Module",
      description: "Engage with this interactive content to enhance your understanding of developmental disabilities.",
      customModuleType: 'interactiveIframe',
      iframeUrl: 'https://jfctech.h5p.com/content/1292604238039202398/embed',
      content: `
# Interactive Learning: Developmental Disabilities

Explore the following interactive content to enhance your understanding of developmental disabilities and support strategies.

## What You'll Learn

- Key concepts about developmental disabilities
- Effective support strategies
- Real-world scenarios and applications

### How to Use This Module

1. Use the navigation menu to explore different sections
2. Interact with the content by clicking on buttons and following prompts
3. Complete the knowledge checks to test your understanding
4. Take your time - you can pause and return later

## Learning Objectives

By the end of this module, you will be able to:

- Identify key characteristics of different developmental disabilities
- Apply effective support strategies in various scenarios
- Recognize the importance of person-centered approaches
- Navigate common challenges in supporting individuals with developmental disabilities

## Accessibility

This interactive module is designed to be accessible. If you encounter any issues or need accommodations, please contact support.`
    }
  ],
  certificateAvailable: true
};
