
import { useState } from "react";
import { DollarSign, Plus, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BudgetAllocationDialog } from "@/components/BudgetAllocationDialog";

const budgetData = [
  {
    category: "Executive Events",
    allocated: 500000,
    used: 320000,
    remaining: 180000,
    events: 3
  },
  {
    category: "Team Building",
    allocated: 200000,
    used: 150000,
    remaining: 50000,
    events: 5
  },
  {
    category: "Training & Development",
    allocated: 300000,
    used: 180000,
    remaining: 120000,
    events: 8
  },
  {
    category: "Client Events",
    allocated: 400000,
    used: 350000,
    remaining: 50000,
    events: 4
  }
];

const recentTransactions = [
  { id: 1, event: "Q4 Leadership Review", amount: 45000, category: "Venue & Catering", date: "2024-06-10" },
  { id: 2, event: "Tech Summit", amount: 25000, category: "Equipment Rental", date: "2024-06-08" },
  { id: 3, event: "Team Workshop", amount: 15000, category: "Facilitator Fees", date: "2024-06-05" }
];

export default function BudgetPage() {
  const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalUsed = budgetData.reduce((sum, item) => sum + item.used, 0);
  const totalRemaining = totalAllocated - totalUsed;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-enterprise-900">Budget Management</h1>
          <p className="text-enterprise-600 mt-1">Track and manage event budgets and expenses</p>
        </div>
        <BudgetAllocationDialog />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAllocated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">For current fiscal year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used Budget</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalUsed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalUsed / totalAllocated) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRemaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available for allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Categories over 80%</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Tabs defaultValue="categories" className="w-full">
        <TabsList>
          <TabsTrigger value="categories">Budget Categories</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4">
            {budgetData.map((category) => {
              const usagePercentage = (category.used / category.allocated) * 100;
              const isOverBudget = usagePercentage > 80;
              
              return (
                <Card key={category.category}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                      {isOverBudget && (
                        <Badge className="bg-red-100 text-red-800">High Usage</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Used: ₹{category.used.toLocaleString()}</span>
                        <span>Allocated: ₹{category.allocated.toLocaleString()}</span>
                      </div>
                      <Progress value={usagePercentage} className="w-full" />
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{category.events} events</span>
                        <span>₹{category.remaining.toLocaleString()} remaining</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{transaction.event}</h3>
                      <p className="text-sm text-gray-600">{transaction.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{transaction.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
