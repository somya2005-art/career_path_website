"use client";

// This file is the layout for all logged-in pages
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen md:flex-row">
        {/* --- SIDEBAR COLUMN (sticky + full height) --- */}
        <div className="flex-none h-screen sticky top-0">
          <AppSidebar />
        </div>

        {/* --- MAIN CONTENT (scrolls independently) --- */}
        {/* Make the main area scrollable so the sidebar's sticky positioning works */}
        <main className="flex-1 h-screen overflow-auto bg-white dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
