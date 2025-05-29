
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="h-16 border-b bg-white shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="text-enterprise-600 hover:text-enterprise-900" />
              <div className="hidden md:flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-enterprise-400 h-4 w-4" />
                  <Input 
                    placeholder="Search events, planners, budgets..." 
                    className="pl-10 w-96 border-enterprise-200 focus:border-enterprise-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-enterprise-600 hover:text-enterprise-900">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-enterprise-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-enterprise-900">Sarah Johnson</p>
                  <p className="text-xs text-enterprise-600">VP Technology</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full p-0 h-8 w-8">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
