"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "../ResumeContextProvider";

export function SummaryForm() {
  const { state, dispatch } = useResumeContext();

  // Handle the textarea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_SUMMARY",
      payload: e.target.value,
    });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Textarea
          id="summary"
          name="summary"
          placeholder="e.g. A highly motivated software engineer with 5 years of experience in..."
          value={state.summary}
          onChange={handleChange}
          rows={6}
        />
        <p className="text-xs text-muted-foreground">
          A brief, powerful summary of your career and skills.
        </p>
      </div>
    </div>
  );
}
