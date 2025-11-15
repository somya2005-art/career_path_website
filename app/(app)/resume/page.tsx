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
    // 2. The ContextProvider makes the resume data available
    <ResumeContextProvider initialData={resumeData}>
      {/* This is the new 2-column layout.
        The parent <main> in layout.tsx has h-screen, so this
        div will also fill the height.
      */}
      <div className="flex h-full w-full flex-col lg:flex-row">
        {/* --- Left Column: The Form (40% width) --- */}
        {/* This column is a flex-col, so the h1 stays at the top
          and the div below it scrolls.
        */}
        <div className="w-full lg:w-2/5 h-full flex flex-col">
          <div className="p-4 md:p-8 pb-4">
            <h1 className="text-3xl font-bold [text-shadow:_0_0_12px_purple]">
              Build Your Resume
            </h1>
          </div>

          {/* This is the scrolling part for the form */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
            <ResumeForm />
          </div>
        </div>

        {/* --- Right Column: The Live Preview (60% width) --- */}
        {/* This column is also a flex-col with its own scroller,
          keeping the "Live Preview" h2 sticky.
        */}
        <div className="w-full lg:w-3/5 h-full flex flex-col bg-gray-200 dark:bg-neutral-800">
          <div className="p-4 md:p-8 pb-2"></div>

          {/* This is the scrolling container for the A4 page */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeContextProvider>
  );
}
