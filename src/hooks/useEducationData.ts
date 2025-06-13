
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase, EducationRecord, EducationCategory } from '@/lib/supabase'

export const useEducationData = () => {
  return useQuery({
    queryKey: ['education-data'],
    queryFn: async (): Promise<EducationRecord[]> => {
      const { data, error } = await supabase
        .from('Education')
        .select('*')
        .order('folder')
        .order('subfolder')
        .order('document_title')

      if (error) {
        throw new Error(`Failed to fetch education data: ${error.message}`)
      }

      return data || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime with gcTime)
  })
}

export const useEducationCategories = () => {
  const { data: educationData, ...rest } = useEducationData()

  const categories: EducationCategory[] = React.useMemo(() => {
    if (!educationData) return []

    const categoryMap = new Map<string, {
      reports: string[]
      subfolders: Set<string>
    }>()

    educationData.forEach(record => {
      if (!categoryMap.has(record.folder)) {
        categoryMap.set(record.folder, {
          reports: [],
          subfolders: new Set()
        })
      }

      const category = categoryMap.get(record.folder)!
      category.reports.push(record.document_title)
      if (record.subfolder) {
        category.subfolders.add(record.subfolder)
      }
    })

    return Array.from(categoryMap.entries()).map(([name, data]) => ({
      name,
      count: data.reports.length,
      reports: data.reports,
      subfolders: Array.from(data.subfolders)
    }))
  }, [educationData])

  return {
    data: categories,
    ...rest
  }
}

export const useEducationSearch = (searchTerm: string) => {
  const { data: educationData, ...rest } = useEducationData()

  const filteredData = React.useMemo(() => {
    if (!educationData || !searchTerm) return educationData

    return educationData.filter(record =>
      record.document_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.folder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.subfolder?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [educationData, searchTerm])

  return {
    data: filteredData,
    ...rest
  }
}
