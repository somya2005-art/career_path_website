"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useResumeContext } from "../ResumeContextProvider";
import { EducationItem } from "./EducationItem";
import cuid from "cuid";

export function EducationForm() {
  const { state, dispatch } = useResumeContext();

  const handleAddEducation = () => {
    // Create a new, blank education object
    const newEducation = {
      id: cuid(), // Generate a unique client-side ID
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: null,
      endDate: null,
      description: "",
    };

    // Dispatch the action to add it to the state
    dispatch({ type: "ADD_EDUCATION", payload: newEducation });
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
