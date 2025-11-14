// File: lib/user.ts
"use server";

import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Import our global prisma instance

/**
 * Ensures the currently authenticated Clerk user exists in our local database.
 * @returns The local database user object.
 * @throws An error if the user is not authenticated.
 */
export async function syncUser() {
  const user = await currentUser(); // Get full user details from Clerk
  if (!user) {
    throw new Error("Not authenticated");
  }

  const userId = user.id;

  // 1. Check if user already exists in our DB
  let dbUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  // 2. If not, create them
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress ?? "", // Get primary email
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
    });
  }

  // 3. Return the database user
  return dbUser;
}
