
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, DollarSign, User, FileText, AlertTriangle } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  budget: number;
  planner: string;
  status: string;
}

interface EventDetailsDialogProps {
  event: Event;
  trigger?: React.ReactNode;
}

export function EventDetailsDialog({ event, trigger }: EventDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-green-100 text-green-800";
      case "planning": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const budgetBreakdown = [
    { category: "Venue", allocated: event.budget * 0.4, used: event.budget * 0.35 },
    { category: "Catering", allocated: event.budget * 0.3, used: event.budget * 0.28 },
    { category: "Equipment", allocated: event.budget * 0.2, used: event.budget * 0.15 },
    { category: "Miscellaneous", allocated: event.budget * 0.1, used: event.budget * 0.08 }
  ];

  const timeline = [
    { date: "2024-05-15", task: "Initial Planning", status: "completed" },
    { date: "2024-05-20", task: "Venue Booking", status: "completed" },
    { date: "2024-05-25", task: "Catering Confirmation", status: "in-progress" },
    { date: "2024-06-01", task: "Equipment Setup", status: "pending" },
    { date: event.date, task: "Event Date", status: "pending" }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">View Details</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            {event.title}
            <Badge className={getStatusColor(event.status)}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-enterprise-600" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{event.attendees} attendees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>Planner: {event.planner}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Budget Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{event.budget.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Total allocated budget</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Used: ₹{(event.budget * 0.75).toLocaleString()}</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  This is a comprehensive corporate event designed to bring together leadership teams 
                  for strategic planning and team building activities. The event will include keynote 
                  presentations, workshop sessions, and networking opportunities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetBreakdown.map((item, index) => {
                    const usagePercentage = (item.used / item.allocated) * 100;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.category}</span>
                          <span className="text-sm text-gray-600">
                            ₹{item.used.toLocaleString()} / ₹{item.allocated.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={usagePercentage} className="w-full" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{usagePercentage.toFixed(1)}% used</span>
                          <span>₹{(item.allocated - item.used).toLocaleString()} remaining</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.task}</span>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {item.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{event.attendees}</div>
                      <div className="text-sm text-gray-600">Confirmed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">15</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">5</div>
                      <div className="text-sm text-gray-600">Declined</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Recent RSVPs</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>John Smith</span>
                        <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sarah Johnson</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mike Davis</span>
                        <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
