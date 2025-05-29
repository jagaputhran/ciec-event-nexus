
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BudgetAllocationDialogProps {
  trigger?: React.ReactNode;
  onBudgetAllocated?: () => void;
}

export function BudgetAllocationDialog({ trigger, onBudgetAllocated }: BudgetAllocationDialogProps) {
  const [open, setOpen] = useState(false);
  const [allocations, setAllocations] = useState([
    { category: "Venue & Facilities", amount: "" },
    { category: "Hospitality", amount: "" },
    { category: "Technology & AV", amount: "" },
    { category: "Transportation", amount: "" },
    { category: "Miscellaneous", amount: "" }
  ]);
  const [eventType, setEventType] = useState("");
  const [totalBudget, setTotalBudget] = useState("");

  const updateAllocation = (index: number, amount: string) => {
    const newAllocations = [...allocations];
    newAllocations[index].amount = amount;
    setAllocations(newAllocations);
  };

  const calculateTotal = () => {
    return allocations.reduce((sum, allocation) => sum + (parseFloat(allocation.amount) || 0), 0);
  };

  const autoAllocate = () => {
    const budget = parseFloat(totalBudget);
    if (!budget) return;

    const percentages = {
      "Venue & Facilities": 0.35,
      "Hospitality": 0.25,
      "Technology & AV": 0.20,
      "Transportation": 0.15,
      "Miscellaneous": 0.05
    };

    const newAllocations = allocations.map(allocation => ({
      ...allocation,
      amount: (budget * percentages[allocation.category as keyof typeof percentages]).toString()
    }));

    setAllocations(newAllocations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Budget allocation:", { eventType, totalBudget, allocations });
    
    toast({
      title: "Budget Allocated Successfully",
      description: `₹${calculateTotal().toLocaleString()} allocated across ${allocations.length} categories`,
    });
    
    setOpen(false);
    if (onBudgetAllocated) {
      onBudgetAllocated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-enterprise-600 hover:bg-enterprise-700">
            <Plus className="h-4 w-4 mr-2" />
            Allocate Budget
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Budget Allocation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Executive Meeting</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="team-building">Team Building</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="totalBudget">Total Budget (₹)</Label>
              <div className="flex space-x-2">
                <Input
                  id="totalBudget"
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  placeholder="Enter total budget"
                />
                <Button type="button" onClick={autoAllocate} variant="outline">
                  Auto-Allocate
                </Button>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Budget Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allocations.map((allocation, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Label className="w-48">{allocation.category}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={allocation.amount}
                        onChange={(e) => updateAllocation(index, e.target.value)}
                        placeholder="0"
                        className="w-32"
                      />
                      <span className="text-sm text-gray-500">
                        ({totalBudget && allocation.amount 
                          ? ((parseFloat(allocation.amount) / parseFloat(totalBudget)) * 100).toFixed(1)
                          : 0}%)
                      </span>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Allocated:</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  {totalBudget && (
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Remaining:</span>
                      <span>₹{(parseFloat(totalBudget) - calculateTotal()).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-enterprise-600 hover:bg-enterprise-700">
              Allocate Budget
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
