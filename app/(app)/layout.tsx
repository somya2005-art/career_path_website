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
        {/* --- THIS IS THE FIX ---
          We remove `overflow-auto` and add `h-screen`.
          This stops the <main> tag from scrolling and makes it
          a full-height container. The page component (e.g., chat/page.tsx)
          will now be responsible for its *own* scrolling.
        */}
        <main className="flex-1 h-screen bg-white dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
