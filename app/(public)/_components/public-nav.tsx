import {
  SignInButton,
  SignUpButton, // Import SignUpButton
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Orbit } from "lucide-react";
import Link from "next/link";

// This is the public-facing navbar
// It shows different actions based on auth state
export function PublicNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur filter:bg-background/60">
      <div className="container h-16 max-w-screen-2xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Orbit className="h-6 w-6" />
          <span>Career Path</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            {/* Updated Sign In button to be a modal */}
            <SignInButton mode="modal">
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            {/* Corrected to use SignUpButton */}
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button asChild>
              <Link href="/app/dashboard">Go to Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
