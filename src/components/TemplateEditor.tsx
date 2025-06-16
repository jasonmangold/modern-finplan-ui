
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Eye, Plus, Save } from 'lucide-react'
import { useReportTemplates } from '@/hooks/useReportVariables'
import { DynamicPDFGenerator } from './DynamicPDFGenerator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const sampleTemplates = {
  'roth-ira': `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
    .header { text-align: center; border-bottom: 3px solid #0066cc; padding-bottom: 20px; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: bold; color: #0066cc; margin-bottom: 10px; }
    .subtitle { font-size: 14px; color: #666; }
    .section { margin: 25px 0; }
    .section-title { font-size: 18px; font-weight: bold; color: #0066cc; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
    .highlight { background-color: #f0f8ff; padding: 15px; border-left: 4px solid #0066cc; margin: 15px 0; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    .table th { background-color: #f5f5f5; font-weight: bold; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .variable { color: #0066cc; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">Roth IRA Contribution Guide</div>
    <div class="subtitle">Updated as of {{current_date}}</div>
  </div>

  <div class="section">
    <div class="section-title">Contribution Limits for {{current_year}}</div>
    <div class="highlight">
      <p><strong>Maximum Annual Contribution:</strong> <span class="variable">${{roth_ira_contribution_limit}}</span></p>
      <p><strong>Catch-up Contribution (Age 50+):</strong> <span class="variable">${{roth_ira_catchup_limit}}</span></p>
      <p><strong>Total Maximum (Age 50+):</strong> <span class="variable">${{roth_ira_total_limit}}</span></p>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Income Limits for {{current_year}}</div>
    <table class="table">
      <tr>
        <th>Filing Status</th>
        <th>Phase-out Range</th>
        <th>No Contribution Allowed</th>
      </tr>
      <tr>
        <td>Single/Head of Household</td>
        <td>${{roth_ira_single_phaseout_start}} - ${{roth_ira_single_phaseout_end}}</td>
        <td>Above ${{roth_ira_single_phaseout_end}}</td>
      </tr>
      <tr>
        <td>Married Filing Jointly</td>
        <td>${{roth_ira_mfj_phaseout_start}} - ${{roth_ira_mfj_phaseout_end}}</td>
        <td>Above ${{roth_ira_mfj_phaseout_end}}</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Key Benefits</div>
    <ul>
      <li>Tax-free growth and withdrawals in retirement</li>
      <li>No required minimum distributions (RMDs)</li>
      <li>Contributions can be withdrawn penalty-free at any time</li>
      <li>Earnings can be withdrawn penalty-free after age 59½ and 5-year rule</li>
    </ul>
  </div>

  <div class="footer">
    <p>This information is current as of {{current_date}} and subject to change based on tax law updates.</p>
    <p>Consult with a qualified financial advisor for personalized advice.</p>
  </div>
</body>
</html>`,

  '401k-guide': `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
    .header { text-align: center; border-bottom: 3px solid #0066cc; padding-bottom: 20px; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: bold; color: #0066cc; margin-bottom: 10px; }
    .subtitle { font-size: 14px; color: #666; }
    .section { margin: 25px 0; }
    .section-title { font-size: 18px; font-weight: bold; color: #0066cc; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
    .highlight-box { background-color: #f0f8ff; padding: 20px; border-left: 4px solid #0066cc; margin: 15px 0; }
    .two-column { display: flex; gap: 30px; }
    .column { flex: 1; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .variable { color: #0066cc; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">401(k) Contribution Guide</div>
    <div class="subtitle">Tax Year {{current_year}} | Updated {{current_date}}</div>
  </div>

  <div class="section">
    <div class="section-title">Contribution Limits</div>
    <div class="two-column">
      <div class="column">
        <div class="highlight-box">
          <h4>Employee Contributions</h4>
          <p><strong>Annual Limit:</strong> <span class="variable">${{401k_employee_limit}}</span></p>
          <p><strong>Catch-up (Age 50+):</strong> <span class="variable">${{401k_catchup_limit}}</span></p>
        </div>
      </div>
      <div class="column">
        <div class="highlight-box">
          <h4>Total Contributions</h4>
          <p><strong>Annual Limit:</strong> <span class="variable">${{401k_total_limit}}</span></p>
          <p><strong>With Catch-up:</strong> <span class="variable">${{401k_total_with_catchup}}</span></p>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Tax Benefits</div>
    <ul>
      <li>Pre-tax contributions reduce current taxable income</li>
      <li>Tax-deferred growth until withdrawal</li>
      <li>Potential employer matching contributions</li>
      <li>Higher contribution limits than IRAs</li>
    </ul>
  </div>

  <div class="footer">
    <p>Information current as of {{current_date}}. Limits are subject to annual adjustments by the IRS.</p>
  </div>
</body>
</html>`
}

