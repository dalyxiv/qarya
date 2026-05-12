import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/projects")({
  component: () => (
    <PagePlaceholder
      title="Active Projects"
      description="Track ongoing design briefs, their allocation status, and current progress across human, AI, and hybrid teams."
      icon={FolderKanban}
    />
  ),
  head: () => ({ meta: [{ title: "Active Projects — QARYA" }] }),
});