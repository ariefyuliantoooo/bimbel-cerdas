import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'your-supabase-url'
  ? import.meta.env.VITE_SUPABASE_URL
  : 'https://placeholder-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY && import.meta.env.VITE_SUPABASE_ANON_KEY !== 'fzrgujlvlhblwhrljsfi'
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : 'placeholder-key'

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (e) {
  console.warn("Supabase initialization failed, using dummy client", e);
  supabase = { from: () => ({ insert: () => Promise.resolve({ error: null }) }) };
}
export { supabase }
