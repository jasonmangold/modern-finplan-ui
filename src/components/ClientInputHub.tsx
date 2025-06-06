import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, DollarSign, PiggyBank, CreditCard, Shield, TrendingUp } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { useEffect } from "react";

export const ClientInputHub = () => {
  const { updateSectionCompletion, updateFormData, formData, activeTab, setActiveTab } = useFormContext();

  // Check section completion logic
  const checkSectionCompletion = (sectionId: string, data: Record<string, any>) => {
    const requiredFields: Record<string, string[]> = {
      personal: ['primaryClient', 'age'],
      income: ['grossIncome', 'annualExpenses'],
      savings: ['401kBalance', 'cashSavings'],
      expenses: ['monthlyExpenses'],
      assets: ['homeValue', 'totalAssets'],
      insurance: ['lifeInsurance']
    };

    const required = requiredFields[sectionId] || [];
    const completed = required.every(field => data[field] && data[field].toString().trim() !== '');
    updateSectionCompletion(sectionId, completed);
  };

  const handleInputChange = (sectionId: string, field: string, value: any) => {
    updateFormData(field, value);
    const newData = { ...formData, [field]: value };
    checkSectionCompletion(sectionId, newData);
  };

  // Check all sections when formData changes
  useEffect(() => {
    ['personal', 'income', 'savings', 'expenses', 'assets', 'insurance'].forEach(sectionId => {
      checkSectionCompletion(sectionId, formData);
    });
  }, [formData]);

  return (
    <div className="h-full">
      <Card className="h-full border-0 shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Client Data Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 h-[calc(100%-80px)] overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-6 mb-4 mx-6 text-xs">
              <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
              <TabsTrigger value="income" className="text-xs">Income</TabsTrigger>
              <TabsTrigger value="savings" className="text-xs">Savings</TabsTrigger>
              <TabsTrigger value="expenses" className="text-xs">Expenses</TabsTrigger>
              <TabsTrigger value="assets" className="text-xs">Assets</TabsTrigger>
              <TabsTrigger value="insurance" className="text-xs">Insurance</TabsTrigger>
            </TabsList>

            <div className="h-[calc(100%-60px)] overflow-y-auto px-6">
              <TabsContent value="personal" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-4 w-4 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Personal & Demographics</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Primary Client</Label>
                      <Input 
                        value={formData.primaryClient || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('personal', 'primaryClient', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Spouse/Partner</Label>
                      <Input 
                        value={formData.spouse || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('personal', 'spouse', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Age (Primary)</Label>
                      <Input 
                        value={formData.age || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('personal', 'age', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Age (Spouse)</Label>
                      <Input 
                        value={formData.spouseAge || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('personal', 'spouseAge', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Retirement Age</Label>
                      <Input 
                        value={formData.retirementAge || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('personal', 'retirementAge', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Life Expectancy</Label>
                      <Input 
                        value={formData.lifeExpectancy || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('personal', 'lifeExpectancy', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Financial Goals</Label>
                    <Textarea 
                      value={formData.goals || ""}
                      placeholder="Primary financial objectives and goals..."
                      className="text-sm mt-1 resize-none"
                      rows={3}
                      onChange={(e) => handleInputChange('personal', 'goals', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="income" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <h3 className="font-medium text-gray-900">Income & Employment</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Annual Gross Income</Label>
                      <Input 
                        value={formData.grossIncome || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('income', 'grossIncome', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Spouse Income</Label>
                      <Input 
                        value={formData.spouseIncome || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('income', 'spouseIncome', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Other Income</Label>
                      <Input 
                        value={formData.otherIncome || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('income', 'otherIncome', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Annual Expenses</Label>
                      <Input 
                        value={formData.annualExpenses || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('income', 'annualExpenses', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="savings" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <PiggyBank className="h-4 w-4 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Savings & Investments</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">401(k) Balance</Label>
                      <Input 
                        value={formData.401kBalance || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('savings', '401kBalance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">IRA Balance</Label>
                      <Input 
                        value={formData.iraBalance || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('savings', 'iraBalance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Taxable Investments</Label>
                      <Input 
                        value={formData.taxableInvestments || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('savings', 'taxableInvestments', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Cash/Savings</Label>
                      <Input 
                        value={formData.cashSavings || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('savings', 'cashSavings', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="expenses" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-4 w-4 text-red-600" />
                    <h3 className="font-medium text-gray-900">Expenses & Cash Flow</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Monthly Housing</Label>
                      <Input 
                        value={formData.housing || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('expenses', 'housing', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Monthly Utilities</Label>
                      <Input 
                        value={formData.utilities || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('expenses', 'utilities', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Monthly Food</Label>
                      <Input 
                        value={formData.food || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('expenses', 'food', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Other Monthly Expenses</Label>
                      <Input 
                        value={formData.monthlyExpenses || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('expenses', 'monthlyExpenses', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assets" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Assets & Liabilities</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Home Value</Label>
                      <Input 
                        value={formData.homeValue || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('assets', 'homeValue', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Mortgage Balance</Label>
                      <Input 
                        value={formData.mortgageBalance || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('assets', 'mortgageBalance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Other Assets</Label>
                      <Input 
                        value={formData.otherAssets || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('assets', 'otherAssets', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Total Debt</Label>
                      <Input 
                        value={formData.totalAssets || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('assets', 'totalAssets', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insurance" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Insurance & Protection</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Life Insurance (Primary)</Label>
                      <Input 
                        value={formData.lifeInsurance || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('insurance', 'lifeInsurance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Life Insurance (Spouse)</Label>
                      <Input 
                        value={formData.spouseLifeInsurance || ""} 
                        className="text-sm mt-1"
                        onChange={(e) => handleInputChange('insurance', 'spouseLifeInsurance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Disability Insurance</Label>
                      <Select defaultValue="group">
                        <SelectTrigger className="text-sm mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="group">Group Coverage</SelectItem>
                          <SelectItem value="individual">Individual Policy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">LTC Insurance</Label>
                      <Select defaultValue="none">
                        <SelectTrigger className="text-sm mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="traditional">Traditional LTC</SelectItem>
                          <SelectItem value="hybrid">Hybrid Policy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
