import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const base = globalForPrisma.prisma ?? new PrismaClient();

// Extend the *instance* so every File you fetch has `url`
export const prisma = base.$extends({
  result: {
    file: {
      Url: {
        needs: { Path: true, Id: true },
        compute(file) {
          const baseUrl = process.env.CDN_URL ?? "";
          return file.Path ? `${baseUrl}/${file.Id}` : "path is not selected";
        }
      }
    }
  }
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
