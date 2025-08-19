import ProtectedPage from "@/components/CheckAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "@/lib/auth";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="p-4 grid gap-6 grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div>
            <p className="text-lg">$400</p>
            <span className="text-muted-foreground text-xs">last 30 days</span>
          </div>
        </CardContent>
      </Card>
      <ProtectedPage />
    </div>
  );
}
