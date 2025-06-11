#!/bin/bash

# This script sets up the certificate generation functionality in the Supabase database

# Exit on error
set -e

echo "Setting up certificate generation functions..."

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "Error: psql is not installed. Please install PostgreSQL client tools."
    exit 1
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "Error: .env file not found. Please create one with your database connection details."
    exit 1
fi

# Check if required environment variables are set
if [ -z "$SUPABASE_DB_URL" ]; then
    echo "Error: SUPABASE_DB_URL is not set in .env file."
    exit 1
fi

# Apply the certificate functions migration
echo "Applying certificate functions migration..."
psql "$SUPABASE_DB_URL" -f "supabase/migrations/20240610170100_add_certificate_functions.sql"

echo "Certificate generation setup complete!"
echo "You can now use the following functions:"
echo "- admin_generate_certificate(user_email, course_title)"
echo "- list_available_courses()"
echo "- list_users_for_certificates()"
