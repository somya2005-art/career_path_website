"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal } from "lucide-react";
import { analyzeResumeWithJD, AnalysisResult } from "./actions";
import { AnalysisResultDisplay } from "./_components/AnalysisResultDisplay";

export default function AnalyzerPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeResumeWithJD(jobDescription);

      if (result.success) {
        setAnalysis(result.analysis!);
        setTimeout(
          () => resultsRef.current?.scrollIntoView({ behavior: "smooth" }),
          100
        );
      } else {
        setError(result.error ?? "Unknown error");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJobDescription("");
    setError(null);
    setAnalysis(null);
  };

  const charCount = jobDescription.length;
  const wordCount =
    jobDescription.trim() === ""
      ? 0
      : jobDescription.trim().split(/\s+/).length;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* grid: left control column + right results */}
      <div className="grid grid-cols-1 md:grid-cols-[520px_1fr] gap-10 items-start">
        {/* LEFT COLUMN (sticky at top-16; higher z so it stays visually above right content) */}
        <aside className="md:sticky md:top-16 self-start z-20">
          <div className="bg-gradient-to-br from-white/3 to-white/6 dark:from-black/30 dark:to-black/25 rounded-2xl border border-white/6 p-5 shadow-md backdrop-blur-sm">
            {/* Page heading & subheading (moved here) */}
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-white [text-shadow:_0_0_12px_rgba(255,255,255,0.5)]">
              Resume Analyzer
            </h1>
            <p className="text-neutral-400 mb-6 text-sm md:text-base">
              Paste a job description and analyze how well your saved resume
              matches the role.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 mb-4">
              <Button
                onClick={handleSubmit}
                disabled={isLoading || jobDescription.trim().length === 0}
                className="inline-flex items-center px-4 py-2"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze
              </Button>

              <Button
                variant="outline"
                onClick={handleClear}
                disabled={isLoading}
                className="inline-flex px-3 py-2"
              >
                Clear
              </Button>
            </div>

            {/* Textarea */}
            <Textarea
              placeholder="Paste the full job description here..."
              rows={14}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isLoading}
              className="min-h-[18rem] max-h-[60vh] overflow-auto resize-none mb-3"
            />

            {/* Footer: word/char counts */}
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <div className="flex items-center gap-4">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
              </div>

              <span className="text-xs">
                Tip: include responsibilities & skills
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN – RESULTS ONLY
            Give right column a matching top padding so content aligns with left.
            Set lower z so it cannot visually overlap the left sticky panel.
        */}
        <main className="pt-0 md:pt-16 relative z-0">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Analysis Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div ref={resultsRef}>
            {analysis ? (
              <AnalysisResultDisplay result={analysis} />
            ) : (
              <div className="rounded-xl border border-white/6 bg-white/3 p-6 text-neutral-400">
                No results yet — run an analysis to see results here.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
