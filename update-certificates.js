import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to process a course file
function processCourseFile(filePath) {
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if certificateAvailable is already present
    if (content.includes('certificateAvailable:')) {
      console.log(`${path.basename(filePath)} already has certificateAvailable property`);
      return;
    }
    
    // Find the position to insert the certificateAvailable property
    // Look for the closing bracket of the course object
    let moduleEnd = content.indexOf('  ]');
    if (moduleEnd !== -1) {
      // Insert certificateAvailable: true before the closing bracket of the course object
      const updatedContent = content.slice(0, moduleEnd + 3) + 
                          ',\n  certificateAvailable: true' + 
                          content.slice(moduleEnd + 3);
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`Updated ${path.basename(filePath)}`);
    } else {
      console.log(`Could not find insertion point in ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Get all course files
const coursesDir = path.join(__dirname, 'src', 'data', 'courses');

// Process all .ts files in the courses directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      // Skip moduleData directories as they don't contain course definitions
      if (file.name !== 'moduleData') {
        processDirectory(fullPath);
      }
    } else if (file.name.endsWith('.ts') && 
              !file.name.includes('index.ts') && 
              !file.name.includes('moduleData')) {
      processCourseFile(fullPath);
    }
  }
}

processDirectory(coursesDir);
console.log('Finished updating course files');
