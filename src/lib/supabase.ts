
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type EducationRecord = {
  id: number
  document_title: string
  folder: string
  subfolder: string
  created_at?: string
}

export type EducationCategory = {
  name: string
  count: number
  reports: string[]
  subfolders: string[]
}
