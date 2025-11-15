"use server";

// This file contains server-side logic for fetching and saving resume data

import { ResumeState } from "@/lib/types";
import prisma from "@/lib/prisma"; // Import our global prisma instance
import { syncUser } from "@/lib/user"; // Import our shared user function

// This is the shape of the data we'll return
// It's the same as our Prisma schema, but we ensure
// optional fields are null if not present.
const defaultResumeData: ResumeState = {
  userId: "", // Will be filled
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  skills: [],
  workExperience: [],
  education: [],
  projects: [],
  certifications: [],
  volunteerWork: [],
  cachedJobFeed: [], // <-- ADDED
  feedUpdatedAt: null, // <-- ADDED
};

// Server Action to get the user's resume data
export async function getResumeData(): Promise<ResumeState> {
  let userId: string;
  try {
    const user = await syncUser(); // <-- CALL THE SHARED HELPER
    userId = user.id;
  } catch (error) {
    console.error("Error in getResumeData (auth):", error);
    if ((error as Error).message === "Not authenticated") {
      throw new Error("You must be logged in to get resume data.");
    }
    // If auth fails for some other reason, return a default state
    // with a (non-existent) userId to prevent further errors
    return { ...defaultResumeData, userId: "error-user-id" };
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { userId },
      include: {
        workExperience: true,
        educations: true,
        projects: true,
        certifications: true,
        volunteerWork: true,
        // We don't need to "include" cachedJobFeed as it's a JSON field
      },
    });

    if (resume) {
      // If resume exists, format it to match our ResumeState
      return {
        ...defaultResumeData,
        ...resume,
        userId: resume.userId,
        fullName: resume.fullName || "",
        email: resume.email || "",
        phone: resume.phone || "",
        location: resume.location || "",
        website: resume.website || "",
        summary: resume.summary || "",
        workExperience: resume.workExperience || [],
        education: resume.educations || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        volunteerWork: resume.volunteerWork || [],
        // --- THIS IS THE FIX ---
        // Ensure the new fields are explicitly returned
        cachedJobFeed: (resume.cachedJobFeed as any[]) || [],
        feedUpdatedAt: resume.feedUpdatedAt || null,
        // --- END OF FIX ---
      };
    }

    // If no resume, return the default empty state with the correct userId
    return { ...defaultResumeData, userId: userId };
  } catch (error) {
    console.error("Error in getResumeData (fetch):", error);
    return { ...defaultResumeData, userId: userId };
  }
}

// Server Action to save (create or update) the user's resume
export async function saveResumeData(
  resumeState: ResumeState
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await syncUser(); // <-- CALL THE SHARED HELPER
    const userId = user.id;

    const {
      workExperience,
      education,
      projects,
      certifications,
      volunteerWork,
      // We destructure the cache fields so they DON'T get saved
      // by this function, as only the dashboard should update them
      cachedJobFeed,
      feedUpdatedAt,
      ...resumeDetails
    } = resumeState;

    const createData = (item: any) => {
      const { id, resumeId, ...data } = item;
      return data;
    };

    await prisma.resume.upsert({
      where: { userId },
      // Create a new resume if one doesn't exist
      create: {
        ...resumeDetails,
        userId,
        workExperience: { create: workExperience.map(createData) },
        educations: { create: education.map(createData) },
        projects: { create: projects.map(createData) },
        certifications: { create: certifications.map(createData) },
        volunteerWork: { create: volunteerWork.map(createData) },
      },
      // Update the existing resume
      update: {
        ...resumeDetails,
        // For updates, we delete old entries and create new ones
        workExperience: {
          deleteMany: {}, // Delete all old
          create: workExperience.map(createData), // Create new
        },
        educations: {
          deleteMany: {},
          create: education.map(createData),
        },
        projects: {
          deleteMany: {},
          create: projects.map(createData),
        },
        certifications: {
          deleteMany: {},
          create: certifications.map(createData),
        },
        volunteerWork: {
          deleteMany: {},
          create: volunteerWork.map(createData),
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving resume data:", error);
    if ((error as Error).message === "Not authenticated") {
      return { success: false, error: "Not authenticated" };
    }
    return { success: false, error: "Failed to save resume." };
  }
}
