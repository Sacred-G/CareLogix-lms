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

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Error: Supabase credentials not found in environment variables');
  console.error('Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key (has admin rights)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

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
    // Execute SQL queries using Supabase
    const { error } = await supabase.rpc('exec_sql', { query: sql });
    
    if (error) {
      console.error(`Error applying migration ${migrationFile}:`, error);
      return false;
    }
    
    console.log(`Migration ${migrationFile} applied successfully`);
    return true;
  } catch (error) {
    console.error(`Error applying migration ${migrationFile}:`, error);
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
  console.log('Creating or updating the exec_sql function...');
  
  const sql = `
  -- Create a function that allows executing arbitrary SQL (requires service role)
  CREATE OR REPLACE FUNCTION exec_sql(query text)
  RETURNS void AS $$
  BEGIN
    EXECUTE query;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  
  try {
    const { error } = await supabase.rpc('exec_sql', { query: sql });
    
    // If the function doesn't exist yet, we need to create it first
    if (error && error.message.includes('function exec_sql(text) does not exist')) {
      // Direct query to create the function (needs to be run by someone with admin rights)
      console.log('Function does not exist, trying to create it directly...');
      
      // You'll need to use a more direct method like connecting to the database
      // with a PostgreSQL client to create this function initially
      console.log('Please create the exec_sql function manually using the Supabase SQL editor:');
      console.log(sql);
      
      const proceed = await new Promise((resolve) => {
        rl.question('Have you created the function manually? (y/n): ', (answer) => {
          resolve(answer.toLowerCase() === 'y');
        });
      });
      
      if (!proceed) {
        console.log('Migration cancelled');
        process.exit(1);
      }
      
      return true;
    } else if (error) {
      console.error('Error creating exec_sql function:', error);
      return false;
    }
    
    console.log('exec_sql function created or already exists');
    return true;
  } catch (error) {
    console.error('Error creating exec_sql function:', error);
    return false;
  }
}

// Main execution
(async () => {
  const success = await createExecSqlFunction();
  if (success) {
    await main();
  } else {
    console.error('Failed to set up migration prerequisites');
    process.exit(1);
  }
})();
