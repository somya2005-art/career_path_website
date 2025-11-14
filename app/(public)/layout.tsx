// PublicLayout.tsx
import { PublicNav } from "./_components/public-nav";
import Aurora from "@/components/Aurora"; // --- IMPORT AURORA ---
import { cn } from "@/lib/utils";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* --- THIS IS THE FIX --- */}
      {/* This outer div is now fixed and contains BOTH
          the black background AND the aurora, ensuring
          they are both behind all content.
      */}
      <div className="fixed inset-0 z-0">
        {/* 1. The black background you requested */}
        <div className="absolute inset-0 bg-black" />

        {/* 2. The Aurora on top of the black background */}
        <div className="absolute inset-0">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
      </div>
      {/* --- END OF FIX --- */}

      {/* navbar is z-50 (on top of everything) */}
      <div className="flex items-center justify-center fixed top-0 left-0 w-full h-16 z-50 bg-transparent">
        <PublicNav />
      </div>

      {/* The main content is z-10 (in front of aurora but behind nav) */}
      <main className="flex-1 relative z-10">{children}</main>
    </div>
  );
}
