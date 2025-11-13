"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "../ResumeContextProvider";
import { ResumeState } from "@/lib/types";

export function PersonalInfoForm() {
  const { state, dispatch } = useResumeContext();

  // A helper function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Dispatch the action to the reducer
    // 'name' must match one of the keys in ResumeState
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { field: name as keyof ResumeState, value },
    });
  };

  return (
    <div className="space-y-4 p-4">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="e.g. Somya Khera"
          value={state.fullName}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="e.g. somya.khera@careerpath.com"
          value={state.email}
          onChange={handleChange}
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="e.g. +91 12345 67890"
          value={state.phone}
          onChange={handleChange}
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="e.g. Jaipur, RJ"
          value={state.location}
          onChange={handleChange}
        />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website / Portfolio</Label>
        <Input
          id="website"
          name="website"
          placeholder="e.g. portfolio.com or github.com/username"
          value={state.website}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
