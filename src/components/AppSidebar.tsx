import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Users, BarChart3, Settings, Scale } from "lucide-react";
import eldalyLogo from "@/assets/eldaly-logo.png";
import lexelLogo from "@/assets/lexel-logo.png";
import uepLogo from "@/assets/uep-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Active Projects", url: "/projects", icon: FolderKanban },
  { title: "Resource Pool", url: "/resources", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Human vs AI", url: "/compare", icon: Scale },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white p-1 shadow-[0_0_25px_-4px_var(--primary)]">
            <img src={eldalyLogo} alt="Eldaly" className="h-full w-full object-contain" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-[0.2em] bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">QARYA</span>
              <span className="text-[10px] text-muted-foreground">Hybrid Intelligence</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/5">
        {!collapsed ? (
          <div className="px-2 py-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">A product of</span>
            </div>
            <img src={lexelLogo} alt="LEXEL" className="theme-invert h-6 w-auto object-contain opacity-90" />
            <div className="pt-2 border-t border-white/5">
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Master Thesis</span>
              <img src={uepLogo} alt="UEP" className="theme-invert mt-1 h-5 w-auto object-contain opacity-80" />
              <div className="text-[9px] text-muted-foreground/70 mt-1 leading-tight">
                Poznań University of<br />Economics & Business
              </div>
              <div className="text-[9px] text-primary/80 mt-1 leading-tight">
                Supervisor: Robert Romanowski
              </div>
            </div>
            <div className="pt-2">
              <ThemeToggle className="w-full" />
            </div>
            <div className="text-[9px] font-mono text-muted-foreground/70 pt-1">
              Developed by DALY · 2026 : 314
            </div>
          </div>
        ) : (
          <div className="px-2 py-3">
            <img src={lexelLogo} alt="LEXEL" className="theme-invert h-5 w-auto object-contain opacity-80" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}