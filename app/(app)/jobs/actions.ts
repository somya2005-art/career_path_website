"use server";

import { analyzeResumeWithJD, AnalysisResult } from "../analyzer/actions";

// --- THIS IS THE JSEARCH DATA STRUCTURE ---
export interface JobListing {
  job_id: string;
  employer_name: string;
  job_title: string;
  job_country: string | null;
  job_city: string | null;
  job_apply_link: string | null;
  job_description: string;
  job_employment_type: string | null;
  job_is_remote: boolean;
  job_posted_at: string | null;
  job_posted_at_timestamp: number | null;
}

interface JSearchResponse {
  status: string;
  data: JobListing[];
}

// --- NEW: A type for all our filters ---
export interface SearchFilters {
  query: string;
  location: string;
  date_posted: "all" | "today" | "3days" | "week" | "month";
  work_from_home: boolean;
  employment_types: string; // e.g., "FULLTIME,PARTTIME"
}

/**
 * Searches for jobs using the JSearch RapidAPI
 */
export async function searchJobs(
  filters: SearchFilters
): Promise<{ success: boolean; data?: JobListing[]; error?: string }> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return { success: false, error: "API key is not configured." };
  }

  const url = new URL("https://jsearch.p.rapidapi.com/search");

  // 1. Add required query
  // We combine query and location for a better search
  const query = filters.location
    ? `${filters.query} in ${filters.location}`
    : filters.query;
  url.searchParams.append("query", query);
  url.searchParams.append("num_pages", "1");
  url.searchParams.append("page", "1");

  // 2. Add conditional filters
  if (filters.date_posted && filters.date_posted !== "all") {
    url.searchParams.append("date_posted", filters.date_posted);
  }
  if (filters.work_from_home) {
    url.searchParams.append("work_from_home", "true");
  }
  if (filters.employment_types) {
    url.searchParams.append("employment_types", filters.employment_types);
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("JSearch API error:", errorText);
      return { success: false, error: `API Error: ${errorText}` };
    }

    const result: JSearchResponse = await response.json();

    if (result.status !== "OK" || !result.data) {
      return { success: false, error: "The job search returned no results." };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error in searchJobs:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Match Resume to Job (no changes needed)
 */
export async function matchResumeToJob(
  jobDescription: string
): Promise<{ success: boolean; analysis?: AnalysisResult; error?: string }> {
  return analyzeResumeWithJD(jobDescription);
}
