import { auth } from "@/lib/auth";
import React from "react";
import UserProfileDropdown from "./UserProfileDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function DashboardHeader() {
  const session = await auth();
  return (
    <header className="sticky top-0 h-14 w-full border-b bg-white backdrop-blur-3xl flex items-center justify-between p-4">
      <SidebarTrigger />
      <div>
        Welcome{" "}
        <span className="font-semibold">
          <span>{session?.user.firstName ?? "_"}</span>{" "}
          <span>{session?.user.lastName ?? "_"}</span>
        </span>
      </div>
      <div className="ml-auto w-fit">
        <UserProfileDropdown isArrowUp={false} isFullName={false} />
      </div>
    </header>
  );
}
