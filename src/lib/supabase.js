import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iuvisuoccqecayexvfxu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dmlzdW9jY3FlY2F5ZXh2Znh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTI3MDgsImV4cCI6MjA0OTU4ODcwOH0.HxsuBkkFCfsTCC77xtBRbGvSWRnL8BN9YfRSEk1dCHo'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 