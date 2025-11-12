import { Protect } from "@clerk/nextjs";
import { AppSidebar } from "./_components/sidebar";

// This is the layout for all "in-app" pages
// It's protected by Clerk (redirects to /sign-in if not auth'd)
// It renders the collapsible sidebar
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // Protect ensures only logged-in users can see this layout
    <Protect>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-8 bg-muted/40">
          {/* Main content area for app pages */}
          {children}
        </main>
      </div>
    </Protect>
  );
}
