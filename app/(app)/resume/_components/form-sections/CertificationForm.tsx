"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useResumeContext,
  createBlankCertification,
} from "../ResumeContextProvider";
import { CertificationItem } from "./CertificationItem";

// This component renders the list of certification items
// and the "Add Certification" button
export function CertificationForm() {
  const { state, dispatch } = useResumeContext();

  // Add a new, blank certification to the state
  const handleAddCertification = () => {
    dispatch({
      type: "ADD_CERTIFICATION",
      payload: createBlankCertification(),
    });
  };

  return (
    <div className="space-y-4">
      {/* List of existing certifications */}
      {state.certifications.map((cert, index) => (
        <CertificationItem key={cert.id} index={index} data={cert} />
      ))}

      {/* Add Certification Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddCertification}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
}
