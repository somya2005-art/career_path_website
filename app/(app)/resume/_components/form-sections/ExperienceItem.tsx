"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, CalendarIcon } from "lucide-react";
import { useResumeContext } from "../ResumeContextProvider";
import { WorkExperience } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// This component renders the form for a single work experience entry
export function ExperienceItem({
  index,
  data,
}: {
  index: number;
  data: WorkExperience;
}) {
  const { dispatch } = useResumeContext();

  // Handle changes to any text field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };

    // --- THIS IS THE FIX for the TypeScript error ---
    dispatch({
      type: "UPDATE_WORK_EXPERIENCE", // Was "UPDATE_EXPERIENCE"
      payload: { index, data: updatedData },
    });
  };

  // Handle date changes
  const handleDateChange = (
    date: Date | undefined,
    field: "startDate" | "endDate"
  ) => {
    if (!date && field === "endDate") {
      // Allow clearing the end date
      const updatedData = { ...data, endDate: null };
      dispatch({
        type: "UPDATE_WORK_EXPERIENCE",
        payload: { index, data: updatedData },
      });
      return;
    }
    if (!date) return;

    const updatedData = { ...data, [field]: date };
    dispatch({
      type: "UPDATE_WORK_EXPERIENCE",
      payload: { index, data: updatedData },
    });
  };

  // Remove this item from the list
  const handleRemove = () => {
    dispatch({ type: "REMOVE_WORK_EXPERIENCE", payload: { index } });
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

      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
        <Input
          id={`exp-title-${index}`}
          name="jobTitle"
          placeholder="e.g. Software Engineer" // Added placeholder
          value={data.jobTitle}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor={`exp-company-${index}`}>Company</Label>
          <Input
            id={`exp-company-${index}`}
            name="company"
            placeholder="e.g. Google" // Added placeholder
            value={data.company}
            onChange={handleChange}
          />
        </div>
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor={`exp-location-${index}`}>Location</Label>
          <Input
            id={`exp-location-${index}`}
            name="location"
            placeholder="e.g. London, UK" // Added placeholder
            value={data.location || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${
                  !data.startDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.startDate ? (
                  format(new Date(data.startDate), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.startDate ? new Date(data.startDate) : undefined}
                onSelect={(date) => handleDateChange(date, "startDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>End Date (or blank)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${
                  !data.endDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.endDate ? (
                  format(new Date(data.endDate), "PPP")
                ) : (
                  <span>Present</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.endDate ? new Date(data.endDate) : undefined}
                onSelect={(date) => handleDateChange(date, "endDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor={`exp-description-${index}`}>
          Description (Start each line with a '-')
        </Label>
        <Textarea
          id={`exp-description-${index}`}
          name="description"
          placeholder="e.g. - Developed features for..." // Added placeholder
          value={data.description || ""}
          onChange={handleChange}
          rows={4}
        />
      </div>
    </div>
  );
}
