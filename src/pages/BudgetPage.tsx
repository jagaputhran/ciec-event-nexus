
import { useState, useEffect } from "react";
import { DollarSign, Plus, TrendingUp, TrendingDown, AlertCircle, BarChart3, ArrowUp, ArrowDown, Eye, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BudgetAllocationDialog } from "@/components/BudgetAllocationDialog";
import { BudgetChart } from "@/components/BudgetChart";

const budgetData = [
  {
    category: "Executive Events",
    allocated: 500000,
    used: 320000,
    remaining: 180000,
    events: 3,
    trend: 5.2,
    lastMonth: 280000
  },
  {
    category: "Team Building",
    allocated: 200000,
    used: 150000,
    remaining: 50000,
    events: 5,
    trend: -2.1,
    lastMonth: 165000
  },
  {
    category: "Training & Development",
    allocated: 300000,
    used: 180000,
    remaining: 120000,
    events: 8,
    trend: 8.7,
    lastMonth: 150000
  },
  {
    category: "Client Events",
    allocated: 400000,
    used: 350000,
    remaining: 50000,
    events: 4,
    trend: 12.3,
    lastMonth: 285000
  }
];

const recentTransactions = [
  { id: 1, event: "Q4 Leadership Review", amount: 45000, category: "Venue & Catering", date: "2024-06-10", status: "completed" },
  { id: 2, event: "Tech Summit", amount: 25000, category: "Equipment Rental", date: "2024-06-08", status: "pending" },
  { id: 3, event: "Team Workshop", amount: 15000, category: "Facilitator Fees", date: "2024-06-05", status: "completed" }
];

const chartData = [
  { month: "Jan", allocated: 380000, used: 320000 },
  { month: "Feb", allocated: 420000, used: 380000 },
  { month: "Mar", allocated: 390000, used: 350000 },
  { month: "Apr", allocated: 450000, used: 420000 },
  { month: "May", allocated: 400000, used: 385000 },
  { month: "Jun", allocated: 480000, used: 445000 }
];

export default function BudgetPage() {
  const [animatedValues, setAnimatedValues] = useState({
    totalAllocated: 0,
    totalUsed: 0,
    totalRemaining: 0
  });
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalUsed = budgetData.reduce((sum, item) => sum + item.used, 0);
  const totalRemaining = totalAllocated - totalUsed;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        totalAllocated,
        totalUsed,
        totalRemaining
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [totalAllocated, totalUsed, totalRemaining]);

  const getBudgetStatus = (usagePercentage: number) => {
    if (usagePercentage < 70) return { 
      color: "text-green-600", 
      bgColor: "bg-green-50", 
      status: "Under Budget",
      icon: TrendingDown 
    };
    if (usagePercentage < 90) return { 
      color: "text-yellow-600", 
      bgColor: "bg-yellow-50", 
      status: "Nearing Budget",
      icon: AlertCircle 
    };
    return { 
      color: "text-red-600", 
      bgColor: "bg-red-50", 
      status: "Over Budget",
      icon: TrendingUp 
    };
  };

  const CountUpNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = value;
      const incrementTime = (duration / end) * 1000;

      const timer = setInterval(() => {
        start += end / (duration / 50);
        setCount(Math.floor(start));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, 50);

      return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Budget Management</h1>
          <p className="text-slate-600 mt-1 font-medium">Track and manage event budgets and expenses</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover:shadow-md transition-all">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <BudgetAllocationDialog />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Allocated</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              ₹<CountUpNumber value={animatedValues.totalAllocated} />
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105 animate-fade-in" style={{ animationDelay: '150ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">Used Budget</CardTitle>
            <div className="p-2 rounded-lg bg-red-100">
              <TrendingUp className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              ₹<CountUpNumber value={animatedValues.totalUsed} />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {((totalUsed / totalAllocated) * 100).toFixed(1)}% of total allocation
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">Remaining</CardTitle>
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingDown className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              ₹<CountUpNumber value={animatedValues.totalRemaining} />
            </div>
            <p className="text-xs text-slate-500 mt-2">Available for new allocations</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105 animate-fade-in" style={{ animationDelay: '450ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">Budget Alerts</CardTitle>
            <div className="p-2 rounded-lg bg-yellow-100">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">2</div>
            <p className="text-xs text-slate-500 mt-2">Categories over 80% usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Chart */}
      <BudgetChart data={chartData} />

      {/* Budget Categories and Transactions */}
      <Tabs defaultValue="categories" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="categories" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Budget Categories
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Recent Transactions
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-6">
            {budgetData.map((category, index) => {
              const usagePercentage = (category.used / category.allocated) * 100;
              const budgetStatus = getBudgetStatus(usagePercentage);
              const isExpanded = expandedCard === category.category;
              const StatusIcon = budgetStatus.icon;
              
              return (
                <Card 
                  key={category.category} 
                  className={`hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-white animate-fade-in ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                  onClick={() => setExpandedCard(isExpanded ? null : category.category)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${budgetStatus.bgColor}`}>
                          <StatusIcon className={`h-5 w-5 ${budgetStatus.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-slate-900">{category.category}</CardTitle>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge className={`${budgetStatus.bgColor} ${budgetStatus.color} border-0 font-medium`}>
                              {budgetStatus.status}
                            </Badge>
                            <span className="text-sm text-slate-500 flex items-center">
                              {category.trend > 0 ? (
                                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              {Math.abs(category.trend)}% vs last month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">
                          ₹{category.used.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500">
                          of ₹{category.allocated.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Usage Progress</span>
                          <span>{usagePercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={usagePercentage} className="w-full h-3" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-slate-900">{category.events}</div>
                          <div className="text-xs text-slate-500">Active Events</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            ₹{category.remaining.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">Remaining</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            ₹{Math.round(category.used / category.events).toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">Avg per Event</div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-6 p-4 bg-slate-50 rounded-lg animate-fade-in">
                          <h4 className="font-semibold text-slate-800 mb-3">Detailed Breakdown</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Venue & Facilities</span>
                              <span className="text-sm font-medium">₹{(category.used * 0.4).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Catering & Refreshments</span>
                              <span className="text-sm font-medium">₹{(category.used * 0.3).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Equipment & Technology</span>
                              <span className="text-sm font-medium">₹{(category.used * 0.2).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Miscellaneous</span>
                              <span className="text-sm font-medium">₹{(category.used * 0.1).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline">Adjust Allocation</Button>
                            <Button size="sm" variant="outline">View History</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <Card 
                key={transaction.id} 
                className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{transaction.event}</h3>
                          <p className="text-sm text-slate-600">{transaction.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-slate-900">
                        ₹{transaction.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {transaction.status}
                        </Badge>
                        <span className="text-sm text-slate-500">{transaction.date}</span>
                      </div>
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
