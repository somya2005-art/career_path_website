"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useResumeContext,
  createBlankVolunteerWork,
} from "../ResumeContextProvider";
import { VolunteerWorkItem } from "./VolunteerWorkItem";

// This component renders the list of volunteer work items
// and the "Add Volunteer Work" button
export function VolunteerWorkForm() {
  const { state, dispatch } = useResumeContext();

  // Add a new, blank volunteer work item to the state
  const handleAddVolunteerWork = () => {
    dispatch({
      type: "ADD_VOLUNTEER_WORK",
      payload: createBlankVolunteerWork(),
    });
  };

  return (
    <div className="space-y-4">
      {/* List of existing volunteer work items */}
      {state.volunteerWork.map((vol, index) => (
        <VolunteerWorkItem key={vol.id} index={index} data={vol} />
      ))}

      {/* Add Volunteer Work Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddVolunteerWork}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Volunteer Work
      </Button>
    </div>
  );
}
