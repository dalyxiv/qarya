import { createFileRoute } from "@tanstack/react-router";
import { Allocator } from "@/components/Allocator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
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
    <DashboardLayout
      title="Design Resource Allocation"
      actions={
        <Button size="sm" className="gap-1.5 shadow-[0_0_30px_-6px_var(--primary)] hover:shadow-[0_0_40px_-4px_var(--primary)] transition-shadow">
          <Plus className="h-4 w-4" />
          New Project Brief
        </Button>
      }
    >
      <Allocator />
    </DashboardLayout>
  );
}
