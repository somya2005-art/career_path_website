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
      aria-label="Career Path home"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-logo text-3xl tracking-wider whitespace-pre text-white [text-shadow:_0_0_8px_rgba(255,255,255,0.35)]"
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

  /**
   * Professional glassmorphic button style:
   * - subtle translucency and blur
   * - thin soft border
   * - small drop shadow for depth
   * - accessible focus ring
   * - smooth hover with slightly increased contrast
   */
  const glassButton =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 " +
    "backdrop-blur-sm bg-white/6 border border-white/10 " +
    "shadow-sm transition-colors duration-150 ease-in-out " +
    "text-white hover:bg-white/10 hover:backdrop-brightness-95 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2";

  // Mobile variant (full width)
  const mobileGlassButton = "w-full " + glassButton + " justify-center";

  return (
    <Navbar className="bg-transparent sticky top-0 z-50">
      <NavBody>
        <CareerPathLogo />

        <NavItems items={navItems} />

        <div className="relative z-20 flex items-center gap-3">
          {/* ABOUT (desktop) */}
          <Link
            href="/about"
            className={cn(glassButton)}
            aria-label="About page"
          >
            About
          </Link>

          {isSignedIn ? (
            <>
              {/* DASHBOARD (desktop) */}
              <Link
                href="/dashboard"
                className={cn(glassButton)}
                aria-label="Go to dashboard"
              >
                Dashboard
              </Link>

              <div>
                <UserButton />
              </div>
            </>
          ) : (
            <>
              {/* SIGN IN (desktop) */}
              <Link
                href="/sign-in"
                className={cn(glassButton)}
                aria-label="Sign in"
              >
                Sign In
              </Link>

              {/* GET STARTED (desktop) */}
              <Link
                href="/sign-up"
                className={cn(glassButton)}
                aria-label="Get started"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </NavBody>

      {/* MOBILE nav */}
      <MobileNav>
        <MobileNavHeader>
          <CareerPathLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {/* Mobile About (full-width) */}
          <Link href="/about">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className={mobileGlassButton}
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
                    className={mobileGlassButton}
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
                    className={mobileGlassButton}
                  >
                    Sign In
                  </NavbarButton>
                </Link>

                <Link href="/sign-up">
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className={mobileGlassButton}
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
