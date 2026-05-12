import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/resources")({
  component: () => (
    <PagePlaceholder
      title="Resource Pool"
      description="Manage your designers, AI agents, and hybrid squads. View skills, capacity, and current load."
      icon={Users}
    />
  ),
  head: () => ({ meta: [{ title: "Resource Pool — QARYA" }] }),
});