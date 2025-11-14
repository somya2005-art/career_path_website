"use client";

import { useState, useRef } from "react"; // --- FIX: Import useRef ---
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal } from "lucide-react";
import { analyzeResumeWithJD, AnalysisResult } from "./actions";
import { AnalysisResultDisplay } from "./_components/AnalysisResultDisplay";

// This is the main page component for the Analyzer
export default function AnalyzerPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // --- FIX: Create a ref for the results div ---
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const result = await analyzeResumeWithJD(jobDescription);

    if (result.success) {
      setAnalysis(result.analysis!);
      // --- FIX: Auto-scroll on success ---
      // We use a short timeout to make sure React has rendered the
      // results div before we try to scroll to it.
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      setError(result.error!);
    }

    setIsLoading(false);
  };

  return (
    // We add padding to the page, which we removed from the layout
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* --- FIX: Styled the heading --- */}
      <h1 className="text-4xl font-bold mb-4 text-white">Resume Analyzer</h1>
      <p className="text-neutral-400 mb-6">
        Paste a job description below to see how well your saved resume matches
        the role.
      </p>

      {/* --- The Form --- */}
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Paste the full job description here..."
          rows={15}
          className="mb-4"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </form>

      {/* --- Error Display --- */}
      {error && (
        <Alert variant="destructive" className="mt-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Analysis Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* --- Result Display --- */}
      {/* --- FIX: Attach the ref here --- */}
      <div className="mt-8" ref={resultsRef}>
        {analysis && <AnalysisResultDisplay result={analysis} />}
      </div>
    </div>
  );
}
