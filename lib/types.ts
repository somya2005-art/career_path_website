// Based on our Prisma Schema, but with client-side types
// We'll use this for our React Context state
import {
  WorkExperience,
  Education,
  Project,
  Certification,
  VolunteerWork,
} from "@prisma/client";

// --- THIS IS THE JSEARCH DATA STRUCTURE ---
// We've moved it here to be sharable
export interface JobListing {
  job_id: string;
  employer_name: string;
  job_title: string;
  job_country: string | null;
  job_city: string | null;
  job_apply_link: string | null;
  job_description: string;
  job_employment_type: string | null;
  job_is_remote: boolean;
  job_posted_at: string | null;
  job_posted_at_timestamp: number | null;
}

// Re-export these types from Prisma
export type {
  WorkExperience,
  Education,
  Project,
  Certification,
  VolunteerWork,
};

// This is the main state for our Resume Context
export type ResumeState = {
  // We need to add all fields from the Prisma model
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  volunteerWork: VolunteerWork[];

  // --- THIS IS THE FIX ---
  // Add the new cache fields
  cachedJobFeed: JobListing[];
  feedUpdatedAt: Date | null;
  // --- END OF FIX ---
};

// This defines the actions we can dispatch to our reducer
export type ResumeAction =
  | { type: "SET_RESUME"; payload: ResumeState }
  | {
      type: "UPDATE_PERSONAL_INFO";
      payload: { field: keyof ResumeState; value: string };
    }
  | { type: "UPDATE_SUMMARY"; payload: string }
  | { type: "SET_SKILLS"; payload: string[] }
  // Work Experience
  | { type: "ADD_WORK_EXPERIENCE"; payload: WorkExperience }
  | {
      type: "UPDATE_WORK_EXPERIENCE";
      payload: { index: number; data: WorkExperience };
    }
  | { type: "REMOVE_WORK_EXPERIENCE"; payload: { index: number } }
  // Education
  | { type: "ADD_EDUCATION"; payload: Education }
  | {
      type: "UPDATE_EDUCATION";
      payload: { index: number; data: Education };
    }
  | { type: "REMOVE_EDUCATION"; payload: { index: number } }
  // Project
  | { type: "ADD_PROJECT"; payload: Project }
  | {
      type: "UPDATE_PROJECT";
      payload: { index: number; data: Project };
    }
  | { type: "REMOVE_PROJECT"; payload: { index: number } }
  // Certification
  | { type: "ADD_CERTIFICATION"; payload: Certification }
  | {
      type: "UPDATE_CERTIFICATION";
      payload: { index: number; data: Certification };
    }
  | { type: "REMOVE_CERTIFICATION"; payload: { index: number } }
  // Volunteer Work
  | { type: "ADD_VOLUNTEER_WORK"; payload: VolunteerWork }
  | {
      type: "UPDATE_VOLUNTEER_WORK";
      payload: { index: number; data: VolunteerWork };
    }
  | { type: "REMOVE_VOLUNTEER_WORK"; payload: { index: number } };
