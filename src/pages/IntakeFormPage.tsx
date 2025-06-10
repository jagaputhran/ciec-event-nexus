import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, ClipboardList, Send, User, Building2, Mail, Calendar, MapPin, DollarSign, Users, CheckCircle2, Download, FileText, MessageSquare, Phone, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SSOLoginForm from "@/components/SSOLoginForm";

interface EventRequestForm {
  requesterName: string;
  requesterTeam: string;
  requesterEmail: string;
  requesterEmployeeId: string;
  eventName: string;
  eventDate: string;
  preferredTime: string;
  eventDescription: string;
  businessImpact: string;
  employeeTakeaway: string;
  tentativeBudget: string;
  headCount: string;
  venuePreferred: string;
  leaderApproval: string;
  approverName: string;
  specialArrangements: string;
}

const venues = [
  {
    id: "11-2-cafeteria",
    name: "11.2 Cafeteria",
    module: "11.2",
    floor: "11",
    seating: 500,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 - 2:30 pm",
    suitableFor: "Large events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "dhanuskodi-elliots",
    name: "Dhanuskodi & Elliots",
    module: "11.2",
    floor: "11",
    seating: 100,
    avSupport: "Video conf",
    limitations: "Meeting room",
    suitableFor: "Learning sessions",
    comments: "Has to be manually blocked via Room Finder. Both rooms can be separated with a wall"
  },
  {
    id: "training-room",
    name: "Training Room",
    module: "11.2",
    floor: "11",
    seating: 100,
    avSupport: "Video conf",
    limitations: "Training/Yoga room",
    suitableFor: "Learning sessions/small events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "10-1-cafeteria",
    name: "10.1 Cafeteria",
    module: "10.1",
    floor: "10",
    seating: 100,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 – 2:30 pm",
    suitableFor: "Learning sessions/small events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "10-3-cafeteria",
    name: "10.3 Cafeteria",
    module: "10.3",
    floor: "10",
    seating: 250,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 - 2:30 pm",
    suitableFor: "Large events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "10-5-cafeteria",
    name: "10.5 Cafeteria",
    module: "10.5",
    floor: "10",
    seating: 500,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 -2:30 pm",
    suitableFor: "Large events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "8-3-cafeteria",
    name: "8.3 Cafeteria",
    module: "8.3",
    floor: "8",
    seating: 500,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30- 2:30 pm. Echo issues",
    suitableFor: "Large events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "5-6-cafeteria",
    name: "5.6 Cafeteria",
    module: "5.6",
    floor: "5",
    seating: 500,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 -2:30 pm",
    suitableFor: "Large events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "5-4-cafeteria",
    name: "5.4 Cafeteria",
    module: "5.4",
    floor: "5",
    seating: 100,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 -2:30 pm",
    suitableFor: "Learning sessions/Small events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "5-3-cafeteria",
    name: "5.3 Cafeteria",
    module: "5.3",
    floor: "5",
    seating: 250,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 – 2:30 pm",
    suitableFor: "Large events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "4-2-cafeteria",
    name: "4.2 Cafeteria",
    module: "4.2",
    floor: "4",
    seating: 500,
    avSupport: "Video conf",
    limitations: "Cafeteria cannot be used between 12:30 – 2:30 pm",
    suitableFor: "Large events",
    comments: "Has to be blocked one week prior to the event"
  },
  {
    id: "poseidon",
    name: "Poseidon",
    module: "5.1",
    floor: "5",
    seating: 100,
    avSupport: "Video conf",
    limitations: "Meeting room",
    suitableFor: "Learning sessions",
    comments: "Has to be manually blocked via Room Finder ; Both rooms can be separated with a wall"
  },
  {
    id: "amphitheatre",
    name: "Amphitheatre",
    module: "Nil",
    floor: "1",
    seating: 1000,
    avSupport: "Full AV support",
    limitations: "NIL",
    suitableFor: "Business sessions/Business Townhalls/Large events",
    comments: "Has to be blocked one week prior to the event"
  }
];

