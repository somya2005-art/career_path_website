"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo, // kept for API parity (not used)
  NavbarButton, // We still use this for the mobile menu buttons
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Minimal text logo component
const CareerPathLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl tracking-wider whitespace-pre text-white font-logo"
      >
        Career Path
      </motion.span>
    </Link>
  );
};

export function PublicNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  const navItems: { name: string; link: string }[] = [];

  return (
    <Navbar className="bg-transparent sticky top-0 z-50">
      <NavBody>
        <CareerPathLogo />

        <NavItems items={navItems} />

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            // --- SIGNED IN (Desktop) ---
            <>
              {/* --- FIX: We use a Link styled as a button --- */}
              <Link
                href="/dashboard"
                className={cn(
                  // We manually add the button styles
                  "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2",
                  // Your custom styles
                  "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                Dashboard
              </Link>

              <div>
                <UserButton />
              </div>
            </>
          ) : (
            // --- SIGNED OUT (Desktop) ---
            <>
              {/* --- FIX: We use a Link styled as a button --- */}
              <Link
                href="/sign-in"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2",
                  "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                Sign In
              </Link>

              {/* --- FIX: We use a Link styled as a button --- */}
              <Link
                href="/sign-up"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2",
                  "border-white border text-white bg-transparent hover:bg-white/10"
                )}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </NavBody>

      {/* Mobile nav */}
      <MobileNav>
        <MobileNavHeader>
          <CareerPathLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}

          <div className="flex w-full flex-col gap-4 pt-4">
            {isSignedIn ? (
              // --- SIGNED IN (Mobile) ---
              <>
                {/* We can keep NavbarButton here because <Link> is the parent */}
                <Link href="/dashboard">
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    Dashboard
                  </NavbarButton>
                </Link>

                <div className="pl-2 pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              // --- SIGNED OUT (Mobile) ---
              <>
                {/* We can keep NavbarButton here because <Link> is the parent */}
                <Link href="/sign-in">
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    Sign In
                  </NavbarButton>
                </Link>

                <Link href="/sign-up">
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Get Started
                  </NavbarButton>
                </Link>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
