// Update the import path to the correct location of PublicNav
import { PublicNav } from "./_components/public-nav";

// This is the layout for all public-facing pages (e.g., landing, about)
// It will contain the public navbar
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      <main className="grow">{children}</main>
      {/* We can add a PublicFooter here later */}
    </div>
  );
}
