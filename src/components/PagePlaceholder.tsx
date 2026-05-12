import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center gap-3 border-b border-white/5 bg-card/60 backdrop-blur-xl px-4 md:px-6 sticky top-0 z-10">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              {title}
            </h1>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Card className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5 max-w-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary shadow-[0_0_25px_-4px_var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>{description}</p>
                <p className="text-sm">This module is part of the QARYA roadmap and will be available in an upcoming release.</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}