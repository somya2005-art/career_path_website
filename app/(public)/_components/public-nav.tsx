"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// --- LOGO COMPONENT ---
const CareerPathLogo = () => {
  return (
    <Link
      href="/"
      className="relative flex items-center py-1 text-sm font-normal text-white z-10"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-logo text-3xl tracking-wider whitespace-pre text-white [text-shadow:_0_0_12px_rgba(255,255,255,0.5)]"
      >
        Career Path
      </motion.span>
    </Link>
  );
};

export function PublicNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  // No nav items needed anymore since About is moved
  const navItems: { name: string; link: string }[] = [];

  return (
    <Navbar className="bg-transparent sticky top-0 z-50">
      <NavBody>
        <CareerPathLogo />

        <NavItems items={navItems} />

        <div className="relative z-20 flex items-center gap-3">
          {/* --- About Button (Glassmorphic) --- */}
          <Link
            href="/about"
            className={cn(
              "inline-flex items-center justify-center rounded-xl text-sm font-medium h-10 px-4 py-2",
              "backdrop-blur-md border border-white/20 bg-white/10",
              "text-white shadow-[0_0_12px_rgba(255,255,255,0.35)] hover:bg-white/20 transition"
            )}
          >
            About
          </Link>

          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2",
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
            <>
              <Link
                href="/sign-in"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2",
                  "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                Sign In
              </Link>

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
          {/* Mobile About Button */}
          <Link href="/about">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full"
            >
              About
            </NavbarButton>
          </Link>

          <div className="flex w-full flex-col gap-4 pt-4">
            {isSignedIn ? (
              <>
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
              <>
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