export const TemplateEditor = () => {
  const { data: templates, isLoading } = useReportTemplates()
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    template_name: '',
    html_content: '',
    report_type: '',
    folder: '',
    subfolder: '',
    associated_variables: [] as string[]
  })

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

  const handleCreateTemplate = () => {
    // This would typically save to Supabase
    console.log('Creating template:', newTemplate)
    setShowCreateDialog(false)
    // Reset form
    setNewTemplate({
      template_name: '',
      html_content: '',
      report_type: '',
      folder: '',
      subfolder: '',
      associated_variables: []
    })
  }

  const loadSampleTemplate = (templateKey: string) => {
    const sampleContent = sampleTemplates[templateKey as keyof typeof sampleTemplates]
    setNewTemplate(prev => ({
      ...prev,
      html_content: sampleContent,
      template_name: templateKey === 'roth-ira' ? 'Roth IRA Guide' : '401(k) Guide',
      report_type: 'Planning Guide',
      folder: 'Retirement Planning'
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Report Templates</h2>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create HTML Template</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template_name">Template Name</Label>
                  <Input
                    id="template_name"
                    value={newTemplate.template_name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, template_name: e.target.value }))}
                    placeholder="e.g., Roth IRA Guide"
                  />
                </div>
                <div>
                  <Label htmlFor="report_type">Report Type</Label>
                  <Input
                    id="report_type"
                    value={newTemplate.report_type}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, report_type: e.target.value }))}
                    placeholder="e.g., Planning Guide"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="folder">Folder</Label>
                  <Input
                    id="folder"
                    value={newTemplate.folder}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, folder: e.target.value }))}
                    placeholder="e.g., Retirement Planning"
                  />
                </div>
                <div>
                  <Label htmlFor="subfolder">Subfolder (Optional)</Label>
                  <Input
                    id="subfolder"
                    value={newTemplate.subfolder}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, subfolder: e.target.value }))}
                    placeholder="e.g., IRA Information"
                  />
                </div>
              </div>

              <div>
                <Label>Quick Start Templates</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadSampleTemplate('roth-ira')}
                  >
                    Load Roth IRA Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadSampleTemplate('401k-guide')}
                  >
                    Load 401(k) Template
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="html_content">HTML Template Content</Label>
                <Textarea
                  id="html_content"
                  value={newTemplate.html_content}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, html_content: e.target.value }))}
                  placeholder="Enter your HTML template with {{variable_name}} placeholders..."
                  className="min-h-[300px] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use <code>{'{{'}</code>variable_name<code>{'}}'}</code> for dynamic content. 
                  Available variables: current_date, current_year, and any variables you create in the Variable Manager.
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Instructions Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-800">How to Create HTML Templates</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 space-y-2">
          <p><strong>1. Structure:</strong> Use standard HTML with inline CSS for styling</p>
          <p><strong>2. Variables:</strong> Use <code className="bg-white px-1 rounded">{'{{'}</code>variable_name<code className="bg-white px-1 rounded">{'}}'}</code> for dynamic content</p>
          <p><strong>3. Styling:</strong> Include CSS in a <code className="bg-white px-1 rounded">&lt;style&gt;</code> tag in the <code className="bg-white px-1 rounded">&lt;head&gt;</code></p>
          <p><strong>4. Layout:</strong> Use divs with classes for sections, headers, and footers</p>
          <p><strong>5. Variables:</strong> Manage dynamic content in the Variable Manager tab</p>
        </CardContent>
      </Card>

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
