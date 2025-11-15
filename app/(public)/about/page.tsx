"use client";

import {
  CheckCircle,
  Target,
  Sparkles,
  Rocket,
  Bot,
  FileText,
  Briefcase,
  Search,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
// --- 1. IMPORT THE NEW COMPONENTS ---
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

// Glass card
const GlassCard = ({ children, className = "" }: any) => (
  <div
    className={cn(
      "bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md",
      "transition hover:scale-[1.01] hover:bg-white/10",
      className
    )}
  >
    {children}
  </div>
);

// Feature item with icon
const FeatureItem = ({ icon, title, desc }: any) => (
  <GlassCard>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-neutral-300 mt-2">{desc}</p>
      </div>
    </div>
  </GlassCard>
);

// Checklist list item
const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
    <span className="text-neutral-300">{children}</span>
  </li>
);

export default function AboutPage() {
  return (
    // We add pt-16 to push content below the sticky navbar
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* --- 2. THIS IS THE FIX --- */}
      {/* We wrap the H1 and P tags in the new HeroHighlight component */}
      <HeroHighlight
        containerClassName="bg-transparent" // Make the container transparent
      >
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-5xl font-extrabold text-white"
        >
          About <Highlight>Career Path</Highlight>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mt-6 text-center text-lg text-neutral-300"
        >
          A next-generation career platform designed to help you build, refine,
          and accelerate your professional journey — powered by cutting-edge AI.
        </motion.p>
      </HeroHighlight>
      {/* --- END OF FIX --- */}

      {/* ---------------- MISSION SECTION ---------------- */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <GlassCard className="p-10">
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-neutral-300 leading-relaxed">
            Career Path exists for one purpose: to empower individuals with the
            tools, insights, and confidence they need to navigate the job market
            with clarity.
          </p>

          <ul className="space-y-3 mt-6">
            <ListItem>Transparent, data-driven resume insights</ListItem>
            <ListItem>Personalized career guidance available 24/7</ListItem>
            <ListItem>
              Real-time job opportunities tailored to your profile
            </ListItem>
            <ListItem>
              A modern platform designed for students & professionals
            </ListItem>
          </ul>
        </GlassCard>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Why Career Path Exists
            </h3>
            <p className="text-neutral-300">
              Job hunting is fragmented. Resume building happens in one place,
              analysis in another, job search in another. We unify everything —
              powered by intelligent automation.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Our Vision
            </h3>
            <p className="text-neutral-300">
              A world where every individual has access to personalized,
              high-quality career guidance — regardless of background or
              experience.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* ---------------- FEATURE CARDS ---------------- */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-white text-center">
          What Career Path Offers
        </h2>
        <p className="text-neutral-300 text-center mt-3 max-w-2xl mx-auto">
          Everything you need in your career toolkit — unified, intelligent, and
          easy to use.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <FeatureItem
            icon={<FileText className="w-6 h-6" />}
            title="Resume Builder"
            desc="Craft a professional, structured resume using our guided 7-section builder."
          />
          <FeatureItem
            icon={<Search className="w-6 h-6" />}
            title="Resume Analyzer"
            desc="Compare your resume with any job posting. See match scores & missing skills instantly."
          />
          <FeatureItem
            icon={<Bot className="w-6 h-6" />}
            title="AI Career Bot"
            desc="A 24/7 personal career assistant to help prepare for interviews and refine your resume."
          />
          <FeatureItem
            icon={<Briefcase className="w-6 h-6" />}
            title="Smart Job Portal"
            desc="Discover real-time openings with intelligent filtering and role-based suggestions."
          />
          <FeatureItem
            icon={<Rocket className="w-6 h-6" />}
            title="Career Acceleration"
            desc="Get personalized insights to push your skills, strategy, and confidence forward."
          />
          <FeatureItem
            icon={<Sparkles className="w-6 h-6" />}
            title="Designed for Students"
            desc="Built with simplicity & clarity so students can focus on progress, not complexity."
          />
        </div>
      </div>

      {/* ---------------- TIMELINE SECTION ---------------- */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Your Journey With Career Path
        </h2>
        <p className="text-neutral-300 text-center max-w-2xl mx-auto">
          We support you at every stage of your career development.
        </p>

        <div className="mt-12 space-y-8 border-l border-white/10 pl-8">
          <div>
            <h3 className="text-xl font-semibold text-white">
              1. Build Your Foundation
            </h3>
            <p className="text-neutral-300 mt-2">
              Start with a beautifully structured resume tailored to your field.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              2. Improve Your Match
            </h3>
            <p className="text-neutral-300 mt-2">
              Use analysis tools to align your experience with job requirements.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              3. Explore Opportunities
            </h3>
            <p className="text-neutral-300 mt-2">
              Browse curated job listings and discover roles that fit your
              profile.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              4. Enhance Your Confidence
            </h3>
            <p className="text-neutral-300 mt-2">
              Practice interviews and refine your communication with our AI
              coach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
