"use client";

import { useResumeContext } from "./ResumeContextProvider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Award,
  GraduationCap,
  Heart,
} from "lucide-react";

// Helper to format dates (e.g., "Aug 2023 - Present")
const formatDateRange = (startDate: Date | null, endDate: Date | null) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  const start = startDate
    ? new Date(startDate).toLocaleDateString(undefined, options)
    : "";
  const end = endDate
    ? new Date(endDate).toLocaleDateString(undefined, options)
    : "Present";

  if (!start) return "";
  return `${start} - ${end}`;
};

export function ResumePreview() {
  const { state } = useResumeContext();

  // Helper to format descriptions as bullet points
  const renderDescription = (desc: string | null) => {
    if (!desc) return null;
    return (
      <ul className="list-disc pl-5 mt-1 space-y-1">
        {desc
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .map((line, i) => (
            <li key={i} className="text-sm text-gray-700">
              {line.replace(/^- /, "").trim()}
            </li>
          ))}
      </ul>
    );
  };

  return (
    /* --- THIS IS THE "A4 PAGE" --- */
    /* It has a fixed A4 aspect ratio and shadow, 
       but is responsive (w-full)
    */
    <div
      id="resume-preview"
      className="w-full min-h-[297mm] bg-white text-black shadow-lg mx-auto p-10 rounded-lg"
    >
      <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
        {/* Main Header */}
        <h1 className="text-4xl font-bold text-gray-800">{state.fullName}</h1>
      </div>

      <div className="flex mt-6">
        {/* === Main Column (Left) === */}
        <div className="w-[60%] pr-8">
          {/* --- Professional Summary --- */}
          {state.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b-2 border-gray-800 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm text-gray-700">{state.summary}</p>
            </section>
          )}

          {/* --- Work Experience --- */}
          {state.workExperience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b-2 border-gray-800 pb-1 mb-2">
                Work Experience
              </h2>
              {state.workExperience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </span>
                    <span className="text-xs">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                  {renderDescription(exp.description)}
                </div>
              ))}
            </section>
          )}

          {/* --- Projects --- */}
          {state.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b-2 border-gray-800 pb-1 mb-2">
                Projects
              </h2>
              {state.projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <h3 className="text-lg font-semibold">{proj.name}</h3>
                  {proj.url && (
                    <a
                      href={
                        proj.url.startsWith("http")
                          ? proj.url
                          : `https://${proj.url}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {proj.url}
                    </a>
                  )}
                  {renderDescription(proj.description)}
                </div>
              ))}
            </section>
          )}

          {/* --- Volunteer Work (MOVED) --- */}
        </div>

        {/* === Sidebar (Right) === */}
        <div className="w-[40%] pl-6 border-l-2 border-gray-300">
          {/* --- Contact --- */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <ul className="space-y-1 text-sm">
              {state.email && (
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="break-all">{state.email}</span>
                </li>
              )}
              {state.phone && (
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{state.phone}</span>
                </li>
              )}
              {state.location && (
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{state.location}</span>
                </li>
              )}
              {state.website && (
                <li className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <a
                    href={
                      state.website.startsWith("http")
                        ? state.website
                        : `https://www.${state.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {state.website}
                  </a>
                </li>
              )}
            </ul>
          </section>

          <Separator className="my-4" />

          {/* --- Skills --- */}
          {state.skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {state.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {state.skills.length > 0 && <Separator className="my-4" />}

          {/* --- Education --- */}
          {state.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education
              </h2>
              {state.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <h3 className="text-md font-semibold">{edu.school}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                  {renderDescription(edu.description)}
                </div>
              ))}
            </section>
          )}

          {state.education.length > 0 && <Separator className="my-4" />}

          {/* --- Certifications --- */}
          {state.certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Certifications
              </h2>
              {state.certifications.map((cert, i) => (
                <div key={i} className="mb-3">
                  <h3 className="text-md font-semibold">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-500">
                    {cert.date
                      ? new Date(cert.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                        })
                      : ""}
                  </p>
                </div>
              ))}
            </section>
          )}

          {state.certifications.length > 0 && <Separator className="my-4" />}

          {/* --- Volunteer Work (MOVED HERE) --- */}
          {state.volunteerWork.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Volunteer Work
              </h2>
              {state.volunteerWork.map((vol, i) => (
                <div key={i} className="mb-4">
                  <h3 className="text-lg font-semibold">{vol.role}</h3>
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>{vol.organization}</span>
                    <span className="text-xs">
                      {formatDateRange(vol.startDate, vol.endDate)}
                    </span>
                  </div>
                  {renderDescription(vol.description)}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
