
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, ClipboardList, Send, User, Building2, Mail, Calendar, MapPin, DollarSign, Users } from "lucide-react";
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

  const onSubmit = async (data: EventRequestForm) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Event Request Form Data:", data);
    
    toast({
      title: "Event Request Submitted",
      description: "Your event request has been submitted for approval.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center space-x-4 bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <ClipboardList className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Request Form</h1>
              <p className="text-lg text-gray-600">Submit your event proposal for approval</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-3">Important Guidelines</h2>
              <p className="text-blue-100 leading-relaxed">
                This form ensures smooth coordination and effective planning for upcoming events at CIEC. 
                Please submit your request at least one month before the event date. All submissions 
                are subject to approval based on timelines, budget constraints, and organizational priorities.
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Requester Information Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Full Name *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl" placeholder="Enter your full name" {...field} />
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Team / Business Unit *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl" placeholder="Enter your team/business unit" {...field} />
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Email Address *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl" type="email" placeholder="Enter your email address" {...field} />
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Employee ID *</FormLabel>
                        <FormControl>
                          <Input className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl" placeholder="Enter your employee ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Details Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-green-500 rounded-lg">
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
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Event Name *</FormLabel>
                      <FormControl>
                        <Input className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl text-lg" placeholder="Enter the event name" {...field} />
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Event Date *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="date" 
                              className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl text-lg"
                              {...field} 
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Preferred Time *</FormLabel>
                        <FormControl>
                          <Input className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl" placeholder="e.g., 10:00 AM - 2:00 PM" {...field} />
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
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Event Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a detailed description of the event, its objectives, and planned activities"
                          className="min-h-[120px] border-2 border-gray-200 focus:border-green-500 rounded-xl text-base resize-none"
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Business Impact *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe how this event will benefit the business"
                            className="min-h-[100px] border-2 border-gray-200 focus:border-green-500 rounded-xl resize-none"
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Employee Takeaway *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What will employees gain from this event?"
                            className="min-h-[100px] border-2 border-gray-200 focus:border-green-500 rounded-xl resize-none"
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Tentative Budget *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                            <Input className="pl-8 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl" placeholder="50,000" {...field} />
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Expected Attendees</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl" placeholder="Number of attendees" {...field} />
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
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Preferred Venue *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl" placeholder="Specify the preferred venue" {...field} />
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
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Special Arrangements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any special arrangements needed (catering, AV equipment, accessibility requirements, etc.)"
                          className="min-h-[100px] border-2 border-gray-200 focus:border-purple-500 rounded-xl resize-none"
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-100 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
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
                    <FormItem className="space-y-4">
                      <FormLabel className="text-lg font-semibold text-gray-700">Have you received approval from CIEC Business Unit leader? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row space-x-8"
                        >
                          <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-xl border-2 border-green-200">
                            <RadioGroupItem value="yes" id="yes" className="border-green-500" />
                            <Label htmlFor="yes" className="text-lg font-medium text-green-700 cursor-pointer">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-red-50 p-4 rounded-xl border-2 border-red-200">
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
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">CIEC Leader Name *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl" placeholder="Enter the leader's name who approved" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pb-8">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-3" />
                    Submit Event Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
