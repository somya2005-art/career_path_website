"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal, ExternalLink, Sparkles } from "lucide-react";
import { JobListing, matchResumeToJob } from "../actions";
import { AnalysisResult } from "../../analyzer/actions";
// --- We re-use the component from our Analyzer! ---
import { AnalysisResultDisplay } from "../../analyzer/_components/AnalysisResultDisplay";

// This is the component for a single Job Listing
export function JobCard({ job }: { job: JobListing }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<AnalysisResult | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);

  // This function is called when the "Match" button is clicked
  const handleMatchClick = async () => {
    // We already have the description, no extra API call needed!
    if (!job.job_description) {
      setMatchError("This job has no description, so it cannot be analyzed.");
      return;
    }

    setIsMatching(true);
    setMatchResult(null);
    setMatchError(null);

    // This is the efficient call:
    const result = await matchResumeToJob(job.job_description);

    if (result.success) {
      setMatchResult(result.analysis!);
    } else {
      setMatchError(result.error!);
    }

    setIsMatching(false);
  };

  // A helper to format the location, as it can be null
  const location = [job.job_city, job.job_country].filter(Boolean).join(", ");

  return (
    <Card className="bg-neutral-800 border-neutral-700">
      <CardHeader>
        <CardTitle>{job.job_title}</CardTitle>
        <CardDescription>{job.employer_name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Badges for location, type, etc. */}
        <div className="flex flex-wrap gap-2">
          {location && <Badge variant="secondary">{location}</Badge>}
          {job.job_employment_type && (
            <Badge variant="secondary">{job.job_employment_type}</Badge>
          )}
          {job.job_is_remote && <Badge variant="secondary">Remote</Badge>}
          {job.job_posted_at && (
            <Badge variant="outline" className="border-neutral-600">
              Posted {job.job_posted_at}
            </Badge>
          )}
        </div>
        {/* Job Description Snippet */}
        <p className="text-sm text-neutral-400 line-clamp-3">
          {job.job_description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" asChild>
          <a
            href={job.job_apply_link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>

        {/* --- This is the "Killer Feature" Button --- */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleMatchClick}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Match My Resume
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col bg-neutral-900 border-neutral-700">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Resume Match Report
              </DialogTitle>
              <DialogDescription>
                Comparing your saved resume to the "{job.job_title}" position.
              </DialogDescription>
            </DialogHeader>

            {/* --- Modal Content --- */}
            <div className="flex-1 overflow-y-auto pr-6">
              {isMatching && (
                <div className="flex flex-col justify-center items-center h-full">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <p className="mt-4 text-neutral-400">
                    Analyzing your resume against the job description...
                  </p>
                </div>
              )}

              {matchError && (
                <Alert variant="destructive" className="mt-6">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Analysis Error</AlertTitle>
                  <AlertDescription>{matchError}</AlertDescription>
                </Alert>
              )}

              {matchResult && <AnalysisResultDisplay result={matchResult} />}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
