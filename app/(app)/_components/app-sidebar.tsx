"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconFileText,
  IconSearch,
  IconRobot,
  IconBriefcase,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Resume",
      href: "/resume",
      icon: (
        <IconFileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Analyzer",
      href: "/analyzer",
      icon: (
        <IconSearch className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Career Bot",
      href: "/chat",
      icon: (
        <IconRobot className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Job Portal",
      href: "/jobs",
      icon: (
        <IconBriefcase className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    // The <Sidebar> component is the root
    <div className="h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}

            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                // Check if the current path matches the link
                const isActive = pathname === link.href;
                return (
                  <SidebarLink
                    key={idx}
                    link={link}
                    // Apply an active state style
                    className={cn(
                      "rounded-lg", // Add rounded corners for active state
                      isActive
                        ? "bg-neutral-200 dark:bg-neutral-700"
                        : "hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80"
                    )}
                  />
                );
              })}
            </div>
          </div>

          {/* Replaced the dummy SidebarLink with the actual UserButton */}
          <div
            className={cn(
              "flex items-center gap-2 p-2", // Use p-2 for alignment
              !open && "justify-center" // Center icon when closed
            )}
          >
            <UserButton afterSignOutUrl="/" />
            <motion.span
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
              className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-pre inline-block"
            >
              Profile
            </motion.span>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

// --- THIS IS THE FIX ---
export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      {/* 1. The "white patch" div has been REMOVED */}

      {/* 2. We use the Outfit font and style it */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-logo text-3xl font-bold tracking-wide whitespace-pre text-black dark:text-white"
      >
        Career Path
      </motion.span>
    </Link>
  );
};
// --- END OF FIX ---

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center justify-center py-1 text-sm font-normal text-black"
    >
      {/* This is your "CP" icon, which you said is fine. */}
      <div className="h-7 w-7 flex items-center justify-center shrink-0 rounded-lg bg-black dark:bg-white">
        <span className="text-xs font-bold text-white dark:text-black">CP</span>
      </div>
    </Link>
  );
};
