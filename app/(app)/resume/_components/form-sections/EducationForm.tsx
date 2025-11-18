"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useResumeContext,
  createBlankEducation, // --- IMPORT THIS HELPER ---
} from "../ResumeContextProvider";
import { EducationItem } from "./EducationItem";

// We no longer need to import cuid here, because the helper handles it

export function EducationForm() {
  const { state, dispatch } = useResumeContext();

  const handleAddEducation = () => {
    // --- THIS IS THE FIX ---
    // Instead of creating the object manually here, we use the helper
    // from ResumeContextProvider. This ensures all fields (like createdAt)
    // are present, satisfying TypeScript.
    dispatch({ type: "ADD_EDUCATION", payload: createBlankEducation() });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Render a form for each education item */}
      <div className="space-y-4">
        {state.education.map((edu, index) => (
          <EducationItem key={edu.id} index={index} data={edu} />
        ))}
      </div>

      {/* Add New Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddEducation}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
