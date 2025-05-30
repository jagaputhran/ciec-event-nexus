
import { useState } from "react";
import { Users, Crown, Shield, UserCheck, Calendar, DollarSign, Search, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { LeadershipAssignDialog } from "@/components/LeadershipAssignDialog";

const leadershipHierarchy = [
  {
    id: 1,
    name: "Balaji Nadar",
    role: "VP Technology",
    level: "VP",
    department: "Technology",
    email: "balaji.nadar@comcast.com",
    phone: "+91 98765 43214",
    eventsAssigned: 8,
    budgetResponsibility: 2000000,
    directReports: 3
  },
  {
    id: 2,
    name: "ILLAN",
    role: "VP Operations",
    level: "VP",
    department: "Operations",
    email: "illan@comcast.com",
    phone: "+91 98765 43215",
    eventsAssigned: 5,
    budgetResponsibility: 1800000,
    directReports: 4,
    reportsTo: 1
  },
  {
    id: 3,
    name: "Ganesh",
    role: "Senior Director Engineering",
    level: "Senior Director",
    department: "Engineering",
    email: "ganesh@comcast.com",
    phone: "+91 98765 43216",
    eventsAssigned: 6,
    budgetResponsibility: 1200000,
    directReports: 5,
    reportsTo: 1
  },
  {
    id: 4,
    name: "Narotom",
    role: "VP Strategy",
    level: "VP",
    department: "Strategy",
    email: "narotom@comcast.com",
    phone: "+91 98765 43217",
    eventsAssigned: 4,
    budgetResponsibility: 1500000,
    directReports: 3,
    reportsTo: 1
  },
  {
    id: 5,
    name: "Harish",
    role: "Manager Events",
    level: "Manager",
    department: "Operations",
    email: "harish@comcast.com",
    phone: "+91 98765 43218",
    eventsAssigned: 12,
    budgetResponsibility: 500000,
    directReports: 2,
    reportsTo: 2
  }
];

const upcomingEvents = [
  { id: 1, name: "Q4 Review", leader: "Balaji Nadar", date: "2024-06-15" },
  { id: 2, name: "Tech Summit", leader: "ILLAN", date: "2024-06-20" },
  { id: 3, name: "Operations Meeting", leader: "Ganesh", date: "2024-06-25" }
];

export default function LeadershipPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "VP": return <Crown className="h-5 w-5 text-yellow-600" />;
      case "Senior Director": return <Shield className="h-5 w-5 text-blue-600" />;
      case "Director": return <Shield className="h-5 w-5 text-blue-600" />;
      case "Senior Manager": return <Star className="h-5 w-5 text-green-600" />;
      default: return <Users className="h-5 w-5 text-gray-600" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "VP": return "bg-yellow-100 text-yellow-800";
      case "Senior Director": return "bg-blue-100 text-blue-800";
      case "Director": return "bg-blue-100 text-blue-800";
      case "Senior Manager": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLeaders = leadershipHierarchy.filter(leader =>
    leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-enterprise-900">Leadership Hierarchy</h1>
          <p className="text-enterprise-600 mt-1">Manage event responsibilities and leadership assignments</p>
        </div>
        <LeadershipAssignDialog />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search leaders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="hierarchy" className="w-full">
        <TabsList>
          <TabsTrigger value="hierarchy">Leadership Hierarchy</TabsTrigger>
          <TabsTrigger value="events">Event Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="hierarchy" className="space-y-6">
          {/* Leadership Cards */}
          <div className="grid gap-4">
            {filteredLeaders.map((leader) => (
              <Card key={leader.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-lg">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{leader.name}</CardTitle>
                        <p className="text-enterprise-600">{leader.role}</p>
                        <p className="text-sm text-gray-500">{leader.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getLevelIcon(leader.level)}
                      <Badge className={getLevelColor(leader.level)}>
                        {leader.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-enterprise-900">Events Assigned</p>
                      <p className="text-xl font-bold text-enterprise-600">{leader.eventsAssigned}</p>
                    </div>
                    <div>
                      <p className="font-medium text-enterprise-900">Budget Responsibility</p>
                      <p className="text-lg font-semibold">₹{leader.budgetResponsibility.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-enterprise-900">Direct Reports</p>
                      <p className="text-xl font-bold text-enterprise-600">{leader.directReports}</p>
                    </div>
                    <div>
                      <p className="font-medium text-enterprise-900">Contact</p>
                      <p className="text-sm">{leader.email}</p>
                      <p className="text-sm">{leader.phone}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex space-x-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Assign Event</Button>
                    <Button variant="outline" size="sm">View Reports</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">{event.name}</h3>
                      <p className="text-sm text-gray-600">Assigned to: {event.leader}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{event.date}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
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
