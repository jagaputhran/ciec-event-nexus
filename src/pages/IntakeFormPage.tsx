
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, ClipboardList, Send } from "lucide-react";
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
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <ClipboardList className="h-8 w-8 text-enterprise-600" />
          <h1 className="text-3xl font-bold text-enterprise-900">Event Request Form</h1>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-enterprise-700 leading-relaxed">
            This form is designed to ensure smooth coordination and effective planning for upcoming events at CIEC. 
            The requesters are required to submit the Form (raise an event request) at least a month before the event 
            they intend to organize. Please fill out the necessary information accurately and clearly. Do note that once 
            you submit the Form, the event is up for approval, and shall be approved or rejected based on timelines, 
            budget constraints and other concerns, if any.
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-enterprise-900">
            Event Request Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Requester Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="requesterName"
                  rules={{ required: "Requester name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of the Requester *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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
                      <FormLabel>Team of the Requester (could be a Business Unit as well) *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your team/business unit" {...field} />
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
                      <FormLabel>Requester Email ID *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email address" {...field} />
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
                      <FormLabel>Requester Employee ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your employee ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Event Information */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="eventName"
                  rules={{ required: "Event name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of the Event Planned *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the event name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    rules={{ required: "Event date is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of the event *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="date" 
                              placeholder="dd/MM/yyyy" 
                              {...field} 
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                        <FormLabel>Preferred time for the event *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10:00 AM - 2:00 PM" {...field} />
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
                      <FormLabel>Describe the Event Planned *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a detailed description of the event"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessImpact"
                  rules={{ required: "Business impact is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business impact of the event *</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe the business impact" {...field} />
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
                      <FormLabel>Employee takeaway from the event *</FormLabel>
                      <FormControl>
                        <Input placeholder="What will employees gain from this event?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="tentativeBudget"
                    rules={{ required: "Budget information is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mention the tentative budget required *</FormLabel>
                        <FormControl>
                          <Input placeholder="₹ 50,000" {...field} />
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
                        <FormLabel>Head count anticipated</FormLabel>
                        <FormControl>
                          <Input placeholder="Number of attendees" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="venuePreferred"
                  rules={{ required: "Venue preference is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue preferred *</FormLabel>
                      <FormControl>
                        <Input placeholder="Specify the preferred venue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Approval Section */}
                <FormField
                  control={form.control}
                  name="leaderApproval"
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Have you received approval from CIEC Business Unit leader? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no">No</Label>
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
                      <FormLabel>Mention the name of the CIEC leader who approved the event *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the leader's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialArrangements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any special arrangements required. If yes, mention below.</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any special arrangements needed"
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-enterprise-600 hover:bg-enterprise-700 px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Event Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
