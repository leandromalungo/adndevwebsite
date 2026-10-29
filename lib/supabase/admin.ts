import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !serviceRoleKey) return false;
  if (
    supabaseUrl.includes('placeholder') ||
    supabaseUrl.includes('your-project') ||
    supabaseUrl.includes('example') ||
    serviceRoleKey.includes('your-service-role-key') ||
    serviceRoleKey.includes('placeholder')
  ) {
    return false;
  }
  return true;
}

export const supabaseAdmin = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co', 
  isSupabaseConfigured() ? serviceRoleKey : 'placeholder'
);
