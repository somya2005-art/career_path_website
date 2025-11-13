import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: log queries to the console in development
    // log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : [],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
