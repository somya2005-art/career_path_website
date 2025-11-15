"use server";

import { syncUser } from "@/lib/user";
import prisma from "@/lib/prisma";
import { getResumeData } from "../resume/actions";
import { JobListing, searchJobs, SearchFilters } from "../jobs/actions"; // Import from jobs actions
import { Groq } from "groq-sdk";
import { ResumeState } from "@/lib/types"; // Import ResumeState

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Type definition for our dashboard data
export type DashboardData = {
  welcomeName: string;
  aiResumeTip: string | null;
  jobFeed: JobListing[];
  jobFeedError: string | null;
  chatHistory: { role: string; content: string } | null;
};

/**
 * This is the main server action for the dashboard.
 * It fetches all data in one go.
 */
export async function getDashboardData(): Promise<DashboardData> {
  try {
    const user = await syncUser();
    const resume = await getResumeData();

    // Run all fetches in parallel
    const [aiResumeTip, jobData, chatHistory] = await Promise.all([
      getAiResumeTip(resume),
      getJobFeed(resume),
      getRecentChat(user.id),
    ]);

    const welcomeName = user?.firstName || user?.email.split("@")[0] || "User";

    return {
      welcomeName,
      aiResumeTip,
      jobFeed: jobData.jobs || [],
      jobFeedError: jobData.error || null,
      chatHistory,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      welcomeName: "User",
      aiResumeTip: null,
      jobFeed: [],
      jobFeedError: "Could not load dashboard data.",
      chatHistory: null,
    };
  }
}

/**
 * Generates one quick, scannable tip for the resume.
 */
async function getAiResumeTip(
  resume: ResumeState // Use the imported ResumeState
): Promise<string | null> {
  if (resume.summary.trim() === "") {
    return "Your Professional Summary is empty. A strong summary is key to grabbing a recruiter's attention.";
  }
  if (resume.workExperience.length === 0) {
    return "You haven't added any Work Experience. This is the most critical part of your resume.";
  }
  if (resume.skills.length < 5) {
    return "Your Skills section is looking a bit light. Try to add at least 5-10 relevant skills.";
  }

  // If the resume is decent, ask Groq for one tip
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert resume reviewer. You will be given a user's resume summary and their latest job title. Your task is to provide a *single*, short (25 words max), actionable tip for improvement. Be encouraging. Do not greet the user.`,
        },
        {
          role: "user",
          content: `Summary: ${resume.summary}\nLatest Job: ${resume.workExperience[0]?.jobTitle}`,
        },
      ],
      model: "openai/gpt-oss-120b",
      temperature: 0.5,
    });

    return chatCompletion.choices[0]?.message?.content || null;
  } catch (error) {
    console.error("Groq AI tip error:", error);
    return null;
  }
}

/**
 * Gets the "Job Feed" using the caching logic you suggested.
 */
async function getJobFeed(
  resume: ResumeState // Use the imported ResumeState
): Promise<{ jobs?: JobListing[]; error?: string }> {
  // 1. Check for cached data
  const now = new Date();
  if (resume.feedUpdatedAt) {
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    // If cache is fresh (less than 24h old), return it.
    if (resume.feedUpdatedAt > twentyFourHoursAgo && resume.cachedJobFeed) {
      return { jobs: resume.cachedJobFeed as JobListing[] };
    }
  }

  // 2. If cache is stale or empty, fetch new jobs
  const query = resume.workExperience[0]?.jobTitle || "Software Engineer";

  const filters: SearchFilters = {
    query: query,
    location: "India", // You can change this default
    date_posted: "week",
    work_from_home: false,
    employment_types: "FULLTIME",
  };

  const searchResult = await searchJobs(filters);

  if (!searchResult.success || !searchResult.data) {
    return { error: searchResult.error || "Failed to fetch jobs." };
  }

  // 3. Save the new feed and timestamp to the database
  try {
    await prisma.resume.update({
      where: { userId: resume.userId },
      data: {
        cachedJobFeed: searchResult.data.slice(0, 5) as any, // Cache only 5 jobs
        feedUpdatedAt: now,
      },
    });
  } catch (error) {
    console.error("Failed to cache job feed:", error);
    // Non-critical error, just log it.
  }

  return { jobs: searchResult.data.slice(0, 5) };
}

/**
 * Gets the last message from the Career Bot
 */
async function getRecentChat(
  userId: string
): Promise<{ role: string; content: string } | null> {
  const lastMessage = await prisma.chatMessage.findFirst({
    where: { userId: userId, role: "model" },
    orderBy: { createdAt: "desc" },
  });

  if (lastMessage) {
    return { role: "model", content: lastMessage.content };
  }
  return null;
}
