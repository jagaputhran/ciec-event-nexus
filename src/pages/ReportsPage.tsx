
import { useState } from "react";
import { BarChart3, Download, Calendar, Filter, TrendingUp, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExportDialog } from "@/components/ExportDialog";
import { DateRangePicker } from "@/components/DateRangePicker";
import { BudgetChart } from "@/components/BudgetChart";
import { LoadingShimmer } from "@/components/LoadingShimmer";
import { DateRange } from "react-day-picker";

const reportData = {
  monthlyBudget: [
    { month: "Jan", allocated: 400000, used: 320000 },
    { month: "Feb", allocated: 450000, used: 380000 },
    { month: "Mar", allocated: 500000, used: 420000 },
    { month: "Apr", allocated: 480000, used: 450000 },
    { month: "May", allocated: 520000, used: 480000 },
    { month: "Jun", allocated: 600000, used: 350000 }
  ],
  eventsByType: [
    { type: "Executive Events", count: 8, budget: 800000 },
    { type: "Team Building", count: 12, budget: 480000 },
    { type: "Training", count: 15, budget: 600000 },
    { type: "Client Events", count: 6, budget: 720000 }
  ],
  performanceMetrics: {
    totalEvents: 41,
    averageCost: 65000,
    budgetUtilization: 78,
    customerSatisfaction: 4.6
  }
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setLoading(true);
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="animate-slide-in-right">
          <h1 className="text-3xl font-bold text-enterprise-900 flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-enterprise-600" />
            <span>Analytics Dashboard</span>
          </h1>
          <p className="text-enterprise-600 mt-1">Comprehensive insights and data analysis</p>
        </div>
        <div className="flex space-x-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <DateRangePicker 
            value={dateRange} 
            onChange={handleDateRangeChange}
          />
          <ExportDialog />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300 hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.performanceMetrics.totalEvents}</div>
            <p className="text-xs text-green-600 font-medium">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300 hover-scale" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{reportData.performanceMetrics.averageCost.toLocaleString()}</div>
            <p className="text-xs text-red-600 font-medium">-5% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300 hover-scale" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.performanceMetrics.budgetUtilization}%</div>
            <p className="text-xs text-green-600 font-medium">+3% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300 hover-scale" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.performanceMetrics.customerSatisfaction}/5.0</div>
            <p className="text-xs text-green-600 font-medium">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="budget" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger 
            value="budget" 
            className="transition-all duration-300 hover:bg-enterprise-100 data-[state=active]:bg-enterprise-600 data-[state=active]:text-white"
          >
            Budget Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="events"
            className="transition-all duration-300 hover:bg-enterprise-100 data-[state=active]:bg-enterprise-600 data-[state=active]:text-white"
          >
            Event Performance
          </TabsTrigger>
          <TabsTrigger 
            value="planners"
            className="transition-all duration-300 hover:bg-enterprise-100 data-[state=active]:bg-enterprise-600 data-[state=active]:text-white"
          >
            Planner Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="leadership"
            className="transition-all duration-300 hover:bg-enterprise-100 data-[state=active]:bg-enterprise-600 data-[state=active]:text-white"
          >
            Leadership Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-6 animate-fade-in">
          {loading ? (
            <LoadingShimmer />
          ) : (
            <BudgetChart data={reportData.monthlyBudget} />
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-6 animate-fade-in">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Events by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.eventsByType.map((category, index) => (
                  <div 
                    key={category.type} 
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-in-right cursor-pointer hover:shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div>
                      <h3 className="font-medium">{category.type}</h3>
                      <p className="text-sm text-gray-600">{category.count} events</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{category.budget.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total budget</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planners" className="space-y-6 animate-fade-in">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Top Performing Planners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-in-right cursor-pointer hover:shadow-md">
                  <div>
                    <h3 className="font-medium">Elite Events Co.</h3>
                    <p className="text-sm text-gray-600">8 events completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">4.8/5.0</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-in-right cursor-pointer hover:shadow-md" style={{ animationDelay: "0.1s" }}>
                  <div>
                    <h3 className="font-medium">Team Dynamics Ltd.</h3>
                    <p className="text-sm text-gray-600">6 events completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">4.7/5.0</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leadership" className="space-y-6 animate-fade-in">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Leadership Event Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-in-right cursor-pointer hover:shadow-md">
                  <div>
                    <h3 className="font-medium">Balaji Nadar (VP Technology)</h3>
                    <p className="text-sm text-gray-600">8 events assigned</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹20,00,000</p>
                    <p className="text-sm text-gray-600">Budget responsibility</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 animate-slide-in-right cursor-pointer hover:shadow-md" style={{ animationDelay: "0.1s" }}>
                  <div>
                    <h3 className="font-medium">Ravi Krishnan (Director Engineering)</h3>
                    <p className="text-sm text-gray-600">5 events assigned</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹8,00,000</p>
                    <p className="text-sm text-gray-600">Budget responsibility</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
