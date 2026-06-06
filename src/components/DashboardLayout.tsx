import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export function DashboardLayout({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center gap-3 border-b border-white/5 bg-card/60 backdrop-blur-xl px-4 md:px-6 sticky top-0 z-10 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.8)]">
            <SidebarTrigger />
            <h1 className="text-base md:text-lg font-semibold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent truncate">
              {title}
            </h1>
            <div className="ml-auto flex items-center gap-2">
              {actions}
              <Button size="icon" variant="ghost" aria-label="Profile">
                <UserCircle2 className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          <footer className="border-t border-white/5 bg-card/40 px-4 md:px-6 py-3 text-[11px] text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-1 text-center">
            <span>QARYA · Hybrid Intelligence Design Allocator</span>
            <span className="font-mono">Developed by DALY · 2026 : 314 · A LEXEL company</span>
          </footer>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}