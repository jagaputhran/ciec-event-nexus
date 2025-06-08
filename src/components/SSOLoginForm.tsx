
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield, Mail, Lock, Eye, EyeOff, Chrome, Briefcase } from "lucide-react";

interface SSOLoginFormProps {
  onAuthenticated: () => void;
}

export default function SSOLoginForm({ onAuthenticated }: SSOLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSSOLogin = async (provider: string) => {
    setIsLoading(true);
    console.log(`Authenticating with ${provider}...`);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onAuthenticated();
  };

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Authenticating with credentials...");
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onAuthenticated();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-comcast-blue via-comcast-lightBlue to-indigo-600 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
            <div className="relative p-6 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <Shield className="h-16 w-16 text-white mx-auto" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white">Secure Access</h1>
            <p className="text-comcast-lightGray text-lg">
              Sign in to access the Event Request Portal
            </p>
          </div>
        </div>

        {/* SSO Login Card */}
        <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-scale-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-comcast-blue flex items-center justify-center space-x-3">
              <img 
                src="/lovable-uploads/a74518e8-f616-4c58-8387-b408a2285639.png" 
                alt="Comcast Logo" 
                className="h-8 w-auto"
              />
              <span>CIEC Portal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {/* SSO Buttons */}
            <div className="space-y-4">
              <Button
                onClick={() => handleSSOLogin("Microsoft")}
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Briefcase className="h-6 w-6 mr-3" />
                Continue with Microsoft
              </Button>

              <Button
                onClick={() => handleSSOLogin("Google")}
                disabled={isLoading}
                variant="outline"
                className="w-full h-14 border-2 border-gray-300 hover:border-gray-400 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Chrome className="h-6 w-6 mr-3" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <Separator className="my-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-gray-500 font-medium">or sign in with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleCredentialLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-lg hover:border-gray-300 transition-all duration-300"
                      placeholder="Enter your work email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-lg font-semibold text-gray-700">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-lg hover:border-gray-300 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full h-14 bg-gradient-to-r from-comcast-blue to-comcast-lightBlue hover:from-comcast-navy hover:to-comcast-blue text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="text-center space-y-3 pt-4">
              <p className="text-sm text-gray-600">
                <button className="text-comcast-lightBlue hover:text-comcast-blue font-semibold hover:underline transition-all duration-300">
                  Forgot your password?
                </button>
              </p>
              <p className="text-xs text-gray-500">
                By signing in, you agree to CIEC's Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-fade-in">
          <div className="flex items-center space-x-3 text-white">
            <Shield className="h-6 w-6 text-green-300" />
            <div>
              <p className="font-semibold">Secure Connection</p>
              <p className="text-sm text-comcast-lightGray">Your data is protected with enterprise-grade encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