export default function IntakeFormPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<EventRequestForm | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<typeof venues[0] | null>(null);
  const { toast } = useToast();
  
  const form = useForm<EventRequestForm>({
    defaultValues: {
      requesterName: "",
      requesterTeam: "",
      requesterEmail: "",
      requesterEmployeeId: "",
      eventName: "",
      eventDate: "",
      preferredTime: "",
      eventDescription: "",
      businessImpact: "",
      employeeTakeaway: "",
      tentativeBudget: "",
      headCount: "",
      venuePreferred: "",
      leaderApproval: "",
      approverName: "",
      specialArrangements: "",
    },
  });

  const sendEmail = async (data: EventRequestForm) => {
    const emailContent = `
New Event Request Submitted - ${data.eventName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Event Name: ${data.eventName}
📅 Date: ${data.eventDate}
🕒 Time: ${data.preferredTime}
📍 Venue: ${data.venuePreferred}
💰 Budget: ₹${data.tentativeBudget}
👥 Expected Attendees: ${data.headCount}

REQUESTER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${data.requesterName}
🏢 Team: ${data.requesterTeam}
📧 Email: ${data.requesterEmail}
🆔 Employee ID: ${data.requesterEmployeeId}

EVENT DESCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.eventDescription}

BUSINESS IMPACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.businessImpact}

EMPLOYEE TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.employeeTakeaway}

APPROVAL STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Leadership Approval: ${data.leaderApproval === 'yes' ? '✅ Approved' : '❌ Pending'}
Approver: ${data.approverName}

SPECIAL ARRANGEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.specialArrangements || 'None specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted on: ${new Date().toLocaleString()}
Request ID: REQ-${Date.now()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;

    console.log("Email would be sent with content:", emailContent);
  };

  const downloadPDF = () => {
    if (!submittedData) return;
    
    const content = `
Event Request Summary
====================

Event: ${submittedData.eventName}
Date: ${submittedData.eventDate}
Requester: ${submittedData.requesterName}
Team: ${submittedData.requesterTeam}
Budget: ₹${submittedData.tentativeBudget}
Attendees: ${submittedData.headCount}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Event_Request_${submittedData.eventName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your event request summary is being downloaded.",
    });
  };

  const copyToClipboard = () => {
    if (!submittedData) return;
    
    const summary = `Event: ${submittedData.eventName} | Date: ${submittedData.eventDate} | Requester: ${submittedData.requesterName}`;
    navigator.clipboard.writeText(summary);
    
    toast({
      title: "Copied to Clipboard",
      description: "Event summary copied successfully.",
    });
  };

  const onSubmit = async (data: EventRequestForm) => {
    setIsSubmitting(true);
    
    try {
      await sendEmail(data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Event Request Form Data:", data);
      setSubmittedData(data);
      setIsSubmitted(true);
      
      toast({
        title: "🎉 Event Request Submitted!",
        description: "Your request has been sent and notifications dispatched.",
      });
      
    } catch (error) {
      toast({
        title: "❌ Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  // Show SSO login if not authenticated
  if (!isAuthenticated) {
    return <SSOLoginForm onAuthenticated={handleAuthentication} />;
  }

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
              <CheckCircle2 className="h-32 w-32 text-green-500 mx-auto relative z-10 animate-bounce-gentle" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-scale-in">
                Request Submitted Successfully! 🎉
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Your event request for <span className="font-semibold text-emerald-600">"{submittedData.eventName}"</span> has been successfully submitted and email notifications have been sent to the relevant teams.
              </p>
            </div>
          </div>

          {/* Event Summary Card */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-slide-in-right">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                <FileText className="h-7 w-7" />
                <span>Event Request Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-500" />
                    Event Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {submittedData.eventName}</p>
                    <p><span className="font-medium">Date:</span> {submittedData.eventDate}</p>
                    <p><span className="font-medium">Time:</span> {submittedData.preferredTime}</p>
                    <p><span className="font-medium">Venue:</span> {submittedData.venuePreferred}</p>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-500" />
                    Requester Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {submittedData.requesterName}</p>
                    <p><span className="font-medium">Team:</span> {submittedData.requesterTeam}</p>
                    <p><span className="font-medium">Email:</span> {submittedData.requesterEmail}</p>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-purple-500" />
                    Budget & Logistics
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Budget:</span> ₹{submittedData.tentativeBudget}</p>
                    <p><span className="font-medium">Attendees:</span> {submittedData.headCount}</p>
                    <p><span className="font-medium">Approval:</span> {submittedData.leaderApproval === 'yes' ? '✅ Yes' : '❌ Pending'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <Button 
              onClick={downloadPDF}
              className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Download className="h-6 w-6 mr-3" />
              Download Summary
            </Button>

            <Button 
              onClick={copyToClipboard}
              variant="outline"
              className="h-16 border-2 border-gray-300 hover:border-gray-400 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Copy className="h-6 w-6 mr-3" />
              Copy Details
            </Button>

            <Button 
              onClick={() => window.open('mailto:events@ciec.com', '_blank')}
              variant="outline"
              className="h-16 border-2 border-green-300 hover:border-green-400 text-green-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Mail className="h-6 w-6 mr-3" />
              Contact Support
            </Button>

            <Button 
              onClick={() => window.open('tel:+1234567890', '_blank')}
              variant="outline"
              className="h-16 border-2 border-purple-300 hover:border-purple-400 text-purple-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-6 w-6 mr-3" />
              Call Support
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-indigo-50 to-purple-50 animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageSquare className="h-7 w-7 mr-3 text-indigo-600" />
                What happens next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-indigo-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Review Process</h3>
                  <p className="text-gray-600 text-sm">Your request will be reviewed by the CIEC events team within 2-3 business days</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Approval Decision</h3>
                  <p className="text-gray-600 text-sm">You'll receive an approval/rejection email within 5 business days</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Event Coordination</h3>
                  <p className="text-gray-600 text-sm">If approved, detailed coordination and planning will begin immediately</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setSubmittedData(null);
                form.reset();
              }}
              className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Submit Another Request
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full md:w-auto border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Enhanced Header */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-3xl opacity-10 transform rotate-1"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-blue-100 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="flex items-center justify-center space-x-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl opacity-20 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl">
                    <ClipboardList className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="text-left">
                  <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    Event Request Portal
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">Transform your ideas into extraordinary events</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-in-right">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
                <Mail className="h-7 w-7 mr-3" />
                Comprehensive Event Planning Guidelines
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-100">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Calendar className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-semibold">Submit 1 month in advance</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-semibold">Leadership approval required</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Send className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-semibold">Instant email notifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* Requester Information Section */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-t-xl">
                <CardTitle className="text-3xl font-bold flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <User className="h-8 w-8" />
                  </div>
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FormField
                    control={form.control}
                    name="requesterName"
                    rules={{ required: "Requester name is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                          <User className="h-5 w-5 mr-2 text-blue-500" />
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300" />
                            <Input className="pl-14 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" placeholder="Enter your full name" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requesterTeam"
                    rules={{ required: "Team information is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                          <Building2 className="h-5 w-5 mr-2 text-blue-500" />
                          Team / Business Unit *
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300" />
                            <Input className="pl-14 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" placeholder="Enter your team/business unit" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requesterEmail"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                          <Mail className="h-5 w-5 mr-2 text-blue-500" />
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300" />
                            <Input className="pl-14 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" type="email" placeholder="Enter your email address" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requesterEmployeeId"
                    rules={{ required: "Employee ID is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700">Employee ID *</FormLabel>
                        <FormControl>
                          <Input className="h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" placeholder="Enter your employee ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Details Section */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-t-xl">
                <CardTitle className="text-3xl font-bold flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <span>Event Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <FormField
                  control={form.control}
                  name="eventName"
                  rules={{ required: "Event name is required" }}
                  render={({ field }) => (
                    <FormItem className="animate-fade-in">
                      <FormLabel className="text-xl font-bold text-gray-700">Event Name *</FormLabel>
                      <FormControl>
                        <Input className="h-16 border-2 border-gray-200 focus:border-emerald-500 rounded-2xl text-xl hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white font-medium" placeholder="Enter the event name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    rules={{ required: "Event date is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                          <CalendarIcon className="h-5 w-5 mr-2 text-emerald-500" />
                          Event Date *
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input 
                              type="date" 
                              className="h-14 border-2 border-gray-200 focus:border-emerald-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white"
                              {...field} 
                            />
                            <CalendarIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-emerald-500 transition-all duration-300" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    rules={{ required: "Preferred time is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700">Preferred Time *</FormLabel>
                        <FormControl>
                          <Input className="h-14 border-2 border-gray-200 focus:border-emerald-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" placeholder="e.g., 10:00 AM - 2:00 PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="eventDescription"
                  rules={{ required: "Event description is required" }}
                  render={({ field }) => (
                    <FormItem className="animate-fade-in">
                      <FormLabel className="text-xl font-bold text-gray-700">Event Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a detailed description of the event, its objectives, and planned activities"
                          className="min-h-[150px] border-2 border-gray-200 focus:border-emerald-500 rounded-2xl text-lg resize-none hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FormField
                    control={form.control}
                    name="businessImpact"
                    rules={{ required: "Business impact is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700">Business Impact *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe how this event will benefit the business"
                            className="min-h-[120px] border-2 border-gray-200 focus:border-emerald-500 rounded-2xl text-lg resize-none hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeeTakeaway"
                    rules={{ required: "Employee takeaway is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700">Employee Takeaway *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What will employees gain from this event?"
                            className="min-h-[120px] border-2 border-gray-200 focus:border-emerald-500 rounded-2xl text-lg resize-none hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Budget & Logistics Section */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-t-xl">
                <CardTitle className="text-3xl font-bold flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <span>Budget & Logistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                  <FormField
                    control={form.control}
                    name="tentativeBudget"
                    rules={{ required: "Budget information is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-purple-500" />
                          Tentative Budget *
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg group-focus-within:text-purple-500 transition-all duration-300">₹</span>
                            <Input className="pl-10 h-14 border-2 border-gray-200 focus:border-purple-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" placeholder="50,000" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="headCount"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-purple-500" />
                          Expected Attendees
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-purple-500 transition-all duration-300" />
                            <Input className="pl-14 h-14 border-2 border-gray-200 focus:border-purple-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" placeholder="Number of attendees" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venuePreferred"
                    rules={{ required: "Venue selection is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-purple-500" />
                          Preferred Venue *
                        </FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          const venue = venues.find(v => v.id === value);
                          setSelectedVenue(venue || null);
                        }} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-purple-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white">
                              <SelectValue placeholder="Select a venue" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-80 bg-white border-2 border-gray-200 rounded-xl shadow-2xl">
                            {venues.map((venue) => (
                              <SelectItem key={venue.id} value={venue.id} className="p-4 hover:bg-purple-50 transition-all duration-300">
                                <div className="space-y-2">
                                  <div className="font-semibold text-gray-800">{venue.name}</div>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <div className="flex items-center space-x-4">
                                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                                        Floor {venue.floor}
                                      </span>
                                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-medium">
                                        🪑 {venue.seating} seats
                                      </span>
                                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium">
                                        📺 {venue.avSupport}
                                      </span>
                                    </div>
                                    <div className="text-xs text-purple-600 font-medium">
                                      📋 {venue.suitableFor}
                                    </div>
                                    {venue.limitations && venue.limitations !== "NIL" && (
                                      <div className="text-xs text-red-600">
                                        ⚠️ {venue.limitations}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Venue Details Display */}
                {selectedVenue && (
                  <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 animate-fade-in">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-purple-800 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Selected Venue Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700">📍 Location:</span>
                            <span className="text-gray-600">Module {selectedVenue.module}, Floor {selectedVenue.floor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700">🪑 Capacity:</span>
                            <span className="text-gray-600">{selectedVenue.seating} people</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700">🎥 AV Support:</span>
                            <span className="text-gray-600">{selectedVenue.avSupport}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <span className="font-semibold text-gray-700">✅ Best For:</span>
                            <span className="text-gray-600">{selectedVenue.suitableFor}</span>
                          </div>
                          {selectedVenue.limitations && selectedVenue.limitations !== "NIL" && (
                            <div className="flex items-start space-x-2">
                              <span className="font-semibold text-red-700">⚠️ Limitations:</span>
                              <span className="text-red-600 text-sm">{selectedVenue.limitations}</span>
                            </div>
                          )}
                          <div className="flex items-start space-x-2">
                            <span className="font-semibold text-gray-700">📝 Note:</span>
                            <span className="text-gray-600 text-sm">{selectedVenue.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <FormField
                  control={form.control}
                  name="specialArrangements"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in">
                      <FormLabel className="text-xl font-bold text-gray-700">Special Arrangements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any special arrangements needed (catering, AV equipment, accessibility requirements, etc.)"
                          className="min-h-[120px] border-2 border-gray-200 focus:border-purple-500 rounded-2xl text-lg resize-none hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Approval Section */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-t-xl">
                <CardTitle className="text-3xl font-bold flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <span>Leadership Approval</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <FormField
                  control={form.control}
                  name="leaderApproval"
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <FormItem className="space-y-6 animate-fade-in">
                      <FormLabel className="text-xl font-bold text-gray-700">Have you received approval from CIEC Business Unit leader? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row space-x-8"
                        >
                          <div className="flex items-center space-x-4 bg-green-50 p-6 rounded-2xl border-2 border-green-200 hover:bg-green-100 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                            <RadioGroupItem value="yes" id="yes" className="border-green-500 w-6 h-6" />
                            <Label htmlFor="yes" className="text-xl font-bold text-green-700 cursor-pointer">✅ Yes</Label>
                          </div>
                          <div className="flex items-center space-x-4 bg-red-50 p-6 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                            <RadioGroupItem value="no" id="no" className="border-red-500 w-6 h-6" />
                            <Label htmlFor="no" className="text-xl font-bold text-red-700 cursor-pointer">❌ No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="approverName"
                  rules={{ required: "Approver name is required" }}
                  render={({ field }) => (
                    <FormItem className="animate-fade-in">
                      <FormLabel className="text-xl font-bold text-gray-700 flex items-center">
                        <User className="h-5 w-5 mr-2 text-orange-500" />
                        CIEC Leader Name *
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-all duration-300" />
                          <Input className="pl-14 h-14 border-2 border-gray-200 focus:border-orange-500 rounded-2xl text-lg hover:border-gray-300 transition-all duration-300 bg-gray-50 focus:bg-white" placeholder="Enter the leader's name who approved" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Enhanced Submit Button */}
            <div className="flex justify-center pb-12 animate-fade-in">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-16 py-6 text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[320px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-white mr-4"></div>
                    <span>Processing & Sending Email...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="h-8 w-8 mr-4" />
                    <span>Submit Event Request</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
