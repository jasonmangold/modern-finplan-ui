import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, DollarSign, TrendingUp, Settings, Plus, Trash2, HelpCircle } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { HelpDialog } from "./HelpDialog";
import { getHelpText } from "@/data/helpTexts";
import { useState } from "react";
import React from "react";
export const RetirementAccumulationInputs = () => {
  const {
    sharedInputs,
    updateSharedInput
  } = useFormContext();
  const [activeTab, setActiveTab] = useState("personal");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };

  // Currency formatting helpers
  const formatCurrency = (value: string) => {
    if (!value || value === '') return '';
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return '';
    // Convert to number and format with commas
    const number = parseInt(numericValue, 10);
    return '$' + number.toLocaleString();
  };

  const handleCurrencyChange = (fieldName: keyof typeof sharedInputs, value: string) => {
    // Store the raw numeric value (remove formatting)
    const numericValue = value.replace(/[^\d]/g, '');
    updateSharedInput(fieldName, numericValue);
  };

  const getCurrencyDisplayValue = (value: string) => {
    return formatCurrency(value);
  };

  // Percentage formatting helpers
  const formatPercentage = (value: string) => {
    if (!value || value === '') return '';
    // Allow digits and decimal point
    let numericValue = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const decimalIndex = numericValue.indexOf('.');
    if (decimalIndex !== -1) {
      numericValue = numericValue.substring(0, decimalIndex + 1) + 
                    numericValue.substring(decimalIndex + 1).replace(/\./g, '');
      
      // Limit to 2 decimal places
      const afterDecimal = numericValue.substring(decimalIndex + 1);
      if (afterDecimal.length > 2) {
        numericValue = numericValue.substring(0, decimalIndex + 3);
      }
    }
    
    // Convert to number and check max value
    const number = parseFloat(numericValue);
    if (isNaN(number)) return '';
    if (number > 25) return '25';
    
    return numericValue;
  };

  const handlePercentageChange = (fieldName: keyof typeof sharedInputs, value: string) => {
    // Handle empty string
    if (value === '') {
      updateSharedInput(fieldName, '');
      return;
    }

    // Allow digits and decimal point only (allowDecimals: true)
    let numericValue = value.replace(/[^\d.]/g, '');
    
    // maxLength: 5 - limit total characters
    if (numericValue.length > 5) {
      numericValue = numericValue.substring(0, 5);
    }
    
    // Ensure only one decimal point
    const decimalIndex = numericValue.indexOf('.');
    if (decimalIndex !== -1) {
      numericValue = numericValue.substring(0, decimalIndex + 1) + 
                    numericValue.substring(decimalIndex + 1).replace(/\./g, '');
      
      // decimalPrecision: 2 - limit to 2 decimal places
      const afterDecimal = numericValue.substring(decimalIndex + 1);
      if (afterDecimal.length > 2) {
        numericValue = numericValue.substring(0, decimalIndex + 3);
      }
    }
    
    // Check minValue: 0 and maxValue: 25
    const number = parseFloat(numericValue);
    if (!isNaN(number)) {
      if (number < 0) {
        numericValue = '0';
      } else if (number > 25) {
        numericValue = '25';
      }
    }
    
    updateSharedInput(fieldName, numericValue);
  };

  const getPercentageDisplayValue = (value: string) => {
    return formatPercentage(value);
  };

  const addIncomeSource = () => {
    const newSource = {
      Name: '',
      TypeOfIncome: 'Pension',
      Owner1BasedIndex: 'Client 1',
      StartAge: '',
      Amount: '',
      IncomeTimeFrame: 'Monthly',
      Period: 'Present Value',
      PayableForLife: 'Life',
      EndAge: '',
      AnnualInflationRate: '',
      InflationDuration: 'for life',
      PercentAvailableToSurvivor: ''
    };
    const newSources = [...sharedInputs.otherIncomeSources, newSource];
    updateSharedInput('otherIncomeSources', newSources);
  };
  const removeIncomeSource = (index: number) => {
    const newSources = sharedInputs.otherIncomeSources.filter((_, i) => i !== index);
    updateSharedInput('otherIncomeSources', newSources);
  };
  const updateIncomeSource = (index: number, field: string, value: string) => {
    const newSources = [...sharedInputs.otherIncomeSources];
    let processedValue = value;
    
    // Handle currency formatting for Amount field
    if (field === 'Amount') {
      processedValue = value.replace(/[^\d]/g, '');
    }
    
    // Handle percentage formatting for AnnualInflationRate field
    if (field === 'AnnualInflationRate') {
      // Handle empty string
      if (value === '') {
        processedValue = '';
      } else {
        // Allow digits and decimal point only (allowDecimals: true)
        processedValue = value.replace(/[^\d.]/g, '');
        
        // maxLength: 5 - limit total characters
        if (processedValue.length > 5) {
          processedValue = processedValue.substring(0, 5);
        }
        
        // Ensure only one decimal point
        const decimalIndex = processedValue.indexOf('.');
        if (decimalIndex !== -1) {
          processedValue = processedValue.substring(0, decimalIndex + 1) + 
                         processedValue.substring(decimalIndex + 1).replace(/\./g, '');
          
          // decimalPrecision: 2 - limit to 2 decimal places
          const afterDecimal = processedValue.substring(decimalIndex + 1);
          if (afterDecimal.length > 2) {
            processedValue = processedValue.substring(0, decimalIndex + 3);
          }
        }
        
        // Check minValue: 0 and maxValue: 25
        const number = parseFloat(processedValue);
        if (!isNaN(number)) {
          if (number < 0) {
            processedValue = '0';
          } else if (number > 25) {
            processedValue = '25';
          }
        }
      }
    }
    
    newSources[index] = {
      ...newSources[index],
      [field]: processedValue
    };
    updateSharedInput('otherIncomeSources', newSources);
  };
  return <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-foreground">Analysis Inputs</h2>
        <Button variant="ghost" size="sm" onClick={handleHelpClick} className="flex items-center gap-1 text-muted-foreground hover:text-foreground p-1 h-auto">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start bg-muted h-auto p-1 gap-1">
          <TabsTrigger value="personal" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Users className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="income-needs" className="flex items-center gap-2 px-3 py-2 text-sm">
            <DollarSign className="h-4 w-4" />
            Income Needs
          </TabsTrigger>
          <TabsTrigger value="income-sources" className="flex items-center gap-2 px-3 py-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            Income Sources
          </TabsTrigger>
          <TabsTrigger value="capital" className="flex items-center gap-2 px-3 py-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            Capital
          </TabsTrigger>
          <TabsTrigger value="assumptions" className="flex items-center gap-2 px-3 py-2 text-sm">
            <Settings className="h-4 w-4" />
            Assumptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              {/* Client 1 Section */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div className="border-l-4 border-primary/20 pl-3">
                  <Label className="text-base font-medium text-foreground">Client 1</Label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">First Name</Label>
                    <Input value={sharedInputs.Client1_FirstName} onChange={e => updateSharedInput('Client1_FirstName', e.target.value)} placeholder="Enter first name" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">Middle Name</Label>
                    <Input value={sharedInputs.Client1_MiddleName} onChange={e => updateSharedInput('Client1_MiddleName', e.target.value)} placeholder="Enter middle name" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">Last Name</Label>
                    <Input value={sharedInputs.Client1_LastName} onChange={e => updateSharedInput('Client1_LastName', e.target.value)} placeholder="Enter last name" className="h-9" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">Date of Birth</Label>
                    <Input type="date" value={sharedInputs.Client1_BirthDate} onChange={e => updateSharedInput('Client1_BirthDate', e.target.value)} className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">Retirement Age</Label>
                    <Input value={sharedInputs.Client1_RetirementAge} onChange={e => updateSharedInput('Client1_RetirementAge', e.target.value)} placeholder="67" className="h-9" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="hasClient2" checked={sharedInputs.hasClient2} onCheckedChange={checked => updateSharedInput('hasClient2', checked)} />
                <Label htmlFor="hasClient2" className="text-sm">Add Client 2</Label>
              </div>

              {sharedInputs.hasClient2 && <>
                  {/* Client 2 Section */}
                  <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                    <div className="border-l-4 border-primary/20 pl-3">
                      <Label className="text-base font-medium text-foreground">Client 2</Label>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">First Name</Label>
                        <Input value={sharedInputs.Client2_FirstName} onChange={e => updateSharedInput('Client2_FirstName', e.target.value)} placeholder="Enter first name" className="h-9" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">Middle Name</Label>
                        <Input value={sharedInputs.Client2_MiddleName} onChange={e => updateSharedInput('Client2_MiddleName', e.target.value)} placeholder="Enter middle name" className="h-9" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">Last Name</Label>
                        <Input value={sharedInputs.Client2_LastName} onChange={e => updateSharedInput('Client2_LastName', e.target.value)} placeholder="Enter last name" className="h-9" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">Date of Birth</Label>
                        <Input type="date" value={sharedInputs.Client2_BirthDate} onChange={e => updateSharedInput('Client2_BirthDate', e.target.value)} className="h-9" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">Retirement Age</Label>
                        <Input value={sharedInputs.Client2_RetirementAge} onChange={e => updateSharedInput('Client2_RetirementAge', e.target.value)} placeholder="67" className="h-9" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="married" checked={sharedInputs.ClientsAreMarried} onCheckedChange={checked => updateSharedInput('ClientsAreMarried', checked)} />
                    <Label htmlFor="married" className="text-sm">Married</Label>
                  </div>
                </>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-needs" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Monthly Income Needs</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {/* Monthly income needs header */}
              

              {/* Beginning at retirement section */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <Label className="text-sm font-medium">Beginning at retirement</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="retirementAmount" name="retirementIncomeType" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="retirementAmount" className="text-sm">$</Label>
                    <Input placeholder="0" className="w-24 h-8" />
                    <Label className="text-sm">or</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="retirementPercent" name="retirementIncomeType" className="h-4 w-4" />
                    <Input placeholder="0" className="w-16 h-8" />
                    <Label className="text-sm">% of total current income</Label>
                  </div>
                </div>
              </div>

              {/* Beginning X years after retirement - Period 1 */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Beginning</Label>
                  <Input placeholder="0" className="w-16 h-8" />
                  <Label className="text-sm font-medium">years after retirement</Label>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="period1Amount" name="period1IncomeType" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="period1Amount" className="text-sm">$</Label>
                    <Input placeholder="0" className="w-24 h-8" />
                    <Label className="text-sm">or</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="period1Percent" name="period1IncomeType" className="h-4 w-4" />
                    <Input placeholder="0" className="w-16 h-8" />
                    <Label className="text-sm">% of total current income</Label>
                  </div>
                </div>
              </div>

              {/* Beginning X years after retirement - Period 2 */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Beginning</Label>
                  <Input placeholder="0" className="w-16 h-8" />
                  <Label className="text-sm font-medium">years after retirement</Label>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="period2Amount" name="period2IncomeType" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="period2Amount" className="text-sm">$</Label>
                    <Input placeholder="0" className="w-24 h-8" />
                    <Label className="text-sm">or</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="period2Percent" name="period2IncomeType" className="h-4 w-4" />
                    <Input placeholder="0" className="w-16 h-8" />
                    <Label className="text-sm">% of total current income</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-sources" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Income Sources</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              {/* Employment Income Section */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div className="border-l-4 border-primary/20 pl-3">
                  <Label className="text-base font-medium text-foreground">Employment Income</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">Client 1 Annual Employment Income</Label>
                    <Input 
                      value={getCurrencyDisplayValue(sharedInputs.Client1_AnnualSalary)} 
                      onChange={e => handleCurrencyChange('Client1_AnnualSalary', e.target.value)} 
                      placeholder="$100,000" 
                      className="h-9"
                      maxLength={10}
                      data-backend-name="Client1_AnnualSalary"
                      data-label="Client 1 Annual Employment Income"
                      data-xtype="currency"
                      data-min-length={0}
                      data-max-length={7}
                      data-min-value={0}
                    />
                  </div>
                  {sharedInputs.hasClient2 && (
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-foreground">Client 2 Annual Employment Income</Label>
                      <Input 
                        value={getCurrencyDisplayValue(sharedInputs.Client2_AnnualSalary)} 
                        onChange={e => handleCurrencyChange('Client2_AnnualSalary', e.target.value)} 
                        placeholder="$80,000" 
                        className="h-9"
                        maxLength={10}
                        data-backend-name="Client2_AnnualSalary"
                        data-label="Client 2 Annual Employment Income"
                        data-xtype="currency"
                        data-min-length={0}
                        data-max-length={7}
                        data-min-value={0}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Social Security Section */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div className="border-l-4 border-primary/20 pl-3">
                  <Label className="text-base font-medium text-foreground">Social Security</Label>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="useOptimizer" 
                    checked={sharedInputs.UseOptimizer} 
                    onCheckedChange={checked => updateSharedInput('UseOptimizer', checked)} 
                  />
                  <Label htmlFor="useOptimizer" className="text-sm font-medium text-foreground">Use Optimizer</Label>
                </div>

                {/* Client 1 Social Security */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Client 1</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-foreground">Type</Label>
                      <Select 
                        value={sharedInputs.client1SocialSecurityType || 'Earnings'} 
                        onValueChange={value => updateSharedInput('client1SocialSecurityType', value)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spousal Only">Spousal Only</SelectItem>
                          <SelectItem value="Earnings">Earnings</SelectItem>
                          <SelectItem value="Maximum">Maximum</SelectItem>
                          <SelectItem value="PIA User Input">PIA User Input</SelectItem>
                          <SelectItem value="Not Eligible">Not Eligible</SelectItem>
                          <SelectItem value="Monthly Amount">Monthly Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-foreground">Retirement</Label>
                      <Input 
                        value={getCurrencyDisplayValue(sharedInputs.client1RetirementSocialSecurity)} 
                        onChange={e => handleCurrencyChange('client1RetirementSocialSecurity', e.target.value)} 
                        placeholder="$35,000" 
                        className={`h-9 ${(!sharedInputs.client1SocialSecurityType || (sharedInputs.client1SocialSecurityType !== 'PIA User Input' && sharedInputs.client1SocialSecurityType !== 'Monthly Amount')) ? 'bg-muted text-muted-foreground' : ''}`}
                        disabled={!sharedInputs.client1SocialSecurityType || (sharedInputs.client1SocialSecurityType !== 'PIA User Input' && sharedInputs.client1SocialSecurityType !== 'Monthly Amount')}
                        maxLength={10}
                        data-backend-name="client1RetirementSocialSecurity"
                        data-label="Client 1 Retirement Social Security"
                        data-xtype="currency"
                        data-min-length={0}
                        data-max-length={7}
                        data-min-value={0}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-foreground">Survivor</Label>
                      <Input 
                        value={getCurrencyDisplayValue(sharedInputs.client1SurvivorSocialSecurity)} 
                        onChange={e => handleCurrencyChange('client1SurvivorSocialSecurity', e.target.value)} 
                        placeholder="$30,000" 
                        className={`h-9 ${(!sharedInputs.client1SocialSecurityType || (sharedInputs.client1SocialSecurityType !== 'PIA User Input' && sharedInputs.client1SocialSecurityType !== 'Monthly Amount')) ? 'bg-muted text-muted-foreground' : ''}`}
                        disabled={!sharedInputs.client1SocialSecurityType || (sharedInputs.client1SocialSecurityType !== 'PIA User Input' && sharedInputs.client1SocialSecurityType !== 'Monthly Amount')}
                        maxLength={10}
                        data-backend-name="client1SurvivorSocialSecurity"
                        data-label="Client 1 Survivor Social Security"
                        data-xtype="currency"
                        data-min-length={0}
                        data-max-length={7}
                        data-min-value={0}
                      />
                    </div>
                  </div>
                </div>

                {/* Client 2 Social Security */}
                {sharedInputs.hasClient2 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">Client 2</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">Type</Label>
                        <Select 
                          value={sharedInputs.client2SocialSecurityType || 'Earnings'} 
                          onValueChange={value => updateSharedInput('client2SocialSecurityType', value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Spousal Only">Spousal Only</SelectItem>
                            <SelectItem value="Earnings">Earnings</SelectItem>
                            <SelectItem value="Maximum">Maximum</SelectItem>
                            <SelectItem value="PIA User Input">PIA User Input</SelectItem>
                            <SelectItem value="Not Eligible">Not Eligible</SelectItem>
                            <SelectItem value="Monthly Amount">Monthly Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">Retirement</Label>
                        <Input 
                          value={getCurrencyDisplayValue(sharedInputs.client2RetirementSocialSecurity)} 
                          onChange={e => handleCurrencyChange('client2RetirementSocialSecurity', e.target.value)} 
                          placeholder="$30,000" 
                          className={`h-9 ${(!sharedInputs.client2SocialSecurityType || (sharedInputs.client2SocialSecurityType !== 'PIA User Input' && sharedInputs.client2SocialSecurityType !== 'Monthly Amount')) ? 'bg-muted text-muted-foreground' : ''}`}
                          disabled={!sharedInputs.client2SocialSecurityType || (sharedInputs.client2SocialSecurityType !== 'PIA User Input' && sharedInputs.client2SocialSecurityType !== 'Monthly Amount')}
                          maxLength={10}
                          data-backend-name="client2RetirementSocialSecurity"
                          data-label="Client 2 Retirement Social Security"
                          data-xtype="currency"
                          data-min-length={0}
                          data-max-length={7}
                          data-min-value={0}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">Survivor</Label>
                        <Input 
                          value={getCurrencyDisplayValue(sharedInputs.client2SurvivorSocialSecurity)} 
                          onChange={e => handleCurrencyChange('client2SurvivorSocialSecurity', e.target.value)} 
                          placeholder="$25,000" 
                          className={`h-9 ${(!sharedInputs.client2SocialSecurityType || (sharedInputs.client2SocialSecurityType !== 'PIA User Input' && sharedInputs.client2SocialSecurityType !== 'Monthly Amount')) ? 'bg-muted text-muted-foreground' : ''}`}
                          disabled={!sharedInputs.client2SocialSecurityType || (sharedInputs.client2SocialSecurityType !== 'PIA User Input' && sharedInputs.client2SocialSecurityType !== 'Monthly Amount')}
                          maxLength={10}
                          data-backend-name="client2SurvivorSocialSecurity"
                          data-label="Client 2 Survivor Social Security"
                          data-xtype="currency"
                          data-min-length={0}
                          data-max-length={7}
                          data-min-value={0}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Income Sources Section */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="border-l-4 border-primary/20 pl-3">
                    <Label className="text-base font-medium text-foreground">Other Income Sources</Label>
                  </div>
                  <Button onClick={addIncomeSource} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Income Source
                  </Button>
                </div>

                {sharedInputs.otherIncomeSources.map((source, index) => <div key={index} className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Income Source {index + 1}</Label>
                      <Button onClick={() => removeIncomeSource(index)} size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Row 1: Name, Type, Owner */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm">Name</Label>
                        <Input value={source.Name} onChange={e => updateIncomeSource(index, 'Name', e.target.value)} placeholder="Income source name" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Type</Label>
                        <Select value={source.TypeOfIncome} onValueChange={value => updateIncomeSource(index, 'TypeOfIncome', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pension">Pension</SelectItem>
                            <SelectItem value="Annuity">Annuity</SelectItem>
                            <SelectItem value="Rental Income">Rental Income</SelectItem>
                            <SelectItem value="Business Income">Business Income</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Owner</Label>
                        <Select value={source.Owner1BasedIndex} onValueChange={value => updateIncomeSource(index, 'Owner1BasedIndex', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Client 1">Client 1</SelectItem>
                            <SelectItem value="Client 2">Client 2</SelectItem>
                            <SelectItem value="Joint">Joint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Row 2: Frequency, Amount, Start Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm">Frequency</Label>
                        <Select value={source.IncomeTimeFrame} onValueChange={value => updateIncomeSource(index, 'IncomeTimeFrame', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="Lump Sum">Lump Sum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Amount</Label>
                        <Input 
                          value={formatCurrency(source.Amount)} 
                          onChange={e => updateIncomeSource(index, 'Amount', e.target.value)} 
                          placeholder="$2,000"
                          maxLength={10}
                          data-backend-name={`otherIncomeSource_${index}_Amount`}
                          data-label={`Other Income Source ${index + 1} Amount`}
                          data-xtype="currency"
                          data-min-length={0}
                          data-max-length={7}
                          data-min-value={0}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Start Age</Label>
                        <Input value={source.StartAge} onChange={e => updateIncomeSource(index, 'StartAge', e.target.value)} placeholder="65" />
                      </div>
                    </div>

                    {/* Row 3: Value Type, Payable For, End Age (conditional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm">Value Type</Label>
                        <Select value={source.Period} onValueChange={value => updateIncomeSource(index, 'Period', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present Value">Present Value</SelectItem>
                            <SelectItem value="Future Value">Future Value</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Payable For</Label>
                        <Select value={source.PayableForLife} onValueChange={value => updateIncomeSource(index, 'PayableForLife', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Life">Life</SelectItem>
                            <SelectItem value="Until Specific Age">Until Specific Age</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {source.PayableForLife === 'Until Specific Age' && (
                        <div className="space-y-1.5">
                          <Label className="text-sm">End Age</Label>
                          <Input value={source.EndAge} onChange={e => updateIncomeSource(index, 'EndAge', e.target.value)} placeholder="85" />
                        </div>
                      )}
                    </div>

                    {/* Row 4: Inflation Rate with Radio Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm">Inflate Amount annual at</Label>
                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                           <div className="relative flex items-center w-20">
                             <Input 
                               value={source.AnnualInflationRate} 
                               onChange={e => updateIncomeSource(index, 'AnnualInflationRate', e.target.value)} 
                               placeholder="3.0" 
                               className="text-right pr-6"
                               maxLength={5}
                               data-backend-name={`otherIncomeSource_${index}_AnnualInflationRate`}
                               data-label={`Other Income Source ${index + 1} Annual Inflation Rate`}
                               data-xtype="percentage"
                               data-min-length={0}
                               data-max-length={5}
                               data-min-value={0}
                               data-max-value={25}
                             />
                             <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                           </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id={`forLife${index}`}
                                name={`inflationDuration${index}`}
                                value="for life"
                                checked={source.InflationDuration === 'for life'}
                                onChange={e => updateIncomeSource(index, 'InflationDuration', e.target.value)}
                                className="h-4 w-4" 
                              />
                              <Label htmlFor={`forLife${index}`} className="text-sm">for life</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id={`untilStartStage${index}`}
                                name={`inflationDuration${index}`}
                                value="until start stage"
                                checked={source.InflationDuration === 'until start stage'}
                                onChange={e => updateIncomeSource(index, 'InflationDuration', e.target.value)}
                                className="h-4 w-4" 
                              />
                              <Label htmlFor={`untilStartStage${index}`} className="text-sm">until start stage</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Percent Available to Survivors</Label>
                        <Input 
                          value={source.PercentAvailableToSurvivor} 
                          onChange={e => updateIncomeSource(index, 'PercentAvailableToSurvivor', e.target.value)} 
                          placeholder="100%" 
                        />
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Capital</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              {/* Retirement Plans header */}
              <div className="border-l-4 border-primary/20 pl-3">
                <Label className="text-sm font-medium text-muted-foreground">Retirement Plans</Label>
              </div>

              {/* Client 1 Retirement Plans */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <Label className="text-sm font-medium">Client 1</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Retirement Balance</Label>
                    <Input 
                      value={getCurrencyDisplayValue(sharedInputs.Client1_RPBalance)} 
                      onChange={e => handleCurrencyChange('Client1_RPBalance', e.target.value)} 
                      placeholder="$500,000"
                      maxLength={10}
                      data-backend-name="Client1_RPBalance"
                      data-label="Client 1 Retirement Balance"
                      data-xtype="currency"
                      data-min-length={0}
                      data-max-length={7}
                      data-min-value={0}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Monthly Contributions</Label>
                    <Input 
                      value={getCurrencyDisplayValue(sharedInputs.Client1_RPMonthlyContribution)} 
                      onChange={e => handleCurrencyChange('Client1_RPMonthlyContribution', e.target.value)} 
                      placeholder="$2,000"
                      maxLength={10}
                      data-backend-name="Client1_RPMonthlyContribution"
                      data-label="Client 1 Monthly Contributions"
                      data-xtype="currency"
                      data-min-length={0}
                      data-max-length={7}
                      data-min-value={0}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Company Match</Label>
                    <Input 
                      value={getCurrencyDisplayValue(sharedInputs.Client1_RPCompanyMatch)} 
                      onChange={e => handleCurrencyChange('Client1_RPCompanyMatch', e.target.value)} 
                      placeholder="$500"
                      maxLength={10}
                      data-backend-name="Client1_RPCompanyMatch"
                      data-label="Client 1 Company Match"
                      data-xtype="currency"
                      data-min-length={0}
                      data-max-length={7}
                      data-min-value={0}
                    />
                  </div>
                   <div className="space-y-1.5">
                     <Label className="text-sm">Annual Increase</Label>
                     <div className="relative flex items-center">
                       <Input 
                         value={sharedInputs.Client1_RPAnnualIncrease} 
                         onChange={e => handlePercentageChange('Client1_RPAnnualIncrease', e.target.value)} 
                         placeholder="3"
                         className="text-right pr-6"
                         maxLength={5}
                         data-backend-name="Client1_RPAnnualIncrease"
                         data-label="Client 1 Annual Increase"
                         data-xtype="percentage"
                         data-min-length={0}
                         data-max-length={5}
                         data-min-value={0}
                         data-max-value={25}
                       />
                       <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                     </div>
                   </div>
                   <div className="space-y-1.5">
                     <Label className="text-sm">Rate of Return</Label>
                     <div className="relative flex items-center">
                       <Input 
                         value={sharedInputs.Client1_RPRateOfReturn} 
                         onChange={e => handlePercentageChange('Client1_RPRateOfReturn', e.target.value)} 
                         placeholder="7"
                         className="text-right pr-6"
                         maxLength={5}
                         data-backend-name="Client1_RPRateOfReturn"
                         data-label="Client 1 Rate of Return"
                         data-xtype="percentage"
                         data-min-length={0}
                         data-max-length={5}
                         data-min-value={0}
                         data-max-value={25}
                       />
                       <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* Client 2 Retirement Plans */}
              {sharedInputs.hasClient2 && <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                  <Label className="text-sm font-medium">Client 2</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">Retirement Balance</Label>
                      <Input 
                        value={getCurrencyDisplayValue(sharedInputs.Client2_RPBalance)} 
                        onChange={e => handleCurrencyChange('Client2_RPBalance', e.target.value)} 
                        placeholder="$300,000"
                        maxLength={10}
                        data-backend-name="Client2_RPBalance"
                        data-label="Client 2 Retirement Balance"
                        data-xtype="currency"
                        data-min-length={0}
                        data-max-length={7}
                        data-min-value={0}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">Monthly Contributions</Label>
                      <Input 
                        value={getCurrencyDisplayValue(sharedInputs.Client2_RPMonthlyContribution)} 
                        onChange={e => handleCurrencyChange('Client2_RPMonthlyContribution', e.target.value)} 
                        placeholder="$1,500"
                        maxLength={10}
                        data-backend-name="Client2_RPMonthlyContribution"
                        data-label="Client 2 Monthly Contributions"
                        data-xtype="currency"
                        data-min-length={0}
                        data-max-length={7}
                        data-min-value={0}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">Company Match</Label>
                      <Input 
                        value={getCurrencyDisplayValue(sharedInputs.Client2_RPCompanyMatch)} 
                        onChange={e => handleCurrencyChange('Client2_RPCompanyMatch', e.target.value)} 
                        placeholder="$400"
                        maxLength={10}
                        data-backend-name="Client2_RPCompanyMatch"
                        data-label="Client 2 Company Match"
                        data-xtype="currency"
                        data-min-length={0}
                        data-max-length={7}
                        data-min-value={0}
                      />
                    </div>
                     <div className="space-y-1.5">
                       <Label className="text-sm">Annual Increase</Label>
                       <div className="relative flex items-center">
                         <Input 
                           value={sharedInputs.Client2_RPAnnualIncrease} 
                           onChange={e => handlePercentageChange('Client2_RPAnnualIncrease', e.target.value)}
                           placeholder="3"
                           className="text-right pr-6"
                           maxLength={5}
                           data-backend-name="Client2_RPAnnualIncrease"
                           data-label="Client 2 Annual Increase"
                           data-xtype="percentage"
                           data-min-length={0}
                           data-max-length={5}
                           data-min-value={0}
                           data-max-value={25}
                         />
                         <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                       </div>
                     </div>
                     <div className="space-y-1.5">
                       <Label className="text-sm">Rate of Return</Label>
                       <div className="relative flex items-center">
                         <Input 
                           value={sharedInputs.Client2_RPRateOfReturn} 
                           onChange={e => handlePercentageChange('Client2_RPRateOfReturn', e.target.value)}
                           placeholder="7"
                           className="text-right pr-6"
                           maxLength={5}
                           data-backend-name="Client2_RPRateOfReturn"
                           data-label="Client 2 Rate of Return"
                           data-xtype="percentage"
                           data-min-length={0}
                           data-max-length={5}
                           data-min-value={0}
                           data-max-value={25}
                         />
                         <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                       </div>
                     </div>
                  </div>
                </div>}

              {/* Other Assets */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <Label className="text-sm font-medium">Other Assets</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Balance</Label>
                    <Input 
                      value={getCurrencyDisplayValue(sharedInputs.OtherAssetBalance)} 
                      onChange={e => handleCurrencyChange('OtherAssetBalance', e.target.value)} 
                      placeholder="$100,000"
                      maxLength={10}
                      data-backend-name="OtherAssetBalance"
                      data-label="Other Assets Balance"
                      data-xtype="currency"
                      data-min-length={0}
                      data-max-length={7}
                      data-min-value={0}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Contributions</Label>
                    <Input 
                      value={getCurrencyDisplayValue(sharedInputs.OtherAssetMonthlyContribution)} 
                      onChange={e => handleCurrencyChange('OtherAssetMonthlyContribution', e.target.value)} 
                      placeholder="$500"
                      maxLength={10}
                      data-backend-name="OtherAssetMonthlyContribution"
                      data-label="Other Assets Monthly Contributions"
                      data-xtype="currency"
                      data-min-length={0}
                      data-max-length={7}
                      data-min-value={0}
                    />
                  </div>
                   <div className="space-y-1.5">
                     <Label className="text-sm">Rate of Return</Label>
                     <div className="relative flex items-center">
                       <Input 
                         value={sharedInputs.OtherAssetRoR} 
                         onChange={e => handlePercentageChange('OtherAssetRoR', e.target.value)}
                         placeholder="6"
                         className="text-right pr-6"
                         maxLength={5}
                         data-backend-name="OtherAssetRoR"
                         data-label="Other Assets Rate of Return"
                         data-xtype="percentage"
                         data-min-length={0}
                         data-max-length={5}
                         data-min-value={0}
                         data-max-value={25}
                       />
                       <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                     </div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4 mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Analysis Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Analysis Date</Label>
                <Input type="date" value={sharedInputs.AnalysisDate} onChange={e => updateSharedInput('AnalysisDate', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm">Mortality Age - Client 1</Label>
                  <Input value={sharedInputs.MortalityAge} onChange={e => updateSharedInput('MortalityAge', e.target.value)} placeholder="90" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Mortality Age - Client 2</Label>
                  <Input value={sharedInputs.MortalityAgeOfClient2} onChange={e => updateSharedInput('MortalityAgeOfClient2', e.target.value)} placeholder="90" />
                </div>
              </div>

               <div className="space-y-1.5">
                 <Label className="text-sm">Annual Inflation Rate</Label>
                 <div className="relative flex items-center">
                   <Input 
                     value={sharedInputs.AnnualInflationRate} 
                     onChange={e => handlePercentageChange('AnnualInflationRate', e.target.value)}
                     placeholder="3.0"
                     className="text-right pr-6"
                     maxLength={5}
                     data-backend-name="AnnualInflationRate"
                     data-label="Annual Inflation Rate"
                     data-xtype="percentage"
                     data-min-length={0}
                     data-max-length={5}
                     data-min-value={0}
                     data-max-value={25}
                   />
                   <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                 </div>
               </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                   <Label className="text-sm">Annual Employment Inflation Rate - Client 1</Label>
                   <div className="relative flex items-center">
                     <Input 
                       value={sharedInputs.Client1_AnnualEmploymentInflationRate} 
                       onChange={e => handlePercentageChange('Client1_AnnualEmploymentInflationRate', e.target.value)}
                       placeholder="3.0"
                       className="text-right pr-6"
                       maxLength={5}
                       data-backend-name="Client1_AnnualEmploymentInflationRate"
                       data-label="Client 1 Annual Employment Inflation Rate"
                       data-xtype="percentage"
                       data-min-length={0}
                       data-max-length={5}
                       data-min-value={0}
                       data-max-value={25}
                     />
                     <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <Label className="text-sm">Annual Employment Inflation Rate - Client 2</Label>
                   <div className="relative flex items-center">
                     <Input 
                       value={sharedInputs.Client2_AnnualEmploymentInflationRate} 
                       onChange={e => handlePercentageChange('Client2_AnnualEmploymentInflationRate', e.target.value)}
                       placeholder="3.0"
                       className="text-right pr-6"
                       maxLength={5}
                       data-backend-name="Client2_AnnualEmploymentInflationRate"
                       data-label="Client 2 Annual Employment Inflation Rate"
                       data-xtype="percentage"
                       data-min-length={0}
                       data-max-length={5}
                       data-min-value={0}
                       data-max-value={25}
                     />
                     <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                   </div>
                 </div>
              </div>

               <div className="space-y-1.5">
                 <Label className="text-sm">Annual Social Security Benefit Inflation Rate</Label>
                 <div className="relative flex items-center">
                   <Input 
                     value={sharedInputs.AnnualSocialSecurityBenefitInflationRate} 
                     onChange={e => handlePercentageChange('AnnualSocialSecurityBenefitInflationRate', e.target.value)}
                     placeholder="2.5"
                     className="text-right pr-6"
                     maxLength={5}
                     data-backend-name="AnnualSocialSecurityBenefitInflationRate"
                     data-label="Annual Social Security Benefit Inflation Rate"
                     data-xtype="percentage"
                     data-min-length={0}
                     data-max-length={5}
                     data-min-value={0}
                     data-max-value={25}
                   />
                   <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                 </div>
               </div>

              <div className="border-l-4 border-primary/20 pl-3 pt-4 mt-6">
                <Label className="text-sm font-medium text-muted-foreground">Specific to the Retirement Analysis</Label>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                 <div className="space-y-1.5">
                   <Label className="text-sm">Assumed Rate of Return During Retirement</Label>
                   <div className="relative flex items-center">
                     <Input 
                       value="" 
                       onChange={() => {}}
                       placeholder="5"
                       className="text-right pr-6"
                       maxLength={5}
                       data-backend-name="AssumedRateOfReturnDuringRetirement"
                       data-label="Assumed Rate of Return During Retirement"
                       data-xtype="percentage"
                       data-min-length={0}
                       data-max-length={5}
                       data-min-value={0}
                       data-max-value={25}
                     />
                     <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                   </div>
                 </div>
                
                 <div className="space-y-1.5">
                   <Label className="text-sm">Solution Rate of Return</Label>
                   <div className="relative flex items-center">
                     <Input 
                       value=""
                       onChange={() => {}}
                       placeholder="6"
                       className="text-right pr-6"
                       maxLength={5}
                       data-backend-name="SolutionRateOfReturn"
                       data-label="Solution Rate of Return"
                       data-xtype="percentage"
                       data-min-length={0}
                       data-max-length={5}
                       data-min-value={0}
                       data-max-value={25}
                     />
                     <span className="absolute right-2 text-sm text-muted-foreground pointer-events-none">%</span>
                   </div>
                 </div>
                
                <div className="space-y-1.5">
                  <Label className="text-sm">Number of Months Since the Last Review</Label>
                  <Input 
                    placeholder="12"
                    data-backend-name="NumberOfMonthsSinceLastReview"
                    data-label="Number of Months Since Last Review"
                    data-xtype="number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} sections={getHelpText("retirement-accumulation", activeTab)} title={`Retirement Accumulation - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Help`} />
    </div>;
};