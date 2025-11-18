"use client";

// This file is the "brain" of our resume builder.
// It holds the resume state and all the logic for updating it.

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  ResumeState,
  ResumeAction,
  WorkExperience,
  Education,
  Project,
  Certification,
  VolunteerWork,
} from "@/lib/types";
import cuid from "cuid";

// This is the default, empty state for a new resume
// --- THIS IS THE FIX ---
// Added userId, cachedJobFeed, and feedUpdatedAt to match the new ResumeState type
const initialResumeState: ResumeState = {
  userId: "", // Default empty string
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
  cachedJobFeed: [], // Default empty array
  feedUpdatedAt: null, // Default null
};
// --- END OF FIX ---

// --- The Reducer ---
// This function handles all state updates
function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case "SET_RESUME":
      // When loading, make sure we don't have nulls where arrays are expected
      return {
        ...initialResumeState, // Start with defaults
        ...action.payload, // Override with loaded data
        // Ensure arrays are arrays, not null
        skills: action.payload.skills || [],
        workExperience: action.payload.workExperience || [],
        education: action.payload.education || [],
        projects: action.payload.projects || [],
        certifications: action.payload.certifications || [],
        volunteerWork: action.payload.volunteerWork || [],
        cachedJobFeed: action.payload.cachedJobFeed || [],
      };

    case "UPDATE_PERSONAL_INFO":
      return { ...state, [action.payload.field]: action.payload.value };

    case "UPDATE_SUMMARY":
      return { ...state, summary: action.payload };

    case "SET_SKILLS":
      return { ...state, skills: action.payload };

    // --- Work Experience ---
    case "ADD_WORK_EXPERIENCE":
      return {
        ...state,
        workExperience: [...state.workExperience, action.payload],
      };
    case "UPDATE_WORK_EXPERIENCE":
      return {
        ...state,
        workExperience: state.workExperience.map((item, index) =>
          index === action.payload.index ? action.payload.data : item
        ),
      };
    case "REMOVE_WORK_EXPERIENCE":
      return {
        ...state,
        workExperience: state.workExperience.filter(
          (_, index) => index !== action.payload.index
        ),
      };

    // --- Education ---
    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload] };
    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((item, index) =>
          index === action.payload.index ? action.payload.data : item
        ),
      };
    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: state.education.filter(
          (_, index) => index !== action.payload.index
        ),
      };

    // --- Projects ---
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((item, index) =>
          index === action.payload.index ? action.payload.data : item
        ),
      };
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (_, index) => index !== action.payload.index
        ),
      };

    // --- Certifications ---
    case "ADD_CERTIFICATION":
      return {
        ...state,
        certifications: [...state.certifications, action.payload],
      };
    case "UPDATE_CERTIFICATION":
      return {
        ...state,
        certifications: state.certifications.map((item, index) =>
          index === action.payload.index ? action.payload.data : item
        ),
      };
    case "REMOVE_CERTIFICATION":
      return {
        ...state,
        certifications: state.certifications.filter(
          (_, index) => index !== action.payload.index
        ),
      };

    // --- Volunteer Work ---
    case "ADD_VOLUNTEER_WORK":
      return {
        ...state,
        volunteerWork: [...state.volunteerWork, action.payload],
      };
    case "UPDATE_VOLUNTEER_WORK":
      return {
        ...state,
        volunteerWork: state.volunteerWork.map((item, index) =>
          index === action.payload.index ? action.payload.data : item
        ),
      };
    case "REMOVE_VOLUNTEER_WORK":
      return {
        ...state,
        volunteerWork: state.volunteerWork.filter(
          (_, index) => index !== action.payload.index
        ),
      };

    default:
      return state;
  }
}

// --- Blank Item Creators ---
// These are used by the forms to add new, empty items to the list
// We use CUID to create a unique temporary ID for React's `key` prop

// All values are now "" (empty string) instead of placeholder text
export const createBlankWorkExperience = (): WorkExperience => ({
  id: cuid(),
  resumeId: "", // Will be set on save
  jobTitle: "",
  company: "",
  location: "",
  startDate: null,
  endDate: null,
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createBlankEducation = (): Education => ({
  id: cuid(),
  resumeId: "",
  school: "",
  degree: "",
  fieldOfStudy: "",
  startDate: null,
  endDate: null,
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createBlankProject = (): Project => ({
  id: cuid(),
  resumeId: "",
  name: "",
  description: "",
  url: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createBlankCertification = (): Certification => ({
  id: cuid(),
  resumeId: "",
  name: "",
  issuer: "",
  date: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createBlankVolunteerWork = (): VolunteerWork => ({
  id: cuid(),
  resumeId: "",
  organization: "",
  role: "",
  startDate: null,
  endDate: null,
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

// --- React Context Setup ---
type ResumeContextType = {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// The Provider component that wraps our page
export function ResumeContextProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: ResumeState;
}) {
  const [state, dispatch] = useReducer(resumeReducer, initialData);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

// The custom hook we use in components to access the state
export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error(
      "useResumeContext must be used within a ResumeContextProvider"
    );
  }
  return context;
}
