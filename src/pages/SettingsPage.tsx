
import { useState } from "react";
import { Settings, User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "Balaji Nadar",
    email: "balaji.nadar@comcast.com",
    phone: "+91 98765 43214",
    title: "VP Technology",
    department: "Technology"
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: true,
    budgetAlerts: true
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    timezone: "Asia/Kolkata",
    dateFormat: "dd/mm/yyyy"
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your system preferences have been updated.",
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header with Comcast Logo */}
      <div className="flex items-center justify-between animate-slide-in-right">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center shadow-sm border transition-transform duration-300 hover:scale-105">
            <img 
              src="/lovable-uploads/a74518e8-f616-4c58-8387-b408a2285639.png" 
              alt="Comcast Logo" 
              className="h-10 w-auto"
            />
          </div>
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-comcast-blue">Settings</h1>
            <p className="text-comcast-gray mt-1">Manage your account preferences and system settings</p>
          </div>
        </div>
        <div className="text-right animate-fade-in">
          <p className="text-sm text-comcast-gray">CIEC Chennai</p>
          <p className="font-semibold text-comcast-blue">Technology Division</p>
        </div>
      </div>

      {/* Comcast Branding Banner */}
      <Card className="bg-gradient-to-r from-comcast-blue to-comcast-lightBlue text-white border-0 shadow-lg animate-scale-in">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <img 
                  src="/lovable-uploads/a74518e8-f616-4c58-8387-b408a2285639.png" 
                  alt="Comcast Logo" 
                  className="h-8 w-auto opacity-90"
                />
              </div>
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold">Comcast CIEC Chennai</h2>
                <p className="text-blue-100 mt-2 text-lg">Event Management System</p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium transition-all duration-300 hover:bg-opacity-30">Enterprise Solutions</span>
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium transition-all duration-300 hover:bg-opacity-30">Global Technology</span>
                </div>
              </div>
            </div>
            <div className="text-right animate-slide-in-right">
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-105">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm text-blue-100">Connected Organization</p>
              <p className="font-semibold text-lg">Technology Division</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-comcast-lightGray transition-all duration-300">
          <TabsTrigger 
            value="profile" 
            className="flex items-center space-x-2 data-[state=active]:bg-comcast-blue data-[state=active]:text-white transition-all duration-300 hover:bg-comcast-blue hover:bg-opacity-10"
          >
            <User className="h-4 w-4 transition-transform duration-200" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="flex items-center space-x-2 data-[state=active]:bg-comcast-blue data-[state=active]:text-white transition-all duration-300 hover:bg-comcast-blue hover:bg-opacity-10"
          >
            <Bell className="h-4 w-4 transition-transform duration-200" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="flex items-center space-x-2 data-[state=active]:bg-comcast-blue data-[state=active]:text-white transition-all duration-300 hover:bg-comcast-blue hover:bg-opacity-10"
          >
            <Palette className="h-4 w-4 transition-transform duration-200" />
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="flex items-center space-x-2 data-[state=active]:bg-comcast-blue data-[state=active]:text-white transition-all duration-300 hover:bg-comcast-blue hover:bg-opacity-10"
          >
            <Shield className="h-4 w-4 transition-transform duration-200" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 animate-fade-in">
          <Card className="border-comcast-lightBlue/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-comcast-lightGray to-white">
              <CardTitle className="text-comcast-blue flex items-center space-x-2">
                <User className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </div>
              <div className="transition-all duration-200 hover:scale-[1.02]">
                <Label htmlFor="department">Department</Label>
                <Select value={profileData.department} onValueChange={(value) => setProfileData({ ...profileData, department: value })}>
                  <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSaveProfile} 
                className="bg-comcast-blue hover:bg-comcast-blue/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Save className="h-4 w-4 mr-2 transition-transform duration-200" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 animate-fade-in">
          <Card className="border-comcast-lightBlue/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-comcast-lightGray to-white">
              <CardTitle className="text-comcast-blue flex items-center space-x-2">
                <Bell className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                <div>
                  <Label htmlFor="email-alerts">Email Alerts</Label>
                  <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                </div>
                <Switch
                  id="email-alerts"
                  checked={notifications.emailAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                  className="transition-all duration-200"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Get real-time notifications in your browser</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  className="transition-all duration-200"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                <div>
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                  <p className="text-sm text-gray-600">Receive weekly summary reports</p>
                </div>
                <Switch
                  id="weekly-reports"
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  className="transition-all duration-200"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                <div>
                  <Label htmlFor="budget-alerts">Budget Alerts</Label>
                  <p className="text-sm text-gray-600">Get notified when budget thresholds are reached</p>
                </div>
                <Switch
                  id="budget-alerts"
                  checked={notifications.budgetAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, budgetAlerts: checked })}
                  className="transition-all duration-200"
                />
              </div>
              <Button 
                onClick={handleSaveNotifications} 
                className="bg-comcast-blue hover:bg-comcast-blue/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Save className="h-4 w-4 mr-2 transition-transform duration-200" />
                Save Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 animate-fade-in">
          <Card className="border-comcast-lightBlue/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-comcast-lightGray to-white">
              <CardTitle className="text-comcast-blue flex items-center space-x-2">
                <Palette className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                <span>System Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                    <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="language">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                    <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}>
                    <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}>
                    <SelectTrigger className="transition-all duration-200 hover:scale-[1.02]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={handleSavePreferences} 
                className="bg-comcast-blue hover:bg-comcast-blue/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Save className="h-4 w-4 mr-2 transition-transform duration-200" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 animate-fade-in">
          <Card className="border-comcast-lightBlue/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-comcast-lightGray to-white">
              <CardTitle className="text-comcast-blue flex items-center space-x-2">
                <Shield className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-4">
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter current password" 
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter new password" 
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div className="transition-all duration-200 hover:scale-[1.02]">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm new password" 
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </div>
              <Button className="bg-comcast-blue hover:bg-comcast-blue/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Shield className="h-4 w-4 mr-2 transition-transform duration-200" />
                Update Password
              </Button>
              <Separator className="border-comcast-lightBlue/30" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-comcast-blue">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                  <div>
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-comcast-gray">Add an extra layer of security to your account</p>
                  </div>
                  <Switch className="transition-all duration-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Comcast Footer Branding */}
      <Card className="bg-comcast-lightGray border-comcast-lightBlue/20 animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-comcast-blue font-semibold">© 2024 Comcast Corporation</span>
              <span className="text-comcast-gray">All rights reserved</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-comcast-gray">Powered by</span>
              <span className="text-comcast-blue font-semibold">Comcast Technology</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
