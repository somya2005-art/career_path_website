"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, CalendarIcon } from "lucide-react";
import { useResumeContext } from "../ResumeContextProvider";
import { VolunteerWork } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// This component renders the form for a single volunteer work entry
export function VolunteerWorkItem({
  index,
  data,
}: {
  index: number;
  data: VolunteerWork;
}) {
  const { dispatch } = useResumeContext();

  // Handle changes to any text field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };

    dispatch({
      type: "UPDATE_VOLUNTEER_WORK",
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
        type: "UPDATE_VOLUNTEER_WORK",
        payload: { index, data: updatedData },
      });
      return;
    }
    if (!date) return;

    const updatedData = { ...data, [field]: date };
    dispatch({
      type: "UPDATE_VOLUNTEER_WORK",
      payload: { index, data: updatedData },
    });
  };

  // Remove this item from the list
  const handleRemove = () => {
    dispatch({ type: "REMOVE_VOLUNTEER_WORK", payload: { index } });
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

      {/* Organization */}
      <div className="space-y-2">
        <Label htmlFor={`vol-org-${index}`}>Organization</Label>
        <Input
          id={`vol-org-${index}`}
          name="organization"
          placeholder="e.g. Red Cross"
          value={data.organization}
          onChange={handleChange}
        />
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label htmlFor={`vol-role-${index}`}>Role</Label>
        <Input
          id={`vol-role-${index}`}
          name="role"
          placeholder="e.g. Volunteer"
          value={data.role}
          onChange={handleChange}
        />
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
        <Label htmlFor={`vol-description-${index}`}>Description</Label>
        <Textarea
          id={`vol-description-${index}`}
          name="description"
          placeholder="e.g. - Organized local food drive..."
          value={data.description || ""}
          onChange={handleChange}
          rows={4}
        />
      </div>
    </div>
  );
}
