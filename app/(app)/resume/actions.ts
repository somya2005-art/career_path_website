"use server";

// This file contains server-side logic for fetching and saving resume data
// These functions run securely on the server, not in the client browser

import { auth, currentUser } from "@clerk/nextjs/server";
import { ResumeState } from "@/lib/types";
import prisma from "@/lib/prisma"; // Import our global prisma instance

// --- HELPER FUNCTION TO SYNC USER ---
/**
 * Ensures the currently authenticated Clerk user exists in our local database.
 * @returns The local database user ID.
 * @throws An error if the user is not authenticated.
 */
async function syncUser(): Promise<string> {
  const user = await currentUser(); // Get full user details from Clerk
  if (!user) {
    throw new Error("Not authenticated");
  }

  const userId = user.id;

  // 1. Check if user already exists in our DB
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  // 2. If not, create them
  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress ?? "", // Get primary email
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
    });
  }

  // 3. Return the user ID
  return userId;
}

// This is the shape of the data we'll return
// It's the same as our Prisma schema, but we ensure
// optional fields are null if not present.
const defaultResumeData: ResumeState = {
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
};

// Server Action to get the user's resume data
export async function getResumeData(): Promise<ResumeState> {
  try {
    const userId = await syncUser(); // <-- CALL THE HELPER FIRST

    const resume = await prisma.resume.findUnique({
      where: { userId },
      include: {
        workExperience: true, // Corrected name
        educations: true, // Corrected name
        projects: true, // NEW
        certifications: true, // NEW
        volunteerWork: true, // NEW
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
        // Ensure arrays are arrays even if empty
        workExperience: resume.workExperience || [],
        education: resume.educations || [], // Corrected name
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        volunteerWork: resume.volunteerWork || [],
      };
    }

    // If no resume, return the default empty state
    return defaultResumeData;
  } catch (error) {
    console.error("Error in getResumeData:", error);
    if ((error as Error).message === "Not authenticated") {
      throw new Error("You must be logged in to get resume data.");
    }
    // On error, return default state instead of throwing
    return defaultResumeData;
  }
}

// Server Action to save (create or update) the user's resume
export async function saveResumeData(
  resumeState: ResumeState
): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await syncUser(); // <-- CALL THE HELPER FIRST

    const {
      workExperience,
      education,
      projects,
      certifications,
      volunteerWork,
      ...resumeDetails
    } = resumeState;

    // Helper function to map data and remove IDs for creation
    // This prevents Prisma from trying to link to non-existent IDs
    const createData = (item: any) => {
      const { id, resumeId, ...data } = item;
      return data;
    };

    // Use prisma.upsert to create a new resume or update an existing one
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
        // This is simpler than trying to match IDs for the MVP
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
