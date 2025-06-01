
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
  Plus,
  ArrowUp,
  ArrowDown,
  Info
} from "lucide-react";
import { CreateEventDialog } from "./CreateEventDialog";
import { useState, useEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function Dashboard() {
  const [animatedValues, setAnimatedValues] = useState({
    activeEvents: 0,
    budget: 0,
    planners: 0,
    efficiency: 0
  });

  const [progressAnimated, setProgressAnimated] = useState(false);

  // Animate counter values on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        activeEvents: 12,
        budget: 2.4,
        planners: 24,
        efficiency: 92
      });
      setProgressAnimated(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const kpiData = [
    {
      title: "Active Events",
      value: animatedValues.activeEvents,
      suffix: "",
      change: "+2 from last month",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      sparkline: [8, 9, 7, 10, 11, 12]
    },
    {
      title: "Total Budget Allocated",
      value: animatedValues.budget,
      suffix: "M",
      change: "85% utilized",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      sparkline: [2.1, 2.2, 2.0, 2.3, 2.4, 2.4]
    },
    {
      title: "Event Planners",
      value: animatedValues.planners,
      suffix: "",
      change: "8 verified vendors",
      trend: "stable",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      sparkline: [20, 22, 21, 23, 24, 24]
    },
    {
      title: "Cost Efficiency",
      value: animatedValues.efficiency,
      suffix: "%",
      change: "+5% vs target",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      sparkline: [87, 89, 88, 90, 91, 92]
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
      leader: "VP Technology",
      expanded: false
    },
    {
      id: 2,
      title: "Q1 Strategy Review",
      date: "Jan 22, 2025",
      budget: "$125,000",
      status: "Approved",
      priority: "Medium",
      attendees: 85,
      leader: "Director Operations",
      expanded: false
    },
    {
      id: 3,
      title: "Innovation Workshop",
      date: "Feb 8, 2025",
      budget: "$75,000",
      status: "Draft",
      priority: "Low",
      attendees: 45,
      leader: "Manager R&D",
      expanded: false
    }
  ];

  const [expandedEvents, setExpandedEvents] = useState<number[]>([]);

  const toggleEventExpansion = (eventId: number) => {
    setExpandedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

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
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getBudgetStatus = (percentage: number) => {
    if (percentage < 70) return { color: "text-green-600", bgColor: "bg-green-100", status: "Under Budget" };
    if (percentage < 90) return { color: "text-yellow-600", bgColor: "bg-yellow-100", status: "Nearing Budget" };
    return { color: "text-red-600", bgColor: "bg-red-100", status: "Over Budget" };
  };

  const MiniSparkline = ({ data }: { data: number[] }) => (
    <svg width="60" height="20" className="inline-block ml-2">
      {data.map((value, index) => (
        <circle
          key={index}
          cx={index * 10 + 5}
          cy={20 - (value / Math.max(...data)) * 15}
          r="1.5"
          fill="currentColor"
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        points={data.map((value, index) => 
          `${index * 10 + 5},${20 - (value / Math.max(...data)) * 15}`
        ).join(' ')}
        className="animate-fade-in"
      />
    </svg>
  );

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen font-inter">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Event Management Dashboard</h1>
          <p className="text-slate-600 mt-1 font-medium">CIEC Chennai - Leadership Event Coordination</p>
        </div>
        <div className="animate-slide-in-right">
          <CreateEventDialog />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card 
            key={index} 
            className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105 cursor-pointer group animate-fade-in backdrop-blur-sm"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{kpi.title}</p>
                  <div className="flex items-center mt-2">
                    <p className="text-3xl font-bold text-slate-900 transition-all duration-1000">
                      {kpi.value === 0 ? "0" : kpi.value}{kpi.suffix}
                    </p>
                    <MiniSparkline data={kpi.sparkline} />
                  </div>
                  <div className="flex items-center mt-2">
                    <p className="text-xs text-slate-500 font-medium">{kpi.change}</p>
                    {kpi.trend === "up" && <ArrowUp className="h-3 w-3 text-green-500 ml-1" />}
                    {kpi.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500 ml-1" />}
                  </div>
                </div>
                <div className={`p-4 rounded-2xl ${kpi.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <kpi.icon className={`h-7 w-7 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2 border-0 shadow-lg bg-white animate-fade-in" style={{ animationDelay: '600ms' }}>
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center font-bold">
              <Calendar className="h-6 w-6 mr-3 text-blue-600" />
              Upcoming Events
              <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">
                {upcomingEvents.length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="p-5 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 cursor-pointer hover:border-blue-300 hover:shadow-md group animate-fade-in"
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                  onClick={() => toggleEventExpansion(event.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{event.title}</h3>
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-slate-600 flex items-center font-medium">
                          <Clock className="h-4 w-4 mr-2 text-slate-400" />
                          {event.date}
                        </p>
                        <p className="text-sm text-slate-600 flex items-center font-medium">
                          <Users className="h-4 w-4 mr-2 text-slate-400" />
                          {event.attendees} attendees
                        </p>
                        <p className="text-sm text-slate-600 font-medium">{event.leader}</p>
                      </div>
                      
                      {expandedEvents.includes(event.id) && (
                        <div className="mt-4 p-4 bg-slate-100 rounded-lg animate-fade-in">
                          <h4 className="font-semibold text-slate-800 mb-2">Event Details</h4>
                          <div className="space-y-1 text-sm text-slate-600">
                            <p>• Timeline: 2 weeks preparation</p>
                            <p>• Venue: TBD - 3 options shortlisted</p>
                            <p>• Special requirements: AV setup, catering</p>
                            <p>• Last updated: 2 hours ago</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right space-y-3">
                      <p className="font-bold text-slate-900 text-lg">{event.budget}</p>
                      <div className="flex gap-2 flex-col">
                        <Badge className={`${getStatusColor(event.status)} border transition-all duration-200 hover:scale-105`}>
                          {event.status === "Planning" && "🟡"}
                          {event.status === "Approved" && "🟢"}
                          {event.status === "Draft" && "🟣"}
                          {" "}{event.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(event.priority)} border transition-all duration-200 hover:scale-105`}>
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
        <Card className="border-0 shadow-lg bg-white animate-fade-in" style={{ animationDelay: '800ms' }}>
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center font-bold">
              <DollarSign className="h-6 w-6 mr-3 text-green-600" />
              Budget Overview
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4 ml-auto text-slate-400 hover:text-slate-600 cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm">Click on categories to drill down into detailed spending breakdown</p>
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {budgetBreakdown.map((item, index) => {
                const budgetStatus = getBudgetStatus(item.percentage);
                return (
                  <div 
                    key={index} 
                    className="space-y-3 p-4 rounded-lg hover:bg-slate-50 transition-all duration-300 cursor-pointer hover:shadow-md group animate-fade-in"
                    style={{ animationDelay: `${900 + index * 100}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-semibold group-hover:text-slate-900">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${budgetStatus.color}`}>{item.percentage}%</span>
                        <Badge className={`text-xs ${budgetStatus.bgColor} ${budgetStatus.color} border-0`}>
                          {budgetStatus.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={progressAnimated ? item.percentage : 0} 
                      className="h-3 transition-all duration-1000"
                    />
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>${item.used.toLocaleString()} used</span>
                      <span>${item.allocated.toLocaleString()} allocated</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 animate-fade-in" style={{ animationDelay: '1200ms' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Total Budget Health</p>
                  <p className="text-xs text-slate-600 mt-1">Overall utilization rate</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-600">82%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <Card className="border-0 shadow-lg bg-white animate-fade-in" style={{ animationDelay: '1000ms' }}>
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center font-bold">
            <AlertTriangle className="h-6 w-6 mr-3 text-amber-600" />
            Recent Alerts & Notifications
            <Badge className="ml-auto bg-amber-100 text-amber-800">3 Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-lg hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: '1100ms' }}>
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-4" />
              <div className="flex-1">
                <p className="text-sm font-bold text-yellow-800">Budget threshold reached</p>
                <p className="text-xs text-yellow-700 mt-1">Innovation Workshop is at 85% of allocated budget</p>
              </div>
              <span className="text-xs text-yellow-600 font-medium">2 hrs ago</span>
            </div>
            
            <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 rounded-lg hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: '1200ms' }}>
              <CheckCircle className="h-5 w-5 text-green-600 mr-4" />
              <div className="flex-1">
                <p className="text-sm font-bold text-green-800">Event approved</p>
                <p className="text-xs text-green-700 mt-1">Q1 Strategy Review has been approved by VP Technology</p>
              </div>
              <span className="text-xs text-green-600 font-medium">5 hrs ago</span>
            </div>
            
            <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-blue-400 rounded-lg hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: '1300ms' }}>
              <Calendar className="h-5 w-5 text-blue-600 mr-4" />
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-800">New planner registration</p>
                <p className="text-xs text-blue-700 mt-1">Chennai Event Solutions has completed verification</p>
              </div>
              <span className="text-xs text-blue-600 font-medium">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
