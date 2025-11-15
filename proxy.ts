import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // Import NextResponse for redirects

// Routes that are part of the app (protected)
const isAppRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/analyzer(.*)",
  "/chat(.*)", // Using your /chat path
  "/jobs(.*)",
]);

// --- NEW: Routes that are public (landing, auth pages) ---
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/sign-in(.*)", // Your new sign-in page
  "/sign-up(.*)", // Your new sign-up page
]);

export default clerkMiddleware(async (auth, req) => {
  // Get the auth state
  const { userId, redirectToSignIn } = await auth();

  // --- FIX 1: Redirect logged-in users away from public routes ---
  // If the user is logged IN and is on a public route
  if (userId && isPublicRoute(req)) {
    const pathname = new URL(req.url).pathname;

    // If they're on the landing page, redirect to dashboard
    if (pathname === "/") {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // If it's the about page (or any other public page), allow access
    return NextResponse.next();
  }
  if (userId && isPublicRoute(req)) {
    // Redirect them to their dashboard

    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // --- FIX 2: Protect app routes (your existing logic) ---
  // If the user is logged OUT and on a protected app route
  if (!userId && isAppRoute(req)) {
    // Redirect them to the sign-in page
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Allow all other requests (logged-in on app, logged-out on public)
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
