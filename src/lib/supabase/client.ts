import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const DEFAULT_SUPABASE_URL = 'https://shgjafpflodxumpulpwn.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZ2phZnBmbG9keHVtcHVscHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDI4NDAsImV4cCI6MjEwNjMxODg0MH0.fXKqLlSo2Sx9KxmjVC6H0RIyTNF1MsBoFH-mtwc2LKc'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
