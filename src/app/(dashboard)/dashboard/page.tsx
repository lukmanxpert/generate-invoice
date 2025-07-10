import ProtectedPage from "@/components/CheckAuth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      Dashboard
      <Button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Logout
      </Button>
      <ProtectedPage />
    </div>
  );
}
