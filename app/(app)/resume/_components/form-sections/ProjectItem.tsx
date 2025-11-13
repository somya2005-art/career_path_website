"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useResumeContext } from "../ResumeContextProvider";
import { Project } from "@/lib/types";

// This component renders the form for a single project entry
export function ProjectItem({ index, data }: { index: number; data: Project }) {
  const { dispatch } = useResumeContext();

  // Handle changes to any field in this item
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };

    dispatch({
      type: "UPDATE_PROJECT",
      payload: { index, data: updatedData },
    });
  };

  // Remove this item from the list
  const handleRemove = () => {
    dispatch({ type: "REMOVE_PROJECT", payload: { index } });
  };

  return (
    <div className="p-4 border rounded-lg space-y-4 relative">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor={`proj-name-${index}`}>Project Name</Label>
        <Input
          id={`proj-name-${index}`}
          name="name"
          placeholder="e.g. Career Path App"
          value={data.name}
          onChange={handleChange}
        />
      </div>

      {/* Project URL */}
      <div className="space-y-2">
        <Label htmlFor={`proj-url-${index}`}>Project URL</Label>
        <Input
          id={`proj-url-${index}`}
          name="url"
          placeholder="e.g. https://github.com/..."
          value={data.url || ""}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor={`proj-description-${index}`}>
          Description (Start each line with a '-')
        </Label>
        <Textarea
          id={`proj-description-${index}`}
          name="description"
          placeholder="e.g. - Built a full-stack app with Next.js..."
          value={data.description || ""}
          onChange={handleChange}
          rows={4}
        />
      </div>
    </div>
  );
}
