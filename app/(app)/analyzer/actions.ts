"use server";

import { Groq } from "groq-sdk";
// We can re-use the getResumeData function from our resume builder!
import { getResumeData } from "../resume/actions";
import { ResumeState } from "@/lib/types";

// Get the API key from environment variables
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// This is the JSON structure we want Groq to return
export interface AnalysisResult {
  matchScore: number;
  overallFit: string;
  strengths: string[];
  areasForImprovement: string[];
  missingKeywords: string[];
}

const systemPrompt = `
You are an expert ATS (Applicant Tracking System) and a professional career coach.
You will be given a user's resume as a JSON object and a job description as text.
Your task is to provide a concise, critical, and actionable analysis of how well the resume matches the job description.
You MUST return your analysis in the specified JSON schema.

RULES:
- 'matchScore' must be a number from 0 to 100.
- 'overallFit' should be a single, impactful paragraph summarizing the match.
- 'strengths' and 'areasForImprovement' should be 3-5 bullet points each.
- 'missingKeywords' should be a list of 5-10 important keywords from the job description that are NOT present in the resume.
`;

export async function analyzeResumeWithJD(jobDescription: string): Promise<{
  success: boolean;
  analysis?: AnalysisResult;
  error?: string;
}> {
  let resumeData: ResumeState;

  // 1. Get the user's saved resume data
  try {
    // This function also handles user syncing
    resumeData = await getResumeData();
  } catch (error) {
    console.error("Error fetching resume data:", error);
    return { success: false, error: "Could not load your saved resume." };
  }

  // 2. Check if the resume is empty
  if (
    !resumeData.summary ||
    resumeData.workExperience.length === 0 ||
    resumeData.skills.length === 0
  ) {
    return {
      success: false,
      error:
        "Your resume is too empty to analyze. Please fill out your Summary, Work Experience, and Skills sections first.",
    };
  }

  // 3. Check if the JD is empty
  if (!jobDescription || jobDescription.trim().length < 50) {
    return {
      success: false,
      error: "Please paste a full job description (at least 50 characters).",
    };
  }

  // 4. Call the Groq API
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Here is the resume: ${JSON.stringify(
            resumeData
          )} \n\nHere is the job description: ${jobDescription}`,
        },
      ],
      model: "llama3-8b-8192", // Fast and efficient
      temperature: 0.2, // Low temp for factual analysis
      // --- THIS IS THE FIX ---
      // We cast this object to 'any' to bypass the TypeScript error
      // because the SDK types might be slightly out of date for this beta feature.
      response_format: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            matchScore: { type: "number" },
            overallFit: { type: "string" },
            strengths: { type: "array", items: { type: "string" } },
            areasForImprovement: {
              type: "array",
              items: { type: "string" },
            },
            missingKeywords: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: [
            "matchScore",
            "overallFit",
            "strengths",
            "areasForImprovement",
            "missingKeywords",
          ],
        },
      } as any,
      // --- END OF FIX ---
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (!responseContent) {
      return { success: false, error: "AI analysis failed to return content." };
    }

    // 5. Parse and return the JSON response
    const analysis = JSON.parse(responseContent) as AnalysisResult;
    return { success: true, analysis };
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return { success: false, error: "An error occurred during analysis." };
  }
}
