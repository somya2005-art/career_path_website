"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useResumeContext } from "../ResumeContextProvider";
import { Education } from "@/lib/types";

// This component renders the form for a single education entry
export function EducationItem({
  index,
  data,
}: {
  index: number;
  data: Education;
}) {
  const { dispatch } = useResumeContext();

  // Handle changes to any field in this item
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };

    dispatch({
      type: "UPDATE_EDUCATION",
      payload: { index, data: updatedData },
    });
  };

  // Handle date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value ? new Date(value) : null };

    dispatch({
      type: "UPDATE_EDUCATION",
      payload: { index, data: updatedData },
    });
  };

  // Remove this item from the list
  const handleRemove = () => {
    dispatch({ type: "REMOVE_EDUCATION", payload: { index } });
  };

  // Helper to format date for input
  const getInputValue = (date: Date | null | undefined) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
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

      {/* School */}
      <div className="space-y-2">
        <Label htmlFor={`edu-school-${index}`}>School</Label>
        <Input
          id={`edu-school-${index}`}
          name="school"
          placeholder="e.g. Manipal University Jaipur"
          value={data.school}
          onChange={handleChange}
        />
      </div>

      {/* Degree */}
      <div className="space-y-2">
        <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
        <Input
          id={`edu-degree-${index}`}
          name="degree"
          placeholder="e.g. B.Tech. in Computer Science & Engineering"
          value={data.degree}
          onChange={handleChange}
        />
      </div>

      {/* Field of Study */}
      <div className="space-y-2">
        <Label htmlFor={`edu-fieldOfStudy-${index}`}>Field of Study</Label>
        <Input
          id={`edu-fieldOfStudy-${index}`}
          name="fieldOfStudy"
          placeholder="e.g. Computer Science"
          value={data.fieldOfStudy || ""}
          onChange={handleChange}
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`edu-startDate-${index}`}>Start Date</Label>
          <Input
            id={`edu-startDate-${index}`}
            name="startDate"
            type="date"
            value={getInputValue(data.startDate)}
            onChange={handleDateChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`edu-endDate-${index}`}>End Date</Label>
          <Input
            id={`edu-endDate-${index}`}
            name="endDate"
            type="date"
            value={getInputValue(data.endDate)}
            onChange={handleDateChange}
          />
          <p className="text-xs text-muted-foreground">
            Leave blank if current.
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor={`edu-description-${index}`}>Description</Label>
        <Textarea
          id={`edu-description-${index}`}
          name="description"
          placeholder="e.g. Relevant coursework, honors..."
          value={data.description || ""}
          onChange={handleChange}
          rows={3}
        />
      </div>
    </div>
  );
}
