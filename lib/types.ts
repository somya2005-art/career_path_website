// Based on our Prisma Schema, but with client-side types
// We'll use this for our React Context state

export type WorkExperience = {
  id: string;
  jobTitle: string;
  company: string;
  location?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  description?: string | null;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  description?: string | null;
};

// This is the main state for our Resume Context
export type ResumeState = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
};

// This defines the actions we can dispatch to our reducer
// e.g., dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { ... } })
export type ResumeAction =
  | { type: "SET_RESUME"; payload: ResumeState }
  | {
      type: "UPDATE_PERSONAL_INFO";
      payload: { field: keyof ResumeState; value: string };
    }
  | { type: "UPDATE_SUMMARY"; payload: string }
  | { type: "SET_SKILLS"; payload: string[] }
  | { type: "ADD_EXPERIENCE"; payload: WorkExperience }
  | {
      type: "UPDATE_EXPERIENCE";
      payload: { index: number; data: WorkExperience };
    }
  | { type: "REMOVE_EXPERIENCE"; payload: { index: number } }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: { index: number; data: Education } }
  | { type: "REMOVE_EDUCATION"; payload: { index: number } };
