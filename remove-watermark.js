/**
 * This script removes the evaluation watermark from all SCORM packages
 * Used for evaluation purposes only
 */

import { promises as fs, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directory containing the SCORM packages
const scormDir = join(__dirname, 'public/Scorm');

// Function to modify a single room.js file to remove the watermark
function removeWatermarkFromFile(filePath) {
  try {
    // Read the file
    let content = readFileSync(filePath, 'utf8');
    
    // The watermark class implementation includes the show method
    // Find the watermark show method and modify it to always hide the watermark
    content = content.replace(
      /as\.prototype=r\(H\.prototype,{show:function\(a\){null==a&&\(a=!0\);this\.set_visible\(a\)},/g,
      'as.prototype=r(H.prototype,{show:function(a){null==a&&(a=!0);this.set_visible(false)},');
    
    // Additional safeguard to disable watermark visibility setting
    content = content.replace(
      /"TRIAL"==this\.state\.version&&\(this\.view\.watermark\.set_visible\(!0\),this\.view\.watermark\.set_alpha\(\.5\)\)/g,
      '"TRIAL"==this.state.version&&(this.view.watermark.set_visible(false),this.view.watermark.set_alpha(0))');
    
    // Write the modified content back to the file
    writeFileSync(filePath, content);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Function to walk through the directory and process all room.js files
async function processScormPackages() {
  try {
    // Get all subdirectories in the Scorm directory
    const dirEntries = await fs.readdir(scormDir, { withFileTypes: true });
    const dirs = dirEntries
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    console.log(`Found ${dirs.length} SCORM packages to process`);
    
    let successCount = 0;
    let failCount = 0;
    
    // Process each package
    for (const dir of dirs) {
      const roomJsPath = join(scormDir, dir, 'room.js');
      
      // Check if room.js exists
      if (existsSync(roomJsPath)) {
        console.log(`Processing ${dir}/room.js...`);
        const success = removeWatermarkFromFile(roomJsPath);
        
        if (success) {
          successCount++;
          console.log(`✓ Successfully processed ${dir}/room.js`);
        } else {
          failCount++;
          console.log(`✗ Failed to process ${dir}/room.js`);
        }
      } else {
        console.log(`⚠ No room.js found in ${dir}`);
      }
    }
  
    console.log('\nSummary:');
    console.log(`Total packages: ${dirs.length}`);
    console.log(`Successfully processed: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Skipped (no room.js): ${dirs.length - successCount - failCount}`);
  } catch (error) {
    console.error('Error processing SCORM packages:', error);
  }
}

// Run the script
processScormPackages();
