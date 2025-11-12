import { ResumeContextProvider } from "./_components/ResumeContextProvider";
import { ResumeForm } from "./_components/ResumeForm";
import { ResumePreview } from "./_components/ResumePreview";
import { getResumeData } from "./actions";

// This is the main page for the resume builder.
// It fetches the user's resume data and provides it to the context.
export default async function ResumePage() {
  // 1. Fetch the user's resume data from the database
  const resumeData = await getResumeData();

  return (
    // 2. The ContextProvider makes the resume data available to all
    //    child components (the form and the preview)
    <ResumeContextProvider initialData={resumeData}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Left Column: The Form */}
        <div className="h-full overflow-y-auto pr-4">
          <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>
          <ResumeForm />
        </div>

        {/* Right Column: The Live Preview */}
        <div className="h-full">
          <h2 className="text-2xl font-semibold mb-6 sticky top-0 bg-muted/40 py-2">
            Live Preview
          </h2>
          <div className="bg-background shadow-lg rounded-lg p-8">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeContextProvider>
  );
}
