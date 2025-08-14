/**
 * Utility functions for formatting domain names into readable organization names
 */

/**
 * Converts a domain name to a properly formatted organization name with spaces
 * Examples:
 * - "centeredsupportservice" -> "Centered Support Service"
 * - "includemetoo" -> "Include Me Too"
 * - "myorganization" -> "My Organization"
 */
export const formatDomainToOrganizationName = (domain: string): string => {
  if (!domain) return '';

  // Handle specific known domains with custom formatting
  const customMappings: Record<string, string> = {
    'centeredsupportservice': 'Centered Support Service',
    'includemetoo': 'Include Me Too Please',
'includemetooplease.com': 'Include Me Too Please',
    'carelogix': 'CareLogix',
    'dsptraining': 'DSP Training',
  };

  // Check if we have a custom mapping for this domain
  const lowerDomain = domain.toLowerCase();
  if (customMappings[lowerDomain]) {
    return customMappings[lowerDomain];
  }

  // For unknown domains, try to intelligently add spaces
  // This handles common patterns like camelCase and compound words
  let formatted = domain;

  // Add spaces before capital letters (for camelCase)
  formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Add spaces before numbers
  formatted = formatted.replace(/([a-z])([0-9])/g, '$1 $2');

  // Handle common word patterns
  const wordPatterns = [
    { pattern: /support/gi, replacement: 'Support' },
    { pattern: /service/gi, replacement: 'Service' },
    { pattern: /center/gi, replacement: 'Center' },
    { pattern: /care/gi, replacement: 'Care' },
    { pattern: /health/gi, replacement: 'Health' },
    { pattern: /training/gi, replacement: 'Training' },
    { pattern: /education/gi, replacement: 'Education' },
    { pattern: /learning/gi, replacement: 'Learning' },
    { pattern: /management/gi, replacement: 'Management' },
    { pattern: /system/gi, replacement: 'System' },
    { pattern: /solutions/gi, replacement: 'Solutions' },
  ];

  // Apply word patterns to add spaces around common words
  wordPatterns.forEach(({ pattern, replacement }) => {
    formatted = formatted.replace(pattern, ` ${replacement} `);
  });

  // Clean up extra spaces and capitalize properly
  formatted = formatted
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return formatted.trim();
};

/**
 * Gets the organization name from an email domain and formats it as "Organization University"
 */
export const getUniversityNameFromEmail = (email: string): string => {
  if (!email) return 'CareLogix LMS';

  const domain = email.split('@')[1]?.split('.')[0];
  if (!domain) return 'CareLogix LMS';

  const orgName = formatDomainToOrganizationName(domain);
  return `${orgName} University`;
};

/**
 * Gets just the organization name from an email domain (without "University")
 */
export const getOrganizationNameFromEmail = (email: string): string => {
  if (!email) return 'Your Organization';

  const domain = email.split('@')[1]?.split('.')[0];
  if (!domain) return 'Your Organization';

  return formatDomainToOrganizationName(domain);
};
