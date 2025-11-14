// This is the new "About" page.
// It will automatically use your `(public)/layout.tsx`

import { CheckCircle } from "lucide-react";

// A simple list item component
const FeatureListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-blue-500 shrink-0" />
    <span className="text-neutral-300">{children}</span>
  </li>
);

export default function AboutPage() {
  return (
    // We add padding-top to account for the transparent navbar
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 sm:py-32">
      <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl text-center">
        About Career Path
      </h1>
      <p className="max-w-3xl mx-auto mt-6 text-lg text-neutral-300 text-center">
        Our mission is to empower professionals by providing the tools and
        insights needed to navigate every step of their career journey with
        confidence.
      </p>

      <div className="mt-16 p-8 bg-black/10 dark:bg-white/5 backdrop-blur-sm border border-white/5 rounded-lg">
        <h2 className="text-3xl font-semibold text-white mb-6">What We Do</h2>
        <p className="text-neutral-300 mb-6">
          Finding a job is hard. The process is fragmented—you build a resume in
          one tool, search for jobs on another, and practice for interviews...
          somewhere else. Career Path was built to bring all of those essential
          tools under one roof, powered by cutting-edge AI.
        </p>

        <ul className="space-y-4">
          <FeatureListItem>
            Build a Professional Resume: Our 7-section builder helps you create
            a comprehensive, well-structured resume with a live preview.
          </FeatureListItem>
          <FeatureListItem>
            Analyze Your Match: Instantly compare your saved resume against any
            job description to get a match score, identify missing TESTS, and
            see your strengths.
          </FeatureListItem>
          <FeatureListItem>
            Chat with an AI Coach: Our Career Bot is available 24/7 to help you
            practice for interviews, explore new career paths, or refine your
            resume's bullet points.
          </FeatureListItem>
          <FeatureListItem>
            Find Opportunities: Our job portal connects you to real-time
            openings and lets you filter for exactly what you want, all in one
            place.
          </FeatureListItem>
        </ul>
      </div>
    </div>
  );
}
