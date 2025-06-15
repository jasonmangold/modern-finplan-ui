import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [globalAssumptions, setGlobalAssumptions] = useState({
    inflationRate: "3.0",
    taxRate: "25.0",
    retirementAge: "65",
    lifeExpectancy: "85"
  });

  const [options, setOptions] = useState({
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    autoSave: true,
    notifications: true
  });

  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [billingInfo, setBillingInfo] = useState({
    plan: "Professional",
    nextBilling: "2024-07-15",
    cardLast4: "1234"
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
          <DialogDescription>
            Update your application settings, profile, and billing information in these tabs. All changes are saved securely.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="global-assumptions" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="global-assumptions">Global Assumptions</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="change-password">Change Password</TabsTrigger>
            <TabsTrigger value="account-info">Account Info</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="global-assumptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Global Financial Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                    <Input
                      id="inflationRate"
                      value={globalAssumptions.inflationRate}
                      onChange={(e) => setGlobalAssumptions(prev => ({ ...prev, inflationRate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      value={globalAssumptions.taxRate}
                      onChange={(e) => setGlobalAssumptions(prev => ({ ...prev, taxRate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="retirementAge">Default Retirement Age</Label>
                    <Input
                      id="retirementAge"
                      value={globalAssumptions.retirementAge}
                      onChange={(e) => setGlobalAssumptions(prev => ({ ...prev, retirementAge: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeExpectancy">Life Expectancy</Label>
                    <Input
                      id="lifeExpectancy"
                      value={globalAssumptions.lifeExpectancy}
                      onChange={(e) => setGlobalAssumptions(prev => ({ ...prev, lifeExpectancy: e.target.value }))}
                    />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Global Assumptions</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="options" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={options.currency} onValueChange={(value) => setOptions(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={options.dateFormat} onValueChange={(value) => setOptions(prev => ({ ...prev, dateFormat: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoSave">Auto-save changes</Label>
                    <Switch
                      id="autoSave"
                      checked={options.autoSave}
                      onCheckedChange={(checked) => setOptions(prev => ({ ...prev, autoSave: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Enable notifications</Label>
                    <Switch
                      id="notifications"
                      checked={options.notifications}
                      onCheckedChange={(checked) => setOptions(prev => ({ ...prev, notifications: checked }))}
                    />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Options</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="change-password" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account-info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={accountInfo.firstName}
                      onChange={(e) => setAccountInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={accountInfo.lastName}
                      onChange={(e) => setAccountInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={accountInfo.email}
                      onChange={(e) => setAccountInfo(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={accountInfo.phone}
                      onChange={(e) => setAccountInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={accountInfo.company}
                      onChange={(e) => setAccountInfo(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Account Information</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Plan</Label>
                    <p className="text-lg font-semibold text-blue-600">{billingInfo.plan}</p>
                  </div>
                  <div>
                    <Label>Next Billing Date</Label>
                    <p className="text-sm text-gray-600">{billingInfo.nextBilling}</p>
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <p className="text-sm text-gray-600">**** **** **** {billingInfo.cardLast4}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Update Payment Method</Button>
                  <Button variant="outline">Download Invoice</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
