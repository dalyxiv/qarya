import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — QARYA" }] }),
});

function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div className="grid gap-6 max-w-3xl">
        <Card className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5">
          <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Workspace name</Label>
              <Input defaultValue="QARYA — Machinery Division" />
            </div>
            <div className="space-y-2">
              <Label>Parent company</Label>
              <Input defaultValue="LEXEL" readOnly />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-elegant backdrop-blur-sm bg-card/80 border-white/5">
          <CardHeader><CardTitle>Allocator Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Prefer Hybrid by default", true],
              ["Auto-publish recommendations", false],
              ["Email alerts on new briefs", true],
              ["Dark theme", true],
            ].map(([label, def]) => (
              <div key={label as string} className="flex items-center justify-between">
                <Label>{label as string}</Label>
                <Switch defaultChecked={def as boolean} />
              </div>
            ))}
            <div className="pt-2">
              <Button>Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}