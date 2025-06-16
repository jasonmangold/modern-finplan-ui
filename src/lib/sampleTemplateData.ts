
// Sample data structure for Supabase tables
// You'll need to create these tables in your Supabase database

export const sampleReportVariables = [
  {
    variable_name: 'ira_contribution_limit_2024',
    current_value: '$7,000',
    effective_date: '2024-01-01',
    report_category: 'retirement',
    description: 'Annual IRA contribution limit for 2024'
  },
  {
    variable_name: 'ira_catchup_limit_2024',
    current_value: '$1,000',
    effective_date: '2024-01-01',
    report_category: 'retirement',
    description: 'Additional catch-up contribution limit for those 50 and older'
  },
  {
    variable_name: 'federal_estate_tax_exemption',
    current_value: '$13,610,000',
    effective_date: '2024-01-01',
    report_category: 'estate',
    description: 'Federal estate tax exemption amount'
  },
  {
    variable_name: 'standard_deduction_single_2024',
    current_value: '$14,600',
    effective_date: '2024-01-01',
    report_category: 'tax',
    description: 'Standard deduction for single filers in 2024'
  }
]

export const sampleReportTemplate = {
  template_name: 'IRA Contribution Analysis',
  html_content: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px;">
      <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        IRA Contribution Analysis Report
      </h1>
      
      <p style="color: #666; margin-bottom: 20px;">
        Generated on: {{current_date}}
      </p>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #333; margin-top: 0;">2024 IRA Contribution Limits</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #007bff;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Regular Contribution</h3>
            <p style="font-size: 24px; font-weight: bold; color: #007bff; margin: 0;">
              {{ira_contribution_limit_2024}}
            </p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #28a745;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Catch-up (Age 50+)</h3>
            <p style="font-size: 24px; font-weight: bold; color: #28a745; margin: 0;">
              {{ira_catchup_limit_2024}}
            </p>
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Key Benefits</h3>
          <ul style="color: #666; line-height: 1.6;">
            <li>Tax-deductible contributions (Traditional IRA)</li>
            <li>Tax-free growth potential</li>
            <li>Flexibility in investment choices</li>
            <li>Additional catch-up contributions for those 50 and older</li>
          </ul>
        </div>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px;">
          <h4 style="color: #856404; margin-top: 0;">Important Note</h4>
          <p style="color: #856404; margin: 0;">
            Contribution limits are subject to income restrictions and may change annually. 
            Consult with your financial advisor for personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  `,
  associated_variables: ['ira_contribution_limit_2024', 'ira_catchup_limit_2024', 'current_date'],
  report_type: 'retirement',
  folder: 'Retirement Planning',
  subfolder: 'IRA Analysis'
}

// SQL to create the tables in Supabase:
export const createTablesSQL = `
-- Create report_variables table
CREATE TABLE report_variables (
  id SERIAL PRIMARY KEY,
  variable_name VARCHAR(255) UNIQUE NOT NULL,
  current_value TEXT NOT NULL,
  effective_date DATE NOT NULL,
  report_category VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create report_templates table
CREATE TABLE report_templates (
  id SERIAL PRIMARY KEY,
  template_name VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  associated_variables TEXT[] NOT NULL,
  report_type VARCHAR(100) NOT NULL,
  folder VARCHAR(255) NOT NULL,
  subfolder VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE report_variables ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your auth setup)
CREATE POLICY "Allow all operations for authenticated users" ON report_variables
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON report_templates
  FOR ALL USING (auth.role() = 'authenticated');
`;
