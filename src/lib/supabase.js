import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'your-supabase-url' 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://placeholder-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY && import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your-supabase-anon-key'
  ? import.meta.env.VITE_SUPABASE_ANON_KEY 
  : 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
