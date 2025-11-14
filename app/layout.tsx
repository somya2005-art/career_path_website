import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", // Bebas Neue usually only has one weight
  variable: "--font-bebas-neue", // Define as a CSS variable
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
            bebas_neue.variable,
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
