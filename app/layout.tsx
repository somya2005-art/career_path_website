import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // Get a regular and bold weight
  variable: "--font-outfit", // Define as a CSS variable
});

export const metadata: Metadata = {
  title: "Career Path",
  description: "Your complete career workbench.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/" appearance={{ theme: neobrutalism }}>
      <html lang="en" className="dark">
        <body
          className={cn(
            inter.className,
            outfit.variable,
            "antialiased overflow-x-hidden",
            "bg-white dark:bg-neutral-900"
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
