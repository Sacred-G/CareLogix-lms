#!/usr/bin/env node
/**
 * Database Migration Script
 * 
 * This script applies SQL migrations to the Supabase database.
 * Run with: node scripts/apply-migrations.js
 */
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

// Get Supabase credentials from .env file or environment
require('dotenv').config();

// Use the service role key for migrations to ensure we have necessary permissions
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Verify we have the service role key
if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is required for migrations');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Error: Supabase credentials not found in environment variables');
  console.error('Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase admin client with service role key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Create a regular client for non-admin operations
const supabase = createClient(SUPABASE_URL, process.env.VITE_SUPABASE_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function confirmMigration(migrationFile) {
  return new Promise((resolve) => {
    console.log(`\nAbout to apply migration: ${migrationFile}`);
    console.log('WARNING: This will modify your database structure.');
    rl.question('Do you want to continue? (y/n): ', (answer) => {
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

async function applyMigration(migrationFile) {
  const filePath = path.join(__dirname, '..', 'migrations', migrationFile);
  const sql = fs.readFileSync(filePath, 'utf8');
  
  console.log(`Applying migration: ${migrationFile}`);
  
  try {
    if (migrationFile.startsWith('000_')) {
      console.error(`❌ Migration ${migrationFile} cannot be applied automatically.`);
      console.error('Please run the following SQL statements manually in the Supabase SQL Editor:');
      console.log('\n' + sql + '\n');
      
      const proceed = await new Promise((resolve) => {
        rl.question(`Have you run the SQL for ${migrationFile} manually? (y/n): `, (answer) => {
          resolve(answer.toLowerCase() === 'y');
        });
      });
      
      if (!proceed) {
        console.log('Migration cancelled');
        return false;
      }
      console.log(`✅ Migration ${migrationFile} confirmed as manually applied.`);
      return true;
    } else {
      console.log('Using exec_sql function...');
      const { error } = await supabaseAdmin.rpc('exec_sql', { query: sql });
      if (error) throw error;
      
      console.log(`✅ Migration ${migrationFile} applied successfully`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Error applying migration ${migrationFile}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Database Migration Tool');
  console.log('----------------------');
  
  // Get all migration files
  const migrationsDir = path.join(__dirname, '..', 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error('Error: Migrations directory not found');
    process.exit(1);
  }
  
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();
  
  if (migrationFiles.length === 0) {
    console.log('No migrations found');
    process.exit(0);
  }
  
  console.log(`Found ${migrationFiles.length} migration files:`);
  migrationFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
  
  let applyAll = false;
  
  // Ask which migration to apply
  const answer = await new Promise((resolve) => {
    rl.question('\nWhich migration would you like to apply? (number or "all"): ', (answer) => {
      resolve(answer.trim());
    });
  });
  
  let selectedMigrations = [];
  
  if (answer.toLowerCase() === 'all') {
    applyAll = await confirmMigration('ALL migrations');
    if (applyAll) {
      selectedMigrations = migrationFiles;
    }
  } else {
    const index = parseInt(answer) - 1;
    if (isNaN(index) || index < 0 || index >= migrationFiles.length) {
      console.error('Invalid selection');
      process.exit(1);
    }
    
    const confirmed = await confirmMigration(migrationFiles[index]);
    if (confirmed) {
      selectedMigrations = [migrationFiles[index]];
    }
  }
  
  if (selectedMigrations.length === 0) {
    console.log('Migration cancelled');
    process.exit(0);
  }
  
  // Apply selected migrations
  for (const migration of selectedMigrations) {
    const success = await applyMigration(migration);
    if (!success && !applyAll) {
      console.error('Migration failed, stopping');
      break;
    }
  }
  
  console.log('\nMigration process completed');
  rl.close();
}

// First create the exec_sql function if it doesn't exist
async function createExecSqlFunction() {
  console.log('Setting up exec_sql function...');
  
  // First, drop the function if it exists
  const dropFunctionSQL = `
  DROP FUNCTION IF EXISTS public.exec_sql(text);
  `;
  
  // Then create the function with the correct return type
  const createFunctionSQL = `
  CREATE OR REPLACE FUNCTION public.exec_sql(query text)
  RETURNS text
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
  BEGIN
    EXECUTE query;
    RETURN 'Query executed successfully';
  END;
  $function$;
  `;
  
  // Grant necessary permissions
  const grantSQL = `
  GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO authenticated;
  GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO service_role;
  `;
  
  try {
    console.log('Dropping existing exec_sql function if it exists...');
    await supabase.rpc('exec_sql', { query: dropFunctionSQL }).catch(() => {
      // Ignore errors when dropping non-existent function
    });
    
    console.log('Creating new exec_sql function...');
    await supabase.rpc('exec_sql', { query: createFunctionSQL });
    
    console.log('Setting permissions...');
    await supabase.rpc('exec_sql', { query: grantSQL });
    
    console.log('exec_sql function setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up exec_sql function:');
    console.error('Please run these SQL statements manually in the Supabase SQL Editor:');
    console.log('\n' + dropFunctionSQL);
    console.log(createFunctionSQL);
    console.log(grantSQL + '\n');
    
    const proceed = await new Promise((resolve) => {
      rl.question('Have you run the above SQL statements manually? (y/n): ', (answer) => {
        resolve(answer.toLowerCase() === 'y');
      });
    });
    
    if (!proceed) {
      console.log('Migration cancelled');
      process.exit(1);
    }
    
    return true;
  }
}

// Main execution
(async () => {
  await main();
})();

// Remove the createExecSqlFunction as it's causing a circular dependency and is not the correct way to create exec_sql
// async function createExecSqlFunction() {
//   console.log('Setting up exec_sql function...');
//   // ... (rest of the function)
// }
