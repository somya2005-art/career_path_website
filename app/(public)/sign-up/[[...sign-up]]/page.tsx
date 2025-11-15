import { SignUp } from "@clerk/nextjs";

// This component will render the Clerk Sign-Up UI on its own page
export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center py-24">
      <SignUp path="/sign-up" />
    </div>
  );
}
