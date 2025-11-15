import { SignIn } from "@clerk/nextjs";

// This component will render the Clerk Sign-In UI on its own page
export default function SignInPage() {
  return (
    <div className="flex justify-center items-center py-24">
      <SignIn path="/sign-in" />
    </div>
  );
}
