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
import { UserButton } from "@clerk/nextjs"; // --- IMPORTED CLERK USER BUTTON ---
import { usePathname } from "next/navigation"; // --- IMPORTED usePathname ---
import Link from "next/link"; // --- IMPORTED NEXT/LINK for Logo ---

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
    // --- The outer layout DIV has been REMOVED ---
    // The <Sidebar> component is now the root
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

        {/* --- THIS IS THE FIX --- */}
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
        {/* --- END OF FIX --- */}
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <Link // --- Use Next/Link instead of <a> ---
      href="/dashboard" // --- Link to dashboard ---
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Career Path
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link // --- Use Next/Link instead of <a> ---
      href="/dashboard" // --- Link to dashboard ---
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};
