import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DebtItem {
  id: string;
  name: string;
  balance: string;
  rate: string;
  payment: string;
  type: string;
}

export const DebtRepaymentInputs = () => {
  const [additionalPayment, setAdditionalPayment] = useState("0");
  const [paymentOrder, setPaymentOrder] = useState("Interest high to low");
  const [applicableToAll, setApplicableToAll] = useState(false);
  const [analysisDate, setAnalysisDate] = useState<Date>(new Date(2025, 8, 11)); // 9/11/2025
  const [debts, setDebts] = useState<DebtItem[]>([
    {
      id: "1",
      name: "",
      balance: "$0",
      rate: "0%",
      payment: "$0",
      type: "Credit card"
    }
  ]);

  const addDebt = () => {
    const newDebt: DebtItem = {
      id: Date.now().toString(),
      name: "",
      balance: "$0",
      rate: "0%",
      payment: "$0",
      type: "Credit card"
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const updateDebt = (id: string, field: keyof DebtItem, value: string) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Debt Repayment Analysis</h2>
      </div>

      <Tabs defaultValue="debts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="debts">Debts</TabsTrigger>
          <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
        </TabsList>

        <TabsContent value="debts" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Additional monthly payment:</Label>
                  <div className="flex items-center mt-1.5">
                    <span className="text-sm mr-2">$</span>
                    <Input
                      type="number"
                      value={additionalPayment}
                      onChange={(e) => setAdditionalPayment(e.target.value)}
                      className="h-9"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Payment order:</Label>
                  <Select value={paymentOrder} onValueChange={setPaymentOrder}>
                    <SelectTrigger className="mt-1.5 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Interest high to low">Interest high to low</SelectItem>
                      <SelectItem value="Balance high to low">Balance high to low</SelectItem>
                      <SelectItem value="Balance low to high">Balance low to high</SelectItem>
                      <SelectItem value="Payment high to low">Payment high to low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Debt Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead className="w-[120px]">Balance</TableHead>
                      <TableHead className="w-[100px]">Rate</TableHead>
                      <TableHead className="w-[120px]">Payment</TableHead>
                      <TableHead className="w-[150px]">Type</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {debts.map((debt) => (
                      <TableRow key={debt.id}>
                        <TableCell>
                          <Input
                            value={debt.name}
                            onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                            placeholder="Debt name"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={debt.balance}
                            onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                            placeholder="$0"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={debt.rate}
                            onChange={(e) => updateDebt(debt.id, 'rate', e.target.value)}
                            placeholder="0%"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={debt.payment}
                            onChange={(e) => updateDebt(debt.id, 'payment', e.target.value)}
                            placeholder="$0"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={debt.type} 
                            onValueChange={(value) => updateDebt(debt.id, 'type', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Credit card">Credit card</SelectItem>
                              <SelectItem value="Personal loan">Personal loan</SelectItem>
                              <SelectItem value="Auto loan">Auto loan</SelectItem>
                              <SelectItem value="Student loan">Student loan</SelectItem>
                              <SelectItem value="Mortgage">Mortgage</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDebt(debt.id)}
                            disabled={debts.length === 1}
                            className="h-8 w-8 p-0 hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addDebt}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add new
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeDebt(debts[debts.length - 1]?.id)}
                  disabled={debts.length === 1}
                  className="flex items-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Analysis Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="applicable-all"
                  checked={applicableToAll}
                  onCheckedChange={(checked) => setApplicableToAll(checked as boolean)}
                />
                <Label 
                  htmlFor="applicable-all"
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  Applicable to all analyses
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Analysis date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-9",
                        !analysisDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {analysisDate ? format(analysisDate, "M/d/yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={analysisDate}
                      onSelect={setAnalysisDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};