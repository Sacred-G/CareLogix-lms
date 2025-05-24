# Deploying Supabase Edge Functions for SCORM Processing

This document explains how to deploy Supabase Edge Functions for your SCORM processing pipeline. The Edge Function has been simplified to improve reliability and handle common error conditions better.

## Prerequisites

- Node.js (already installed)
- Supabase account credentials
- Access to your Supabase project dashboard

## Understanding Common Errors

Before deploying, it's helpful to understand the errors you might see:

### 1. 400 Bad Request
This occurs when the request to the API is malformed. The application now has improved error handling to show exactly what went wrong.

### 2. 404 Not Found
This happens when trying to access an endpoint that doesn't exist, such as when the Edge Function hasn't been deployed yet.

### 3. 500 Internal Server Error
This error indicates issues with the Edge Function execution. The updated function includes better error reporting with specific details.

### 4. Content Security Policy (CSP) Errors
These occur when loading SCORM content in the browser. The updated solution includes a wrapper HTML file with appropriate CSP headers.

## Step 1: Login to Supabase

IMPORTANT: You must use the npm script we've added to package.json to run Supabase commands. Do NOT try to run the `supabase` command directly as it's not installed globally.

To login to Supabase, run:

```bash
npm run supabase:login
```

This is equivalent to running `npx supabase login` and will use the locally installed Supabase package.

This will open a browser window where you can authenticate with your Supabase account. Once authenticated, the CLI will store your access token locally for future commands.

## Step 2: Deploy the Edge Function

The Edge Function has been completely rewritten to be more resilient. It now:
- Provides detailed error messages
- Handles CSP issues automatically
- Skips complex ZIP extraction that often caused timeouts
- Includes proper HTTP status codes and error details

Before deploying, you may want to check if your Supabase project has Edge Functions enabled:
1. Go to your Supabase dashboard
2. Navigate to Settings → API
3. Ensure that Edge Functions are enabled

Then deploy the function:

To deploy the `process-scorm` function, run:

```bash
npm run supabase:deploy-function -- process-scorm
```

Note the `--` which is needed to pass the function name as an argument to the npm script.

This will deploy the Edge Function to your Supabase project, making it available for your application to use.

## Step 3: Verify Deployment

You can verify the function has been deployed by checking the Supabase Dashboard:

1. Go to [https://app.supabase.io](https://app.supabase.io)
2. Select your project
3. Navigate to Edge Functions in the left sidebar
4. Confirm that `process-scorm` is listed and its status is "Active"

## Step 3: Test the Function

After deploying the function, you can test it with a SCORM package upload:

1. Go to the SCORM Uploader in your application
2. Upload a SCORM package
3. Monitor the browser's Network tab in Developer Tools to see the Edge Function request
4. Check the console for detailed error information if it fails

## Troubleshooting Common Issues

### Error: Access token not provided

If you see this error:
```
Access token not provided. Supply an access token by running supabase login or setting the SUPABASE_ACCESS_TOKEN environment variable.
```

Solution:
- Make sure you've successfully logged in with `npm run supabase:login`
- If the login command doesn't work, you can set the access token manually:
  
  1. Go to [Supabase Dashboard](https://app.supabase.io)
  2. Click on your profile icon in the top right
  3. Select "Access Tokens"
  4. Create a new token or copy an existing one
  5. Set it in your terminal: `export SUPABASE_ACCESS_TOKEN=your_token_here`
  6. Then try deploying again

### Error: Failed to deploy function

Solution:
- Check your Supabase account permissions
- Ensure Edge Functions are enabled for your project
- Make sure your project plan supports Edge Functions (some free plans have limitations)
- Try running with the `--debug` flag: `npm run supabase:deploy-function -- process-scorm --debug`

### Error 500 from Edge Function

If you see a 500 error when the function is called, it could be due to:
- Missing environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)
- Storage bucket permissions issues
- Memory limitations (the simplified function uses less memory)

You can check Edge Function logs in the Supabase Dashboard:
1. Go to the Edge Functions section
2. Click on the "process-scorm" function
3. View the logs tab

## Manual SCORM Processing

If you're unable to deploy the Edge Function, you can still use the manual processing options we've added:

1. Upload your SCORM package using the ScormUploader
2. In the ScormManager, use the "Mark as Processed Manually" option (chain link icon)
3. Test the SCORM content using the Preview function

The manual processing option now includes:
- Automatic wrapper file creation with proper CSP headers
- Direct link to the original package file
- More reliable iframe loading

This allows you to continue using SCORM packages even if automatic processing isn't working.

## Setting Up CORS Headers

If you experience CORS issues when your frontend tries to call the Edge Function, you may need to configure CORS headers:

1. Go to your Supabase project settings
2. Navigate to API settings
3. Add your frontend domain to the "Additional allowed headers" section
