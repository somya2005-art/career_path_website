"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { ResumeState, ResumeAction } from "@/lib/types";

// --- 1. Define the Reducer ---
// This function handles all state updates
function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case "SET_RESUME":
      return action.payload;

    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case "UPDATE_SUMMARY":
      return { ...state, summary: action.payload };

    case "SET_SKILLS":
      return { ...state, skills: action.payload };

    // --- Experience Reducers ---
    case "ADD_EXPERIENCE":
      return { ...state, experience: [...state.experience, action.payload] };

    case "UPDATE_EXPERIENCE":
      const newExperience = [...state.experience];
      newExperience[action.payload.index] = action.payload.data;
      return { ...state, experience: newExperience };

    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter(
          (_, i) => i !== action.payload.index
        ),
      };

    // --- Education Reducers ---
    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload] };

    case "UPDATE_EDUCATION":
      const newEducation = [...state.education];
      newEducation[action.payload.index] = action.payload.data;
      return { ...state, education: newEducation };

    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((_, i) => i !== action.payload.index),
      };

    default:
      return state;
  }
}

// --- 2. Define the Context ---
type ResumeContextType = {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
};

// Create the context with a default undefined value
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// --- 3. Define the Provider Component ---
type ResumeProviderProps = {
  children: ReactNode;
  initialData: ResumeState; // Data fetched from the server
};

export function ResumeContextProvider({
  children,
  initialData,
}: ResumeProviderProps) {
  // Initialize the reducer with the server-fetched data
  const [state, dispatch] = useReducer(resumeReducer, initialData);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

// --- 4. Create a Custom Hook ---
// This hook makes it easy for components to access the context
export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error(
      "useResumeContext must be used within a ResumeContextProvider"
    );
  }
  return context;
}
