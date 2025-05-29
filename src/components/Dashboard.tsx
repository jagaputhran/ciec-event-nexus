
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react";

export function Dashboard() {
  const kpiData = [
    {
      title: "Active Events",
      value: "12",
      change: "+2 from last month",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Total Budget Allocated",
      value: "$2.4M",
      change: "85% utilized",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Event Planners",
      value: "24",
      change: "8 verified vendors",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Cost Efficiency",
      value: "92%",
      change: "+5% vs target",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Comcast Leadership Summit",
      date: "Dec 15, 2024",
      budget: "$450,000",
      status: "Planning",
      priority: "High",
      attendees: 150,
      leader: "VP Technology"
    },
    {
      id: 2,
      title: "Q1 Strategy Review",
      date: "Jan 22, 2025",
      budget: "$125,000",
      status: "Approved",
      priority: "Medium",
      attendees: 85,
      leader: "Director Operations"
    },
    {
      id: 3,
      title: "Innovation Workshop",
      date: "Feb 8, 2025",
      budget: "$75,000",
      status: "Draft",
      priority: "Low",
      attendees: 45,
      leader: "Manager R&D"
    }
  ];

  const budgetBreakdown = [
    { category: "Venue & Facilities", allocated: 850000, used: 720000, percentage: 85 },
    { category: "Hospitality", allocated: 650000, used: 580000, percentage: 89 },
    { category: "Technology & AV", allocated: 450000, used: 385000, percentage: 86 },
    { category: "Transportation", allocated: 250000, used: 195000, percentage: 78 },
    { category: "Miscellaneous", allocated: 200000, used: 125000, percentage: 63 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-subtle min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-enterprise-900">Event Management Dashboard</h1>
          <p className="text-enterprise-600 mt-1">CIEC Chennai - Leadership Event Coordination</p>
        </div>
        <Button className="bg-gradient-enterprise hover:bg-enterprise-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-enterprise-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-enterprise-900 mt-1">{kpi.value}</p>
                  <p className="text-xs text-enterprise-500 mt-1">{kpi.change}</p>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-enterprise-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border border-enterprise-200 rounded-lg hover:bg-enterprise-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-enterprise-900">{event.title}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-enterprise-600 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.date}
                        </p>
                        <p className="text-sm text-enterprise-600 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.attendees} attendees
                        </p>
                        <p className="text-sm text-enterprise-600">{event.leader}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-semibold text-enterprise-900">{event.budget}</p>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge className={getPriorityColor(event.priority)}>
                          {event.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Overview */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-enterprise-900 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-enterprise-700 font-medium">{item.category}</span>
                    <span className="text-enterprise-600">{item.percentage}%</span>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-enterprise-500">
                    <span>${item.used.toLocaleString()} used</span>
                    <span>${item.allocated.toLocaleString()} allocated</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-enterprise-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-enterprise-700">Total Budget Health</p>
                  <p className="text-xs text-enterprise-600">Overall utilization rate</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
                  <span className="text-lg font-bold text-green-600">82%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-enterprise-900 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recent Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">Budget threshold reached</p>
                <p className="text-xs text-yellow-600">Innovation Workshop is at 85% of allocated budget</p>
              </div>
              <span className="text-xs text-yellow-600">2 hrs ago</span>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">Event approved</p>
                <p className="text-xs text-green-600">Q1 Strategy Review has been approved by VP Technology</p>
              </div>
              <span className="text-xs text-green-600">5 hrs ago</span>
            </div>
            
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">New planner registration</p>
                <p className="text-xs text-blue-600">Chennai Event Solutions has completed verification</p>
              </div>
              <span className="text-xs text-blue-600">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
