"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useResumeContext,
  createBlankWorkExperience, // Use the correct "blank" creator
} from "../ResumeContextProvider";
import { ExperienceItem } from "./ExperienceItem";

// This component renders the list of experience items
// and the "Add Work Experience" button
export function ExperienceForm() {
  const { state, dispatch } = useResumeContext();

  // Add a new, blank experience to the state
  const handleAddExperience = () => {
    dispatch({
      type: "ADD_WORK_EXPERIENCE", // Use the correct action type
      payload: createBlankWorkExperience(), // Use the correct "blank" creator
    });
  };

  return (
    <div className="space-y-4">
      {/* THE FIX:
        Use `state.workExperience` instead of `state.experience` 
      */}
      {state.workExperience.map((exp, index) => (
        <ExperienceItem key={exp.id} index={index} data={exp} />
      ))}

      {/* Add Experience Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddExperience}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
}
