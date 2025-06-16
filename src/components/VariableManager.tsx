
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, Save, Loader2 } from 'lucide-react'
import { useReportVariables, useUpdateVariable } from '@/hooks/useReportVariables'
import { toast } from 'sonner'

export const VariableManager = () => {
  const { data: variables, isLoading } = useReportVariables()
  const updateVariable = useUpdateVariable()
  const [editingValues, setEditingValues] = useState<Record<number, string>>({})

  const handleValueChange = (variableId: number, value: string) => {
    setEditingValues(prev => ({
      ...prev,
      [variableId]: value
    }))
  }

  const handleSave = async (variable: any) => {
    const newValue = editingValues[variable.id] || variable.current_value
    
    try {
      await updateVariable.mutateAsync({
        id: variable.id,
        current_value: newValue
      })
      
      setEditingValues(prev => {
        const { [variable.id]: _, ...rest } = prev
        return rest
      })
      
      toast.success(`Updated ${variable.variable_name}`)
    } catch (error) {
      toast.error('Failed to update variable')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Report Variables Manager</h2>
      </div>

      {variables?.map(variable => (
        <Card key={variable.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{variable.variable_name}</CardTitle>
              <Badge variant="outline">{variable.report_category}</Badge>
            </div>
            {variable.description && (
              <p className="text-sm text-gray-600">{variable.description}</p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Current Value</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editingValues[variable.id] ?? variable.current_value}
                    onChange={(e) => handleValueChange(variable.id, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSave(variable)}
                    disabled={updateVariable.isPending}
                    size="sm"
                  >
                    {updateVariable.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                Last updated: {new Date(variable.updated_at || variable.created_at || '').toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
