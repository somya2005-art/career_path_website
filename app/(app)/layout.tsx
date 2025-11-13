"use client";

// This file is the layout for all logged-in pages
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. The Provider wraps everything
    <SidebarProvider>
      {/* This div creates the main layout:
          - flex-row for desktop
          - flex-col for mobile
          - h-screen to fill the viewport
      */}
      <div className="flex h-screen w-full flex-col md:flex-row">
        {/* 2. The Sidebar component */}
        <AppSidebar />

        {/* 3. The Main Content
            - flex-1 tells it to take up all remaining space
            - overflow-auto makes the content area scrollable, not the whole page
        */}
        <main className="flex-1 overflow-auto bg-white dark:bg-neutral-900">
          {/* Your page content (e.g., resume/page.tsx) will be rendered here */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
