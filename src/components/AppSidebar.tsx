
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  DollarSign, 
  FileText, 
  Settings,
  Building2,
  BarChart3,
  ClipboardList
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Intake Form",
    url: "/intake-form",
    icon: ClipboardList,
  },
  {
    title: "Budget Management",
    url: "/budget",
    icon: DollarSign,
  },
  {
    title: "Event Planners",
    url: "/planners",
    icon: Users,
  },
  {
    title: "Leadership",
    url: "/leadership",
    icon: Building2,
  },
  {
    title: "Analytics",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} border-r bg-white transition-all duration-300`} collapsible="icon">
      <SidebarHeader className="p-6">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/a74518e8-f616-4c58-8387-b408a2285639.png" 
              alt="Comcast Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h2 className="text-lg font-bold text-enterprise-900">CIEC</h2>
              <p className="text-sm text-enterprise-600">Event Management</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <img 
            src="/lovable-uploads/a74518e8-f616-4c58-8387-b408a2285639.png" 
            alt="Comcast Logo" 
            className="h-8 w-auto mx-auto"
          />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-enterprise-100 text-enterprise-900 border-r-2 border-enterprise-600"
                            : "text-enterprise-600 hover:bg-enterprise-50 hover:text-enterprise-900"
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
