
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase, EducationRecord, EducationCategory } from '@/lib/supabase'

export const useEducationData = () => {
  return useQuery({
    queryKey: ['education-data'],
    queryFn: async (): Promise<EducationRecord[]> => {
      console.log('Fetching education data from Supabase...')
      
      const { data, error } = await supabase
        .from('Education')
        .select('*')
        .order('Folder')
        .order('Subfolder')
        .order('DocumentTitle')

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(`Failed to fetch education data: ${error.message}`)
      }

      console.log('Education data fetched successfully:', data)
      return data || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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
      if (!categoryMap.has(record.Folder)) {
        categoryMap.set(record.Folder, {
          reports: [],
          subfolders: new Set()
        })
      }

      const category = categoryMap.get(record.Folder)!
      category.reports.push(record.DocumentTitle)
      if (record.Subfolder) {
        category.subfolders.add(record.Subfolder)
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
      record.DocumentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.Folder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.Subfolder?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [educationData, searchTerm])

  return {
    data: filteredData,
    ...rest
  }
}
