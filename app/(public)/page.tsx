// app/(public)/page.tsx or LandingPage.tsx
"use client";

import TextType from "@/components/TextType";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { FileText, Search, Bot } from "lucide-react";
import { motion } from "motion/react";
import ShinyText from "@/components/ShinyText";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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
    // This styling is great, it will create a "glassmorphism" effect
    <div
      className="flex flex-col items-center p-6 text-center rounded-lg shadow-md
                 bg-black/10 dark:bg-white/5 backdrop-blur-sm border border-white/5"
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 text-blue-600 bg-blue-100 rounded-full">
        {icon}
      </div>
      {/* --- FIX: Removed text-black --- */}
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      {/* --- FIX: Removed text-black/80 --- */}
      <p className="text-neutral-300">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section — keep spacing for transparent navbar */}
      <section className="relative pt-32 pb-2 text-center">
        {" "}
        {/* Increased pb for spacing */}
        <div className="container px-4 mx-auto md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* --- FIX: Removed text-black --- */}
            <div className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white text-fg-brand/60 text-shadow-md">
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
            {/* --- FIX: Removed text-black/80 --- */}
            <div className="max-w-2xl mx-auto mt-6 text-lg text-neutral-300 text-shadow-lg">
              <ShinyText
                text="From crafting the perfect resume to acing the interview, Career Path is your all-in-one platform for professional success."
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </div>

            <div className="mt-10 flex justify-center">
              <SignUpButton mode="modal">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-black text-white dark:text-white flex items-center"
                >
                  Get Started for Free
                </HoverBorderGradient>
              </SignUpButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        {" "}
        {/* Increased py */}
        <div className="container px-4 mx-auto md:px-6">
          {/* --- FIX: Removed text-black --- */}
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
