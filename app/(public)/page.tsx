// app/(public)/page.tsx
"use client";

import TextType from "@/components/TextType";
import { SignUpButton, useUser, UserButton } from "@clerk/nextjs";
import { FileText, Search, Bot } from "lucide-react";
import { motion } from "motion/react";
import ShinyText from "@/components/ShinyText";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="flex flex-col items-center p-6 text-center rounded-lg shadow-md
                 bg-black/10 dark:bg-white/5 backdrop-blur-sm border border-white/5"
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 text-blue-600 bg-blue-100 rounded-full">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-neutral-300">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full relative">
      {/* Hero Section — leave space for transparent nav */}
      <section className="relative pt-28 pb-6 text-center">
        <div className="container px-4 mx-auto md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
              <TextType
                text={[
                  "Build resumes that stand out!",
                  "Land your dream job!",
                  "Ace every interview!",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
              />
            </div>

            <div className="max-w-2xl mx-auto mt-6 text-lg text-neutral-300">
              <ShinyText
                text="From crafting the perfect resume to acing the interview, Career Path is your all-in-one platform for professional success."
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </div>

            <div className="mt-10 flex justify-center">
              {isSignedIn ? (
                <Link href="/dashboard" aria-label="Go to dashboard">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="a"
                    className="dark:bg-black bg-white/10 text-white flex items-center px-6 py-3"
                  >
                    Go to Dashboard
                  </HoverBorderGradient>
                </Link>
              ) : (
                <SignUpButton mode="modal">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center px-6 py-3"
                  >
                    Get Started for Free
                  </HoverBorderGradient>
                </SignUpButton>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        <div className="container px-4 mx-auto md:px-6">
          <h2 className="mb-12 text-3xl font-bold text-center text-white">
            Your Complete Career Toolkit
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="AI Resume Builder"
              description="Create a professional, field-tested resume in minutes with our intuitive builder."
            />

            <FeatureCard
              icon={<Search className="w-6 h-6" />}
              title="Resume Analyzer"
              description="Get instant feedback and see how well your resume matches any job description."
            />

            <FeatureCard
              icon={<Bot className="w-6 h-6" />}
              title="Career Bot"
              description="Your personal AI career coach, ready 24/7 to answer questions and give advice."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
