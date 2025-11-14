"use server";

// This file contains server-side logic for fetching and saving resume data

import { ResumeState } from "@/lib/types";
import prisma from "@/lib/prisma"; // Import our global prisma instance
import { syncUser } from "@/lib/user"; // --- IMPORT THE NEW SHARED FUNCTION ---

// --- We have REMOVED the old syncUser function from this file ---

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
    const user = await syncUser(); // <-- CALL THE SHARED HELPER
    const userId = user.id;

    const resume = await prisma.resume.findUnique({
      where: { userId },
      include: {
        workExperience: true,
        educations: true,
        projects: true,
        certifications: true,
        volunteerWork: true,
      },
    });

    if (resume) {
      return {
        ...defaultResumeData,
        ...resume,
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
      };
    }

    return defaultResumeData;
  } catch (error) {
    console.error("Error in getResumeData:", error);
    if ((error as Error).message === "Not authenticated") {
      throw new Error("You must be logged in to get resume data.");
    }
    return defaultResumeData;
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
      ...resumeDetails
    } = resumeState;

    const createData = (item: any) => {
      const { id, resumeId, ...data } = item;
      return data;
    };

    await prisma.resume.upsert({
      where: { userId },
      create: {
        ...resumeDetails,
        userId,
        workExperience: { create: workExperience.map(createData) },
        educations: { create: education.map(createData) },
        projects: { create: projects.map(createData) },
        certifications: { create: certifications.map(createData) },
        volunteerWork: { create: volunteerWork.map(createData) },
      },
      update: {
        ...resumeDetails,
        workExperience: {
          deleteMany: {},
          create: workExperience.map(createData),
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
