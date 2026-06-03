/**
 * supabase.js
 * Initializes and exports the Supabase client.
 * Used for database operations (bookings, inquiries, gallery).
 * Credentials are loaded from environment variables — never hardcoded.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
