"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { useResumeContext } from "../ResumeContextProvider";
import { X } from "lucide-react";

export function SkillsForm() {
  const { state, dispatch } = useResumeContext();
  const [currentSkill, setCurrentSkill] = useState("");

  // Handle adding a new skill
  const handleAddSkill = () => {
    // Check if skill is not empty and not already in the list
    if (currentSkill.trim() && !state.skills.includes(currentSkill.trim())) {
      const newSkills = [...state.skills, currentSkill.trim()];
      dispatch({ type: "SET_SKILLS", payload: newSkills });
      setCurrentSkill(""); // Clear the input
    }
  };

  // Handle keydown for "Enter" or "Comma"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission
      handleAddSkill();
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = state.skills.filter((skill) => skill !== skillToRemove);
    dispatch({ type: "SET_SKILLS", payload: newSkills });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skill-input">Add Skills</Label>
        <div className="flex gap-2">
          <Input
            id="skill-input"
            placeholder="e.g. React"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" onClick={handleAddSkill}>
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Type a skill and press Enter, Comma, or "Add".
        </p>
      </div>

      {/* Display current skills as badges */}
      <div className="space-y-2">
        <Label>Your Skills</Label>
        {state.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {state.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
                <button
                  type="button"
                  className="ml-1.5"
                  onClick={() => handleRemoveSkill(skill)}
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
