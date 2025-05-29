
import { useState } from "react";
import { Star, Phone, Mail, MapPin, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const eventPlanners = [
  {
    id: 1,
    name: "Elite Events Co.",
    contact: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya@eliteevents.com",
    location: "Chennai",
    specialties: ["Executive Events", "Corporate Meetings"],
    rating: 4.8,
    eventsCompleted: 25,
    averageCost: 75000,
    availability: "available"
  },
  {
    id: 2,
    name: "Corporate Events Plus",
    contact: "Rajesh Kumar",
    phone: "+91 98765 43211",
    email: "rajesh@corporateevents.com",
    location: "Chennai",
    specialties: ["Conferences", "Team Building"],
    rating: 4.6,
    eventsCompleted: 18,
    averageCost: 120000,
    availability: "busy"
  },
  {
    id: 3,
    name: "Team Dynamics Ltd.",
    contact: "Anita Reddy",
    phone: "+91 98765 43212",
    email: "anita@teamdynamics.com",
    location: "Chennai",
    specialties: ["Workshops", "Training Events"],
    rating: 4.7,
    eventsCompleted: 32,
    averageCost: 45000,
    availability: "available"
  },
  {
    id: 4,
    name: "Luxury Event Solutions",
    contact: "Vikram Patel",
    phone: "+91 98765 43213",
    email: "vikram@luxuryevents.com",
    location: "Chennai",
    specialties: ["VIP Events", "Executive Retreats"],
    rating: 4.9,
    eventsCompleted: 15,
    averageCost: 200000,
    availability: "available"
  }
];

export default function PlannersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getAvailabilityColor = (availability: string) => {
    return availability === "available" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const filteredPlanners = eventPlanners.filter(planner =>
    planner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    planner.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-enterprise-900">Event Planners</h1>
          <p className="text-enterprise-600 mt-1">Manage and connect with event planning partners</p>
        </div>
        <Button className="bg-enterprise-600 hover:bg-enterprise-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Planner
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search planners or specialties..."
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

      {/* Planners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlanners.map((planner) => (
          <Card key={planner.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{planner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{planner.name}</CardTitle>
                    <p className="text-sm text-gray-600">{planner.contact}</p>
                  </div>
                </div>
                <Badge className={getAvailabilityColor(planner.availability)}>
                  {planner.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-enterprise-600" />
                  <span>{planner.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-enterprise-600" />
                  <span>{planner.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-enterprise-600" />
                  <span>{planner.location}</span>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-sm font-medium mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {planner.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{planner.rating}</span>
                  </div>
                  <p className="text-gray-600">{planner.eventsCompleted} events</p>
                </div>
                <div>
                  <p className="font-medium">₹{planner.averageCost.toLocaleString()}</p>
                  <p className="text-gray-600">Avg. cost</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" className="flex-1">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
