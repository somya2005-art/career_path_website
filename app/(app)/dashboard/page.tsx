"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import { FileText, Search, Bot, Briefcase, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/* ----------------------------- UI Helpers ----------------------------- */

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

/* ----------------------------- Mock Data ----------------------------- */

const QUICK_ACTIONS = [
  {
    id: "resume",
    title: "Resume Builder",
    desc: "Create or edit your resume",
    icon: <FileText className="w-5 h-5" />,
    href: "/resume",
  },
  {
    id: "analyzer",
    title: "Resume Analyzer",
    desc: "Scan & improve your resume",
    icon: <Search className="w-5 h-5" />,
    href: "/analyzer",
  },
  {
    id: "bot",
    title: "Career Bot",
    desc: "Ask for tailored career advice",
    icon: <Bot className="w-5 h-5" />,
    href: "/chat",
  },
  {
    id: "jobs",
    title: "Job Portal",
    desc: "Browse & apply for jobs",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/jobs",
  },
];

const STATS = [
  { id: "score", label: "Resume Score", value: "82", sub: "AI rating" },
  { id: "matches", label: "Matches", value: "14", sub: "This week" },
  { id: "chats", label: "Bot Chats", value: "6", sub: "This week" },
  { id: "apps", label: "Applications", value: "3", sub: "Open roles" },
];

const JOBS_MOCK = [
  {
    job_id: "1",
    title: "Frontend Engineer",
    company: "Neon Labs",
    location: "Remote",
    score: 87,
  },
  {
    job_id: "2",
    title: "Data Analyst Intern",
    company: "Insights Co",
    location: "Bengaluru",
    score: 74,
  },
  {
    job_id: "3",
    title: "Product Designer",
    company: "Orbit",
    location: "Hybrid",
    score: 79,
  },

  // ⭐ Added jobs so it visually extends under Recent Activity
  {
    job_id: "4",
    title: "Backend Engineer",
    company: "Aether Systems",
    location: "Remote",
    score: 82,
  },
  {
    job_id: "5",
    title: "Machine Learning Intern",
    company: "DeepVision",
    location: "Hyderabad",
    score: 76,
  },
];

const ACTIVITY = [
  {
    id: 1,
    text: "Analyzed resume for 'Frontend Engineer' — score improved to 82",
    time: "2 hours ago",
  },
  {
    id: 2,
    text: "Saved job: Frontend Engineer at Neon Labs",
    time: "1 day ago",
  },
];

const TIPS = [
  "Quantify your achievements — numbers catch attention.",
  "Tailor your resume for each role — keywords matter.",
  "Keep bullets short and impact-focused.",
  "Use active verbs: implemented, shipped, reduced, improved.",
  "Prepare STAR method stories for behavioral questions.",
];

/* ----------------------------- Dashboard ----------------------------- */

export default function DashboardPage() {
  const { user } = useUser();
  const username = user?.firstName || user?.fullName || "User";

  const [tipIndex, setTipIndex] = useState(0);
  const tip = TIPS[tipIndex];

  return (
    <div className="h-full flex flex-col gap-4 max-w-6xl mx-auto px-6 py-2">
      {/* Header — simplified */}
      <div>
        <h2 className="text-3xl font-extrabold text-white">
          Welcome back, <span className="text-purple-400">{username}</span>!
        </h2>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Quick Actions */}
          <GlassCard>
            <h3 className="text-sm text-neutral-300 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_ACTIONS.map((a) => (
                <Link
                  key={a.id}
                  href={a.href}
                  className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition flex flex-col gap-2"
                >
                  <div className="w-10 h-5 rounded-lg bg-linear-to-br from-purple-600/20 to-transparent flex items-center justify-center text-purple-300">
                    {a.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {a.title}
                    </div>
                    <div className="text-xs text-neutral-400">{a.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </GlassCard>

          {/* Stats */}
          <GlassCard>
            <h3 className="text-sm text-neutral-300 mb-4">Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.id}
                  className="p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="text-xs text-neutral-400">{s.label}</div>
                  <div className="text-2xl font-semibold text-white mt-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT SIDE */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {/* Career Tips */}
          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm text-neutral-300">Career Tip</h4>
              <div className="text-xs text-neutral-500">
                {tipIndex + 1}/{TIPS.length}
              </div>
            </div>

            <motion.div
              key={tipIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-sm"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {`- ${tip}`}
              </ReactMarkdown>
            </motion.div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() =>
                  setTipIndex((i) => (i - 1 + TIPS.length) % TIPS.length)
                }
                className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300"
              >
                Prev
              </button>

              <button
                onClick={() => setTipIndex((i) => (i + 1) % TIPS.length)}
                className="px-3 py-1 rounded-md bg-purple-400 text-black text-xs"
              >
                Next
              </button>
            </div>
          </GlassCard>

          {/* Recent Activity */}
          <GlassCard>
            <h4 className="text-sm text-neutral-300 mb-3">Recent Activity</h4>

            <div className="flex flex-col gap-3">
              {ACTIVITY.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-neutral-800 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-neutral-300" />
                  </div>
                  <div>
                    <div className="text-sm text-white">{a.text}</div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {a.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </aside>
        {/* Recommended Jobs */}
        <div className="lg:col-span-12 mt-0">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-neutral-300">Recommended Jobs</h3>
              <Link href="/jobs" className="text-xs text-purple-300">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {JOBS_MOCK.map((job) => (
                <div
                  key={job.job_id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {job.title}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {job.company} • {job.location}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-purple-300">
                    {job.score}% Match
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/jobs/${job.job_id}`}
                      className="text-xs px-3 py-1 rounded-md bg-purple-400 text-black"
                    >
                      View
                    </Link>
                    <button className="text-xs px-3 py-1 rounded-md border border-white/10 text-white">
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
