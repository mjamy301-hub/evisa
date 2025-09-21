import { z } from "zod";

export const createUserSchema = z.object({
  Email: z.email().min(3).max(32),
  Password: z.string().min(4)
});
