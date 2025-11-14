"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo, // We'll keep the import but replace the component
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils"; // Import cn

// 1. --- THIS IS THE FIX ---
// I have removed the SVG icon, leaving only the text.
const CareerPathLogo = () => {
  return (
    <Link
      href="/" // Links to the landing page
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      {/* The SVG icon has been removed. */}

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // Use the CSS variable for the font
        className="font-['var(--font-bebas-neue)'] text-2xl tracking-wider whitespace-pre text-white"
      >
        Career Path
      </motion.span>
    </Link>
  );
};

// 2. This is our new PublicNav, using the Resizable Navbar
export function PublicNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // We have no items for now
  const navItems: { name: string; link: string }[] = [];

  return (
    <Navbar
      // We make the navbar transparent
      className="bg-transparent sticky"
    >
      {/* --- Desktop Navigation --- */}
      <NavBody>
        {/* Use our custom logo */}
        <CareerPathLogo />

        <NavItems items={navItems} />

        {/* --- 2. THIS IS THE FIX --- */}
        {/* We add our custom dark-mode classes to the buttons */}
        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <NavbarButton
              variant="secondary" // "secondary" is the ghost/un-styled one
              className="text-white hover:bg-white/10 hover:text-white"
            >
              Sign In
            </NavbarButton>
          </SignInButton>
          <SignUpButton mode="modal">
            <NavbarButton
              variant="primary" // "primary" is the main one
              className="border-white border text-white bg-transparent hover:bg-white hover:text-black"
            >
              Get Started
            </NavbarButton>
          </SignUpButton>
        </div>
      </NavBody>

      {/* --- Mobile Navigation --- */}
      <MobileNav>
        <MobileNavHeader>
          {/* Use our custom logo */}
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
          {/* Mobile nav links (if you add any) */}
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

          {/* Replaced dummy buttons with Clerk buttons */}
          <div className="flex w-full flex-col gap-4 pt-4">
            <SignInButton mode="modal">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Sign In
              </NavbarButton>
            </SignInButton>
            <SignUpButton mode="modal">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </SignUpButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
