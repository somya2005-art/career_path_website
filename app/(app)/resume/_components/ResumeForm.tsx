"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useResumeContext } from "./ResumeContextProvider";
import { saveResumeData } from "../actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
// We will create these components in the next steps
// import { PersonalInfoForm } from "./form-sections/PersonalInfoForm";
// import { SummaryForm } from "./form-sections/SummaryForm";
// import { ExperienceForm } from "./form-sections/ExperienceForm";
// import { EducationForm } from "./form-sections/EducationForm";
// import { SkillsForm } from "./form-sections/SkillsForm";

export function ResumeForm() {
  const { state } = useResumeContext();
  const [isSaving, setIsSaving] = useState(false);

  // Handle saving the resume
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await saveResumeData(state);
      if (result.success) {
        // We can add a toast notification here later
        console.log("Resume saved successfully!");
      } else {
        console.error("Failed to save resume:", result.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <Button variant="outline">Import</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["personal-info"]}
        className="w-full"
      >
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            {/* <PersonalInfoForm /> */}
            <p className="p-4 text-muted-foreground">
              Form section coming soon...
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger>Professional Summary</AccordionTrigger>
          <AccordionContent>
            {/* <SummaryForm /> */}
            <p className="p-4 text-muted-foreground">
              Form section coming soon...
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent>
            {/* <ExperienceForm /> */}
            <p className="p-4 text-muted-foreground">
              Form section coming soon...
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            {/* <EducationForm /> */}
            <p className="p-4 text-muted-foreground">
              Form section coming soon...
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            {/* <SkillsForm /> */}
            <p className="p-4 text-muted-foreground">
              Form section coming soon...
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
