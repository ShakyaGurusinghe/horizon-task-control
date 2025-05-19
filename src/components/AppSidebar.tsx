
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ListTodo, 
  Settings, 
  Users, 
  Plus 
} from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
    {
      title: "Team",
      path: "/team",
      icon: Users,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-task-blue"></div>
          <span className="font-semibold text-lg">TaskMaster</span>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={cn(
                      location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4">
        <button 
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2 text-white hover:bg-primary/90 transition-colors"
          onClick={() => navigate("/new-task")}
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </button>
      </div>
    </Sidebar>
  );
}

export function MobileSidebarTrigger() {
  return (
    <div className="flex items-center">
      <SidebarTrigger />
    </div>
  );
}
