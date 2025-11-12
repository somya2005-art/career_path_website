"use client";

import { useResumeContext } from "./ResumeContextProvider";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

export function ResumePreview() {
  // Read the global state from the context
  const { state } = useResumeContext();

  // Helper function to format date
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-[1123px] text-black">
      {/* --- Header --- */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">
          {state.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
          {state.email && (
            <a
              href={`mailto:${state.email}`}
              className="flex items-center gap-1.5"
            >
              <Mail size={14} /> {state.email}
            </a>
          )}
          {state.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={14} /> {state.phone}
            </span>
          )}
          {state.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> {state.location}
            </span>
          )}
          {state.website && (
            <a href={state.website} className="flex items-center gap-1.5">
              <Globe size={14} /> {state.website}
            </a>
          )}
        </div>
      </header>

      {/* --- Summary --- */}
      {state.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-black pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700">{state.summary}</p>
        </section>
      )}

      {/* --- Skills --- */}
      {state.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-black pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {state.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* --- Experience --- */}
      {state.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-black pb-1 mb-2">
            Work Experience
          </h2>
          <div className="space-y-4">
            {state.experience.map((exp, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-base">{exp.jobTitle}</h3>
                  <span className="text-xs font-medium text-gray-600">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-gray-700">
                  <p className="font-medium">{exp.company}</p>
                  <p className="text-xs">{exp.location}</p>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Education --- */}
      {state.education.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b-2 border-black pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-4">
            {state.education.map((edu, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-base">{edu.school}</h3>
                  <span className="text-xs font-medium text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-gray-700">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-xs">{edu.fieldOfStudy}</p>
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
