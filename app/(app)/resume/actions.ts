"use server";

// This file contains server-side logic for fetching and saving resume data
// These functions run securely on the server, not in the client browser

import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { ResumeState } from "@/lib/types";

const prisma = new PrismaClient();

// This is the shape of the data we'll return
// It's the same as our Prisma schema, but we ensure
// optional fields are null if not present.
const defaultResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  skills: [],
  experience: [],
  education: [],
};

// Server Action to get the user's resume data
export async function getResumeData(): Promise<ResumeState> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be logged in to get resume data.");
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { userId },
      include: {
        experience: true, // Include related work experience
        education: true, // Include related education
      },
    });

    if (resume) {
      // If resume exists, format it to match our ResumeState
      // We do this to ensure all fields are present, even if null
      return {
        ...defaultResumeData,
        ...resume,
        fullName: resume.fullName || "",
        email: resume.email || "",
        phone: resume.phone || "",
        location: resume.location || "",
        website: resume.website || "",
        summary: resume.summary || "",
        // Ensure experience/education are arrays even if empty
        experience: resume.experience || [],
        education: resume.education || [],
      };
    }

    // If no resume, return the default empty state
    return defaultResumeData;
  } catch (error) {
    console.error("Error fetching resume data:", error);
    // On error, return default state instead of throwing
    return defaultResumeData;
  }
}

// Server Action to save (create or update) the user's resume
export async function saveResumeData(
  resumeState: ResumeState
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const { experience, education, ...resumeDetails } = resumeState;

  try {
    // Use prisma.upsert to create a new resume or update an existing one
    await prisma.resume.upsert({
      where: { userId },
      // Create a new resume if one doesn't exist
      create: {
        ...resumeDetails,
        userId,
        experience: {
          create: experience.map((exp) => ({ ...exp, id: undefined })), // Create new exp entries
        },
        education: {
          create: education.map((edu) => ({ ...edu, id: undefined })), // Create new edu entries
        },
      },
      // Update the existing resume
      update: {
        ...resumeDetails,
        // For updates, we need to delete old entries and create new ones
        // This is simpler than trying to match IDs for the MVP
        experience: {
          deleteMany: {}, // Delete all old experience
          create: experience.map((exp) => ({ ...exp, id: undefined })), // Create new ones
        },
        education: {
          deleteMany: {}, // Delete all old education
          create: education.map((edu) => ({ ...edu, id: undefined })), // Create new ones
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving resume data:", error);
    return { success: false, error: "Failed to save resume." };
  }
}
