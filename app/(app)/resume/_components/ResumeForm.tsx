"use client";

// This is the main form component that holds the accordion

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useResumeContext } from "./ResumeContextProvider";
import { saveResumeData } from "../actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { PersonalInfoForm } from "./form-sections/PersonalInfoForm";
import { SummaryForm } from "./form-sections/SummaryForm";
import { ExperienceForm } from "./form-sections/ExperienceForm";
import { EducationForm } from "./form-sections/EducationForm";
import { SkillsForm } from "./form-sections/SkillsForm";
import { ProjectForm } from "./form-sections/ProjectForm";
import { CertificationForm } from "./form-sections/CertificationForm";
import { VolunteerWorkForm } from "./form-sections/VolunteerWorkForm";

export function ResumeForm() {
  const { state } = useResumeContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(
    null
  );

  // Handle saving the entire resume state to the database
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const result = await saveResumeData(state);
      if (result.success) {
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      // Hide status message after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume Editor</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
      {saveStatus === "success" && (
        <div className="text-green-600 mb-4">Saved successfully!</div>
      )}
      {saveStatus === "error" && (
        <div className="text-red-600 mb-4">
          Failed to save. Please try again.
        </div>
      )}

      {/* The main accordion for all resume sections */}
      <Accordion type="multiple" defaultValue={["personal-info"]}>
        {/* Personal Info */}
        <AccordionItem value="personal-info">
          <AccordionTrigger suppressHydrationWarning>
            Personal Information
          </AccordionTrigger>
          <AccordionContent>
            <PersonalInfoForm />
          </AccordionContent>
        </AccordionItem>

        {/* Professional Summary */}
        <AccordionItem value="summary">
          <AccordionTrigger suppressHydrationWarning>
            Professional Summary
          </AccordionTrigger>
          <AccordionContent>
            <SummaryForm />
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills">
          <AccordionTrigger suppressHydrationWarning>Skills</AccordionTrigger>
          <AccordionContent>
            <SkillsForm />
          </AccordionContent>
        </AccordionItem>

        {/* Work Experience */}
        <AccordionItem value="experience">
          <AccordionTrigger suppressHydrationWarning>
            Work Experience
          </AccordionTrigger>
          <AccordionContent>
            <ExperienceForm />
          </AccordionContent>
        </AccordionItem>

        {/* Projects */}
        <AccordionItem value="projects">
          <AccordionTrigger suppressHydrationWarning>Projects</AccordionTrigger>
          <AccordionContent>
            <ProjectForm />
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education">
          <AccordionTrigger suppressHydrationWarning>
            Education
          </AccordionTrigger>
          <AccordionContent>
            <EducationForm />
          </AccordionContent>
        </AccordionItem>

        {/* Certifications */}
        <AccordionItem value="certifications">
          <AccordionTrigger suppressHydrationWarning>
            Certifications
          </AccordionTrigger>
          <AccordionContent>
            <CertificationForm />
          </AccordionContent>
        </AccordionItem>

        {/* Volunteer Work */}
        <AccordionItem value="volunteer">
          <AccordionTrigger suppressHydrationWarning>
            Volunteer Work
          </AccordionTrigger>
          <AccordionContent>
            <VolunteerWorkForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
