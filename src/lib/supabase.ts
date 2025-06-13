
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gmksmcjmrsedozzkfewq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdta3NtY2ptcnNlZG96emtmZXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MzgxMjMsImV4cCI6MjA2NTQxNDEyM30.R3OmuPbcw7aRonYJ8eqq8FaZ_U5DLRZaGc7ILD53KEw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type EducationRecord = {
  id: number
  DocumentTitle: string
  Folder: string
  Subfolder: string
  Format?: string
  FormNumber?: string
  file_path?: string
  created_at?: string
}

export type EducationCategory = {
  name: string
  count: number
  reports: string[]
  subfolders: string[]
}
