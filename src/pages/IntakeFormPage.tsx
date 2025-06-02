
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, ClipboardList, Send, User, Building2, Mail, Calendar, MapPin, DollarSign, Users, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export default function IntakeFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    // Simulate email sending - In a real app, you'd use a service like EmailJS or backend API
    const emailContent = `
New Event Request Submitted

Event Details:
- Event Name: ${data.eventName}
- Date: ${data.eventDate}
- Time: ${data.preferredTime}
- Venue: ${data.venuePreferred}
- Budget: ₹${data.tentativeBudget}
- Expected Attendees: ${data.headCount}

Requester Information:
- Name: ${data.requesterName}
- Team: ${data.requesterTeam}
- Email: ${data.requesterEmail}
- Employee ID: ${data.requesterEmployeeId}

Event Description:
${data.eventDescription}

Business Impact:
${data.businessImpact}

Employee Takeaway:
${data.employeeTakeaway}

Leadership Approval: ${data.leaderApproval}
Approver: ${data.approverName}

Special Arrangements:
${data.specialArrangements || 'None'}

Submitted on: ${new Date().toLocaleString()}
    `;

    console.log("Email would be sent with content:", emailContent);
    
    // Here you would integrate with an actual email service
    // For example, using EmailJS:
    // await emailjs.send('service_id', 'template_id', {
    //   to_email: 'events@ciec.com',
    //   from_email: data.requesterEmail,
    //   subject: `New Event Request: ${data.eventName}`,
    //   message: emailContent
    // });
  };

  const onSubmit = async (data: EventRequestForm) => {
    setIsSubmitting(true);
    
    try {
      // Send email notification
      await sendEmail(data);
      
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Event Request Form Data:", data);
      
      setIsSubmitted(true);
      
      toast({
        title: "Event Request Submitted Successfully!",
        description: "Your event request has been submitted and email notifications have been sent.",
      });
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="animate-scale-in">
              <CheckCircle2 className="h-24 w-24 text-green-500 mx-auto mb-6" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Submitted!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your event request has been successfully submitted and email notifications have been sent to the relevant teams.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">What happens next?</h2>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Your request will be reviewed by the CIEC events team</li>
                <li>• You'll receive an approval/rejection email within 5 business days</li>
                <li>• If approved, further coordination details will be shared</li>
              </ul>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Enhanced Header with Animation */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-4 bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl animate-pulse">
              <ClipboardList className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Event Request Form
              </h1>
              <p className="text-lg text-gray-600">Submit your event proposal for approval</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Important Guidelines
              </h2>
              <p className="text-blue-100 leading-relaxed">
                This form ensures smooth coordination and effective planning for upcoming events at CIEC. 
                Please submit your request at least one month before the event date. All submissions 
                are subject to approval based on timelines, budget constraints, and organizational priorities.
                <span className="block mt-2 font-semibold">📧 Email notifications will be sent upon submission.</span>
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Requester Information Section */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg animate-bounce">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <span>Requester Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="requesterName"
                    rules={{ required: "Requester name is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-lg font-semibold text-gray-700">Full Name *</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="Enter your full name" {...field} />
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Team / Business Unit *</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="Enter your team/business unit" {...field} />
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Email Address *</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl hover:border-gray-300 transition-all duration-200" type="email" placeholder="Enter your email address" {...field} />
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Employee ID *</FormLabel>
                        <FormControl>
                          <Input className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="Enter your employee ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Details Section */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-green-500 rounded-lg animate-bounce">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <span>Event Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <FormField
                  control={form.control}
                  name="eventName"
                  rules={{ required: "Event name is required" }}
                  render={({ field }) => (
                    <FormItem className="animate-fade-in">
                      <FormLabel className="text-lg font-semibold text-gray-700">Event Name *</FormLabel>
                      <FormControl>
                        <Input className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl text-lg hover:border-gray-300 transition-all duration-200" placeholder="Enter the event name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    rules={{ required: "Event date is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-lg font-semibold text-gray-700">Event Date *</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input 
                              type="date" 
                              className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl text-lg hover:border-gray-300 transition-all duration-200"
                              {...field} 
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Preferred Time *</FormLabel>
                        <FormControl>
                          <Input className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="e.g., 10:00 AM - 2:00 PM" {...field} />
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
                      <FormLabel className="text-lg font-semibold text-gray-700">Event Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a detailed description of the event, its objectives, and planned activities"
                          className="min-h-[120px] border-2 border-gray-200 focus:border-green-500 rounded-xl text-base resize-none hover:border-gray-300 transition-all duration-200"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="businessImpact"
                    rules={{ required: "Business impact is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-lg font-semibold text-gray-700">Business Impact *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe how this event will benefit the business"
                            className="min-h-[100px] border-2 border-gray-200 focus:border-green-500 rounded-xl resize-none hover:border-gray-300 transition-all duration-200"
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Employee Takeaway *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What will employees gain from this event?"
                            className="min-h-[100px] border-2 border-gray-200 focus:border-green-500 rounded-xl resize-none hover:border-gray-300 transition-all duration-200"
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 rounded-lg animate-bounce">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <span>Budget & Logistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <FormField
                    control={form.control}
                    name="tentativeBudget"
                    rules={{ required: "Budget information is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-lg font-semibold text-gray-700">Tentative Budget *</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold group-focus-within:text-purple-500 transition-colors">₹</span>
                            <Input className="pl-8 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="50,000" {...field} />
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Expected Attendees</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="Number of attendees" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venuePreferred"
                    rules={{ required: "Venue preference is required" }}
                    render={({ field }) => (
                      <FormItem className="animate-fade-in">
                        <FormLabel className="text-lg font-semibold text-gray-700">Preferred Venue *</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="Specify the preferred venue" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialArrangements"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in">
                      <FormLabel className="text-lg font-semibold text-gray-700">Special Arrangements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any special arrangements needed (catering, AV equipment, accessibility requirements, etc.)"
                          className="min-h-[100px] border-2 border-gray-200 focus:border-purple-500 rounded-xl resize-none hover:border-gray-300 transition-all duration-200"
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-orange-500 rounded-lg animate-bounce">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <span>Leadership Approval</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <FormField
                  control={form.control}
                  name="leaderApproval"
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <FormItem className="space-y-4 animate-fade-in">
                      <FormLabel className="text-lg font-semibold text-gray-700">Have you received approval from CIEC Business Unit leader? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row space-x-8"
                        >
                          <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-xl border-2 border-green-200 hover:bg-green-100 transition-all duration-200 cursor-pointer">
                            <RadioGroupItem value="yes" id="yes" className="border-green-500" />
                            <Label htmlFor="yes" className="text-lg font-medium text-green-700 cursor-pointer">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-red-50 p-4 rounded-xl border-2 border-red-200 hover:bg-red-100 transition-all duration-200 cursor-pointer">
                            <RadioGroupItem value="no" id="no" className="border-red-500" />
                            <Label htmlFor="no" className="text-lg font-medium text-red-700 cursor-pointer">No</Label>
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
                      <FormLabel className="text-lg font-semibold text-gray-700">CIEC Leader Name *</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl hover:border-gray-300 transition-all duration-200" placeholder="Enter the leader's name who approved" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pb-8 animate-fade-in">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Submitting & Sending Email...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="h-6 w-6 mr-3" />
                    <span>Submit Event Request</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
