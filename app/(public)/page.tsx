import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Career Path - Landing Page</h1>
      <p>This is the public-facing landing page.</p>

      {/* This button will show "Sign In" or the user's avatar */}
      <UserButton />
    </main>
  );
}
