"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminBypassClient = void 0;
// Utility to help admins bypass Supabase RLS policies
var supabase_js_1 = require("@supabase/supabase-js");
// This function creates a special admin client for operations that need to bypass RLS
// It should only be used in secure admin-only functions
var createAdminBypassClient = function () {
    var supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    var supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing required Supabase admin environment variables. Please check your .env file.');
    }
    // Create a client with the service role key for admin operations
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        },
        global: {
            headers: {
                'X-Admin-Access': 'true',
            },
        },
    });
};
exports.createAdminBypassClient = createAdminBypassClient;
