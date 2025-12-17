import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Mail, MessagesSquare, Settings, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useApiKey } from "../../providers/ApiKeyProvider";
import { Avatar, AvatarFallback } from "../ui/avatar";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/contact-messages", label: "Contact", icon: Mail },
  { to: "/consultations", label: "Consultations", icon: MessagesSquare },
  { to: "/service-inquiries", label: "Service inquiries", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearApiKey } = useApiKey();

  const handleLogout = () => {
    clearApiKey();
    navigate(`/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
        <Sidebar>
          <SidebarHeader className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
              DM
            </div>
            <div>
              <p className="text-sm font-semibold">Digital Marketing</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton asChild isActive={location.pathname === item.to}>
                  <Link to={item.to} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
          <SidebarFooter className="px-4 py-4">
            <Separator className="mb-3" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>API</AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">API session</p>
                  <p className="text-xs text-slate-500">Secure mode</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 space-y-4 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
