"use client";

// This file is the layout for all logged-in pages
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. The Provider wraps everything
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col md:flex-row">
        {/* 2. The Sidebar component */}
        <AppSidebar />

        {/* 3. The Main Content
            - flex-1 tells it to take up all remaining space
            - h-screen makes it fill the viewport height
            - overflow-auto has been REMOVED.
        */}
        <main className="flex-1 h-screen bg-white dark:bg-neutral-900">
          {/* Your page content will be rendered here */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
