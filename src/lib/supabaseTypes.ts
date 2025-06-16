
export type ReportVariable = {
  id: number
  variable_name: string
  current_value: string
  effective_date: string
  report_category: string
  description?: string
  created_at?: string
  updated_at?: string
}

export type ReportTemplate = {
  id: number
  template_name: string
  html_content: string
  associated_variables: string[] // Array of variable names
  report_type: string
  folder: string
  subfolder?: string
  created_at?: string
  updated_at?: string
}

export type DynamicReportData = {
  template: ReportTemplate
  variables: Record<string, string>
}
