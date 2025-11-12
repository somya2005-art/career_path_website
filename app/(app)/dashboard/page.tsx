import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        This is your protected app layout with a collapsible sidebar.
      </p>
    </div>
  );
}
