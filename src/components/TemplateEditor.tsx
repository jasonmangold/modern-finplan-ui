
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Eye } from 'lucide-react'
import { useReportTemplates } from '@/hooks/useReportVariables'
import { DynamicPDFGenerator } from './DynamicPDFGenerator'

export const TemplateEditor = () => {
  const { data: templates, isLoading } = useReportTemplates()
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [previewMode, setPreviewMode] = useState(false)

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading templates...</div>
  }

  if (previewMode && selectedTemplate) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setPreviewMode(false)}
        >
          Back to Templates
        </Button>
        <DynamicPDFGenerator
          template={selectedTemplate}
          variables={[]} // Will be populated from the hook
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Report Templates</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates?.map(template => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{template.template_name}</CardTitle>
                <Badge variant="secondary">{template.report_type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>Location: {template.folder}{template.subfolder ? ` > ${template.subfolder}` : ''}</p>
                  <p>Variables: {template.associated_variables.join(', ')}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template)
                      setPreviewMode(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
