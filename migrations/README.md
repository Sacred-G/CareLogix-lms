# Database Migrations for Multi-Level Admin System

This directory contains database migrations for the Learn With Compassion LMS platform, specifically for implementing the multi-level admin system.

## Migration Files

- `001_add_admin_roles.sql`: Sets up the necessary database structure for multi-level admin roles including:
  - Super admin role
  - Domain admin role
  - Regular admin role
  - Functions for permission checking and domain management

## How to Apply Migrations

### Method 1: Using the Migration Script (Recommended)

1. Make sure you have a `.env` file with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. Install required dependencies if they're not already installed:
   ```bash
   npm install @supabase/supabase-js dotenv
   ```

3. Run the migration script:
   ```bash
   node scripts/apply-migrations.js
   ```

4. Follow the prompts to select and apply migrations.

### Method 2: Manual Application via Supabase SQL Editor

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Open the migration file (e.g., `001_add_admin_roles.sql`)
4. Copy the SQL contents
5. Paste into the SQL Editor and run

## Setting Up Super Admin

After applying migrations, make sure to set up at least one super admin user:

1. Register a user with email `admin@example.com` (or your chosen super admin email)
2. The migration will automatically set this account as a super admin
3. For any other account you want to set as super admin, use the SQL Editor:
   ```sql
   UPDATE profiles
   SET role = 'super_admin'
   WHERE email = 'your_admin_email@example.com';
   ```

## Admin Role Hierarchy

The system implements the following admin role hierarchy:

1. **Super Admin** - Has full access to all domains and can:
   - Manage all users including other admins
   - Create domain admins and assign them to domains
   - View and manage all domains

2. **Domain Admin** - Has access to specific domains and can:
   - Manage regular admins and students within their assigned domains
   - View statistics for their domains

3. **Regular Admin** - Has limited access to their domain and can:
   - Manage only students within their domain
   - View statistics for their domain

4. **Student** - Regular user with no admin capabilities

## Function Reference

The migration adds several useful functions:

- `is_admin()`: Checks if the current user has any admin role
- `is_super_admin()`: Checks if the current user is a super admin
- `is_domain_admin()`: Checks if the current user is a domain admin
- `get_managed_domains()`: Returns the domains the current user can manage
- `can_manage_user(user_id)`: Checks if the current user can manage a specific user

These functions can be used in your Row Level Security policies and application logic.
