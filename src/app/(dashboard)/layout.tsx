import ProtectedPage from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import UserProfileDropdown from "./_components/UserProfileDropdown";
import DashboardHeader from "./_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar>
        <UserProfileDropdown isFullName isArrowUp />
      </DashboardSidebar>
      <main className="w-full">
        <DashboardHeader />
        {children}
        <ProtectedPage />
      </main>
    </SidebarProvider>
  );
}
