"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useResumeContext, createBlankProject } from "../ResumeContextProvider";
import { ProjectItem } from "./ProjectItem";

// This component renders the list of project items
// and the "Add Project" button
export function ProjectForm() {
  const { state, dispatch } = useResumeContext();

  // Add a new, blank project to the state
  const handleAddProject = () => {
    dispatch({ type: "ADD_PROJECT", payload: createBlankProject() });
  };

  return (
    <div className="space-y-4">
      {/* List of existing projects */}
      {state.projects.map((project, index) => (
        <ProjectItem key={project.id} index={index} data={project} />
      ))}

      {/* Add Project Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddProject}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
