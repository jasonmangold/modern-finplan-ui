
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Search, Calendar, User } from "lucide-react";

const navigationItems = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Analysis", url: "/analysis", icon: Search },
  { title: "Education", url: "/education", icon: Calendar },
  { title: "Calculators", url: "/calculators", icon: User },
  { title: "Presentation", url: "/presentation", icon: User },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-60">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors ${
                          isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
