import { createFileRoute } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Allocator } from "@/components/Allocator";
import { Button } from "@/components/ui/button";
import { Plus, UserCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "QARYA — Design Resource Allocation" },
      {
        name: "description",
        content:
          "Hybrid Intelligence allocator distributing industrial design tasks across human, AI, and hybrid teams.",
      },
    ],
  }),
});

function Index() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center gap-3 border-b border-white/5 bg-card/60 backdrop-blur-xl px-4 md:px-6 sticky top-0 z-10 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.8)]">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Design Resource Allocation
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="gap-1.5 shadow-[0_0_30px_-6px_var(--primary)] hover:shadow-[0_0_40px_-4px_var(--primary)] transition-shadow">
                <Plus className="h-4 w-4" />
                New Project Brief
              </Button>
              <Button size="icon" variant="ghost" aria-label="Profile">
                <UserCircle2 className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Allocator />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
