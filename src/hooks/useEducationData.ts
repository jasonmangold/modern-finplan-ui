
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

export const useEducationCategories = (selectedFormats: string[] = []) => {
  const { data: educationData, ...rest } = useEducationData()

  const categories: EducationCategory[] = React.useMemo(() => {
    if (!educationData) return []

    // Filter data by selected formats first
    let filteredData = educationData
    if (selectedFormats.length > 0) {
      filteredData = educationData.filter(record => 
        selectedFormats.includes(record.Format || '')
      )
    }

    const categoryMap = new Map<string, {
      reports: string[]
      subfolders: Set<string>
    }>()

    filteredData.forEach(record => {
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

    // Only return categories that have reports after filtering
    return Array.from(categoryMap.entries())
      .filter(([_, data]) => data.reports.length > 0)
      .map(([name, data]) => ({
        name,
        count: data.reports.length,
        reports: data.reports,
        subfolders: Array.from(data.subfolders)
      }))
  }, [educationData, selectedFormats])

  return {
    data: categories,
    ...rest
  }
}

export const useEducationSearch = (searchTerm: string, selectedFormats: string[] = []) => {
  const { data: educationData, ...rest } = useEducationData()

  const filteredData = React.useMemo(() => {
    if (!educationData) return educationData

    let filtered = educationData

    // Apply format filter first
    if (selectedFormats.length > 0) {
      filtered = filtered.filter(record => 
        selectedFormats.includes(record.Format || '')
      )
    }

    // Then apply search filter - now including FormNumber
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(record =>
        record.DocumentTitle.toLowerCase().includes(searchLower) ||
        record.Folder.toLowerCase().includes(searchLower) ||
        record.Subfolder?.toLowerCase().includes(searchLower) ||
        record.FormNumber?.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [educationData, searchTerm, selectedFormats])

  return {
    data: filteredData,
    ...rest
  }
}
