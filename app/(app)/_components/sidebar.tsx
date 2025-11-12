"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  FileText,
  LayoutDashboard,
  Briefcase,
  Bot,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Main navigation links
const navLinks = [
  {
    href: "/app/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/app/resume",
    icon: FileText,
    label: "Resume",
  },
  {
    href: "/app/analyzer",
    icon: Search,
    label: "Analyzer",
  },
  {
    href: "/app/jobs/domestic",
    icon: Briefcase,
    label: "Job Search",
  },
  {
    href: "/app/career-bot",
    icon: Bot,
    label: "Career Bot",
  },
];

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <div
        className={cn(
          "min-h-screen flex flex-col justify-between p-4 border-r bg-background transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-[250px]"
        )}
      >
        {/* Top Section: Nav and Collapse Button */}
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-8 bg-background border hover:bg-accent"
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Button>

          <nav className="flex flex-col gap-2 mt-12">
            {navLinks.map((link) => (
              <Tooltip key={link.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant={
                      // Check if the current path starts with the link's href
                      // This handles nested routes like /app/jobs/remote
                      pathname.startsWith(link.href) ? "default" : "ghost"
                    }
                    className={cn(
                      "flex gap-3",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Link href={link.href}>
                      <link.icon size={18} />
                      <span
                        className={cn(
                          "transition-opacity",
                          isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                {/* Only show tooltip when collapsed */}
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{link.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </div>

        {/* Bottom Section: User Profile */}
        <div className="flex items-center gap-3 p-2 border rounded-lg">
          <UserButton afterSignOutUrl="/" />
          <div
            className={cn(
              "flex flex-col transition-opacity",
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            )}
          >
            <span className="text-sm font-semibold truncate">
              {user?.fullName}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
