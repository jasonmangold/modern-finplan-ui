
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, FileText } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import { ReportTemplate, ReportVariable } from '@/lib/supabaseTypes'

interface DynamicPDFGeneratorProps {
  template: ReportTemplate
  variables: ReportVariable[]
  onGenerated?: (pdfBlob: Blob) => void
}

export const DynamicPDFGenerator = ({ template, variables, onGenerated }: DynamicPDFGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      // Create variable map for easy lookup
      const variableMap: Record<string, string> = {}
      variables.forEach(variable => {
        variableMap[variable.variable_name] = variable.current_value
      })

      // Replace template variables with actual values
      let processedHTML = template.html_content
      template.associated_variables.forEach(variableName => {
        const value = variableMap[variableName] || `[${variableName}]`
        const regex = new RegExp(`{{${variableName}}}`, 'g')
        processedHTML = processedHTML.replace(regex, value)
      })

      // Add current date
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      processedHTML = processedHTML.replace(/{{current_date}}/g, currentDate)

      // Configure PDF options
      const options = {
        margin: 0.5,
        filename: `${template.template_name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }

      // Generate PDF
      const pdfBlob = await html2pdf()
        .set(options)
        .from(processedHTML)
        .outputPdf('blob')

      if (onGenerated) {
        onGenerated(pdfBlob)
      }

      // Open PDF in new window
      const pdfUrl = URL.createObjectURL(pdfBlob)
      window.open(pdfUrl, '_blank')

    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {template.template_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>Variables used: {template.associated_variables.join(', ')}</p>
            <p>Report type: {template.report_type}</p>
          </div>
          
          <Button 
            onClick={generatePDF} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              'Generate Dynamic PDF'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
