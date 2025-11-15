"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { searchJobs, JobListing, SearchFilters } from "./actions"; // Import new SearchFilters type
import { JobCard } from "./_components/JobCard";

// Define the employment types for our checkboxes
const employmentTypesList = [
  { id: "FULLTIME", label: "Full-time" },
  { id: "PARTTIME", label: "Part-time" },
  { id: "CONTRACTOR", label: "Contractor" },
  { id: "INTERN", label: "Intern" },
];

export default function JobsPage() {
  // --- New State for Filters ---
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(""); // Default to India
  const [datePosted, setDatePosted] = useState("");
  const [workFromHome, setWorkFromHome] = useState(false);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);

  // --- State for Results ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobListing[]>([]);

  // Helper to manage the employment type checkboxes
  const handleEmploymentTypeChange = (
    type: string,
    checked: boolean | "indeterminate"
  ) => {
    if (checked) {
      setEmploymentTypes((prev) => [...prev, type]);
    } else {
      setEmploymentTypes((prev) => prev.filter((t) => t !== type));
    }
  };

  // Updated search handler
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;

    setIsLoading(true);
    setError(null);
    setJobs([]);

    // Create the filters object to send to the server
    const filters: SearchFilters = {
      query: query,
      location: location,
      date_posted: datePosted as SearchFilters["date_posted"],
      work_from_home: workFromHome,
      employment_types: employmentTypes.join(","), // Convert array to string
    };

    const result = await searchJobs(filters); // Pass the filters object

    if (result.success) {
      setJobs(result.data!);
    } else {
      setError(result.error!);
    }

    setIsLoading(false);
  };

  return (
    // This is your working layout
    <div className="h-full flex flex-col max-w-5xl mx-auto p-4 md:p-8">
      {/* --- Page Header --- */}
      <header className="mb-4">
        <h1 className="text-4xl font-bold mb-2 text-white [text-shadow:_0_0_12px_purple]">
          Job Portal
        </h1>
        <p className="text-neutral-400">
          Search for jobs and instantly see how your resume stacks up.
        </p>
      </header>

      {/* --- THIS IS THE NEW, UPGRADED FORM --- */}
      <form onSubmit={handleSearch} className="mb-6">
        {/* Row 1: Query and Location */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input
            placeholder="e.g. 'Software Engineer' or 'Marketing Manager'"
            className="flex-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <Input
            placeholder="Location (e.g. 'India' or 'Berlin')"
            className="md:w-1/3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Row 2: Filters */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Date Posted Filter */}
          <div>
            <Label htmlFor="date-posted" className="text-xs text-neutral-400">
              Date Posted
            </Label>
            <Select
              value={datePosted}
              onValueChange={setDatePosted}
              disabled={isLoading}
            >
              <SelectTrigger id="date-posted" className="w-[180px]">
                <SelectValue placeholder="Date Posted" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="3days">Last 3 days</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Remote Filter */}
          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id="remote"
              checked={workFromHome}
              onCheckedChange={setWorkFromHome as (checked: boolean) => void}
              disabled={isLoading}
            />
            <Label htmlFor="remote" className="text-sm">
              Remote Only
            </Label>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search Button */}
          <Button type="submit" size="icon" disabled={isLoading}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Row 3: Employment Types */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Label className="text-sm font-medium">Employment Types:</Label>
          {employmentTypesList.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                onCheckedChange={(checked) =>
                  handleEmploymentTypeChange(type.id, checked)
                }
                disabled={isLoading}
              />
              <Label htmlFor={type.id} className="text-sm font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </form>
      {/* --- END OF NEW FORM --- */}

      {/* --- Results area (this part is unchanged) --- */}
      <section className="flex-1 overflow-auto space-y-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            <p className="mt-2 text-neutral-400">Searching for jobs...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Search Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && jobs.length === 0 && (
          <div className="text-center text-neutral-500 py-12">
            <p>Search for a job to get started.</p>
          </div>
        )}

        {/* --- Job List --- */}
        {!isLoading && jobs.length > 0 && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
