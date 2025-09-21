import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z.string().min(4)
});
