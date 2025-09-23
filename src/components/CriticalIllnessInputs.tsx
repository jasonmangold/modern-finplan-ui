import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";

export const CriticalIllnessInputs = () => {
  const { sharedInputs, updateSharedInput } = useFormContext();

  const criticalIllnessFields = [
    { key: 'name', label: 'Name:', hasMonths: false },
    { key: 'incomeReplacement', label: 'Income replacement', hasMonths: true },
    { key: 'clients', label: 'Clients:', hasMonths: true },
    { key: 'domesticHelp', label: 'Domestic help:', hasMonths: true },
    { key: 'childcare', label: 'Childcare:', hasMonths: true },
    { key: 'homeModifications', label: 'Home modifications:', hasMonths: false },
    { key: 'medicalEquipment', label: 'Medical equipment:', hasMonths: false },
    { key: 'outOfPocketMedical', label: 'Out of pocket medical expense:', hasMonths: false },
    { key: 'continueRetirementSavingsClient', label: 'Continue retirement savings Client:', hasMonths: true },
    { key: 'continueRetirementSavingsOtherClient', label: 'Continue retirement savings other client:', hasMonths: true },
    { key: 'other', label: 'Other:', hasMonths: true },
    { key: 'currentCriticalIllnessAmount', label: 'Current critical illness insurance amount:', hasMonths: false }
  ];

  const handleInputChange = (client: 'client1' | 'client2', field: string, subfield: 'amount' | 'months', value: string) => {
    const fieldKey = `${client}CriticalIllness${field.charAt(0).toUpperCase()}${field.slice(1)}${subfield.charAt(0).toUpperCase()}${subfield.slice(1)}` as keyof typeof sharedInputs;
    updateSharedInput(fieldKey, value);
  };

  const getFieldValue = (client: 'client1' | 'client2', field: string, subfield: 'amount' | 'months'): string => {
    const fieldKey = `${client}CriticalIllness${field.charAt(0).toUpperCase()}${field.slice(1)}${subfield.charAt(0).toUpperCase()}${subfield.slice(1)}` as keyof typeof sharedInputs;
    return (sharedInputs[fieldKey] as string) || '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Critical Illness Analysis</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm">Analysis date:</Label>
          <Input 
            type="date"
            value={sharedInputs.AnalysisDate || ''}
            onChange={(e) => updateSharedInput('AnalysisDate', e.target.value)}
            className="mt-1 w-48" 
          />
        </div>

        <Tabs defaultValue="client1" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="client1" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Client 1
            </TabsTrigger>
            <TabsTrigger value="client2" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Client 2
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client1" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {criticalIllnessFields.map((field) => (
                    <div key={field.key} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6">
                        <Label className="text-sm">{field.label}</Label>
                      </div>
                      <div className="col-span-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Amount</Label>
                          {field.key === 'name' ? (
                            <Input 
                              value={getFieldValue('client1', field.key, 'amount')}
                              onChange={(e) => handleInputChange('client1', field.key, 'amount', e.target.value)}
                              placeholder="Enter name"
                              className="h-8"
                            />
                          ) : (
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                              <Input 
                                value={getFieldValue('client1', field.key, 'amount')}
                                onChange={(e) => handleInputChange('client1', field.key, 'amount', e.target.value)}
                                placeholder="0"
                                className="h-8 pl-6"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {field.hasMonths && (
                        <div className="col-span-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">For months</Label>
                            <Input 
                              value={getFieldValue('client1', field.key, 'months')}
                              onChange={(e) => handleInputChange('client1', field.key, 'months', e.target.value)}
                              placeholder="0"
                              className="h-8"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client2" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {criticalIllnessFields.map((field) => (
                    <div key={field.key} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6">
                        <Label className="text-sm">{field.label}</Label>
                      </div>
                      <div className="col-span-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Amount</Label>
                          {field.key === 'name' ? (
                            <Input 
                              value={getFieldValue('client2', field.key, 'amount')}
                              onChange={(e) => handleInputChange('client2', field.key, 'amount', e.target.value)}
                              placeholder="Enter name"
                              className="h-8"
                            />
                          ) : (
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">$</span>
                              <Input 
                                value={getFieldValue('client2', field.key, 'amount')}
                                onChange={(e) => handleInputChange('client2', field.key, 'amount', e.target.value)}
                                placeholder="0"
                                className="h-8 pl-6"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {field.hasMonths && (
                        <div className="col-span-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">For months</Label>
                            <Input 
                              value={getFieldValue('client2', field.key, 'months')}
                              onChange={(e) => handleInputChange('client2', field.key, 'months', e.target.value)}
                              placeholder="0"
                              className="h-8"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};