import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  // Safe presence log — never prints the actual URL
  if (!connectionString) {
    console.error("[prisma] DATABASE_URL is NOT set — all DB operations will fail");
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const looksLikeRailway =
    connectionString.includes("railway") || connectionString.includes(".railway.app");
  console.log(
    `[prisma] DATABASE_URL present: yes | looks like Railway: ${looksLikeRailway ? "yes" : "no"}`
  );

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// Singleton — prevents multiple pool instances on hot reload in development.
// In production each process has one instance; globalThis persists for the process lifetime.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = createPrismaClient();
}

export const prisma = globalForPrisma.prisma;
