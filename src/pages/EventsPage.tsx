
import { useState } from "react";
import { Calendar, Plus, Search, Filter, Clock, MapPin, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockEvents = [
  {
    id: 1,
    title: "Q4 Leadership Review",
    date: "2024-06-15",
    time: "09:00 AM",
    location: "Main Conference Room",
    attendees: 25,
    budget: 50000,
    status: "upcoming",
    planner: "Elite Events Co.",
    type: "executive"
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    date: "2024-06-20",
    time: "10:00 AM",
    location: "Auditorium A",
    attendees: 150,
    budget: 200000,
    status: "planning",
    planner: "Corporate Events Plus",
    type: "conference"
  },
  {
    id: 3,
    title: "Team Building Workshop",
    date: "2024-06-25",
    time: "02:00 PM",
    location: "Training Center",
    attendees: 50,
    budget: 75000,
    status: "completed",
    planner: "Team Dynamics Ltd.",
    type: "workshop"
  }
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-green-100 text-green-800";
      case "planning": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTab === "all" || event.status === selectedTab)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-enterprise-900">Events Management</h1>
          <p className="text-enterprise-600 mt-1">Manage and track all corporate events</p>
        </div>
        <Button className="bg-enterprise-600 hover:bg-enterprise-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="planning">In Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid gap-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-enterprise-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-enterprise-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-enterprise-600" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-enterprise-600" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-enterprise-600" />
                      <span className="font-medium">₹{event.budget.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-gray-600">Planner: {event.planner}</span>
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
