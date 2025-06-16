
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { ReportVariable, ReportTemplate } from '@/lib/supabaseTypes'

export const useReportVariables = () => {
  return useQuery({
    queryKey: ['report-variables'],
    queryFn: async (): Promise<ReportVariable[]> => {
      const { data, error } = await supabase
        .from('report_variables')
        .select('*')
        .order('variable_name')

      if (error) {
        throw new Error(`Failed to fetch report variables: ${error.message}`)
      }

      return data || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useReportTemplates = () => {
  return useQuery({
    queryKey: ['report-templates'],
    queryFn: async (): Promise<ReportTemplate[]> => {
      const { data, error } = await supabase
        .from('report_templates')
        .select('*')
        .order('template_name')

      if (error) {
        throw new Error(`Failed to fetch report templates: ${error.message}`)
      }

      return data || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUpdateVariable = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, current_value }: { id: number; current_value: string }) => {
      const { data, error } = await supabase
        .from('report_variables')
        .update({ current_value, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) {
        throw new Error(`Failed to update variable: ${error.message}`)
      }

      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-variables'] })
    },
  })
}
