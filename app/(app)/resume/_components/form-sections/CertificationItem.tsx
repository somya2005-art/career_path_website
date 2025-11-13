"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, CalendarIcon } from "lucide-react";
import { useResumeContext } from "../ResumeContextProvider";
import { Certification } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// This component renders the form for a single certification entry
export function CertificationItem({
  index,
  data,
}: {
  index: number;
  data: Certification;
}) {
  const { dispatch } = useResumeContext();

  // Handle changes to any text field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };

    dispatch({
      type: "UPDATE_CERTIFICATION",
      payload: { index, data: updatedData },
    });
  };

  // Handle date selection
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    const updatedData = { ...data, date: date };
    dispatch({
      type: "UPDATE_CERTIFICATION",
      payload: { index, data: updatedData },
    });
  };

  // Remove this item from the list
  const handleRemove = () => {
    dispatch({ type: "REMOVE_CERTIFICATION", payload: { index } });
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

      {/* Certification Name */}
      <div className="space-y-2">
        <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
        <Input
          id={`cert-name-${index}`}
          name="name"
          placeholder="e.g. AWS Certified Cloud Practitioner"
          value={data.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Issuer */}
        <div className="space-y-2">
          <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
          <Input
            id={`cert-issuer-${index}`}
            name="issuer"
            placeholder="e.g. Amazon Web Services"
            value={data.issuer || ""}
            onChange={handleChange}
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor={`cert-date-${index}`}>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${
                  !data.date && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.date ? (
                  format(new Date(data.date), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.date ? new Date(data.date) : undefined}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
