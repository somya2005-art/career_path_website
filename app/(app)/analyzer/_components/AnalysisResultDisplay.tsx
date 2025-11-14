"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "../actions";
import { CheckCircle, XCircle, TrendingUp, Search } from "lucide-react";

// This component just displays the analysis result
export function AnalysisResultDisplay({ result }: { result: AnalysisResult }) {
  // Helper to determine the color of the score badge
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-600 hover:bg-green-600";
    if (score >= 60) return "bg-yellow-500 hover:bg-yellow-500";
    return "bg-red-600 hover:bg-red-600";
  };

  return (
    <div className="space-y-6">
      {/* --- Score & Overall Fit --- */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Overall Match Score</CardTitle>
              <CardDescription className="pt-2">
                {result.overallFit}
              </CardDescription>
            </div>
            <Badge
              className={`text-2xl font-bold text-white ${getScoreColor(
                result.matchScore
              )}`}
            >
              {result.matchScore}%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* --- Strengths --- */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {result.strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* --- Areas for Improvement (Fixed) --- */}
        <Card>
          <CardHeader>
            {/* --- FIX: Updated title --- */}
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {/* --- FIX: Updated property name --- */}
              {result.areasForImprovement.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* --- Missing Keywords --- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2 text-yellow-500" />
            Missing Keywords
          </CardTitle>
          <CardDescription>
            Try to include some of these keywords from the job description in
            your resume (if they apply to your experience).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {result.missingKeywords.map((item, i) => (
            <Badge key={i} variant="secondary">
              {item}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
